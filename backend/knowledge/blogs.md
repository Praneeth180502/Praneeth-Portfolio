# Technical Insights & Notes by Praneeth Reddy Ankey

## Why Hybrid Retrieval Matters (Praneeth's Approach)

In building AI-powered applications, Praneeth found that relying solely on dense embedding search left gaps for exact-match queries — especially around specific technology names, acronyms (like "BM25", "FastAPI", "Vega-Lite"), and proper nouns. To address this, Praneeth implemented a hybrid retrieval approach combining dense vector search (ChromaDB with sentence-transformers) with BM25 keyword search, normalizing both scores to [0,1] and fusing them at a 60/40 or 70/30 dense-to-sparse weighting. This pattern is used across his AI File Explorer and portfolio chatbot projects.

## Anti-Hallucination in AI Products (Praneeth's Approach)

Praneeth's approach to building grounded AI systems involves three layers:
1. **Retrieval-level guard:** If no relevant chunks are retrieved, the system returns a "no information" message without calling the LLM at all.
2. **Relevance floor:** After cross-encoder reranking, chunks below a minimum relevance score are discarded.
3. **Prompt-level grounding:** The system prompt explicitly instructs the model to answer only from provided context and to acknowledge gaps honestly.

This strategy keeps AI assistants useful without hallucinating facts.

## Migrating to FastAPI with Clean Architecture

In 2024, Praneeth migrated a Flask-based service to FastAPI using async SQLAlchemy 2.0. The key architectural pattern he adopted was a strict three-layer separation:
- **Routers** — handle HTTP only, no business logic
- **Services** — orchestrate use cases
- **Repositories** — encapsulate all database access

This made the service significantly faster (reduced latency by ~40%) and easier to test and maintain.

## Real-Time Data Streaming with WebSockets

During his DRDO internship, Praneeth built real-time missile trajectory dashboards using WebSocket streaming from Python/FastAPI backends to React.js frontends. The key challenge was efficiently rendering high-frequency data updates without causing UI jitter — solved by batching updates and using a hierarchical 4-level data model (Main Category → Sub Category → Time-based grouping → Metrics) to enable selective loading.

## Client-Side RAG with Arquero (OpenViz)

In OpenViz, Praneeth implemented a fully client-side RAG pipeline using Arquero for in-browser data profiling. This design keeps all user data local (zero-latency, privacy-preserving) while still providing context-aware AI chart suggestions powered by Llama 4 via Groq SDK.

## Multi-Format Document Processing (SiLens AI & AI File Explorer)

For STEM document ingestion in SiLens AI, Praneeth built an end-to-end pipeline combining OpenCV preprocessing (denoising, deskewing), PaddleOCR for text extraction, and Pix2Tex for converting math equations into clean LaTeX. For the AI File Explorer, he used PyMuPDF for PDF parsing across multiple formats, with background chunking and embedding in a ThreadPoolExecutor to avoid blocking the main thread.

## AI Meeting Automation (Meet-Ops at CognitBotz/Adani)

Praneeth designed and delivered Meet-Ops — an autonomous bot that joins Microsoft Teams calls, captures raw transcripts, and runs them through a Hugging Face Transformers summarization pipeline to extract actionable insights. The results are surfaced on a React dashboard backed by FastAPI and PostgreSQL, deployed with Docker and secured with JWT authentication.
