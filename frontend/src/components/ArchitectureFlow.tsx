import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Globe, 
  Zap, 
  Search, 
  Database, 
  Cpu, 
  Bot, 
  MessageSquareText, 
  FileText, 
  Award, 
  Briefcase, 
  GraduationCap, 
  Code,
  ArrowRight,
  Play,
  RotateCcw
} from "lucide-react";

interface Step {
  id: number;
  title: string;
  subtitle: string;
  color: string;
  borderColor: string;
  glowColor: string;
}

const steps: Step[] = [
  { id: 1, title: "1. CLIENT LAYER", subtitle: "React + Vite + SSE Reader", color: "from-pink-500 to-purple-600", borderColor: "border-pink-500", glowColor: "rgba(236,72,153,0.4)" },
  { id: 2, title: "2. FASTAPI GATEWAY", subtitle: "Rate Limiter & Chat Router", color: "from-purple-600 to-indigo-600", borderColor: "border-purple-500", glowColor: "rgba(168,85,247,0.4)" },
  { id: 3, title: "3. HYBRID RAG SEARCH", subtitle: "BM25 + ChromaDB Vector + Reranker", color: "from-cyan-500 to-blue-600", borderColor: "border-cyan-400", glowColor: "rgba(34,211,238,0.4)" },
  { id: 4, title: "4. GROQ LLM LAYER", subtitle: "Llama 3.3 70B Token Generation", color: "from-emerald-400 to-teal-600", borderColor: "border-emerald-400", glowColor: "rgba(52,211,153,0.4)" },
  { id: 5, title: "5. SSE LIVE RESPONSE", subtitle: "Real-time Token Stream to UI", color: "from-yellow-400 to-amber-500", borderColor: "border-yellow-400", glowColor: "rgba(250,204,21,0.4)" },
];

export const ArchitectureFlow: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev % 5) + 1);
    }, 2200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-full bg-slate-950 text-slate-100 rounded-2xl p-6 md:p-8 border border-purple-900/50 shadow-2xl shadow-purple-950/40 relative overflow-hidden font-sans">
      {/* Background Ambient Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 relative z-10 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-2">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
            Live Data Flow Architecture
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-400">
            Praneeth AI Portfolio — Hybrid RAG Pipeline
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium transition duration-200"
          >
            {isPlaying ? <span className="w-2 h-2 rounded-full bg-emerald-400" /> : <Play className="w-3.5 h-3.5 text-slate-300" />}
            {isPlaying ? "Pause Flow" : "Play Flow"}
          </button>
          <button
            onClick={() => setActiveStep(1)}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 transition duration-200"
            title="Reset Flow to Step 1"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Step Indicator Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-8 relative z-10">
        {steps.map((step) => {
          const isActive = activeStep === step.id;
          return (
            <button
              key={step.id}
              onClick={() => {
                setActiveStep(step.id);
                setIsPlaying(false);
              }}
              className={`relative text-left p-3 rounded-xl border transition-all duration-300 ${
                isActive
                  ? `${step.borderColor} bg-slate-900/90 shadow-lg`
                  : "border-slate-800 bg-slate-950/60 hover:border-slate-700 text-slate-400"
              }`}
              style={{
                boxShadow: isActive ? `0 0 20px ${step.glowColor}` : "none",
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-70">Stage {step.id}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeDot"
                    className="w-2 h-2 rounded-full bg-cyan-400 shadow-glow"
                  />
                )}
              </div>
              <p className={`text-xs font-bold truncate ${isActive ? "text-slate-100" : "text-slate-400"}`}>
                {step.title}
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Architecture Visual Diagram Box Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 relative z-10 mb-8">
        
        {/* Stage 1: Client Layer */}
        <div
          className={`p-4 rounded-xl border transition-all duration-500 bg-slate-900/60 backdrop-blur-md flex flex-col justify-between ${
            activeStep === 1 ? "border-pink-500 shadow-lg shadow-pink-500/20 scale-[1.02]" : "border-slate-800 opacity-80"
          }`}
        >
          <div>
            <div className="flex items-center gap-2 text-pink-400 font-bold text-xs uppercase tracking-wider mb-3">
              <User className="w-4 h-4" /> 1. Client Layer
            </div>
            <div className="bg-slate-950/80 rounded-lg p-3 border border-pink-900/30 mb-3">
              <div className="flex items-center gap-2 text-slate-300 text-xs font-mono mb-2">
                <Globe className="w-3.5 h-3.5 text-pink-400" /> React 18 + Vite
              </div>
              <div className="text-[11px] text-slate-400 leading-relaxed">
                Captures user queries and streams incoming SSE tokens.
              </div>
            </div>
            <div className="bg-pink-950/30 rounded-lg p-2.5 border border-pink-500/30 text-[11px] font-mono text-pink-200">
              <span className="text-pink-400 font-bold">Payload:</span>
              <div className="truncate text-slate-300 mt-0.5">{"{ session_id, message }"}</div>
            </div>
          </div>
          {activeStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 pt-2 border-t border-pink-500/30 text-[10px] font-semibold text-pink-300 flex items-center justify-between"
            >
              <span>Transmitting Request</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500" />
              </span>
            </motion.div>
          )}
        </div>

        {/* Stage 2: FastAPI Gateway */}
        <div
          className={`p-4 rounded-xl border transition-all duration-500 bg-slate-900/60 backdrop-blur-md flex flex-col justify-between ${
            activeStep === 2 ? "border-purple-500 shadow-lg shadow-purple-500/20 scale-[1.02]" : "border-slate-800 opacity-80"
          }`}
        >
          <div>
            <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider mb-3">
              <Zap className="w-4 h-4" /> 2. FastAPI Gateway
            </div>
            <div className="bg-slate-950/80 rounded-lg p-3 border border-purple-900/30 mb-3 space-y-2">
              <div className="text-[11px] font-mono text-purple-300">
                POST /api/v1/chat
              </div>
              <div className="text-[11px] text-slate-400">
                • IP Rate Limiting (60 req/min)
              </div>
              <div className="text-[11px] text-slate-400">
                • Request Context Tracing
              </div>
            </div>
            <div className="bg-purple-950/30 rounded-lg p-2 border border-purple-500/30 text-[11px] font-mono text-purple-200">
              <span className="text-purple-400 font-bold">Handler:</span> ChatService
            </div>
          </div>
          {activeStep === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 pt-2 border-t border-purple-500/30 text-[10px] font-semibold text-purple-300 flex items-center justify-between"
            >
              <span>Routing to RAG Engine</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
              </span>
            </motion.div>
          )}
        </div>

        {/* Stage 3: Hybrid RAG Engine */}
        <div
          className={`p-4 rounded-xl border transition-all duration-500 bg-slate-900/60 backdrop-blur-md flex flex-col justify-between ${
            activeStep === 3 ? "border-cyan-400 shadow-lg shadow-cyan-500/20 scale-[1.02]" : "border-slate-800 opacity-80"
          }`}
        >
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-3">
              <Search className="w-4 h-4" /> 3. Hybrid RAG Search
            </div>
            <div className="bg-slate-950/80 rounded-lg p-2.5 border border-cyan-900/30 space-y-1.5 mb-3">
              <div className="text-[10px] font-mono text-cyan-300 flex items-center justify-between">
                <span>BM25 Sparse</span> <span className="text-slate-500">Weight 0.3</span>
              </div>
              <div className="text-[10px] font-mono text-cyan-300 flex items-center justify-between">
                <span>ChromaDB Vector</span> <span className="text-slate-500">Weight 0.7</span>
              </div>
              <div className="text-[10px] font-mono text-emerald-400 pt-1 border-t border-slate-800">
                Cross-Encoder Reranker
              </div>
            </div>
            <div className="bg-cyan-950/30 rounded-lg p-2 border border-cyan-500/30 text-[11px] font-mono text-cyan-200">
              <span className="text-cyan-400 font-bold">Result:</span> Top Reranked Chunks
            </div>
          </div>
          {activeStep === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 pt-2 border-t border-cyan-500/30 text-[10px] font-semibold text-cyan-300 flex items-center justify-between"
            >
              <span>Filtering Context Chunks</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
            </motion.div>
          )}
        </div>

        {/* Stage 4: Groq LLM Layer */}
        <div
          className={`p-4 rounded-xl border transition-all duration-500 bg-slate-900/60 backdrop-blur-md flex flex-col justify-between ${
            activeStep === 4 ? "border-emerald-400 shadow-lg shadow-emerald-500/20 scale-[1.02]" : "border-slate-800 opacity-80"
          }`}
        >
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-3">
              <Cpu className="w-4 h-4" /> 4. Groq LLM Layer
            </div>
            <div className="bg-slate-950/80 rounded-lg p-3 border border-emerald-900/30 mb-3 space-y-2">
              <div className="text-[11px] font-bold text-emerald-300">
                Llama 3.3 70B Versatile
              </div>
              <div className="text-[11px] text-slate-400">
                Grounded System Prompt Injection + Low-Latency Stream
              </div>
            </div>
            <div className="bg-emerald-950/30 rounded-lg p-2 border border-emerald-500/30 text-[11px] font-mono text-emerald-200">
              <span className="text-emerald-400 font-bold">API:</span> stream=True
            </div>
          </div>
          {activeStep === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 pt-2 border-t border-emerald-500/30 text-[10px] font-semibold text-emerald-300 flex items-center justify-between"
            >
              <span>Generating Tokens</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
            </motion.div>
          )}
        </div>

        {/* Stage 5: SSE Live Response Stream */}
        <div
          className={`p-4 rounded-xl border transition-all duration-500 bg-slate-900/60 backdrop-blur-md flex flex-col justify-between ${
            activeStep === 5 ? "border-yellow-400 shadow-lg shadow-yellow-500/20 scale-[1.02]" : "border-slate-800 opacity-80"
          }`}
        >
          <div>
            <div className="flex items-center gap-2 text-yellow-400 font-bold text-xs uppercase tracking-wider mb-3">
              <MessageSquareText className="w-4 h-4" /> 5. SSE Live Stream
            </div>
            <div className="bg-slate-950/80 rounded-lg p-3 border border-yellow-900/30 mb-3 space-y-1.5 font-mono text-[10px]">
              <div className="text-yellow-300">data: {"{\"type\": \"token\"}"}</div>
              <div className="text-amber-400">data: {"{\"type\": \"sources\"}"}</div>
              <div className="text-slate-400">data: {"{\"type\": \"done\"}"}</div>
            </div>
            <div className="bg-yellow-950/30 rounded-lg p-2 border border-yellow-500/30 text-[11px] font-mono text-yellow-200">
              <span className="text-yellow-400 font-bold">UI:</span> Typewriter Effect
            </div>
          </div>
          {activeStep === 5 && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 pt-2 border-t border-yellow-500/30 text-[10px] font-semibold text-yellow-300 flex items-center justify-between"
            >
              <span>Streaming to UI</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400" />
              </span>
            </motion.div>
          )}
        </div>

      </div>

      {/* Ingestion Source Sources Bar */}
      <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 relative z-10">
        <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-3 flex items-center gap-2">
          <Database className="w-3.5 h-3.5 text-cyan-400" /> Knowledge Base Ingestion Sources (Vectorized into ChromaDB & BM25)
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-300">
            <FileText className="w-3.5 h-3.5 text-pink-400" /> Resume & CV
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-300">
            <Code className="w-3.5 h-3.5 text-purple-400" /> Projects (OpenViz)
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-300">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" /> Experience (DRDO)
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-300">
            <Briefcase className="w-3.5 h-3.5 text-indigo-400" /> Experience (Adani)
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-300">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-400" /> Tech Skills
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-300">
            <Award className="w-3.5 h-3.5 text-yellow-400" /> Certifications
          </div>
        </div>
      </div>
    </div>
  );
};
