"""
Chat orchestration service — the heart of the RAG chatbot.

Pipeline per request:
  1. Load short-term conversation history for the session.
  2. Hybrid retrieval (dense + BM25) over the knowledge base.
  3. Cross-encoder reranking of candidates.
  4. Build a grounded prompt (context + history + question).
  5. Stream the LLM's answer token-by-token as SSE events.
  6. Emit a final `sources` event with citations, then `done`.
  7. Persist both turns to conversation memory.

If retrieval finds nothing relevant, we skip the LLM call entirely and
return a canned "I don't know" response — this is a hard anti-hallucination
guardrail on top of the prompt-level instructions.
"""
import json
import time
from typing import AsyncIterator

from app.core.config import Settings
from app.core.logging import get_logger
from app.schemas.chat import SourceCitation
from app.services.rag.hybrid_retriever import HybridRetriever
from app.services.rag.llm_client import LLMClient
from app.services.rag.memory import ConversationMemory
from app.services.rag.prompt_builder import NO_CONTEXT_FALLBACK, build_messages
from app.services.rag.reranker import Reranker

logger = get_logger(__name__)


class ChatService:
    def __init__(
        self,
        retriever: HybridRetriever,
        reranker: Reranker,
        llm_client: LLMClient,
        memory: ConversationMemory,
        settings: Settings,
    ):
        self.retriever = retriever
        self.reranker = reranker
        self.llm_client = llm_client
        self.memory = memory
        self.settings = settings

    @staticmethod
    def _sse(event: dict) -> str:
        """Format a dict as a Server-Sent Event `data:` line."""
        return f"data: {json.dumps(event)}\n\n"

    @staticmethod
    def _to_citations(chunks: list[dict]) -> list[SourceCitation]:
        citations = []
        seen_sources = set()
        for c in chunks:
            source = c["metadata"].get("source", "unknown")
            # One citation per source file to keep the list readable, even
            # if multiple chunks from the same file were retrieved.
            key = source
            if key in seen_sources:
                continue
            seen_sources.add(key)
            snippet = c["text"][:220].strip()
            citations.append(
                SourceCitation(
                    source=source,
                    section=c["metadata"].get("section") or None,
                    snippet=snippet + ("..." if len(c["text"]) > 220 else ""),
                    relevance_score=round(float(c.get("rerank_score", c.get("fused_score", 0.0))), 4),
                )
            )
        return citations

    async def stream_answer(
        self, session_id: str, message: str, ip_address: str | None
    ) -> AsyncIterator[str]:
        """Main entrypoint: yields SSE-formatted strings for StreamingResponse."""
        start = time.perf_counter()
        try:
            history = await self.memory.get_history(session_id)

            candidates = await self.retriever.retrieve(
                message, top_k=self.settings.RETRIEVAL_TOP_K, history=history
            )

            if not candidates:
                fallback = NO_CONTEXT_FALLBACK
                yield self._sse({"type": "token", "content": fallback})
                yield self._sse({"type": "sources", "sources": []})
                yield self._sse({"type": "done"})
                await self._persist_turns(session_id, ip_address, message, fallback, [], start)
                return

            reranked = await self.reranker.rerank_async(
                message, candidates, top_k=self.settings.RERANK_TOP_K
            )
            valid_reranked = [c for c in reranked if c["rerank_score"] >= self.settings.MIN_RELEVANCE_SCORE]

            # If cross-encoder scored low due to short query logits, fallback to top reranked candidates
            if not valid_reranked and reranked:
                valid_reranked = reranked[:self.settings.RERANK_TOP_K]

            if not valid_reranked:
                fallback = NO_CONTEXT_FALLBACK
                yield self._sse({"type": "token", "content": fallback})
                yield self._sse({"type": "sources", "sources": []})
                yield self._sse({"type": "done"})
                await self._persist_turns(session_id, ip_address, message, fallback, [], start)
                return

            messages = build_messages(query=message, context_chunks=valid_reranked, history=history)

            full_answer_parts: list[str] = []
            async for delta in self.llm_client.stream_completion(messages):
                full_answer_parts.append(delta)
                yield self._sse({"type": "token", "content": delta})

            full_answer = "".join(full_answer_parts).strip()
            citations = self._to_citations(reranked)

            yield self._sse({"type": "sources", "sources": [c.model_dump() for c in citations]})
            yield self._sse({"type": "done"})

            await self._persist_turns(
                session_id, ip_address, message, full_answer,
                [c.model_dump() for c in citations], start,
            )

        except Exception as exc:  # noqa: BLE001 — must not let SSE stream crash silently
            logger.exception("Error while streaming chat answer")
            yield self._sse({"type": "error", "error": "Something went wrong generating a response."})
            yield self._sse({"type": "done"})

    async def _persist_turns(
        self, session_id: str, ip_address: str | None, user_msg: str, assistant_msg: str,
        sources: list[dict], start_time: float,
    ) -> None:
        latency_ms = int((time.perf_counter() - start_time) * 1000)
        try:
            await self.memory.append_turn(session_id, ip_address, "user", user_msg)
            await self.memory.append_turn(
                session_id, ip_address, "assistant", assistant_msg,
                sources=sources, latency_ms=latency_ms,
            )
        except Exception:
            logger.exception("Failed to persist chat turn (non-fatal)")
