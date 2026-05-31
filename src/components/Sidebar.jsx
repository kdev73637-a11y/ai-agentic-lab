import React from 'react';
import { 
  Mail, 
  GitFork, 
  Brain, 
  BarChart3, 
  Network, 
  Mic, 
  Settings, 
  ShieldAlert, 
  Sparkles,
  Layers
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, unreadCount, systemStatus }) {
  const menuItems = [
    { id: 'inbox', name: 'Priority Inbox', icon: Mail, badge: unreadCount },
    { id: 'workflows', name: 'AI Workflows', icon: GitFork },
    { id: 'memory', name: 'Vector Memory', icon: Brain },
    { id: 'analytics', name: 'AI Analytics', icon: BarChart3 },
    { id: 'voice', name: 'Voice & Digest', icon: Mic },
    { id: 'architecture', name: 'System Architecture', icon: Network },
  ];

  return (
    <aside className="w-80 h-screen glassmorphic flex flex-col justify-between border-r border-cyber-border select-none z-10">
      {/* Brand Logo Header */}
      <div>
        <div className="p-6 flex items-center gap-3 border-b border-cyber-border">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyber-purple via-indigo-500 to-cyber-blue flex items-center justify-center shadow-lg shadow-cyber-purple/20">
            <Sparkles className="w-5 h-5 text-white animate-float" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 font-sans">
              ANTIGRAVITY
            </h1>
            <p className="text-[10px] tracking-widest text-cyber-purple font-mono uppercase font-bold">
              v2.0 Email Agent
            </p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 font-sans group ${
                  isActive
                    ? 'bg-gradient-to-r from-cyber-purple/20 to-cyber-blue/10 text-white border-l-2 border-cyber-purple shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <Icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-105 ${
                    isActive ? 'text-cyber-purple glow-purple' : 'text-slate-400'
                  }`} />
                  <span className={`text-sm font-medium ${isActive ? 'font-semibold' : ''}`}>
                    {item.name}
                  </span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-2 py-0.5 text-xs font-mono font-bold text-white rounded-full bg-cyber-purple shadow-sm">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* System Health / Status Indicator Footer */}
      <div className="p-5 border-t border-cyber-border bg-black/20">
        <div className="glassmorphic p-4.5 rounded-xl border border-cyber-border space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono tracking-wider text-slate-500 uppercase">
              Agent Network
            </span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1.5 font-sans">
              <Layers className="w-3.5 h-3.5 text-cyber-blue" />
              Active Sub-agents:
            </span>
            <span className="font-mono font-semibold text-cyber-blue">
              7 / 7 Online
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1.5 font-sans">
              <ShieldAlert className="w-3.5 h-3.5 text-yellow-500" />
              Security Shield:
            </span>
            <span className="font-mono font-semibold text-yellow-500">
              Active
            </span>
          </div>

          <div className="pt-2 border-t border-cyber-border/40 text-[10px] text-center text-slate-500 font-mono">
            Secure Context // AES-256 RAG
          </div>
        </div>
      </div>
    </aside>
  );
}
