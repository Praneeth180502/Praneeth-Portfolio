import { motion } from "framer-motion";
import { ExternalLink, BarChart3, Bot, Activity, Video, GraduationCap, FolderSearch, Zap, Github } from "lucide-react";

const projects = [
  {
    title: "NaukriBot — Autonomous Job Application Agent",
    icon: Bot,
    description:
      "NaukriBot is an autonomous job-application agent that automates Naukri searching and applying end to end. It uses Playwright with stealth for persistent sessions, semantic resume-to-job matching (SentenceTransformers + FAISS), and a screening Q&A solver, with a Telegram bot for control and a FastAPI dashboard for analytics.",
    tech: ["Playwright", "SentenceTransformers", "FAISS", "FastAPI", "Telegram Bot", "Python"],
    client: "AI Automation Agent",
    color: "#10b981",
    featured: true,
    github: "https://github.com/Praneeth180502/NaukriBot.git",
  },
  {
    title: "AURASELECT — AI Video Interview Evaluator",
    icon: Video,
    description:
      "AI-powered platform automating the HR screening process. Candidates record responses via webcam; an AI pipeline transcribes audio using Groq Whisper, semantically evaluates against benchmark answers, and produces comprehensive score reports.",
    tech: ["React", "FastAPI", "Groq Whisper", "LLMs", "AI Evaluation"],
    client: "HR Tech Platform",
    color: "#ef4444",
    featured: true,
  },
  {
    title: "OpenViz — Generative AI Analytics Platform",
    icon: BarChart3,
    description:
      "Prompt-driven data analytics platform turning raw datasets into interactive charts through natural language commands. Client-side RAG with Arquero for zero-latency profiling and data privacy.",
    tech: ["React 19", "Vega-Lite", "Llama 4", "Groq SDK", "Arquero", "RAG"],
    client: "GenAI Platform",
    color: "#3b82f6",
    featured: true,
  },
  {
    title: "SiLens AI — STEM Learning Platform",
    icon: GraduationCap,
    description:
      "Transforms static STEM documents into interactive experiences. PaddleOCR + Pix2Tex extract equations to LaTeX; FastAPI Clean Architecture with hot-swappable LLM providers powers document-grounded Q&A.",
    tech: ["FastAPI", "React", "TypeScript", "Groq LLM", "PaddleOCR", "Pix2Tex"],
    client: "EdTech Platform",
    color: "#8b5cf6",
    featured: true,
  },
  {
    title: "AI File Explorer — Local AI Search",
    icon: FolderSearch,
    description:
      "Privacy-first desktop AI app for semantic search across local files. Runs in Electron with real-time folder monitoring, multi-format parsing, and hybrid local/cloud LLM execution.",
    tech: ["FastAPI", "React", "Electron", "Ollama", "ChromaDB", "PyMuPDF"],
    client: "Desktop Platform",
    color: "#06b6d4",
    featured: false,
  },
  {
    title: "Meet-Ops — AI Meeting Analytics",
    icon: Bot,
    description:
      "Autonomous meeting bot joining Microsoft Teams calls, capturing transcripts, and surfacing AI summaries on a centralized dashboard using Hugging Face Transformers.",
    tech: ["React.js", "FastAPI", "AI/ML", "PostgreSQL", "MS Teams API"],
    client: "Adani (via CognitBotz)",
    color: "#10b981",
    featured: false,
  },
  {
    title: "Live Missile Trajectory Simulation",
    icon: Activity,
    description:
      "Real-time simulation and visualization platform presenting live missile telemetry data including acceleration, velocity, height, and flight trajectory streams using WebSockets.",
    tech: ["React.js", "Python", "FastAPI", "WebSockets", "Data Simulation"],
    client: "DRDO",
    color: "#8b5cf6",
    featured: false,
  },
  {
    title: "NOC Data Analytics Dashboard",
    icon: BarChart3,
    description:
      "Enterprise operational dashboard featuring a 4-level hierarchical data model for organizing and filtering huge operational datasets with high rendering performance.",
    tech: ["React.js", "FastAPI", "PostgreSQL", "Hierarchical Data Model"],
    client: "Adani (via CognitBotz)",
    color: "#f59e0b",
    featured: false,
  },
  {
    title: "App Connectivity Dashboard",
    icon: Activity,
    description:
      "Operational dashboard visualizing Excel/CSV datasets with dynamic cascading filters (State → Region → Substation), KPI summary cards, and interactive charts.",
    tech: ["React.js", "FastAPI", "PostgreSQL", "Charts"],
    client: "Adani (via CognitBotz)",
    color: "#ec4899",
    featured: false,
  },
  {
    title: "Landed Tariff Data Visualization",
    icon: BarChart3,
    description:
      "Analytics dashboard processing landed tariff datasets with multi-level dependent filters backed by REST APIs processing CSV/Excel into structured JSON responses.",
    tech: ["React.js", "FastAPI", "Python", "Data Analytics"],
    client: "Adani (via CognitBotz)",
    color: "#6366f1",
    featured: false,
  },
];

const ProjectsSection = () => {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section-padding" style={{ background: "transparent" }}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label mb-3">Projects</p>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 800,
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#f1f5f9",
              marginBottom: "0.75rem",
              lineHeight: 1.2,
            }}
          >
            Featured <span className="gradient-text">Projects</span> & Solutions
          </h2>
          <p style={{ color: "#64748b", maxWidth: "36rem", marginBottom: "3rem", fontSize: "0.95rem", lineHeight: 1.7 }}>
            Enterprise-grade dashboards and AI-powered platforms — from data visualization engines to agentic RAG systems.
          </p>
        </motion.div>

        {/* Featured projects — large cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {featured.map(({ title, icon: Icon, description, tech, client, color, github }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.01 }}
              style={{
                background: "rgba(15, 23, 42, 0.7)",
                backdropFilter: "blur(24px)",
                border: `1px solid ${color}25`,
                borderRadius: 20,
                padding: "1.75rem",
                position: "relative",
                overflow: "hidden",
                cursor: "default",
                transition: "border-color 0.3s, box-shadow 0.3s",
                boxShadow: "0 8px 40px rgba(0,0,0,0.45)",
              }}
            >
              {/* Corner glow */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 120,
                  height: 120,
                  background: `radial-gradient(circle at top right, ${color}18, transparent 70%)`,
                  pointerEvents: "none",
                }}
              />
              {/* Top accent bar */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(90deg, ${color}, transparent)`,
                }}
              />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 14,
                    background: `${color}15`,
                    border: `1px solid ${color}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={22} style={{ color }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span
                    style={{
                      padding: "3px 10px",
                      borderRadius: 999,
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      background: `${color}18`,
                      border: `1px solid ${color}35`,
                      color,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <Zap size={10} /> Featured
                  </span>
                  {github ? (
                    <a
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        padding: "4px 10px",
                        borderRadius: 999,
                        background: "rgba(16, 185, 129, 0.2)",
                        border: "1px solid rgba(16, 185, 129, 0.5)",
                        color: "#34d399",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        textDecoration: "none",
                        transition: "all 0.2s ease",
                        boxShadow: "0 0 14px rgba(16, 185, 129, 0.3)",
                      }}
                      className="hover:scale-105 hover:bg-emerald-500/30"
                      title="View GitHub Repository"
                    >
                      <Github size={13} />
                      <span>Repo</span>
                    </a>
                  ) : (
                    <ExternalLink size={16} style={{ color: "#475569" }} />
                  )}
                </div>
              </div>

              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "#f1f5f9",
                  marginBottom: 6,
                  lineHeight: 1.35,
                }}
              >
                {title}
              </h3>
              <p style={{ color, fontSize: "0.75rem", fontWeight: 600, marginBottom: 10 }}>
                {client}
              </p>
              <p style={{ color: "#94a3b8", fontSize: "0.875rem", lineHeight: 1.65, marginBottom: "1rem" }}>
                {description}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {tech.map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: "3px 10px",
                      borderRadius: 999,
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      background: `${color}10`,
                      border: `1px solid ${color}22`,
                      color: "#94a3b8",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {github && (
                <div style={{ marginTop: "1.25rem", paddingTop: "0.85rem", borderTop: `1px dashed ${color}35` }}>
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "7px 16px",
                      borderRadius: 12,
                      background: `${color}18`,
                      border: `1px solid ${color}50`,
                      color: "#ffffff",
                      fontSize: "0.825rem",
                      fontWeight: 700,
                      textDecoration: "none",
                      transition: "all 0.25 ease",
                      boxShadow: `0 0 20px ${color}35`,
                    }}
                    className="hover:scale-105 hover:bg-emerald-500/25 group"
                  >
                    <Github size={16} style={{ color }} className="transition-transform group-hover:rotate-12" />
                    <span>View GitHub Repository</span>
                    <ExternalLink size={13} style={{ opacity: 0.8 }} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Other projects — compact grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {rest.map(({ title, icon: Icon, description, tech, client, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -4 }}
              style={{
                background: "rgba(15, 23, 42, 0.6)",
                backdropFilter: "blur(20px)",
                border: `1px solid ${color}20`,
                borderRadius: 16,
                padding: "1.4rem 1.6rem",
                position: "relative",
                overflow: "hidden",
                cursor: "default",
                transition: "border-color 0.25s, box-shadow 0.25s",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 10 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: `${color}12`,
                    border: `1px solid ${color}25`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      color: "#f1f5f9",
                      marginBottom: 2,
                      lineHeight: 1.3,
                    }}
                  >
                    {title}
                  </h3>
                  <p style={{ color: "#64748b", fontSize: "0.73rem", fontWeight: 600 }}>
                    {client}
                  </p>
                </div>
              </div>
              <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 12 }}>
                {description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {tech.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: "3px 10px",
                      borderRadius: 999,
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      background: `${color}10`,
                      border: `1px solid ${color}22`,
                      color: "#94a3b8",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
