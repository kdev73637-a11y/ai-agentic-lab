import React, { useState } from 'react';
import { 
  initialEmails, 
  initialMemory, 
  initialRules, 
  initialStats 
} from './utils/simulationEngine';
import Sidebar from './components/Sidebar';
import InboxSimulator from './components/InboxSimulator';
import WorkflowBuilder from './components/WorkflowBuilder';
import MemoryManager from './components/MemoryManager';
import AnalyticsPanel from './components/AnalyticsPanel';
import VoiceDigest from './components/VoiceDigest';
import SystemArchViewer from './components/SystemArchViewer';
import { 
  Bell, 
  Activity, 
  Moon, 
  Sun, 
  Sparkles,
  HelpCircle,
  Inbox,
  UserCheck
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('inbox');
  const [emails, setEmails] = useState(initialEmails);
  const [selectedEmail, setSelectedEmail] = useState(initialEmails[0]);
  const [memory, setMemory] = useState(initialMemory);
  const [rules, setRules] = useState(initialRules);
  const [stats, setStats] = useState(initialStats);
  const [workflowHistory, setWorkflowHistory] = useState([]);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "System Initialized: Multi-Agent Network online.", time: "Just Now" },
    { id: 2, text: "Vector databases indexed with 4 cosine embeddings.", time: "1 min ago" }
  ]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);

  // Add notification function
  const addNotification = (text) => {
    const newNotif = {
      id: Date.now(),
      text,
      time: "Just Now"
    };
    setNotifications(prev => [newNotif, ...prev.slice(0, 9)]); // limit to 10
  };

  // Triggered during workflow simulation
  const triggerWorkflow = (action) => {
    const newRun = {
      provider: action.provider,
      target: action.target,
      payload: action.payload,
      timestamp: new Date().toISOString()
    };
    setWorkflowHistory(prev => [newRun, ...prev]);
    
    // Update stats automatically
    setStats(prev => ({
      ...prev,
      totalProcessed: prev.totalProcessed + 1
    }));
  };

  const handleEmailSelect = (email) => {
    setSelectedEmail(email);
    // Mark as read
    setEmails(prev => prev.map(e => 
      e.id === email.id ? { ...e, isRead: true, status: 'read' } : e
    ));
  };

  const unreadCount = emails.filter(e => e.status === 'unread').length;

  return (
    <div className={`flex h-screen w-screen overflow-hidden ${isDarkMode ? 'bg-cyber-dark text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* 1. Sidebar Menu Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        unreadCount={unreadCount} 
      />

      {/* 2. Main Content viewport container */}
      <div className="flex-1 h-full flex flex-col overflow-hidden relative">
        {/* Main Dashboard Header */}
        <header className="h-16 border-b border-cyber-border glassmorphic px-8 flex items-center justify-between z-10 select-none">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-400">CONTEXT TREE:</span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-cyber-border font-mono text-[10px] text-cyber-purple uppercase font-bold">
              /ROOT/DEV/{activeTab}
            </span>
          </div>

          <div className="flex items-center gap-4.5">
            {/* Dark/Light mode toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg bg-white/5 border border-cyber-border text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Notification alert bells */}
            <div className="relative">
              <button
                onClick={() => setShowNotificationPanel(!showNotificationPanel)}
                className="p-2 rounded-lg bg-white/5 border border-cyber-border text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300 relative"
              >
                <Bell className="w-4 h-4" />
                {notifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-cyber-purple"></span>
                )}
              </button>

              {/* Toast panel dropdown */}
              {showNotificationPanel && (
                <div className="absolute right-0 mt-2.5 w-80 glassmorphic p-4 rounded-2xl border border-cyber-border space-y-3 z-30 shadow-2xl animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-cyber-border/40 pb-2">
                    <span className="text-[10px] font-mono font-bold text-cyber-purple uppercase tracking-wider flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5" />
                      Live AI Activity logs
                    </span>
                    <button 
                      onClick={() => setNotifications([])} 
                      className="text-[9px] font-mono text-slate-500 hover:text-slate-300"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="space-y-3.5 max-h-64 overflow-y-auto pr-1">
                    {notifications.length > 0 ? (
                      notifications.map(notif => (
                        <div key={notif.id} className="space-y-1 text-[10px] font-sans border-b border-cyber-border/20 pb-2">
                          <p className="text-slate-200 leading-normal">{notif.text}</p>
                          <span className="text-[9px] font-mono text-slate-500">{notif.time}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-[10px] text-slate-500 italic py-4">No recent activity logs.</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Developer profile badge */}
            <div className="flex items-center gap-2.5 pl-4 border-l border-cyber-border/60">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyber-blue to-cyber-purple flex items-center justify-center font-bold text-xs text-white">
                D
              </div>
              <div className="hidden sm:block">
                <h4 className="text-xs font-semibold text-white font-sans leading-tight">Dev Owner</h4>
                <p className="text-[10px] text-slate-500 font-mono">Premium SaaS tier</p>
              </div>
            </div>
          </div>
        </header>

        {/* View Router Portal */}
        <main className="flex-1 overflow-hidden">
          {activeTab === 'inbox' && (
            <InboxSimulator 
              emails={emails} 
              onEmailSelect={handleEmailSelect} 
              selectedEmail={selectedEmail} 
              memory={memory} 
              rules={rules} 
              triggerWorkflow={triggerWorkflow} 
              addNotification={addNotification} 
            />
          )}

          {activeTab === 'workflows' && (
            <WorkflowBuilder 
              rules={rules} 
              setRules={setRules} 
              workflowHistory={workflowHistory} 
            />
          )}

          {activeTab === 'memory' && (
            <MemoryManager 
              memory={memory} 
              setMemory={setMemory} 
              addNotification={addNotification} 
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsPanel 
              stats={stats} 
            />
          )}

          {activeTab === 'voice' && (
            <VoiceDigest 
              addNotification={addNotification} 
            />
          )}

          {activeTab === 'architecture' && (
            <SystemArchViewer 
              addNotification={addNotification} 
            />
          )}
        </main>
      </div>
    </div>
  );
}
