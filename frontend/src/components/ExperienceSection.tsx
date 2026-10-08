import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const experiences = [
  {
    company: "Digimaxx AI Solutions",
    role: "Associate AI Engineer",
    period: "August 2026 — PRESENT",
    status: "active",
    location: "Hyderabad, India",
    description: "Designing and engineering autonomous agent workflows, enterprise RAG pipelines, and intelligent decision systems.",
    bullets: [
      "Engineered multi-agent automation systems integrating LangChain, LlamaIndex, and custom tool calling.",
      "Optimized vector search latency and context precision across large enterprise document stores using hybrid dense-sparse indexing.",
      "Developed production REST API layers in FastAPI to deliver low-latency AI inference to client applications."
    ],
    tags: ["Generative AI", "LangChain", "FastAPI", "Vector DBs", "RAG Pipeline", "Python"],
    link: "https://digimaxx.co",
  },
  {
    company: "CognitBotz",
    role: "AI / Full Stack Developer Intern",
    period: "2024",
    status: "past",
    location: "Hyderabad, India",
    description: "Built scalable enterprise web dashboards and data integration services for major industrial clients.",
    bullets: [
      "Developed production analytics dashboards for Adani Group operations using React.js, TypeScript, and TailwindCSS.",
      "Engineered backend REST endpoints and database schemas using FastAPI and PostgreSQL.",
      "Implemented real-time data visualization charts and automated reporting modules."
    ],
    tags: ["React.js", "TypeScript", "FastAPI", "PostgreSQL", "TailwindCSS"],
  },
  {
    company: "DRDO (Defense Research & Dev Organisation)",
    role: "Software Engineering Intern",
    period: "2023",
    status: "past",
    location: "Hyderabad, India",
    description: "Built high-frequency telemetry simulation software for live missile testing and trajectory tracking.",
    bullets: [
      "Developed real-time telemetry trajectory visualization software for defense missile test datasets.",
      "Created sub-50ms data parsing utilities handling dynamic sensor stream data in C++ and Python.",
      "Integrated tactical analytics UI for real-time sensor monitoring and error tracking."
    ],
    tags: ["C++", "Python", "Telemetry Parsing", "WebGL Data Charts", "Defense Tech"],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 bg-[#000000] text-[#e4e4e7]">
      <div className="container mx-auto px-6">

        {/* Section Header */}
        <div className="space-y-3 mb-16">
          <span className="eyebrow text-[#a1a1aa]">EXPERIENCE</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#ffffff] tracking-tight">
            Industry & Defense Engineering Journey.
          </h2>
          <p className="text-[#a1a1aa] text-base max-w-2xl font-normal">
            From missile telemetry software at DRDO to enterprise AI orchestration at Digimaxx.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 md:pl-8 border-l border-[#3f3f46] space-y-12">
          {experiences.map((exp, idx) => {
            const isActive = exp.status === "active";
            return (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative group"
              >
                {/* Node dot on timeline */}
                <div
                  className={`absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 transition-all ${isActive
                    ? "bg-[#ffffff] border-[#ffffff] shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                    : "bg-[#0c0c0e] border-[#52525b] group-hover:border-[#ffffff]"
                    }`}
                />

                {/* Card Container */}
                <div
                  className={`p-6 sm:p-8 rounded-xl transition-all ${isActive
                    ? "bg-[#0c0c0e] border border-[#52525b] shadow-xl"
                    : "bg-[#0c0c0e] border border-[#27272a] hover:border-[#3f3f46]"
                    }`}
                >
                  {/* Top Bar: Company & Date */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-[#ffffff] group-hover:text-[#ffffff]">
                        {exp.company}
                      </h3>
                      {isActive && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-[#ffffff] text-[#000000]">
                          Current Role
                        </span>
                      )}
                      {exp.link && (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#a1a1aa] hover:text-[#ffffff] transition-colors"
                          aria-label={exp.company}
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>

                    <span className="text-xs font-mono text-[#a1a1aa] bg-[#16161a] px-3 py-1 rounded border border-[#27272a]">
                      {exp.period}
                    </span>
                  </div>

                  {/* Role Title & Location */}
                  <div className="text-sm font-mono text-[#ffffff] font-semibold mb-3">
                    {exp.role} · <span className="text-[#a1a1aa] font-normal">{exp.location}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#e4e4e7] mb-4 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Impact Bullets */}
                  <ul className="space-y-2 mb-6 text-xs text-[#a1a1aa] font-sans">
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-[#ffffff] font-mono mt-0.5">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#16161a] border border-[#27272a] text-[#a1a1aa]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
