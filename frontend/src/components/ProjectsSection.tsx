import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Github, ExternalLink } from "lucide-react";

/* ── Pipeline pulse SVG background ── */
function PipelineBg() {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.12,
        pointerEvents: "none",
      }}
      preserveAspectRatio="none"
    >
      <defs>
        <style>{`
          @keyframes pulse-dot {
            0%   { opacity: 0; }
            5%   { opacity: 1; }
            90%  { opacity: 1; }
            100% { opacity: 0; }
          }
          .pipe-path { fill: none; stroke: #06b6d4; stroke-width: 1; }
          .pulse { animation: pulse-dot 6s linear infinite; }
          .pulse1 { animation-delay: 0s; }
          .pulse2 { animation-delay: 2s; }
          .pulse3 { animation-delay: 4s; }
        `}</style>
      </defs>
      {/* Horizontal pipeline: Agent → Retriever → LLM */}
      <path className="pipe-path" d="M 5% 50% H 35%" />
      <path className="pipe-path" d="M 40% 50% H 65%" />
      <path className="pipe-path" d="M 70% 50% H 95%" />
      {/* Node circles */}
      <circle cx="35%" cy="50%" r="4" fill="#06b6d4" />
      <circle cx="65%" cy="50%" r="4" fill="#06b6d4" />
      {/* Labels */}
      <text x="18%" y="44%" fill="#06b6d4" fontSize="10" textAnchor="middle" fontFamily="monospace">Agent</text>
      <text x="50%" y="44%" fill="#06b6d4" fontSize="10" textAnchor="middle" fontFamily="monospace">Retriever</text>
      <text x="82%" y="44%" fill="#06b6d4" fontSize="10" textAnchor="middle" fontFamily="monospace">LLM</text>
      {/* Pulse dots travelling along paths */}
      <circle r="4" fill="#22d3ee" opacity="0" className="pulse pulse1">
        <animateMotion dur="6s" repeatCount="indefinite" begin="0s">
          <mpath href="#path1" />
        </animateMotion>
      </circle>
      <circle r="4" fill="#3b82f6" opacity="0" className="pulse pulse2">
        <animateMotion dur="6s" repeatCount="indefinite" begin="2s">
          <mpath href="#path2" />
        </animateMotion>
      </circle>
      <path id="path1" d="M 5% 50% H 35%" style={{ display: "none" }} />
      <path id="path2" d="M 40% 50% H 95%" style={{ display: "none" }} />
    </svg>
  );
}

const FILTERS = ["All", "AI Agents", "RAG", "Full-stack", "Automation"];

type Project = {
  title: string;
  category: string;
  filters: string[];
  outcome: string;
  capabilities: string[];
  tech: string[];
  color: string;
  github?: string;
  url?: string;
};

const projects: Project[] = [
  {
    title: "NaukriBot",
    category: "AI · Automation",
    filters: ["AI Agents", "Automation"],
    outcome: "Autonomous job-application agent that applies to 50+ Naukri listings daily with zero manual effort.",
    capabilities: [
      "Persistent browser sessions (Playwright + stealth)",
      "Semantic resume-to-job matching (SentenceTransformers + FAISS)",
      "Screening Q&A solver",
      "Telegram control + FastAPI analytics dashboard",
    ],
    tech: ["Playwright", "SentenceTransformers", "FAISS", "FastAPI", "Telegram Bot", "Python"],
    color: "#06b6d4",
    github: "https://github.com/Praneeth180502/NaukriBot.git",
  },
  {
    title: "AURASELECT",
    category: "AI · HR Tech",
    filters: ["AI Agents", "RAG"],
    outcome: "AI platform that automates HR screening — candidates record, AI scores and reports in minutes.",
    capabilities: [
      "Webcam video capture and Groq Whisper transcription",
      "Semantic evaluation against benchmark answers",
      "Comprehensive AI score reports",
      "Multi-candidate batch processing",
    ],
    tech: ["React", "FastAPI", "Groq Whisper", "LLMs"],
    color: "#3b82f6",
  },
  {
    title: "OpenViz",
    category: "GenAI · Analytics",
    filters: ["RAG", "Full-stack"],
    outcome: "Natural-language data analytics platform turning raw CSV into interactive charts in seconds.",
    capabilities: [
      "Prompt-driven chart generation (Vega-Lite)",
      "Client-side RAG with Arquero — zero latency, full data privacy",
      "Llama 4 + Groq SDK integration",
      "React 19 with streaming responses",
    ],
    tech: ["React 19", "Vega-Lite", "Llama 4", "Groq SDK", "Arquero"],
    color: "#3b82f6",
  },
  {
    title: "SiLens AI",
    category: "EdTech · RAG",
    filters: ["RAG", "Full-stack"],
    outcome: "Transforms static STEM PDFs into an interactive Q&A tutor with LaTeX equation support.",
    capabilities: [
      "PaddleOCR + Pix2Tex equation extraction to LaTeX",
      "FastAPI Clean Architecture with hot-swappable LLM providers",
      "Document-grounded Q&A with source citations",
      "TypeScript + React frontend",
    ],
    tech: ["FastAPI", "React", "TypeScript", "Groq LLM", "PaddleOCR"],
    color: "#06b6d4",
  },
  {
    title: "AI File Explorer",
    category: "Desktop · AI Search",
    filters: ["AI Agents", "RAG"],
    outcome: "Privacy-first desktop app for semantic search across local files — entirely offline.",
    capabilities: [
      "Electron app with real-time folder monitoring",
      "Multi-format parsing (PDF, DOCX, TXT)",
      "Hybrid local/cloud LLM (Ollama + ChromaDB)",
      "Zero data leaves the machine",
    ],
    tech: ["FastAPI", "React", "Electron", "Ollama", "ChromaDB"],
    color: "#06b6d4",
  },
  {
    title: "Meet-Ops AI",
    category: "AI · Enterprise",
    filters: ["AI Agents", "Full-stack"],
    outcome: "Autonomous meeting bot that joins Teams calls, captures transcripts, and surfaces AI summaries.",
    capabilities: [
      "MS Teams API integration",
      "Hugging Face Transformers summarisation",
      "Centralised analytics dashboard",
      "PostgreSQL history store",
    ],
    tech: ["React.js", "FastAPI", "AI/ML", "PostgreSQL", "MS Teams API"],
    color: "#3b82f6",
  },
  {
    title: "NOC Analytics Dashboard",
    category: "Enterprise · Data",
    filters: ["Full-stack"],
    outcome: "Enterprise operational dashboard processing millions of rows with sub-second filter response.",
    capabilities: [
      "4-level hierarchical data model",
      "High-performance rendering with virtual scroll",
      "PostgreSQL + REST API backend",
      "Delivered for Adani via CognitBotz",
    ],
    tech: ["React.js", "FastAPI", "PostgreSQL"],
    color: "#3b82f6",
  },
  {
    title: "Live Missile Trajectory",
    category: "Defence · Real-time",
    filters: ["Full-stack"],
    outcome: "Real-time telemetry platform streaming live missile data — acceleration, velocity, trajectory.",
    capabilities: [
      "WebSocket real-time data pipeline",
      "2D/3D trajectory visualisation",
      "Python simulation backend",
      "Delivered for DRDO",
    ],
    tech: ["React.js", "Python", "FastAPI", "WebSockets"],
    color: "#06b6d4",
  },
  {
    title: "App Connectivity Dashboard",
    category: "Enterprise · Analytics",
    filters: ["Full-stack"],
    outcome: "Operational dashboard with cascading State→Region→Substation filters over dynamic CSV datasets.",
    capabilities: [
      "Dynamic cascading filter architecture",
      "KPI summary cards with trend indicators",
      "Interactive Recharts visualisations",
      "Excel/CSV ingestion pipeline",
    ],
    tech: ["React.js", "FastAPI", "PostgreSQL"],
    color: "#3b82f6",
  },
  {
    title: "Landed Tariff Visualisation",
    category: "Enterprise · Analytics",
    filters: ["Full-stack"],
    outcome: "Tariff analytics dashboard processing multi-level CSV datasets into structured REST responses.",
    capabilities: [
      "Multi-level dependent filter system",
      "CSV → JSON transformation pipeline",
      "Comparative tariff charts",
      "Delivered for Adani via CognitBotz",
    ],
    tech: ["React.js", "FastAPI", "Python"],
    color: "#06b6d4",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-card)",
        padding: "var(--pad-card)",
        transition: "border-color 150ms ease, background 150ms ease, box-shadow 150ms ease",
        position: "relative",
        overflow: "hidden",
      }}
      onHoverStart={(e) => {
        const el = e.target as HTMLElement;
        const card = el.closest("[data-project-card]") as HTMLElement;
        if (card) {
          card.style.borderColor = `${project.color}66`;
          card.style.background = "var(--surface-2)";
          card.style.boxShadow = `0 0 20px ${project.color}12`;
        }
      }}
      onHoverEnd={(e) => {
        const el = e.target as HTMLElement;
        const card = el.closest("[data-project-card]") as HTMLElement;
        if (card) {
          card.style.borderColor = "var(--border)";
          card.style.background = "var(--surface)";
          card.style.boxShadow = "none";
        }
      }}
      data-project-card=""
    >
      {/* Index number */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <span className="card-index">{num}</span>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "4px 10px",
              borderRadius: 999,
              background: "rgba(6,182,212,0.08)",
              border: "1px solid rgba(6,182,212,0.3)",
              color: "var(--accent)",
              fontSize: "0.72rem",
              fontFamily: "'JetBrains Mono', monospace",
              textDecoration: "none",
              transition: "all 150ms ease",
            }}
            title="View GitHub Repository"
          >
            <Github size={12} />
            Repo
          </a>
        )}
      </div>

      {/* Category */}
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.72rem",
          color: "var(--text-muted)",
          marginBottom: 6,
          letterSpacing: "0.04em",
        }}
      >
        {project.category}
      </p>

      {/* Title */}
      <h3
        style={{
          fontSize: "1.1rem",
          fontWeight: 500,
          color: "var(--text-strong)",
          marginBottom: 8,
          lineHeight: 1.35,
        }}
      >
        {project.title}
      </h3>

      {/* Outcome */}
      <p style={{ fontSize: "0.875rem", color: "var(--text)", lineHeight: 1.65, marginBottom: 14 }}>
        {project.outcome}
      </p>

      {/* Tech chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
        {project.tech.map((t) => (
          <span key={t} className="chip">{t}</span>
        ))}
      </div>

      {/* View details toggle */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          color: "var(--accent)",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.8rem",
          fontWeight: 500,
        }}
        aria-expanded={open}
      >
        View details
        <ChevronDown
          size={14}
          style={{
            transition: "transform 200ms ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      {/* Expandable capabilities panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                marginTop: 16,
                paddingTop: 16,
                borderTop: "1px solid var(--border)",
              }}
            >
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.72rem",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: 10,
                }}
              >
                Core capabilities
              </p>
              <ul style={{ paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                {project.capabilities.map((cap) => (
                  <li
                    key={cap}
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text)",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                    }}
                  >
                    <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }}>–</span>
                    {cap}
                  </li>
                ))}
              </ul>
              {(project.github || project.url) && (
                <a
                  href={project.github ?? project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    marginTop: 14,
                    color: "var(--accent)",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "opacity 150ms ease",
                  }}
                >
                  Explore this work
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const sectionRef = useRef<HTMLElement>(null);

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.filters.includes(activeFilter));

  // Reveal on scroll
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    const reveals = sectionRef.current?.querySelectorAll(".reveal") ?? [];
    reveals.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding"
      style={{ background: "var(--bg)", position: "relative", overflow: "hidden" }}
    >
      <PipelineBg />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div className="reveal" style={{ marginBottom: "2.5rem" }}>
          <p className="section-label mb-3">Projects</p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 600,
              color: "var(--text-strong)",
              letterSpacing: "-0.01em",
              marginBottom: "0.75rem",
            }}
          >
            Systems built to work in the real world,{" "}
            <span className="gradient-text">not just demo well.</span>
          </h2>
          <p style={{ color: "var(--text-muted)", maxWidth: "38rem", fontSize: "0.95rem" }}>
            Enterprise dashboards and AI-powered platforms — from data analytics engines to agentic RAG systems.
          </p>
        </div>

        {/* Filter tabs */}
        <div
          className="reveal"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: "2.5rem",
          }}
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-pill${activeFilter === f ? " active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Cards grid — 3-up desktop, 2-up tablet, 1-up mobile */}
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
            gap: 20,
          }}
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
