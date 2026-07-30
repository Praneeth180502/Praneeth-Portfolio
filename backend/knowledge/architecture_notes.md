# Technical Architecture Philosophy — Praneeth Reddy Ankey

## Backend Architecture Philosophy

Praneeth favors a clean, layered architecture that separates concerns clearly:
- **Routers (API layer):** HTTP concerns only — request/response schemas, status codes,
  dependency injection wiring. No business logic here.
- **Services (business logic layer):** Orchestrate use cases, enforce business rules, and
  coordinate between repositories and external integrations (LLM providers, email, etc.).
- **Repositories (data access layer):** Encapsulate all database queries behind a clean
  interface, keeping SQLAlchemy specifics out of the service layer.
- **Models & Schemas:** ORM models (SQLAlchemy) are kept separate from API schemas (Pydantic)
  so the database shape and the public API contract can evolve independently.

This architecture pattern is used in all of Praneeth's FastAPI projects including SiLens AI, AURASELECT, the portfolio backend, and enterprise dashboards at CognitBotz/Adani.

## RAG System Design Decisions

Praneeth's approach to building Retrieval-Augmented Generation (RAG) systems:

1. **Chunking:** Documents are split into ~450-character overlapping chunks with 80-character overlap using a recursive character text splitter that respects markdown headings and paragraph boundaries.
2. **Embedding:** Chunks are embedded using `sentence-transformers/all-MiniLM-L6-v2` (384-dimensional, normalized for cosine similarity) and stored in ChromaDB.
3. **Sparse Indexing:** The same chunks are tokenized and indexed with BM25 (rank_bm25) for keyword-level matching — crucial for exact technology names and acronyms.
4. **Hybrid Retrieval:** Both indices queried concurrently; scores normalized to [0, 1] and fused at 60% dense + 40% sparse weighting.
5. **Cross-Encoder Reranking:** Fused candidates re-scored by `cross-encoder/ms-marco-MiniLM-L-6-v2` for high precision before passing to the LLM.
6. **Grounded Generation:** LLM (Groq's Llama 3.3 70B) instructed to answer strictly from retrieved context and to acknowledge when information is unavailable.
7. **Streaming:** Answer streams to the frontend via Server-Sent Events (SSE) for real-time token-by-token delivery.

## Why Hybrid Retrieval?

Pure embedding search sometimes under-ranks chunks containing exact keyword matches (proper nouns, specific technology names, version numbers) because semantic similarity can dilute their importance. BM25 catches these reliably, while dense retrieval captures paraphrased or conceptually related questions. Fusing both and reranking with a cross-encoder gives the best of both worlds. Praneeth applies this pattern in OpenViz, AI File Explorer, and SiLens AI.

## Anti-Hallucination Design

Three layers prevent the AI from generating false information:
1. **Retrieval-level:** If hybrid retrieval returns zero candidates, the system short-circuits and returns a canned "I don't have that information" response without calling the LLM.
2. **Relevance floor:** Reranked candidates below a minimum relevance score are discarded.
3. **Prompt-level:** The system prompt explicitly instructs the model to answer only from the provided context and to admit when it doesn't know something.

## Real-Time Streaming Architecture & Live Data Flow

For real-time data movement, Praneeth implements low-latency streaming patterns tailored to the use case:
- **Server-Sent Events (SSE)** for unidirectional LLM token streaming to the personal portfolio chat UI. Tokens are packed into lightweight `data: {"type": "token", "content": "..."}` JSON frames and emitted over an unbuffered HTTP stream (`X-Accel-Buffering: no`, `Cache-Control: no-cache`). This functions analogous to a live video stream where each token delta is a frame delivered to the client's `ReadableStream` reader and rendered instantly by the React state.
- **WebSockets** for bidirectional real-time data streams (e.g., DRDO missile telemetry tracking dashboards and Meet-Ops transcript events).
- **ThreadPoolExecutor / Async Workers** for CPU-bound background tasks (chunking, embedding, cross-encoder reranking) without blocking FastAPI's central async event loop.

### Live Data Movement Sequence (End-to-End Hop-by-Hop)

1. **User Prompt Capture:** React UI captures `message` and `session_id`, delegating to `streamChatMessage()` in `lib/api.ts`.
2. **FastAPI Ingestion & Rate Limiting:** `POST /api/chat` validates `ChatRequest`, checks client IP token bucket, and invokes `ChatService.stream_answer()`.
3. **Session Context Fetching:** `ConversationMemory` loads previous conversation turns asynchronously from PostgreSQL via SQLAlchemy 2.0 / AsyncPG.
4. **Hybrid Retrieval:** Query is executed against ChromaDB (384-dimensional dense embeddings via `all-MiniLM-L6-v2`) and BM25 sparse index (`rank_bm25`). Candidates are normalized and weighted (70% dense + 30% sparse).
5. **Cross-Encoder Reranking:** Candidates pass through `ms-marco-MiniLM-L-6-v2`. Any chunk below `MIN_RELEVANCE_SCORE` is filtered out.
6. **Prompt Assembly:** System prompt injects strict grounding anti-hallucination constraints along with reranked context and conversation history.
7. **LLM Generation Stream:** Groq Cloud API (`llama-3.3-70b-versatile`) streams response deltas.
8. **SSE Frame Pipeline:** `ChatService` yields SSE frames instantly. The browser's `TextDecoder` parses buffer lines and updates React UI state frame-by-frame.
9. **Async Persistence:** Turn history, source citations, and latency metrics are saved to PostgreSQL without delaying stream termination.

## Containerization & DevOps

Praneeth deploys services using Docker, sets up automated CI/CD with GitHub Actions, and has experience with AWS S3 and GCP Cloud Run for cloud deployments. JWT-based authentication is used for secure session management across his enterprise dashboard projects at CognitBotz.
