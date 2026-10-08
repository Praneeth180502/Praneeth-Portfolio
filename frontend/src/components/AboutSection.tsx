import { motion } from "framer-motion";
import { GraduationCap, MapPin, Briefcase, Award } from "lucide-react";

const stats = [
  { icon: Briefcase, label: "Internships", value: "2+", desc: "DRDO & CognitBotz" },
  { icon: Award, label: "Current Role", value: "AI Eng", desc: "Digimaxx AI Solutions" },
  { icon: GraduationCap, label: "Education", value: "B.Tech", desc: "Vignan Institute (VITS)" },
  { icon: MapPin, label: "Location", value: "Hyderabad", desc: "Telangana, India" },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 bg-[#000000] text-[#e4e4e7] overflow-hidden">
      
      {/* Background Dot Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container relative z-10 mx-auto px-6">
        
        {/* Section Header */}
        <div className="space-y-3 mb-16">
          <span className="eyebrow text-[#a1a1aa]">ABOUT</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#ffffff] tracking-tight">
            Engineering Background
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Bio Copy per design.md §9 (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6 text-base leading-relaxed text-[#e4e4e7]"
          >
            <p className="text-lg text-[#ffffff] font-medium leading-relaxed">
              B.Tech Computer Science graduate from Vignan Institute of Technology and Science (VITS), Hyderabad, currently working as an Associate AI Engineer at Digimaxx AI Solutions.
            </p>

            <p>
              My journey started with defense software engineering at DRDO (Defense Research & Development Organisation), where I engineered real-time telemetry simulation and data visualization tools for live missile testing datasets.
            </p>

            <p>
              Following DRDO, I interned at CognitBotz, building high-throughput enterprise operational dashboards for Adani Group using React.js, TypeScript, FastAPI, and PostgreSQL.
            </p>

            <p>
              Today at Digimaxx, I focus on building the orchestration layer behind enterprise Generative AI — combining multi-agent task swarms, hybrid vector RAG pipelines, and deterministic API execution layers.
            </p>

            <div className="pt-4 border-t border-[#27272a] flex flex-wrap gap-4 text-xs font-mono text-[#a1a1aa]">
              <div><strong className="text-[#ffffff]">Degree:</strong> B.Tech CSE (2020–2024)</div>
              <div><strong className="text-[#ffffff]">Status:</strong> Full-Time AI Engineer</div>
              <div><strong className="text-[#ffffff]">Focus:</strong> Autonomous AI Systems</div>
            </div>
          </motion.div>

          {/* Quick Stats Grid (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="card-silver p-5 flex flex-col justify-between min-h-[140px]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-[#a1a1aa] uppercase tracking-wider">
                      {stat.label}
                    </span>
                    <Icon size={18} className="text-[#ffffff]" />
                  </div>

                  <div>
                    <div className="text-2xl font-bold font-mono text-[#ffffff] mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-[#a1a1aa] font-sans">
                      {stat.desc}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
