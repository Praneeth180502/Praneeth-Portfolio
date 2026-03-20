import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-card py-3" : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6">
        <a href="#" className="font-heading text-lg sm:text-xl font-bold gradient-text whitespace-nowrap overflow-hidden text-ellipsis">
          Praneeth.dev
        </a>

        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-muted transition-colors"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className="flex items-center gap-2">
            <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg text-sm font-medium border border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all text-muted-foreground hover:text-primary">
              View
            </a>
            <a href="/Resume.pdf" download className="gradient-btn px-4 py-2 rounded-lg text-sm font-semibold">
              Download
            </a>
          </div>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button onClick={() => setDark(!dark)} className="p-2 rounded-lg bg-secondary text-secondary-foreground">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-foreground">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card mx-4 mt-2 rounded-xl overflow-hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 px-4 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="grid grid-cols-2 gap-3 mt-3">
                <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className="py-2.5 px-4 rounded-lg text-sm font-medium border border-border text-center hover:bg-secondary transition-colors text-foreground">
                  View
                </a>
                <a href="/Resume.pdf" download className="gradient-btn px-4 py-2.5 rounded-lg text-sm font-semibold text-center">
                  Download
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
