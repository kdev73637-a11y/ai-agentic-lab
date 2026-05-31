'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play, TrendingUp, Users, Zap, Brain, BarChart3, Shield } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const stats = [
  { value: '50K+', label: 'Active Users', icon: Users },
  { value: '99.9%', label: 'Uptime SLA', icon: Shield },
  { value: '10M+', label: 'Tasks Automated', icon: Zap },
  { value: '340%', label: 'Avg ROI', icon: TrendingUp },
];

const trustedLogos = [
  'Google', 'Microsoft', 'Salesforce', 'HubSpot', 'Stripe', 'Shopify', 'Slack', 'OpenAI', 'Zoom', 'Oracle'
];

const floatingBadges = [
  { icon: Brain, label: 'AI Running', color: 'from-purple-500/20 to-indigo-500/20', border: 'border-purple-500/30', top: '15%', left: '5%', delay: '0s' },
  { icon: BarChart3, label: '+340% ROI', color: 'from-cyan-500/20 to-blue-500/20', border: 'border-cyan-500/30', top: '70%', left: '2%', delay: '1s' },
  { icon: Zap, label: 'Automated', color: 'from-indigo-500/20 to-purple-500/20', border: 'border-indigo-500/30', top: '20%', right: '3%', delay: '0.5s' },
  { icon: TrendingUp, label: 'Live Analytics', color: 'from-green-500/20 to-cyan-500/20', border: 'border-green-500/30', top: '75%', right: '2%', delay: '1.5s' },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const { openModal } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);


  return (
    <section id="home" ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.8) 0%, transparent 70%)',
            top: '-10%',
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'orb 15s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.8) 0%, transparent 70%)',
            top: '30%',
            left: '-5%',
            animation: 'orb 20s ease-in-out infinite reverse',
          }}
        />
        <div
          className="absolute w-[350px] h-[350px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(34,211,238,0.8) 0%, transparent 70%)',
            top: '40%',
            right: '-5%',
            animation: 'orb 18s ease-in-out 2s infinite',
          }}
        />
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="absolute inset-0 grid-lines opacity-30" />
      </div>

      {/* Floating Badges */}
      {floatingBadges.map((badge, i) => {
        const Icon = badge.icon;
        return (
          <div
            key={i}
            className={`absolute hidden xl:flex items-center gap-2 glass px-3 py-2 rounded-xl bg-gradient-to-r ${badge.color} border ${badge.border} text-xs font-medium text-white/90 shadow-lg`}
            style={{
              top: badge.top,
              left: badge.left,
              right: (badge as any).right,
              animation: `float 6s ease-in-out ${badge.delay} infinite`,
            }}
          >
            <Icon className="w-3.5 h-3.5 text-indigo-400" />
            {badge.label}
          </div>
        );
      })}

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 badge mb-6 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="status-dot" />
          <span>AI Platform v3.0 — Now Live</span>
        </div>

        {/* Headline */}
        <h1
          className={`font-heading font-bold text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight mb-6 transition-all duration-700 delay-100 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-white">Automate Your</span>
          <br />
          <span className="gradient-text">Business with AI</span>
          <br />
          <span className="text-white">Agents</span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Deploy intelligent AI agents that automate workflows, manage CRM, generate leads,
          and scale your operations — all from one powerful platform.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-700 delay-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button
            onClick={() => openModal('register')}
            className="btn-primary flex items-center gap-2 text-base px-8 py-4"
          >
            Start Free Trial
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => openModal('login')}
            className="btn-secondary flex items-center gap-2 text-base px-8 py-4"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Play className="w-3.5 h-3.5 text-white fill-white" />
            </div>
            Sign In
          </button>
        </div>

        {/* Dashboard Preview */}
        <div
          className={`relative max-w-4xl mx-auto transition-all duration-1000 delay-500 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          <div className="gradient-border">
            <div className="glass-card rounded-2xl p-4 relative overflow-hidden">
              {/* Window Bar */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <div className="ml-4 flex-1 glass rounded-md px-3 py-1 text-xs text-slate-500">
                  app.devaio.com/dashboard
                </div>
              </div>
              {/* Dashboard Content */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                {[{label:'Revenue', val:'$284K', change:'+28%', color:'indigo'},{label:'AI Tasks', val:'48.2K', change:'+52%', color:'purple'},{label:'Leads', val:'3,847', change:'+41%', color:'cyan'},{label:'Users', val:'12.5K', change:'+19%', color:'green'}].map((kpi,i) => (
                  <div key={i} className="glass rounded-xl p-3">
                    <p className="text-slate-500 text-xs mb-1">{kpi.label}</p>
                    <p className="text-white font-bold text-lg">{kpi.val}</p>
                    <p className="text-green-400 text-xs">{kpi.change}</p>
                  </div>
                ))}
              </div>
              {/* Chart Area */}
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2 glass rounded-xl p-3">
                  <p className="text-slate-400 text-xs mb-3">Revenue Analytics</p>
                  <div className="flex items-end gap-1 h-24">
                    {[35,55,45,70,60,80,65,90,75,95,85,100].map((h, i) => (
                      <div key={i} className="flex-1 chart-bar" style={{height:`${h}%`}} />
                    ))}
                  </div>
                </div>
                <div className="glass rounded-xl p-3">
                  <p className="text-slate-400 text-xs mb-2">AI Agents</p>
                  <div className="space-y-2">
                    {['Sales','Support','Marketing','Research'].map((a,i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="status-dot" />
                        <span className="text-slate-300 text-xs">{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Glow under card */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-indigo-600/20 blur-3xl rounded-full" />
        </div>
      </div>

      {/* Stats Bar */}
      <div className={`relative z-10 w-full max-w-4xl mx-auto px-6 mt-20 transition-all duration-700 delay-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="glass-card rounded-2xl px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="text-center">
                  <div className="flex justify-center mb-2">
                    <Icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold font-heading gradient-text">{stat.value}</div>
                  <div className="text-slate-500 text-xs mt-1">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Trusted By */}
      <div className={`relative z-10 w-full mt-12 transition-all duration-700 delay-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-center text-slate-600 text-xs uppercase tracking-widest mb-6">Trusted by industry leaders</p>
        <div className="relative overflow-hidden">
          <div
            className="flex gap-12 items-center"
            style={{ animation: 'marquee 25s linear infinite', width: 'max-content' }}
          >
            {[...trustedLogos, ...trustedLogos].map((logo, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-600 hover:text-slate-400 transition-colors whitespace-nowrap">
                <div className="w-2 h-2 rounded-full bg-indigo-500/50" />
                <span className="text-sm font-medium">{logo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
