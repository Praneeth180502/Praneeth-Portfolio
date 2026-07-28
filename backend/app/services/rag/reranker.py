"""
Cross-encoder reranker.

After hybrid retrieval produces a shortlist of candidates, a cross-encoder
(`cross-encoder/ms-marco-MiniLM-L-6-v2`) re-scores each (query, chunk) pair
jointly — far more accurate than the bi-encoder similarity used for initial
retrieval, at the cost of being too slow to run over the whole corpus.
"""
import asyncio
from functools import lru_cache

from sentence_transformers import CrossEncoder

from app.core.config import get_settings
from app.core.logging import get_logger

logger = get_logger(__name__)
settings = get_settings()


class Reranker:
    def __init__(self, model_name: str):
        logger.info(f"Loading reranker model: {model_name}")
        self.model = CrossEncoder(model_name)
        logger.info("Reranker model loaded.")

    def rerank(self, query: str, candidates: list[dict], top_k: int) -> list[dict]:
        """
        candidates: list of {id, text, metadata, score} from hybrid retrieval.
        Returns the top_k candidates re-sorted by cross-encoder relevance,
        with an added `rerank_score` normalized to [0, 1] via sigmoid.
        """
        if not candidates:
            return []

        pairs = [(query, c["text"]) for c in candidates]
        raw_scores = self.model.predict(pairs)

        # ms-marco cross-encoders output unbounded logits; squash to [0,1].
        import math

        for candidate, raw in zip(candidates, raw_scores):
            candidate["rerank_score"] = 1 / (1 + math.exp(-float(raw)))

        ranked = sorted(candidates, key=lambda c: c["rerank_score"], reverse=True)
        return ranked[:top_k]

    async def rerank_async(self, query: str, candidates: list[dict], top_k: int) -> list[dict]:
        loop = asyncio.get_running_loop()
        return await loop.run_in_executor(None, self.rerank, query, candidates, top_k)


@lru_cache
def get_reranker() -> Reranker:
    return Reranker(settings.RERANKER_MODEL_NAME)
