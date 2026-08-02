import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Download, Eye, Cpu, Braces } from "lucide-react";
import praneethPhoto from "@/assets/Photo.png";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

// Animated character-by-character text reveal with high-contrast text shadow
function TypewriterText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 + i * 0.015, duration: 0.2 }}
          style={{
            display: "inline-block",
            whiteSpace: char === " " ? "pre" : undefined,
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.8))",
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Radial dark gradient backdrop to guarantee 100% text contrast over 3D WebGL canvas */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 65% 75% at 25% 50%, rgba(3, 7, 18, 0.88) 0%, rgba(3, 7, 18, 0.4) 65%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-24 lg:pt-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: Text ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left p-4 sm:p-6 rounded-3xl"
            style={{
              background: "rgba(3, 7, 18, 0.45)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(59, 130, 246, 0.15)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
            }}
          >
            {/* Eyebrow label */}
            <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 14px",
                  borderRadius: 999,
                  background: "rgba(59, 130, 246, 0.15)",
                  border: "1px solid rgba(59, 130, 246, 0.4)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#93c5fd",
                  fontFamily: "'Space Grotesk', sans-serif",
                  boxShadow: "0 0 12px rgba(59,130,246,0.2)",
                }}
              >
                <Cpu size={14} className="text-cyan-400" />
                Full Stack Developer + AI Engineer
                <Braces size={14} className="text-cyan-400" />
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              style={{
                fontWeight: 800,
                fontFamily: "'Space Grotesk', sans-serif",
                lineHeight: 1.15,
                marginBottom: "1.25rem",
                color: "#ffffff",
                textShadow: "0 4px 20px rgba(0,0,0,0.9)",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  fontWeight: 700,
                  color: "#cbd5e1",
                  marginBottom: "0.25rem",
                }}
              >
                Hi, I'm
              </span>
              <span
                style={{
                  display: "inline-block",
                  whiteSpace: "nowrap",
                  fontSize: "clamp(1.8rem, 4.2vw, 3.2rem)",
                }}
              >
                <TypewriterText
                  text="Praneeth Reddy Ankey"
                  className="gradient-text"
                />
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={itemVariants}
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.75,
                color: "#cbd5e1",
                maxWidth: "32rem",
                marginBottom: "2rem",
                textShadow: "0 2px 10px rgba(0,0,0,0.9)",
              }}
              className="mx-auto lg:mx-0"
            >
              Building{" "}
              <strong style={{ color: "#38bdf8", fontWeight: 700 }}>production-ready AI agents</strong>,{" "}
              <strong style={{ color: "#60a5fa", fontWeight: 700 }}>RAG systems</strong>, and{" "}
              <strong style={{ color: "#c084fc", fontWeight: 700 }}>enterprise dashboards</strong> that
              redefine industry standards.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
              <a href="#contact" className="gradient-btn px-6 py-3 rounded-xl font-semibold text-sm">
                Get In Touch
              </a>
              <a
                href="#projects"
                style={{
                  padding: "12px 24px",
                  borderRadius: 12,
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  border: "1px solid rgba(59, 130, 246, 0.4)",
                  color: "#e2e8f0",
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                  background: "rgba(15, 23, 42, 0.6)",
                  backdropFilter: "blur(12px)",
                }}
              >
                View Projects
              </a>
              <a
                href="/Praneeth_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "12px 20px",
                  borderRadius: 12,
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  background: "rgba(139, 92, 246, 0.25)",
                  border: "1px solid rgba(139, 92, 246, 0.5)",
                  color: "#e9d5ff",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  transition: "all 0.25s ease",
                }}
              >
                <Eye size={16} />
                View Resume
              </a>
              <a
                href="/Praneeth_Resume.pdf"
                download
                title="Download Resume PDF"
                style={{
                  padding: "12px 14px",
                  borderRadius: 12,
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  background: "rgba(59, 130, 246, 0.15)",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  color: "#93c5fd",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  transition: "all 0.25s ease",
                }}
              >
                <Download size={16} />
              </a>
            </motion.div>

            {/* Social icons */}
            <motion.div variants={itemVariants} className="flex justify-center lg:justify-start gap-4">
              {[
                { icon: Github, href: "https://github.com", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/praneeth-reddy-ankey", label: "LinkedIn" },
                { icon: Mail, href: "mailto:apraneethreddy20891a0502@gmail.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    border: "1px solid rgba(59, 130, 246, 0.3)",
                    background: "rgba(15, 23, 42, 0.7)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#94a3b8",
                    transition: "all 0.25s ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(59, 130, 246, 0.8)";
                    el.style.color = "#ffffff";
                    el.style.boxShadow = "0 0 16px rgba(59, 130, 246, 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(59, 130, 246, 0.3)";
                    el.style.color = "#94a3b8";
                    el.style.boxShadow = "none";
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Photo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <div style={{ position: "relative" }}>
              {/* Glow rings */}
              <div
                className="animate-spin-slow"
                style={{
                  position: "absolute",
                  inset: -20,
                  borderRadius: "50%",
                  border: "1px solid rgba(59, 130, 246, 0.2)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: -8,
                  borderRadius: "24px",
                  background:
                    "linear-gradient(135deg, rgba(59,130,246,0.3), rgba(6,182,212,0.2), rgba(139,92,246,0.3))",
                  filter: "blur(12px)",
                  pointerEvents: "none",
                }}
              />

              {/* Photo */}
              <div
                style={{
                  position: "relative",
                  width: "min(20rem, 80vw)",
                  aspectRatio: "2/3",
                  borderRadius: 24,
                  overflow: "hidden",
                  border: "2px solid rgba(59, 130, 246, 0.35)",
                  boxShadow:
                    "0 0 40px rgba(59,130,246,0.25), 0 0 80px rgba(6,182,212,0.12)",
                }}
                className="animate-pulse-glow"
              >
                <img
                  src={praneethPhoto}
                  alt="Ankey Praneeth Reddy — Full Stack AI Developer"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
                style={{
                  position: "absolute",
                  bottom: 16,
                  right: -16,
                  background: "rgba(3, 7, 18, 0.95)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(16, 185, 129, 0.5)",
                  borderRadius: 12,
                  padding: "8px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#10b981",
                    boxShadow: "0 0 8px #10b981",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.8rem",
                    color: "#6ee7b7",
                    whiteSpace: "nowrap",
                  }}
                >
                  🚀 Open to Work
                </span>
              </motion.div>

              {/* Location badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 }}
                style={{
                  position: "absolute",
                  top: 16,
                  left: -16,
                  background: "rgba(3, 7, 18, 0.95)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(59, 130, 246, 0.4)",
                  borderRadius: 12,
                  padding: "6px 12px",
                  fontSize: "0.75rem",
                  color: "#93c5fd",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                📍 Hyderabad, India
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        style={{ color: "#3b82f6", textDecoration: "none" }}
        aria-label="Scroll to About section"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span style={{ fontSize: "0.65rem", color: "#94a3b8", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Scroll
          </span>
          <ArrowDown size={20} style={{ color: "#38bdf8" }} />
        </div>
      </a>
    </section>
  );
};

export default HeroSection;
