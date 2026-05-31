'use client';
import { useEffect, useRef } from 'react';
import {
  Bot, MessageSquare, Users, GitBranch, TrendingUp, BarChart3,
  UserPlus, Megaphone, HeadphonesIcon, Search, Database, Plug2
} from 'lucide-react';

const features = [
  { icon: Bot, title: 'AI Automation', desc: 'Automate repetitive tasks with intelligent AI that learns and adapts to your business processes.', color: 'from-indigo-500 to-purple-600', glow: 'rgba(99,102,241,0.3)' },
  { icon: MessageSquare, title: 'AI Chatbot Integration', desc: 'Deploy 24/7 AI chatbots on your website, WhatsApp, and social platforms to engage customers instantly.', color: 'from-purple-500 to-pink-600', glow: 'rgba(168,85,247,0.3)' },
  { icon: Users, title: 'CRM Management', desc: 'Smart CRM with AI-powered lead scoring, pipeline tracking, and automated follow-ups.', color: 'from-cyan-500 to-blue-600', glow: 'rgba(34,211,238,0.3)' },
  { icon: GitBranch, title: 'Workflow Automation', desc: 'Build complex automated workflows with drag-and-drop simplicity. No code required.', color: 'from-blue-500 to-indigo-600', glow: 'rgba(96,165,250,0.3)' },
  { icon: UserPlus, title: 'Lead Generation', desc: 'AI-powered lead capture, qualification, and nurturing pipelines that convert 3x more prospects.', color: 'from-green-500 to-cyan-600', glow: 'rgba(34,197,94,0.3)' },
  { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Real-time insights and AI-driven analytics that help you make data-driven decisions instantly.', color: 'from-orange-500 to-red-600', glow: 'rgba(249,115,22,0.3)' },
  { icon: Users, title: 'Team Collaboration', desc: 'Unified workspace for teams to collaborate, share AI agents, and track performance together.', color: 'from-violet-500 to-purple-600', glow: 'rgba(139,92,246,0.3)' },
  { icon: Megaphone, title: 'Marketing Automation', desc: 'AI-powered email campaigns, social media scheduling, and personalized marketing at scale.', color: 'from-rose-500 to-pink-600', glow: 'rgba(244,63,94,0.3)' },
  { icon: HeadphonesIcon, title: 'Customer Support AI', desc: 'Resolve 80% of support tickets automatically with intelligent AI that understands context.', color: 'from-teal-500 to-cyan-600', glow: 'rgba(20,184,166,0.3)' },
  { icon: Search, title: 'Smart Search System', desc: 'Semantic AI search across your entire knowledge base. Find anything in milliseconds.', color: 'from-amber-500 to-orange-600', glow: 'rgba(245,158,11,0.3)' },
  { icon: Database, title: 'Data Insights', desc: 'Transform raw data into actionable intelligence with AI-powered analysis and predictions.', color: 'from-indigo-400 to-cyan-500', glow: 'rgba(99,102,241,0.3)' },
  { icon: Plug2, title: 'API Integrations', desc: '500+ pre-built integrations with your favorite tools. Connect everything in minutes.', color: 'from-purple-400 to-indigo-500', glow: 'rgba(168,85,247,0.3)' },
];

export default function Features() {
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
    <section id="features" ref={sectionRef} className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge inline-flex mb-4 reveal">⚡ Platform Features</div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 reveal reveal-delay-1">
            Everything You Need to
            <span className="gradient-text"> Dominate</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto reveal reveal-delay-2">
            12 powerful AI-driven features designed to automate, accelerate, and amplify every aspect of your business.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={i}
                className={`reveal reveal-delay-${Math.min(i % 6 + 1, 6)} glass-card rounded-2xl p-6 card-hover cursor-pointer group relative overflow-hidden`}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${feat.glow} 0%, transparent 60%)` }}
                />
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center mb-4 relative z-10 transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold text-base mb-2 relative z-10">{feat.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed relative z-10">{feat.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-indigo-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10">
                  Learn more →
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
