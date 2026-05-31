"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Award, 
  CheckCircle, 
  Activity, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight,
  ClipboardCheck,
  User
} from "lucide-react";

export default function HealthPackagesPage() {
  const [patientAge, setPatientAge] = useState("");
  const [patientSex, setPatientSex] = useState("male");
  const [patientSymptoms, setPatientSymptoms] = useState("fatigue");
  const [aiRecommendation, setAiRecommendation] = useState<string | null>(null);

  const packages = [
    {
      id: "pkg-heart",
      name: "Cardiac Longevity Panel",
      price: "$299",
      accent: "border-red-500/30 bg-red-500/5 text-red-500",
      tests: ["CT Coronary Calcium Screening", "High-Sensitivity CRP Assay", "Lipid Subfraction Fractionation", "Cardiologist Consultation"],
      desc: "Designed to detect sub-clinical arterial plaque buildup and compute cardiac stress scores."
    },
    {
      id: "pkg-diabetes",
      name: "Metabolic & Diabetes Panel",
      price: "$149",
      accent: "border-amber-500/30 bg-amber-500/5 text-amber-500",
      tests: ["Continuous HbA1c screening", "Fasting Glucose Profile", "Thyroid Stimulating Panel", "Endocrine Consultation"],
      desc: "Ideal to monitor early insulin sensitivities, glycemic spikes, and pre-diabetic indexes."
    },
    {
      id: "pkg-cancer",
      name: "Genomic Cancer Screening",
      price: "$499",
      accent: "border-cyan-500/30 bg-cyan-500/5 text-cyan-400",
      tests: ["Tumor DNA Sequencing Panel", "Whole-body Low-dose CT Scan", "Cancer Marker Biomarkers", "Oncologist Consultation"],
      desc: "Early screening using genomic markers to discover localized tumor activity before symptoms manifest."
    },
    {
      id: "pkg-full",
      name: "Executive Full Body Audit",
      price: "$599",
      accent: "border-[#0284c7]/30 bg-[#0284c7]/5 text-[#0284c7]",
      tests: ["72 Essential Biomarkers", "Ultra-High Field MRI Scan", "Cardio Stress ECG Test", "Comprehensive MD Consult"],
      desc: "The ultimate physiological checkup assessing renal, vascular, immune, and hepatic pathways."
    }
  ];

  const handleRunRecommender = () => {
    if (!patientAge) {
      alert("Please enter a valid age range!");
      return;
    }
    
    const ageVal = parseInt(patientAge);
    let suggestion = "Executive Full Body Audit";

    if (patientSymptoms === "fatigue" && ageVal > 45) {
      suggestion = "Metabolic & Diabetes Panel";
    } else if (patientSymptoms === "chest" || ageVal > 50) {
      suggestion = "Cardiac Longevity Panel";
    } else if (patientSymptoms === "weight" && ageVal < 40) {
      suggestion = "Metabolic & Diabetes Panel";
    }

    setAiRecommendation(suggestion);
  };

  return (
    <div className="w-full bg-mesh min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Block */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#0284c7]">Diagnostic Packages</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-white mt-2">
            Smart Health Packages
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            Transparent pricing models for curated biological screening bundles. Map custom metabolic profiles, plaque indexes, and genomic markers.
          </p>
        </div>

        {/* Dynamic AI Selector Panel */}
        <div className="glass-panel rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white/40 dark:bg-slate-950/40 p-6 md:p-8 mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Recommender Form fields */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/15 text-[9px] font-extrabold uppercase tracking-wide inline-block mb-2">
                AI Matchmaker Engine
              </span>
              <h3 className="text-xl font-bold text-slate-850 dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-5 h-5 text-emerald-500" />
                Diagnostic Package Recommender
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Enter primary physiological markers to locate the most suitable diagnostic screening panel dynamically.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Age */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-slate-455 font-bold uppercase">Patient Age</label>
                <input
                  type="number"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  placeholder="e.g. 48"
                  className="px-3 py-2.5 rounded-xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-800 focus:outline-none focus:border-[#0284c7]"
                />
              </div>

              {/* Sex */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-slate-455 font-bold uppercase">Biological Sex</label>
                <select
                  value={patientSex}
                  onChange={(e) => setPatientSex(e.target.value)}
                  className="px-3 py-2.5 rounded-xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:outline-none"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              {/* Symptoms */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-slate-455 font-bold uppercase">Primary Symptoms</label>
                <select
                  value={patientSymptoms}
                  onChange={(e) => setPatientSymptoms(e.target.value)}
                  className="px-3 py-2.5 rounded-xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:outline-none"
                >
                  <option value="fatigue">Chronic Fatigue / Slow metabolism</option>
                  <option value="chest">Palpitations / Shortness of breath</option>
                  <option value="weight">Unexplained Weight changes</option>
                  <option value="wellness">None / Wellness Audit</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleRunRecommender}
              className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-850 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Analyze & Recommend Package
            </button>
          </div>

          {/* Recommender Result Display */}
          <div className="lg:col-span-5 h-full">
            {aiRecommendation ? (
              <div className="p-6 rounded-3xl border border-emerald-500/10 bg-emerald-500/5 flex flex-col justify-between h-full space-y-4">
                <div>
                  <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-extrabold uppercase tracking-widest block">
                    TOP AI RECOMMENDATION
                  </span>
                  
                  <strong className="text-base font-extrabold text-slate-805 dark:text-white mt-1.5 block">
                    {aiRecommendation}
                  </strong>
                  
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    Based on your profile, we highly advise securing this comprehensive panel to screen critical indicators.
                  </p>
                </div>

                <Link
                  href="/booking"
                  className="w-full text-center py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#0284c7] to-[#10b981] hover:shadow-lg rounded-xl transition-all block flex items-center justify-center gap-1"
                >
                  <span>Secure Recommended Package</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="h-full min-h-[180px] rounded-3xl border border-slate-200 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-900/10 p-6 flex flex-col items-center justify-center text-center">
                <ClipboardCheck className="w-10 h-10 text-slate-300 dark:text-slate-750 mb-3" />
                <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                  Recommender Idle
                </h4>
                <p className="text-[10px] text-slate-450 mt-1 max-w-[200px]">
                  Fill out symptoms and demographics to prompt the AI matchmaker engine.
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Packages Grid Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {packages.map((pkg) => (
            <div 
              key={pkg.id}
              className="p-6 glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/10 hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                
                {/* Header cost row */}
                <div className="flex justify-between items-start pb-4 border-b border-slate-100 dark:border-slate-800/80 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white leading-tight">{pkg.name}</h3>
                    <p className="text-[10px] text-slate-450 dark:text-slate-400 mt-1">{pkg.desc}</p>
                  </div>
                  <strong className="text-2xl font-black gradient-text shrink-0">{pkg.price}</strong>
                </div>

                {/* Diagnostics details bullet lists */}
                <div className="space-y-2 py-2">
                  <h4 className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider block">
                    Clinical Investigations Covered:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-550 dark:text-slate-405">
                    {pkg.tests.map((test, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{test}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Secure slots actions */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800/85 mt-4">
                <Link
                  href="/booking"
                  className="w-full block text-center py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#0284c7] to-[#10b981] rounded-xl hover:shadow-lg transition-all"
                >
                  Schedule Package Checkup
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
