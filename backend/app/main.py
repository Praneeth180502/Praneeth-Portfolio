"""
Application entrypoint: FastAPI app factory.

Run locally with:  uvicorn app.main:app --reload
Run in production: uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
(see Dockerfile / docker-compose.yml for the containerized setup)
"""
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.router import api_router
from app.core.config import get_settings
from app.core.exceptions import register_exception_handlers
from app.core.logging import configure_logging, get_logger
from app.core.middleware import RequestContextMiddleware

settings = get_settings()
configure_logging()
logger = get_logger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Startup: lazily ingest the knowledge base if the vector store is empty,
    so a fresh deployment "just works" without a manual ingestion step.
    (For larger knowledge bases, prefer running `scripts/ingest_knowledge.py`
    as an explicit deploy step instead of relying on this lazy path.)
    """
    logger.info(f"Starting {settings.APP_NAME} in {settings.APP_ENV} mode")
    try:
        from app.services.rag.embeddings import get_embedding_model
        from app.services.rag.ingestion import IngestionPipeline
        from app.services.rag.sparse_retriever import get_sparse_retriever
        from app.services.rag.vector_store import get_vector_store

        pipeline = IngestionPipeline(
            vector_store=get_vector_store(),
            sparse_retriever=get_sparse_retriever(),
            embedding_model=get_embedding_model(),
        )
        indexed_count = await pipeline.run(force=False)
        logger.info(f"Knowledge base ready with {indexed_count} indexed chunks.")
    except Exception:
        # Don't crash the whole app if ingestion fails (e.g. missing knowledge/
        # dir in a minimal deployment) — the chat endpoint will simply fall
        # back to "I don't have that information" responses.
        logger.exception("Knowledge base ingestion failed at startup (non-fatal).")

    yield
    logger.info(f"Shutting down {settings.APP_NAME}")


def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.APP_NAME,
        description=(
            "Backend API for a personal AI portfolio: contact form, project listings, "
            "resume download, analytics, and a RAG-powered chatbot."
        ),
        version="1.0.0",
        docs_url="/api/docs",
        redoc_url="/api/redoc",
        openapi_url="/api/openapi.json",
        lifespan=lifespan,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.add_middleware(RequestContextMiddleware)

    register_exception_handlers(app)

    app.include_router(api_router, prefix=settings.API_V1_PREFIX)

    return app


app = create_app()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
    )

