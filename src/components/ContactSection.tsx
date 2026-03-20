import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! I'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-accent font-heading text-sm font-semibold uppercase tracking-wider mb-2">Contact</p>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-12">
            Let's <span className="gradient-text">connect</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              I'm open to full-time opportunities, freelance projects, and collaboration. Feel free to reach out!
            </p>
            {[
              { icon: Mail, label: "apraneethreddy20891a0502@gmail.com", href: "mailto:apraneethreddy20891a0502@gmail.com" },
              { icon: Phone, label: "+91 8179141580", href: "tel:+918179141580" },
              { icon: MapPin, label: "Hyderabad, India", href: "#" },
              { icon: Linkedin, label: "LinkedIn Profile", href: "https://www.linkedin.com/in/praneeth-reddy-ankey" },
            ].map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 glass-card rounded-xl p-4 hover-lift">
                <div className="p-2.5 rounded-lg bg-primary/10">
                  <Icon size={20} className="text-primary" />
                </div>
                <span className="text-sm text-foreground break-all">{label}</span>
              </a>
            ))}
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6 sm:p-8 space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm resize-none"
                placeholder="Your message..."
              />
            </div>
            <button type="submit" className="gradient-btn w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2">
              <Send size={16} /> Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
