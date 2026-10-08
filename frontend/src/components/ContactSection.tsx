import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Briefcase, Send } from "lucide-react";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "apraneethreddy20891a0502@gmail.com",
    href: "mailto:apraneethreddy20891a0502@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 8179141580",
    href: "tel:+918179141580",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Hyderabad, India",
    href: "#",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/praneeth-reddy-ankey",
    href: "https://www.linkedin.com/in/praneeth-reddy-ankey",
  },
  {
    icon: Briefcase,
    label: "Naukri",
    value: "View Naukri Profile",
    href: "https://www.naukri.com/mnjuser/profile?id=&altresid",
  },
];

/* ── Concentric signal rings background ── */
function SignalRings() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {[1, 2, 3, 4].map((n) => (
        <div
          key={n}
          style={{
            position: "absolute",
            borderRadius: "50%",
            border: "1px solid rgba(6,182,212,0.15)",
            width: n * 160,
            height: n * 160,
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            animation: `signal-ring-pulse ${2 + n * 0.8}s ease-out infinite`,
            animationDelay: `${n * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    const reveals = sectionRef.current?.querySelectorAll(".reveal") ?? [];
    reveals.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding"
      style={{ background: "var(--bg)", position: "relative", overflow: "hidden" }}
    >
      <SignalRings />

      <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: 800 }}>

        {/* Header */}
        <div className="reveal" style={{ marginBottom: "3rem", textAlign: "center" }}>
          <p className="section-label mb-3" style={{ justifyContent: "center" }}>Contact</p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 600,
              color: "var(--text-strong)",
              letterSpacing: "-0.01em",
              marginBottom: "0.75rem",
            }}
          >
            Have a complex problem?{" "}
            <span className="gradient-text">Let's build the intelligence to solve it.</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", maxWidth: "36rem", margin: "0 auto" }}>
            Open to full-time opportunities, freelance projects, and collaboration.
            I typically respond within 24 hours.
          </p>
        </div>

        {/* Contact cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
            gap: 12,
          }}
        >
          {contactItems.map(({ icon: Icon, label, value, href }, i) => (
            <motion.a
              key={label}
              id={`contact-${label.toLowerCase()}`}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09, duration: 0.5 }}
              whileHover={{ y: -4 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-card)",
                padding: "1rem 1.25rem",
                textDecoration: "none",
                transition: "border-color 150ms ease, background 150ms ease",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
              onHoverStart={(e) => {
                const el = e.target as HTMLElement;
                const card = el.closest("a") as HTMLElement;
                if (card) {
                  card.style.borderColor = "rgba(6,182,212,0.4)";
                  card.style.background = "var(--surface-2)";
                }
              }}
              onHoverEnd={(e) => {
                const el = e.target as HTMLElement;
                const card = el.closest("a") as HTMLElement;
                if (card) {
                  card.style.borderColor = "var(--border)";
                  card.style.background = "var(--surface)";
                }
              }}
            >
              {/* Left accent bar */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 2,
                  background: "linear-gradient(180deg, var(--accent), var(--accent-2))",
                  borderRadius: "var(--radius-card) 0 0 var(--radius-card)",
                }}
              />

              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 8,
                  background: "rgba(6,182,212,0.08)",
                  border: "1px solid rgba(6,182,212,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon size={17} style={{ color: "var(--accent)" }} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.68rem",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: 2,
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    color: "var(--text)",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {value}
                </p>
              </div>

              <Send size={13} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
            </motion.a>
          ))}
        </div>

        {/* Availability status */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{ marginTop: "2.5rem", display: "flex", justifyContent: "center" }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 22px",
              borderRadius: 999,
              background: "rgba(16,185,129,0.06)",
              border: "1px solid rgba(16,185,129,0.25)",
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
            <span style={{ color: "#6ee7b7", fontWeight: 500, fontSize: "0.875rem" }}>
              Available for new opportunities
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
