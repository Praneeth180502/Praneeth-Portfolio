import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const experiences = [
  {
    company: "Digimaxx AI Solutions",
    role: "Associate AI Engineer",
    period: "Aug 2026 – Present",
    bullets: [
      "Engineering the orchestration layer behind production AI — coordinating agents, RAG pipelines, and workflows into reliable, scalable systems.",
      "Designing multi-agent architectures and LLM integration patterns for enterprise-grade GenAI products.",
      "Building observable, fault-tolerant AI pipelines with FastAPI and Python.",
    ],
    tech: ["AI Agents", "RAG", "LLMs", "Python", "FastAPI"],
    color: "var(--accent)",   // current role — bright cyan per design.md
    status: "active",
    url: "https://www.digimaxx.co/",
  },
  {
    company: "CognitBotz (Client: Adani)",
    role: "Full Stack Developer Intern",
    period: "Jun 2024 – Nov 2024",
    bullets: [
      "Built 4 enterprise data analytics dashboards for Adani: NOC Dashboard, App Connectivity, Meet-Ops AI, and Landed Tariff Visualisation.",
      "Stack: React.js, FastAPI, PostgreSQL — from design to production.",
      "Delivered projects serving thousands of daily operator queries.",
    ],
    tech: ["React.js", "FastAPI", "PostgreSQL", "Python"],
    color: "var(--accent-2)",
    status: "completed",
    url: "https://cognitbotz.com/",
  },
  {
    company: "DRDO – Defence Research & Development",
    role: "Project Intern",
    period: "Nov 2023 – May 2024",
    bullets: [
      "Contributed to the Live Missile Data Simulation project — front-end and back-end development.",
      "Built real-time telemetry visualisation of acceleration, velocity, and trajectory via WebSockets.",
      "Managed server-client communication using React and Python.",
    ],
    tech: ["React", "Python", "WebSockets", "Data Simulation"],
    color: "#64748b",
    status: "completed",
    url: "https://drdo.gov.in/drdo/en",
  },
];

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    const reveals = sectionRef.current?.querySelectorAll(".reveal") ?? [];
    reveals.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-padding"
      style={{ background: "var(--bg)" }}
    >
      <div className="container">
        <div className="reveal" style={{ marginBottom: "3rem" }}>
          <p className="section-label mb-3">Experience</p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 600,
              color: "var(--text-strong)",
              letterSpacing: "-0.01em",
            }}
          >
            Where I've worked
          </h2>
        </div>

        <div style={{ position: "relative" }}>
          {/* Vertical timeline line */}
          <div
            className="hidden md:block"
            style={{
              position: "absolute",
              left: 23,
              top: 0,
              bottom: 0,
              width: 1,
              background: "linear-gradient(180deg, var(--accent), var(--accent-2), var(--border))",
              opacity: 0.5,
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="md:pl-16"
                style={{ position: "relative" }}
              >
                {/* Timeline dot */}
                <div
                  className="hidden md:flex"
                  style={{
                    position: "absolute",
                    left: 12,
                    top: 24,
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "var(--surface)",
                    border: `2px solid ${exp.color}`,
                    boxShadow: exp.status === "active" ? `0 0 12px ${exp.color}, 0 0 24px ${exp.color}40` : "none",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1,
                  }}
                >
                  {exp.status === "active" && (
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: exp.color,
                        animation: "pulse-glow 2.5s ease-in-out infinite",
                      }}
                    />
                  )}
                </div>

                {/* Card */}
                <div
                  style={{
                    background: "var(--surface)",
                    border: `1px solid ${exp.status === "active" ? "rgba(6,182,212,0.35)" : "var(--border)"}`,
                    borderRadius: "var(--radius-card)",
                    padding: "1.5rem 2rem",
                    boxShadow: exp.status === "active" ? "0 0 24px rgba(6,182,212,0.08)" : "none",
                    position: "relative",
                    overflow: "hidden",
                    transition: "border-color 150ms ease, background 150ms ease",
                  }}
                >
                  {/* Top accent bar — only on active */}
                  {exp.status === "active" && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: "linear-gradient(90deg, var(--accent), var(--accent-2), transparent)",
                      }}
                    />
                  )}

                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        {exp.url ? (
                          <a
                            href={exp.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontSize: "1rem",
                              fontWeight: 600,
                              color: "var(--text-strong)",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 6,
                              textDecoration: "none",
                              transition: "color 150ms ease",
                            }}
                            className="group"
                          >
                            {exp.company}
                            <ExternalLink size={13} style={{ color: exp.color, opacity: 0.7 }} />
                          </a>
                        ) : (
                          <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-strong)" }}>
                            {exp.company}
                          </h3>
                        )}
                      </div>
                      <p style={{ fontSize: "0.875rem", fontWeight: 500, color: exp.color }}>
                        {exp.role}
                      </p>
                    </div>

                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                        background: "var(--surface-2)",
                        border: "1px solid var(--border)",
                        borderRadius: 999,
                        padding: "3px 12px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  {/* Bullet points */}
                  <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 7, marginBottom: 14 }}>
                    {exp.bullets.map((b) => (
                      <li
                        key={b}
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--text)",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 8,
                          lineHeight: 1.6,
                        }}
                      >
                        <span style={{ color: exp.color, flexShrink: 0, marginTop: 3 }}>–</span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Tech chips */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {exp.tech.map((t) => (
                      <span key={t} className="chip">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
