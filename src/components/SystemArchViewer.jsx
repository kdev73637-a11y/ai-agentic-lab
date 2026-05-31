import React, { useState } from 'react';
import { 
  Network, 
  Database, 
  Terminal, 
  ChevronRight, 
  ShieldAlert, 
  Layers, 
  Sparkles,
  GitPullRequest,
  CheckCircle,
  Copy
} from 'lucide-react';

export default function SystemArchViewer({ addNotification }) {
  const [activeTab, setActiveTab] = useState('diagram'); // diagram, postgres, webhooks
  const [selectedAgentNode, setSelectedAgentNode] = useState('reader');

  const agentNodes = {
    reader: {
      name: "1. Email Reader Agent",
      role: "Parser & Entity Extractor",
      endpoint: "/api/v1/agents/reader",
      prompt: `Extract sender metadata, subject and clean the raw email body by stripping HTML markup and promotional structures. Output cleaner payload schemas.`,
      input: `{ "raw_email_id": "msg_992" }`,
      output: `{ "sender": { "name": "Sarah Connor", "email": "sconnor@cyberdyne.com" }, "subject": "Anomaly backup logs", "clean_body": "Hi Developer team..." }`
    },
    security: {
      name: "2. Security & Spam Agent",
      role: "Phishing Shield & PII Redactor",
      endpoint: "/api/v1/agents/security",
      prompt: `Analyze sender domain authentication headers, evaluate links for suspicious fraud redirects, locate API tokens/credit cards and redact them to [REDACTED] tags.`,
      input: `{ "sender": "sconnor@cyberdyne.com", "body": "My AWS API Key is AKIAIOSFODNN..." }`,
      output: `{ "is_spam": false, "phishing_score": 5, "pii_redacted": true, "safe_body": "My AWS API Key is [REDACTED_AWS_API_KEY]..." }`
    },
    intent: {
      name: "3. Intent Detection Agent",
      role: "Task & Sync Scheduler",
      endpoint: "/api/v1/agents/intent",
      prompt: `Scrutinize emails to map primary sender goals (meeting slots, sales queries, support issues). Extract action items, dates, and relative timelines into ISO items.`,
      input: `{ "body": "Re-run the script by Friday morning at 9:00 AM PST..." }`,
      output: `{ "primary_intent": "Client Request", "action_items": ["Re-run the script"], "deadlines": [{ "date": "2026-05-29T09:00:00-08:00", "description": "Friday morning audit" }] }`
    },
    sentiment: {
      name: "4. Sentiment Analysis Agent",
      role: "Tone & Intensity Analyst",
      endpoint: "/api/v1/agents/sentiment",
      prompt: `Detect text tone (happy, angry, urgent, neutral) and grade emotional distress ratios on a scale of 1 to 10 to help scale priority vectors.`,
      input: `{ "body": "Otherwise we risk audit failure!..." }`,
      output: `{ "tone": "urgent", "emotional_intensity": 8 }`
    },
    priority: {
      name: "5. Priority Scoring Agent",
      role: "Core Priority Assigner",
      endpoint: "/api/v1/agents/priority",
      prompt: `Combine Intent, Sentiment, and Security scores. Factor in sender identity and authority structures to assign a global Priority Score (0-100) and category.`,
      input: `{ "intent": "Client Request", "sentiment": { "tone": "urgent", "intensity": 8 } }`,
      output: `{ "score": 92, "category": "Client Requests", "urgency_level": "critical" }`
    },
    writer: {
      name: "6. Reply Writer Agent",
      role: "RAG Context & Draft Writer",
      endpoint: "/api/v1/agents/reply-writer",
      prompt: `Retrieve matched vector coordinates from pgvector RAG memory stores using sender email. Draft contextual drafts matching default writing style instructions.`,
      input: `{ "email_context": "...", "vector_memory": ["Sarah Connor prefers direct responses"] }`,
      output: `{ "draft": "Hi Sarah Connor, Understood on the cloud logs anomaly..." }`
    },
    automation: {
      name: "7. Task Automation Agent",
      role: "Direct Integration Streamer",
      endpoint: "/api/v1/agents/automation",
      prompt: `Evaluate custom user-configured direct automation rule blocks. Map triggered results, compile webhook JSON payloads, and post data to Notion/Slack pipelines.`,
      input: `{ "priority_score": 92, "action_items": ["Inspect anomaly logs"] }`,
      output: `{ "dispatched_webhooks": [{ "provider": "slack", "channel": "#ops-escalations", "status": 200 }] }`
    }
  };

  const postgresCode = `-- pgvector RAG Schema for Antigravity 2.0
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector"; -- Vector Extension Active

CREATE TABLE agent_memory_vectors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    memory_type VARCHAR(50) NOT NULL CHECK (memory_type IN ('contact_preference', 'company_fact', 'email_thread_context', 'writing_style')),
    content TEXT NOT NULL,
    embedding VECTOR(1536) NOT NULL, -- OpenAI Text Embedding 3
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Cosine Distance index
CREATE INDEX ON agent_memory_vectors USING hnsw (embedding vector_cosine_ops);`;

  const webhookJson = `{
  "event": "email.processed",
  "timestamp": "2026-05-27T08:15:22.912Z",
  "org_id": "org_cf39a1a2",
  "data": {
    "email_id": "msg_182bc83f0c1",
    "sender": "sconnor@cyberdyne.com",
    "priority_score": 92,
    "category": "Client Requests",
    "sentiment": "urgent",
    "actions_extracted": [
      "Inspect AWS cloud backup storage anomaly logs",
      "Re-run database backup compilation script"
    ],
    "draft_reply_url": "https://api.antigravity.ai/v1/drafts/dr_991823ab"
  }
}`;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    addNotification('Configuration payload copied to clipboard.');
  };

  return (
    <div className="p-8 space-y-6 select-none max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-cyber-border/40 pb-5">
        <div>
          <h2 className="text-xl font-bold font-sans tracking-wide text-white flex items-center gap-2">
            <Network className="w-5 h-5 text-cyber-purple" />
            Developer Console & Systems Architecture
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-1">
            Inspect the underlying micro-agent pipelines, database migrations, pgvector indices, and webhook schemas supporting Antigravity 2.0.
          </p>
        </div>
        
        {/* Navigation tabs */}
        <div className="flex items-center gap-2 bg-black/35 p-1 rounded-xl border border-cyber-border">
          {['diagram', 'postgres', 'webhooks'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold capitalize transition-all duration-300 ${
                activeTab === tab 
                  ? 'bg-cyber-purple text-white' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab === 'postgres' ? 'SQL Schema' : tab === 'webhooks' ? 'Webhooks API' : 'Multi-Agent Pipeline'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Tab content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start select-text">
        {/* Left Column (Mid/Full) */}
        <div className="lg:col-span-2">
          {activeTab === 'diagram' && (
            <div className="glassmorphic p-6 rounded-2xl border border-cyber-border space-y-6">
              <div className="flex justify-between items-center mb-2 select-none">
                <h3 className="text-xs font-mono font-bold text-cyber-purple uppercase tracking-wider">
                  PIPELINE FLOW GRAPH & SCHEMATICS
                </h3>
                <span className="text-[10px] text-slate-500 font-mono">Click agent nodes to inspect properties</span>
              </div>

              {/* Graphical nodes chain layout */}
              <div className="space-y-4 select-none">
                {Object.keys(agentNodes).map((nodeKey) => {
                  const node = agentNodes[nodeKey];
                  const isSelected = selectedAgentNode === nodeKey;
                  return (
                    <div key={nodeKey} className="flex flex-col items-center">
                      <button
                        onClick={() => setSelectedAgentNode(nodeKey)}
                        className={`w-full p-4 rounded-xl border transition-all duration-300 text-left flex items-center justify-between ${
                          isSelected 
                            ? 'border-cyber-purple bg-cyber-purple/10 glow-purple ring-1 ring-cyber-purple/20' 
                            : 'border-cyber-border bg-black/20 hover:border-cyber-border/80'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                            isSelected ? 'bg-cyber-purple text-white shadow-md shadow-cyber-purple/20 animate-pulse' : 'bg-white/5 text-slate-400'
                          }`}>
                            {node.name[0]}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white font-sans">{node.name}</h4>
                            <p className="text-[10px] text-slate-400 font-mono mt-0.5">{node.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono text-slate-500">{node.endpoint}</span>
                          <ChevronRight className="w-4 h-4 text-slate-500" />
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'postgres' && (
            <div className="glassmorphic p-6 rounded-2xl border border-cyber-border space-y-4">
              <div className="flex justify-between items-center select-none">
                <span className="text-xs font-mono font-bold text-cyber-purple uppercase tracking-wider">
                  Postgres pgvector DB Migration
                </span>
                <button
                  onClick={() => copyToClipboard(postgresCode)}
                  className="px-2.5 py-1 rounded bg-white/5 border border-cyber-border hover:bg-white/10 text-slate-400 hover:text-white flex items-center gap-1.5 transition-all duration-300 text-[10px] font-mono"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy SQL
                </button>
              </div>

              <pre className="bg-black/50 p-4 rounded-xl border border-cyber-border font-mono text-[10px] text-slate-300 leading-relaxed overflow-x-auto select-all max-h-[500px]">
                {postgresCode}
              </pre>
            </div>
          )}

          {activeTab === 'webhooks' && (
            <div className="glassmorphic p-6 rounded-2xl border border-cyber-border space-y-4">
              <div className="flex justify-between items-center select-none">
                <span className="text-xs font-mono font-bold text-cyber-purple uppercase tracking-wider">
                  Webhook Event HTTP POST Schema (email.processed)
                </span>
                <button
                  onClick={() => copyToClipboard(webhookJson)}
                  className="px-2.5 py-1 rounded bg-white/5 border border-cyber-border hover:bg-white/10 text-slate-400 hover:text-white flex items-center gap-1.5 transition-all duration-300 text-[10px] font-mono"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy JSON
                </button>
              </div>

              <pre className="bg-black/50 p-4 rounded-xl border border-cyber-border font-mono text-[10px] text-green-400 leading-relaxed overflow-x-auto select-all">
                {webhookJson}
              </pre>
            </div>
          )}
        </div>

        {/* Right Column: Node Inspector */}
        <div className="glassmorphic p-5 rounded-2xl border border-cyber-border space-y-4 h-[580px] flex flex-col">
          <div className="flex items-center justify-between border-b border-cyber-border/40 pb-3 mb-2 select-none">
            <h3 className="text-xs font-mono font-bold text-cyber-blue flex items-center gap-1.5 uppercase tracking-wider">
              <Terminal className="w-4 h-4 text-cyber-blue" />
              Node Prompt Inspector
            </h3>
            <span className="text-[9px] text-slate-500 font-mono">Agent Properties</span>
          </div>

          {activeTab === 'diagram' && selectedAgentNode && agentNodes[selectedAgentNode] ? (
            <div className="flex-1 flex flex-col justify-between overflow-hidden space-y-4 font-mono text-[10px]">
              <div className="space-y-1 select-none">
                <span className="text-[9px] text-slate-500 uppercase">Selected Node</span>
                <h4 className="text-xs font-bold text-white font-sans">
                  {agentNodes[selectedAgentNode].name}
                </h4>
              </div>

              <div className="space-y-1.5">
                <span className="text-[9px] text-slate-500 uppercase select-none">SYSTEM INSTRUCTIONS</span>
                <p className="p-3 bg-black/45 rounded-xl border border-cyber-border/80 text-slate-300 leading-relaxed font-sans select-text">
                  {agentNodes[selectedAgentNode].prompt}
                </p>
              </div>

              <div className="space-y-1.5 flex-1 overflow-hidden flex flex-col">
                <span className="text-[9px] text-slate-500 uppercase select-none">NODE CONTEXT SCHEMAS</span>
                <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 select-text">
                  <div className="space-y-1">
                    <div className="text-[8px] text-slate-500 font-semibold select-none">INPUT payload:</div>
                    <pre className="bg-black/30 p-2.5 rounded-lg border border-cyber-border text-amber-300 overflow-x-auto text-[9px]">{agentNodes[selectedAgentNode].input}</pre>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[8px] text-slate-500 font-semibold select-none">OUTPUT payload:</div>
                    <pre className="bg-black/30 p-2.5 rounded-lg border border-cyber-border text-green-400 overflow-x-auto text-[9px]">{agentNodes[selectedAgentNode].output}</pre>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-cyber-purple/5 border border-cyber-purple/10 rounded-xl flex items-center gap-2 select-none">
                <Sparkles className="w-4 h-4 text-cyber-purple" />
                <span className="text-[9px] text-slate-400 font-sans leading-tight">
                  Token optimization active. Compression factor: 4.2x raw contexts.
                </span>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 italic p-6 select-none">
              Inspect the structural sequence pipeline by clicking any agent node list on the left to read its dynamic prompts and REST JSON patterns.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
