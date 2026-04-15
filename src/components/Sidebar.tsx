import React from 'react';
import { 
  LayoutDashboard, 
  Search, 
  FileText, 
  Gavel, 
  Users, 
  Settings, 
  Shield,
  BookOpen,
  Scale,
  Brain,
  MessageSquareQuote,
  Stamp,
  ClipboardList
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'intake', label: 'Case Management', icon: ClipboardList },
    { id: 'research', label: 'Strategic Research', icon: Search },
    { id: 'drafting', label: 'Precision Drafting', icon: FileText },
    { id: 'questions', label: 'Question Builder', icon: MessageSquareQuote },
    { id: 'psychology', label: 'Psychology Lab', icon: Brain },
    { id: 'mock-trial', label: 'Virtual Trial Lab', icon: Gavel },
    { id: 'adr', label: 'Virtual ADR Suite', icon: Users },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center shadow-lg shadow-gold-500/10">
          <Scale className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-serif font-bold text-slate-900 tracking-tight">NitiNova</h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Legal OS</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group",
              activeTab === item.id 
                ? "bg-slate-100 text-gold-500 border border-slate-200" 
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5",
              activeTab === item.id ? "text-gold-500" : "text-slate-400 group-hover:text-slate-600"
            )} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-200 space-y-4">
        <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4 text-slate-600" />
            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Enterprise</span>
          </div>
          <p className="text-[10px] text-slate-500">Secure AES-256 Encryption Active</p>
        </div>
        
        <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-slate-900 transition-colors">
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium">Settings</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
