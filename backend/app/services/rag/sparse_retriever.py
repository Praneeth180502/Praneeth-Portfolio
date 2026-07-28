"""
BM25 sparse retriever.

Uses `rank_bm25` for classic term-frequency retrieval, which complements
dense embedding search well for exact keyword/name/acronym matches (e.g.
"FastAPI", "AWS", specific project names) that embeddings can sometimes
under-weight. The index is persisted to disk via pickle so it survives
process restarts without re-ingesting.
"""
import asyncio
import pickle
import re
from functools import lru_cache
from pathlib import Path

from rank_bm25 import BM25Okapi

from app.core.config import get_settings
from app.core.logging import get_logger
from app.utils.text_processing import Chunk

logger = get_logger(__name__)
settings = get_settings()

_TOKEN_RE = re.compile(r"[A-Za-z0-9_+#.]+")


def tokenize(text: str) -> list[str]:
    return [t.lower() for t in _TOKEN_RE.findall(text)]


class SparseRetriever:
    def __init__(self, index_dir: Path):
        self.index_dir = index_dir
        self.index_dir.mkdir(parents=True, exist_ok=True)
        self._index_path = self.index_dir / "bm25_index.pkl"
        self.bm25: BM25Okapi | None = None
        self.chunks: list[Chunk] = []
        self._load_if_exists()

    def _load_if_exists(self) -> None:
        if self._index_path.exists():
            with open(self._index_path, "rb") as f:
                data = pickle.load(f)
            self.bm25 = data["bm25"]
            self.chunks = data["chunks"]
            logger.info(f"Loaded BM25 index with {len(self.chunks)} chunks from disk.")

    def build(self, chunks: list[Chunk]) -> None:
        """Build (or rebuild) the BM25 index from scratch over all chunks."""
        self.chunks = chunks
        tokenized_corpus = [tokenize(c.text) for c in chunks]
        self.bm25 = BM25Okapi(tokenized_corpus)
        with open(self._index_path, "wb") as f:
            pickle.dump({"bm25": self.bm25, "chunks": self.chunks}, f)
        logger.info(f"Built BM25 index over {len(chunks)} chunks.")

    def query(self, query_text: str, top_k: int) -> list[dict]:
        if not self.bm25 or not self.chunks:
            return []
        tokenized_query = tokenize(query_text)
        scores = self.bm25.get_scores(tokenized_query)

        # Min-max normalize BM25 scores into [0, 1] for fair fusion with dense scores.
        max_score = max(scores) if len(scores) else 0.0
        min_score = min(scores) if len(scores) else 0.0
        denom = (max_score - min_score) or 1.0

        ranked = sorted(zip(self.chunks, scores), key=lambda x: x[1], reverse=True)[:top_k]
        return [
            {
                "id": chunk.id,
                "text": chunk.text,
                "metadata": chunk.metadata,
                "score": (score - min_score) / denom,
            }
            for chunk, score in ranked
            if score > 0
        ]

    async def query_async(self, query_text: str, top_k: int) -> list[dict]:
        loop = asyncio.get_running_loop()
        return await loop.run_in_executor(None, self.query, query_text, top_k)


@lru_cache
def get_sparse_retriever() -> SparseRetriever:
    return SparseRetriever(settings.BM25_INDEX_DIR)
