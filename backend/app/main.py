"""
Application entrypoint: FastAPI app factory.

Run locally with:  uvicorn app.main:app --reload
Run in production: uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
(see Dockerfile / docker-compose.yml for the containerized setup)
"""
from contextlib import asynccontextmanager
from pathlib import Path
import uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from app.api.v1.router import api_router
from app.core.config import get_settings
from app.core.exceptions import register_exception_handlers
from app.core.logging import configure_logging, get_logger
from app.core.middleware import RequestContextMiddleware

settings = get_settings()
configure_logging()
logger = get_logger(__name__)

STATIC_DIR = Path(__file__).parent.parent / "static"


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Startup: Log application boot and check if knowledge base ingestion is needed.
    """
    import gc
    import os
    os.environ["OMP_NUM_THREADS"] = "1"
    os.environ["OPENBLAS_NUM_THREADS"] = "1"

    logger.info(f"Starting {settings.APP_NAME} in {settings.APP_ENV} mode")
    try:
        from app.services.rag.embeddings import get_embedding_model
        from app.services.rag.sparse_retriever import get_sparse_retriever
        from app.services.rag.vector_store import get_vector_store
        from app.services.rag.ingestion import IngestionPipeline

        vector_store = get_vector_store()
        if vector_store.count() == 0:
            logger.info("Vector store is empty. Running automatic knowledge base ingestion...")
            pipeline = IngestionPipeline(
                vector_store=vector_store,
                sparse_retriever=get_sparse_retriever(),
                embedding_model=get_embedding_model(),
            )
            count = await pipeline.run(force=True)
            logger.info(f"Auto-ingestion complete: {count} chunks indexed.")
        else:
            logger.info(f"Vector store ready with {vector_store.count()} chunks.")

        # ── Pre-warm RAG ML models & search engines to eliminate first-query cold start ──
        logger.info("Pre-warming ONNX embedding model & search engines...")
        embedding_model = get_embedding_model()
        sparse_retriever = get_sparse_retriever()

        warmup_vec = await embedding_model.encode_async(["warmup query"])
        if warmup_vec and len(warmup_vec) > 0:
            await vector_store.query_async(warmup_vec[0], top_k=1)
        await sparse_retriever.query_async("warmup query", top_k=1)
        logger.info("RAG models & search engines successfully pre-warmed.")

        gc.collect()
    except Exception as exc:
        logger.exception("Failed to run auto-ingestion / pre-warming on startup", exc_info=exc)
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
        allow_origin_regex=settings.CORS_ORIGIN_REGEX,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.add_middleware(RequestContextMiddleware)

    register_exception_handlers(app)

    # ── API routes ────────────────────────────────────────────────────────────
    app.include_router(api_router, prefix=settings.API_V1_PREFIX)

    # ── Frontend static files (production only) ───────────────────────────────
    # The React build output is copied into /static during Docker build.
    # In local dev the directory is empty (.gitkeep only), so we skip mounting.
    index_html = STATIC_DIR / "index.html"
    if index_html.exists():
        # Serve JS/CSS/assets at /assets (Vite default output dir)
        assets_dir = STATIC_DIR / "assets"
        if assets_dir.exists():
            app.mount("/assets", StaticFiles(directory=str(assets_dir)), name="assets")

        # Serve other static root files (favicon, resume PDF, etc.)
        app.mount("/static-files", StaticFiles(directory=str(STATIC_DIR)), name="static-root")

        # SPA catch-all: any unmatched path returns index.html so React Router works
        @app.get("/{full_path:path}", include_in_schema=False)
        async def serve_spa(full_path: str):
            return FileResponse(str(index_html))

        logger.info(f"Serving frontend SPA from {STATIC_DIR}")
    else:
        # API-only mode (e.g. Render backend-only deploy):
        # Return a friendly redirect from / to /api/docs instead of 404
        from fastapi.responses import RedirectResponse

        @app.get("/", include_in_schema=False)
        async def root_redirect():
            return RedirectResponse(url="/api/docs")

        logger.info("No frontend build found in /static — running API-only mode")

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
