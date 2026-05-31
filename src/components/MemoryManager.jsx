import React, { useState } from 'react';
import { 
  Brain, 
  Search, 
  Plus, 
  Database, 
  Trash2,
  Calendar,
  Layers,
  Fingerprint,
  Cpu
} from 'lucide-react';

export default function MemoryManager({ memory, setMemory, addNotification }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [memoryType, setMemoryType] = useState('company_fact');
  const [memoryContent, setMemoryContent] = useState('');
  const [metadataField, setMetadataField] = useState('');
  const [selectedVectorIndex, setSelectedVectorIndex] = useState(null);

  // Cosine Similarity search mock
  const filteredMemory = memory.filter(item => {
    const textMatch = item.content.toLowerCase().includes(searchQuery.toLowerCase());
    const typeMatch = item.memoryType.toLowerCase().includes(searchQuery.toLowerCase());
    return textMatch || typeMatch;
  });

  const handleDelete = (id) => {
    setMemory(prev => prev.filter(item => item.id !== id));
    addNotification('Object deleted successfully from PostgreSQL pgvector RAG memory store.');
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!memoryContent) return;

    // Generate simulated 1536 floats array
    const simulatedVector = Array.from({ length: 1536 }, () => Number((Math.random() * 2 - 1).toFixed(4)));

    const newMemory = {
      id: `mem_${Date.now()}`,
      memoryType: memoryType,
      content: memoryContent,
      metadata: { scope: metadataField || 'global' },
      embedding: simulatedVector,
      createdAt: new Date().toISOString()
    };

    setMemory(prev => [newMemory, ...prev]);
    setMemoryContent('');
    setMetadataField('');
    setShowAddForm(false);
    addNotification('New memory successfully tokenized and embedded into Vector Database (1536 dimensions).');
  };

  // Helper for generating visual mock vectors
  const renderSimulatedVector = (arr) => {
    if (!arr) return null;
    const slices = arr.slice(0, 36);
    return (
      <div className="bg-black/50 p-3 rounded-xl border border-cyber-border/80 font-mono text-[9px] text-green-400 select-all max-h-24 overflow-y-auto leading-normal">
        <div className="text-[8px] text-slate-500 mb-1 border-b border-cyber-border pb-1 select-none">
          EMBEDDING VECTOR (1536 FLOATS ARRAY - pgvector)
        </div>
        [
        {slices.map((val, i) => (
          <span key={i} className="mx-0.5">
            {val.toFixed(4)},
          </span>
        ))}
        ... 1500 more dimensions ]
      </div>
    );
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'contact_preference': return 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/25';
      case 'company_fact': return 'bg-cyber-purple/10 text-cyber-purple border border-cyber-purple/25';
      case 'writing_style': return 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/25';
      default: return 'bg-slate-500/10 text-slate-400 border border-slate-500/25';
    }
  };

  return (
    <div className="p-8 space-y-6 select-none max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-cyber-border/40 pb-5">
        <div>
          <h2 className="text-xl font-bold font-sans tracking-wide text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-cyber-purple" />
            Long-Term Vector Memory (pgvector RAG)
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-1">
            Browse corporate knowledge tokens, customized writing style anchors, and contact communication habits cached for AI context injections.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2.5 rounded-xl bg-cyber-purple/20 text-cyber-purple border border-cyber-purple/40 font-semibold text-xs flex items-center gap-2 transition-all duration-300 hover:bg-cyber-purple/35"
        >
          <Plus className="w-4 h-4" />
          Inject Knowledge Vector
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Memory Grid Lists (Left/Mid) */}
        <div className="lg:col-span-2 space-y-5">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search Vector Database (e.g. Cosine Similarity index match)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/20 border border-cyber-border/80 rounded-xl pl-11 pr-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-cyber-purple focus:ring-1 focus:ring-cyber-purple/20 select-text font-sans"
            />
          </div>

          {/* Inject Knowledge Vector Form */}
          {showAddForm && (
            <form onSubmit={handleSave} className="glassmorphic p-6 rounded-2xl border border-cyber-purple/40 bg-black/45 space-y-4 animate-fadeIn">
              <h3 className="text-xs font-mono font-bold text-cyber-purple uppercase tracking-wider">
                TOKENIZE & EMBED CORPORATE KNOWLEDGE
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase">Knowledge Type</label>
                  <select
                    value={memoryType}
                    onChange={(e) => setMemoryType(e.target.value)}
                    className="w-full bg-black/40 border border-cyber-border rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyber-purple"
                  >
                    <option value="company_fact">Company Fact (RAG)</option>
                    <option value="contact_preference">Contact Preference</option>
                    <option value="writing_style">Writing Style Anchor</option>
                    <option value="email_thread_context">Thread Context cache</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase">Scope / Metadata Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. sconnor@cyberdyne.com"
                    value={metadataField}
                    onChange={(e) => setMetadataField(e.target.value)}
                    className="w-full bg-black/40 border border-cyber-border rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyber-purple"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase">Content Text (Raw Knowledge)</label>
                <textarea
                  required
                  placeholder="e.g. Cyberdyne Systems standard SLA demands responses to hardware alerts in less than 4 hours."
                  value={memoryContent}
                  onChange={(e) => setMemoryContent(e.target.value)}
                  className="w-full h-24 bg-black/40 border border-cyber-border rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-cyber-purple resize-none focus:ring-1 focus:ring-cyber-purple/20"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyber-purple to-indigo-600 text-white font-bold text-xs flex items-center gap-1.5 hover:shadow-lg hover:shadow-cyber-purple/20 transition-all duration-300"
                >
                  <Fingerprint className="w-3.5 h-3.5" />
                  Generate Embeddings & Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-cyber-border text-slate-300 font-semibold text-xs transition-all duration-300 hover:bg-white/10"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Memory Items List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 select-text">
            {filteredMemory.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setSelectedVectorIndex(selectedVectorIndex === idx ? null : idx)}
                className={`glassmorphic p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  selectedVectorIndex === idx ? 'border-cyber-purple bg-black/20 ring-1 ring-cyber-purple/20' : 'border-cyber-border bg-black/10 hover:border-cyber-border/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3 select-none">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono capitalize ${getTypeBadge(item.memoryType)}`}>
                      {item.memoryType.replace('_', ' ')}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id);
                      }}
                      className="p-1.5 text-slate-500 hover:text-red-400 transition-colors duration-300"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-sans font-medium mb-3">
                    {item.content}
                  </p>
                </div>

                <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono select-none pt-2.5 border-t border-cyber-border/40">
                  <span className="flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-cyber-purple" />
                    Scope: {item.metadata.sender || item.metadata.domain || item.metadata.scope}
                  </span>
                  <span>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vector inspector panel (Right) */}
        <div className="glassmorphic p-5 rounded-2xl border border-cyber-border space-y-4 h-[500px] flex flex-col select-text">
          <div className="flex items-center justify-between border-b border-cyber-border/40 pb-3 mb-2 select-none">
            <h3 className="text-xs font-mono font-bold text-cyber-blue flex items-center gap-1.5 uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-cyber-blue" />
              pgvector Inspector
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">1536 Dimensions</span>
          </div>

          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            {selectedVectorIndex !== null && filteredMemory[selectedVectorIndex] ? (
              <div className="space-y-4 h-full flex flex-col">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Selected Object Token</span>
                  <p className="text-xs font-semibold text-white truncate font-sans">
                    {filteredMemory[selectedVectorIndex].content}
                  </p>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {renderSimulatedVector(
                    filteredMemory[selectedVectorIndex].embedding || 
                    Array.from({ length: 1536 }, () => Number((Math.random() * 2 - 1).toFixed(4)))
                  )}
                </div>

                <div className="p-3 bg-cyber-blue/5 border border-cyber-blue/10 rounded-xl space-y-1.5 select-none">
                  <h4 className="text-[10px] font-bold text-cyber-blue uppercase font-sans">Semantic Search Query Syntax:</h4>
                  <code className="text-[9px] font-mono text-slate-300 block select-all">
                    SELECT content, cosine_distance(embedding, $query_vector) AS score<br/>
                    FROM agent_memory_vectors<br/>
                    ORDER BY embedding &lt;=&gt; $query_vector LIMIT 5;
                  </code>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 italic p-6 select-none">
                Select any memory vector card on the left to inspect its dense float embedding coordinates inside the Postgres vector engine.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
