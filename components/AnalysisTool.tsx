
import React, { useState } from 'react';
import { Upload, Link as LinkIcon, FileText, Brain, Loader2, Send, CreditCard } from 'lucide-react';
import { summarizeContent } from '../services/geminiService';
import { User } from '../types';

interface AnalysisToolProps {
  useCredits: (amount: number) => boolean;
  user: User;
}

const AnalysisTool: React.FC<AnalysisToolProps> = ({ useCredits, user }) => {
  const [content, setContent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleProcess = async () => {
    if (!content.trim()) return;
    setError(null);

    const hasCredits = useCredits(5);
    if (!hasCredits) {
      setError("Insufficient credits. Please upgrade your plan.");
      return;
    }

    setIsProcessing(true);
    try {
      const summary = await summarizeContent(content);
      setResult(summary || "No summary could be generated.");
    } catch (err) {
      console.error(err);
      setError("Error processing content.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-8 max-w-6xl mx-auto w-full overflow-y-auto">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="text-blue-400" />
            New Deep Analysis
          </h1>
          <p className="text-slate-400 text-sm">Paste text or URL for Lumia to analyze. (Cost: 5 Credits)</p>
        </div>
        <div className="px-4 py-2 bg-slate-800 rounded-xl text-xs flex items-center gap-2">
          <CreditCard className="w-3 h-3 text-blue-400" />
          <span className="font-bold text-slate-200">{user.credits} Available</span>
        </div>
      </header>

      {error && (
        <div className="mb-6 p-4 bg-red-400/10 border border-red-400/20 text-red-400 text-xs rounded-xl flex items-center gap-2">
          <span className="font-bold">Error:</span> {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        <div className="flex flex-col gap-4">
          <div className="flex-1 bg-slate-800/20 border border-slate-800 rounded-3xl flex flex-col p-6 focus-within:border-blue-500/50 transition-all">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste text, meeting notes, or article URL..."
              className="flex-1 bg-transparent border-none outline-none resize-none text-slate-200 placeholder-slate-600 text-sm leading-relaxed"
            />
            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="flex gap-2">
                <button className="p-2.5 text-slate-500 hover:text-slate-300 hover:bg-slate-700/50 rounded-xl transition-all">
                  <Upload className="w-4 h-4" />
                </button>
                <button className="p-2.5 text-slate-500 hover:text-slate-300 hover:bg-slate-700/50 rounded-xl transition-all">
                  <LinkIcon className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleProcess}
                disabled={isProcessing || !content}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20"
              >
                {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                Analyze Now
              </button>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/30 border border-slate-800 rounded-3xl p-8 flex flex-col">
          <h2 className="font-semibold text-slate-300 mb-6 border-b border-slate-800 pb-4 flex justify-between items-center">
            IA Result
            {result && <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded uppercase tracking-widest font-bold">Success</span>}
          </h2>
          <div className="flex-1 overflow-y-auto pr-2">
            {!result && !isProcessing && (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4">
                <FileText className="w-12 h-12 opacity-20" />
                <p className="text-sm">Awaiting content for processing...</p>
              </div>
            )}
            
            {isProcessing && (
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                <div className="h-4 bg-slate-700 rounded w-full"></div>
                <div className="h-4 bg-slate-700 rounded w-5/6"></div>
              </div>
            )}

            {result && (
              <div className="prose prose-invert max-w-none text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                {result}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisTool;
