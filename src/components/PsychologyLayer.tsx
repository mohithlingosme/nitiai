import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Send, 
  Search, 
  Loader2, 
  Scale, 
  AlertCircle, 
  Eye, 
  User, 
  ShieldCheck,
  ChevronDown,
  Activity,
  Fingerprint,
  Zap
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { streamLegalIntelligence } from '../services/gemini';
import { cn } from '../lib/utils';

const PsychologyLayer: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState('Case #2024-081: NitiNova vs Union');
  const [subjectRole, setSubjectRole] = useState<'defendant' | 'witness' | 'victim' | 'other'>('defendant');
  const [analysisType, setAnalysisType] = useState('Intent Analysis');
  const [messages, setMessages] = useState<any[]>([
    { 
      role: 'ai', 
      content: "Behavioral Intelligence Layer active. Select a case and analysis subject to begin deep psychological profiling.", 
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
      Subject Role: ${subjectRole}
      Analysis Type: ${analysisType}
      Input: ${input}
      
      Perform a deep psychological and criminological analysis. Focus on intent, motive, cognitive biases, and deception indicators. Provide a structured profile.
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
      {/* Left Sidebar: Profiling Context */}
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
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Analysis Subject</label>
          <div className="grid grid-cols-2 gap-2">
            {(['defendant', 'witness', 'victim', 'other'] as const).map((role) => (
              <button
                key={role}
                onClick={() => setSubjectRole(role)}
                className={cn(
                  "py-2 rounded text-[10px] font-bold uppercase tracking-tighter transition-all border",
                  subjectRole === role 
                    ? "bg-slate-900 text-white border-slate-900" 
                    : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                )}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 block">Analysis Focus</label>
          <div className="space-y-2">
            {['Intent Analysis', 'Credibility Assessment', 'Cognitive Bias Mapping', 'Motive Profiling'].map((type) => (
              <button
                key={type}
                onClick={() => setAnalysisType(type)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded text-xs transition-all border",
                  analysisType === type 
                    ? "bg-slate-50 text-slate-900 border-slate-300 font-bold" 
                    : "bg-white text-slate-600 border-transparent hover:bg-slate-50"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Analysis Area */}
      <div className="flex-1 flex flex-col bg-slate-50">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-lg">
              <Brain className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Psychology & Criminology Lab</h3>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">
                {analysisType.toUpperCase()} ENGINE
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded text-[10px] font-bold uppercase tracking-widest border border-green-100">
              <ShieldCheck className="w-3 h-3" /> Secure Analysis
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
                  {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Eye className="w-4 h-4 text-slate-700" />}
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
                      <span className="text-xs font-mono">Processing behavioral data...</span>
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
              placeholder="Input behavior observations, statements, or contextual facts..."
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

      {/* Right Sidebar: Behavioral Metrics */}
      <div className="w-80 border-l border-slate-200 bg-white p-6 space-y-6 hidden xl:block overflow-y-auto">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
          <Activity className="w-4 h-4 text-slate-400" /> Behavioral Dashboard
        </h3>
        
        <div className="space-y-4">
          <div className="legal-card p-4 space-y-4">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Risk Indicators</h4>
            <div className="space-y-4">
              {[
                { label: 'Deception Probability', value: 35, color: 'bg-yellow-500' },
                { label: 'Aggression Index', value: 12, color: 'bg-blue-500' },
                { label: 'Cognitive Load', value: 68, color: 'bg-red-500' }
              ].map((metric) => (
                <div key={metric.label} className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-slate-600">{metric.label}</span>
                    <span className="text-slate-900">{metric.value}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.value}%` }}
                      className={cn("h-full rounded-full", metric.color)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="legal-card p-4 space-y-3">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <Fingerprint className="w-3 h-3" /> Psychological Traits
            </h4>
            <div className="flex flex-wrap gap-2">
              {['Calculated', 'Defensive', 'High-Stress', 'Cooperative'].map(trait => (
                <span key={trait} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[9px] font-bold uppercase tracking-widest">
                  {trait}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 bg-slate-900 rounded-xl text-white space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <Zap className="w-3 h-3 text-gold-500" /> AI Insight
            </div>
            <p className="text-xs leading-relaxed text-slate-200">
              Subject shows high cognitive load when discussing the timeline of events. Recommend focused questioning on the 2 PM - 4 PM window.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PsychologyLayer;
