import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Download, Eye } from "lucide-react";
import praneethPhoto from "@/assets/Photo.png";

/* ── Node-graph canvas background ── */
function NodeGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = 0, h = 0;

    const isMobile = () => window.innerWidth < 768;
    const NODE_COUNT = () => (isMobile() ? 25 : 60);

    type Node = { x: number; y: number; vx: number; vy: number; r: number };
    let nodes: Node[] = [];

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      const n = NODE_COUNT();
      nodes = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 1,
      }));
    };

    const LINK_DIST = 140;
    const CURSOR_DIST = 120;
    let mx = -999, my = -999;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };

    const draw = () => {
      if (document.hidden) { animId = requestAnimationFrame(draw); return; }
      ctx.clearRect(0, 0, w, h);

      // Blue radial glow behind center-left (behind headline)
      const grd = ctx.createRadialGradient(w * 0.3, h * 0.5, 0, w * 0.3, h * 0.5, w * 0.55);
      grd.addColorStop(0, "rgba(59,130,246,0.08)");
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      // Update nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      // Draw edges between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.18;
            ctx.strokeStyle = `rgba(6,182,212,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
        // Cursor connections
        const cdx = nodes[i].x - mx;
        const cdy = nodes[i].y - my;
        const cd = Math.hypot(cdx, cdy);
        if (cd < CURSOR_DIST) {
          const alpha = (1 - cd / CURSOR_DIST) * 0.4;
          ctx.strokeStyle = `rgba(59,130,246,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mx, my);
          ctx.stroke();
        }
      }

      // Draw nodes
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(6,182,212,0.7)";
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      <NodeGraph />

      {/* Dark gradient so text always reads over canvas */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 70% at 20% 50%, rgba(10,10,15,0.92) 0%, rgba(10,10,15,0.5) 60%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      <div className="container relative z-10 pt-24 lg:pt-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: Text ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow */}
            <motion.p variants={itemVariants} className="eyebrow mb-6">
              Associate AI Engineer · Digimaxx AI Solutions
            </motion.p>

            {/* H1 */}
            <motion.h1
              variants={itemVariants}
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: "var(--text-strong)",
                marginBottom: "1.25rem",
              }}
            >
              Praneeth.{" "}
              <span className="gradient-text">AI Engineer</span>
            </motion.h1>

            {/* Tagline — from design.md §9 */}
            <motion.p
              variants={itemVariants}
              style={{
                fontSize: "1rem",
                lineHeight: 1.7,
                color: "var(--text)",
                maxWidth: "38rem",
                marginBottom: "2rem",
              }}
            >
              Building the{" "}
              <strong style={{ color: "var(--accent)", fontWeight: 600 }}>
                orchestration layer
              </strong>{" "}
              behind production AI. Agents, RAG pipelines, and workflows —
              coordinated into{" "}
              <strong style={{ color: "var(--accent-2)", fontWeight: 600 }}>
                reliable, scalable systems
              </strong>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 32 }}>
              <a href="#projects" className="btn-primary">
                View Projects
              </a>
              <a href="#contact" className="btn-secondary">
                Let's talk
              </a>
              <a
                href="/Praneeth_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ gap: 6 }}
              >
                <Eye size={15} />
                Resume
              </a>
              <a
                href="/Praneeth_Resume.pdf"
                download
                title="Download Resume PDF"
                className="btn-secondary"
                style={{ padding: "12px 14px" }}
              >
                <Download size={15} />
              </a>
            </motion.div>

            {/* Social icons */}
            <motion.div variants={itemVariants} style={{ display: "flex", gap: 12 }}>
              {[
                { icon: Github, href: "https://github.com/Praneeth180502", label: "GitHub" },
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
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    border: "1px solid var(--border)",
                    background: "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-muted)",
                    transition: "border-color 150ms ease, color 150ms ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--accent)";
                    el.style.color = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--border)";
                    el.style.color = "var(--text-muted)";
                  }}
                >
                  <Icon size={17} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Photo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <div style={{ position: "relative" }}>
              {/* Subtle blue glow ring */}
              <div
                className="animate-spin-slow"
                style={{
                  position: "absolute",
                  inset: -16,
                  borderRadius: "50%",
                  border: "1px solid rgba(6,182,212,0.15)",
                  pointerEvents: "none",
                }}
              />

              {/* Photo */}
              <div
                style={{
                  position: "relative",
                  width: "min(18rem, 78vw)",
                  aspectRatio: "2/3",
                  borderRadius: 12,
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                  boxShadow: "0 0 40px rgba(6,182,212,0.15)",
                }}
              >
                <img
                  src={praneethPhoto}
                  alt="Ankey Praneeth Reddy — AI Engineer"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, type: "spring" }}
                style={{
                  position: "absolute",
                  bottom: 16,
                  right: -16,
                  background: "var(--surface)",
                  border: "1px solid rgba(16,185,129,0.4)",
                  borderRadius: 8,
                  padding: "7px 13px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "0 0 16px rgba(16,185,129,0.2)",
                }}
              >
                <span
                  className="animate-pulse-glow"
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "var(--success)",
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: "0.78rem", fontWeight: 500, color: "#6ee7b7", whiteSpace: "nowrap" }}>
                  Open to Work
                </span>
              </motion.div>

              {/* Location badge */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 }}
                style={{
                  position: "absolute",
                  top: 16,
                  left: -16,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  padding: "5px 11px",
                  fontSize: "0.72rem",
                  color: "var(--text-muted)",
                  fontWeight: 500,
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
        style={{ color: "var(--accent)", textDecoration: "none" }}
        aria-label="Scroll to About section"
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
          <span className="eyebrow" style={{ fontSize: "0.6rem" }}>scroll</span>
          <ArrowDown size={18} />
        </div>
      </a>
    </section>
  );
};

export default HeroSection;
