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
    Startup: Log application boot. Knowledge base ingestion and embedding model
    loading are performed lazily on the first chat request to ensure the web server
    binds instantly under Render's 512MB RAM limit.
    """
    logger.info(f"Starting {settings.APP_NAME} in {settings.APP_ENV} mode")
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
