"use client";

import React, { useState, useEffect } from "react";
import { useClinic } from "@/context/ClinicContext";
import { 
  ShieldAlert, 
  MapPin, 
  Clock, 
  Activity, 
  AlertTriangle, 
  Phone, 
  Building, 
  ChevronRight,
  PlusCircle,
  Truck
} from "lucide-react";

export default function EmergencyPage() {
  const { ambulanceSos, triggerSOS, cancelSOS, hospitals } = useClinic();
  const [selectedTriage, setSelectedTriage] = useState<string>("chest");
  const [localHospital, setLocalHospital] = useState("hosp-1");

  const triageOptions = [
    { id: "chest", label: "Acute Chest Pain / Cardiac Distress", severity: "Extreme", instructions: "Avoid physical exertion. Do not consume heavy meals. Lie down in an airy space. A paramedic is en-route." },
    { id: "head", label: "Severe Head Trauma / Consciousness loss", severity: "Extreme", instructions: "Keep airway open. Do not move the spine or neck. If convulsing, clear surroundings of hard items." },
    { id: "fever", label: "Persistent High Fever / Heat stroke", severity: "Moderate", instructions: "Sponge with lukewarm water. Hydrate with electrolyte minerals immediately." },
    { id: "wound", label: "Deep lacerations / Heavy bleeding", severity: "High", instructions: "Apply constant localized direct pressure with a clean cloth. Elevate the bleeding limb." }
  ];

  const getTriageInstructions = () => {
    const selected = triageOptions.find(t => t.id === selectedTriage);
    return selected ? selected.instructions : "Lie down and maintain calm.";
  };

  const getTriageSeverity = () => {
    const selected = triageOptions.find(t => t.id === selectedTriage);
    return selected ? selected.severity : "High";
  };

  const handleRequestAmbulance = () => {
    triggerSOS(localHospital);
    alert("✓ Emergency SOS signals logged! Devroshan dispatch network has locked your GPS coordinates and launched an ambulance.");
  };

  return (
    <div className="w-full bg-mesh min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Block */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-red-500">Emergency Dispatch</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-white mt-2">
            Smart Emergency Hub
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            Instant peer GPS ambulance tracking, critical physiological triage calculators, and real-time hospital ICU bed vacancy logs at your location.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* TRIAGE SEVERITY CALCULATOR */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <div className="glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 p-6 space-y-5">
              <h3 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-4.5 h-4.5 text-red-500" />
                Critical Triage Assessment
              </h3>
              
              {/* Localized hospital dispatch selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-slate-450 uppercase font-extrabold tracking-wider">Nearest Dispatch Base</label>
                <select
                  value={localHospital}
                  onChange={(e) => setLocalHospital(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-250 focus:outline-none"
                >
                  {hospitals.map(h => (
                    <option key={h.id} value={h.id}>{h.name} (Wait: {h.emergencyWaitMinutes}m)</option>
                  ))}
                </select>
              </div>

              {/* Triage selectors */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-slate-455 uppercase font-extrabold tracking-wider">Select Symptoms Severity Profile</label>
                <div className="flex flex-col gap-2">
                  {triageOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => setSelectedTriage(opt.id)}
                      className={`p-3 rounded-2xl border text-left cursor-pointer transition-all flex justify-between items-center ${
                        selectedTriage === opt.id
                          ? "border-red-500 bg-red-500/5 text-red-500"
                          : "border-slate-200 dark:border-slate-800 hover:border-slate-350"
                      }`}
                    >
                      <span className="text-xs font-semibold">{opt.label}</span>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase ${
                        opt.severity === "Extreme" ? "bg-red-600 text-white" : "bg-amber-500 text-white"
                      }`}>
                        {opt.severity}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Triage Guidelines */}
              <div className="p-4 rounded-2xl border border-red-500/10 bg-red-500/5 text-xs text-slate-750 dark:text-slate-300 leading-relaxed">
                <strong className="text-red-500 font-extrabold uppercase tracking-wide block mb-1">
                  Immediate First-Aid Guidance:
                </strong>
                <p className="italic">
                  “{getTriageInstructions()}”
                </p>
              </div>

              {/* Big Red SOS Button */}
              {!ambulanceSos.active ? (
                <button
                  onClick={handleRequestAmbulance}
                  className="w-full py-4 text-xs font-extrabold text-white bg-gradient-to-r from-red-600 to-red-800 hover:shadow-xl hover:shadow-red-500/20 rounded-2xl cursor-pointer flex items-center justify-center gap-2 group tracking-widest uppercase"
                >
                  <Truck className="w-5 h-5 text-white group-hover:scale-110 transition-transform animate-bounce" />
                  <span>Request SOS Ambulance</span>
                </button>
              ) : (
                <button
                  onClick={cancelSOS}
                  className="w-full py-4 text-xs font-extrabold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-2xl cursor-pointer flex items-center justify-center gap-2 tracking-widest uppercase hover:bg-slate-200"
                >
                  <span>Cancel Active Dispatch</span>
                </button>
              )}

            </div>

          </div>

          {/* DYNAMIC AMBULANCE MAP DISPLAY */}
          <div className="lg:col-span-7">
            
            {ambulanceSos.active ? (
              <div className="glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 p-6 space-y-6 shadow-2xl">
                
                {/* Header */}
                <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-lg bg-red-500/10 text-red-500 border border-red-500/15 text-[9px] font-extrabold uppercase tracking-widest inline-block animate-pulse">
                      Critical Dispatch Active
                    </span>
                    <h2 className="text-xl font-bold mt-2 text-slate-800 dark:text-white">
                      Ambulance live tracking
                    </h2>
                    <p className="text-[10px] text-slate-450 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                      Dispatched from: {ambulanceSos.hospitalName}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-450 uppercase font-semibold">Estimated Arrival</span>
                    <p className="text-2xl font-black text-red-500 animate-pulse mt-0.5">{ambulanceSos.eta} Mins</p>
                  </div>
                </div>

                {/* Map Graphics Canvas */}
                <div className="w-full aspect-video rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden relative flex items-center justify-center shadow-lg">
                  
                  {/* Radar radar grid background lines */}
                  <div className="absolute inset-0 grid-overlay opacity-20" />
                  <div className="absolute w-60 h-60 rounded-full border border-slate-800 animate-ping" />
                  <div className="absolute w-96 h-96 rounded-full border border-slate-850" />

                  {/* Vector Route Line connecting points */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <line 
                      x1={`${100 + (ambulanceSos.ambulanceLat - 19.0760) * 8000}`} 
                      y1={`${200 - (ambulanceSos.ambulanceLng - 72.8777) * 8000}`} 
                      x2="250" 
                      y2="150" 
                      stroke="rgba(239, 68, 68, 0.4)" 
                      strokeWidth="2.5" 
                      strokeDasharray="4 4" 
                    />
                  </svg>

                  {/* Patient location pin */}
                  <div className="absolute top-[150px] left-[250px]">
                    <div className="relative">
                      <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-emerald-400 rounded-full border-2 border-white animate-ping" />
                      <MapPin className="w-6 h-6 text-emerald-500" />
                    </div>
                    <span className="absolute left-1/2 -translate-x-1/2 mt-1.5 px-2 py-0.5 rounded text-[8px] font-extrabold text-white bg-emerald-600/90 whitespace-nowrap">
                      YOUR POSITION
                    </span>
                  </div>

                  {/* Moving Ambulance dot */}
                  <div 
                    className="absolute z-20 cursor-pointer"
                    style={{
                      left: `${100 + (ambulanceSos.ambulanceLat - 19.0760) * 8000}px`,
                      top: `${200 - (ambulanceSos.ambulanceLng - 72.8777) * 8000}px`,
                      transition: "all 0.5s ease"
                    }}
                  >
                    <div className="relative">
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white animate-ping" />
                      <Truck className="w-7 h-7 text-red-500 fill-white p-0.5 border border-red-400 rounded-lg bg-slate-950 shadow-lg" />
                    </div>
                    <span className="absolute left-1/2 -translate-x-1/2 mt-1 px-1.5 py-0.5 rounded text-[7px] font-bold text-white bg-red-600 whitespace-nowrap">
                      AMBULANCE ({ambulanceSos.status})
                    </span>
                  </div>

                  {/* Map tracking telemetry header */}
                  <div className="absolute bottom-4 right-4 px-3 py-1 bg-slate-900 border border-slate-800 rounded-xl text-[8px] font-mono text-slate-450 tracking-wider">
                    GPS TRACKER ON AIR
                  </div>

                </div>

                {/* Dispatch timeline indicators */}
                <div className="grid grid-cols-4 gap-2 text-center text-[9px] font-bold uppercase tracking-wider text-slate-450 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className={`p-2 rounded-xl border ${
                    ambulanceSos.status === "Dispatched" ? "border-red-500 bg-red-500/5 text-red-500" : "border-slate-200 dark:border-slate-850"
                  }`}>
                    1. Dispatched
                  </div>
                  <div className={`p-2 rounded-xl border ${
                    ambulanceSos.status === "Heading to Clinic" ? "border-red-500 bg-red-500/5 text-red-500" : "border-slate-200 dark:border-slate-850"
                  }`}>
                    2. En-Route
                  </div>
                  <div className={`p-2 rounded-xl border ${
                    ambulanceSos.status === "Arrived" ? "border-emerald-500 bg-emerald-500/5 text-emerald-500" : "border-slate-200 dark:border-slate-850"
                  }`}>
                    3. On-Site
                  </div>
                  <div className="p-2 rounded-xl border border-slate-200 dark:border-slate-850">
                    4. Transport
                  </div>
                </div>

              </div>
            ) : (
              <div className="h-full min-h-[380px] rounded-3xl border border-slate-200 dark:border-slate-850 glass-panel bg-white/40 dark:bg-slate-950/40 p-8 flex flex-col items-center justify-center text-center">
                <Truck className="w-14 h-14 text-slate-350 dark:text-slate-700 mb-4 animate-float" />
                <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                  Ambulance Dispatch Radar Idle
                </h3>
                <p className="text-xs text-slate-450 dark:text-slate-400 mt-2 max-w-sm leading-relaxed">
                  Select your localized clinical base, outline emergency symptoms, and click the red SOS dispatch trigger to map and track active dispatches.
                </p>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
