
import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, ArrowRight, Github } from 'lucide-react';
import { AppView, User, UserPlan } from '../types';
import { AppLogo } from '../App';

interface AuthFlowProps {
  setUser: (user: User) => void;
  setActiveView: (view: AppView) => void;
}

const AuthFlow: React.FC<AuthFlowProps> = ({ setUser, setActiveView }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    const newUser: User = {
      id: Math.random().toString(36).substring(7),
      name: formData.name || 'User',
      email: formData.email,
      plan: UserPlan.FREE,
      credits: 50,
      isAuthenticated: true
    };
    setUser(newUser);
    localStorage.setItem('lumia_user', JSON.stringify(newUser));
    setActiveView(AppView.DASHBOARD);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full" />

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-[40px] p-10 relative z-10 shadow-2xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-6">
            <AppLogo size={48} />
            <span className="font-bold text-2xl tracking-tight text-white">Lumia</span>
          </div>
          <h2 className="text-3xl font-extrabold mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-slate-500 text-sm">Join the next generation of professional AI.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input 
                  type="text" 
                  required
                  placeholder="John Doe"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-3 pl-12 pr-4 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm"
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <input 
                type="email" 
                required
                placeholder="name@company.com"
                className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-3 pl-12 pr-4 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm"
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <input 
                type="password" 
                required
                placeholder="••••••••"
                className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-3 pl-12 pr-4 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm"
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          {isLogin && (
            <div className="text-right">
              <button type="button" className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors">Forgot Password?</button>
            </div>
          )}

          <button 
            type="submit"
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl text-white font-bold flex items-center justify-center gap-2 shadow-xl shadow-blue-600/20 transition-all"
          >
            {isLogin ? 'Sign In' : 'Create Free Account'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="my-8 flex items-center gap-4 text-slate-700">
          <div className="flex-1 h-px bg-slate-800"></div>
          <span className="text-[10px] font-bold uppercase tracking-widest">Or Continue With</span>
          <div className="flex-1 h-px bg-slate-800"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 py-3 bg-slate-800 border border-slate-700 rounded-2xl text-sm font-semibold hover:bg-slate-700 transition-all">
            <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/></svg>
            Google
          </button>
          <button className="flex items-center justify-center gap-2 py-3 bg-slate-800 border border-slate-700 rounded-2xl text-sm font-semibold hover:bg-slate-700 transition-all">
            <Github className="w-4 h-4" />
            GitHub
          </button>
        </div>

        <div className="mt-10 text-center">
          <p className="text-slate-500 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-blue-400 hover:text-blue-300 transition-colors"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthFlow;
