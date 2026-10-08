import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink, MessageSquare } from "lucide-react";

/* ── Concentric signal rings per design.md §6 ── */
function ConcentricSignalRings() {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-15 overflow-hidden">
      <svg className="w-[650px] h-[650px]" viewBox="0 0 650 650" fill="none">
        <circle cx="325" cy="325" r="100" stroke="#52525b" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="325" cy="325" r="190" stroke="#3f3f46" strokeWidth="1" />
        <circle cx="325" cy="325" r="280" stroke="#27272a" strokeWidth="1" strokeDasharray="6 6" />
        <circle cx="325" cy="325" r="360" stroke="#27272a" strokeWidth="1" />
      </svg>
    </div>
  );
}

const contactChannels = [
  {
    icon: Mail,
    title: "Email",
    label: "apraneethreddy20891a0502@gmail.com",
    href: "mailto:apraneethreddy20891a0502@gmail.com",
    actionText: "Send email",
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    label: "linkedin.com/in/praneeth-reddy-ankey",
    href: "https://www.linkedin.com/in/praneeth-reddy-ankey",
    actionText: "Connect on LinkedIn",
  },
  {
    icon: Github,
    title: "GitHub",
    label: "github.com/Praneeth180502",
    href: "https://github.com",
    actionText: "View GitHub profile",
  },
  {
    icon: Phone,
    title: "Phone",
    label: "+91 8179141580",
    href: "tel:+918179141580",
    actionText: "Call directly",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-28 bg-[#000000] text-[#e4e4e7] overflow-hidden">
      <ConcentricSignalRings />

      <div className="container relative z-10 mx-auto px-6 max-w-4xl">

        {/* Centered Section Header with design.md §9 Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-center mb-16"
        >
          <span className="eyebrow text-[#a1a1aa]">CONTACT</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#ffffff] tracking-tight leading-tight">
            Have a complex problem? Let's build the intelligence to solve it.
          </h2>
          <p className="text-[#a1a1aa] text-base sm:text-lg font-normal max-w-2xl mx-auto pt-2">
            Available for production AI engineering projects, multi-agent systems, and RAG architecture consulting.
          </p>
        </motion.div>

        {/* Centered Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {contactChannels.map((channel, idx) => {
            const Icon = channel.icon;
            return (
              <motion.a
                key={channel.title}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="card-silver p-6 flex flex-col justify-between group hover:border-[#ffffff] transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-[#16161a] border border-[#27272a] text-[#ffffff] group-hover:bg-[#ffffff] group-hover:text-[#000000] transition-colors">
                    <Icon size={20} />
                  </div>
                  <ExternalLink size={16} className="text-[#a1a1aa] group-hover:text-[#ffffff] transition-colors" />
                </div>

                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[#a1a1aa] mb-1">
                    {channel.title}
                  </h3>
                  <div className="font-bold text-sm sm:text-base text-[#ffffff] truncate mb-3">
                    {channel.label}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#a1a1aa] group-hover:text-[#ffffff] transition-colors">
                    <span>{channel.actionText}</span>
                    <span>→</span>
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Direct Email Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-2xl bg-[#0c0c0e] border border-[#3f3f46] text-center space-y-4 shadow-2xl relative overflow-hidden"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16161a] border border-[#27272a] text-xs font-mono text-[#ffffff]">
            <MapPin size={14} className="text-[#ffffff]" />
            <span>HYDERABAD, TELANGANA, INDIA</span>
          </div>

          <h3 className="text-xl font-bold text-[#ffffff]">
            Prefer direct email outreach?
          </h3>

          <p className="text-sm text-[#a1a1aa] max-w-lg mx-auto">
            Reach out directly to discuss full-time engineering roles, technical advisory, or high-throughput agent deployments.
          </p>

          <div className="pt-2">
            <a
              href="mailto:apraneethreddy20891a0502@gmail.com"
              className="btn-primary inline-flex items-center gap-2 text-sm font-semibold px-6 py-3"
            >
              <Mail size={16} />
              <span>apraneethreddy20891a0502@gmail.com</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
