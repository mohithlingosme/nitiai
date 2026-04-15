import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Plus, 
  Save, 
  Download, 
  Share2, 
  History, 
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  FileCode,
  Zap,
  MoreVertical,
  Scale,
  Stamp,
  Gavel
} from 'lucide-react';
import { cn } from '../lib/utils';

const DraftingModule: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [isGeneratingJudgment, setIsGeneratingJudgment] = useState(false);

  const templates = [
    { id: 'writ', name: 'Writ Petition', type: 'Litigation', status: 'Compliance Ready' },
    { id: 'affidavit', name: 'Affidavit in Reply', type: 'Litigation', status: 'Draft' },
    { id: 'judgment', name: 'Reasoned Judgment', type: 'Judicial', status: 'AI Generated' },
    { id: 'contract', name: 'Service Agreement', type: 'Commercial', status: 'Review Required' },
    { id: 'mou', name: 'MOU - Strategic', type: 'Commercial', status: 'Final' },
  ];

  return (
    <div className="p-8 h-[calc(100vh-64px)] flex flex-col">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">Precision Drafting & Judgment Engine</h2>
          <p className="text-slate-500">Professional legal drafting with integrated judicial reasoning and judgment generation.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsGeneratingJudgment(true)}
            className="px-6 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm"
          >
            <Stamp className="w-5 h-5 text-slate-600" />
            Generate Judgment
          </button>
          <button className="px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-900/10">
            <Plus className="w-5 h-5" />
            Create New Draft
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-8 overflow-hidden">
        {/* Templates & Recent */}
        <div className="col-span-4 space-y-6 overflow-y-auto pr-2">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Documents</h3>
            <div className="space-y-3">
              {templates.map((doc) => (
                <motion.div
                  key={doc.id}
                  whileHover={{ x: 4 }}
                  onClick={() => setSelectedDoc(doc.id)}
                  className={cn(
                    "legal-card p-4 cursor-pointer group flex items-center justify-between",
                    selectedDoc === doc.id ? "border-slate-400 bg-slate-50" : ""
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-2 rounded-lg",
                      doc.type === 'Litigation' ? 'bg-blue-50 text-blue-600' : 
                      doc.type === 'Judicial' ? 'bg-slate-900 text-white' : 'bg-green-50 text-green-600'
                    )}>
                      {doc.type === 'Judicial' ? <Stamp className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-slate-600 transition-colors">{doc.name}</h4>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest">{doc.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={cn(
                      "text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter",
                      doc.status === 'Compliance Ready' ? 'bg-green-50 text-green-600' : 
                      doc.status === 'AI Generated' ? 'bg-slate-900 text-white' :
                      doc.status === 'Review Required' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-500'
                    )}>
                      {doc.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="legal-card p-6 bg-slate-50 border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-slate-600" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Intelligence Layer</h3>
            </div>
            <ul className="space-y-3">
              {[
                'Auto Clause Insertion',
                'Judicial Reasoning Engine',
                'Precedent Citation Mapping',
                'Adversarial Tone Check'
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-3 h-3 text-slate-400" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Editor Area */}
        <div className="col-span-8 flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                <FileCode className="w-4 h-4" />
                {selectedDoc === 'judgment' ? 'JUDGMENT_PAE_9921.docx' : 'DRAFT_v2.4.docx'}
              </div>
              <div className="h-4 w-[1px] bg-slate-200"></div>
              <div className="flex items-center gap-2 text-[10px] text-green-600 font-bold uppercase tracking-widest">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                Autosaved
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                <History className="w-4 h-4" />
              </button>
              <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium hover:bg-slate-50 transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors">
                <Save className="w-4 h-4" />
                Save Final
              </button>
            </div>
          </div>

          <div className="flex-1 p-12 overflow-y-auto bg-slate-100/50 font-serif">
            <div className="max-w-2xl mx-auto p-12 bg-white shadow-2xl border border-slate-200 min-h-full space-y-8 text-slate-800 leading-relaxed">
              {selectedDoc === 'judgment' ? (
                <div className="space-y-8">
                  <div className="text-center space-y-2 mb-12">
                    <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest">In the High Court of Judicature at Bombay</h2>
                    <p className="text-sm font-bold italic">Ordinary Original Civil Jurisdiction</p>
                    <p className="text-sm font-bold">PAE Number: 2024/BOM/HC/9921</p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-bold text-slate-900 underline">JUDGMENT</h3>
                    <p>1. This petition arises out of the arbitrary cancellation of the Petitioner's operating license by the Respondent No. 2. The core issue for determination is whether the principles of natural justice were adhered to.</p>
                    <p>2. Having heard the learned counsel for both parties and perused the records, this Court finds that the impugned order was passed without providing an opportunity of being heard to the Petitioner.</p>
                    <p>3. In view of the settled legal position in *State of Maharashtra v. Public*, the impugned order is hereby set aside.</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-center space-y-2 mb-12">
                    <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest">In the High Court of Judicature at Bombay</h2>
                    <p className="text-sm font-bold italic">Ordinary Original Civil Jurisdiction</p>
                    <p className="text-sm font-bold">Writ Petition No. ______ of 2024</p>
                  </div>

                  <div className="flex justify-between items-start gap-8">
                    <div className="flex-1 space-y-1">
                      <p className="font-bold text-slate-900">NitiNova Strategic Systems Pvt. Ltd.</p>
                      <p className="text-xs text-slate-500 italic">... Petitioner</p>
                    </div>
                    <div className="text-center font-bold text-slate-900 py-4">VS</div>
                    <div className="flex-1 text-right space-y-1">
                      <p className="font-bold text-slate-900">Union of India & Ors.</p>
                      <p className="text-xs text-slate-500 italic">... Respondents</p>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-slate-100">
                    <h3 className="font-bold text-slate-900 mb-4 underline">MEMORANDUM OF WRIT PETITION UNDER ARTICLE 226</h3>
                    <p className="mb-4">To,</p>
                    <p className="mb-4">The Honorable Chief Justice and other Honorable Judges of the High Court of Judicature at Bombay.</p>
                    <p className="mb-6">The humble petition of the Petitioner above-named most respectfully showeth:</p>
                    
                    <div className="space-y-6">
                      <div className="flex gap-4 group relative">
                        <span className="font-bold text-slate-400 w-4">1.</span>
                        <p className="flex-1">That the Petitioner is a company incorporated under the Companies Act, 2013, having its registered office at Mumbai, and is engaged in the business of providing advanced legal intelligence systems.</p>
                      </div>

                      <div className="flex gap-4 group relative bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <span className="font-bold text-slate-400 w-4">2.</span>
                        <div className="flex-1 space-y-2">
                          <p className="text-slate-900 font-bold flex items-center gap-2">
                            <Zap className="w-3 h-3 text-slate-600" /> AI SUGGESTED CLAUSE
                          </p>
                          <p className="italic text-slate-700">"That the impugned order dated 15th January 2024 passed by the Respondent No. 2 is ex-facie illegal, arbitrary, and in gross violation of the principles of natural justice as enshrined under Article 14 of the Constitution of India."</p>
                          <div className="flex gap-2 pt-2">
                            <button className="text-[10px] font-bold text-slate-900 uppercase tracking-widest hover:underline">Accept</button>
                            <button className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:underline">Modify</button>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4 group relative">
                        <span className="font-bold text-slate-400 w-4">3.</span>
                        <p className="flex-1">That the Petitioner is aggrieved by the arbitrary cancellation of its operating license without any prior notice or opportunity of being heard, which is a direct violation of the 'Audi Alteram Partem' rule.</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Editor Toolbar */}
          <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-center gap-4">
            <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
              {['B', 'I', 'U', 'S'].map((btn) => (
                <button key={btn} className="w-8 h-8 flex items-center justify-center text-xs font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded transition-all">{btn}</button>
              ))}
            </div>
            <div className="h-6 w-[1px] bg-slate-200"></div>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-all shadow-sm">
              <Zap className="w-4 h-4" />
              AI REWRITE
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all shadow-sm">
              <Scale className="w-4 h-4" />
              CITATIONS
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-900 rounded-lg text-xs font-bold hover:bg-slate-200 transition-all shadow-sm">
              <Stamp className="w-4 h-4" />
              JUDICIAL REASONING
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftingModule;
