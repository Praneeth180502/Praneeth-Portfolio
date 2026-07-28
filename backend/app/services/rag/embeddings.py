"""
Dense embedding model wrapper.

Loads `sentence-transformers/all-MiniLM-L6-v2` once per process (it's ~80MB
and loading it is relatively slow) and exposes sync + async-friendly encode
methods. CPU inference is fine for a 384-dim MiniLM model at this scale.
"""
import asyncio
from functools import lru_cache

from sentence_transformers import SentenceTransformer

from app.core.config import get_settings
from app.core.logging import get_logger

logger = get_logger(__name__)
settings = get_settings()


class EmbeddingModel:
    def __init__(self, model_name: str):
        logger.info(f"Loading embedding model: {model_name}")
        self.model = SentenceTransformer(model_name)
        self.dimension = self.model.get_sentence_embedding_dimension()
        logger.info(f"Embedding model loaded (dim={self.dimension})")

    def encode(self, texts: list[str], batch_size: int = 32) -> list[list[float]]:
        """Synchronous embedding — call via `encode_async` from async code."""
        embeddings = self.model.encode(
            texts,
            batch_size=batch_size,
            show_progress_bar=False,
            normalize_embeddings=True,  # cosine similarity via dot product
            convert_to_numpy=True,
        )
        return embeddings.tolist()

    async def encode_async(self, texts: list[str], batch_size: int = 32) -> list[list[float]]:
        """Runs the (CPU-bound) encode call in a thread pool to avoid blocking the event loop."""
        loop = asyncio.get_running_loop()
        return await loop.run_in_executor(None, self.encode, texts, batch_size)


@lru_cache
def get_embedding_model() -> EmbeddingModel:
    return EmbeddingModel(settings.EMBEDDING_MODEL_NAME)
