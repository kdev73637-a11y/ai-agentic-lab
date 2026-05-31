"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  HeartHandshake, 
  MapPin, 
  Globe, 
  Calculator, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  FileText,
  DollarSign,
  Activity
} from "lucide-react";

export default function ServicesPage() {
  const [selectedTreatment, setSelectedTreatment] = useState("bypass");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const treatmentCosts: Record<string, { name: string; usd: number; inr: number; eur: number; days: number }> = {
    bypass: { name: "Robotic Coronary Bypass Surgery", usd: 14500, inr: 1200000, eur: 13200, days: 5 },
    brain: { name: "Stereotactic Brain Tumor Resection", usd: 18000, inr: 1500000, eur: 16500, days: 7 },
    hip: { name: "Robotic Joint (Hip) Replacement", usd: 9500, inr: 800000, eur: 8700, days: 3 },
    gastric: { name: "DaVinci Robotic Gastrectomy", usd: 11000, inr: 920000, eur: 10000, days: 4 }
  };

  const currentCost = treatmentCosts[selectedTreatment];

  const bloodReserves = [
    { type: "O+ (Universal)", status: "Balanced", volume: "42 Liters" },
    { type: "A+ Positive", status: "Optimal", volume: "38 Liters" },
    { type: "B+ Positive", status: "Critical", volume: "12 Liters" },
    { type: "AB- (Rare)", status: "Normal", volume: "18 Liters" }
  ];

  return (
    <div className="w-full bg-mesh min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Block */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#0284c7]">Patient Support</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-white mt-2">
            Clinical Services Portal
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            Obtain immediate diagnostic cost estimates, review international visa coordinates, check local blood reserves, and coordinate pharmacy rosters securely.
          </p>
        </div>

        {/* Global Cost Estimator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* ESTIMATOR PANEL */}
          <div className="lg:col-span-7 glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 p-6 md:p-8 space-y-6">
            <h3 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Calculator className="w-5 h-5 text-[#0284c7]" />
              Treatment Cost Estimator
            </h3>

            {/* Treatment Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Choose Surgical Procedure</label>
              <select
                value={selectedTreatment}
                onChange={(e) => setSelectedTreatment(e.target.value)}
                className="w-full px-3 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
              >
                <option value="bypass">Robotic Coronary Bypass (Heart)</option>
                <option value="brain">Brain Tumor Resection (Neuro)</option>
                <option value="hip">Robotic Hip Joint Replacement (Ortho)</option>
                <option value="gastric">DaVinci Robotic Gastrectomy (GI)</option>
              </select>
            </div>

            {/* Currency switcher */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-350">Select Billing Currency</label>
              <div className="flex gap-2">
                {["USD", "INR", "EUR"].map((cur) => (
                  <button
                    key={cur}
                    onClick={() => setSelectedCurrency(cur)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      selectedCurrency === cur
                        ? "bg-[#0284c7] border-[#0284c7] text-white"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-300 hover:border-slate-300"
                    }`}
                  >
                    {cur}
                  </button>
                ))}
              </div>
            </div>

            {/* Cost readout */}
            <div className="p-6 rounded-3xl border border-slate-100 dark:border-slate-805 bg-slate-50 dark:bg-slate-900 flex justify-between items-center">
              <div>
                <span className="text-[9px] text-slate-450 uppercase font-extrabold tracking-wide block">ESTIMATED REHABILITATION</span>
                <strong className="text-sm font-extrabold text-slate-805 dark:text-white mt-1 block">
                  {currentCost.name}
                </strong>
                <p className="text-[10px] text-slate-450 mt-1">Average hospital recovery: {currentCost.days} Days</p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[9px] text-[#0284c7] font-extrabold uppercase block">AGGREGATE COST</span>
                <p className="text-3xl font-black text-slate-800 dark:text-white mt-1">
                  {selectedCurrency === "USD" && `$${currentCost.usd.toLocaleString()}`}
                  {selectedCurrency === "INR" && `₹${currentCost.inr.toLocaleString()}`}
                  {selectedCurrency === "EUR" && `€${currentCost.eur.toLocaleString()}`}
                </p>
              </div>
            </div>

          </div>

          {/* INTERNATIONAL SERVICES INFO */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <div className="glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Globe className="w-5 h-5 text-emerald-500" />
                International Patients Desk
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Devroshan Clinic provides complete support vectors for patients traveling globally, coordinating checkups seamlessly.
              </p>
              
              <div className="space-y-3.5 text-xs text-slate-650 dark:text-slate-300">
                {[
                  { label: "Visa Documentation", val: "Embassy verification briefs compiled within 24 hours." },
                  { label: "Transit Logistics", val: "Complimentary airport dispatches and hospital transport." },
                  { label: "Translator Roster", val: "Bilingual medical specialists fluent in 8+ languages." }
                ].map((serv, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
                    <strong className="text-slate-800 dark:text-white font-bold block">{serv.label}</strong>
                    <span className="text-[10px] text-slate-450 block mt-1 leading-relaxed">{serv.val}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* BLOOD BANK RESERVES CHECKER */}
        <div className="w-full glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 p-6 md:p-8">
          <div className="flex flex-col gap-1.5 mb-6">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-500">Live Diagnostics Reserves</span>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-red-500 animate-pulse" />
              Smart Blood Bank Reserve Volume
            </h3>
            <p className="text-xs text-slate-500">
              Monitoring net blood group availability indexes across all clinic reserves dynamically.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bloodReserves.map((blood, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900/40 text-xs"
              >
                <div className="flex justify-between items-center mb-3">
                  <strong className="text-sm font-bold text-slate-800 dark:text-white">{blood.type}</strong>
                  <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase ${
                    blood.status === "Critical" ? "bg-red-500 text-white animate-pulse" : "bg-emerald-500/10 text-emerald-500"
                  }`}>
                    {blood.status}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Available stock:</span>
                  <span className="font-bold text-slate-800 dark:text-white">{blood.volume}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
