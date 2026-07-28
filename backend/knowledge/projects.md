# Projects Portfolio

## 1. OpenViz — Generative AI Analytics Platform
- **Role & Client:** Creator / GenAI Platform
- **Tech Stack:** React 19, TypeScript, Vega-Lite, Llama 4, Groq SDK, Arquero, RAG
- **General Description:** OpenViz is a prompt-driven visualization engine featuring a hybrid drag-and-drop and natural language AI interface powered by Llama 4 via Groq SDK.
- **Key Features & Architecture:**
  - Architected a React 19 & Vega-Lite visualization engine enabling instant prompt-driven chart generation.
  - Implemented a client-side RAG pipeline with Arquero for zero-latency data profiling and context-aware chart suggestions.
  - Applied prompt engineering techniques to optimize LLM output structure for reliable Vega-Lite spec generation while preserving complete data privacy.

## 2. SiLens AI — AI-Powered STEM Learning Platform
- **Role & Client:** Creator / EdTech Platform
- **Tech Stack:** FastAPI, React, TypeScript, Groq LLM, PaddleOCR, Pix2Tex, OpenCV, SQLite/PostgreSQL
- **General Description:** SiLens AI is an intelligent STEM education platform that transforms static learning documents into interactive study experiences.
- **Key Features & Architecture:**
  - Architected an end-to-end document parsing and ingestion pipeline integrating OpenCV preprocessing (denoising, deskewing) with PaddleOCR and Pix2Tex to extract plain text and compile complex math equations into clean LaTeX.
  - Built a FastAPI backend using Clean (Hexagonal) Architecture with dependency injection, supporting hot-swappable LLM providers (Groq/Llama-3) and caching generated educational outputs to reduce latency.
  - Designed a state-safe React frontend with TanStack Start, Router, and Query for interactive quizzes, real-time document upload, and document-grounded Q&A chat.

## 3. AI File Explorer — Local AI Indexing & Search Platform
- **Role & Client:** Creator / Desktop Platform
- **Tech Stack:** FastAPI, React, TypeScript, Electron, Ollama, Groq, ChromaDB, PyMuPDF, watchdog
- **General Description:** AI File Explorer is a privacy-first desktop application for instant semantic search and natural-language interaction across local files and codebases.
- **Key Features & Architecture:**
  - Operating locally inside an Electron shell, it uses Python's watchdog library to monitor local folders in real-time.
  - Parses multi-format documents (PDFs, Markdown, source code) with PyMuPDF and runs background chunking and embedding in a ThreadPoolExecutor.
  - Built a local vector search engine using sentence-transformers (`all-MiniLM-L6-v2`) and ChromaDB vector database, paired with a hybrid LLM execution layer supporting local Ollama (`llama3.2`) and cloud Groq API endpoints.

## 4. AURASELECT — AI Video Interview Evaluator
- **Role & Client:** Creator / HR Tech Platform
- **Tech Stack:** React, FastAPI, Groq Whisper, LLMs, AI Evaluation
- **General Description:** An AI-powered platform designed to automate and enhance the HR screening process.
- **Key Features & Architecture:**
  - Candidates record video responses via webcam/microphone.
  - An advanced AI pipeline transcribes speech using Groq Whisper, semantically analyzes responses against ideal candidate benchmark answers, and produces multi-dimensional performance score reports.

## 5. Meet-Ops — AI Meeting Automation System
- **Role & Client:** Creator / CognitBotz (Client: Adani)
- **Tech Stack:** Microsoft Teams API, React.js, TypeScript, Docker, PostgreSQL, Hugging Face Transformers
- **General Description:** Autonomous meeting assistant bot that joins Microsoft Teams calls, captures and stores transcripts, and surfaces AI summaries.
- **Key Features & Architecture:**
  - Captures call transcripts automatically and stores data in PostgreSQL.
  - Runs AI summarization pipelines powered by Hugging Face Transformers to extract actionable meeting insights and display them on a React dashboard.

## 6. App Connectivity Dashboard
- **Role & Client:** Full Stack Developer Intern / CognitBotz (Client: Adani)
- **Tech Stack:** React.js, FastAPI, PostgreSQL, Interactive Charts
- **General Description:** Responsive operational dashboard visualizing Excel/CSV datasets.
- **Key Features:** Dynamic cascading filters (State → Region → Substation), KPI summary cards, and interactive operational metrics charts.

## 7. Landed Tariff Data Visualization
- **Role & Client:** Full Stack Developer Intern / CognitBotz (Client: Adani)
- **Tech Stack:** React.js, FastAPI, Python, Data Analytics
- **General Description:** Analytics dashboard designed to process and analyze landed tariff datasets.
- **Key Features:** Dependent multi-level filters (State → Region → Substation) backed by REST APIs processing CSV and Excel datasets into structured JSON responses.

## 8. NOC Dashboard & Live Missile Trajectory Visualization
- **Role & Client:** Project Intern / DRDO & CognitBotz (Adani)
- **Tech Stack:** React.js, Python, FastAPI, WebSockets, Performance Optimization
- **General Description:** High-performance dashboard rendering live simulation streams and large operational datasets.
- **Key Features:** 4-level hierarchical data model (`Main Category → Sub Category → Time-based grouping → Metrics`), real-time WebSocket stream rendering, dynamic filtering, and automated mission report generation.
