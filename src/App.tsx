import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ResearchModule from './components/ResearchModule';
import DraftingModule from './components/DraftingModule';
import CaseIntake from './components/CaseIntake';
import QuestionBuilder from './components/QuestionBuilder';
import PsychologyLayer from './components/PsychologyLayer';
import TrialLab from './components/TrialLab';
import ADRSuite from './components/ADRSuite';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('intake');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'intake':
        return <CaseIntake />;
      case 'research':
        return <ResearchModule />;
      case 'drafting':
        return <DraftingModule />;
      case 'questions':
        return <QuestionBuilder />;
      case 'psychology':
        return <PsychologyLayer />;
      case 'mock-trial':
        return <TrialLab />;
      case 'adr':
        return <ADRSuite />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
