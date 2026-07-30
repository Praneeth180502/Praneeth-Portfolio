import { Github, Linkedin, Mail, Zap, Heart } from "lucide-react";

const FooterSection = () => {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(59, 130, 246, 0.12)",
        background: "rgba(3, 7, 18, 0.8)",
        backdropFilter: "blur(16px)",
        padding: "2rem 0",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 10px rgba(59, 130, 246, 0.4)",
            }}
          >
            <Zap size={14} color="white" fill="white" />
          </div>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "0.95rem",
              background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Praneeth.AI
          </span>
        </div>

        {/* Copyright */}
        <p
          style={{
            fontSize: "0.8rem",
            color: "#475569",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          Built with
          <Heart size={12} style={{ color: "#ef4444", fill: "#ef4444" }} />
          by Ankey Praneeth Reddy · © 2025
        </p>

        {/* Socials */}
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { icon: Github,   href: "https://github.com",                                    label: "GitHub"   },
            { icon: Linkedin, href: "https://www.linkedin.com/in/praneeth-reddy-ankey",      label: "LinkedIn" },
            { icon: Mail,     href: "mailto:apraneethreddy20891a0502@gmail.com",             label: "Email"    },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                width: 36,
                height: 36,
                borderRadius: 9,
                border: "1px solid rgba(59, 130, 246, 0.18)",
                background: "rgba(15, 23, 42, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#475569",
                textDecoration: "none",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "#93c5fd";
                el.style.borderColor = "rgba(59,130,246,0.5)";
                el.style.boxShadow = "0 0 10px rgba(59,130,246,0.25)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "#475569";
                el.style.borderColor = "rgba(59, 130, 246, 0.18)";
                el.style.boxShadow = "none";
              }}
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
