"""
Centralized exception hierarchy and FastAPI exception handlers.

Every domain-specific error the app raises inherits from AppException so
we get one consistent JSON error envelope for the frontend, regardless of
where in the stack the error originated.
"""
from typing import Any, Dict, Optional

from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.core.logging import get_logger

logger = get_logger(__name__)


class AppException(Exception):
    """Base class for all application-raised (expected) errors."""

    status_code: int = status.HTTP_400_BAD_REQUEST
    error_code: str = "APP_ERROR"

    def __init__(self, message: str, details: Optional[Dict[str, Any]] = None):
        self.message = message
        self.details = details or {}
        super().__init__(message)


class NotFoundError(AppException):
    status_code = status.HTTP_404_NOT_FOUND
    error_code = "NOT_FOUND"


class ValidationAppError(AppException):
    status_code = status.HTTP_422_UNPROCESSABLE_ENTITY
    error_code = "VALIDATION_ERROR"


class RateLimitExceededError(AppException):
    status_code = status.HTTP_429_TOO_MANY_REQUESTS
    error_code = "RATE_LIMIT_EXCEEDED"


class RAGServiceError(AppException):
    status_code = status.HTTP_503_SERVICE_UNAVAILABLE
    error_code = "RAG_SERVICE_ERROR"


class LLMProviderError(AppException):
    status_code = status.HTTP_502_BAD_GATEWAY
    error_code = "LLM_PROVIDER_ERROR"


class FileNotAvailableError(AppException):
    status_code = status.HTTP_404_NOT_FOUND
    error_code = "FILE_NOT_AVAILABLE"


def _error_envelope(code: str, message: str, details: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    return {"error": {"code": code, "message": message, "details": details or {}}}


def register_exception_handlers(app: FastAPI) -> None:
    """Attach global exception handlers to the FastAPI app instance."""

    @app.exception_handler(AppException)
    async def handle_app_exception(request: Request, exc: AppException) -> JSONResponse:
        logger.warning(
            "Handled application exception",
            extra={"extra_path": str(request.url), "extra_error_code": exc.error_code},
        )
        return JSONResponse(
            status_code=exc.status_code,
            content=_error_envelope(exc.error_code, exc.message, exc.details),
        )

    @app.exception_handler(RequestValidationError)
    async def handle_validation_error(request: Request, exc: RequestValidationError) -> JSONResponse:
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content=_error_envelope(
                "VALIDATION_ERROR",
                "Request validation failed.",
                {"errors": exc.errors()},
            ),
        )

    @app.exception_handler(StarletteHTTPException)
    async def handle_http_exception(request: Request, exc: StarletteHTTPException) -> JSONResponse:
        return JSONResponse(
            status_code=exc.status_code,
            content=_error_envelope("HTTP_ERROR", str(exc.detail)),
        )

    @app.exception_handler(Exception)
    async def handle_unexpected_exception(request: Request, exc: Exception) -> JSONResponse:
        logger.exception("Unhandled exception", extra={"extra_path": str(request.url)})
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content=_error_envelope("INTERNAL_SERVER_ERROR", "An unexpected error occurred."),
        )
