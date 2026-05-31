'use client';
import { useEffect, useRef } from 'react';
import { TrendingUp, HeadphonesIcon, Megaphone, Search, Calendar, BarChart3 } from 'lucide-react';
import Link from 'next/link';

const agents = [
  {
    id: 'sales',
    icon: TrendingUp,
    name: 'AI Sales Agent',
    role: 'Revenue Generation',
    desc: 'Qualifies leads, schedules demos, handles objections, and closes deals 24/7 without human intervention.',
    metrics: [{ label: 'Conversion Rate', val: '+68%' }, { label: 'Calls/Day', val: '500+' }, { label: 'Response Time', val: '<2s' }],
    color: 'from-green-400 to-cyan-500',
    bg: 'from-green-500/10 to-cyan-500/10',
    border: 'border-green-500/20',
    status: 'active',
  },
  {
    id: 'support',
    icon: HeadphonesIcon,
    name: 'AI Support Agent',
    role: 'Customer Experience',
    desc: 'Resolves 80% of tickets instantly. Escalates complex issues with full context to human agents.',
    metrics: [{ label: 'Resolution Rate', val: '80%' }, { label: 'CSAT Score', val: '4.9/5' }, { label: 'Avg Handle Time', val: '12s' }],
    color: 'from-blue-400 to-indigo-500',
    bg: 'from-blue-500/10 to-indigo-500/10',
    border: 'border-blue-500/20',
    status: 'active',
  },
  {
    id: 'marketing',
    icon: Megaphone,
    name: 'AI Marketing Agent',
    role: 'Brand & Growth',
    desc: 'Creates campaigns, writes copy, schedules posts, and optimizes ad spend across all channels.',
    metrics: [{ label: 'Campaign ROI', val: '+240%' }, { label: 'Content/Day', val: '50+' }, { label: 'Platforms', val: '12' }],
    color: 'from-purple-400 to-pink-500',
    bg: 'from-purple-500/10 to-pink-500/10',
    border: 'border-purple-500/20',
    status: 'active',
  },
  {
    id: 'research',
    icon: Search,
    name: 'AI Research Agent',
    role: 'Intelligence & Insights',
    desc: 'Scours the internet, analyzes competitors, and delivers actionable market intelligence reports.',
    metrics: [{ label: 'Sources/Report', val: '1000+' }, { label: 'Accuracy', val: '96%' }, { label: 'Time Saved', val: '40hrs/wk' }],
    color: 'from-amber-400 to-orange-500',
    bg: 'from-amber-500/10 to-orange-500/10',
    border: 'border-amber-500/20',
    status: 'active',
  },
  {
    id: 'scheduling',
    icon: Calendar,
    name: 'AI Scheduling Agent',
    role: 'Calendar Management',
    desc: 'Books meetings, sends reminders, syncs calendars, and optimizes schedules across time zones.',
    metrics: [{ label: 'No-Shows', val: '-75%' }, { label: 'Bookings/Day', val: '200+' }, { label: 'Integrations', val: '8' }],
    color: 'from-teal-400 to-cyan-500',
    bg: 'from-teal-500/10 to-cyan-500/10',
    border: 'border-teal-500/20',
    status: 'active',
  },
  {
    id: 'analytics',
    icon: BarChart3,
    name: 'AI Analytics Agent',
    role: 'Data Intelligence',
    desc: 'Monitors KPIs, identifies trends, generates reports, and predicts outcomes with ML models.',
    metrics: [{ label: 'Data Points', val: '50M+' }, { label: 'Prediction Acc.', val: '94%' }, { label: 'Reports/Day', val: '100+' }],
    color: 'from-indigo-400 to-violet-500',
    bg: 'from-indigo-500/10 to-violet-500/10',
    border: 'border-indigo-500/20',
    status: 'active',
  },
];

export default function AIAgents() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    const els = sectionRef.current?.querySelectorAll('.reveal');
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="agents" ref={sectionRef} className="relative py-24 px-6">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-900/10 rounded-full blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="badge inline-flex mb-4 reveal">🤖 AI Agents</div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 reveal reveal-delay-1">
            Deploy Intelligent
            <span className="gradient-text"> AI Agents</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto reveal reveal-delay-2">
            Six specialized AI agents working 24/7 to automate every department of your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, i) => {
            const Icon = agent.icon;
            return (
              <div
                key={i}
                className={`reveal reveal-delay-${i % 6 + 1} glass-card rounded-2xl p-6 card-hover group border ${agent.border} relative overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${agent.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
                
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1.5 glass px-2.5 py-1 rounded-full">
                    <div className="status-dot" />
                    <span className="text-green-400 text-xs">Live</span>
                  </div>
                </div>

                <h3 className="font-heading font-semibold text-lg text-white mb-1 relative z-10">{agent.name}</h3>
                <p className="text-indigo-400 text-xs font-medium mb-3 relative z-10">{agent.role}</p>
                <p className="text-slate-400 text-sm leading-relaxed mb-5 relative z-10">{agent.desc}</p>

                <div className="grid grid-cols-3 gap-2 relative z-10">
                  {agent.metrics.map((m, j) => (
                    <div key={j} className="glass rounded-lg p-2 text-center">
                      <div className="text-white font-bold text-sm">{m.val}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/workspace/${agent.id}`}
                  className="mt-4 block w-full text-center text-indigo-400 text-sm font-medium py-2 rounded-lg border border-indigo-500/20 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all duration-200 relative z-10"
                >
                  Deploy Agent →
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
