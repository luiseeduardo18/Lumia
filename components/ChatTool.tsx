
import React, { useState, useEffect, useRef } from 'react';
import { Send, Plus, MessageSquare, History, Loader2, Trash2 } from 'lucide-react';
import { ChatSession, Message } from '../types';
import { chatWithContext } from '../services/geminiService';

const STORAGE_KEY = 'lumia_chat_sessions';

const ChatTool: React.FC = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load history on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSessions(parsed);
        if (parsed.length > 0) setCurrentSessionId(parsed[0].id);
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Save history on change
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    }
  }, [sessions]);

  // Scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [sessions, currentSessionId]);

  const currentSession = sessions.find(s => s.id === currentSessionId);

  const startNewChat = () => {
    const newId = Date.now().toString();
    const newSession: ChatSession = {
      id: newId,
      title: 'Nova Conversa',
      messages: [],
      lastUpdate: Date.now()
    };
    setSessions([newSession, ...sessions]);
    setCurrentSessionId(newId);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    let targetSessionId = currentSessionId;
    let currentSessions = [...sessions];

    if (!targetSessionId) {
      const newId = Date.now().toString();
      const newSession: ChatSession = {
        id: newId,
        title: input.slice(0, 30) + '...',
        messages: [],
        lastUpdate: Date.now()
      };
      currentSessions = [newSession, ...currentSessions];
      setSessions(currentSessions);
      setCurrentSessionId(newId);
      targetSessionId = newId;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    const updatedSessions = currentSessions.map(s => {
      if (s.id === targetSessionId) {
        return {
          ...s,
          messages: [...s.messages, userMessage],
          lastUpdate: Date.now(),
          title: s.messages.length === 0 ? input.slice(0, 30) : s.title
        };
      }
      return s;
    });

    setSessions(updatedSessions);
    setInput('');
    setIsLoading(true);

    try {
      const session = updatedSessions.find(s => s.id === targetSessionId);
      const history = session?.messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      })) || [];
      
      const response = await chatWithContext(input, history.slice(0, -1));

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response || 'Desculpe, não consegui processar isso.',
        timestamp: new Date()
      };

      setSessions(prev => prev.map(s => {
        if (s.id === targetSessionId) {
          return {
            ...s,
            messages: [...s.messages, assistantMessage],
            lastUpdate: Date.now()
          };
        }
        return s;
      }));
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filtered = sessions.filter(s => s.id !== id);
    setSessions(filtered);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    if (currentSessionId === id) {
      setCurrentSessionId(filtered[0]?.id || null);
    }
  };

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* History Sidebar */}
      <div className="w-72 bg-[#0b1120] border-r border-slate-800 flex flex-col">
        <div className="p-4">
          <button 
            onClick={startNewChat}
            className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/10"
          >
            <Plus className="w-4 h-4" /> Nova Conversa
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-2 space-y-1 pb-4">
          <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <History className="w-3 h-3" /> Histórico
          </div>
          {sessions.length === 0 ? (
            <div className="px-4 py-8 text-center text-xs text-slate-600 italic">Sem conversas passadas</div>
          ) : (
            sessions.map(s => (
              <button
                key={s.id}
                onClick={() => setCurrentSessionId(s.id)}
                className={`w-full text-left p-3 rounded-xl text-xs flex items-center justify-between group transition-all ${
                  currentSessionId === s.id 
                    ? 'bg-slate-800 text-slate-200 border border-slate-700' 
                    : 'text-slate-500 hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <MessageSquare className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{s.title}</span>
                </div>
                <Trash2 
                  onClick={(e) => deleteSession(s.id, e)}
                  className="w-3 h-3 text-slate-600 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all" 
                />
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col relative">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 pb-32">
          {!currentSession || currentSession.messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-white">Como posso ajudar hoje?</h2>
              <p className="text-slate-400 text-sm">
                Inicie uma conversa para analisar documentos, tirar dúvidas ou criar novos planos estratégicos.
              </p>
            </div>
          ) : (
            currentSession.messages.map(m => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10' 
                    : 'bg-slate-800/50 border border-slate-800 text-slate-200'
                }`}>
                  {m.content}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
                <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                <span className="text-xs text-slate-400">Lumia está processando...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0f172a] via-[#0f172a] to-transparent">
          <div className="max-w-4xl mx-auto flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-2xl focus-within:border-blue-500/50 transition-all">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Pergunte qualquer coisa para a Lumia..."
              className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-sm text-slate-200"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="p-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white rounded-xl transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatTool;
