import { Github, Linkedin, Mail } from "lucide-react";

const FooterSection = () => {
  return (
    <footer
      style={{
        borderTop: "1px solid #27272a",
        background: "#000000",
        padding: "2.5rem 0",
      }}
    >
      <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-base tracking-tight text-[#ffffff]">
            P<span className="text-[#a1a1aa]">.</span>AI
          </span>
          <span className="text-xs font-mono text-[#a1a1aa] ml-2 pl-2 border-l border-[#27272a]">
            AI Engineer
          </span>
        </div>

        {/* Copyright */}
        <p className="text-xs text-[#a1a1aa] font-mono">
          Praneeth Reddy Ankey · © 2026 · Built with React & TypeScript
        </p>

        {/* Socials */}
        <div className="flex items-center gap-3">
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
              className="w-9 h-9 rounded-lg border border-[#27272a] bg-[#0c0c0e] flex items-center justify-center text-[#a1a1aa] hover:text-[#ffffff] hover:border-[#3f3f46] hover:bg-[#16161a] transition-all"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
