import React from 'react';
import { 
  BarChart3, 
  TrendingDown, 
  Zap, 
  Activity, 
  Clock, 
  CheckSquare, 
  Cpu, 
  Smile, 
  AlertOctagon, 
  AlertTriangle, 
  UserCheck 
} from 'lucide-react';

export default function AnalyticsPanel({ stats }) {
  const {
    totalProcessed,
    averageResponseReduction,
    activeEscalations,
    productivityScore,
    sentiments,
    responseTimes,
    categoryStats
  } = stats;

  const sentimentConfigs = [
    { key: 'neutral', label: 'Neutral Professional', percentage: sentiments.neutral, color: 'bg-cyber-blue', icon: UserCheck, text: 'text-cyber-blue' },
    { key: 'happy', label: 'Happy / Satisfied', percentage: sentiments.happy, color: 'bg-green-500', icon: Smile, text: 'text-green-400' },
    { key: 'urgent', label: 'Urgent / Demanding', percentage: sentiments.urgent, color: 'bg-amber-400', icon: AlertTriangle, text: 'text-amber-400' },
    { key: 'angry', label: 'Frustrated / Angry', percentage: sentiments.angry, color: 'bg-red-500', icon: AlertOctagon, text: 'text-red-500' }
  ];

  return (
    <div className="p-8 space-y-6 select-none max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-cyber-border/40 pb-5">
        <div>
          <h2 className="text-xl font-bold font-sans tracking-wide text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyber-purple" />
            Productivity & AI Performance Analytics
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-1">
            Real-time analytics mapping direct processing ratios, agent response velocities, sentiment patterns, and organization efficiency gains.
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-xl text-[10px] font-mono bg-cyber-purple/10 text-cyber-purple border border-cyber-purple/20">
          Last 30 Days Operations
        </span>
      </div>

      {/* Grid of four cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Processed */}
        <div className="glassmorphic p-5 rounded-2xl border border-cyber-border space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Total Emails Processed</span>
            <div className="w-8 h-8 rounded-lg bg-cyber-purple/10 border border-cyber-purple/25 flex items-center justify-center">
              <Cpu className="w-4 h-4 text-cyber-purple" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-extrabold tracking-tight text-white font-sans">{totalProcessed.toLocaleString()}</h3>
            <p className="text-[10px] text-green-400 font-mono mt-1 font-semibold flex items-center gap-1">
              <span>+18.4%</span>
              <span className="text-slate-500">volume this week</span>
            </p>
          </div>
        </div>

        {/* Response Reduction */}
        <div className="glassmorphic p-5 rounded-2xl border border-cyber-border space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Response Time Drop</span>
            <div className="w-8 h-8 rounded-lg bg-cyber-blue/10 border border-cyber-blue/25 flex items-center justify-center">
              <TrendingDown className="w-4 h-4 text-cyber-blue" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-extrabold tracking-tight text-white font-sans">{averageResponseReduction}</h3>
            <p className="text-[10px] text-cyber-blue font-mono mt-1 font-semibold flex items-center gap-1">
              <span>Avg: 3.5s</span>
              <span className="text-slate-500">down from 45 min manual</span>
            </p>
          </div>
        </div>

        {/* Active Rules Triggers */}
        <div className="glassmorphic p-5 rounded-2xl border border-cyber-border space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Automation Trigger Rate</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center">
              <Zap className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-extrabold tracking-tight text-white font-sans">98.2%</h3>
            <p className="text-[10px] text-cyan-400 font-mono mt-1 font-semibold flex items-center gap-1">
              <span>852 actions</span>
              <span className="text-slate-500">dispatched to Slack/Notion</span>
            </p>
          </div>
        </div>

        {/* Productivity Score */}
        <div className="glassmorphic p-5 rounded-2xl border border-cyber-border flex items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Productivity Score</span>
            <h3 className="text-3xl font-extrabold tracking-tight text-white font-sans">{productivityScore} / 100</h3>
            <span className="text-[9px] font-sans text-slate-500 block leading-tight">Excellent executive delegation rating.</span>
          </div>

          {/* Radial circular indicator */}
          <div className="relative w-16 h-16 select-none flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="32" cy="32" r="26" stroke="rgba(255,255,255,0.04)" strokeWidth="4" fill="transparent" />
              <circle 
                cx="32" 
                cy="32" 
                r="26" 
                stroke="url(#purpleGlow)" 
                strokeWidth="4" 
                fill="transparent" 
                strokeDasharray="163" 
                strokeDashoffset={163 - (163 * productivityScore) / 100}
                strokeLinecap="round" 
              />
              <defs>
                <linearGradient id="purpleGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute text-[10px] font-bold text-white font-mono">{productivityScore}%</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 select-text">
        {/* Chart 1: Daily Response Time velocity */}
        <div className="glassmorphic p-6 rounded-2xl border border-cyber-border space-y-4">
          <div>
            <h3 className="text-sm font-bold font-sans tracking-wide text-white flex items-center gap-2">
              <Clock className="w-4.5 h-4.5 text-cyber-purple" />
              Processing Velocity Comparison (Minutes vs Seconds)
            </h3>
            <p className="text-[10px] text-slate-400 font-sans mt-0.5">
              Comparison between manual handling minutes (slate) and immediate AI automation pipeline seconds (purple).
            </p>
          </div>

          {/* Double Bar chart SVG */}
          <div className="pt-4 h-64 flex flex-col justify-between">
            <div className="flex-1 flex items-end justify-between px-2 gap-3.5 select-none">
              {responseTimes.map((day) => {
                const manualHeight = (day.manual / 50) * 100; // max value around 50
                const aiHeight = (day.ai / 50) * 100;
                return (
                  <div key={day.name} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full flex items-end justify-center gap-1 h-36 border-b border-cyber-border/40 pb-1">
                      {/* Manual handling bar */}
                      <div 
                        style={{ height: `${manualHeight}%` }}
                        className="w-3 bg-slate-600 rounded-t-sm transition-all duration-500 hover:bg-slate-500 relative"
                      >
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 bg-black border border-cyber-border rounded px-1.5 py-0.5 text-[8px] font-mono text-white transition-all duration-300 z-10">
                          {day.manual}m
                        </span>
                      </div>
                      {/* AI handling bar */}
                      <div 
                        style={{ height: `${aiHeight}%` }}
                        className="w-3 bg-gradient-to-t from-cyber-purple to-cyber-blue rounded-t-sm transition-all duration-500 relative shadow-sm hover:shadow-cyber-purple/40"
                      >
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 bg-black border border-cyber-purple rounded px-1.5 py-0.5 text-[8px] font-mono text-white transition-all duration-300 z-10">
                          {day.ai}s
                        </span>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono text-slate-400">{day.name}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-center gap-5 border-t border-cyber-border/40 pt-4 text-[9px] font-mono text-slate-400 select-none">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-slate-600 rounded"></span>
                Manual Email Action (Minutes)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-gradient-to-tr from-cyber-purple to-cyber-blue rounded"></span>
                Antigravity 2.0 AI (Seconds)
              </span>
            </div>
          </div>
        </div>

        {/* Chart 2: Category Breakdown */}
        <div className="glassmorphic p-6 rounded-2xl border border-cyber-border space-y-4">
          <div>
            <h3 className="text-sm font-bold font-sans tracking-wide text-white flex items-center gap-2">
              <CheckSquare className="w-4.5 h-4.5 text-cyber-blue" />
              Inbox Volume Distribution by Categories
            </h3>
            <p className="text-[10px] text-slate-400 font-sans mt-0.5">
              Breakdown of total categorized emails logged in PostgreSQL relational databases.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {categoryStats.map((cat) => {
              const maxVal = Math.max(...categoryStats.map(c => c.value));
              const pct = (cat.value / maxVal) * 100;
              return (
                <div key={cat.name} className="space-y-1 group">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-slate-300 font-medium font-sans">{cat.name}</span>
                    <span className="text-slate-400">{cat.value} Messages</span>
                  </div>
                  <div className="w-full h-2.5 bg-black/40 rounded-full border border-cyber-border overflow-hidden">
                    <div 
                      style={{ width: `${pct}%` }}
                      className="h-full bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full transition-all duration-700 group-hover:opacity-90"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Section 3: Sentiment Intensity & Emotional Matrix */}
      <div className="glassmorphic p-6 rounded-2xl border border-cyber-border space-y-4">
        <div>
          <h3 className="text-sm font-bold font-sans tracking-wide text-white flex items-center gap-2">
            <Activity className="w-4.5 h-4.5 text-yellow-400" />
            Cognitive Sentiment & Tone Distribution Matrix
          </h3>
          <p className="text-[10px] text-slate-400 font-sans mt-0.5">
            Statistical breakdown of incoming emotional signatures detected by the Sentiment Analysis Agent.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 select-text">
          {sentimentConfigs.map((config) => {
            const Icon = config.icon;
            return (
              <div key={config.key} className="bg-black/35 p-4 rounded-xl border border-cyber-border/70 flex items-center justify-between gap-3">
                <div className="space-y-1 flex-1">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-tight block">
                    {config.label}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-xl font-extrabold ${config.text} font-mono`}>{config.percentage}%</span>
                    <span className="text-[9px] text-slate-400 font-sans">volume</span>
                  </div>
                  <div className="w-full h-1 bg-black/40 rounded-full mt-1.5 overflow-hidden">
                    <div style={{ width: `${config.percentage}%` }} className={`h-full ${config.color} rounded-full`} />
                  </div>
                </div>
                <div className={`p-2.5 rounded-lg bg-black/20 border border-cyber-border/40 ${config.text}`}>
                  <Icon className="w-4.5 h-4.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
