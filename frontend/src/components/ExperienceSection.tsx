import { motion } from "framer-motion";
import { Building2, Calendar } from "lucide-react";

const experiences = [
  {
    company: "CognitBotz (Client: Adani)",
    role: "Full Stack Developer Intern",
    period: "Current",
    description: "Building enterprise-grade data analytics dashboards for Adani using React.js, FastAPI, and PostgreSQL. Delivered 4 major projects including NOC Dashboard, App Connectivity, Meet-Ops AI, and Landed Tariff Visualization.",
    tech: ["React.js", "FastAPI", "PostgreSQL", "Python"],
  },
  {
    company: "DRDO – Defense Research & Development Organization",
    role: "Project Intern",
    period: "Nov 2023 – May 2024",
    description: "Contributed to the Live Missile Data Simulation project, handling both front-end and back-end development. Managed server-client communication using React and Python.",
    tech: ["React", "Python", "Data Simulation"],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-accent font-heading text-sm font-semibold uppercase tracking-wider mb-2">Experience</p>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-12">
            Where I've <span className="gradient-text">worked</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="md:pl-16 relative"
              >
                <div className="hidden md:block absolute left-4 top-6 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                <div className="glass-card rounded-2xl p-6 sm:p-8 hover-lift">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Building2 size={18} className="text-primary" />
                        <h3 className="font-heading font-bold text-lg text-foreground break-words">{exp.company}</h3>
                      </div>
                      <p className="text-primary font-medium">{exp.role}</p>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Calendar size={14} />
                      {exp.period}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
