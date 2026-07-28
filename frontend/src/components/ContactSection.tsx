import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Briefcase } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-accent font-heading text-sm font-semibold uppercase tracking-wider mb-2">Contact</p>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-12">
            Let's <span className="gradient-text">connect</span>
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-6">
          <p className="text-muted-foreground leading-relaxed text-lg">
            I'm open to full-time opportunities, freelance projects, and collaboration. Feel free to reach out!
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: Mail, label: "apraneethreddy20891a0502@gmail.com", href: "mailto:apraneethreddy20891a0502@gmail.com" },
              { icon: Phone, label: "+91 8179141580", href: "tel:+918179141580" },
              { icon: MapPin, label: "Hyderabad, India", href: "#" },
              { icon: Linkedin, label: "LinkedIn Profile", href: "https://www.linkedin.com/in/praneeth-reddy-ankey" },
              { icon: Briefcase, label: "Naukri Profile", href: "https://www.naukri.com/mnjuser/profile?id=&altresid" },
            ].map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 glass-card rounded-xl p-4 hover-lift">
                <div className="p-2.5 rounded-lg bg-primary/10">
                  <Icon size={20} className="text-primary" />
                </div>
                <span className="text-sm text-foreground break-all">{label}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
