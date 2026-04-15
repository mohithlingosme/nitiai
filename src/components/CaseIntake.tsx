import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ClipboardList, MapPin, Scale, FileText, Send, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

const CaseIntake: React.FC = () => {
  const [formData, setFormData] = useState({
    jurisdiction: '',
    caseType: '',
    facts: '',
    desiredOutput: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, this would save to a global state or database
  };

  if (submitted) {
    return (
      <div className="p-8 flex flex-col items-center justify-center h-full text-center space-y-6">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-slate-900">Case Registered Successfully</h2>
        <p className="text-slate-500 max-w-md">
          The facts have been ingested into the NitiNova Intelligence Layer. You can now proceed to Research, Drafting, or Simulation modules.
        </p>
        <div className="flex gap-4">
          <button className="px-6 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-all">
            Start Research
          </button>
          <button className="px-6 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg font-bold hover:bg-slate-50 transition-all">
            Draft Document
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">Case Intake & Management</h2>
        <p className="text-slate-500">Provide the foundational details to initialize the AI intelligence layer.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <MapPin className="w-3 h-3" /> Jurisdiction
            </label>
            <input 
              type="text" 
              placeholder="e.g. Supreme Court of India, Delhi High Court"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-slate-400 transition-all"
              value={formData.jurisdiction}
              onChange={(e) => setFormData({...formData, jurisdiction: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Scale className="w-3 h-3" /> Case Type
            </label>
            <select 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-slate-400 transition-all"
              value={formData.caseType}
              onChange={(e) => setFormData({...formData, caseType: e.target.value})}
              required
            >
              <option value="">Select Case Type</option>
              <option value="Civil">Civil Litigation</option>
              <option value="Criminal">Criminal Defense/Prosecution</option>
              <option value="Commercial">Commercial Arbitration</option>
              <option value="Constitutional">Constitutional Writ</option>
              <option value="Family">Family Law</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <FileText className="w-3 h-3" /> Facts of the Case
          </label>
          <textarea 
            placeholder="Describe the events, parties involved, and core dispute..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:border-slate-400 transition-all min-h-[200px] resize-none"
            value={formData.facts}
            onChange={(e) => setFormData({...formData, facts: e.target.value})}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <Send className="w-3 h-3" /> Desired Output
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['Drafting', 'Simulation', 'ADR', 'Judgment', 'Research'].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setFormData({...formData, desiredOutput: opt})}
                className={cn(
                  "p-3 rounded-xl border text-xs font-bold transition-all",
                  formData.desiredOutput === opt 
                    ? "bg-slate-900 text-white border-slate-900" 
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <button 
            type="submit"
            className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 flex items-center justify-center gap-2"
          >
            Initialize Case Intelligence
          </button>
        </div>
      </form>
    </div>
  );
};

export default CaseIntake;
