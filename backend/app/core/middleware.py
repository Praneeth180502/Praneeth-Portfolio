"""HTTP middleware: request correlation IDs and request timing logs."""
import time
import uuid

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request

from app.core.logging import get_logger, request_id_ctx

logger = get_logger("app.request")


class RequestContextMiddleware(BaseHTTPMiddleware):
    """Assigns a correlation ID to each request and logs basic timing/status."""

    async def dispatch(self, request: Request, call_next):
        incoming_id = request.headers.get("X-Request-ID")
        request_id = incoming_id or str(uuid.uuid4())
        token = request_id_ctx.set(request_id)

        start = time.perf_counter()
        try:
            response = await call_next(request)
        finally:
            request_id_ctx.reset(token)

        duration_ms = round((time.perf_counter() - start) * 1000, 2)
        response.headers["X-Request-ID"] = request_id
        logger.info(
            f"{request.method} {request.url.path} -> {response.status_code} ({duration_ms}ms)",
            extra={
                "extra_method": request.method,
                "extra_path": request.url.path,
                "extra_status_code": response.status_code,
                "extra_duration_ms": duration_ms,
            },
        )
        return response
