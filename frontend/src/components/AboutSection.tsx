import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Briefcase, Award } from "lucide-react";

const stats = [
  { icon: Briefcase,     label: "Internships",     value: "2+",        color: "var(--accent-2)" },
  { icon: GraduationCap, label: "CGPA",             value: "7.58",      color: "var(--accent)"   },
  { icon: Award,         label: "Certifications",   value: "3+",        color: "var(--accent-2)" },
  { icon: MapPin,        label: "Location",         value: "Hyderabad", color: "var(--accent)"   },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // IntersectionObserver for .reveal elements
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
      id="about"
      ref={sectionRef}
      className="section-padding"
      style={{ background: "var(--bg)", position: "relative", overflow: "hidden" }}
    >
      {/* Faint dot grid with animated opacity — subtle cursor-spotlight feel */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(6,182,212,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          animation: "dot-cursor 4s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div className="reveal" style={{ marginBottom: "2.5rem" }}>
          <p className="section-label mb-3">About Me</p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 600,
              color: "var(--text-strong)",
              letterSpacing: "-0.01em",
            }}
          >
            Intelligence, engineered for{" "}
            <span className="gradient-text">the real world.</span>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          {/* Bio text card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-card)",
              padding: "var(--pad-card)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {[
              <>
                B.Tech Computer Science graduate from{" "}
                <strong style={{ color: "var(--accent)", fontWeight: 600 }}>
                  Vignan Institute of Technology and Science
                </strong>, Hyderabad.
                Associate AI Engineer at{" "}
                <strong style={{ color: "var(--accent)", fontWeight: 600 }}>Digimaxx AI Solutions</strong>.
              </>,
              <>
                Started with internships at{" "}
                <strong style={{ color: "var(--accent-2)", fontWeight: 600 }}>DRDO</strong>{" "}
                (Live Missile Data Simulation) and{" "}
                <strong style={{ color: "var(--accent-2)", fontWeight: 600 }}>CognitBotz</strong>{" "}
                (enterprise dashboards for Adani using React.js, FastAPI, and PostgreSQL).
              </>,
              <>
                Today I build the <strong style={{ color: "var(--accent)", fontWeight: 600 }}>orchestration layer</strong> behind production AI —
                coordinating agents,{" "}
                <strong style={{ color: "var(--accent-2)", fontWeight: 600 }}>RAG pipelines</strong>, and workflows into reliable, scalable systems.
              </>,
            ].map((para, i) => (
              <p
                key={i}
                style={{ color: "var(--text)", lineHeight: 1.75, fontSize: "0.95rem" }}
              >
                {para}
              </p>
            ))}
          </motion.div>

          {/* Stats grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            {stats.map(({ icon: Icon, label, value, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-card)",
                  padding: "1.5rem",
                  textAlign: "center",
                  transition: "border-color 150ms ease, background 150ms ease",
                  cursor: "default",
                }}
                onHoverStart={(e) => {
                  const el = e.target as HTMLElement;
                  const card = el.closest("[data-stat]") as HTMLElement;
                  if (card) {
                    card.style.borderColor = `${color === "var(--accent)" ? "rgba(6,182,212,0.45)" : "rgba(59,130,246,0.45)"}`;
                    card.style.background = "var(--surface-2)";
                  }
                }}
                onHoverEnd={(e) => {
                  const el = e.target as HTMLElement;
                  const card = el.closest("[data-stat]") as HTMLElement;
                  if (card) {
                    card.style.borderColor = "var(--border)";
                    card.style.background = "var(--surface)";
                  }
                }}
                data-stat=""
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: color === "var(--accent)" ? "rgba(6,182,212,0.1)" : "rgba(59,130,246,0.1)",
                    border: `1px solid ${color === "var(--accent)" ? "rgba(6,182,212,0.25)" : "rgba(59,130,246,0.25)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 10px",
                  }}
                >
                  <Icon size={19} style={{ color }} />
                </div>
                <p
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: 600,
                    color: "var(--text-strong)",
                    lineHeight: 1,
                    marginBottom: 5,
                  }}
                >
                  {value}
                </p>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.72rem",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
