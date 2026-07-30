import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap, FileText } from "lucide-react";

const navLinks = [
  { href: "#about",      label: "About"      },
  { href: "#experience", label: "Experience" },
  { href: "#skills",     label: "Skills"     },
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
      // Detect active section
      for (const link of navLinks) {
        const el = document.querySelector(link.href);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 0) {
            setActive(link.href);
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.4s ease",
        background: scrolled
          ? "rgba(3, 7, 18, 0.85)"
          : "rgba(3, 7, 18, 0.1)",
        backdropFilter: scrolled ? "blur(20px) saturate(1.6)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.6)" : "none",
        borderBottom: scrolled ? "1px solid rgba(59, 130, 246, 0.15)" : "none",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 16px rgba(59, 130, 246, 0.5)",
              }}
            >
              <Zap size={16} color="white" fill="white" />
            </div>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Praneeth.AI
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
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
                  color: active === href ? "#e0f2fe" : "#94a3b8",
                  transition: "color 0.25s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#e0f2fe"; }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    active === href ? "#e0f2fe" : "#94a3b8";
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
                      width: 20,
                      height: 2,
                      borderRadius: 1,
                      background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
                      boxShadow: "0 0 8px rgba(59, 130, 246, 0.7)",
                    }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="/Praneeth_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{
                background: "rgba(139, 92, 246, 0.2)",
                border: "1px solid rgba(139, 92, 246, 0.4)",
                color: "#e9d5ff",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              <FileText size={14} />
              Resume
            </a>
            <a
              href="#contact"
              className="hidden md:flex gradient-btn px-4 py-2 rounded-lg text-sm font-semibold"
            >
              Hire Me
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg"
              style={{ color: "#94a3b8", background: "rgba(30, 41, 59, 0.5)" }}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
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
              background: "rgba(3, 7, 18, 0.95)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(59, 130, 246, 0.15)",
            }}
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 8,
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    color: "#94a3b8",
                    textDecoration: "none",
                    display: "block",
                  }}
                >
                  {label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
