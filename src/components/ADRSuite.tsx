import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Send, Loader2, Scale, User, Shield, AlertCircle, Handshake, TrendingUp } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { streamLegalIntelligence } from '../services/gemini';
import { cn } from '../lib/utils';

const ADRSuite: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([
    { 
      role: 'ai', 
      content: "Welcome to the Virtual ADR Suite. I can assist in mediation, arbitration, and negotiation simulations. I will suggest settlement strategies based on case facts. Please describe the dispute and the current mediation stage.", 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const aiMsg = { role: 'ai', content: '', timestamp: new Date() };
    setMessages(prev => [...prev, aiMsg]);

    const prompt = `Simulate a mediation or arbitration session based on this input: ${input}. Suggest settlement strategies, identify common ground, and provide structured ADR outcomes.`;
    
    await streamLegalIntelligence(prompt, (text) => {
      setMessages(prev => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1].content = text;
        return newMsgs;
      });
    });

    setIsTyping(false);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      <div className="flex-1 flex flex-col bg-slate-50">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-lg">
              <Users className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Virtual ADR Suite</h3>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Mediation & Settlement Modeling</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex gap-4 max-w-4xl",
                  msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1",
                  msg.role === 'user' ? "bg-slate-700" : "bg-slate-200"
                )}>
                  {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Handshake className="w-4 h-4 text-slate-700" />}
                </div>
                <div className={cn(
                  "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                  msg.role === 'user' 
                    ? "bg-slate-700 text-white rounded-tr-none" 
                    : "bg-white border border-slate-200 text-slate-800 rounded-tl-none"
                )}>
                  <div className="markdown-body">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                  {msg.role === 'ai' && msg.content === '' && (
                    <div className="flex items-center gap-2 text-slate-500">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-xs font-mono">Modeling settlement strategies...</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="p-6 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
              placeholder="Describe the dispute and current settlement offers..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 pr-16 text-sm focus:outline-none focus:border-slate-400 transition-all min-h-[80px] resize-none shadow-sm"
            />
            <button 
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              className="absolute right-4 bottom-4 p-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="w-80 border-l border-slate-200 bg-white p-6 space-y-6 hidden xl:block overflow-y-auto">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-slate-400" /> Settlement Intelligence
        </h3>
        
        <div className="space-y-4">
          <div className="legal-card p-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">ADR Frameworks</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <TrendingUp className="w-3 h-3 text-green-600" />
                BATNA Analysis
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <TrendingUp className="w-3 h-3 text-green-600" />
                WATNA Analysis
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <TrendingUp className="w-3 h-3 text-green-600" />
                ZOPA Mapping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ADRSuite;
