"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  Activity, 
  Brain, 
  Dna, 
  Cpu, 
  HeartHandshake, 
  Sparkles, 
  ChevronRight, 
  HelpCircle,
  Clock,
  ShieldCheck
} from "lucide-react";

interface SpecialtyDept {
  id: string;
  name: string;
  icon: React.ReactNode;
  overview: string;
  technologies: string[];
  treatments: string[];
  insights: string;
  faqs: { q: string; a: string }[];
}

function SpecialitiesPageInner() {
  const searchParams = useSearchParams();
  const paramDept = searchParams.get("dept") || "";
  
  const [selectedTab, setSelectedTab] = useState<string>("cardiology");

  const departments: Record<string, SpecialtyDept> = {
    cardiology: {
      id: "cardiology",
      name: "Cardiology & Vascular Surgery",
      icon: <Activity className="w-8 h-8 text-red-500" />,
      overview: "Our Heart Institute combines robotic bypass procedures and AI vascular mapping to prevent congestive incidents and treat heart conditions.",
      technologies: ["DaVinci Xi Heart Surgery Arms", "3D Holographic Coronary Radar", "Continuous Heart Rate Var (HRV) telemetry"],
      treatments: ["Robotic Angioplasty & Stenting", "Minimally Invasive Heart Valve Repair", "Genomic Arrhythmia Screens"],
      insights: "AI diagnostic models indicate that structured cardiovascular telemetry screens prevent coronary incidents up to 48 hours prior to onset.",
      faqs: [
        { q: "What is robotic coronary angioplasty?", a: "A highly precise, minimally invasive catheter-based procedure using sub-millimeter robotic arms to secure blockages with exceptional recovery times." },
        { q: "How is diagnostic telemetry integrated?", a: "We pair standard patient wearables directly to our EMR grid. Heart rate variability (HRV) swings automatically trigger alert thresholds." }
      ]
    },
    neurology: {
      id: "neurology",
      name: "Neurology & Brain Sciences",
      icon: <Brain className="w-8 h-8 text-[#0284c7]" />,
      overview: "Offering advanced therapeutic deep brain stimulation, fMRI mapping, and robotic spinal support systems.",
      technologies: ["AI Ultra-High Field fMRI Radar", "Intraoperative Neural Track mapping", "Stereotactic Radiosurgery Rigs"],
      treatments: ["Deep Brain Stimulation (DBS)", "AI-assisted Epilepsy Prediction", "Robotic Spine Stabilizations"],
      insights: "Next-gen intraoperative neural tracking yields up to 99.8% precision, preserving vital sensory networks during resection.",
      faqs: [
        { q: "How does deep brain stimulation (DBS) help Parkinson's?", a: "By delivering mild clinical electrical current pulses directly to the basal ganglia, DBS stabilizes neural waves and mitigates tremors." },
        { q: "What is AI intraoperative mapping?", a: "A visual projection showing active neural pathways on the surgical canvas, helping consultants bypass speech and motor tracks." }
      ]
    },
    oncology: {
      id: "oncology",
      name: "Oncology & Immunotherapy",
      icon: <Dna className="w-8 h-8 text-[#10b981]" />,
      overview: "Targeting tumor sequences using bespoke CAR-T cells, immune-oncology agents, and high-precision linear accelerators.",
      technologies: ["High-Throughput Tumor DNA Sequencer", "Digital Pathology multi-spectral scan", "Linear Accel Tumor Targeters"],
      treatments: ["CAR-T Cell Therapy Immunizations", "Bespoke Genomic Chemotherapies", "Stereotactic Tumor Radiation"],
      insights: "Bespoke tumor sequence mapping isolates distinct gene mutations, enabling complete cancer remission rates up to 94%.",
      faqs: [
        { q: "How does CAR-T cell therapy work?", a: "We harvest patient T-cells, re-engineer them genetically with cancer targeting proteins, and re-introduce them to systematically dissolve tumors." },
        { q: "What is genomic chemo matching?", a: "Analyzing the tumor's distinct genetic structure to apply targeted chemicals, bypassing toxic aggregate systemic chemo." }
      ]
    },
    robotic: {
      id: "robotic",
      name: "Robotic Surgery Institute",
      icon: <Cpu className="w-8 h-8 text-cyan-400" />,
      overview: "Harnessing the latest multi-arm DaVinci Xi platforms to perform sub-millimeter abdominal, thoracic, and orthopedic joint procedures.",
      technologies: ["DaVinci Xi Multi-Arm Surgery System", "Mako Orthopedic Joint Resector", "Smart Operation Room Telemetry"],
      treatments: ["Robotic Gastric & Colon Resections", "Bespoke Knee Joint Replacements", "Precision Thoracic Resections"],
      insights: "Robotic surgery yields 80% lower blood loss metrics and speeds up patient hospital discharges by an average of 2.4 days.",
      faqs: [
        { q: "Are robotic procedures entirely autonomous?", a: "No. The DaVinci system acts as a high-fidelity translator, mirroring the consultant surgeon's hands with absolute tremor elimination." },
        { q: "What is the primary benefit of robotic surgery?", a: "Sub-millimeter incisions that preserve adjacent muscle systems, leading to rapid healing and low infection vectors." }
      ]
    }
  };

  // Sync parameter queries on load
  useEffect(() => {
    if (paramDept && departments[paramDept.toLowerCase()]) {
      setSelectedTab(paramDept.toLowerCase());
    }
  }, [paramDept]);

  const current = departments[selectedTab];

  return (
    <div className="w-full bg-mesh min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Block */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#0284c7]">Clinical Departments</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-white mt-2">
            Clinical Specialities Hub
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-450 mt-2 leading-relaxed">
            Review detailed medical capabilities, localized robotic hardware arrays, treatment pathways, and diagnostic insights.
          </p>
        </div>

        {/* Tab Selection Area */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 pb-2 gap-4 mb-10 overflow-x-auto whitespace-nowrap">
          {Object.values(departments).map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedTab(dept.id)}
              className={`text-sm font-bold uppercase pb-1.5 relative cursor-pointer flex items-center gap-2 ${
                selectedTab === dept.id 
                  ? "text-[#0284c7] dark:text-[#38bdf8]" 
                  : "text-slate-450 dark:text-slate-400 hover:text-slate-650"
              }`}
            >
              <span>{dept.name}</span>
              {selectedTab === dept.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0284c7]" />
              )}
            </button>
          ))}
        </div>

        {/* Main Content Pane */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Overview and technologies list */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Overview glass panel */}
            <div className="glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 p-6 md:p-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center shadow-sm">
                  {current.icon}
                </div>
                <h2 className="text-xl font-extrabold text-slate-805 dark:text-white">{current.name}</h2>
              </div>
              
              <p className="text-sm text-slate-550 dark:text-slate-350 leading-relaxed pt-2">
                {current.overview}
              </p>

              {/* Treat and tech listed */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                
                {/* Techs */}
                <div className="space-y-2">
                  <h4 className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider">Localized Unit Technologies:</h4>
                  <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-350 font-medium">
                    {current.technologies.map((tech, idx) => (
                      <li key={idx}>✓ {tech}</li>
                    ))}
                  </ul>
                </div>

                {/* Treatments */}
                <div className="space-y-2">
                  <h4 className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider">Active Clinical Pathways:</h4>
                  <ul className="space-y-1 text-xs text-slate-650 dark:text-slate-355 font-medium">
                    {current.treatments.map((tr, idx) => (
                      <li key={idx}>✓ {tr}</li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>

            {/* Gen-AI insight panel */}
            <div className="p-5 rounded-3xl border border-emerald-500/10 bg-emerald-500/5 flex items-start gap-4">
              <div className="p-2 rounded-xl bg-white dark:bg-slate-950 border border-emerald-500/10 shrink-0">
                <Sparkles className="w-5 h-5 text-emerald-500 animate-pulse" />
              </div>
              <div className="text-xs">
                <strong className="text-emerald-600 dark:text-emerald-400 font-extrabold uppercase block mb-1">
                  AI Clinical Insight Summary:
                </strong>
                <p className="italic text-slate-750 dark:text-slate-300 leading-relaxed">
                  “{current.insights}”
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT: FAQs and doctor CTAs */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* FAQs cards */}
            <div className="glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 p-6 space-y-4">
              <h3 className="text-xs font-bold text-slate-850 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-5 h-5 text-[#0284c7]" />
                Frequently Queried Clinical Details
              </h3>

              <div className="space-y-4">
                {current.faqs.map((faq, idx) => (
                  <div key={idx} className="space-y-1.5 text-xs">
                    <strong className="text-slate-800 dark:text-white font-bold block">{faq.q}</strong>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Book doctor prompt */}
            <div className="p-6 rounded-3xl border border-slate-100 dark:border-slate-805 bg-slate-50 dark:bg-slate-900 flex flex-col justify-center items-center text-center gap-4">
              <h3 className="text-sm font-bold text-slate-805 dark:text-white uppercase tracking-wider">
                Attending Consultants Available
              </h3>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                Connect with our specialized clinicians immediately in physical clinics or WebRTC videorooms.
              </p>
              
              <Link
                href={`/doctors?dept=${encodeURIComponent(current.name.split(" ")[0])}`}
                className="w-full text-center py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#0284c7] to-[#10b981] hover:shadow-lg rounded-xl transition-all"
              >
                Find Department Specialist
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default function SpecialitiesPage() {
  return (
    <Suspense fallback={<div className="w-full bg-mesh min-h-screen py-16 px-6 flex items-center justify-center text-xs font-bold text-slate-500 uppercase tracking-widest">Opening Clinical encyclopedia...</div>}>
      <SpecialitiesPageInner />
    </Suspense>
  );
}
