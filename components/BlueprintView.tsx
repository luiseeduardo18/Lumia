
import React from 'react';
import { FileCode, Server, Shield, Smartphone, Globe, Code2, Database, Rocket } from 'lucide-react';

const BlueprintView: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col p-8 overflow-y-auto max-w-5xl mx-auto w-full pb-20">
      <header className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-blue-600 rounded-xl">
            <FileCode className="text-white w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Lumia AI - Technical Specification</h1>
            <p className="text-slate-400">Architectural Blueprint & Development Plan</p>
          </div>
        </div>
      </header>

      <div className="space-y-12">
        {/* Section 1 */}
        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
            <Code2 className="text-blue-400" /> 1. Feature Breakdown
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
            <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-800">
              <h3 className="font-bold text-white mb-2">Análise Multimodal</h3>
              <p>Processamento de PDFs, DOCX, Imagens e URLs com extração de texto via OCR e Parsing semântico.</p>
            </div>
            <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-800">
              <h3 className="font-bold text-white mb-2">Resumo Personalizado</h3>
              <p>Controle de tom (formal, informal) e nível de detalhamento (executivo, técnico, lista de tópicos).</p>
            </div>
            <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-800">
              <h3 className="font-bold text-white mb-2">Busca com Grounding</h3>
              <p>Integração com Google Search para validar informações e fornecer links de fontes confiáveis.</p>
            </div>
            <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-800">
              <h3 className="font-bold text-white mb-2">Colaboração e Gestão</h3>
              <p>Pastas compartilhadas, tags de organização, exportação para Markdown/PDF e controle de créditos.</p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
            <Server className="text-purple-400" /> 2. Tech Stack Recomendada
          </h2>
          <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
            <li><strong>Frontend:</strong> React 19, TypeScript, Tailwind CSS, Lucide Icons.</li>
            <li><strong>AI Core:</strong> Google Gemini API (2.5 Flash Lite para baixa latência, 3 Pro para lógica complexa).</li>
            <li><strong>Backend:</strong> Node.js with NestJS or Python (FastAPI).</li>
            <li><strong>Database:</strong> PostgreSQL (Metadata) + Vector DB (Pinecone/Milvus) para RAG.</li>
            <li><strong>Auth:</strong> Clerk or Supabase Auth.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
            <Smartphone className="text-emerald-400" /> 3. Prompt Engineering
          </h2>
          <div className="p-6 bg-slate-900 border border-slate-700 rounded-xl font-mono text-xs overflow-x-auto">
            <p className="text-slate-500 mb-2">// System Prompt - Summarization</p>
            <pre className="text-blue-300">
{`"role": "system",
"content": "Você é o 'Lumia', um analista de dados especialista em síntese.
Seu objetivo é processar o conteúdo do usuário e retornar:
1. Resumo Executivo (3 frases)
2. Pontos Chave (Bullet points)
3. Próximos Passos Sugeridos
4. Termos Técnicos definidos
Utilize o idioma de entrada para a resposta, a menos que solicitado o contrário."`}
            </pre>
          </div>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
            <Database className="text-orange-400" /> 4. Modular Architecture
          </h2>
          <div className="space-y-4 text-sm text-slate-300">
            <p><strong>Fluxo de Dados:</strong></p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Client envia documento para S3 Bucket.</li>
              <li>Webhook dispara Job de extração no Worker Service.</li>
              <li>Texto extraído é fragmentado (Chunking) e enviado para Gemini para Embeddings.</li>
              <li>Embeddings salvos no Vector Database.</li>
              <li>LLM gera resumo/insight baseado no contexto recuperado.</li>
            </ol>
          </div>
        </section>

        {/* Section 5 & 6 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2"><Globe className="text-cyan-400 w-5 h-5" /> APIs & Endpoints</h2>
            <div className="text-xs space-y-2 text-slate-400">
              <p><code className="text-emerald-400">POST /v1/process</code>: Envio de URL/Doc</p>
              <p><code className="text-emerald-400">GET /v1/knowledge</code>: Listagem paginada</p>
              <p><code className="text-emerald-400">POST /v1/chat</code>: Interface de Q&A contextual</p>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2"><Shield className="text-red-400 w-5 h-5" /> Security</h2>
            <div className="text-xs space-y-2 text-slate-400">
              <p>• AES-256 para dados em repouso.</p>
              <p>• PII Redaction (opcional) antes do envio para APIs de terceiros.</p>
              <p>• Rate limiting por API Key para evitar abusos de custos.</p>
            </div>
          </div>
        </section>

        {/* Launch Plan */}
        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
            <Rocket className="text-yellow-400" /> Launch Plan (Checklist)
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400">
            <li className="flex items-center gap-2"><input type="checkbox" readOnly checked /> Landing Page Conversion optimized</li>
            <li className="flex items-center gap-2"><input type="checkbox" readOnly checked /> Stripe Integration for Credits</li>
            <li className="flex items-center gap-2"><input type="checkbox" readOnly checked /> Unit & E2E Testing with Playwright</li>
            <li className="flex items-center gap-2"><input type="checkbox" readOnly checked /> CI/CD via GitHub Actions</li>
            <li className="flex items-center gap-2"><input type="checkbox" readOnly checked /> Monitoring with Sentry & PostHog</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default BlueprintView;
