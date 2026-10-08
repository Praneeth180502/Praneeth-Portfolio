import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, RefreshCw, User } from "lucide-react";
import { streamChatMessage, ChatSource } from "@/lib/api";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  sources?: ChatSource[];
  isStreaming?: boolean;
}

const renderMessageText = (text: string) => {
  if (!text) return null;

  const blocks = text.split("\n\n").map(b => b.trim()).filter(Boolean);

  return (
    <div className="space-y-3 text-left">
      {blocks.map((block, blockIdx) => {
        const lines = block.split("\n");
        const renderedElements: React.ReactNode[] = [];
        let currentListItems: React.ReactNode[] = [];

        const flushList = (keyPrefix: number) => {
          if (currentListItems.length > 0) {
            renderedElements.push(
              <ul key={`list-${keyPrefix}`} className="list-disc pl-5 my-1.5 space-y-1">
                {currentListItems}
              </ul>
            );
            currentListItems = [];
          }
        };

        const formatInline = (str: string) => {
          const parts = str.split(/\*\*([^*]+)\*\*/g);
          return parts.map((part, i) => {
            if (i % 2 === 1) {
              return <strong key={i} className="font-semibold text-[#ffffff]">{part}</strong>;
            }
            return part;
          });
        };

        lines.forEach((line, lineIdx) => {
          const trimmed = line.trim();
          if (trimmed === "") return;

          const bulletMatch = line.match(/^(\s*)[*•-]\s+(.*)$/);
          const numberMatch = line.match(/^(\s*)\d+\.\s+(.*)$/);

          if (bulletMatch) {
            const contentText = bulletMatch[2];
            currentListItems.push(
              <li key={`li-${lineIdx}`} className="leading-relaxed">
                {formatInline(contentText)}
              </li>
            );
          } else if (numberMatch) {
            flushList(lineIdx);
            const contentText = numberMatch[2];
            renderedElements.push(
              <div key={`num-${lineIdx}`} className="flex gap-2 my-1 pl-1 leading-relaxed">
                <span className="font-semibold text-[#ffffff] font-mono">{line.match(/^\s*(\d+\.)/)?.[1]}</span>
                <span className="flex-1">{formatInline(contentText)}</span>
              </div>
            );
          } else {
            flushList(lineIdx);
            renderedElements.push(
              <p key={`p-${lineIdx}`} className="leading-relaxed my-1">
                {formatInline(line)}
              </p>
            );
          }
        });

        flushList(lines.length);

        return (
          <div key={`block-${blockIdx}`} className="space-y-1.5">
            {renderedElements}
          </div>
        );
      })}
    </div>
  );
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "assistant",
      text: "Hi there! I'm Praneeth's AI Assistant. Ask me anything about his work, agent architectures, RAG pipelines, or experience at Digimaxx & DRDO!",
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
        onError: () => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMsgId
                ? {
                    ...msg,
                    text: msg.text || "I couldn't reach the backend server right now. You can email Praneeth directly at apraneethreddy20891a0502@gmail.com!",
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
        text: "Hi there! I'm Praneeth's AI Assistant. Ask me anything about his work, agent architectures, RAG pipelines, or experience at Digimaxx & DRDO!",
      },
    ]);
  };

  return (
    <>
      {/* Greeting Bubble per design.md §7 ("Ask about my work") */}
      <AnimatePresence>
        {!isOpen && showGreeting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ delay: 1, duration: 0.3 }}
            className="fixed bottom-20 right-6 z-50 flex items-center gap-2.5 max-w-[calc(100vw-3rem)] sm:max-w-[280px] bg-[#0c0c0e]/95 backdrop-blur-md border border-[#27272a] shadow-xl p-3 rounded-xl text-xs text-[#e4e4e7] cursor-pointer hover:bg-[#16161a] transition-colors group/bubble"
            onClick={() => setIsOpen(true)}
          >
            <div className="flex-1 pr-1 leading-relaxed select-none">
              <span className="font-mono text-[#ffffff] font-semibold">Assistant: </span>
              Ask about my work & RAG projects!
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowGreeting(false);
              }}
              className="p-1 rounded text-[#a1a1aa] hover:text-[#ffffff] hover:bg-[#16161a] transition-colors self-start -mt-0.5 -mr-1"
              title="Dismiss"
            >
              <X size={12} />
            </button>
            {/* Downward pointing tail */}
            <div className="absolute right-6 -bottom-1.5 w-2.5 h-2.5 rotate-45 bg-[#0c0c0e] border-r border-b border-[#27272a] group-hover/bubble:bg-[#16161a] transition-colors" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Assistant Button per design.md §7 */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-full bg-[#ffffff] text-[#000000] font-semibold text-xs tracking-wide shadow-xl hover:bg-[#e4e4e7] transition-all flex items-center gap-2 group border border-[#ffffff]/30"
        aria-label="Ask about my work"
      >
        <Bot size={18} className="text-[#000000] group-hover:rotate-12 transition-transform" />
        <span className="font-mono font-bold">Ask about my work</span>
        <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
      </motion.button>

      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 top-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[calc(100vh-8rem)] flex flex-col rounded-xl border border-[#27272a] shadow-2xl overflow-hidden bg-[#000000]"
          >
            {/* Header */}
            <div className="px-4 py-3.5 bg-[#0c0c0e] border-b border-[#27272a] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#ffffff] text-[#000000]">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-sm text-[#ffffff] flex items-center gap-1.5">
                    Portfolio Assistant
                    <Sparkles size={13} className="text-[#a1a1aa]" />
                  </h3>
                  <p className="text-[11px] font-mono text-[#a1a1aa]">Powered by RAG & LangChain</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  title="Clear chat"
                  className="p-1.5 rounded-lg text-[#a1a1aa] hover:text-[#ffffff] hover:bg-[#16161a] transition-colors"
                >
                  <RefreshCw size={14} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  className="p-1.5 rounded-lg text-[#a1a1aa] hover:text-[#ffffff] hover:bg-[#16161a] transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Message Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "assistant" && (
                    <div className="w-7 h-7 rounded-lg bg-[#16161a] text-[#ffffff] flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#27272a]">
                      <Bot size={14} />
                    </div>
                  )}

                  <div className="max-w-[84%] space-y-1.5">
                    <div
                      className={`p-3 rounded-xl leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-[#ffffff] text-[#000000] font-semibold"
                          : "bg-[#0c0c0e] text-[#e4e4e7] border border-[#27272a]"
                      }`}
                    >
                      {msg.sender === "user" ? (
                        msg.text
                      ) : msg.text ? (
                        renderMessageText(msg.text)
                      ) : (
                        msg.isStreaming ? "Retrieving contextual answer..." : ""
                      )}
                      {msg.isStreaming && (
                        <span className="inline-block w-1.5 h-3 ml-1 bg-[#ffffff] animate-pulse align-middle" />
                      )}
                    </div>
                  </div>

                  {msg.sender === "user" && (
                    <div className="w-7 h-7 rounded-lg bg-[#16161a] text-[#ffffff] flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#27272a]">
                      <User size={14} />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-t border-[#27272a] bg-[#0c0c0e] flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about NaukriBot, DRDO, or AI Agents..."
                disabled={isGenerating}
                className="flex-1 px-3.5 py-2 rounded-lg bg-[#000000] border border-[#27272a] focus:border-[#ffffff] outline-none text-xs text-[#ffffff] placeholder:text-[#a1a1aa] font-sans transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isGenerating}
                className="p-2 rounded-lg bg-[#ffffff] text-[#000000] hover:bg-[#e4e4e7] disabled:opacity-40 disabled:cursor-not-allowed transition-all font-semibold"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
