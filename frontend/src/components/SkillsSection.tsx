import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* ── Skill groups (design.md §7) ── */
const skillGroups = [
  {
    label: "AI & ML",
    skills: [
      "Generative AI",
      "LLMs",
      "RAG",
      "AI Agents",
      "Agent Orchestration",
      "Vector Search · FAISS",
      "ChromaDB",
      "SentenceTransformers",
      "spaCy",
      "Prompt Engineering",
    ],
  },
  {
    label: "Backend",
    skills: ["Python", "FastAPI", "Node.js", "REST APIs", "WebSockets"],
  },
  {
    label: "Frontend",
    skills: [
      "React.js",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Vite",
      "Responsive Design",
      "Data Visualisation",
    ],
  },
  {
    label: "Database",
    skills: ["PostgreSQL", "MySQL", "SQL", "ChromaDB"],
  },
  {
    label: "Languages",
    skills: ["Python", "TypeScript", "JavaScript", "Java", "C", "C++"],
  },
  {
    label: "Tools & DevOps",
    skills: ["Git", "Docker", "VS Code", "Postman", "Playwright", "FFmpeg", "Claude Code"],
  },
];

const SkillsSection = () => {
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
      id="skills"
      ref={sectionRef}
      className="section-padding"
      style={{ background: "var(--bg)", position: "relative", overflow: "hidden" }}
    >
      {/* Faint dot grid */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(6,182,212,0.08) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="reveal" style={{ marginBottom: "3rem" }}>
          <p className="section-label mb-3">Skills</p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 600,
              color: "var(--text-strong)",
              letterSpacing: "-0.01em",
            }}
          >
            Tech stack
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
            gap: 20,
          }}
        >
          {skillGroups.map(({ label, skills }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-card)",
                padding: "var(--pad-card)",
                transition: "border-color 150ms ease, background 150ms ease",
              }}
              onHoverStart={(e) => {
                const el = e.target as HTMLElement;
                const card = el.closest("[data-skill-card]") as HTMLElement;
                if (card) {
                  card.style.borderColor = "rgba(6,182,212,0.4)";
                  card.style.background = "var(--surface-2)";
                }
              }}
              onHoverEnd={(e) => {
                const el = e.target as HTMLElement;
                const card = el.closest("[data-skill-card]") as HTMLElement;
                if (card) {
                  card.style.borderColor = "var(--border)";
                  card.style.background = "var(--surface)";
                }
              }}
              data-skill-card=""
            >
              {/* Group label */}
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.72rem",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--accent)",
                  marginBottom: 14,
                }}
              >
                {label}
              </p>

              {/* Chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {skills.map((skill) => (
                  <span key={skill} className="chip">
                    {skill}
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

export default SkillsSection;
