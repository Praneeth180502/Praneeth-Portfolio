import { motion } from "framer-motion";
import { Building2, Calendar, ChevronRight } from "lucide-react";

const experiences = [
  {
    company: "CognitBotz (Client: Adani)",
    role: "Full Stack Developer Intern",
    period: "Current",
    description:
      "Building enterprise-grade data analytics dashboards for Adani using React.js, FastAPI, and PostgreSQL. Delivered 4 major projects including NOC Dashboard, App Connectivity, Meet-Ops AI, and Landed Tariff Visualization.",
    tech: ["React.js", "FastAPI", "PostgreSQL", "Python"],
    color: "#3b82f6",
    status: "active",
  },
  {
    company: "DRDO – Defense Research & Development Organization",
    role: "Project Intern",
    period: "Nov 2023 – May 2024",
    description:
      "Contributed to the Live Missile Data Simulation project, handling both front-end and back-end development. Managed server-client communication using React and Python.",
    tech: ["React", "Python", "Data Simulation", "WebSockets"],
    color: "#8b5cf6",
    status: "completed",
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding" style={{ background: "transparent" }}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label mb-3">Experience</p>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 800,
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#f1f5f9",
              marginBottom: "3rem",
              lineHeight: 1.2,
            }}
          >
            Where I've <span className="gradient-text">worked</span>
          </h2>
        </motion.div>

        <div style={{ position: "relative" }}>
          {/* Glowing timeline line */}
          <div
            className="hidden md:block"
            style={{
              position: "absolute",
              left: 24,
              top: 0,
              bottom: 0,
              width: 2,
              background: "linear-gradient(180deg, #3b82f6, #8b5cf6, transparent)",
              boxShadow: "0 0 8px rgba(59, 130, 246, 0.4)",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="md:pl-16"
                style={{ position: "relative" }}
              >
                {/* Timeline node */}
                <div
                  className="hidden md:flex"
                  style={{
                    position: "absolute",
                    left: 12,
                    top: 24,
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: exp.color,
                    border: "3px solid #030712",
                    boxShadow: `0 0 12px ${exp.color}80`,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {exp.status === "active" && (
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "white",
                        opacity: 0.9,
                      }}
                    />
                  )}
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    background: "rgba(15, 23, 42, 0.7)",
                    backdropFilter: "blur(20px)",
                    border: `1px solid ${exp.color}25`,
                    borderRadius: 20,
                    padding: "1.75rem 2rem",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                    cursor: "default",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Accent top bar */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background: `linear-gradient(90deg, ${exp.color}, transparent)`,
                    }}
                  />

                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <Building2 size={16} style={{ color: exp.color }} />
                        <h3
                          style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 700,
                            fontSize: "1.05rem",
                            color: "#f1f5f9",
                          }}
                        >
                          {exp.company}
                        </h3>
                      </div>
                      <p style={{ color: exp.color, fontWeight: 600, fontSize: "0.9rem" }}>
                        {exp.role}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "4px 12px",
                        borderRadius: 999,
                        background: `${exp.color}12`,
                        border: `1px solid ${exp.color}30`,
                        color: "#94a3b8",
                        fontSize: "0.8rem",
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Calendar size={12} />
                      {exp.period}
                    </div>
                  </div>

                  <p style={{ color: "#94a3b8", lineHeight: 1.7, marginBottom: "1rem", fontSize: "0.925rem" }}>
                    {exp.description}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          padding: "4px 12px",
                          borderRadius: 999,
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          background: `${exp.color}12`,
                          border: `1px solid ${exp.color}30`,
                          color: exp.color === "#3b82f6" ? "#93c5fd" : "#c4b5fd",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
