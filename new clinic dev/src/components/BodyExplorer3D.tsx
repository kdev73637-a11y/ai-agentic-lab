"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Activity, 
  ChevronRight, 
  Cpu, 
  Heart, 
  Compass, 
  TrendingUp, 
  ClipboardCheck,
  ShieldCheck
} from "lucide-react";

interface Organ {
  id: string;
  name: string;
  department: string;
  telemetry: {
    vitality: string;
    flow: string;
    oxygen: string;
    neuralRate?: string;
  };
  metrics: { name: string; value: string; status: "optimal" | "warning" | "alert" }[];
  treatments: string[];
  techUsed: string;
  route: string;
  svgHighlightCoords: string; // for rendering highlights
}

export default function BodyExplorer3D() {
  const [selectedOrgan, setSelectedOrgan] = useState<string>("heart");

  const organs: Record<string, Organ> = {
    brain: {
      id: "brain",
      name: "Brain & Nervous System",
      department: "Neurology & Neuro Surgery",
      telemetry: {
        vitality: "98.2%",
        flow: "750 mL/min",
        oxygen: "99.1%",
        neuralRate: "42 Hz (Alpha Sync)"
      },
      metrics: [
        { name: "Cognitive Load", value: "Normal", status: "optimal" },
        { name: "Alpha Wave Amplitude", value: "8.4 µV", status: "optimal" },
        { name: "Cerebral Oxygenation", value: "98%", status: "optimal" }
      ],
      treatments: ["Deep Brain Stimulation (DBS)", "Stereotactic Radiosurgery", "AI Epilepsy Prediction"],
      techUsed: "AI High-Field fMRI, Intraoperative Neural Mapping",
      route: "/specialities?dept=neurology",
      svgHighlightCoords: "M 150,45 A 25,25 0 1,1 150,95 A 25,25 0 1,1 150,45 Z"
    },
    heart: {
      id: "heart",
      name: "Cardiovascular System",
      department: "Cardiology & Cardiac Surgery",
      telemetry: {
        vitality: "96.4%",
        flow: "5.2 L/min",
        oxygen: "98.5%",
      },
      metrics: [
        { name: "Heart Rate (Resting)", value: "72 BPM", status: "optimal" },
        { name: "Vascular Elasticity", value: "Balanced", status: "optimal" },
        { name: "Systolic Stroke Vol.", value: "78 mL", status: "optimal" }
      ],
      treatments: ["Robotic Coronary Angioplasty", "Minimally Invasive Valve Repair", "Genomic Arrhythmia Screening"],
      techUsed: "3D Holographic Heart Mapping, DaVinci Heart Resectors",
      route: "/specialities?dept=cardiology",
      svgHighlightCoords: "M 148,135 A 18,18 0 1,1 148,171 A 18,18 0 1,1 148,135 Z"
    },
    lungs: {
      id: "lungs",
      name: "Pulmonary & Respiratory System",
      department: "Pulmonology & Thoracic Care",
      telemetry: {
        vitality: "99.0%",
        flow: "6.4 L/min",
        oxygen: "99.2%",
      },
      metrics: [
        { name: "Forced Vital Capacity", value: "4.8 L", status: "optimal" },
        { name: "Blood Oxygen SpO2", value: "99%", status: "optimal" },
        { name: "Alveolar Resiliency", value: "97%", status: "optimal" }
      ],
      treatments: ["Bronchial Thermoplasty", "AI Lung Nodule Detection", "Video-Assisted Thoracic Surgery"],
      techUsed: "Digital Bronchoscopic Navigation, Smart ICU Ventilators",
      route: "/specialities?dept=pulmonology",
      svgHighlightCoords: "M 125,125 Q 150,135 150,180 Q 115,175 125,125 Z M 175,125 Q 150,135 150,180 Q 185,175 175,125 Z"
    },
    stomach: {
      id: "stomach",
      name: "Gastrointestinal Tract",
      department: "Gastroenterology & Hepatic Care",
      telemetry: {
        vitality: "94.8%",
        flow: "1.2 L/min",
        oxygen: "96.4%",
      },
      metrics: [
        { name: "Gastric pH", value: "1.8 pH", status: "optimal" },
        { name: "Microbiome Index", value: "Balanced", status: "optimal" },
        { name: "Peristaltic Velocity", value: "Optimal", status: "optimal" }
      ],
      treatments: ["Endoscopic Submucosal Dissection", "AI Colonoscopy Screening", "Robotic Gastric Resections"],
      techUsed: "Smart Pill Wireless Endoscopy, Hyper-Spectral Imaging",
      route: "/specialities?dept=gastroenterology",
      svgHighlightCoords: "M 135,190 Q 150,180 165,195 Q 160,225 130,220 Q 132,205 135,190 Z"
    },
    kidneys: {
      id: "kidneys",
      name: "Renal & Urinary System",
      department: "Nephrology & Urology Hub",
      telemetry: {
        vitality: "97.1%",
        flow: "1.1 L/min",
        oxygen: "97.8%",
      },
      metrics: [
        { name: "Glomerular Filtration Rate", value: "94 mL/min", status: "optimal" },
        { name: "Urea Clearance Rate", value: "98%", status: "optimal" },
        { name: "Serum Creatinine", value: "0.8 mg/dL", status: "optimal" }
      ],
      treatments: ["Laser Stone Lithotripsy", "Robotic Nephrectomy", "Bio-Artificial Renal Support"],
      techUsed: "Ureteroscopic Laser Systems, Smart Fluid Analytics",
      route: "/specialities?dept=nephrology",
      svgHighlightCoords: "M 125,230 Q 130,240 128,255 Q 118,250 125,230 Z M 175,230 Q 170,240 172,255 Q 182,250 175,230 Z"
    }
  };

  const current = organs[selectedOrgan];

  return (
    <div className="w-full glass-panel rounded-3xl border border-slate-200 dark:border-slate-800/80 p-6 md:p-8 bg-white/40 dark:bg-slate-950/40 glow-glow-blue flex flex-col lg:flex-row gap-8 items-center lg:items-stretch">
      
      {/* Visual Organ Anatomy Mapping Selector */}
      <div className="flex-1 w-full flex flex-col items-center justify-center relative min-h-[380px] border border-slate-100 dark:border-slate-800/50 rounded-2xl p-4 bg-slate-50/50 dark:bg-slate-900/10">
        
        <h4 className="absolute top-4 text-xs font-semibold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-[#0284c7] animate-spin" />
          Interactive Organ Mapper (Click to Select)
        </h4>

        {/* Anatomical Human Blueprint SVG */}
        <svg 
          viewBox="0 0 300 500" 
          className="w-full max-w-[280px] h-auto drop-shadow-xl"
        >
          {/* Main Body Outline */}
          <path 
            d="M 150,20 Q 180,20 180,45 Q 180,70 170,95 L 175,100 Q 220,105 235,170 Q 240,190 238,260 Q 235,280 220,290 L 222,380 Q 225,410 215,480 Q 212,490 205,490 Q 198,490 196,480 L 175,370 L 150,370 L 125,370 L 104,480 Q 102,490 95,490 Q 88,490 85,480 Q 75,410 78,380 L 80,290 Q 65,280 62,260 Q 60,190 65,170 Q 80,105 125,100 L 130,95 Q 120,70 120,45 Q 120,20 150,20 Z" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            className="text-slate-300 dark:text-slate-800"
          />

          {/* Skeleton spine line */}
          <line x1="150" y1="95" x2="150" y2="350" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="text-slate-300 dark:text-slate-800" />

          {/* Brain Button */}
          <path 
            d={organs.brain.svgHighlightCoords} 
            onClick={() => setSelectedOrgan("brain")}
            className={`cursor-pointer transition-all duration-300 ${
              selectedOrgan === "brain" 
                ? "fill-[#0284c7]/20 stroke-[#0284c7] stroke-2 drop-shadow-[0_0_8px_#0284c7]" 
                : "fill-transparent stroke-slate-400 dark:stroke-slate-600 hover:fill-slate-400/10 hover:stroke-[#0284c7]"
            }`}
          />

          {/* Lungs Button */}
          <path 
            d={organs.lungs.svgHighlightCoords} 
            onClick={() => setSelectedOrgan("lungs")}
            className={`cursor-pointer transition-all duration-300 ${
              selectedOrgan === "lungs" 
                ? "fill-[#10b981]/20 stroke-[#10b981] stroke-2 drop-shadow-[0_0_8px_#10b981]" 
                : "fill-transparent stroke-slate-400 dark:stroke-slate-600 hover:fill-slate-400/10 hover:stroke-[#10b981]"
            }`}
          />

          {/* Heart Button */}
          <path 
            d={organs.heart.svgHighlightCoords} 
            onClick={() => setSelectedOrgan("heart")}
            className={`cursor-pointer transition-all duration-300 ${
              selectedOrgan === "heart" 
                ? "fill-red-500/25 stroke-red-500 stroke-2 drop-shadow-[0_0_8px_red]" 
                : "fill-transparent stroke-slate-400 dark:stroke-slate-600 hover:fill-slate-400/10 hover:stroke-red-400"
            }`}
          />

          {/* Stomach Button */}
          <path 
            d={organs.stomach.svgHighlightCoords} 
            onClick={() => setSelectedOrgan("stomach")}
            className={`cursor-pointer transition-all duration-300 ${
              selectedOrgan === "stomach" 
                ? "fill-[#0284c7]/20 stroke-[#0284c7] stroke-2 drop-shadow-[0_0_8px_#0284c7]" 
                : "fill-transparent stroke-slate-400 dark:stroke-slate-600 hover:fill-slate-400/10 hover:stroke-[#0284c7]"
            }`}
          />

          {/* Kidneys Button */}
          <path 
            d={organs.kidneys.svgHighlightCoords} 
            onClick={() => setSelectedOrgan("kidneys")}
            className={`cursor-pointer transition-all duration-300 ${
              selectedOrgan === "kidneys" 
                ? "fill-amber-500/20 stroke-amber-500 stroke-2 drop-shadow-[0_0_8px_orange]" 
                : "fill-transparent stroke-slate-400 dark:stroke-slate-600 hover:fill-slate-400/10 hover:stroke-amber-400"
            }`}
          />

          {/* Lines mapping organs outward */}
          <line x1="80" y1="65" x2="125" y2="65" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" className="text-slate-400 dark:text-slate-600" />
          <line x1="80" y1="150" x2="135" y2="150" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" className="text-slate-400 dark:text-slate-600" />
          <line x1="220" y1="205" x2="160" y2="205" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" className="text-slate-400 dark:text-slate-600" />

          {/* Text labels on SVG */}
          <text x="75" y="68" textAnchor="end" fontSize="10" fontWeight="bold" fill="currentColor" className="text-slate-500 dark:text-slate-400">BRAIN</text>
          <text x="75" y="153" textAnchor="end" fontSize="10" fontWeight="bold" fill="currentColor" className="text-slate-500 dark:text-slate-400">HEART</text>
          <text x="225" y="208" textAnchor="start" fontSize="10" fontWeight="bold" fill="currentColor" className="text-slate-500 dark:text-slate-400">STOMACH</text>
        </svg>

        {/* Dynamic Telemetry Flags */}
        <div className="absolute bottom-4 flex gap-4 text-[10px] text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-2 w-[90%] justify-center">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Vitals Synchronized
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#0284c7] animate-ping" />
            AI Diagnostic Shield
          </span>
        </div>

      </div>

      {/* Dynamic Diagnostic Telemetry Panel */}
      <div className="flex-1 w-full flex flex-col justify-between py-2">
        <div className="flex flex-col gap-4">
          
          {/* Header */}
          <div>
            <span className="px-2.5 py-1 text-[10px] uppercase font-bold text-white bg-gradient-to-r from-[#0284c7] to-[#10b981] rounded-full">
              {current.department}
            </span>
            <h3 className="text-2xl font-bold mt-2 text-slate-800 dark:text-white">
              {current.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Real-time physiological modeling fueled by wearable arrays & active electronic medical grids.
            </p>
          </div>

          {/* Telemetry Charts */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Organ Vitality</span>
              <p className="text-lg font-bold text-emerald-500 mt-0.5">{current.telemetry.vitality}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Perfusion Flow</span>
              <p className="text-lg font-bold text-[#0284c7] dark:text-[#38bdf8] mt-0.5">{current.telemetry.flow}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Oxygenation</span>
              <p className="text-lg font-bold text-[#0284c7] dark:text-[#38bdf8] mt-0.5">{current.telemetry.oxygen}</p>
            </div>
          </div>

          {/* Biomarkers */}
          <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-[#0284c7]/5">
            <h4 className="text-xs font-bold text-[#0284c7] dark:text-[#38bdf8] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              Active System Biomarkers
            </h4>
            <div className="space-y-2">
              {current.metrics.map((metric, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs border-b border-slate-100 dark:border-slate-800 pb-1.5 last:border-b-0 last:pb-0">
                  <span className="text-slate-500 dark:text-slate-400">{metric.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800 dark:text-slate-200">{metric.value}</span>
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-emerald-500/10 text-emerald-500 uppercase">
                      {metric.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Treatments & Robotic Tech */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-emerald-500" />
              Futuristic Surgical Capabilities
            </h4>
            <div className="flex flex-wrap gap-2">
              {current.treatments.map((tr, idx) => (
                <span 
                  key={idx}
                  className="px-2.5 py-1 text-[10px] rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-medium"
                >
                  {tr}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Dynamic CTA Routing */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6 border-t border-slate-100 dark:border-slate-800 pt-4">
          <Link
            href="/booking"
            className="flex-1 text-center py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#0284c7] to-[#10b981] rounded-xl hover:shadow-[#0284c7]/25 hover:shadow-lg transition-all"
          >
            Book {current.id === "brain" ? "Neuro" : current.id === "heart" ? "Cardio" : "Specialist"} Consultation
          </Link>
          
          <Link
            href="/health-packages"
            className="flex-1 text-center py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            View Diagnostic Packages
          </Link>
        </div>

      </div>

    </div>
  );
}
