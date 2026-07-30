import { motion } from "framer-motion";
import { Code, Database, Layout, Server, Terminal, Globe, Bot } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    icon: Layout,
    skills: ["React.js", "TypeScript", "HTML5", "CSS3", "JavaScript", "Vite"],
    color: "#3b82f6",
    tagColor: "blue",
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["FastAPI", "Python", "REST APIs", "Node.js"],
    color: "#06b6d4",
    tagColor: "cyan",
  },
  {
    title: "Database",
    icon: Database,
    skills: ["PostgreSQL", "MySQL", "SQL", "ChromaDB"],
    color: "#10b981",
    tagColor: "green",
  },
  {
    title: "Languages",
    icon: Code,
    skills: ["Python", "C", "C++", "Java", "Advanced Java"],
    color: "#8b5cf6",
    tagColor: "violet",
  },
  {
    title: "Tools & DevOps",
    icon: Terminal,
    skills: ["Git", "Docker", "VS Code", "Postman", "FFmpeg"],
    color: "#f59e0b",
    tagColor: "amber",
  },
  {
    title: "Web Technologies",
    icon: Globe,
    skills: ["REST APIs", "WebSockets", "Responsive Design", "Data Viz"],
    color: "#06b6d4",
    tagColor: "cyan",
  },
  {
    title: "AI & Machine Learning",
    icon: Bot,
    skills: ["Generative AI", "LLMs", "RAG", "Groq API", "Vector DBs", "Whisper"],
    color: "#8b5cf6",
    tagColor: "violet",
  },
];

const tagColors: Record<string, { bg: string; border: string; text: string }> = {
  blue:   { bg: "rgba(59,130,246,0.15)",   border: "rgba(59,130,246,0.35)",   text: "#93c5fd" },
  cyan:   { bg: "rgba(6,182,212,0.15)",    border: "rgba(6,182,212,0.35)",    text: "#67e8f9" },
  violet: { bg: "rgba(139,92,246,0.15)",   border: "rgba(139,92,246,0.35)",   text: "#c4b5fd" },
  green:  { bg: "rgba(16,185,129,0.15)",   border: "rgba(16,185,129,0.35)",   text: "#6ee7b7" },
  amber:  { bg: "rgba(245,158,11,0.15)",   border: "rgba(245,158,11,0.35)",   text: "#fcd34d" },
};

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding" style={{ background: "transparent" }}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label mb-3">Skills</p>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 800,
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#ffffff",
              marginBottom: "3rem",
              lineHeight: 1.2,
              textShadow: "0 4px 20px rgba(0,0,0,0.9)",
            }}
          >
            My <span className="gradient-text">tech stack</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map(({ title, icon: Icon, skills, color, tagColor }, i) => {
            const tc = tagColors[tagColor] ?? tagColors.blue;
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                style={{
                  background: "rgba(3, 7, 18, 0.78)",
                  backdropFilter: "blur(20px)",
                  border: `1px solid ${color}35`,
                  borderRadius: 20,
                  padding: "1.5rem",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "default",
                }}
                onHoverStart={(e) => {
                  const target = e.target as HTMLElement;
                  const card = target.closest('[data-card]') as HTMLElement;
                  if (card) {
                    card.style.borderColor = `${color}60`;
                    card.style.boxShadow = `0 0 24px ${color}22, 0 8px 40px rgba(0,0,0,0.6)`;
                  }
                }}
                data-card=""
              >
                {/* Accent corner */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 60,
                    height: 60,
                    background: `radial-gradient(circle at top right, ${color}25, transparent)`,
                    pointerEvents: "none",
                  }}
                />

                {/* Header */}
                <div style={{ display: "flex", items: "center", gap: 12, marginBottom: "1.1rem" }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      background: `${color}20`,
                      border: `1px solid ${color}40`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={20} style={{ color }} />
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      color: "#ffffff",
                      fontSize: "0.98rem",
                    }}
                  >
                    {title}
                  </h3>
                </div>

                {/* Skill tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        padding: "4px 12px",
                        borderRadius: 999,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        background: tc.bg,
                        border: `1px solid ${tc.border}`,
                        color: tc.text,
                        letterSpacing: "0.01em",
                        transition: "all 0.2s ease",
                        cursor: "default",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
