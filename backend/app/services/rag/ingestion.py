"""
Knowledge base ingestion pipeline.

Reads all documents from the `knowledge/` directory, splits them into
overlapping chunks, embeds them, and indexes them into both the ChromaDB
(dense) and BM25 (sparse) stores. Designed to be run:
  - standalone via `scripts/ingest_knowledge.py` (offline / CI / deploy step)
  - or lazily on startup if the indices are empty (see main.py lifespan)
"""
from app.core.config import get_settings
from app.core.logging import get_logger
from app.services.rag.embeddings import EmbeddingModel
from app.services.rag.sparse_retriever import SparseRetriever
from app.services.rag.vector_store import VectorStore
from app.utils.file_utils import iter_knowledge_files, read_text_file
from app.utils.text_processing import Chunk, split_document

logger = get_logger(__name__)
settings = get_settings()


class IngestionPipeline:
    def __init__(
        self,
        vector_store: VectorStore,
        sparse_retriever: SparseRetriever,
        embedding_model: EmbeddingModel,
    ):
        self.vector_store = vector_store
        self.sparse_retriever = sparse_retriever
        self.embedding_model = embedding_model

    def _load_and_chunk_all(self) -> list[Chunk]:
        files = iter_knowledge_files(settings.KNOWLEDGE_DIR)
        if not files:
            logger.warning(f"No knowledge files found under {settings.KNOWLEDGE_DIR}")
            return []

        all_chunks: list[Chunk] = []
        for path in files:
            text = read_text_file(path)
            if not text.strip():
                continue
            source_name = path.relative_to(settings.KNOWLEDGE_DIR).as_posix()
            chunks = split_document(text, source=source_name)
            logger.info(f"Chunked {source_name}: {len(chunks)} chunks")
            all_chunks.extend(chunks)
        return all_chunks

    async def run(self, force: bool = False) -> int:
        """
        Ingest all knowledge documents. If `force` is False and the vector
        store already has content, this is a no-op (idempotent startup check).
        Returns the number of chunks indexed.
        """
        if not force and self.vector_store.count() > 0:
            logger.info(
                f"Vector store already contains {self.vector_store.count()} chunks; "
                "skipping ingestion (pass force=True to re-index)."
            )
            return self.vector_store.count()

        chunks = self._load_and_chunk_all()
        if not chunks:
            return 0

        if force:
            self.vector_store.reset()

        logger.info(f"Embedding {len(chunks)} chunks with {settings.EMBEDDING_MODEL_NAME}...")
        texts = [c.text for c in chunks]
        embeddings = await self.embedding_model.encode_async(texts)

        self.vector_store.upsert(chunks, embeddings)
        self.sparse_retriever.build(chunks)

        logger.info(f"Ingestion complete: {len(chunks)} chunks indexed (dense + sparse).")
        return len(chunks)
