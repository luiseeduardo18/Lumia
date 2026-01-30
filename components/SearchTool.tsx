
import React, { useState } from 'react';
import { Search, Globe, ExternalLink, Loader2 } from 'lucide-react';
import { performDeepSearch } from '../services/geminiService';

const SearchTool: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{ text: string, sources: any[] } | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsLoading(true);
    try {
      const data = await performDeepSearch(query);
      setResults(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-8 max-w-4xl mx-auto w-full overflow-y-auto">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Busca IA com Grounding</h1>
        <p className="text-slate-400">Respostas precisas conectadas em tempo real com a web.</p>
      </div>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ex: Quem venceu o prêmio Nobel de Química em 2024?"
            className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none text-slate-200 transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          <button
            disabled={isLoading || !query}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Buscar"}
          </button>
        </div>
      </form>

      {results && (
        <div className="space-y-6">
          <div className="bg-slate-800/30 border border-slate-800 rounded-2xl p-6">
            <h2 className="flex items-center gap-2 text-blue-400 font-semibold mb-4 text-sm">
              <Globe className="w-4 h-4" /> Resposta Sintetizada
            </h2>
            <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
              {results.text}
            </div>
          </div>

          {results.sources.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.sources.map((src, i) => (
                <a 
                  key={i} 
                  href={src.web?.uri} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/30 group transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Fonte {i+1}</span>
                    <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-blue-400" />
                  </div>
                  <p className="text-xs font-medium text-slate-300 line-clamp-2">{src.web?.title || src.web?.uri}</p>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchTool;
