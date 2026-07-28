"""Health check endpoints for load balancers / container orchestration."""
from fastapi import APIRouter

from app.core.config import get_settings
from app.core.database import check_db_connection

router = APIRouter(tags=["Health"])
settings = get_settings()


@router.get("/health", summary="Liveness probe")
async def health() -> dict:
    """Basic liveness check — returns 200 as long as the process is running."""
    return {"status": "ok", "app": settings.APP_NAME, "env": settings.APP_ENV}


@router.get("/health/ready", summary="Readiness probe")
async def readiness() -> dict:
    """Readiness check — verifies the database is reachable."""
    db_ok = await check_db_connection()
    status_ = "ok" if db_ok else "degraded"
    return {"status": status_, "checks": {"database": db_ok}}
