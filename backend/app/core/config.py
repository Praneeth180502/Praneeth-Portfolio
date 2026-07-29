"""
Centralized application configuration.

All environment-dependent values are declared here as a single Pydantic
Settings object, loaded once and reused across the app via `get_settings()`
(cached with lru_cache so we don't re-parse env vars on every request).
"""
from functools import lru_cache
from pathlib import Path
from typing import List, Literal

from pydantic import AnyHttpUrl, Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent.parent.parent


class Settings(BaseSettings):
    """Application settings, populated from environment variables / .env file."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # ---------------------------------------------------------------- App
    APP_NAME: str = "AI Portfolio Backend"
    APP_ENV: Literal["development", "staging", "production"] = "development"
    DEBUG: bool = False
    API_V1_PREFIX: str = "/api"
    LOG_LEVEL: str = "INFO"
    LOG_JSON: bool = True

    # ------------------------------------------------------------- Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # --------------------------------------------------------------- CORS
    CORS_ORIGINS: List[str] = Field(default_factory=lambda: ["http://localhost:5173"])

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def _split_cors(cls, v):
        if isinstance(v, str):
            v_trimmed = v.strip()
            if v_trimmed.startswith("[") and v_trimmed.endswith("]"):
                import json
                try:
                    return json.loads(v_trimmed)
                except Exception:
                    pass
            return [origin.strip() for origin in v_trimmed.split(",") if origin.strip()]
        return v

    # ---------------------------------------------------------- Database
    DATABASE_URL: str = Field(
        default="postgresql+asyncpg://postgres:postgres@localhost:5432/portfolio_db",
        description="Async SQLAlchemy DSN, e.g. postgresql+asyncpg://user:pass@host:5432/db",
    )
    DATABASE_URL_SYNC: str = Field(
        default="postgresql+psycopg2://postgres:postgres@localhost:5432/portfolio_db",
        description="Sync DSN used by Alembic migrations only.",
    )
    DB_POOL_SIZE: int = 3
    DB_MAX_OVERFLOW: int = 5
    DB_ECHO: bool = False

    # -------------------------------------------------------------- Redis
    REDIS_URL: str = "redis://localhost:6379/0"
    REDIS_ENABLED: bool = False  # flip on when caching layer is wired up

    # ---------------------------------------------------------------- LLM
    GROQ_API_KEY: str = Field(default="", description="API key for Groq LLM inference")
    GROQ_MODEL: str = "llama-3.3-70b-versatile"
    GROQ_API_BASE: str = "https://api.groq.com/openai/v1"
    LLM_TEMPERATURE: float = 0.0
    LLM_MAX_TOKENS: int = 2048
    LLM_REQUEST_TIMEOUT: int = 60

    # ----------------------------------------------------------- RAG / KB
    KNOWLEDGE_DIR: Path = BASE_DIR / "knowledge"
    CHROMA_PERSIST_DIR: Path = BASE_DIR / "data" / "chroma"
    CHROMA_COLLECTION_NAME: str = "portfolio_knowledge"
    BM25_INDEX_DIR: Path = BASE_DIR / "data" / "bm25"

    EMBEDDING_MODEL_NAME: str = "sentence-transformers/all-MiniLM-L6-v2"
    RERANKER_MODEL_NAME: str = "cross-encoder/ms-marco-MiniLM-L-6-v2"

    CHUNK_SIZE: int = 450
    CHUNK_OVERLAP: int = 80

    # Hybrid retrieval weights (must sum to 1.0)
    DENSE_WEIGHT: float = 0.6
    SPARSE_WEIGHT: float = 0.4

    RETRIEVAL_TOP_K: int = 20        # candidates pulled from hybrid retrieval
    RERANK_TOP_K: int = 7            # final chunks kept after cross-encoder rerank
    MIN_RELEVANCE_SCORE: float = 0.05  # rerank score floor; below this we treat as "no context"

    CONVERSATION_HISTORY_TURNS: int = 8  # short-term memory window (user+assistant pairs)

    # ------------------------------------------------------------- Resume
    RESUME_FILE_PATH: Path = BASE_DIR / "static" / "resume.pdf"
    RESUME_FILENAME: str = "Resume.pdf"

    # --------------------------------------------------------- Rate limit
    CHAT_RATE_LIMIT_PER_MINUTE: int = 15
    CONTACT_RATE_LIMIT_PER_HOUR: int = 5


@lru_cache
def get_settings() -> Settings:
    """Return a cached Settings singleton."""
    return Settings()
