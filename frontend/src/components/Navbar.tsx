import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";
import VisitorCounter from "@/components/VisitorCounter";

const navLinks = [
  { href: "#about",      label: "About"      },
  { href: "#skills",     label: "Skills"     },
  { href: "#experience", label: "Experience" },
  { href: "#projects",   label: "Projects"   },
  { href: "#contact",    label: "Contact"    },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      for (const link of navLinks) {
        const el = document.querySelector(link.href);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 0) setActive(link.href);
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      id="site-nav"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "background 0.3s ease, border-color 0.3s ease",
        background: scrolled ? "rgba(10,10,15,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(1.5)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.5)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <div className="container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>

          {/* Logo / wordmark */}
          <a
            href="#"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 500,
                fontSize: "1rem",
                color: "var(--text-strong)",
                letterSpacing: "-0.01em",
              }}
            >
              <span style={{ color: "var(--accent)" }}>P.</span>AI
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center" style={{ gap: 4 }} aria-label="Main navigation">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                style={{
                  position: "relative",
                  padding: "6px 14px",
                  borderRadius: 8,
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: active === href ? "var(--text-strong)" : "var(--text-muted)",
                  transition: "color 150ms ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-strong)"; }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    active === href ? "var(--text-strong)" : "var(--text-muted)";
                }}
              >
                {label}
                {active === href && (
                  <motion.div
                    layoutId="nav-indicator"
                    style={{
                      position: "absolute",
                      bottom: 2,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 16,
                      height: 2,
                      borderRadius: 1,
                      background: "var(--accent)",
                    }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <VisitorCounter />
            <a
              href="/Praneeth_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex btn-secondary"
              style={{ padding: "7px 14px", fontSize: "0.8rem", gap: 6 }}
            >
              <FileText size={13} />
              Resume
            </a>
            <a
              href="#contact"
              className="hidden md:inline-flex btn-primary"
              style={{ padding: "7px 16px", fontSize: "0.8rem" }}
            >
              Let's talk
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden"
              style={{
                padding: "6px 8px",
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: "transparent",
                color: "var(--text-muted)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: "rgba(10,10,15,0.96)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid var(--border)",
            }}
          >
            <nav className="container" style={{ paddingBlock: 16 }} aria-label="Mobile navigation">
              <div style={{ paddingBottom: 12, marginBottom: 12, borderBottom: "1px solid var(--border)" }}>
                <VisitorCounter isMobile />
              </div>
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: "block",
                    padding: "10px 0",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  {label}
                </a>
              ))}
              <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
                <a href="#contact" className="btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={() => setIsOpen(false)}>
                  Let's talk
                </a>
                <a
                  href="/Praneeth_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ flex: 1, justifyContent: "center", gap: 6 }}
                >
                  <FileText size={13} />
                  Resume
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
