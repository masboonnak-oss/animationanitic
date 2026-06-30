import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, X, Send, Minimize2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const INITIAL_GREETING = "Hi! I'm Sovereign AI. I can help with your infrastructure, payments, billing questions, or anything about our platform. How can I help?";

const AUTO_RESPONSES: Record<string, string> = {
  pricing: "Our plans start at $10/mo for Cloud VPS, $40/mo for Pro, and $120/mo for Enterprise. Payment Gateway has a flat 0.8% + $0.10 per transaction. Would you like full pricing details?",
  server: "We offer Cloud VPS, Dedicated Servers, GPU Instances, and Kubernetes clusters across 18 global locations. All instances come with NVMe storage and 120Tbps DDoS protection.",
  payment: "Our Payment Gateway supports 180+ countries, all major cards, wallets, and bank transfers. Settlement is within hours with PCI-DSS Level 1 compliance.",
  ai: "Sovereign AI includes an intelligent assistant, predictive analytics, threat detection, workload optimization, and the ability to deploy custom ML models on our GPU clusters.",
  datacenter: "We operate Tier IV data centers in 18 locations globally. Colocation options include half rack, full rack, private suites, and custom builds.",
  support: "Our enterprise support is available 24/7. You can open a ticket from your dashboard, email support@sovereign.io, or use this AI assistant for immediate help.",
  default: "Great question! For detailed assistance with that, I'd recommend checking our documentation or reaching out to our enterprise team. Is there anything specific about our hosting, payment, AI, or data center services I can help with?",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("price") || lower.includes("cost") || lower.includes("plan")) return AUTO_RESPONSES.pricing;
  if (lower.includes("server") || lower.includes("vps") || lower.includes("host")) return AUTO_RESPONSES.server;
  if (lower.includes("payment") || lower.includes("gateway") || lower.includes("pay")) return AUTO_RESPONSES.payment;
  if (lower.includes("ai") || lower.includes("intelligence") || lower.includes("model")) return AUTO_RESPONSES.ai;
  if (lower.includes("data center") || lower.includes("datacenter") || lower.includes("colocation")) return AUTO_RESPONSES.datacenter;
  if (lower.includes("support") || lower.includes("help") || lower.includes("ticket")) return AUTO_RESPONSES.support;
  return AUTO_RESPONSES.default;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: INITIAL_GREETING, timestamp: new Date() }]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input.trim(), timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const response = getResponse(userMsg.content);
      setMessages(prev => [...prev, { role: "assistant", content: response, timestamp: new Date() }]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 z-[9980] w-14 h-14 rounded-full bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-blue)] flex items-center justify-center shadow-[0_0_30px_rgba(155,89,255,0.4)] hover:shadow-[0_0_40px_rgba(155,89,255,0.6)] transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
      >
        <Brain className="w-6 h-6 text-white" />
        <motion.div
          className="absolute inset-0 rounded-full border border-[var(--neon-purple)]"
          animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-8 left-8 z-[9980] w-[380px] h-[520px] rounded-3xl bg-[#161616]/95 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 bg-gradient-to-r from-[var(--neon-purple)]/10 to-[var(--neon-blue)]/10">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-blue)] flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm">Sovereign AI</p>
                  <p className="text-[10px] text-[var(--neon-cyan)] flex items-center gap-1"><span className="w-1.5 h-1.5 bg-[var(--neon-cyan)] rounded-full inline-block animate-pulse" />Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === "user" ? "bg-white text-black rounded-br-sm" : "bg-white/5 border border-white/10 text-white/90 rounded-bl-sm"}`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 flex space-x-1">
                    {[0, 1, 2].map(i => (
                      <motion.div key={i} className="w-1.5 h-1.5 bg-white/40 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center space-x-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus-within:border-[var(--neon-blue)]/50 transition-colors">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && send()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
                />
                <button onClick={send} disabled={!input.trim()} className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors disabled:opacity-30">
                  <Send className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
              <p className="text-[10px] text-muted-foreground text-center mt-2">Sovereign AI · Always available</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}