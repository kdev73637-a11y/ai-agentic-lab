"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useClinic } from "@/context/ClinicContext";
import BodyExplorer3D from "@/components/BodyExplorer3D";
import { 
  Search, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Activity, 
  ShieldAlert, 
  ArrowRight, 
  Cpu, 
  Brain, 
  Dna, 
  ShieldCheck, 
  HeartHandshake,
  ArrowUpRight,
  TrendingUp,
  UserCheck
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const { ambulanceSos } = useClinic();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    // Route to doctors search page with query parameters
    router.push(`/doctors?search=${encodeURIComponent(searchQuery)}`);
  };

  const excellenceCenters = [
    {
      title: "Cancer Institute",
      icon: <Dna className="w-6 h-6 text-[#10b981]" />,
      desc: "Genomic profiling, targeted immunotherapy, and CAR-T cell therapeutics.",
      stat: "94% Remission Rate"
    },
    {
      title: "Heart Institute",
      icon: <Activity className="w-6 h-6 text-red-500" />,
      desc: "Robotic angioplasty, 3D holographic mapping, and artificial heart systems.",
      stat: "12k+ Procedures"
    },
    {
      title: "Neuro Sciences",
      icon: <Brain className="w-6 h-6 text-[#0284c7]" />,
      desc: "Deep brain stimulation, neurological mapping, and spinal robotic fusion.",
      stat: "Top 10 Global Ranking"
    },
    {
      title: "Robotic Surgery",
      icon: <Cpu className="w-6 h-6 text-cyan-400" />,
      desc: "DaVinci Xi surgical platforms delivering sub-millimeter precision.",
      stat: "15+ Advanced Rigs"
    }
  ];

  const technologies = [
    {
      title: "AI Diagnostics Engine",
      desc: "99.8% precision diagnostics utilizing multi-spectral imaging neural networks.",
      val: "99.8% Accuracy"
    },
    {
      title: "Smart ICU Monitoring",
      desc: "Continuous physiological forecasting that detects risk thresholds 4 hours in advance.",
      val: "AI Triage Alerts"
    },
    {
      title: "Digital Pathology Vault",
      desc: "Secure HIPAA cloud utilizing blockchain structures to guard genomic reports.",
      val: "E2E Secure"
    }
  ];

  return (
    <div className="w-full bg-mesh pb-20 relative">
      
      {/* Animated Glowing Grid Background */}
      <div className="absolute inset-0 grid-overlay opacity-[0.03] pointer-events-none" />

      {/* EMERGENCY SOS BANNER REDIRECT */}
      {ambulanceSos.active && (
        <div className="w-full bg-red-600/90 text-white text-xs py-3 px-6 text-center font-bold flex items-center justify-center gap-3 animate-pulse border-b border-red-500 z-30">
          <ShieldAlert className="w-5 h-5 text-white animate-bounce shrink-0" />
          <span>
            CRITICAL EVENT ACTIVE: Ambulance SOS Dispatched to Mumbai sector. Estimated Arrival: <strong className="underline text-emerald-300">{ambulanceSos.eta} mins</strong>.
          </span>
          <Link 
            href="/emergency" 
            className="px-3 py-1 rounded-lg bg-white text-red-600 hover:bg-slate-100 transition-colors ml-4 text-[10px] uppercase tracking-wider font-extrabold"
          >
            Track Live GPS Map
          </Link>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative px-6 pt-16 md:pt-24 pb-16 max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Glowing Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#0284c7]/20 bg-[#0284c7]/5 text-[#0284c7] dark:text-[#38bdf8] text-xs font-semibold mb-6 animate-float">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Pioneering Generative Healthcare Systems</span>
        </div>

        {/* Headlines */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl text-slate-800 dark:text-white leading-[1.1] text-glow">
          Welcome to <span className="gradient-text">Devroshan Clinic</span>
        </h1>
        <p className="text-base md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mt-6 leading-relaxed">
          Advanced AI-powered healthcare, smart consultations, and world-class medical services for modern patients. 
        </p>

        {/* AI-Powered Doctor Semantic Search */}
        <form 
          onSubmit={handleSearchSubmit}
          className="w-full max-w-2xl mt-10 glass-panel bg-white/70 dark:bg-slate-900/60 p-2 rounded-2xl md:rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-2 shadow-xl hover:shadow-[#0284c7]/10 transition-shadow"
        >
          <div className="flex-1 flex items-center gap-2 px-3">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Query specialists... (e.g. Cardiologist near Mumbai, high BP help)"
              className="w-full bg-transparent border-none text-sm text-slate-800 dark:text-slate-200 focus:outline-none placeholder-slate-400"
            />
          </div>
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3 rounded-xl md:rounded-2xl bg-gradient-to-r from-[#0284c7] to-[#10b981] text-white text-xs font-bold hover:shadow-lg hover:shadow-[#0284c7]/20 transition-all cursor-pointer flex items-center justify-center gap-1"
          >
            <span>Ask AI Finder</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Floating statistics counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-16 max-w-6xl">
          {[
            { metric: "1.2M+", label: "Smart Consultations", sub: "99.8% satisfaction" },
            { metric: "99.8%", label: "Diagnostic Accuracy", sub: "AI validation model" },
            { metric: "480+", label: "Robotic Procedures", sub: "Sub-mm precision" },
            { metric: "100%", label: "HIPAA Patient Security", sub: "Encrypted vaults" }
          ].map((stat, idx) => (
            <div 
              key={idx} 
              className="p-5 glass-panel rounded-2xl border border-slate-200/50 dark:border-slate-800/40 text-left hover:scale-[1.02] transition-transform bg-white/30 dark:bg-slate-900/20"
            >
              <h3 className="text-3xl font-extrabold gradient-text">{stat.metric}</h3>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">{stat.label}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* 4 Core Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full mt-12 max-w-6xl">
          <Link 
            href="/booking" 
            className="p-4 glass-panel glass-panel-hover rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center gap-3 bg-white/40 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0284c7]/10 flex items-center justify-center text-[#0284c7] dark:text-[#38bdf8]">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Book Appointment</span>
          </Link>
          <Link 
            href="/doctors" 
            className="p-4 glass-panel glass-panel-hover rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center gap-3 bg-white/40 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <UserCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Find Doctor</span>
          </Link>
          <Link 
            href="/emergency" 
            className="p-4 glass-panel glass-panel-hover rounded-2xl border border-red-500/30 hover:border-red-500/60 flex flex-col items-center text-center gap-3 bg-red-500/5 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-red-500">Emergency SOS</span>
          </Link>
          <Link 
            href="/health-packages" 
            className="p-4 glass-panel glass-panel-hover rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center gap-3 bg-white/40 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Health Packages</span>
          </Link>
        </div>

      </section>

      {/* 3D MEDICAL EXPERIENCE SECTION */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="flex flex-col gap-3 mb-10 max-w-3xl">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#0284c7]">Interactive Medical Metaverse</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white">
            Explore Your Anatomy with <span className="gradient-text">BodyExplorer3D</span>
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Click on active anatomical organs below to isolate specific clinical telemetry, analyze related physiological biomarkers, and locate suitable specialists immediately.
          </p>
        </div>

        <BodyExplorer3D />
      </section>

      {/* CENTRES OF EXCELLENCE */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="flex flex-col gap-3 mb-10 max-w-3xl">
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-500">Clinical Leadership</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white">
            Centres of Medical Excellence
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Pioneering customized medicine across highly focused research institutes and specialized diagnostic environments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {excellenceCenters.map((center, idx) => (
            <div 
              key={idx}
              className="p-6 glass-panel rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/10 hover:shadow-lg hover:shadow-[#0284c7]/5 hover:-translate-y-1 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-950 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-center mb-5">
                  {center.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{center.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{center.desc}</p>
              </div>
              <div className="mt-6 border-t border-slate-100 dark:border-slate-800 pt-4 flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold text-emerald-500 bg-emerald-500/5 px-2 py-0.5 rounded">
                  {center.stat}
                </span>
                <Link href="/specialities" className="text-xs text-[#0284c7] dark:text-[#38bdf8] flex items-center gap-0.5 hover:underline">
                  <span>Explore</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ADVANCED MEDICAL TECHNOLOGY SHOWCASE */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="w-full glass-panel rounded-3xl p-8 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-bl from-[#0284c7]/20 to-transparent rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-xl">
              <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400">Futuristic Capabilities</span>
              <h2 className="text-3xl md:text-5xl font-extrabold mt-3 text-white leading-tight">
                Empowered by Next-Gen Medical Technology
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed mt-4">
                We integrate state-of-the-art technological capabilities in digital surgery and robotic support. Sub-millimeter accuracy algorithms allow our surgeons to perform highly complicated cardiovascular resections, deep brain stimulation mapping, and real-time DNA tumor screenings with unparalleled security.
              </p>
              
              <div className="flex items-center gap-4 mt-8">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>ISO 27001 Cryptographic Safeguards</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-semibold">
                  <HeartHandshake className="w-4 h-4 text-emerald-400" />
                  <span>JCI Hospital Standards</span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-96 flex flex-col gap-4 shrink-0">
              {technologies.map((tech, idx) => (
                <div 
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700 hover:border-slate-600 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-white">{tech.title}</h4>
                    <span className="px-2 py-0.5 rounded text-[8px] font-extrabold bg-[#0284c7]/20 text-[#38bdf8] uppercase tracking-wide">
                      {tech.val}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* HEALTH NEWS & GEN AI TIPS */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="flex flex-col gap-3 mb-10 max-w-3xl">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#0284c7]">Auto-Generated Health Intelligence</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white">
            Devroshan Gen AI Wellness Hub
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Personalized health tips, clinical blog posts, and active wellness guidance refreshed daily by our diagnostic engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Cardiopulmonary Longevity Metrics",
              category: "Heart & Aerobics",
              desc: "How real-time heart rate variability (HRV) sync detects metabolic stress levels up to 3 days prior.",
              date: "May 26, 2026",
              img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=400"
            },
            {
              title: "Understanding High-Field fMRI Diagnostics",
              category: "Neurology Tech",
              desc: "Deep dive into real-time neural mapping and epilepsy forecast models currently operating in our Delhi Neuro Center.",
              date: "May 25, 2026",
              img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400"
            },
            {
              title: "The Genomic Revolution in Cancer Care",
              category: "Oncology Sequencing",
              desc: "Auto-analyzing tumor DNA markers to program tailored immuno-therapies, driving cancer into complete remission.",
              date: "May 24, 2026",
              img: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=400"
            }
          ].map((blog, idx) => (
            <div 
              key={idx}
              className="group glass-panel rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/10 overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="h-48 w-full overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={blog.img} 
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur text-white text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full">
                  {blog.category}
                </span>
              </div>
              <div className="p-6">
                <span className="text-[10px] text-slate-400 font-medium">{blog.date}</span>
                <h3 className="text-base font-bold text-slate-800 dark:text-white mt-2 group-hover:text-[#0284c7] transition-colors leading-snug">
                  {blog.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {blog.desc}
                </p>
                <div className="mt-5 flex justify-between items-center text-xs font-bold text-[#0284c7] dark:text-[#38bdf8] group/btn cursor-pointer">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
