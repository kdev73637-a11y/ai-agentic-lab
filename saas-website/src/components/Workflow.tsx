'use client';
import { useEffect, useRef } from 'react';
import { Link2, Settings, Zap, BarChart3, TrendingUp } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Link2,
    title: 'Connect Business',
    desc: 'Integrate your existing tools, data sources, and platforms in minutes with our 500+ pre-built connectors.',
    color: 'from-blue-500 to-cyan-500',
    tags: ['CRM', 'Email', 'WhatsApp', 'Slack'],
  },
  {
    number: '02',
    icon: Settings,
    title: 'Configure AI',
    desc: 'Train your AI agents with your business knowledge, set custom rules, and define automation triggers.',
    color: 'from-indigo-500 to-purple-500',
    tags: ['AI Training', 'Knowledge Base', 'Custom Rules'],
  },
  {
    number: '03',
    icon: Zap,
    title: 'Automate Tasks',
    desc: 'Deploy AI agents that handle leads, support tickets, campaigns, and workflows automatically 24/7.',
    color: 'from-purple-500 to-pink-500',
    tags: ['Auto Workflows', 'AI Agents', '24/7 Operation'],
  },
  {
    number: '04',
    icon: BarChart3,
    title: 'Analyze Results',
    desc: 'Get deep insights from real-time analytics, AI-generated reports, and performance dashboards.',
    color: 'from-green-500 to-teal-500',
    tags: ['Real-time Data', 'AI Reports', 'KPI Tracking'],
  },
  {
    number: '05',
    icon: TrendingUp,
    title: 'Scale Operations',
    desc: 'Expand your AI deployment across teams and departments as your business grows without limits.',
    color: 'from-orange-500 to-amber-500',
    tags: ['Multi-team', 'Enterprise', 'Unlimited Scale'],
  },
];

export default function Workflow() {
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
    <section id="workflow" ref={sectionRef} className="relative py-24 px-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      </div>
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="badge inline-flex mb-4 reveal">⚡ How It Works</div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 reveal reveal-delay-1">
            Go Live in
            <span className="gradient-text"> 5 Simple Steps</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto reveal reveal-delay-2">
            From setup to full AI automation in under 48 hours. No technical expertise needed.
          </p>
        </div>

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden lg:block relative">
          {/* Connector Line */}
          <div className="absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-orange-500/50" style={{ top: '52px' }} />

          <div className="grid grid-cols-5 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className={`reveal reveal-delay-${i + 1} flex flex-col items-center text-center`}>
                  {/* Icon Circle */}
                  <div className={`relative w-[104px] h-[104px] rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-2xl z-10`}
                    style={{ boxShadow: `0 0 30px ${step.color.includes('blue') ? 'rgba(59,130,246,0.4)' : step.color.includes('indigo') ? 'rgba(99,102,241,0.4)' : step.color.includes('purple') ? 'rgba(168,85,247,0.4)' : step.color.includes('green') ? 'rgba(34,197,94,0.4)' : 'rgba(249,115,22,0.4)'}` }}
                  >
                    <Icon className="w-10 h-10 text-white" />
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#050816] border-2 border-indigo-500/50 flex items-center justify-center">
                      <span className="text-indigo-400 text-xs font-bold">{i + 1}</span>
                    </div>
                  </div>

                  <h3 className="text-white font-semibold text-base mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-3">{step.desc}</p>
                  <div className="flex flex-wrap justify-center gap-1">
                    {step.tags.map((tag, j) => (
                      <span key={j} className="text-xs glass px-2 py-0.5 rounded-full text-slate-400">{tag}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className={`reveal reveal-delay-${i + 1} flex gap-4`}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex-1 w-px bg-gradient-to-b from-indigo-500/50 to-transparent mt-2" />
                  )}
                </div>
                <div className="pb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-slate-600 text-xs font-mono">{step.number}</span>
                    <h3 className="text-white font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-3">{step.desc}</p>
                  <div className="flex flex-wrap gap-1">
                    {step.tags.map((tag, j) => (
                      <span key={j} className="text-xs glass px-2 py-0.5 rounded-full text-slate-400">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 reveal">
          <button className="btn-primary text-base px-10 py-4">
            Start Your AI Journey Today →
          </button>
        </div>
      </div>
    </section>
  );
}
