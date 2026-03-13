import { motion } from "framer-motion";
import { ExternalLink, BarChart3, Bot, Zap, Activity } from "lucide-react";

const projects = [
  {
    title: "App Connectivity Dashboard",
    icon: Zap,
    description: "Responsive dashboard using React.js and FastAPI to visualize Excel/CSV data with dynamic filters (State, Region, Substation). Features KPI cards and interactive charts for operational metrics.",
    tech: ["React.js", "FastAPI", "PostgreSQL", "Charts"],
    client: "Adani (via CognitBotz)",
  },
  {
    title: "Landed Tariff Data Visualization",
    icon: BarChart3,
    description: "Analytics dashboard to analyze landed tariff datasets with dependent filters (State → Region → Substation). Built REST APIs to process CSV/Excel data and deliver structured responses.",
    tech: ["React.js", "FastAPI", "Python", "Data Analytics"],
    client: "Adani (via CognitBotz)",
  },
  {
    title: "Meet-Ops – AI Meeting Analytics",
    icon: Bot,
    description: "AI-powered system converting meeting transcripts into summaries and actionable insights. Features PostgreSQL storage for processed data and a React dashboard with graphs and KPI cards.",
    tech: ["React.js", "FastAPI", "AI/ML", "PostgreSQL"],
    client: "Adani (via CognitBotz)",
  },
  {
    title: "NOC Dashboard",
    icon: Activity,
    description: "Data analytics dashboard to process and visualize large operational datasets. Optimized performance with dynamic filtering and selective data loading for handling high-volume data.",
    tech: ["React.js", "FastAPI", "PostgreSQL", "Performance"],
    client: "Adani (via CognitBotz)",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-accent font-heading text-sm font-semibold uppercase tracking-wider mb-2">Projects</p>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4">
            Enterprise <span className="gradient-text">dashboards</span> I've built
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-12">
            These projects were delivered for Adani during my internship at CognitBotz, showcasing full-stack development with React.js, FastAPI, and PostgreSQL.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map(({ title, icon: Icon, description, tech, client }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 sm:p-8 hover-lift group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-primary/5 -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <ExternalLink size={18} className="text-muted-foreground group-hover:text-primary transition-colors mt-2" />
                </div>

                <h3 className="font-heading font-bold text-xl text-foreground mb-2">{title}</h3>
                <p className="text-xs font-medium text-accent mb-3">{client}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{description}</p>

                <div className="flex flex-wrap gap-2">
                  {tech.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
