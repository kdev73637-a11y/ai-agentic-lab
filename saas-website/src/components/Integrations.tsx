'use client';
import { useEffect, useRef } from 'react';

const integrations = [
  { name: 'Google', emoji: '🔍', color: 'from-blue-500 to-indigo-500', desc: 'Analytics & Ads', url: 'https://google.com' },
  { name: 'WhatsApp', emoji: '💬', color: 'from-green-500 to-emerald-500', desc: 'Messaging', url: 'https://whatsapp.com' },
  { name: 'Slack', emoji: '⚡', color: 'from-purple-500 to-violet-500', desc: 'Team Chat', url: 'https://slack.com' },
  { name: 'HubSpot', emoji: '🎯', color: 'from-orange-500 to-red-500', desc: 'CRM', url: 'https://hubspot.com' },
  { name: 'Salesforce', emoji: '☁️', color: 'from-blue-500 to-cyan-500', desc: 'Enterprise CRM', url: 'https://salesforce.com' },
  { name: 'Stripe', emoji: '💳', color: 'from-violet-500 to-indigo-500', desc: 'Payments', url: 'https://stripe.com' },
  { name: 'Shopify', emoji: '🛍️', color: 'from-green-500 to-teal-500', desc: 'E-Commerce', url: 'https://shopify.com' },
  { name: 'Zoom', emoji: '📹', color: 'from-blue-500 to-sky-500', desc: 'Video Calls', url: 'https://zoom.us' },
  { name: 'Microsoft', emoji: '🪟', color: 'from-blue-500 to-indigo-600', desc: 'Office Suite', url: 'https://microsoft.com' },
  { name: 'OpenAI', emoji: '🤖', color: 'from-slate-400 to-slate-600', desc: 'AI Models', url: 'https://openai.com' },
  { name: 'Mailchimp', emoji: '📧', color: 'from-yellow-500 to-amber-500', desc: 'Email Marketing', url: 'https://mailchimp.com' },
  { name: 'Zapier', emoji: '⚡', color: 'from-orange-500 to-amber-500', desc: 'Automation', url: 'https://zapier.com' },
  { name: 'Notion', emoji: '📝', color: 'from-slate-400 to-gray-500', desc: 'Docs & Wiki', url: 'https://notion.so' },
  { name: 'Airtable', emoji: '📊', color: 'from-yellow-500 to-orange-500', desc: 'Database', url: 'https://airtable.com' },
  { name: 'Twilio', emoji: '📱', color: 'from-red-500 to-rose-500', desc: 'SMS & Voice', url: 'https://twilio.com' },
  { name: 'GitHub', emoji: '🐙', color: 'from-slate-500 to-slate-700', desc: 'Code & CI/CD', url: 'https://github.com' },
  { name: 'AWS', emoji: '🌐', color: 'from-amber-500 to-orange-600', desc: 'Cloud', url: 'https://aws.amazon.com' },
  { name: 'Firebase', emoji: '🔥', color: 'from-amber-400 to-yellow-500', desc: 'Backend', url: 'https://firebase.google.com' },
];

export default function Integrations() {
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
    <section id="integrations" ref={sectionRef} className="relative py-24 px-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      </div>
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="badge inline-flex mb-4 reveal">🔌 Integrations</div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 reveal reveal-delay-1">
            Connects to
            <span className="gradient-text"> Everything</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto reveal reveal-delay-2">
            500+ integrations. Connect DevAIO to every tool your team uses in minutes.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 reveal reveal-delay-3">
          {integrations.map((item, i) => (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-2xl p-4 card-hover cursor-pointer group text-center relative overflow-hidden block focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-3 text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                {item.emoji}
              </div>
              <p className="text-white font-medium text-sm">{item.name}</p>
              <p className="text-slate-500 text-xs mt-0.5">{item.desc}</p>
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 30%, rgba(99,102,241,0.15) 0%, transparent 70%)` }} />
            </a>
          ))}
        </div>

        <div className="text-center mt-10 reveal">
          <p className="text-slate-500 text-sm mb-4">And 480+ more integrations available</p>
          <a
            href="https://zapier.com/apps"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm px-6 py-2.5 inline-block"
          >
            View All Integrations →
          </a>
        </div>
      </div>
    </section>
  );
}
