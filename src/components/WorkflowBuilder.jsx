import React, { useState } from 'react';
import { 
  GitFork, 
  Plus, 
  Trash2, 
  ToggleLeft, 
  ToggleRight, 
  MessageSquare, 
  Database, 
  Calendar, 
  ChevronRight, 
  Play,
  Save,
  CheckCircle2,
  Cpu
} from 'lucide-react';

export default function WorkflowBuilder({ rules, setRules, workflowHistory }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRuleName, setNewRuleName] = useState('');
  const [newRulePriority, setNewRulePriority] = useState(80);
  const [newRuleCategory, setNewRuleCategory] = useState('client_request');
  const [newRuleProvider, setNewRuleProvider] = useState('slack');
  const [newRuleTarget, setNewRuleTarget] = useState('#ops-alerts');

  // Toggle Rule active state
  const toggleRule = (id) => {
    setRules(prev => prev.map(rule => 
      rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
    ));
  };

  // Delete a rule
  const deleteRule = (id) => {
    setRules(prev => prev.filter(rule => rule.id !== id));
  };

  // Add custom rule
  const saveRule = (e) => {
    e.preventDefault();
    if (!newRuleName) return;

    const newRule = {
      id: `rule_${Date.now()}`,
      name: newRuleName,
      isActive: true,
      triggerConditions: {
        priorityMin: Number(newRulePriority),
        categories: [newRuleCategory]
      },
      actionProvider: newRuleProvider,
      actionConfig: {
        channel: newRuleProvider === 'slack' ? newRuleTarget : undefined,
        database: newRuleProvider === 'notion' ? newRuleTarget : undefined,
        pipeline: newRuleProvider === 'hubspot' ? newRuleTarget : undefined,
        calendar: newRuleProvider === 'calendar' ? newRuleTarget : undefined
      }
    };

    setRules(prev => [...prev, newRule]);
    setNewRuleName('');
    setShowAddForm(false);
  };

  const getProviderIcon = (provider) => {
    switch (provider) {
      case 'slack': return <MessageSquare className="w-5 h-5 text-[#4a154b]" />;
      case 'notion': return <Database className="w-5 h-5 text-white" />;
      case 'hubspot': return <Cpu className="w-5 h-5 text-orange-500" />;
      default: return <Calendar className="w-5 h-5 text-cyber-blue" />;
    }
  };

  return (
    <div className="p-8 space-y-6 select-none max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-cyber-border/40 pb-5">
        <div>
          <h2 className="text-xl font-bold font-sans tracking-wide text-white flex items-center gap-2">
            <GitFork className="w-5 h-5 text-cyber-purple" />
            AI Workflow Automation Engine
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-1">
            Construct and coordinate direct event-driven micro-workflows mapped to real-time AI email classifications.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2.5 rounded-xl bg-cyber-purple/20 text-cyber-purple border border-cyber-purple/40 font-semibold text-xs flex items-center gap-2 transition-all duration-300 hover:bg-cyber-purple/35"
        >
          <Plus className="w-4 h-4" />
          Create Automated Rule
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Rules column (Left/Mid) */}
        <div className="lg:col-span-2 space-y-5">
          {/* Create Custom Rule Form */}
          {showAddForm && (
            <form onSubmit={saveRule} className="glassmorphic p-6 rounded-2xl border border-cyber-purple/40 bg-black/45 space-y-4 animate-fadeIn">
              <h3 className="text-xs font-mono font-bold text-cyber-purple uppercase tracking-wider">
                CONFIGURE EVENT-DRIVEN AUTOMATION RULE
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase">Rule Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sync VIP Leads to Salesforce"
                    value={newRuleName}
                    onChange={(e) => setNewRuleName(e.target.value)}
                    className="w-full bg-black/40 border border-cyber-border rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyber-purple"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase">Trigger Category</label>
                  <select
                    value={newRuleCategory}
                    onChange={(e) => setNewRuleCategory(e.target.value)}
                    className="w-full bg-black/40 border border-cyber-border rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyber-purple"
                  >
                    <option value="client_request">Client Request</option>
                    <option value="urgent">Urgent</option>
                    <option value="meetings">Meetings</option>
                    <option value="support_ticket">Support Ticket</option>
                    <option value="finance">Finance</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase">Min Priority Threshold ({newRulePriority})</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={newRulePriority}
                    onChange={(e) => setNewRulePriority(e.target.value)}
                    className="w-full accent-cyber-purple mt-2"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase">Integration Target</label>
                  <select
                    value={newRuleProvider}
                    onChange={(e) => {
                      setNewRuleProvider(e.target.value);
                      setNewRuleTarget(
                        e.target.value === 'slack' ? '#ops-alerts' :
                        e.target.value === 'notion' ? 'Sprint Tasks Database' :
                        e.target.value === 'hubspot' ? 'API Enterprise Pipeline' :
                        'Google Calendar Shared'
                      );
                    }}
                    className="w-full bg-black/40 border border-cyber-border rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyber-purple"
                  >
                    <option value="slack">Slack Notification</option>
                    <option value="notion">Notion Database Task</option>
                    <option value="hubspot">Hubspot CRM Deal</option>
                    <option value="calendar">Google Calendar Invite</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase">Target Endpoint / Database Name</label>
                <input
                  type="text"
                  required
                  value={newRuleTarget}
                  onChange={(e) => setNewRuleTarget(e.target.value)}
                  className="w-full bg-black/40 border border-cyber-border rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyber-purple"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyber-purple to-indigo-600 text-white font-bold text-xs flex items-center gap-1.5 hover:shadow-lg hover:shadow-cyber-purple/20 transition-all duration-300"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save and Deploy Rule
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

          {/* Active Rules List */}
          <div className="space-y-4 select-text">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className={`glassmorphic p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                  rule.isActive ? 'border-cyber-border bg-black/20' : 'border-cyber-border/40 bg-black/5 opacity-55'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl border ${
                    rule.isActive ? 'bg-black/40 border-cyber-border text-white shadow-md' : 'bg-black/10 border-cyber-border/20 text-slate-500'
                  }`}>
                    {getProviderIcon(rule.actionProvider)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      {rule.name}
                      {!rule.isActive && (
                        <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-white/5 text-slate-500 border border-cyber-border uppercase">
                          PAUSED
                        </span>
                      )}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-mono mt-1">
                      Trigger IF category in [{rule.triggerConditions.categories.join(', ')}]
                      {rule.triggerConditions.priorityMin !== undefined && ` AND Priority >= ${rule.triggerConditions.priorityMin}`}
                    </p>
                    <p className="text-[10px] text-slate-500 font-sans mt-0.5">
                      Destination: {rule.actionConfig.channel || rule.actionConfig.database || rule.actionConfig.pipeline || rule.actionConfig.calendar}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 select-none">
                  <button
                    onClick={() => toggleRule(rule.id)}
                    className="p-1 text-slate-400 hover:text-white transition-colors duration-300"
                  >
                    {rule.isActive ? (
                      <ToggleRight className="w-8 h-8 text-cyber-purple glow-purple" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-slate-600" />
                    )}
                  </button>
                  <button
                    onClick={() => deleteRule(rule.id)}
                    className="p-2 text-slate-500 hover:text-red-400 transition-colors duration-300 hover:bg-red-500/5 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time execution log column (Right) */}
        <div className="glassmorphic p-5 rounded-2xl border border-cyber-border space-y-4 h-[500px] flex flex-col select-text">
          <div className="flex items-center justify-between border-b border-cyber-border/40 pb-3 mb-2 select-none">
            <h3 className="text-xs font-mono font-bold text-cyber-blue flex items-center gap-1.5 uppercase tracking-wider">
              <Cpu className="w-4 h-4 animate-pulse-glow text-cyber-blue" />
              Live Integration Stream
            </h3>
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400"></span>
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 font-mono text-[10px] selection:bg-cyber-purple">
            {workflowHistory.length > 0 ? (
              workflowHistory.map((item, i) => (
                <div key={i} className="bg-black/35 p-3 rounded-xl border border-cyber-border/60 space-y-1.5 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-cyber-blue uppercase tracking-tight">
                      {item.provider} payload
                    </span>
                    <span className="text-[8px] text-slate-500">
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-[9px] text-slate-300 border-l-2 border-cyber-blue pl-2 overflow-x-auto whitespace-pre-wrap select-all">
                    {JSON.stringify(item.payload, null, 2)}
                  </div>
                  <div className="flex items-center justify-between text-[8px] text-green-400 font-sans pt-1">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Status: 200 SUCCESS
                    </span>
                    <span>HTTPS Webhook POST</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 italic p-6 select-none">
                No active rule executions recorded yet. Open Priority Inbox, click an email, and click 'Run AI Agent Pipeline' to trigger automated rules.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
