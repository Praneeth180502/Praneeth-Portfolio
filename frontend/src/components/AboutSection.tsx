import { motion } from "framer-motion";
import { GraduationCap, MapPin, Briefcase, Award } from "lucide-react";

const stats = [
  { icon: Briefcase,     label: "Internships",     value: "2+",         color: "#3b82f6" },
  { icon: GraduationCap, label: "CGPA",             value: "7.58",       color: "#06b6d4" },
  { icon: Award,         label: "Certifications",   value: "3+",         color: "#8b5cf6" },
  { icon: MapPin,        label: "Location",         value: "Hyderabad",  color: "#10b981" },
];

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const AboutSection = () => {
  return (
    <section id="about" className="section-padding" style={{ background: "transparent" }}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label mb-3">About Me</p>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 800,
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#ffffff",
              marginBottom: "2.5rem",
              lineHeight: 1.2,
              textShadow: "0 4px 20px rgba(0,0,0,0.9)",
            }}
          >
            Passionate about building{" "}
            <span className="gradient-text">impactful solutions</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Text content card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                background: "rgba(3, 7, 18, 0.65)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(59, 130, 246, 0.2)",
                borderRadius: 24,
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.2rem",
                boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
              }}
            >
              {[
                <>I'm a B.Tech Computer Science graduate from <strong style={{ color: "#38bdf8", fontWeight: 700 }}>Vignan Institute of Technology and Science</strong>, Hyderabad. My passion lies in creating full-stack web applications that solve real-world problems.</>,
                <>I've had the privilege of interning at <strong style={{ color: "#22d3ee", fontWeight: 700 }}>DRDO</strong> (Defense Research & Development Organization), where I contributed to the Live Missile Data Simulation project, and at <strong style={{ color: "#c084fc", fontWeight: 700 }}>CognitBotz</strong>, where I built enterprise-grade dashboards for Adani using React.js, FastAPI, and PostgreSQL.</>,
                <>I'm driven by the desire to learn emerging technologies like <strong style={{ color: "#38bdf8", fontWeight: 700 }}>Generative AI</strong> and <strong style={{ color: "#22d3ee", fontWeight: 700 }}>RAG pipelines</strong>, creating products that redefine industry standards.</>,
              ].map((para, i) => (
                <p
                  key={i}
                  style={{ color: "#cbd5e1", lineHeight: 1.8, fontSize: "0.975rem" }}
                >
                  {para}
                </p>
              ))}
            </motion.div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ icon: Icon, label, value, color }, i) => (
                <motion.div
                  key={label}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  style={{
                    background: "rgba(3, 7, 18, 0.75)",
                    backdropFilter: "blur(20px)",
                    border: `1px solid ${color}40`,
                    borderRadius: 20,
                    padding: "1.75rem 1.5rem",
                    textAlign: "center",
                    cursor: "default",
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                    boxShadow: `0 8px 32px rgba(0,0,0,0.5)`,
                  }}
                  onHoverStart={(e) => {
                    const el = e.target as HTMLElement;
                    el.style.borderColor = `${color}70`;
                    el.style.boxShadow = `0 0 24px ${color}25`;
                  }}
                >
                  <div
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 14,
                      background: `${color}20`,
                      border: `1px solid ${color}40`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 12px",
                    }}
                  >
                    <Icon size={22} style={{ color }} />
                  </div>
                  <p
                    style={{
                      fontSize: "1.85rem",
                      fontWeight: 800,
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: "#ffffff",
                      lineHeight: 1,
                      marginBottom: 6,
                    }}
                  >
                    {value}
                  </p>
                  <p style={{ fontSize: "0.825rem", color: "#94a3b8", fontWeight: 600 }}>
                    {label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
