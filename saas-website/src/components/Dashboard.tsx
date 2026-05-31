'use client';
import { useEffect, useRef } from 'react';
import { TrendingUp, Activity, Bell, Zap } from 'lucide-react';

const kpis = [
  { label: 'Total Revenue', value: '$284,920', change: '+28.4%', positive: true },
  { label: 'AI Tasks Run', value: '48,291', change: '+52.1%', positive: true },
  { label: 'Active Users', value: '12,503', change: '+19.7%', positive: true },
  { label: 'Leads Captured', value: '3,847', change: '+41.3%', positive: true },
];

const chartBars = [35, 55, 45, 70, 60, 80, 65, 90, 75, 95, 85, 100];

const notifications = [
  { title: 'Sales Agent closed deal', sub: 'Enterprise plan · $12,000/yr', time: '2m ago', color: 'bg-green-500' },
  { title: 'New lead qualified', sub: 'TechCorp Inc · High Priority', time: '8m ago', color: 'bg-blue-500' },
  { title: 'Workflow completed', sub: '847 emails sent · 94% delivered', time: '15m ago', color: 'bg-purple-500' },
  { title: 'Support ticket resolved', sub: 'Customer rating: 5/5 ⭐', time: '22m ago', color: 'bg-cyan-500' },
];

const agentActivity = [
  { name: 'Sales Agent', tasks: 142, pct: 85 },
  { name: 'Support Agent', tasks: 98, pct: 70 },
  { name: 'Marketing Agent', tasks: 76, pct: 60 },
  { name: 'Analytics Agent', tasks: 54, pct: 45 },
];

export default function Dashboard() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.05 }
    );
    const els = sectionRef.current?.querySelectorAll('.reveal');
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="dashboard" ref={sectionRef} className="relative py-24 px-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-purple-900/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="badge inline-flex mb-4 reveal">📊 Live Dashboard</div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 reveal reveal-delay-1">
            Real-Time AI
            <span className="gradient-text"> Intelligence</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto reveal reveal-delay-2">
            Your AI command center — monitor every metric, agent, and workflow in real-time.
          </p>
        </div>

        {/* Dashboard Mockup */}
        <div className="reveal reveal-delay-3">
          <div className="gradient-border">
            <div className="glass-card rounded-2xl overflow-hidden">
              {/* Top Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span className="text-slate-500 text-xs ml-3">DevAIO Dashboard · Enterprise</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="status-dot" />
                  <span className="text-green-400 text-xs">All Systems Operational</span>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column — KPIs + Chart */}
                <div className="lg:col-span-2 space-y-5">
                  {/* KPI Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {kpis.map((kpi, i) => (
                      <div key={i} className="glass rounded-xl p-4">
                        <p className="text-slate-500 text-xs mb-1.5">{kpi.label}</p>
                        <p className="text-white font-bold text-lg">{kpi.value}</p>
                        <p className={`text-xs mt-1 ${kpi.positive ? 'text-green-400' : 'text-red-400'}`}>
                          {kpi.change} this month
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Revenue Chart */}
                  <div className="glass rounded-xl p-5">
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <p className="text-white font-semibold text-sm">Revenue Analytics</p>
                        <p className="text-slate-500 text-xs">Last 12 months</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-green-400 text-sm font-medium">
                        <TrendingUp className="w-4 h-4" />
                        +28.4%
                      </div>
                    </div>
                    <div className="flex items-end gap-2 h-36">
                      {chartBars.map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col justify-end group">
                          <div
                            className="chart-bar rounded-t-sm relative"
                            style={{ height: `${h}%` }}
                          >
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-white bg-indigo-600 px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              {Math.round(h * 2840)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-slate-600 text-xs">
                      {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => (
                        <span key={m}>{m}</span>
                      ))}
                    </div>
                  </div>

                  {/* Agent Activity */}
                  <div className="glass rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Activity className="w-4 h-4 text-indigo-400" />
                      <p className="text-white font-semibold text-sm">Agent Activity</p>
                    </div>
                    <div className="space-y-3">
                      {agentActivity.map((agent, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className="text-slate-300">{agent.name}</span>
                            <span className="text-slate-500">{agent.tasks} tasks</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000"
                              style={{ width: `${agent.pct}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column — Notifications + AI Insights */}
                <div className="space-y-5">
                  {/* AI Insights */}
                  <div className="glass rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="w-4 h-4 text-purple-400" />
                      <p className="text-white font-semibold text-sm">AI Insights</p>
                    </div>
                    <div className="space-y-3">
                      <div className="glass rounded-lg p-3">
                        <p className="text-slate-300 text-xs leading-relaxed">
                          📈 Revenue trending +28% above target. AI recommends increasing ad spend by 15%.
                        </p>
                      </div>
                      <div className="glass rounded-lg p-3">
                        <p className="text-slate-300 text-xs leading-relaxed">
                          🎯 3 high-value leads from LinkedIn need follow-up within 2 hours.
                        </p>
                      </div>
                      <div className="glass rounded-lg p-3">
                        <p className="text-slate-300 text-xs leading-relaxed">
                          ⚡ Support ticket volume down 40%. Customer satisfaction at all-time high.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Live Notifications */}
                  <div className="glass rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-cyan-400" />
                        <p className="text-white font-semibold text-sm">Live Activity</p>
                      </div>
                      <div className="status-dot" />
                    </div>
                    <div className="space-y-3">
                      {notifications.map((n, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full ${n.color} mt-1.5 flex-shrink-0`} />
                          <div className="min-w-0">
                            <p className="text-slate-200 text-xs font-medium">{n.title}</p>
                            <p className="text-slate-500 text-xs">{n.sub}</p>
                            <p className="text-slate-600 text-xs">{n.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* User Growth */}
                  <div className="glass rounded-xl p-5">
                    <p className="text-white font-semibold text-sm mb-3">User Growth</p>
                    <div className="flex items-end gap-1 h-20">
                      {[30, 45, 35, 60, 50, 75, 65, 90, 80, 100].map((h, i) => (
                        <div key={i} className="flex-1 rounded-t-sm bg-gradient-to-t from-cyan-500/40 to-cyan-500/80" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-slate-600 text-xs">
                      <span>Mar</span><span>Jun</span><span>Sep</span><span>Dec</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
