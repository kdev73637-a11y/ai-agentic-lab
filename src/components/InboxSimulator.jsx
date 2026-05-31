import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Send, 
  Clock, 
  Tag, 
  FileCode,
  Shield,
  Layers,
  ChevronRight,
  ThumbsUp,
  Sliders,
  Sparkles,
  ArrowRight,
  Database,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { getAgentSteps } from '../utils/simulationEngine';

export default function InboxSimulator({ 
  emails, 
  onEmailSelect, 
  selectedEmail, 
  memory, 
  rules, 
  triggerWorkflow, 
  addNotification 
}) {
  const [pipelineState, setPipelineState] = useState('idle'); // idle, running, completed
  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [steps, setSteps] = useState([]);
  const [pipelineContext, setPipelineContext] = useState(null);
  const [selectedReplyMode, setSelectedReplyMode] = useState('professional');
  const [draftContent, setDraftContent] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [activeLogTab, setActiveLogTab] = useState('visual'); // visual, json
  const [piiViewMode, setPiiViewMode] = useState('redacted'); // original, redacted
  
  const pipelineEndRef = useRef(null);

  // Initialize selected email defaults
  useEffect(() => {
    setPipelineState('idle');
    setActiveStepIndex(-1);
    setSteps([]);
    setPipelineContext(null);
    setIsSent(false);
    setSelectedReplyMode('professional');
    setDraftContent('');
    setConsoleLogs([]);
  }, [selectedEmail]);

  // Run the multi-agent pipeline simulation
  const runPipeline = () => {
    if (!selectedEmail) return;
    
    setPipelineState('running');
    setActiveStepIndex(0);
    setIsSent(false);
    setConsoleLogs([]);

    const { steps: computedSteps, context } = getAgentSteps(selectedEmail, memory, rules);
    setSteps(computedSteps);
    setPipelineContext(context);

    // Simulate step-by-step execution delay
    let currentStep = 0;
    
    const interval = setInterval(() => {
      setConsoleLogs(prev => [
        ...prev, 
        `[${new Date().toLocaleTimeString()}] [AGENT:${computedSteps[currentStep].agent.toUpperCase()}] Initiating...`,
        `[${new Date().toLocaleTimeString()}] [AGENT:${computedSteps[currentStep].agent.toUpperCase()}] Output: ${JSON.stringify(computedSteps[currentStep].output, null, 2)}`
      ]);

      if (currentStep < computedSteps.length - 1) {
        currentStep++;
        setActiveStepIndex(currentStep);
      } else {
        clearInterval(interval);
        setPipelineState('completed');
        setActiveStepIndex(computedSteps.length);
        
        // Load default draft text
        const initialDraft = context.draft_reply.options[selectedReplyMode] || context.draft_reply.body;
        setDraftContent(initialDraft);
        
        // Trigger automated integrations
        if (context.workflow_actions && context.workflow_actions.length > 0) {
          context.workflow_actions.forEach(action => {
            triggerWorkflow(action);
          });
        }
        
        addNotification(
          `AI Analysis Complete: "${selectedEmail.subject}" successfully processed. Priority Score: ${context.priority.score}/100.`
        );
      }
    }, 1500); // 1.5 seconds per agent step
  };

  // Handle draft reply mode change
  const handleReplyModeChange = (mode) => {
    setSelectedReplyMode(mode);
    if (pipelineContext && pipelineContext.draft_reply.options) {
      setDraftContent(pipelineContext.draft_reply.options[mode] || pipelineContext.draft_reply.body);
    }
  };

  // Handle dispatching email
  const handleSendEmail = () => {
    setIsSent(true);
    addNotification(`Draft reply approved and securely dispatched via OAuth SMTP.`);
  };

  const getPriorityColor = (score) => {
    if (score >= 90) return 'from-red-500 to-rose-600 text-red-500';
    if (score >= 75) return 'from-amber-400 to-orange-500 text-amber-400';
    if (score >= 50) return 'from-blue-400 to-indigo-500 text-blue-400';
    return 'from-slate-400 to-slate-500 text-slate-400';
  };

  const getUrgencyBadge = (level) => {
    switch (level) {
      case 'critical': return 'bg-red-500/10 text-red-400 border border-red-500/30';
      case 'high': return 'bg-orange-500/10 text-orange-400 border border-orange-500/30';
      case 'medium': return 'bg-blue-500/10 text-blue-400 border border-blue-500/30';
      default: return 'bg-slate-500/10 text-slate-400 border border-slate-500/30';
    }
  };

  return (
    <div className="flex h-full w-full">
      {/* 1. Inbox Column (Left) */}
      <div className="w-1/3 border-r border-cyber-border h-full flex flex-col bg-black/10 select-none">
        <div className="p-5 border-b border-cyber-border flex items-center justify-between">
          <h2 className="text-lg font-bold font-sans tracking-wide">Priority Inbox</h2>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-cyber-purple/10 text-cyber-purple border border-cyber-purple/20">
            Real-time Sync
          </span>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-cyber-border/40">
          {emails.map((email) => {
            const isSelected = selectedEmail && selectedEmail.id === email.id;
            return (
              <div
                key={email.id}
                onClick={() => onEmailSelect(email)}
                className={`p-5 cursor-pointer transition-all duration-300 relative ${
                  isSelected 
                    ? 'bg-gradient-to-r from-cyber-purple/10 to-transparent border-l-2 border-cyber-purple' 
                    : 'hover:bg-white/5'
                } ${email.status === 'unread' ? 'font-semibold bg-white/[0.01]' : ''}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {email.status === 'unread' && (
                      <span className="w-2 h-2 rounded-full bg-cyber-purple"></span>
                    )}
                    <span className="text-sm font-medium text-white truncate max-w-[130px] font-sans">
                      {email.senderName}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {new Date(email.receivedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <h3 className="text-xs text-slate-200 truncate mb-1.5 font-sans">
                  {email.subject}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-2.5 font-sans">
                  {email.body}
                </p>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {email.id === 'msg_182bc83f0c1' && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-red-500/10 text-red-400 border border-red-500/20 uppercase">
                      Urgent
                    </span>
                  )}
                  {email.company && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-white/5 text-slate-400 border border-cyber-border">
                      {email.company}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Email Details & Agent pipeline view (Right) */}
      <div className="flex-1 h-full overflow-y-auto flex flex-col bg-cyber-dark cyber-grid">
        {selectedEmail ? (
          <div className="flex-1 flex flex-col">
            {/* Thread Header */}
            <div className="p-6 border-b border-cyber-border glassmorphic sticky top-0 z-20">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-lg font-bold text-white mb-1 tracking-wide font-sans select-text">
                    {selectedEmail.subject}
                  </h1>
                  <div className="flex items-center gap-2.5 text-xs text-slate-400 font-sans">
                    <span className="text-white font-medium">{selectedEmail.senderName}</span>
                    <span>&lt;{selectedEmail.senderEmail}&gt;</span>
                    {selectedEmail.company && (
                      <>
                        <span className="text-slate-600">•</span>
                        <span className="px-2 py-0.5 rounded bg-white/5 text-slate-300 font-mono text-[10px] border border-cyber-border">
                          {selectedEmail.company}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {pipelineState === 'idle' && (
                    <button
                      onClick={runPipeline}
                      className="px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-cyber-purple to-indigo-600 text-white font-semibold text-xs flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-cyber-purple/20 hover:scale-102"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Run AI Agent Pipeline
                    </button>
                  )}
                  {pipelineState === 'running' && (
                    <div className="px-4.5 py-2.5 rounded-xl bg-white/5 border border-cyber-border text-slate-400 font-semibold text-xs flex items-center gap-2 select-none">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyber-purple" />
                      Analyzing email logs...
                    </div>
                  )}
                  {pipelineState === 'completed' && (
                    <button
                      onClick={runPipeline}
                      className="px-4.5 py-2.5 rounded-xl bg-white/5 border border-cyber-border/40 text-slate-300 font-semibold text-xs flex items-center gap-2 transition-all duration-300 hover:bg-white/10"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Re-run Pipeline
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Main Thread Body Grid */}
            <div className="p-6 flex-1 space-y-6">
              {/* Raw Email Display */}
              <div className="glassmorphic p-5 rounded-2xl border border-cyber-border/60 bg-black/30">
                <div className="flex items-center justify-between mb-4 border-b border-cyber-border/40 pb-3">
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-cyber-blue" />
                    Ingested Raw Email Data
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    {new Date(selectedEmail.receivedAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap font-sans select-text select-all">
                  {selectedEmail.body}
                </p>
              </div>

              {/* Multi-Agent Orchestrator Pipeline Visualizer */}
              {pipelineState !== 'idle' && (
                <div className="glassmorphic p-6 rounded-2xl space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-cyber-purple" />
                      <h3 className="text-sm font-bold font-sans tracking-wide">
                        Multi-Agent Coordination Pipeline
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setActiveLogTab('visual')}
                        className={`px-3 py-1 rounded-lg text-[10px] font-mono ${
                          activeLogTab === 'visual' ? 'bg-cyber-purple/20 text-white border border-cyber-purple/40' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Visual Board
                      </button>
                      <button
                        onClick={() => setActiveLogTab('json')}
                        className={`px-3 py-1 rounded-lg text-[10px] font-mono ${
                          activeLogTab === 'json' ? 'bg-cyber-purple/20 text-white border border-cyber-purple/40' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        JSON Exchange Logs
                      </button>
                    </div>
                  </div>

                  {activeLogTab === 'visual' ? (
                    <div className="grid grid-cols-1 md:grid-cols-7 gap-3 select-none">
                      {steps.map((step, idx) => {
                        const isCurrent = activeStepIndex === idx;
                        const isDone = activeStepIndex > idx;
                        return (
                          <div
                            key={step.agent}
                            className={`p-3.5 rounded-xl border flex flex-col items-center justify-between text-center transition-all duration-300 relative ${
                              isCurrent 
                                ? 'border-cyber-purple bg-cyber-purple/10 scale-102 glow-purple ring-1 ring-cyber-purple/30 animate-pulse-glow'
                                : isDone 
                                  ? 'border-cyber-blue/30 bg-cyber-blue/5'
                                  : 'border-cyber-border bg-white/[0.01] opacity-40'
                            }`}
                          >
                            <div className="flex flex-col items-center">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2.5 ${
                                isCurrent 
                                  ? 'bg-cyber-purple text-white shadow-lg shadow-cyber-purple/35'
                                  : isDone
                                    ? 'bg-cyber-blue/20 text-cyber-blue'
                                    : 'bg-white/5 text-slate-500'
                              }`}>
                                {isDone ? (
                                  <CheckCircle2 className="w-4 h-4 text-cyber-blue" />
                                ) : (
                                  <span className="text-[11px] font-mono font-bold">{idx + 1}</span>
                                )}
                              </div>
                              <span className="text-[10px] font-mono font-bold tracking-tight text-white mb-1 block max-w-full truncate">
                                {step.title.split(' ')[0]}
                              </span>
                              <span className="text-[9px] text-slate-400 capitalize block max-w-full truncate">
                                {step.agent.replace('_', ' ')}
                              </span>
                            </div>

                            {/* Status Indicator text */}
                            <div className="mt-3">
                              {isCurrent && (
                                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-cyber-purple animate-ping"></span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="bg-black/45 p-4 rounded-xl border border-cyber-border font-mono text-[10px] text-green-400 h-64 overflow-y-auto space-y-2 select-text selection:bg-cyber-purple">
                      {consoleLogs.map((log, i) => (
                        <div key={i} className="whitespace-pre-wrap leading-relaxed">
                          {log}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Active Agent Step Explanation Panel */}
                  {activeStepIndex >= 0 && activeStepIndex < steps.length && (
                    <div className="bg-white/5 border border-cyber-border/40 p-4 rounded-xl flex items-start gap-3.5 animate-fadeIn select-text">
                      <div className="p-2 rounded-lg bg-cyber-purple/10 border border-cyber-purple/20">
                        <Sparkles className="w-5 h-5 text-cyber-purple animate-float" />
                      </div>
                      <div>
                        <h4 className="text-xs font-mono font-bold text-cyber-purple mb-1">
                          ACTIVE AGENT: {steps[activeStepIndex].title}
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans">
                          {steps[activeStepIndex].description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Complete Pipeline Outputs Panels */}
              {pipelineState === 'completed' && pipelineContext && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 select-text">
                  {/* Left Column: AI Summaries & Tone */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Insights Summary Box */}
                    <div className="glassmorphic p-6 rounded-2xl space-y-5">
                      <div className="flex items-center justify-between border-b border-cyber-border/40 pb-3">
                        <h3 className="text-sm font-bold font-sans tracking-wide text-white flex items-center gap-2">
                          <Tag className="w-4 h-4 text-cyber-blue" />
                          AI Extraction & Classification
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${getUrgencyBadge(pipelineContext.priority.urgency_level)}`}>
                            {pipelineContext.priority.urgency_level.toUpperCase()}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyber-purple/10 text-cyber-purple border border-cyber-purple/20">
                            {pipelineContext.priority.category}
                          </span>
                        </div>
                      </div>

                      {/* 1-Line Summary */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                          1-Line Quick Summary
                        </span>
                        <p className="text-xs font-medium text-slate-100 leading-relaxed border-l-2 border-cyber-blue pl-3.5">
                          {selectedEmail.id === 'msg_182bc83f0c1' 
                            ? 'Sarah Connor reports a critical anomaly in AWS cloud backups and requests a 10-minute sync tomorrow at 2:00 PM PST to avoid audit failure.'
                            : selectedEmail.id === 'msg_182bc85e921'
                              ? 'Marcus Wright from Project Angel requests enterprise API pricing parameters and sandbox setup coordinates to launch a pilot implementation.'
                              : selectedEmail.id === 'msg_182bc86a111'
                                ? 'Security threat: High priority phishing sweep detected aiming to harvest social numbers, banking numbers, and password keys.'
                                : 'Incoming coordination request: Details logged and structured in queue.'
                          }
                        </p>
                      </div>

                      {/* Action Items List */}
                      {pipelineContext.intent.action_items.length > 0 && (
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                            Key Action Items Detected
                          </span>
                          <ul className="space-y-2">
                            {pipelineContext.intent.action_items.map((item, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyber-purple mt-1.5"></span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Deadlines & Calendar Sync */}
                      {(pipelineContext.intent.deadlines.length > 0 || pipelineContext.intent.meeting_requests.length > 0) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-cyber-border/40">
                          {pipelineContext.intent.deadlines.length > 0 && (
                            <div className="space-y-1.5">
                              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                                Critical Deadlines
                              </span>
                              {pipelineContext.intent.deadlines.map((dl, i) => (
                                <div key={i} className="bg-red-500/5 border border-red-500/10 p-2.5 rounded-xl">
                                  <p className="text-xs font-semibold text-red-400">{dl.description}</p>
                                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                                    Target: {new Date(dl.date).toLocaleDateString()} at {new Date(dl.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}

                          {pipelineContext.intent.meeting_requests.length > 0 && (
                            <div className="space-y-1.5">
                              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                                Proposed Sync Schedules
                              </span>
                              {pipelineContext.intent.meeting_requests.map((meet, i) => (
                                <div key={i} className="bg-cyber-blue/5 border border-cyber-blue/10 p-2.5 rounded-xl">
                                  <p className="text-xs font-semibold text-cyber-blue">{meet.purpose}</p>
                                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                                    Time: {meet.datetime} ({meet.duration})
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* AI Reply generator */}
                    {!pipelineContext.security.is_spam && (
                      <div className="glassmorphic p-6 rounded-2xl space-y-5">
                        <div className="flex items-center justify-between border-b border-cyber-border/40 pb-3">
                          <h3 className="text-sm font-bold font-sans tracking-wide text-white flex items-center gap-2">
                            <Sliders className="w-4 h-4 text-cyber-purple" />
                            AI Response Draft Generator
                          </h3>
                          <div className="flex items-center gap-1.5 bg-black/30 p-1 rounded-lg border border-cyber-border">
                            {['professional', 'executive', 'friendly'].map((mode) => (
                              <button
                                key={mode}
                                onClick={() => handleReplyModeChange(mode)}
                                className={`px-2.5 py-1 rounded-md text-[10px] font-sans font-bold capitalize transition-all duration-300 ${
                                  selectedReplyMode === mode 
                                    ? 'bg-cyber-purple text-white' 
                                    : 'text-slate-400 hover:text-slate-200'
                                }`}
                              >
                                {mode}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Editor Draft */}
                        <div className="space-y-4">
                          <div className="relative">
                            <textarea
                              value={draftContent}
                              onChange={(e) => setDraftContent(e.target.value)}
                              disabled={isSent}
                              className="w-full h-64 bg-black/45 border border-cyber-border rounded-xl p-4 font-sans text-xs text-slate-200 leading-relaxed focus:outline-none focus:border-cyber-purple resize-none focus:ring-1 focus:ring-cyber-purple/20 select-text"
                            />
                            {isSent && (
                              <div className="absolute inset-0 bg-cyber-dark/85 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center space-y-3 border border-green-500/30">
                                <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                                </div>
                                <div className="text-center">
                                  <h4 className="text-sm font-bold text-white">Email Dispatched!</h4>
                                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">SMTP Authentication Code: OAuth2-SUCCESS-200</p>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                              <Database className="w-3.5 h-3.5 text-cyber-purple" />
                              Vector context active (Injected style tokens: {pipelineContext.memory_context.length})
                            </div>
                            {!isSent && (
                              <button
                                onClick={handleSendEmail}
                                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-xs flex items-center gap-2 hover:shadow-lg hover:shadow-green-500/15 hover:scale-102 transition-all duration-300"
                              >
                                <Send className="w-3.5 h-3.5" />
                                Approve and Send Draft
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Security, Memory RAG, Workflow logs */}
                  <div className="space-y-6">
                    {/* Security Shields */}
                    <div className={`glassmorphic p-5 rounded-2xl border ${
                      pipelineContext.security.is_spam ? 'border-red-500/30 bg-red-950/5' : 'border-cyber-border'
                    }`}>
                      <div className="flex items-center justify-between border-b border-cyber-border/40 pb-3 mb-4">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <Shield className={`w-4 h-4 ${pipelineContext.security.is_spam ? 'text-red-500' : 'text-green-400'}`} />
                          Security Evaluation Log
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">PII Shield: ON</span>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center bg-black/25 p-3 rounded-xl border border-cyber-border">
                          <span className="text-[11px] text-slate-400 font-sans">Phishing Score</span>
                          <span className={`font-mono text-xs font-bold ${
                            pipelineContext.security.phishing_score > 50 ? 'text-red-400' : 'text-green-400'
                          }`}>
                            {pipelineContext.security.phishing_score} / 100
                          </span>
                        </div>

                        {pipelineContext.security.is_spam && (
                          <div className="p-3 bg-red-500/5 rounded-xl border border-red-500/10 text-[10px] text-red-400 leading-relaxed">
                            <AlertTriangle className="w-4 h-4 inline mr-1 text-red-500" />
                            Phishing signature detected. Direct credentials harvest vectors matching high fraud profiles. User was redacted of input options.
                          </div>
                        )}

                        {!pipelineContext.security.is_spam && (
                          <div className="text-[10px] text-slate-400 font-sans leading-relaxed">
                            No credentials harvesting, domain masquerading, or suspicious URL payloads located. Attachments flagged secure.
                          </div>
                        )}

                        {/* PII Redactor Toggle */}
                        {pipelineContext.security.pii_redacted && (
                          <div className="space-y-2 pt-2 border-t border-cyber-border/40">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-mono text-slate-400">PII REDACTED CONTENT</span>
                              <div className="flex items-center gap-2 bg-black/20 p-0.5 rounded border border-cyber-border">
                                <button
                                  onClick={() => setPiiViewMode('redacted')}
                                  className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${piiViewMode === 'redacted' ? 'bg-cyber-purple text-white' : 'text-slate-500'}`}
                                >
                                  Redacted
                                </button>
                                <button
                                  onClick={() => setPiiViewMode('original')}
                                  className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${piiViewMode === 'original' ? 'bg-cyber-purple text-white' : 'text-slate-500'}`}
                                >
                                  Original
                                </button>
                              </div>
                            </div>
                            <p className="p-2.5 bg-black/35 rounded-lg border border-cyber-border text-[9px] font-mono text-yellow-400/90 leading-normal max-h-24 overflow-y-auto">
                              {piiViewMode === 'redacted' 
                                ? pipelineContext.security.safe_body
                                : selectedEmail.body
                              }
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Vector Memory Context (RAG) */}
                    <div className="glassmorphic p-5 rounded-2xl border border-cyber-border">
                      <div className="flex items-center justify-between border-b border-cyber-border/40 pb-3 mb-4">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <Database className="w-4 h-4 text-cyber-purple" />
                          Context Vector Memory (RAG)
                        </span>
                        <span className="px-2 py-0.5 rounded text-[8px] font-mono bg-cyber-purple/10 text-cyber-purple border border-cyber-purple/20">
                          3 Cosine Match
                        </span>
                      </div>

                      <div className="space-y-3">
                        {pipelineContext.memory_context.length > 0 ? (
                          pipelineContext.memory_context.map((mem, i) => (
                            <div key={i} className="p-3 bg-black/30 rounded-xl border border-cyber-border/60 text-[10px] text-slate-300 leading-relaxed font-sans">
                              {mem}
                            </div>
                          ))
                        ) : (
                          <div className="p-3 bg-black/10 rounded-xl border border-cyber-border/40 text-[10px] text-slate-500 italic text-center">
                            No related vector memory profiles for this sender.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Automation Webhooks status */}
                    <div className="glassmorphic p-5 rounded-2xl border border-cyber-border">
                      <div className="flex items-center justify-between border-b border-cyber-border/40 pb-3 mb-4">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-cyber-blue" />
                          Workflow Executions
                        </span>
                        <span className="text-[10px] font-mono text-green-400">SUCCESS</span>
                      </div>

                      <div className="space-y-3">
                        {pipelineContext.workflow_actions && pipelineContext.workflow_actions.length > 0 ? (
                          pipelineContext.workflow_actions.map((act, i) => (
                            <div key={i} className="flex items-center justify-between bg-black/30 p-3 rounded-xl border border-cyber-border">
                              <div className="flex items-center gap-2.5">
                                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold capitalize ${
                                  act.provider === 'slack' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/20'
                                }`}>
                                  {act.provider[0]}
                                </span>
                                <div>
                                  <h4 className="text-[10px] font-bold text-white uppercase tracking-tight">{act.provider} Action</h4>
                                  <p className="text-[9px] text-slate-400 font-mono">{act.target}</p>
                                </div>
                              </div>
                              <span className="text-[9px] font-mono font-bold text-green-400 bg-green-500/5 border border-green-500/15 px-2 py-0.5 rounded">
                                DISPATCHED
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className="p-3 bg-black/10 rounded-xl border border-cyber-border/40 text-[10px] text-slate-500 italic text-center">
                            No rules matching trigger criteria.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12 select-none">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyber-purple/20 to-cyber-blue/20 flex items-center justify-center border border-cyber-border/40 mb-5">
              <Mail className="w-8 h-8 text-cyber-purple animate-float" />
            </div>
            <h3 className="text-base font-bold text-white mb-1.5 font-sans">
              Welcome to Antigravity 2.0
            </h3>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-6 font-sans">
              Select an email from your Priority Inbox and trigger the Multi-Agent Pipeline to watch the executive assistant execute cognitive task workflows in real time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
