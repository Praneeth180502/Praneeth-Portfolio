"""
Hybrid retriever: fuses dense (embedding) and sparse (BM25) retrieval.

Score fusion formula: final_score = DENSE_WEIGHT * dense_score + SPARSE_WEIGHT * sparse_score
(default 70% dense / 30% sparse, per app.core.config). Both component scores
are pre-normalized to [0, 1] before fusion so the weights are meaningful.
Results are deduplicated by chunk id, keeping the fused (max-combined) score.
"""
import re

from app.core.config import get_settings
from app.core.logging import get_logger
from app.services.rag.embeddings import EmbeddingModel
from app.services.rag.sparse_retriever import SparseRetriever
from app.services.rag.vector_store import VectorStore

logger = get_logger(__name__)
settings = get_settings()

# ──────────────────────────────────────────────────────────────────────────────
# Intent-based query expansion
# Maps regex patterns for natural-language phrasings → domain keyword injections.
# This lets BM25 and dense retrieval find relevant chunks even when the user
# doesn't use exact keywords from the knowledge base.
# ──────────────────────────────────────────────────────────────────────────────
_INTENT_EXPANSIONS: list[tuple[re.Pattern, str]] = [
    # Work / employment history
    (re.compile(r"\b(work(?:ed)?|job|employ|compan|firm|organisation|organization|place)\b", re.I),
     "work experience internship DRDO CognitBotz Adani"),
    # Internships specifically
    (re.compile(r"\b(intern(?:ship)?|traineeship|placement)\b", re.I),
     "internship DRDO CognitBotz work experience"),
    # Previous / past roles
    (re.compile(r"\b(previous|past|before|prior|earlier|formerly|used to)\b", re.I),
     "previous work experience internship DRDO CognitBotz"),
    # Education / degree
    (re.compile(r"\b(study|studied|college|university|degree|b\.?tech|graduation|school|cgpa|gpa|grade)\b", re.I),
     "education degree B.Tech Vignan CGPA graduation 2024"),
    # Projects
    (re.compile(r"\b(project|built|made|created|developed|side.?project|portfolio)\b", re.I),
     "projects OpenViz SiLens AURASELECT AI File Explorer Meet-Ops"),
    # Skills / tech stack
    (re.compile(r"\b(skill|tech(?:nolog)?|stack|language|framework|tool|know(?:ledge)?|proficien|expert)\b", re.I),
     "skills React FastAPI Python TypeScript Docker PostgreSQL GenAI"),
    # Contact / location
    (re.compile(r"\b(contact|reach|email|phone|linkedin|location|where.*live|based|city)\b", re.I),
     "contact email phone Hyderabad LinkedIn"),
    # Open to work / hiring
    (re.compile(r"\b(hire|hiring|open.?to.?work|available|looking.?for|job.?search|recruit)\b", re.I),
     "open to work hiring available full stack GenAI"),
    # Introduction / about
    (re.compile(r"\b(introduc|about|who is|tell me|background|overview|summar)\b", re.I),
     "Praneeth Reddy Ankey full stack developer background introduction"),
    # Certifications
    (re.compile(r"\b(certif|award|credential|cisco|pcap|psap|cpa|cla)\b", re.I),
     "certifications PCAP PSAP CPA CLA Cisco Python"),
]


class HybridRetriever:
    def __init__(
        self,
        vector_store: VectorStore,
        sparse_retriever: SparseRetriever,
        embedding_model: EmbeddingModel,
        dense_weight: float = None,
        sparse_weight: float = None,
    ):
        self.vector_store = vector_store
        self.sparse_retriever = sparse_retriever
        self.embedding_model = embedding_model
        self.dense_weight = dense_weight if dense_weight is not None else settings.DENSE_WEIGHT
        self.sparse_weight = sparse_weight if sparse_weight is not None else settings.SPARSE_WEIGHT

    # Short follow-up indicators — queries that likely reference prior conversation
    _FOLLOWUP_WORDS = frozenset({
        "u", "you", "your", "yours", "he", "his", "him", "himself",
        "that", "those", "this", "these", "it", "its", "there", "they",
        "also", "and", "what about", "tell me more", "more about",
    })

    async def retrieve(
        self,
        query: str,
        top_k: int | None = None,
        history: list | None = None,
    ) -> list[dict]:
        """
        Run dense + sparse retrieval concurrently, fuse scores, and return the
        merged, deduplicated candidate list (unsorted-trim done by caller /
        reranker afterwards). `top_k` controls how many candidates each
        sub-retriever pulls before fusion, not the final result count.

        `history` is an optional list of ChatHistoryTurn used to inject the
        last user message into the search query for follow-up / pronoun-heavy
        questions, improving retrieval continuity across turns.
        """
        top_k = top_k or settings.RETRIEVAL_TOP_K

        search_query = query
        words = [w.strip("?,.!") for w in query.lower().split()]

        # 1. Pronoun expansion — always add "Praneeth" to queries referring to him
        if any(w in ("u", "you", "your", "yours", "he", "his", "him", "himself") for w in words):
            if "praneeth" not in query.lower():
                search_query = f"{query} Praneeth"

        # 2. Intent-based keyword expansion — inject domain terms for paraphrased queries
        #    so BM25 and dense retrieval can find relevant chunks without exact keywords.
        expansion_terms: list[str] = []
        for pattern, expansion in _INTENT_EXPANSIONS:
            if pattern.search(search_query):
                expansion_terms.append(expansion)
        if expansion_terms:
            # Append unique expansion terms (deduplicated) to the search query
            all_extra = " ".join(expansion_terms)
            search_query = f"{search_query} {all_extra}"
            logger.debug(f"Query expanded: {query!r} -> {search_query!r}")

        # 3. Follow-up context injection — if query is short or pronoun-heavy,
        #    prepend the last user turn so retrieval has richer context.
        query_word_count = len(words)
        is_short_or_pronoun_heavy = (
            query_word_count <= 6
            or any(w in self._FOLLOWUP_WORDS for w in words[:4])
        )
        if is_short_or_pronoun_heavy and history:
            # Find the most recent user turn and prepend it
            for turn in reversed(history):
                if getattr(turn, "role", None) == "user":
                    prev_text = getattr(turn, "content", "").strip()
                    if prev_text and prev_text.lower() != query.lower():
                        search_query = f"{prev_text} {search_query}"
                    break

        query_embedding = (await self.embedding_model.encode_async([search_query]))[0]

        dense_results, sparse_results = await self._run_both(search_query, query_embedding, top_k)

        fused: dict[str, dict] = {}

        for r in dense_results:
            fused[r["id"]] = {
                **r,
                "dense_score": r["score"],
                "sparse_score": 0.0,
            }

        for r in sparse_results:
            if r["id"] in fused:
                fused[r["id"]]["sparse_score"] = r["score"]
            else:
                fused[r["id"]] = {
                    **r,
                    "dense_score": 0.0,
                    "sparse_score": r["score"],
                }

        for item in fused.values():
            item["fused_score"] = (
                self.dense_weight * item["dense_score"] + self.sparse_weight * item["sparse_score"]
            )

        merged = sorted(fused.values(), key=lambda x: x["fused_score"], reverse=True)
        logger.info(
            f"Hybrid retrieval: {len(dense_results)} dense + {len(sparse_results)} sparse "
            f"-> {len(merged)} unique candidates for query={query[:60]!r}"
        )
        return merged[:top_k]

    async def _run_both(self, query: str, query_embedding: list[float], top_k: int):
        import asyncio

        dense_task = self.vector_store.query_async(query_embedding, top_k)
        sparse_task = self.sparse_retriever.query_async(query, top_k)
        return await asyncio.gather(dense_task, sparse_task)
