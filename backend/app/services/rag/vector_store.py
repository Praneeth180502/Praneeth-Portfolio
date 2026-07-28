"""
ChromaDB-backed dense vector store.

Wraps a persistent ChromaDB collection used for dense (embedding-similarity)
retrieval. Embeddings are computed externally via EmbeddingModel and passed
in explicitly, so this class stays a thin persistence/query layer.
"""
import asyncio
from functools import lru_cache

import chromadb
from chromadb.config import Settings as ChromaSettings

from app.core.config import get_settings
from app.core.logging import get_logger
from app.utils.text_processing import Chunk

logger = get_logger(__name__)
settings = get_settings()


class VectorStore:
    def __init__(self, persist_dir: str, collection_name: str):
        self.collection_name = collection_name
        self.client = chromadb.PersistentClient(
            path=str(persist_dir),
            settings=ChromaSettings(anonymized_telemetry=False),
        )
        self.collection = self.client.get_or_create_collection(
            name=collection_name,
            metadata={"hnsw:space": "cosine"},
        )

    def _get_active_collection(self):
        try:
            # Test if current collection handle is valid
            self.collection.count()
            return self.collection
        except Exception:
            # Handle stale collection reference after external re-index
            self.collection = self.client.get_or_create_collection(
                name=self.collection_name,
                metadata={"hnsw:space": "cosine"},
            )
            return self.collection

    def reset(self) -> None:
        """Drop and recreate the collection (used before a full re-ingest)."""
        self.client.delete_collection(self.collection.name)
        self.collection = self.client.get_or_create_collection(
            name=self.collection_name, metadata={"hnsw:space": "cosine"}
        )

    def upsert(self, chunks: list[Chunk], embeddings: list[list[float]]) -> None:
        if not chunks:
            return
        coll = self._get_active_collection()
        coll.upsert(
            ids=[c.id for c in chunks],
            embeddings=embeddings,
            documents=[c.text for c in chunks],
            metadatas=[c.metadata for c in chunks],
        )

    def query(self, query_embedding: list[float], top_k: int) -> list[dict]:
        """Returns list of {id, text, metadata, score} sorted by descending similarity."""
        coll = self._get_active_collection()
        cnt = coll.count()
        if cnt == 0:
            return []
        result = coll.query(
            query_embeddings=[query_embedding],
            n_results=min(top_k, cnt),
            include=["documents", "metadatas", "distances"],
        )
        out = []
        for doc, meta, dist, id_ in zip(
            result["documents"][0], result["metadatas"][0], result["distances"][0], result["ids"][0]
        ):
            # Chroma returns cosine *distance*; convert to a similarity score in [0, 1].
            similarity = max(0.0, 1.0 - dist / 2.0)
            out.append({"id": id_, "text": doc, "metadata": meta, "score": similarity})
        return out

    async def query_async(self, query_embedding: list[float], top_k: int) -> list[dict]:
        loop = asyncio.get_running_loop()
        return await loop.run_in_executor(None, self.query, query_embedding, top_k)

    def count(self) -> int:
        return self._get_active_collection().count()


@lru_cache
def get_vector_store() -> VectorStore:
    settings.CHROMA_PERSIST_DIR.mkdir(parents=True, exist_ok=True)
    return VectorStore(str(settings.CHROMA_PERSIST_DIR), settings.CHROMA_COLLECTION_NAME)
