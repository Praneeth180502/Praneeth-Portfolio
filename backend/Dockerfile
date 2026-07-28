# syntax=docker/dockerfile:1

# ---------------------------------------------------------------------------
# Stage 1: builder — install Python dependencies into a virtualenv
# ---------------------------------------------------------------------------
FROM python:3.11-slim AS builder

WORKDIR /build

# System deps needed to build some Python packages (torch, chromadb, etc.)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# ---------------------------------------------------------------------------
# Stage 2: runtime — slim final image
# ---------------------------------------------------------------------------
FROM python:3.11-slim AS runtime

# Non-root user for security (with home directory)
RUN groupadd -r appuser && useradd -r -m -g appuser appuser

WORKDIR /app

# System runtime deps (libpq for psycopg2, curl for healthcheck)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    curl \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH" \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    HF_HOME="/home/appuser/.cache/huggingface" \
    OMP_NUM_THREADS=1 \
    MKL_NUM_THREADS=1 \
    OPENBLAS_NUM_THREADS=1 \
    VECLIB_MAXIMUM_THREADS=1 \
    NUMEXPR_NUM_THREADS=1

# Pre-download embedding + reranker models at build time so cold starts in
# production don't pay the download cost. Comment out to keep the image
# smaller and download models lazily on first startup instead.
RUN python -c "\
from sentence_transformers import SentenceTransformer, CrossEncoder; \
SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2'); \
CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')"

COPY ./app ./app
COPY ./knowledge ./knowledge
COPY ./scripts ./scripts
COPY ./alembic ./alembic
COPY ./alembic.ini .

RUN mkdir -p /app/data/chroma /app/data/bm25 /app/static /home/appuser/.cache && \
    chown -R appuser:appuser /app /home/appuser

USER appuser

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:8000/api/health || exit 1

# Use a single worker by default for the RAG models' in-memory caches;
# scale horizontally with multiple containers instead of --workers if you
# need more throughput (each worker would otherwise load its own copy of
# the embedding/reranker models into memory).
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
