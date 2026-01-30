
import React from 'react';
import { Check, ArrowLeft, Zap, Star, ShieldCheck } from 'lucide-react';
import { User, UserPlan } from '../types';

interface PricingProps {
  onBack: () => void;
  onPlanSelect?: (plan: UserPlan) => void;
  user?: User;
  setUser?: (user: User) => void;
}

const Pricing: React.FC<PricingProps> = ({ onBack, onPlanSelect, user, setUser }) => {
  const plans = [
    {
      id: UserPlan.FREE,
      name: "Free Plan",
      price: "$0",
      description: "Perfect for testing Lumia's core intelligence.",
      icon: Zap,
      features: [
        "50 Monthly Credits",
        "Standard Analysis Tool",
        "Global Search Grounding",
        "Knowledge Base (Up to 5 items)",
        "Standard AI Responses"
      ],
      cta: user ? (user.plan === UserPlan.FREE ? "Current Plan" : "Downgrade") : "Start Free",
      popular: false,
      color: "blue"
    },
    {
      id: UserPlan.PRO,
      name: "Pro Plan",
      price: "$9",
      period: "/mo",
      description: "Scale your intelligence and unlock agents.",
      icon: Star,
      features: [
        "500 Monthly Credits",
        "Unlock People Search Agent",
        "Unlimited Knowledge Base",
        "Priority Support",
        "Export to Markdown/PDF",
        "Faster Reasoning Models"
      ],
      cta: user ? (user.plan === UserPlan.PRO ? "Current Plan" : "Upgrade to Pro") : "Select Pro",
      popular: true,
      color: "indigo"
    },
    {
      id: UserPlan.PREMIUM,
      name: "Premium Plan",
      price: "$20",
      period: "/mo",
      description: "The ultimate power for power users and teams.",
      icon: ShieldCheck,
      features: [
        "5,000 Monthly Credits",
        "Early Access to New Agents",
        "Team Collaboration (Soon)",
        "Dedicated Account Manager",
        "API Access (Coming Soon)",
        "Advanced Data Security"
      ],
      cta: user ? (user.plan === UserPlan.PREMIUM ? "Current Plan" : "Go Premium") : "Select Premium",
      popular: false,
      color: "purple"
    }
  ];

  const handleSelect = (plan: UserPlan) => {
    if (setUser && user) {
      const creditsMap = {
        [UserPlan.FREE]: 50,
        [UserPlan.PRO]: 500,
        [UserPlan.PREMIUM]: 5000
      };
      const updatedUser = { ...user, plan, credits: creditsMap[plan] };
      setUser(updatedUser);
      localStorage.setItem('lumia_user', JSON.stringify(updatedUser));
      onBack();
    } else if (onPlanSelect) {
      onPlanSelect(plan);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#0f172a] p-8">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold mb-4">Choose your plan</h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Upgrade to unlock Lumia's full potential. Cancel or change plans anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`relative p-8 rounded-[32px] border transition-all ${
                plan.popular 
                  ? 'bg-slate-900 border-indigo-500 shadow-2xl shadow-indigo-500/10' 
                  : 'bg-slate-900/50 border-slate-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <div className={`w-12 h-12 rounded-2xl bg-${plan.color}-500/10 text-${plan.color}-400 flex items-center justify-center mb-6`}>
                  <plan.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-black">{plan.price}</span>
                  {plan.period && <span className="text-slate-500 font-medium">{plan.period}</span>}
                </div>
                <p className="text-sm text-slate-500">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-10">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <Check className={`w-4 h-4 text-${plan.color}-400 flex-shrink-0`} />
                    <span className="text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleSelect(plan.id)}
                disabled={user?.plan === plan.id}
                className={`w-full py-4 rounded-2xl font-bold text-sm transition-all ${
                  plan.popular
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/20'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-20 p-8 border border-slate-800 rounded-3xl bg-slate-900/30 text-center">
          <h4 className="font-bold text-lg mb-2">Frequently Asked Questions</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-8 max-w-4xl mx-auto">
            <div>
              <p className="font-bold text-sm text-white mb-2">How do credits work?</p>
              <p className="text-xs text-slate-500 leading-relaxed">Each tool consumes a specific amount of credits. Analysis is 5, People Search is 10, and Chat queries are 1.</p>
            </div>
            <div>
              <p className="font-bold text-sm text-white mb-2">Can I cancel anytime?</p>
              <p className="text-xs text-slate-500 leading-relaxed">Yes. Your subscription will remain active until the end of the billing period.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
