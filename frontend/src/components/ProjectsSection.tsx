import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Github, ExternalLink } from "lucide-react";

/* ── Pipeline pulse SVG background ── */
function PipelinePulseBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 400">
        <defs>
          <linearGradient id="silver-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a1a1aa" stopOpacity="0.2" />
          </linearGradient>
        </defs>
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

const categories = ["All", "AI Agents", "RAG", "Full-stack", "Automation"] as const;
type Category = (typeof categories)[number];

interface Project {
  id: string;
  index: string;
  title: string;
  category: string;
  categoryGroup: Category[];
  outcome: string;
  description: string;
  capabilities: string[];
  metrics?: string;
  github?: string;
  liveUrl?: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: "naukribot",
    index: "01",
    title: "NaukriBot",
    category: "AI · AUTOMATION",
    categoryGroup: ["AI Agents", "Automation"],
    outcome: "Autonomous job search & auto-apply bot handling 50+ applications daily with AI screening Q&A.",
    description: "An intelligent autonomous agent that navigates job portals, bypasses multi-step application forms, solves custom screening questions using LLMs, and triggers real-time Telegram updates.",
    capabilities: [
      "Persistent browser session management with Playwright & anti-detection",
      "Semantic resume matching using SentenceTransformers & FAISS embeddings",
      "Dynamic screening Q&A solver powered by GPT-4 and custom RAG memory",
      "Telegram control interface & real-time analytics dashboard via FastAPI"
    ],
    metrics: "50+ applications/day · 94% screening accuracy",
    github: "https://github.com",
    tags: ["Playwright", "FastAPI", "FAISS", "SentenceTransformers", "Python", "Telegram API"],
  },
  {
    id: "drdo-missile-sim",
    index: "02",
    title: "Live Missile Data Simulation",
    category: "AI · ENTERPRISE",
    categoryGroup: ["Full-stack", "RAG"],
    outcome: "Real-time telemetry trajectory visualization and analysis pipeline built at DRDO.",
    description: "Developed high-speed trajectory visualization software for defence missile testing data, parsing high-frequency telemetry streams and generating interactive telemetry heatmaps.",
    capabilities: [
      "High-throughput real-time telemetry data processing pipeline",
      "Low-latency dynamic charting with custom WebGL rendering",
      "Automated anomaly detection on live sensor readings",
      "Exportable tactical analytics report generation"
    ],
    metrics: "Sub-50ms render latency · DRDO Defence Project",
    tags: ["Python", "C++", "FastAPI", "React", "WebGL", "Telemetry"],
  },
  {
    id: "cognitbotz-dashboards",
    index: "03",
    title: "Adani Enterprise Analytics Dashboards",
    category: "ENTERPRISE · FULL-STACK",
    categoryGroup: ["Full-stack"],
    outcome: "Enterprise operational dashboards processing multi-facility data streams for Adani Group.",
    description: "Built scalable frontend and backend architecture for Adani Group facility operations during internship at CognitBotz, aggregating real-time telemetry into unified decision metrics.",
    capabilities: [
      "Modular React & TypeScript component architecture",
      "FastAPI REST endpoints integrated with PostgreSQL database",
      "Role-based access control and secure JWT authentication",
      "Interactive data filtering, exports, and real-time alerts"
    ],
    metrics: "Used across 12+ enterprise facilities",
    tags: ["React.js", "FastAPI", "PostgreSQL", "TailwindCSS", "Enterprise API"],
  },
  {
    id: "multimodal-rag",
    index: "04",
    title: "Multimodal Enterprise Document RAG",
    category: "AI · RAG",
    categoryGroup: ["RAG", "AI Agents"],
    outcome: "Hybrid RAG search system indexing PDFs, schematics, and tabular data with citation tracking.",
    description: "End-to-end RAG architecture parsing complex multi-page PDF documents containing tables, charts, and diagrams with precise source text grounding.",
    capabilities: [
      "Unstructured PDF layout parsing with OCR & table extraction",
      "Hybrid dense-sparse retrieval combining BGE-M3 and BM25 lexemes",
      "Cross-encoder re-ranking for high precision context window loading",
      "Streaming inline markdown responses with source page citations"
    ],
    metrics: "91% retrieval precision · Sub-second response",
    github: "https://github.com",
    tags: ["LangChain", "Qdrant", "BM25", "LlamaParse", "FastAPI", "Python"],
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
            Production AI agents, RAG architectures, and enterprise engineering projects built for measurable outcome.
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

        {/* Project Cards Grid (Numbered card pattern per design.md §7) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            const isExpanded = expandedId === project.id;
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
                  {/* Top Bar: Index & Category */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xl font-bold text-[#ffffff] group-hover:text-[#ffffff] transition-colors">
                      {project.index}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#a1a1aa] bg-[#16161a] px-2.5 py-1 rounded border border-[#27272a]">
                      {project.category}
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
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : project.id)}
                    className="w-full flex items-center justify-between text-xs font-mono text-[#a1a1aa] hover:text-[#ffffff] py-1 transition-colors"
                  >
                    <span>{isExpanded ? "Hide details" : "View details"}</span>
                    <ChevronDown
                      size={16}
                      className={`transform transition-transform duration-200 ${
                        isExpanded ? "rotate-180 text-[#ffffff]" : ""
                      }`}
                    />
                  </button>

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

                        {/* Action buttons */}
                        <div className="flex items-center gap-4 pt-2">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#ffffff] hover:underline"
                            >
                              <Github size={14} />
                              <span>Source Code</span>
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#ffffff] hover:underline"
                            >
                              <ExternalLink size={14} />
                              <span>Live Application</span>
                            </a>
                          )}
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
