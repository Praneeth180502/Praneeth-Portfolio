import { motion } from "framer-motion";
import { Code, Database, Layout, Server, Terminal, Globe } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    icon: Layout,
    skills: ["React.js", "HTML5", "CSS3", "JavaScript", "TypeScript"],
    color: "text-primary",
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["FastAPI", "Python", "REST APIs", "Node.js"],
    color: "text-accent",
  },
  {
    title: "Database",
    icon: Database,
    skills: ["PostgreSQL", "MySQL", "SQL"],
    color: "text-primary",
  },
  {
    title: "Languages",
    icon: Code,
    skills: ["Python", "C", "C++", "Java", "Advanced Java"],
    color: "text-accent",
  },
  {
    title: "Tools & DevOps",
    icon: Terminal,
    skills: ["Git", "VS Code", "Postman", "Docker"],
    color: "text-primary",
  },
  {
    title: "Web Technologies",
    icon: Globe,
    skills: ["REST APIs", "JSON", "Responsive Design", "Data Visualization"],
    color: "text-accent",
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-accent font-heading text-sm font-semibold uppercase tracking-wider mb-2">Skills</p>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-12">
            My <span className="gradient-text">tech stack</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map(({ title, icon: Icon, skills, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card rounded-2xl p-6 hover-lift group"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-xl bg-secondary group-hover:bg-primary/10 transition-colors">
                  <Icon size={22} className={color} />
                </div>
                <h3 className="font-heading font-bold text-foreground">{title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
