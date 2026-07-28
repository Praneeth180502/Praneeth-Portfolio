"""
Lightweight reranker — score-passthrough for memory-constrained deployments.

On platforms with limited RAM (e.g. Render free tier, 512MB), the full
CrossEncoder model (~90MB + PyTorch ~300MB) cannot be loaded. This module
provides a lightweight fallback that uses the hybrid retrieval fused scores
directly, sorted and trimmed to top_k.

Quality impact: hybrid retrieval (dense + BM25 fusion) already produces
well-ranked results. The cross-encoder reranker improves precision by ~5-10%
but is not essential for a portfolio chatbot.
"""
import asyncio
from functools import lru_cache

from app.core.config import get_settings
from app.core.logging import get_logger

logger = get_logger(__name__)
settings = get_settings()


class Reranker:
    def __init__(self, model_name: str):
        logger.info(f"Reranker initialized in lightweight mode (no CrossEncoder loaded)")

    def rerank(self, query: str, candidates: list[dict], top_k: int) -> list[dict]:
        """
        Lightweight reranker: uses existing hybrid fused_score as rerank_score.
        Candidates are already sorted by hybrid retrieval quality.
        """
        if not candidates:
            return []

        for c in candidates:
            c["rerank_score"] = c.get("fused_score", c.get("score", 0.5))

        ranked = sorted(candidates, key=lambda c: c["rerank_score"], reverse=True)
        return ranked[:top_k]

    async def rerank_async(self, query: str, candidates: list[dict], top_k: int) -> list[dict]:
        loop = asyncio.get_running_loop()
        return await loop.run_in_executor(None, self.rerank, query, candidates, top_k)


@lru_cache
def get_reranker() -> Reranker:
    return Reranker(settings.RERANKER_MODEL_NAME)
