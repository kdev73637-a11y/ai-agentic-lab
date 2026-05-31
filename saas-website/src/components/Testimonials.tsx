'use client';
import { useEffect, useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechVentures Inc.',
    company: 'TechVentures',
    avatar: 'SJ',
    avatarColor: 'from-blue-500 to-cyan-500',
    rating: 5,
    text: 'DevAIO transformed our entire sales operation. The AI Sales Agent is closing 3x more deals than our human team was before, working around the clock. ROI was visible in the first week.',
    metrics: { label: 'Revenue Growth', value: '+340%' },
  },
  {
    name: 'Marcus Chen',
    role: 'CTO, ScaleUp Labs',
    company: 'ScaleUp Labs',
    avatar: 'MC',
    avatarColor: 'from-purple-500 to-indigo-500',
    rating: 5,
    text: 'The workflow automation capabilities are incredible. We automated 80% of our operations in just 2 weeks. The AI chatbot handles 500+ customer queries daily without any human intervention.',
    metrics: { label: 'Tasks Automated', value: '95%' },
  },
  {
    name: 'Priya Patel',
    role: 'Head of Marketing, GrowthOS',
    company: 'GrowthOS',
    avatar: 'PP',
    avatarColor: 'from-pink-500 to-rose-500',
    rating: 5,
    text: 'Our lead generation went from 50 to 850 qualified leads per month. The AI marketing agent writes better copy than most humans and runs campaigns 24/7. Absolutely game-changing.',
    metrics: { label: 'Lead Increase', value: '+1600%' },
  },
  {
    name: 'James Rivera',
    role: 'Operations Director, MedCare Plus',
    company: 'MedCare Plus',
    avatar: 'JR',
    avatarColor: 'from-green-500 to-teal-500',
    rating: 5,
    text: 'We deployed DevAIO for our healthcare clinic. Patient scheduling, follow-ups, and prescription reminders are now fully automated. Patient satisfaction is at an all-time high.',
    metrics: { label: 'Patient Satisfaction', value: '98%' },
  },
  {
    name: 'Aisha Williams',
    role: 'Founder, EcommerceAI',
    company: 'EcommerceAI',
    avatar: 'AW',
    avatarColor: 'from-amber-500 to-orange-500',
    rating: 5,
    text: 'Support tickets dropped by 70% after deploying the AI Support Agent. Our CSAT score went from 3.2 to 4.9 stars. Our team now focuses on strategy instead of repetitive tasks.',
    metrics: { label: 'Ticket Reduction', value: '-70%' },
  },
  {
    name: 'David Kim',
    role: 'VP Sales, Enterprise Corp',
    company: 'Enterprise Corp',
    avatar: 'DK',
    avatarColor: 'from-indigo-500 to-violet-500',
    rating: 5,
    text: 'The enterprise features are rock-solid. SSO, white-labeling, multi-tenant support — everything works perfectly. Their team onboarded our 500-person organization in under a week.',
    metrics: { label: 'Time to Value', value: '< 1 week' },
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section id="testimonials" ref={sectionRef} className="relative py-24 px-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="badge inline-flex mb-4 reveal">⭐ Testimonials</div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 reveal reveal-delay-1">
            Loved by
            <span className="gradient-text"> 50,000+ Teams</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto reveal reveal-delay-2">
            Real results from real businesses. See why DevAIO is the #1 AI automation platform.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="reveal reveal-delay-3 mb-8">
          <div className="max-w-3xl mx-auto">
            <div className="gradient-border">
              <div className="glass-card rounded-2xl p-8 md:p-10 relative overflow-hidden">
                <div className="absolute top-6 right-8 text-indigo-500/20">
                  <Quote className="w-24 h-24" />
                </div>

                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-200 text-lg md:text-xl leading-relaxed mb-8 relative z-10 transition-all duration-500">
                  "{testimonials[current].text}"
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonials[current].avatarColor} flex items-center justify-center font-bold text-white text-sm`}>
                      {testimonials[current].avatar}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{testimonials[current].name}</p>
                      <p className="text-slate-400 text-sm">{testimonials[current].role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="gradient-text text-2xl font-bold font-heading">{testimonials[current].metrics.value}</div>
                    <div className="text-slate-500 text-xs">{testimonials[current].metrics.label}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mb-10 reveal">
          <button onClick={prev} className="btn-secondary p-2 rounded-full">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === current ? 'w-8 h-2.5 bg-indigo-500' : 'w-2.5 h-2.5 bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
          <button onClick={next} className="btn-secondary p-2 rounded-full">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* All testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              onClick={() => setCurrent(i)}
              className={`reveal reveal-delay-${i % 6 + 1} glass-card rounded-2xl p-6 card-hover cursor-pointer transition-all duration-300 ${
                i === current ? 'border-indigo-500/40' : ''
              }`}
            >
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-white text-xs font-bold`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.company}</p>
                </div>
                <div className="ml-auto text-right">
                  <div className="gradient-text font-bold text-sm">{t.metrics.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
