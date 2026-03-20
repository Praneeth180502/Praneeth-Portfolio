import { motion } from "framer-motion";
import { GraduationCap, MapPin, Briefcase, Award } from "lucide-react";

const stats = [
  { icon: Briefcase, label: "Internships", value: "2+" },
  { icon: GraduationCap, label: "CGPA", value: "7.58" },
  { icon: Award, label: "Certifications", value: "3" },
  { icon: MapPin, label: "Location", value: "Hyderabad" },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-accent font-heading text-sm font-semibold uppercase tracking-wider mb-2">About Me</p>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-8">
            Passionate about building <span className="gradient-text">impactful solutions</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                I'm a B.Tech Computer Science graduate from Vignan Institute of Technology and Science, Hyderabad. My passion lies in creating full-stack web applications that solve real-world problems.
              </p>
              <p>
                I've had the privilege of interning at <strong className="text-foreground">DRDO</strong> (Defense Research & Development Organization), where I contributed to the Live Missile Data Simulation project, and currently at <strong className="text-foreground">CognitBotz</strong>, where I build enterprise-grade dashboards for Adani using React.js, FastAPI, and PostgreSQL.
              </p>
              <p>
                I'm driven by the desire to learn emerging technologies and create products that redefine industry standards.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stats.map(({ icon: Icon, label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-6 text-center hover-lift"
                >
                  <Icon className="mx-auto mb-3 text-primary" size={28} />
                  <p className="text-2xl font-bold font-heading text-foreground">{value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
