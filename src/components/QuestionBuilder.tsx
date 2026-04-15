import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquareQuote, 
  Send, 
  Brain, 
  Zap, 
  Loader2, 
  Scale, 
  UserCheck, 
  AlertCircle,
  Users,
  ChevronDown,
  Target,
  ListChecks,
  Plus
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { streamLegalIntelligence } from '../services/gemini';
import { cn } from '../lib/utils';

const QuestionBuilder: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState('Case #2024-081: NitiNova vs Union');
  const [witnessName, setWitnessName] = useState('');
  const [questioningMode, setQuestioningMode] = useState<'direct' | 'cross' | 're-ex'>('cross');
  const [messages, setMessages] = useState<any[]>([
    { 
      role: 'ai', 
      content: "Strategic Question Builder initialized. Select a case and define your witness to begin mapping the examination strategy.", 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const cases = [
    'Case #2024-081: NitiNova vs Union',
    'Case #2024-092: State vs Sharma',
    'Case #2024-105: TechCorp IP Dispute'
  ];

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const aiMsg = { role: 'ai', content: '', timestamp: new Date() };
    setMessages(prev => [...prev, aiMsg]);

    const prompt = `
      Case: ${selectedCase}
      Witness: ${witnessName}
      Mode: ${questioningMode}
      Input: ${input}
      
      Generate strategic examination questions focusing on psychological pressure points, cognitive dissonance, and credibility assessment.
    `;
    
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
      {/* Left Sidebar: Case & Witness Context */}
      <div className="w-80 border-r border-slate-200 bg-white p-6 space-y-6 hidden lg:block overflow-y-auto">
        <div>
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Active Case</label>
          <div className="relative">
            <select 
              value={selectedCase}
              onChange={(e) => setSelectedCase(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:border-slate-400 appearance-none"
            >
              {cases.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-2.5 w-3 h-3 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Witness Profile</label>
          <div className="space-y-3">
            <input 
              type="text"
              placeholder="Witness Name"
              value={witnessName}
              onChange={(e) => setWitnessName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-slate-400"
            />
            <div className="grid grid-cols-3 gap-2">
              {(['direct', 'cross', 're-ex'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setQuestioningMode(mode)}
                  className={cn(
                    "py-1.5 rounded text-[10px] font-bold uppercase tracking-tighter transition-all border",
                    questioningMode === mode 
                      ? "bg-slate-900 text-white border-slate-900" 
                      : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                  )}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100">
          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <Target className="w-3 h-3" /> Questioning Goals
          </h4>
          <div className="space-y-2">
            {['Establish Bias', 'Impeach Credibility', 'Confirm Facts', 'Highlight Inconsistency'].map((goal) => (
              <label key={goal} className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 w-3 h-3" />
                <span className="text-xs text-slate-600 group-hover:text-slate-900 transition-colors">{goal}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-50">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-lg">
              <MessageSquareQuote className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Strategic Question Builder</h3>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">
                {questioningMode.toUpperCase()} EXAMINATION ENGINE
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all">
            <Plus className="w-3 h-3" /> Save Question Set
          </button>
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
                  {msg.role === 'user' ? <UserCheck className="w-4 h-4 text-white" /> : <Brain className="w-4 h-4 text-slate-700" />}
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
                      <span className="text-xs font-mono">Synthesizing strategic questions...</span>
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
              placeholder="Describe the specific fact or statement you want to challenge..."
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

      {/* Right Sidebar: Strategic Insights */}
      <div className="w-80 border-l border-slate-200 bg-white p-6 space-y-6 hidden xl:block overflow-y-auto">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-slate-400" /> Tactics Library
        </h3>
        
        <div className="space-y-4">
          <div className="legal-card p-4 space-y-3">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Psychological Pressure</h4>
            <div className="space-y-2">
              {[
                { name: 'Cognitive Dissonance', desc: 'Force witness to reconcile conflicting statements.' },
                { name: 'Anchoring Bias', desc: 'Set a baseline fact to influence subsequent answers.' },
                { name: 'The "Yes" Ladder', desc: 'Build momentum with small, undeniable truths.' }
              ].map((tactic) => (
                <div key={tactic.name} className="group cursor-help">
                  <div className="text-xs font-bold text-slate-700 group-hover:text-slate-900 transition-colors">{tactic.name}</div>
                  <div className="text-[10px] text-slate-500 leading-tight">{tactic.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="legal-card p-4 bg-slate-50 border-slate-200">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Saved Questions</h4>
            <div className="space-y-2">
              <p className="text-[10px] text-slate-400 italic">No questions saved yet. Use the "Save" button in the chat to add questions here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionBuilder;
