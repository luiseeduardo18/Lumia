
import React, { useState } from 'react';
import { Search, Users, ExternalLink, Loader2, Globe, Building2, Briefcase, Linkedin, Lock, ArrowRight, CreditCard } from 'lucide-react';
import { searchPeopleB2B } from '../services/geminiService';
import { User, UserPlan, AppView } from '../types';

interface PeopleSearchAgentProps {
  useCredits: (amount: number) => boolean;
  user: User;
  setActiveView: (view: AppView) => void;
}

const PeopleSearchAgent: React.FC<PeopleSearchAgentProps> = ({ useCredits, user, setActiveView }) => {
  const [formData, setFormData] = useState({ name: '', company: '', role: '', linkedinUrl: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{ text: string, sources: any[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isLocked = user.plan === UserPlan.FREE;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;

    const { name, company, role, linkedinUrl } = formData;
    const queryParts = [];
    if (name) queryParts.push(`Name: ${name}`);
    if (company) queryParts.push(`Company: ${company}`);
    if (role) queryParts.push(`Role: ${role}`);
    if (linkedinUrl) queryParts.push(`LinkedIn Profile: ${linkedinUrl}`);
    
    const query = `Seek detailed professional info about: ${queryParts.join(', ')}. Prioritize LinkedIn info if provided.`.trim();
    
    if (!name && !linkedinUrl) return;

    setError(null);
    const hasCredits = useCredits(10);
    if (!hasCredits) {
      setError("Insufficient credits.");
      return;
    }

    setIsLoading(true);
    try {
      const data = await searchPeopleB2B(query);
      setResults(data);
    } catch (err) {
      console.error(err);
      setError("Search failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-8 max-w-5xl mx-auto w-full overflow-y-auto pb-32">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-4">
          <Users className="w-3 h-3" /> B2B INTELLIGENCE AGENT
        </div>
        <h1 className="text-3xl font-bold mb-4">People Search Agent</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Deep B2B intelligence for prospecting and professional research. (Cost: 10 Credits)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
        {isLocked && (
          <div className="absolute inset-0 z-20 flex items-center justify-center p-8 backdrop-blur-[2px]">
            <div className="bg-slate-900/90 border border-slate-800 p-12 rounded-[40px] text-center shadow-2xl max-w-md">
              <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Pro Agent Locked</h3>
              <p className="text-slate-400 mb-8 text-sm leading-relaxed">
                The People Search Agent is a premium tool reserved for Pro and Premium users. Upgrade now to unlock B2B intelligence.
              </p>
              <button 
                onClick={() => setActiveView(AppView.PRICING)}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-600/20"
              >
                Unlock Pro Plans <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Search Form */}
        <div className="lg:col-span-1 space-y-6">
          <form onSubmit={handleSearch} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Full Name</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="Ex: Elon Musk"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Company</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input 
                  type="text" 
                  value={formData.company}
                  onChange={e => setFormData({...formData, company: e.target.value})}
                  placeholder="Ex: Tesla"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Role</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input 
                  type="text" 
                  value={formData.role}
                  onChange={e => setFormData({...formData, role: e.target.value})}
                  placeholder="Ex: CEO"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">LinkedIn URL</label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input 
                  type="text" 
                  value={formData.linkedinUrl}
                  onChange={e => setFormData({...formData, linkedinUrl: e.target.value})}
                  placeholder="Ex: linkedin.com/in/profile"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading || (!formData.name && !formData.linkedinUrl) || isLocked}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              Launch B2B Search
            </button>
          </form>
          
          <div className="px-4 py-2 bg-slate-800/50 rounded-xl text-[10px] flex items-center justify-center gap-2 border border-slate-800">
            <CreditCard className="w-3 h-3 text-blue-400" />
            <span className="font-bold text-slate-500">{user.credits} Credits Available</span>
          </div>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-2 space-y-6">
          {error && <div className="p-4 bg-red-400/10 border border-red-400/20 text-red-400 text-xs rounded-2xl">{error}</div>}
          {!results && !isLoading ? (
            <div className="h-full min-h-[400px] border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center text-slate-600 p-8">
              <Users className="w-12 h-12 mb-4 opacity-10" />
              <p className="text-sm font-medium">Results will appear here.</p>
            </div>
          ) : null}

          {isLoading && <div className="space-y-6 animate-pulse"><div className="h-48 bg-slate-800/50 rounded-3xl"></div><div className="h-20 bg-slate-800/50 rounded-2xl"></div></div>}

          {results && !isLoading && (
            <div className="space-y-6">
              <div className="bg-slate-800/30 border border-slate-800 rounded-3xl p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><Linkedin className="w-24 h-24" /></div>
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs mb-6 uppercase tracking-wider relative z-10"><Globe className="w-4 h-4" /> B2B Report</div>
                <div className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap relative z-10 prose prose-invert prose-sm max-w-none">{results.text}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PeopleSearchAgent;
