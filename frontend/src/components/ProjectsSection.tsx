import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Github, ExternalLink, Bot, Video, BarChart3, GraduationCap, FolderSearch, Activity } from "lucide-react";

/* ── Pipeline pulse SVG background ── */
function PipelinePulseBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 400">
        <path
          d="M0,100 Q250,50 500,200 T1000,100"
          fill="none"
          stroke="#3f3f46"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <path
          d="M0,300 Q300,350 600,150 T1000,300"
          fill="none"
          stroke="#3f3f46"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      </svg>
    </div>
  );
}

const categories = ["All", "AI Agents", "RAG", "Full-stack", "Automation", "Enterprise"] as const;
type Category = (typeof categories)[number];

interface Project {
  id: string;
  index: string;
  title: string;
  categoryLabel: string;
  categoryGroup: Category[];
  outcome: string;
  description: string;
  capabilities: string[];
  metrics?: string;
  github?: string;
  liveUrl?: string;
  tags: string[];
  icon: typeof Bot;
}

const projects: Project[] = [
  {
    id: "naukribot",
    index: "01",
    title: "NaukriBot — Autonomous Job Application Agent",
    categoryLabel: "AI AGENT · AUTOMATION",
    categoryGroup: ["AI Agents", "Automation"],
    outcome: "Autonomous job search & auto-apply agent handling end-to-end applications with AI screening Q&A.",
    description: "NaukriBot automates Naukri job searching and multi-step application submission. Uses Playwright with stealth for persistent sessions, semantic resume-to-job matching (SentenceTransformers + FAISS), dynamic screening Q&A solver, Telegram bot control, and a FastAPI analytics dashboard.",
    capabilities: [
      "Persistent browser session management with Playwright & stealth anti-detection",
      "Semantic resume-to-job matching with SentenceTransformers & FAISS vector search",
      "Dynamic LLM screening Q&A solver powered by GPT-4 & local memory",
      "Telegram bot control interface + FastAPI analytics dashboard"
    ],
    metrics: "50+ applications/day · 94% screening accuracy",
    github: "https://github.com/Praneeth180502/NaukriBot.git",
    tags: ["Playwright", "SentenceTransformers", "FAISS", "FastAPI", "Telegram Bot", "Python"],
    icon: Bot,
  },
  {
    id: "auraselect",
    index: "02",
    title: "AURASELECT — AI Video Interview Evaluator",
    categoryLabel: "AI · HR TECH",
    categoryGroup: ["AI Agents", "Full-stack"],
    outcome: "AI-powered automated video screening platform evaluating candidate responses via Groq Whisper & LLMs.",
    description: "Automates the initial HR screening process. Candidates record responses via webcam; an AI pipeline transcribes audio using Groq Whisper, semantically evaluates answers against benchmark criteria, and generates detailed score reports.",
    capabilities: [
      "Webcam audio recording & low-latency transcription via Groq Whisper API",
      "Semantic response scoring against benchmark answer vectors",
      "Automated PDF evaluation summary report generation",
      "Interactive candidate review dashboard built with React & FastAPI"
    ],
    metrics: "Automated candidate evaluation pipeline",
    tags: ["React", "FastAPI", "Groq Whisper", "LLMs", "AI Evaluation", "Python"],
    icon: Video,
  },
  {
    id: "openviz",
    index: "03",
    title: "OpenViz — Generative AI Analytics Platform",
    categoryLabel: "GEN AI · ANALYTICS",
    categoryGroup: ["RAG", "Full-stack"],
    outcome: "Prompt-driven data analytics platform converting raw datasets into interactive charts via natural language.",
    description: "Turns CSV and tabular datasets into interactive visualizations through plain text commands. Uses client-side RAG with Arquero for zero-latency profiling and data privacy.",
    capabilities: [
      "Natural language prompt translation into Vega-Lite chart specs",
      "Zero-latency client-side dataset profiling via Arquero",
      "Llama 4 & Groq SDK integration for rapid visualization generation",
      "Exportable SVG/PNG charts & interactive data filters"
    ],
    metrics: "Zero-latency in-browser data profiling",
    tags: ["React 19", "Vega-Lite", "Llama 4", "Groq SDK", "Arquero", "RAG"],
    icon: BarChart3,
  },
  {
    id: "silens-ai",
    index: "04",
    title: "SiLens AI — STEM Learning Platform",
    categoryLabel: "EDTECH · GEN AI",
    categoryGroup: ["RAG", "Full-stack"],
    outcome: "Interactive learning platform extracting LaTeX equations and diagrams from STEM documents for Q&A.",
    description: "Transforms static STEM textbooks and PDFs into interactive experiences. Uses PaddleOCR + Pix2Tex to extract complex math equations into LaTeX, paired with FastAPI Clean Architecture for hot-swappable LLM provider Q&A.",
    capabilities: [
      "LaTeX math equation extraction using PaddleOCR & Pix2Tex models",
      "FastAPI Clean Architecture supporting hot-swappable LLM backends",
      "Document-grounded RAG query answering over STEM textbooks",
      "Interactive mathematical notation renderer with MathJax"
    ],
    tags: ["FastAPI", "React", "TypeScript", "Groq LLM", "PaddleOCR", "Pix2Tex"],
    icon: GraduationCap,
  },
  {
    id: "ai-file-explorer",
    index: "05",
    title: "AI File Explorer — Local Semantic Search",
    categoryLabel: "DESKTOP · LOCAL AI",
    categoryGroup: ["AI Agents", "RAG"],
    outcome: "Privacy-first desktop AI app performing local semantic vector search across personal documents.",
    description: "Desktop application built in Electron with real-time folder monitoring, multi-format file parsing (PDF, DOCX, TXT), ChromaDB vector embeddings, and hybrid execution using Ollama local LLMs.",
    capabilities: [
      "Real-time local filesystem watcher and document indexer",
      "ChromaDB local vector embeddings for instant semantic search",
      "Hybrid local LLM inference via Ollama (Llama 3 / Mistral)",
      "Multi-format document parsing with PyMuPDF & python-docx"
    ],
    tags: ["FastAPI", "React", "Electron", "Ollama", "ChromaDB", "PyMuPDF"],
    icon: FolderSearch,
  },
  {
    id: "meet-ops",
    index: "06",
    title: "Meet-Ops — AI Meeting Analytics",
    categoryLabel: "ENTERPRISE · AI",
    categoryGroup: ["AI Agents", "Enterprise"],
    outcome: "Autonomous meeting bot joining MS Teams calls, transcribing audio, and summarizing key decision items.",
    description: "Developed during internship at CognitBotz for enterprise clients. The bot joins Microsoft Teams calls, captures live audio streams, generates automated transcriptions, and surfaces summaries on a centralized dashboard.",
    capabilities: [
      "Microsoft Teams call integration and audio stream capture",
      "Hugging Face Transformers for automated transcript summarization",
      "Centralized web dashboard for action item tracking & search",
      "PostgreSQL database integration for team meeting archives"
    ],
    metrics: "Deployed for enterprise team operations (Adani / CognitBotz)",
    tags: ["React.js", "FastAPI", "Hugging Face", "PostgreSQL", "MS Teams API"],
    icon: Bot,
  },
  {
    id: "drdo-missile-sim",
    index: "07",
    title: "Live Missile Trajectory Simulation",
    categoryLabel: "DEFENSE · SIMULATION",
    categoryGroup: ["Full-stack", "Enterprise"],
    outcome: "Real-time trajectory visualization and telemetry simulation platform engineered at DRDO.",
    description: "Developed during software engineering internship at DRDO (Defense Research & Development Organisation). Real-time simulation and visualization presenting live missile telemetry data including acceleration, velocity, altitude, and flight trajectory streams.",
    capabilities: [
      "Sub-50ms telemetry data stream parsing in C++ and Python",
      "Real-time trajectory rendering using WebSockets and WebGL charts",
      "Automated anomaly detection on live sensor readings",
      "Tactical defense analytics interface for missile flight tests"
    ],
    metrics: "Sub-50ms render latency · DRDO Defense Project",
    tags: ["C++", "Python", "FastAPI", "React.js", "WebSockets", "DRDO"],
    icon: Activity,
  },
  {
    id: "noc-analytics",
    index: "08",
    title: "NOC Data Analytics Dashboard",
    categoryLabel: "ENTERPRISE · DASHBOARD",
    categoryGroup: ["Full-stack", "Enterprise"],
    outcome: "Enterprise operational dashboard with a 4-level hierarchical data model for Adani Group.",
    description: "Engineered at CognitBotz for Adani Group facility operations. Features a 4-level hierarchical data model organizing and filtering massive operational datasets with high rendering performance.",
    capabilities: [
      "4-level hierarchical data tree filtering (Group → Site → System → Node)",
      "Optimized high-throughput table virtualization for 100k+ rows",
      "FastAPI backend with PostgreSQL index optimization",
      "Custom role-based permissions and data export tools"
    ],
    metrics: "Used across 12+ enterprise facilities (Adani / CognitBotz)",
    tags: ["React.js", "FastAPI", "PostgreSQL", "Hierarchical Data Model"],
    icon: BarChart3,
  },
  {
    id: "app-connectivity",
    index: "09",
    title: "App Connectivity & Substation Dashboard",
    categoryLabel: "ENTERPRISE · ANALYTICS",
    categoryGroup: ["Full-stack", "Enterprise"],
    outcome: "Operational dashboard visualizing grid datasets with cascading filters (State → Region → Substation).",
    description: "Built for Adani facility operations. Visualizes Excel/CSV datasets with dynamic cascading dependent dropdown filters, KPI summary cards, and interactive trend charts.",
    capabilities: [
      "Cascading multi-level dependent filters (State → Region → Substation)",
      "Dynamic KPI summary card aggregation engine",
      "Automated CSV/Excel file parser returning JSON responses",
      "Interactive grid connectivity status charts"
    ],
    tags: ["React.js", "FastAPI", "PostgreSQL", "Charts", "Adani"],
    icon: Activity,
  },
  {
    id: "landed-tariff",
    index: "10",
    title: "Landed Tariff Data Visualization",
    categoryLabel: "ENTERPRISE · DATA",
    categoryGroup: ["Full-stack", "Enterprise"],
    outcome: "Analytics dashboard processing complex landed tariff datasets into structured interactive reports.",
    description: "Processes landed tariff datasets with multi-level dependent filters backed by REST APIs transforming raw tabular datasets into structured JSON analytical responses.",
    capabilities: [
      "Multi-level tariff dataset REST API parsing engine",
      "Interactive cost breakdown visualization charts",
      "Custom filter presets and scenario comparison tools",
      "Exportable financial summary reports"
    ],
    tags: ["React.js", "FastAPI", "PostgreSQL", "Data Analytics"],
    icon: BarChart3,
  },
];

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [expandedId, setExpandedId] = useState<string | null>("naukribot");

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === "All") return true;
    return p.categoryGroup.includes(selectedCategory);
  });

  return (
    <section id="projects" className="relative py-24 bg-[#000000] text-[#e4e4e7] overflow-hidden">
      <PipelinePulseBackground />

      <div className="container relative z-10 mx-auto px-6">
        
        {/* Section Header */}
        <div className="space-y-3 mb-12">
          <span className="eyebrow text-[#a1a1aa]">PROJECTS</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#ffffff] tracking-tight">
            Systems built to work in the real world.
          </h2>
          <p className="text-[#a1a1aa] text-base max-w-2xl font-normal">
            Production AI agents, RAG architectures, defense simulation software, and enterprise engineering projects built for measurable outcome.
          </p>
        </div>

        {/* Filter Tabs per design.md §7 */}
        <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-[#27272a] pb-4">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 ${
                  isActive
                    ? "bg-[#ffffff] text-[#000000] font-bold shadow-md"
                    : "bg-[#0c0c0e] text-[#a1a1aa] hover:text-[#ffffff] border border-[#27272a]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            const isExpanded = expandedId === project.id;
            const ProjectIcon = project.icon;

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="card-silver group flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Index, Icon & Category */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xl font-bold text-[#ffffff]">
                        {project.index}
                      </span>
                      <div className="p-2 rounded-lg bg-[#16161a] border border-[#27272a] text-[#ffffff]">
                        <ProjectIcon size={18} />
                      </div>
                    </div>
                    
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#a1a1aa] bg-[#16161a] px-2.5 py-1 rounded border border-[#27272a]">
                      {project.categoryLabel}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#ffffff] mb-2 group-hover:text-[#ffffff] transition-colors">
                    {project.title}
                  </h3>

                  {/* One-sentence outcome per design.md §7 */}
                  <p className="text-sm text-[#e4e4e7] leading-relaxed mb-4">
                    {project.outcome}
                  </p>

                  {/* Metrics Badge */}
                  {project.metrics && (
                    <div className="inline-block mb-4 px-3 py-1 rounded bg-[#16161a] border border-[#27272a] text-xs font-mono text-[#d4d4d8]">
                      ⚡ {project.metrics}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#0c0c0e] border border-[#27272a] text-[#a1a1aa]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expand / Collapse Details Button */}
                <div className="pt-4 border-t border-[#27272a]">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : project.id)}
                      className="flex items-center gap-2 text-xs font-mono text-[#a1a1aa] hover:text-[#ffffff] py-1 transition-colors"
                    >
                      <span>{isExpanded ? "Hide details" : "View details"}</span>
                      <ChevronDown
                        size={16}
                        className={`transform transition-transform duration-200 ${
                          isExpanded ? "rotate-180 text-[#ffffff]" : ""
                        }`}
                      />
                    </button>

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#ffffff] hover:underline"
                        title="View GitHub Repository"
                      >
                        <Github size={14} />
                        <span>GitHub Repo</span>
                      </a>
                    )}
                  </div>

                  {/* Expanded Core Capabilities Panel */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden pt-4 space-y-4"
                      >
                        <p className="text-xs text-[#e4e4e7] leading-relaxed">
                          {project.description}
                        </p>

                        <div>
                          <h4 className="text-xs font-mono text-[#ffffff] font-semibold mb-2 uppercase tracking-wider">
                            Core Capabilities:
                          </h4>
                          <ul className="space-y-1.5 text-xs text-[#a1a1aa] list-disc list-inside font-sans">
                            {project.capabilities.map((cap, idx) => (
                              <li key={idx} className="leading-relaxed">
                                {cap}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
