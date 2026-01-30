
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  FileText, 
  Search, 
  FileCode, 
  Settings, 
  Plus, 
  Sparkles,
  MessageSquare,
  Users,
  LogOut,
  CreditCard,
  ChevronRight
} from 'lucide-react';
import { AppView, User, UserPlan } from './types';
import Dashboard from './components/Dashboard';
import KnowledgeBase from './components/KnowledgeBase';
import AnalysisTool from './components/AnalysisTool';
import BlueprintView from './components/BlueprintView';
import SearchTool from './components/SearchTool';
import ChatTool from './components/ChatTool';
import PeopleSearchAgent from './components/PeopleSearchAgent';
import LandingPage from './components/LandingPage';
import AuthFlow from './components/AuthFlow';
import Pricing from './components/Pricing';

export const AppLogo = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg" className="rounded-xl shadow-2xl">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0B134D" />
        <stop offset="100%" stopColor="#1E3A8A" />
      </linearGradient>
      <linearGradient id="shineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0.2" stopColor="transparent" />
        <stop offset="0.5" stopColor="#3B82F6" stopOpacity="0.4" />
        <stop offset="0.8" stopColor="transparent" />
      </linearGradient>
    </defs>
    {/* Base Rounded Square */}
    <rect width="1024" height="1024" rx="220" fill="url(#bgGrad)" />
    {/* Diagonal Shine */}
    <rect width="1500" height="400" transform="rotate(-45 0 0) translate(-300 400)" fill="url(#shineGrad)" />
    
    {/* Stylized "P/L" shape from the image */}
    <path 
      d="M320 720 C320 720 320 380 580 380 C840 380 840 620 580 620 L320 620" 
      stroke="white" 
      strokeWidth="60" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      opacity="0.95"
    />
    {/* Node circles */}
    <circle cx="320" cy="720" r="70" fill="#3B82F6" />
    <circle cx="320" cy="720" r="45" fill="white" fillOpacity="0.8" />
    
    <circle cx="480" cy="620" r="60" fill="white" />
    <circle cx="730" cy="380" r="65" fill="white" />
    
    {/* Subtle Inner Glow */}
    <rect width="1024" height="1024" rx="220" stroke="white" strokeOpacity="0.1" strokeWidth="10" />
  </svg>
);

const INITIAL_USER: User = {
  id: '',
  name: '',
  email: '',
  plan: UserPlan.FREE,
  credits: 0,
  isAuthenticated: false,
};

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>(AppView.LANDING);
  const [user, setUser] = useState<User>(INITIAL_USER);

  // Persistence check
  useEffect(() => {
    const savedUser = localStorage.getItem('lumia_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setActiveView(AppView.DASHBOARD);
    }
  }, []);

  const handleLogout = () => {
    setUser(INITIAL_USER);
    localStorage.removeItem('lumia_user');
    setActiveView(AppView.LANDING);
  };

  const useCredits = (amount: number) => {
    if (user.credits >= amount) {
      const updatedUser = { ...user, credits: user.credits - amount };
      setUser(updatedUser);
      localStorage.setItem('lumia_user', JSON.stringify(updatedUser));
      return true;
    }
    return false;
  };

  const navigation = [
    { name: 'Novo', icon: Plus, view: AppView.ANALYSIS, shortcut: 'Ctrl+K' },
    { name: 'Chat', icon: MessageSquare, view: AppView.CHAT },
    { name: 'Busca Pessoas', icon: Users, view: AppView.PEOPLE_SEARCH, premium: true },
    { name: 'Knowledge', icon: BookOpen, view: AppView.KNOWLEDGE },
    { name: 'Busca IA', icon: Search, view: AppView.SEARCH },
    { name: 'Dashboard', icon: Sparkles, view: AppView.DASHBOARD },
    { name: 'Blueprint', icon: FileCode, view: AppView.BLUEPRINT },
  ];

  if (!user.isAuthenticated && (activeView === AppView.LANDING || activeView === AppView.LOGIN || activeView === AppView.PRICING)) {
    if (activeView === AppView.LOGIN) return <AuthFlow setUser={setUser} setActiveView={setActiveView} />;
    if (activeView === AppView.PRICING) return <Pricing onBack={() => setActiveView(AppView.LANDING)} onPlanSelect={() => setActiveView(AppView.LOGIN)} />;
    return <LandingPage onGetStarted={() => setActiveView(AppView.LOGIN)} onViewPricing={() => setActiveView(AppView.PRICING)} />;
  }

  const renderView = () => {
    switch (activeView) {
      case AppView.DASHBOARD: return <Dashboard setActiveView={setActiveView} user={user} />;
      case AppView.KNOWLEDGE: return <KnowledgeBase />;
      case AppView.ANALYSIS: return <AnalysisTool useCredits={useCredits} user={user} />;
      case AppView.BLUEPRINT: return <BlueprintView />;
      case AppView.SEARCH: return <SearchTool useCredits={useCredits} user={user} />;
      case AppView.CHAT: return <ChatTool useCredits={useCredits} user={user} />;
      case AppView.PEOPLE_SEARCH: return <PeopleSearchAgent useCredits={useCredits} user={user} setActiveView={setActiveView} />;
      case AppView.PRICING: return <Pricing onBack={() => setActiveView(AppView.DASHBOARD)} user={user} setUser={setUser} />;
      default: return <Dashboard setActiveView={setActiveView} user={user} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0f172a] text-slate-200 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0b1120] border-r border-slate-800 flex flex-col">
        <div className="p-6 flex items-center gap-3 cursor-pointer" onClick={() => setActiveView(AppView.DASHBOARD)}>
          <AppLogo size={36} />
          <span className="font-bold text-xl tracking-tight text-white">Lumia</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveView(item.view)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeView === item.view 
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-4 h-4 ${activeView === item.view ? 'text-blue-400' : 'text-slate-500'}`} />
                {item.name}
                {item.premium && user.plan === UserPlan.FREE && (
                  <span className="text-[8px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-1 rounded uppercase">Pro</span>
                )}
              </div>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-3">
          {user.plan === UserPlan.FREE && (
            <div 
              onClick={() => setActiveView(AppView.PRICING)}
              className="p-3 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-xl cursor-pointer hover:from-blue-600/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Upgrade to Pro</span>
                <ChevronRight className="w-3 h-3 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[10px] text-slate-400">Unlock Advanced Agents & Higher Limits</p>
            </div>
          )}

          <div className="p-3 bg-slate-800/30 border border-slate-800 rounded-2xl flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shadow-lg">
              {user.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-semibold truncate text-slate-200">{user.name}</p>
              <p className="text-[10px] text-slate-500 flex items-center gap-1">
                <CreditCard className="w-2.5 h-2.5" /> {user.credits} Credits
              </p>
            </div>
            <button onClick={handleLogout} className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full bg-[#0f172a] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1e293b,transparent)] pointer-events-none opacity-40" />
        <div className="relative z-10 flex-1 flex flex-col">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
