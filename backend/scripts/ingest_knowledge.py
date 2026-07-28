"""
Standalone script to (re)build the RAG knowledge base indices.

Usage:
    python -m scripts.ingest_knowledge            # ingest only if empty
    python -m scripts.ingest_knowledge --force     # full re-index from scratch

Run this as an explicit deploy step (CI/CD, Docker build, or manually)
whenever files under `knowledge/` change, rather than relying solely on
the lazy startup ingestion in app.main.
"""
import argparse
import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.core.logging import configure_logging, get_logger  # noqa: E402
from app.services.rag.embeddings import get_embedding_model  # noqa: E402
from app.services.rag.ingestion import IngestionPipeline  # noqa: E402
from app.services.rag.sparse_retriever import get_sparse_retriever  # noqa: E402
from app.services.rag.vector_store import get_vector_store  # noqa: E402

configure_logging()
logger = get_logger("ingest_knowledge")


async def main(force: bool) -> None:
    logger.info(f"Starting knowledge base ingestion (force={force})...")

    pipeline = IngestionPipeline(
        vector_store=get_vector_store(),
        sparse_retriever=get_sparse_retriever(),
        embedding_model=get_embedding_model(),
    )
    count = await pipeline.run(force=force)
    logger.info(f"Done. {count} chunks indexed.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Ingest the RAG knowledge base.")
    parser.add_argument(
        "--force", action="store_true", help="Force a full re-index even if data already exists."
    )
    args = parser.parse_args()
    asyncio.run(main(force=args.force))
