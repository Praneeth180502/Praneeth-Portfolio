import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Download, Eye, Sparkles, MapPin, Briefcase, Cpu } from "lucide-react";
import praneethPhoto from "@/assets/Photo.jpg";

/* ── Node-graph canvas background (White & Silver) ── */
function NodeGraphCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const isMobile = window.innerWidth < 768;
    const nodeCount = isMobile ? 20 : 45;

    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      isSilver: Math.random() > 0.4,
    }));

    let mouseX = -9999;
    let mouseY = -9999;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update positions
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.18;
            ctx.strokeStyle = `rgba(228, 228, 231, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }

        // Connect to mouse cursor
        const mdx = n.x - mouseX;
        const mdy = n.y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 150) {
          const alpha = (1 - mdist / 150) * 0.4;
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();
        }

        // Draw Node
        ctx.fillStyle = n.isSilver ? "rgba(255, 255, 255, 0.75)" : "rgba(161, 161, 170, 0.5)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      style={{ opacity: 0.75 }}
    />
  );
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 bg-[#000000] text-[#e4e4e7] overflow-hidden"
    >
      {/* ── Background Blended Portrait Image Layer ── */}
      <div className="absolute top-0 right-0 bottom-0 w-full lg:w-[58%] pointer-events-none overflow-hidden z-0">
        <img
          src={praneethPhoto}
          alt="Praneeth Reddy Ankey"
          className="w-full h-full object-cover object-top opacity-35 sm:opacity-45 lg:opacity-55 filter brightness-[0.75] contrast-[1.08] transition-all duration-700"
        />
        {/* Left-to-right pitch black blend */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/75 to-transparent" />
        {/* Top-and-bottom pitch black fades */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-[#000000]/80" />
        {/* Subtle radial spotlight over portrait */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#000000]/40 to-[#000000]" />
      </div>

      {/* Interactive Node Canvas Overlay */}
      <NodeGraphCanvas />

      {/* Ambient top lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-white/[0.04] to-transparent rounded-full blur-3xl pointer-events-none z-0" />

      <div className="container relative z-20 mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Headline & Value Statement (7 cols desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0c0c0e]/90 border border-[#27272a] backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#ffffff] animate-pulse" />
              <span className="eyebrow text-[#a1a1aa] tracking-widest text-[11px]">
                ASSOCIATE AI ENGINEER · DIGIMAXX
              </span>
            </div>

            {/* H1 Headline per design.md §9 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#ffffff] leading-[1.1] tracking-tight">
              Praneeth Reddy Ankey.
              <span className="block mt-2 text-[#a1a1aa] font-semibold text-3xl sm:text-4xl lg:text-5xl">
                Building the orchestration layer behind production AI.
              </span>
            </h1>

            {/* Sub-headline per design.md §9 */}
            <p className="text-base sm:text-lg text-[#e4e4e7] max-w-2xl font-normal leading-relaxed drop-shadow">
              Autonomous agents, RAG pipelines, and intelligent workflows, coordinated into reliable, enterprise-ready software systems.
            </p>

            {/* Key Capability Chips */}
            <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs text-[#a1a1aa]">
              {["LangChain & LlamaIndex", "Multi-Agent Swarms", "Hybrid RAG + Vector DBs", "FastAPI & Python", "React / Next.js"].map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-md bg-[#0c0c0e]/80 backdrop-blur-md border border-[#27272a] text-[#e4e4e7]">
                  {tag}
                </span>
              ))}
            </div>

            {/* CTAs per design.md §7 */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a href="#projects" className="btn-primary">
                <Eye size={16} />
                <span>View projects</span>
              </a>

              <a href="#contact" className="btn-secondary backdrop-blur-md">
                <Mail size={16} />
                <span>Contact me</span>
              </a>

              <a
                href="/Praneeth_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono text-[#a1a1aa] hover:text-[#ffffff] transition-colors pl-2"
              >
                <Download size={14} />
                <span>Resume (PDF)</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs font-mono text-[#a1a1aa]">CONNECT:</span>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#a1a1aa] hover:text-[#ffffff] transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/praneeth-reddy-ankey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#a1a1aa] hover:text-[#ffffff] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:apraneethreddy20891a0502@gmail.com"
                className="text-[#a1a1aa] hover:text-[#ffffff] transition-colors"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Sleek Glass Engineering Stats Panel (5 cols desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center"
          >
            <div className="relative w-full max-w-sm rounded-2xl bg-[#0c0c0e]/85 backdrop-blur-md border border-[#27272a] p-6 shadow-2xl hover:border-[#3f3f46] transition-all group">
              {/* Silver top accent line */}
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#ffffff] to-transparent opacity-40" />

              <div className="flex items-center justify-between border-b border-[#27272a] pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-[#ffffff]/10 text-[#ffffff]">
                    <Cpu size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#ffffff] tracking-tight">System Specification</h3>
                    <p className="text-[11px] font-mono text-[#a1a1aa]">Engineering Metrics</p>
                  </div>
                </div>
                <Sparkles size={16} className="text-[#a1a1aa]" />
              </div>

              <div className="space-y-3 text-xs font-mono text-[#a1a1aa]">
                <div className="flex items-center justify-between py-1 border-b border-[#16161a]">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-[#ffffff]" /> LOCATION:
                  </span>
                  <span className="text-[#ffffff] font-semibold">Hyderabad, India</span>
                </div>
                
                <div className="flex items-center justify-between py-1 border-b border-[#16161a]">
                  <span className="flex items-center gap-1.5">
                    <Cpu size={13} className="text-[#ffffff]" /> SPECIALIZATION:
                  </span>
                  <span className="text-[#ffffff] font-semibold">Agents & RAG Systems</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-[#16161a]">
                  <span className="flex items-center gap-1.5">
                    <Briefcase size={13} className="text-[#ffffff]" /> EXPERIENCE:
                  </span>
                  <span className="text-[#ffffff] font-semibold">Assoc AI Eng @ Digimaxx</span>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="mt-5 p-3 rounded-xl bg-[#16161a]/90 border border-[#27272a] flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10b981]"></span>
                </span>
                <span className="text-[11px] font-mono text-[#e4e4e7] font-medium">
                  Building autonomous agent workflows
                </span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Scroll down indicator */}
        <div className="mt-16 text-center">
          <a
            href="#about"
            className="inline-flex flex-col items-center gap-1.5 text-xs font-mono text-[#a1a1aa] hover:text-[#ffffff] transition-colors"
          >
            <span>EXPLORE</span>
            <ArrowDown size={14} className="animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
