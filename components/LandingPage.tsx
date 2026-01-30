
import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Brain, 
  Users, 
  Search, 
  Zap, 
  Globe, 
  ShieldCheck 
} from 'lucide-react';
import { AppLogo } from '../App';

interface LandingPageProps {
  onGetStarted: () => void;
  onViewPricing: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onViewPricing }) => {
  return (
    <div className="flex-1 overflow-y-auto bg-[#0f172a] text-slate-200">
      {/* Navbar Overlay */}
      <div className="sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AppLogo size={36} />
          <span className="font-bold text-xl tracking-tight">Lumia AI</span>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={onViewPricing} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Pricing</button>
          <button onClick={onGetStarted} className="px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-full text-sm font-bold transition-all shadow-lg shadow-blue-500/20">Login</button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-8 max-w-7xl mx-auto text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] font-bold text-blue-400 uppercase tracking-widest mb-8">
          <Sparkles className="w-4 h-4" /> The Next Generation of Professional AI
        </div>

        <h1 className="text-6xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">
          Lumia — Your AI Brain for <br/>Smarter Decisions
        </h1>

        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
          Analyze complex data, search people intelligently, and build automated blueprints with the most advanced AI engine for B2B professionals.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onGetStarted}
            className="w-full sm:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-500 rounded-2xl text-lg font-bold flex items-center justify-center gap-3 transition-all shadow-2xl shadow-blue-600/20 group"
          >
            Start for Free <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={onViewPricing}
            className="w-full sm:w-auto px-10 py-5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl text-lg font-bold transition-all"
          >
            View Pricing
          </button>
        </div>

        {/* Social Proof */}
        <div className="mt-24 pt-12 border-t border-slate-800/50">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-8">Trusted by innovators at</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale contrast-125">
            {["STARK CORP", "WAYNE TECH", "OSCORP", "CYBERDYNE", "LUMINA"].map(brand => (
              <span key={brand} className="text-2xl font-black">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything you need to scale</h2>
            <p className="text-slate-400">A unified platform for intelligence, search and knowledge management.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Brain, title: "Deep Analysis", desc: "Turn raw documents and URLs into actionable strategic summaries in seconds." },
              { icon: Users, title: "People Agent", desc: "Automated B2B lead intelligence. Find trajectories and LinkedIn insights with one click." },
              { icon: Search, title: "AI Grounding", desc: "Search the live web. Lumia cross-references sources to ensure 100% accuracy." },
              { icon: Zap, title: "Low Latency", desc: "Powered by Gemini 3 Flash Lite for instant responses that keep you in the flow." },
              { icon: Globe, title: "Global Context", desc: "Multilingual support for documents in over 50 languages with native fluency." },
              { icon: ShieldCheck, title: "Enterprise Security", desc: "Your data stays yours. Private sessions and encrypted knowledge bases." }
            ].map((feature, i) => (
              <div key={i} className="p-8 bg-slate-900 border border-slate-800 rounded-3xl hover:border-blue-500/50 transition-all group shadow-xl">
                <div className="w-14 h-14 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Simplicity at its core</h2>
          <div className="space-y-12">
            {[
              { step: "01", title: "Create your workspace", desc: "Sign up in 30 seconds. Get immediate access to your dashboard and 50 free credits." },
              { step: "02", title: "Input your data", desc: "Upload PDFs, paste URLs, or query the People Search Agent for deep B2B insights." },
              { step: "03", title: "Automate and Scale", desc: "Build blueprints and workflows. Upgrade to Pro for unlimited power and priority AI." }
            ].map((item, i) => (
              <div key={i} className="flex gap-8 items-start">
                <div className="text-5xl font-black text-blue-600/20">{item.step}</div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-8 border-t border-slate-800">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[40px] p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -mr-20 -mt-20" />
          <h2 className="text-4xl font-bold text-white mb-6 relative z-10">Start free. Upgrade only when <br/>you see results.</h2>
          <p className="text-blue-100 mb-10 relative z-10 max-w-xl mx-auto">Join thousands of professionals using Lumia to stay ahead of the curve.</p>
          <button 
            onClick={onGetStarted}
            className="px-12 py-5 bg-white text-blue-600 rounded-2xl text-xl font-bold hover:bg-blue-50 transition-all shadow-xl relative z-10"
          >
            Create Your Account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-slate-900 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <AppLogo size={24} />
          <span className="font-bold text-slate-400">Lumia AI © 2025</span>
        </div>
        <div className="flex justify-center gap-8 text-xs text-slate-600 font-medium">
          <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Documentation</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
