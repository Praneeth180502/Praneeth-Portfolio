import { motion } from "framer-motion";
import { ExternalLink, BarChart3, Bot, Zap, Activity, Video, GraduationCap, FolderSearch } from "lucide-react";

const projects = [
  {
    title: "AURASELECT - AI Video Interview Evaluator",
    icon: Video,
    description: "The AI Video Interview Evaluator is a full-stack, AI-powered platform designed to automate and enhance the HR screening process. Candidates record responses via their webcam, while an AI pipeline transcribes the audio, semantically evaluates performance against ideal benchmark answers, and produces comprehensive score reports.",
    tech: ["React", "FastAPI", "Groq Whisper", "LLMs", "AI Evaluation"],
    client: "HR Tech Platform",
  },
  {
    title: "OpenViz - Generative AI Analytics Platform",
    icon: BarChart3,
    description: "OpenViz is an intelligent, prompt-driven data analytics platform that turns raw datasets into interactive visual charts through natural language commands. Users can upload data files and generate dynamic visualizations using an AI-assisted interface, making complex data exploration instant, intuitive, and privacy-preserving.",
    tech: ["React 19", "Vega-Lite", "Llama 4", "Groq SDK", "Arquero", "RAG"],
    client: "GenAI Platform",
  },
  {
    title: "SiLens AI - AI-Powered STEM Learning Platform",
    icon: GraduationCap,
    description: "SiLens AI is an intelligent STEM education platform that transforms static learning documents into interactive study experiences. Users can upload complex technical documents or math textbooks, which are processed to extract equations into clean LaTeX format, generating document-grounded Q&A chat, dynamic quizzes, and educational summaries.",
    tech: ["FastAPI", "React", "TypeScript", "Groq LLM", "PaddleOCR", "Pix2Tex", "PostgreSQL"],
    client: "EdTech Platform",
  },
  {
    title: "AI File Explorer - Local AI Indexing & Search Platform",
    icon: FolderSearch,
    description: "AI File Explorer is a privacy-first desktop AI application designed for instant semantic search and natural-language interaction across local files and codebases. Operating locally via a desktop shell, it automatically monitors folders in real time and allows users to query their documents using offline local LLMs or cloud AI APIs.",
    tech: ["FastAPI", "React", "TypeScript", "Electron", "Ollama", "ChromaDB", "PyMuPDF"],
    client: "Desktop Platform",
  },
  {
    title: "App Connectivity Dashboard",
    icon: Activity,
    description: "A responsive operational dashboard built for enterprise data visualization. Allows users to upload and explore operational Excel/CSV datasets with dynamic cascading filters (State, Region, Substation), interactive charts, and real-time KPI metrics.",
    tech: ["React.js", "FastAPI", "PostgreSQL", "Charts"],
    client: "Adani (via CognitBotz)",
  },
  {
    title: "Landed Tariff Data Visualization",
    icon: BarChart3,
    description: "An analytics dashboard designed to process and analyze landed tariff datasets. Enables seamless data exploration using dependent multi-level filters (State → Region → Substation) and custom API data pipelines.",
    tech: ["React.js", "FastAPI", "Python", "Data Analytics"],
    client: "Adani (via CognitBotz)",
  },
  {
    title: "Meet-Ops – AI Meeting Analytics",
    icon: Bot,
    description: "An autonomous meeting automation system that joins Microsoft Teams calls, records transcripts, processes them into structured summaries, and surfaces actionable key insights on a centralized web dashboard.",
    tech: ["React.js", "FastAPI", "AI/ML", "PostgreSQL"],
    client: "Adani (via CognitBotz)",
  },
  {
    title: "NOC Dashboard",
    icon: Activity,
    description: "An enterprise operational analytics dashboard designed to process and visualize large-scale datasets with high rendering performance, dynamic filtering, and hierarchical data organization.",
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
            Featured <span className="gradient-text">Projects</span> & Solutions
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-12">
            A collection of enterprise-grade dashboards and AI-powered platforms I've architected, ranging from data visualization engines to agentic RAG systems.
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

                <h3 className="font-heading font-bold text-xl text-foreground mb-2 break-words">{title}</h3>
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
