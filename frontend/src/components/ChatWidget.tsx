import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, RefreshCw, ChevronRight, User, FileText } from "lucide-react";
import { streamChatMessage, ChatSource } from "@/lib/api";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  sources?: ChatSource[];
  isStreaming?: boolean;
}

const SUGGESTED_QUESTIONS = [
  "What projects has Praneeth built?",
  "Tell me about SiLens AI and OpenViz",
  "What is Praneeth's experience at DRDO?",
  "What technologies and AI tools does he use?",
];

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "assistant",
      text: "Hi there! I'm Bittu 🤖, Praneeth's AI Assistant. Ask me anything about his work experience, GenAI projects, tech stack, or background!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [sessionId] = useState(() => `session-${Math.random().toString(36).substring(2, 10)}`);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isGenerating) return;

    const userMsgId = `user-${Date.now()}`;
    const assistantMsgId = `assistant-${Date.now()}`;

    const userMessage: Message = {
      id: userMsgId,
      sender: "user",
      text: query,
    };

    const initialAssistantMessage: Message = {
      id: assistantMsgId,
      sender: "assistant",
      text: "",
      isStreaming: true,
    };

    setMessages((prev) => [...prev, userMessage, initialAssistantMessage]);
    if (!textToSend) setInput("");
    setIsGenerating(true);

    await streamChatMessage(
      { session_id: sessionId, message: query },
      {
        onToken: (token) => {
          setMessages((prev) =>
            prev.map((msg) => (msg.id === assistantMsgId ? { ...msg, text: msg.text + token } : msg))
          );
        },
        onSources: (sources) => {
          setMessages((prev) =>
            prev.map((msg) => (msg.id === assistantMsgId ? { ...msg, sources } : msg))
          );
        },
        onError: (err) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMsgId
                ? {
                  ...msg,
                  text: msg.text || "Sorry, I couldn't process your request right now. Please email Praneeth directly at apraneethreddy20891a0502@gmail.com!",
                  isStreaming: false,
                }
                : msg
            )
          );
        },
        onDone: () => {
          setMessages((prev) =>
            prev.map((msg) => (msg.id === assistantMsgId ? { ...msg, isStreaming: false } : msg))
          );
          setIsGenerating(false);
        },
      }
    );
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        sender: "assistant",
        text: "Hi there! I'm Bittu 🤖, Praneeth's AI Assistant. Ask me anything about his work experience, GenAI projects, tech stack, or background!",
      },
    ]);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-xl hover:shadow-primary/25 transition-all flex items-center justify-center gap-2 group"
        aria-label="Open Bittu AI Assistant"
      >
        <Bot size={24} className="group-hover:rotate-12 transition-transform" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-sm font-semibold pr-1">
          Ask Bittu AI
        </span>
        <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-background animate-pulse" />
      </motion.button>

      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-28 top-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[calc(100vh-9rem)] flex flex-col rounded-2xl border border-border shadow-2xl overflow-hidden bg-background"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-secondary/50 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-foreground flex items-center gap-1.5">
                    Bittu AI
                    <Sparkles size={14} className="text-primary animate-pulse" />
                  </h3>
                  <p className="text-xs text-muted-foreground">Praneeth's AI Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  title="Clear chat"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <RefreshCw size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Message Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot size={16} />
                    </div>
                  )}

                  <div className={`max-w-[82%] space-y-2`}>
                    <div
                      className={`p-3.5 rounded-2xl leading-relaxed ${msg.sender === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-none font-medium"
                          : "bg-secondary text-secondary-foreground rounded-tl-none border border-border/50"
                        }`}
                    >
                      {msg.text || (msg.isStreaming ? "Thinking..." : "")}
                      {msg.isStreaming && (
                        <span className="inline-block w-2 h-4 ml-1 bg-primary animate-pulse align-middle" />
                      )}
                    </div>
                  </div>

                  {msg.sender === "user" && (
                    <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center flex-shrink-0 mt-1">
                      <User size={16} />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompt Chips */}
            <div className="px-4 py-2 border-t border-border/40 bg-secondary/20">
              <p className="text-[11px] text-muted-foreground font-medium mb-1.5">Suggested questions:</p>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    disabled={isGenerating}
                    onClick={() => handleSend(q)}
                    className="text-xs px-2.5 py-1 rounded-full bg-secondary border border-border hover:border-primary/50 text-foreground transition-all flex items-center gap-1 hover:bg-primary/10 disabled:opacity-50"
                  >
                    <span>{q}</span>
                    <ChevronRight size={12} className="text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-t border-border bg-secondary/30 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Bittu about projects, skills, or DRDO..."
                disabled={isGenerating}
                className="flex-1 px-4 py-2.5 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-foreground placeholder:text-muted-foreground transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isGenerating}
                className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
