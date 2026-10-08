import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";
import VisitorCounter from "@/components/VisitorCounter";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(0, 0, 0, 0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #27272a" : "1px solid transparent",
      }}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Wordmark logo per design.md §1 & §4 */}
        <a href="#hero" className="flex items-center gap-2 group">
          <span className="font-mono font-bold text-lg tracking-tight text-[#ffffff] group-hover:text-[#d4d4d8] transition-colors">
            P<span className="text-[#a1a1aa]">.</span>AI
          </span>
          <span className="hidden sm:inline-block text-xs font-mono text-[#a1a1aa] border-l border-[#27272a] pl-2">
            AI Engineer
          </span>
        </a>

        {/* Desktop Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative text-xs font-mono tracking-wider transition-colors duration-150 py-1 ${
                  isActive ? "text-[#ffffff] font-semibold" : "text-[#a1a1aa] hover:text-[#ffffff]"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeUnderline"
                    className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#ffffff] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action: Visitor Counter + Resume + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <VisitorCounter />

          <a
            href="/Praneeth_Reddy_AI_Engineer.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono text-[#a1a1aa] hover:text-[#ffffff] transition-colors"
            title="Download Resume"
          >
            <FileText size={14} />
            <span>CV</span>
          </a>

          <a
            href="#contact"
            className="px-4 py-2 rounded-lg bg-[#ffffff] text-[#000000] font-semibold text-xs hover:bg-[#e4e4e7] transition-all shadow-sm"
          >
            Let's talk
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#a1a1aa] hover:text-[#ffffff] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-b border-[#27272a] bg-[#0c0c0e] px-6 py-4 space-y-3"
          >
            <VisitorCounter isMobile />

            <div className="flex flex-col space-y-2 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-mono text-[#e4e4e7] hover:text-[#ffffff] py-2 border-b border-[#16161a]"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <a
                href="/Praneeth_Reddy_AI_Engineer.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono text-[#a1a1aa] hover:text-[#ffffff]"
              >
                <FileText size={14} />
                <span>Resume (PDF)</span>
              </a>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 rounded-lg bg-[#ffffff] text-[#000000] font-semibold text-xs text-center"
              >
                Let's talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
