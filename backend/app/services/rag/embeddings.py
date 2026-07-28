"""
Dense embedding model wrapper.

Uses ChromaDB's built-in ONNX-based all-MiniLM-L6-v2 embedding function
for a lightweight footprint (~50MB RAM vs ~300MB with PyTorch).
This is essential for deployment on memory-constrained platforms like
Render free tier (512MB).
"""
import asyncio
from functools import lru_cache

from chromadb.utils.embedding_functions import ONNXMiniLM_L6_V2

from app.core.config import get_settings
from app.core.logging import get_logger

logger = get_logger(__name__)
settings = get_settings()


class EmbeddingModel:
    def __init__(self, model_name: str):
        logger.info(f"Loading ONNX embedding model (lightweight): {model_name}")
        self._ef = ONNXMiniLM_L6_V2()
        self.dimension = 384  # MiniLM-L6-v2 output dimension
        logger.info(f"Embedding model loaded (dim={self.dimension})")

    def encode(self, texts: list[str], batch_size: int = 32) -> list[list[float]]:
        """Synchronous embedding — call via `encode_async` from async code."""
        # ONNXMiniLM_L6_V2.__call__ returns list of embeddings
        embeddings = self._ef(list(texts))
        return [list(e) for e in embeddings]

    async def encode_async(self, texts: list[str], batch_size: int = 32) -> list[list[float]]:
        """Runs the (CPU-bound) encode call in a thread pool to avoid blocking the event loop."""
        loop = asyncio.get_running_loop()
        return await loop.run_in_executor(None, self.encode, texts, batch_size)


@lru_cache
def get_embedding_model() -> EmbeddingModel:
    return EmbeddingModel(settings.EMBEDDING_MODEL_NAME)
