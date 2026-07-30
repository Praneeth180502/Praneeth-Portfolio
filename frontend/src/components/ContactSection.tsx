import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Briefcase, Send } from "lucide-react";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "apraneethreddy20891a0502@gmail.com",
    href: "mailto:apraneethreddy20891a0502@gmail.com",
    color: "#3b82f6",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 8179141580",
    href: "tel:+918179141580",
    color: "#06b6d4",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Hyderabad, India",
    href: "#",
    color: "#10b981",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/praneeth-reddy-ankey",
    href: "https://www.linkedin.com/in/praneeth-reddy-ankey",
    color: "#0ea5e9",
  },
  {
    icon: Briefcase,
    label: "Naukri Profile",
    value: "View Naukri Profile",
    href: "https://www.naukri.com/mnjuser/profile?id=&altresid",
    color: "#8b5cf6",
  },
];

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding" style={{ background: "transparent" }}>
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label mb-3">Contact</p>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 800,
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#f1f5f9",
              marginBottom: "1rem",
              lineHeight: 1.2,
            }}
          >
            Let's <span className="gradient-text">connect</span>
          </h2>
          <p
            style={{
              color: "#94a3b8",
              fontSize: "1rem",
              lineHeight: 1.75,
              maxWidth: "36rem",
              marginBottom: "3rem",
            }}
          >
            I'm open to full-time opportunities, freelance projects, and collaboration.
            Feel free to reach out — I typically respond within 24 hours!
          </p>
        </motion.div>

        {/* Contact cards grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {contactItems.map(({ icon: Icon, label, value, href, color }, i) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                background: "rgba(15, 23, 42, 0.65)",
                backdropFilter: "blur(20px)",
                border: `1px solid ${color}25`,
                borderRadius: 16,
                padding: "1.1rem 1.4rem",
                textDecoration: "none",
                transition: "border-color 0.3s, box-shadow 0.3s",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
              onHoverStart={(e) => {
                const el = e.target as HTMLElement;
                const card = el.closest('a') as HTMLElement;
                if (card) {
                  card.style.borderColor = `${color}50`;
                  card.style.boxShadow = `0 0 20px ${color}18`;
                }
              }}
              onHoverEnd={(e) => {
                const el = e.target as HTMLElement;
                const card = el.closest('a') as HTMLElement;
                if (card) {
                  card.style.borderColor = `${color}25`;
                  card.style.boxShadow = "none";
                }
              }}
            >
              {/* Side accent line */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 3,
                  background: `linear-gradient(180deg, ${color}, transparent)`,
                  borderRadius: "0 0 0 16px",
                }}
              />

              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: `${color}15`,
                  border: `1px solid ${color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon size={20} style={{ color }} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ color: "#64748b", fontSize: "0.72rem", fontWeight: 600, marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {label}
                </p>
                <p
                  style={{
                    color: "#e2e8f0",
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

              <Send size={14} style={{ color: "#475569", flexShrink: 0 }} />
            </motion.a>
          ))}
        </div>

        {/* Availability status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{
            marginTop: "2.5rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 24px",
              borderRadius: 999,
              background: "rgba(16, 185, 129, 0.08)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#10b981",
                boxShadow: "0 0 8px #10b981",
                animation: "pulse-glow 2s ease infinite",
              }}
            />
            <span style={{ color: "#6ee7b7", fontWeight: 600, fontSize: "0.875rem" }}>
              Available for new opportunities
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
