"""
Centralized structured logging configuration.

Uses stdlib logging with a JSON formatter for production (easy to ship to
ELK/CloudWatch/Datadog) and a human-readable formatter for local dev.
Also configures per-request correlation IDs via a contextvar so every log
line emitted while handling a request can be traced back to it.
"""
import json
import logging
import sys
import time
from contextvars import ContextVar
from typing import Any, Dict

from app.core.config import get_settings

settings = get_settings()

# Correlation ID propagated through a request's lifecycle (set by middleware).
request_id_ctx: ContextVar[str] = ContextVar("request_id", default="-")


class JSONFormatter(logging.Formatter):
    """Formats log records as single-line JSON objects."""

    def format(self, record: logging.LogRecord) -> str:
        payload: Dict[str, Any] = {
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%S", time.gmtime(record.created)),
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
            "request_id": request_id_ctx.get(),
        }
        if record.exc_info:
            payload["exception"] = self.formatException(record.exc_info)
        # Allow callers to attach arbitrary structured fields via `extra`.
        for key, value in record.__dict__.items():
            if key.startswith("extra_"):
                payload[key.removeprefix("extra_")] = value
        return json.dumps(payload, default=str)


class HumanFormatter(logging.Formatter):
    """Readable formatter for local development."""

    def format(self, record: logging.LogRecord) -> str:
        base = super().format(record)
        rid = request_id_ctx.get()
        return f"[{rid}] {base}"


def configure_logging() -> None:
    """Configure the root logger once at application startup."""
    root = logging.getLogger()
    root.handlers.clear()
    root.setLevel(settings.LOG_LEVEL.upper())

    handler = logging.StreamHandler(sys.stdout)
    if settings.LOG_JSON:
        handler.setFormatter(JSONFormatter())
    else:
        handler.setFormatter(
            HumanFormatter("%(asctime)s | %(levelname)-8s | %(name)s | %(message)s")
        )
    root.addHandler(handler)

    # Quiet down noisy third-party loggers.
    for noisy in ("uvicorn.access", "httpx", "sentence_transformers", "chromadb.telemetry"):
        logging.getLogger(noisy).setLevel(logging.CRITICAL)



def get_logger(name: str) -> logging.Logger:
    return logging.getLogger(name)
