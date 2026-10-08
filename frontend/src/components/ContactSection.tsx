import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Send } from "lucide-react";

/* ── Concentric signal rings per design.md §6 ── */
function ConcentricSignalRings() {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-15 overflow-hidden">
      <svg className="w-[600px] h-[600px]" viewBox="0 0 600 600" fill="none">
        <circle cx="300" cy="300" r="100" stroke="#52525b" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="300" cy="300" r="180" stroke="#3f3f46" strokeWidth="1" />
        <circle cx="300" cy="300" r="260" stroke="#27272a" strokeWidth="1" strokeDasharray="6 6" />
        <circle cx="300" cy="300" r="340" stroke="#27272a" strokeWidth="1" />
      </svg>
    </div>
  );
}

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
    value: "+91 80963 80608",
    href: "tel:+918096380608",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/praneeth-reddy-ankey",
    href: "https://www.linkedin.com/in/praneeth-reddy-ankey",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Hyderabad, Telangana, India",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-24 bg-[#000000] text-[#e4e4e7] overflow-hidden">
      <ConcentricSignalRings />

      <div className="container relative z-10 mx-auto px-6">
        
        {/* Section Header with design.md §9 Headline */}
        <div className="space-y-3 mb-16 text-center max-w-3xl mx-auto">
          <span className="eyebrow text-[#a1a1aa]">CONTACT</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#ffffff] tracking-tight">
            Have a complex problem? Let's build the intelligence to solve it.
          </h2>
          <p className="text-[#a1a1aa] text-base font-normal pt-2">
            Open for AI engineering projects, multi-agent system deployment, and enterprise RAG architecture consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details List (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-5 space-y-4"
          >
            {contactItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="card-silver flex items-center gap-4 p-4 hover:border-[#3f3f46]"
                >
                  <div className="p-3 rounded-lg bg-[#16161a] border border-[#27272a] text-[#ffffff]">
                    <Icon size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[11px] font-mono text-[#a1a1aa] uppercase tracking-wider">
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-[#ffffff] hover:underline truncate block"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-sm font-medium text-[#ffffff] truncate">
                        {item.value}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Quick Direct Message Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 p-6 sm:p-8 rounded-xl bg-[#0c0c0e] border border-[#27272a]"
          >
            <h3 className="text-xl font-bold text-[#ffffff] mb-6">
              Send a message directly
            </h3>

            <form
              action="https://formspree.io/f/xbjnqpyz"
              method="POST"
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#a1a1aa] uppercase mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 rounded-lg bg-[#000000] border border-[#27272a] focus:border-[#ffffff] outline-none text-sm text-[#ffffff] placeholder:text-[#a1a1aa] font-sans transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#a1a1aa] uppercase mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="name@company.com"
                    className="w-full px-4 py-2.5 rounded-lg bg-[#000000] border border-[#27272a] focus:border-[#ffffff] outline-none text-sm text-[#ffffff] placeholder:text-[#a1a1aa] font-sans transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#a1a1aa] uppercase mb-1.5">
                  Subject / Project Scope
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="e.g. Multi-Agent RAG System"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#000000] border border-[#27272a] focus:border-[#ffffff] outline-none text-sm text-[#ffffff] placeholder:text-[#a1a1aa] font-sans transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#a1a1aa] uppercase mb-1.5">
                  Message Details
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="Describe your AI architecture requirements..."
                  className="w-full px-4 py-2.5 rounded-lg bg-[#000000] border border-[#27272a] focus:border-[#ffffff] outline-none text-sm text-[#ffffff] placeholder:text-[#a1a1aa] font-sans transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary justify-center py-3 text-sm font-semibold"
              >
                <Send size={16} />
                <span>Send Message</span>
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
