import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import praneethPhoto from "@/assets/praneeth-photo.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/10 blur-[100px] animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/10 blur-[120px] animate-float" style={{ animationDelay: "1.5s" }} />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-accent font-medium mb-4 font-heading tracking-wider text-sm uppercase">Full Stack Developer</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading leading-tight mb-6" style={{ color: "hsl(0, 0%, 95%)" }}>
              Hi, I'm{" "}
              <span className="gradient-text">Ankey Praneeth Reddy</span>
            </h1>
            <p className="text-lg leading-relaxed max-w-lg mb-8" style={{ color: "hsl(220, 15%, 65%)" }}>
              Aspiring CS graduate passionate about building impactful products with React, FastAPI, and PostgreSQL. Currently interning at CognitBotz, delivering enterprise dashboards for Adani.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a href="#contact" className="gradient-btn px-8 py-3 rounded-xl font-semibold text-sm">
                Get In Touch
              </a>
              <a href="#projects" className="px-8 py-3 rounded-xl font-semibold text-sm border border-primary/30 hover:border-primary/60 transition-colors" style={{ color: "hsl(220, 15%, 75%)" }}>
                View Projects
              </a>
            </div>

            <div className="flex gap-4">
              {[
                { icon: Github, href: "https://github.com" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/praneeth-reddy-ankey" },
                { icon: Mail, href: "mailto:apraneethreddy20891a0502@gmail.com" },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-primary/20 hover:border-primary/50 hover:bg-primary/10 transition-all"
                  style={{ color: "hsl(220, 15%, 70%)" }}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-primary/30 animate-pulse-glow">
                <img src={praneethPhoto} alt="Ankey Praneeth Reddy" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 glass-card px-4 py-2 rounded-xl">
                <p className="text-sm font-heading font-semibold text-foreground">🚀 Open to Work</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" style={{ color: "hsl(220, 15%, 50%)" }}>
        <ArrowDown size={24} />
      </a>
    </section>
  );
};

export default HeroSection;
