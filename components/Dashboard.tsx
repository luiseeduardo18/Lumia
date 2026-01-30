
import React from 'react';
import { Plus, Search, FileText, Globe, ArrowRight, Sparkles, CreditCard, ShieldCheck } from 'lucide-react';
import { AppView, User, UserPlan } from '../types';

interface DashboardProps {
  setActiveView: (view: AppView) => void;
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ setActiveView, user }) => {
  const quickActions = [
    { title: 'Analisar Documento', icon: FileText, desc: 'Extraia insights de PDFs, DOCX e TXT', color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { title: 'Resumir URL', icon: Globe, desc: 'Sumarização instantânea de sites e artigos', color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { title: 'Busca Profunda', icon: Search, desc: 'Pesquisa com fontes em tempo real', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-5xl mx-auto w-full overflow-y-auto">
      {/* SaaS Status Bar */}
      <div className="w-full flex items-center justify-between gap-4 p-4 mb-12 bg-slate-900/50 border border-slate-800 rounded-[28px] backdrop-blur-md">
        <div className="flex items-center gap-6 px-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Current Plan</span>
            <span className="text-sm font-bold text-white flex items-center gap-2">
              {user.plan} {user.plan !== UserPlan.FREE && <ShieldCheck className="w-3 h-3 text-blue-400" />}
            </span>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Points Available</span>
            <span className="text-sm font-bold text-blue-400 flex items-center gap-2">
              <CreditCard className="w-3.5 h-3.5" /> {user.credits}
            </span>
          </div>
        </div>
        {user.plan === UserPlan.FREE && (
          <button 
            onClick={() => setActiveView(AppView.PRICING)}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-2xl text-xs font-bold transition-all shadow-lg shadow-blue-600/20"
          >
            Go Pro
          </button>
        )}
      </div>

      <div className="text-center mb-16 relative">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-blue-500/10 blur-3xl rounded-full" />
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-6">
          <Sparkles className="w-3 h-3" /> Powered by Gemini
        </div>
        <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent tracking-tight leading-tight">
          Welcome back, {user.name.split(' ')[0]}.<br/>What will we build today?
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
          Access deep analysis, live web search, and specialized agents from your central hub.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
        {quickActions.map((action) => (
          <div 
            key={action.title}
            onClick={() => setActiveView(AppView.ANALYSIS)}
            className="group p-8 bg-slate-900/40 border border-slate-800 rounded-3xl hover:border-blue-500/40 hover:bg-slate-800/40 transition-all cursor-pointer shadow-xl hover:shadow-blue-500/5"
          >
            <div className={`w-14 h-14 rounded-2xl ${action.bg} ${action.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 ring-1 ring-white/5`}>
              <action.icon className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-lg text-white mb-3 tracking-tight">{action.title}</h3>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">{action.desc}</p>
            <div className="flex items-center text-xs font-bold text-blue-400 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              Launch Tool <ArrowRight className="ml-2 w-3 h-3" />
            </div>
          </div>
        ))}
      </div>

      <div className="w-full bg-slate-900/50 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-bold text-xl text-white">Suggested for you</h2>
            <p className="text-sm text-slate-500">Popular commands used by {user.plan} users</p>
          </div>
          <button className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors bg-blue-400/5 px-4 py-2 rounded-xl border border-blue-400/10">View all</button>
        </div>
        <div className="flex flex-wrap gap-3">
          {["Analyze scientific paper", "Extract email actions", "Compare legal contracts", "Research market trends", "Sentiment analysis"].map(tag => (
            <button key={tag} className="px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-2xl text-xs text-slate-400 hover:border-blue-500/50 hover:text-blue-400 hover:bg-blue-500/5 transition-all">
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
