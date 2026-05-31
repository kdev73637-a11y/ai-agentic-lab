'use client';
import { useEffect, useRef } from 'react';
import {
  Globe, Brain, Cloud, Smartphone, Users, Heart, Settings, Server
} from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Website Development',
    desc: 'Stunning, high-performance websites built with modern tech. From landing pages to enterprise portals.',
    features: ['Next.js / React', 'SEO Optimized', 'Mobile-First', 'CMS Ready'],
    color: 'from-blue-500 to-cyan-500',
    glow: 'rgba(59,130,246,0.3)',
  },
  {
    icon: Brain,
    title: 'AI Development',
    desc: 'Custom AI models, RAG systems, voice agents, and intelligent automation tailored to your use case.',
    features: ['GPT / Claude / Gemini', 'RAG & Vector DB', 'Fine-tuning', 'AI Agents'],
    color: 'from-purple-500 to-indigo-500',
    glow: 'rgba(168,85,247,0.3)',
  },
  {
    icon: Cloud,
    title: 'SaaS Development',
    desc: 'End-to-end SaaS platforms with auth, billing, multi-tenancy, and enterprise-grade architecture.',
    features: ['Multi-tenant', 'Stripe Billing', 'Admin Dashboard', 'API-first'],
    color: 'from-indigo-500 to-violet-500',
    glow: 'rgba(99,102,241,0.3)',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    desc: 'Cross-platform iOS and Android apps with AI features, push notifications, and offline support.',
    features: ['React Native', 'Flutter', 'App Store Ready', 'AI-Powered'],
    color: 'from-green-500 to-teal-500',
    glow: 'rgba(34,197,94,0.3)',
  },
  {
    icon: Users,
    title: 'CRM Solutions',
    desc: 'Custom CRM systems with AI lead scoring, pipeline automation, and deep business intelligence.',
    features: ['Lead Scoring AI', 'Pipeline Automation', 'Analytics', 'Integrations'],
    color: 'from-cyan-500 to-blue-500',
    glow: 'rgba(34,211,238,0.3)',
  },
  {
    icon: Heart,
    title: 'Healthcare Solutions',
    desc: 'HIPAA-compliant healthcare platforms with patient portals, telemedicine, and AI diagnostics.',
    features: ['Patient Portal', 'Telemedicine', 'HIPAA Compliant', 'AI Diagnostics'],
    color: 'from-red-500 to-rose-500',
    glow: 'rgba(239,68,68,0.3)',
  },
  {
    icon: Settings,
    title: 'Business Automation',
    desc: 'End-to-end process automation connecting all your tools into a seamless AI-powered workflow.',
    features: ['Process Mining', 'RPA', 'API Integration', 'Real-time Sync'],
    color: 'from-amber-500 to-orange-500',
    glow: 'rgba(245,158,11,0.3)',
  },
  {
    icon: Server,
    title: 'Cloud Infrastructure',
    desc: 'Scalable, secure cloud architecture on AWS, GCP, and Azure with CI/CD and DevOps automation.',
    features: ['AWS / GCP / Azure', 'CI/CD Pipelines', 'Auto-scaling', '99.9% Uptime'],
    color: 'from-slate-400 to-slate-600',
    glow: 'rgba(148,163,184,0.2)',
  },
];

export default function Services() {
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
    <section id="services" ref={sectionRef} className="relative py-24 px-6 bg-gradient-to-b from-transparent via-dark-800/30 to-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="badge inline-flex mb-4 reveal">🛠️ Our Services</div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 reveal reveal-delay-1">
            Solutions Built for
            <span className="gradient-text"> Scale</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto reveal reveal-delay-2">
            From startups to enterprises — we build, deploy, and grow AI-powered digital products at every scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <div
                key={i}
                className={`reveal reveal-delay-${i % 6 + 1} glass-card rounded-2xl p-6 card-hover group cursor-pointer relative overflow-hidden`}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${svc.glow} 0%, transparent 60%)` }}
                />
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${svc.color} flex items-center justify-center mb-4 relative z-10 transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-white font-semibold text-base mb-2 relative z-10">{svc.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 relative z-10">{svc.desc}</p>
                <ul className="space-y-1.5 relative z-10">
                  {svc.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-slate-500 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/70" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
