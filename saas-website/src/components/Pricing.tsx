'use client';
import { useState, useEffect, useRef } from 'react';
import { Check, Zap, Star } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const plans = [
  {
    name: 'Starter',
    desc: 'Perfect for small businesses and solopreneurs.',
    monthlyPrice: 49,
    yearlyPrice: 39,
    color: 'from-slate-500 to-slate-600',
    featured: false,
    features: [
      '2 AI Agents',
      '5,000 AI tasks/month',
      'Basic CRM (500 contacts)',
      'Email automation',
      'Standard analytics',
      'Email support',
      'API access (100 calls/day)',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Professional',
    desc: 'For growing teams who need powerful AI automation.',
    monthlyPrice: 149,
    yearlyPrice: 119,
    color: 'from-indigo-500 to-purple-600',
    featured: true,
    badge: 'Most Popular',
    features: [
      '10 AI Agents',
      '100,000 AI tasks/month',
      'Full CRM (10,000 contacts)',
      'WhatsApp + Email automation',
      'Advanced analytics & reports',
      'Priority support (24h)',
      'API access (5,000 calls/day)',
      'Workflow builder',
      'Team collaboration (10 users)',
      'Custom AI training',
    ],
    cta: 'Start Free Trial',
  },
  {
    name: 'Enterprise',
    desc: 'Unlimited scale with white-label and dedicated infrastructure.',
    monthlyPrice: 499,
    yearlyPrice: 399,
    color: 'from-purple-500 to-pink-600',
    featured: false,
    features: [
      'Unlimited AI Agents',
      'Unlimited AI tasks',
      'Unlimited CRM contacts',
      'All automation channels',
      'Custom dashboards & BI',
      'Dedicated support + SLA',
      'Unlimited API access',
      'Multi-tenant architecture',
      'White-label solution',
      'SSO & custom domains',
      'On-premise deployment',
      'Custom AI model fine-tuning',
    ],
    cta: 'Contact Sales',
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { openModal } = useAuth();

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
    <section id="pricing" ref={sectionRef} className="relative py-24 px-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-900/15 rounded-full blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <div className="badge inline-flex mb-4 reveal">💎 Pricing</div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 reveal reveal-delay-1">
            Simple,
            <span className="gradient-text"> Transparent</span> Pricing
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8 reveal reveal-delay-2">
            No hidden fees. Cancel anytime. Scale as you grow.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 reveal reveal-delay-3">
            <span className={`text-sm font-medium ${!annual ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                annual ? 'bg-indigo-500' : 'bg-slate-700'
              }`}
            >
              <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                annual ? 'translate-x-8' : 'translate-x-1'
              }`} />
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${annual ? 'text-white' : 'text-slate-500'}`}>Annual</span>
              <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full">Save 20%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} relative rounded-2xl p-7 flex flex-col transition-all duration-300 card-hover ${
                plan.featured
                  ? 'pricing-featured scale-[1.02]'
                  : 'glass-card'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    <Star className="w-3 h-3 fill-white" />
                    {plan.badge}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${plan.color} mb-3`}>
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-white font-heading font-bold text-xl mb-1">{plan.name}</h3>
                <p className="text-slate-400 text-sm">{plan.desc}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold font-heading gradient-text">
                    ${annual ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-slate-500">/mo</span>
                </div>
                {annual && (
                  <p className="text-green-400 text-xs mt-1">Save ${(plan.monthlyPrice - plan.yearlyPrice) * 12}/year</p>
                )}
              </div>

              <ul className="space-y-2.5 flex-1 mb-8">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <div className={`w-4.5 h-4.5 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-slate-300 text-sm">{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => plan.name === 'Enterprise' ? undefined : openModal('register')}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  plan.featured
                    ? 'btn-primary'
                    : 'btn-secondary'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-slate-600 text-sm mt-8 reveal">
          All plans include 14-day free trial · No credit card required · Cancel anytime
        </p>
      </div>
    </section>
  );
}
