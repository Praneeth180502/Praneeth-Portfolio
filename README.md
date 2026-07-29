# Praneeth Reddy Ankey — AI & Full-Stack Developer Portfolio

An interactive, AI-powered portfolio application featuring a full-stack architecture with a React + Vite frontend and a FastAPI + RAG (Retrieval-Augmented Generation) backend powered by Groq's Llama 3.3 70B model.

---

## 🌟 Key Features

- **AI Interactive Assistant**: RAG-powered chatbot answering questions about Praneeth's experience, skills, and projects using dense + sparse retrieval (ChromaDB + BM25 + Cross-Encoder Reranker).
- **Modern UI & Aesthetic**: Dynamic dark mode interface built with React, Vite, Tailwind CSS, Lucide icons, and Framer Motion micro-animations.
- **Direct Contact Links**: Clean contact section featuring direct email, phone, location, LinkedIn, and Naukri profile links.
- **Responsive & Performant**: Fully optimized for mobile, tablet, and desktop views.

---

## 🏗️ Project Architecture

```
Praneeth Portfolio/
├── frontend/                     # React + Vite Client Application
│   ├── src/
│   │   ├── components/           # UI Components (Hero, About, Skills, Projects, Contact, Navbar, Footer)
│   │   ├── lib/                  # API client & utility functions
│   │   ├── pages/                # Index and NotFound pages
│   │   ├── index.css             # Tailwind CSS tokens & glassmorphism styles
│   │   └── App.tsx               # Main application routing
│   ├── public/                   # Static assets & Resume
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                      # FastAPI + AI RAG Engine
│   ├── app/                      # Application routes, models, RAG pipeline, & services
│   ├── knowledge/                # Markdown Knowledge Base documents
│   ├── data/                     # Vector indices (ChromaDB & BM25)
│   ├── scripts/                  # Knowledge ingestion scripts
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── requirements.txt
│   └── .env.example
│
└── README.md                     # Project documentation
```

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS + Framer Motion
- **Icons**: Lucide React
- **Toast Notifications**: Sonner

### Backend

- **Framework**: FastAPI (Python 3.11+)
- **LLM Engine**: Groq API (`llama-3.3-70b-versatile`)
- **RAG & Vector DB**: ChromaDB + BM25 + Cross-Encoder Reranker (`ms-marco-MiniLM-L-6-v2`)
- **Database**: PostgreSQL + asyncpg (Alembic for migrations)
- **Deployment & Containers**: Docker & Docker Compose

---

## 🚀 Getting Started Locally

### Prerequisites

- Node.js (v18+) & npm
- Python (v3.10+)
- PostgreSQL (Optional for local dev without DB connection)
- Groq API Key (Free from [Groq Console](https://console.groq.com))

---

### 1. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment variables
cp .env.example .env

# Set your Groq API key in .env
# GROQ_API_KEY=gsk_your_groq_api_key

# Run local development server
python main.py
```

The API will run on `http://localhost:8000`.

---

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will run on `http://localhost:5173`.

---

## 📦 Deployment Instructions

### Frontend (Vercel)

1. Import the repository into **Vercel**.
2. Set the **Root Directory** to `frontend`.
3. Add Environment Variable:
   - `VITE_API_URL` = `https://your-backend-api.onrender.com`
4. Click **Deploy**.

### Backend (Render / Railway / Docker)

1. Deploy the `backend/` directory to **Render**, **Railway**, or any Docker-compatible server.
2. Set environment variables:
   - `GROQ_API_KEY`: Your Groq API key
   - `DATABASE_URL`: PostgreSQL connection string
   - `CORS_ORIGINS`: Your Vercel frontend URL
