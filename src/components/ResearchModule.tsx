import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Search, BookOpen, FileText, Scale, Zap, Info, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { streamLegalIntelligence } from '../services/gemini';
import { cn } from '../lib/utils';

interface Message {
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const ResearchModule: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'ai', 
      content: "Welcome to Strategic Research Intelligence. I am NitiNova. Provide the facts of your case, and I will identify core issues, map precedents, and detect regulatory loopholes.", 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: Message = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const aiMsg: Message = { role: 'ai', content: '', timestamp: new Date() };
    setMessages(prev => [...prev, aiMsg]);

    await streamLegalIntelligence(input, (text) => {
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
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-50">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-lg">
              <Search className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Strategic Research Lab</h3>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Active Session: Case #9921</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded flex items-center gap-1">
              <Zap className="w-3 h-3" /> AI OPTIMIZED
            </span>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
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
                  {msg.role === 'user' ? <FileText className="w-4 h-4 text-white" /> : <Scale className="w-4 h-4 text-slate-700" />}
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
                      <span className="text-xs font-mono">Analyzing precedents...</span>
                    </div>
                  )}
                  <div className="mt-2 text-[10px] text-slate-400 font-mono text-right">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
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
              placeholder="Describe case facts, legal queries, or request precedent mapping..."
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
          <p className="text-center text-[10px] text-slate-400 mt-3 uppercase tracking-widest font-bold">
            Powered by NitiNova Strategic AI • Verified Legal Citations
          </p>
        </div>
      </div>

      {/* Sidebar Info */}
      <div className="w-80 border-l border-slate-200 bg-white p-6 space-y-6 hidden xl:block overflow-y-auto">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
          <Info className="w-4 h-4 text-slate-400" /> Research Context
        </h3>
        
        <div className="space-y-4">
          <div className="legal-card p-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Primary Authorities</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                Constitution of India
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                BNS / BNSS (2023)
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                Evidence Act
              </div>
            </div>
          </div>

          <div className="legal-card p-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Winning Framework</h4>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold text-slate-600">01</span>
                </div>
                <p className="text-[11px] text-slate-600">Issue identification from facts</p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold text-slate-600">02</span>
                </div>
                <p className="text-[11px] text-slate-600">Multidimensional search</p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold text-slate-600">03</span>
                </div>
                <p className="text-[11px] text-slate-600">Rebuttal strategy mapping</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-slate-600" />
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Pro Tip</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Ask for "Adversarial Analysis" to see how the opposition might interpret the same facts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchModule;
