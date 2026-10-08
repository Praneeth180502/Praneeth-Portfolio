import { motion } from "framer-motion";

/* ── Skill groups per design.md §7 ── */
const skillGroups = [
  {
    label: "AI & Machine Learning",
    skills: [
      "Generative AI",
      "LLMs & Prompt Engineering",
      "Agent Frameworks (LangChain / LlamaIndex / CrewAI)",
      "RAG Architecture & Hybrid Search",
      "Multi-Agent Orchestration",
      "SentenceTransformers & Embeddings",
    ],
  },
  {
    label: "Vector & Databases",
    skills: [
      "FAISS",
      "Qdrant",
      "ChromaDB",
      "PostgreSQL",
      "Vector Similarity Indexing",
      "SQL Optimization",
    ],
  },
  {
    label: "Backend & Systems",
    skills: [
      "Python (FastAPI / Flask)",
      "C++",
      "Node.js",
      "RESTful API Design",
      "Async IO & Concurrency",
      "Microservices Architecture",
    ],
  },
  {
    label: "Automation & Browser",
    skills: [
      "Playwright (Python / JS)",
      "Persistent Browser Sessions",
      "Anti-Detection Scrapers",
      "Telegram Bot API",
      "Task Queue Pipelines",
    ],
  },
  {
    label: "Frontend & UI",
    skills: [
      "React.js & Next.js",
      "TypeScript & JavaScript",
      "TailwindCSS & CSS Systems",
      "Three.js & Canvas WebGL",
      "Framer Motion",
    ],
  },
  {
    label: "DevOps & Tools",
    skills: [
      "Git & GitHub Actions",
      "Docker & Containers",
      "Vercel & Cloud Deployment",
      "Postman",
      "Linux / Bash",
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 bg-[#000000] text-[#e4e4e7]">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="space-y-3 mb-16">
          <span className="eyebrow text-[#a1a1aa]">SKILLS</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#ffffff] tracking-tight">
            Technical Stack & Engineering Expertise.
          </h2>
          <p className="text-[#a1a1aa] text-base max-w-2xl font-normal">
            Clustered by domain strength, ordered by production experience.
          </p>
        </div>

        {/* Skill Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillGroups.map((group, groupIdx) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: groupIdx * 0.08 }}
              className="p-6 rounded-xl bg-[#0c0c0e] border border-[#27272a] hover:border-[#3f3f46] transition-all"
            >
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#ffffff] font-bold mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffffff]" />
                {group.label}
              </h3>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-chip"
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
}
