'use client';
import { useEffect, useRef } from 'react';
import { TrendingUp, DollarSign, UserPlus, Zap } from 'lucide-react';

const cases = [
  {
    icon: TrendingUp,
    category: 'Healthcare Clinic',
    title: 'MedPlus Clinic grew from 200 to 1,200 patients/month',
    desc: 'Implemented AI scheduling, automated follow-ups, and a patient portal. Patient acquisition tripled while staff workload decreased by 60%.',
    metrics: [
      { label: 'Patient Growth', value: '+500%', color: 'text-green-400' },
      { label: 'Staff Time Saved', value: '60%', color: 'text-cyan-400' },
      { label: 'Revenue Increase', value: '$1.2M', color: 'text-purple-400' },
    ],
    color: 'from-green-500/10 to-cyan-500/10',
    border: 'border-green-500/20',
    gradient: 'from-green-500 to-cyan-500',
  },
  {
    icon: DollarSign,
    category: 'E-Commerce Store',
    title: 'ShopSmart doubled revenue with AI-powered automation',
    desc: 'Deployed AI chatbots, personalized email campaigns, and automated abandoned cart recovery. Conversion rate went from 1.8% to 4.9%.',
    metrics: [
      { label: 'Revenue Growth', value: '+213%', color: 'text-indigo-400' },
      { label: 'Conversion Rate', value: '4.9%', color: 'text-blue-400' },
      { label: 'Cart Recovery', value: '$340K', color: 'text-purple-400' },
    ],
    color: 'from-indigo-500/10 to-purple-500/10',
    border: 'border-indigo-500/20',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    icon: UserPlus,
    category: 'B2B SaaS Company',
    title: 'TechFlow went from 50 to 4,200 enterprise leads/month',
    desc: 'AI Sales Agent qualified inbound leads 24/7, automated outreach sequences, and booked meetings directly into calendars. Sales team 4x more productive.',
    metrics: [
      { label: 'Lead Volume', value: '+8300%', color: 'text-cyan-400' },
      { label: 'Sales Productivity', value: '4x', color: 'text-green-400' },
      { label: 'CAC Reduction', value: '-65%', color: 'text-purple-400' },
    ],
    color: 'from-cyan-500/10 to-blue-500/10',
    border: 'border-cyan-500/20',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Zap,
    category: 'Logistics Company',
    title: 'LogiPro automated 95% of operations saving $2M/year',
    desc: 'End-to-end workflow automation for order processing, dispatch routing, customer notifications, and invoice generation. Zero manual data entry.',
    metrics: [
      { label: 'Operations Automated', value: '95%', color: 'text-amber-400' },
      { label: 'Annual Savings', value: '$2M+', color: 'text-orange-400' },
      { label: 'Error Reduction', value: '-98%', color: 'text-red-400' },
    ],
    color: 'from-amber-500/10 to-orange-500/10',
    border: 'border-amber-500/20',
    gradient: 'from-amber-500 to-orange-500',
  },
];

export default function CaseStudies() {
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
    <section id="cases" ref={sectionRef} className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="badge inline-flex mb-4 reveal">📈 Case Studies</div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 reveal reveal-delay-1">
            Real Results,
            <span className="gradient-text"> Real Growth</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto reveal reveal-delay-2">
            See how businesses across industries transformed with DevAIO.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                className={`reveal reveal-delay-${i % 4 + 1} glass-card rounded-2xl p-7 card-hover border ${c.border} bg-gradient-to-br ${c.color} relative overflow-hidden group`}
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 uppercase tracking-wider">{c.category}</span>
                    <h3 className="text-white font-semibold text-lg leading-snug mt-0.5">{c.title}</h3>
                  </div>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-6">{c.desc}</p>

                <div className="grid grid-cols-3 gap-3">
                  {c.metrics.map((m, j) => (
                    <div key={j} className="glass rounded-xl p-3 text-center">
                      <div className={`text-xl font-bold font-heading ${m.color}`}>{m.value}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>

                <button className="mt-5 text-indigo-400 text-sm font-medium hover:text-indigo-300 transition-colors flex items-center gap-1">
                  Read Full Case Study →
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
