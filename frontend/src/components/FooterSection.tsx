import { Github, Linkedin, Mail } from "lucide-react";

const FooterSection = () => {
  return (
    <footer
      style={{
        borderTop: "1px solid #1e293b",
        background: "#0a0a0f",
        padding: "2.5rem 0",
      }}
    >
      <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-base tracking-tight text-[#f8fafc]">
            P<span className="text-[#06b6d4]">.</span>AI
          </span>
          <span className="text-xs font-mono text-[#94a3b8] ml-2 pl-2 border-l border-[#1e293b]">
            AI Engineer
          </span>
        </div>

        {/* Copyright */}
        <p className="text-xs text-[#94a3b8] font-mono">
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
              className="w-9 h-9 rounded-lg border border-[#1e293b] bg-[#12121a] flex items-center justify-center text-[#94a3b8] hover:text-[#06b6d4] hover:border-[#06b6d4]/40 hover:bg-[#181824] transition-all"
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
