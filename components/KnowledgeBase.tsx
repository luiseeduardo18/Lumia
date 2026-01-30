
import React from 'react';
import { Search, Filter, MoreVertical, FileText, Link as LinkIcon } from 'lucide-react';

const KnowledgeBase: React.FC = () => {
  const items = [
    { id: 1, title: 'Resumo: Mercado de IA 2025', date: 'Há 2 horas', type: 'Análise' },
    { id: 2, title: 'URL: Documentação Gemini API', date: 'Ontem', type: 'Link' },
    { id: 3, title: 'Resumo: Reunião de Planejamento', date: '3 de Out', type: 'Análise' },
    { id: 4, title: 'Pesquisa: Vieses em LLMs', date: '28 de Set', type: 'Busca' },
  ];

  return (
    <div className="flex-1 flex flex-col p-8 overflow-y-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Minha Lista</h1>
          <p className="text-slate-400 text-sm">Gerencie seu conhecimento e histórico de análises.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Pesquisar na lista..." 
              className="bg-slate-800 border border-slate-700 rounded-lg py-1.5 pl-9 pr-4 text-xs focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>
          <button className="p-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-slate-800/20 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-slate-500">
              <th className="px-6 py-4 font-medium uppercase tracking-wider text-[10px]">Nome</th>
              <th className="px-6 py-4 font-medium uppercase tracking-wider text-[10px]">Tipo</th>
              <th className="px-6 py-4 font-medium uppercase tracking-wider text-[10px]">Data</th>
              <th className="px-6 py-4 font-medium uppercase tracking-wider text-[10px] w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-800/30 transition-colors group cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-blue-400">
                      {item.type === 'Link' ? <LinkIcon className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                    </div>
                    <span className="font-medium text-slate-300">{item.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-400 font-bold border border-slate-700">{item.type}</span>
                </td>
                <td className="px-6 py-4 text-slate-500 text-xs">{item.date}</td>
                <td className="px-6 py-4">
                  <button className="p-1 hover:bg-slate-700 rounded transition-colors">
                    <MoreVertical className="w-4 h-4 text-slate-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KnowledgeBase;
