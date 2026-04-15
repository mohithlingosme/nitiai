import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  AlertCircle, 
  Clock, 
  FileCheck, 
  ArrowUpRight,
  Zap,
  Target,
  ShieldCheck
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { cn } from '../lib/utils';

const data = [
  { name: 'Mon', cases: 4, research: 12 },
  { name: 'Tue', cases: 6, research: 18 },
  { name: 'Wed', cases: 5, research: 15 },
  { name: 'Thu', cases: 8, research: 22 },
  { name: 'Fri', cases: 7, research: 20 },
  { name: 'Sat', cases: 9, research: 25 },
  { name: 'Sun', cases: 10, research: 28 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">Strategic Intelligence Overview</h2>
          <p className="text-slate-500">Welcome back, Senior Partner. Here is your litigation roadmap.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
            Export Report
          </button>
          <button className="px-4 py-2 bg-gold-500 text-white rounded-lg text-sm font-bold hover:bg-gold-600 transition-colors flex items-center gap-2 shadow-md">
            <Zap className="w-4 h-4" />
            New Case Strategy
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Litigations', value: '12', change: '+2', icon: TrendingUp, color: 'text-blue-600' },
          { label: 'Strategic Reports', value: '48', change: '+12', icon: FileCheck, color: 'text-green-600' },
          { label: 'Risk Alerts', value: '3', change: '-1', icon: AlertCircle, color: 'text-red-600' },
          { label: 'Billable AI Hours', value: '124.5', change: '+18%', icon: Clock, color: 'text-slate-700' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="legal-card group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-2 rounded-lg bg-slate-50", stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                {stat.change}
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium mb-1">{stat.label}</h3>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 legal-card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-serif font-bold text-slate-900">Litigation Success Probability</h3>
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gold-500"></div>
                <span className="text-slate-500">Predictive Strategy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-slate-500">Historical Benchmarks</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e293b" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1e293b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  itemStyle={{ color: '#1e293b' }}
                />
                <Area type="monotone" dataKey="research" stroke="#1e293b" fillOpacity={1} fill="url(#colorCases)" />
                <Line type="monotone" dataKey="cases" stroke="#3b82f6" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="legal-card">
          <h3 className="text-lg font-serif font-bold text-slate-900 mb-6">Critical Alerts</h3>
          <div className="space-y-6">
            {[
              { title: 'New SC Precedent', desc: 'Impact on Section 138 NI Act cases', time: '2h ago', type: 'precedent' },
              { title: 'Drafting Complete', desc: 'Writ Petition - State of MH vs. K.S.', time: '5h ago', type: 'draft' },
              { title: 'ADR Deadline', desc: 'Mediation session starts in 24 hours', time: '1d ago', type: 'deadline' },
              { title: 'Evidence Stress Test', desc: 'Low reliability score for Witness A', time: '2d ago', type: 'alert' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 group cursor-pointer">
                <div className="mt-1">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    item.type === 'precedent' ? 'bg-blue-500' : 
                    item.type === 'draft' ? 'bg-green-500' : 
                    item.type === 'alert' ? 'bg-red-500' : 'bg-slate-400'
                  )}></div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-slate-600 transition-colors">{item.title}</h4>
                  <p className="text-xs text-slate-500 mb-1">{item.desc}</p>
                  <span className="text-[10px] text-slate-400 font-mono">{item.time}</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-2 text-xs font-bold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            View All Intelligence
          </button>
        </div>
      </div>

      {/* Feature Highlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="legal-card bg-white">
          <Target className="w-8 h-8 text-blue-600 mb-4" />
          <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">Winning Strategy</h3>
          <p className="text-sm text-slate-500 mb-4">AI-driven predictive modeling for judicial outcomes based on bench strength and historical data.</p>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600">
            EXPLORE PREDICTIONS <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>
        <div className="legal-card bg-white">
          <Zap className="w-8 h-8 text-gold-500 mb-4" />
          <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">Adversarial Drafting</h3>
          <p className="text-sm text-slate-500 mb-4">Generate battle-ready petitions with auto-clause insertion and jurisdiction-aware compliance.</p>
          <div className="flex items-center gap-2 text-xs font-bold text-gold-500">
            START DRAFTING <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>
        <div className="legal-card bg-white">
          <ShieldCheck className="w-8 h-8 text-green-600 mb-4" />
          <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">Compliance Lab</h3>
          <p className="text-sm text-slate-500 mb-4">Real-time horizontal scanning for regulatory updates and legislative monitoring.</p>
          <div className="flex items-center gap-2 text-xs font-bold text-green-600">
            CHECK COMPLIANCE <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
