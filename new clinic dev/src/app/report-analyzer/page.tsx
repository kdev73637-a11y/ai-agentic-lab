"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useClinic, LabReport } from "@/context/ClinicContext";
import confetti from "canvas-confetti";
import { 
  FileText, 
  Upload, 
  Sparkles, 
  AlertTriangle, 
  ShieldCheck, 
  Activity, 
  User, 
  ArrowRight,
  ClipboardCheck,
  TrendingDown
} from "lucide-react";

export default function ReportAnalyzerPage() {
  const { uploadReport } = useClinic();
  
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzedReport, setAnalyzedReport] = useState<LabReport | null>(null);
  const [fileName, setFileName] = useState("");

  const handleSimulateReport = (type: "lipids" | "glucose" | "clean") => {
    setAnalyzing(true);
    setAnalyzedReport(null);

    let docName = "Blood_Panel_Comprehensive_Q2.pdf";
    let docText = "Ideal physiological thresholds across cholesterol, sugar indices.";

    if (type === "lipids") {
      docName = "Cardio_Lipid_Panel_May26.pdf";
      docText = "Total Cholesterol is 242 mg/dL. Elevated triglycerides are present. Systolic BP reading 145 mmHg.";
    } else if (type === "glucose") {
      docName = "Glycemic_Glucose_Screen_2026.pdf";
      docText = "Fasting glucose level is 148 mg/dL. HbA1c reads at 5.8%. Moderate hyper-glycemia.";
    } else {
      docName = "General_Physiological_Audit.pdf";
      docText = "All biomarkers read completely normal.";
    }

    setFileName(docName);

    // Simulate futuristic AI diagnostics analysis scanning
    setTimeout(() => {
      setAnalyzing(false);
      const rep = uploadReport(docName, docText);
      setAnalyzedReport(rep);

      // Celebrate compilation
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 }
      });
    }, 3000);
  };

  return (
    <div className="w-full bg-mesh min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Block */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#0284c7]">AI Diagnostic Vault</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-white mt-2">
            AI Medical Report Analyzer
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            Drag-and-drop diagnostic PDFs or lab sheets. Our multi-spectral neural engine highlights biomarker anomalies and maps specialist rosters instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* UPLOAD PANEL AND SIMULATIONS COLUMN */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Main Upload Drop Box */}
            <div className="glass-panel rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 p-8 text-center flex flex-col items-center justify-center min-h-[260px] relative overflow-hidden group">
              
              {analyzing ? (
                <div className="space-y-4 w-full">
                  
                  {/* Glowing scanner animations */}
                  <div className="w-16 h-16 rounded-2xl bg-[#0284c7]/10 flex items-center justify-center mx-auto text-[#0284c7]">
                    <Activity className="w-10 h-10 animate-pulse" />
                  </div>
                  
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-widest">
                      Scanning PDF Structures...
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-1">AI parsing multi-spectral diagnostic indices.</p>
                  </div>
                  
                  {/* Glowing progress line scan */}
                  <div className="w-full h-1 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden relative">
                    <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#0284c7] to-[#10b981] w-2/3 animate-[pulse_1.5s_infinite]" />
                  </div>

                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-450 dark:text-slate-400 mx-auto group-hover:scale-105 transition-transform duration-300">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                      Upload Diagnostics File
                    </h3>
                    <p className="text-[10px] text-slate-450 dark:text-slate-400 mt-1 max-w-[200px] mx-auto leading-relaxed">
                      Select raw lab reports or PDFs. Supports blood profiles, metabolic files, and urine scans.
                    </p>
                  </div>
                  <button 
                    onClick={() => handleSimulateReport("lipids")}
                    className="px-4 py-2 bg-slate-900 dark:bg-slate-800 hover:bg-slate-850 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Select File
                  </button>
                </div>
              )}

            </div>

            {/* Simulated mock panels buttons */}
            <div className="glass-panel rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white/40 dark:bg-slate-950/40 p-6">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-350 uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                Simulate Diagnostic Report Panel
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                No reports on hand? Click these presets to feed our diagnostic scanning engine immediately.
              </p>
              
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => handleSimulateReport("lipids")}
                  className="w-full text-left p-3.5 rounded-2xl border border-red-500/25 bg-red-500/5 hover:bg-red-500/10 cursor-pointer text-xs font-semibold flex items-center justify-between"
                >
                  <span className="text-red-500 font-bold">🍔 Cardiovascular Lipids (Elevated Cholesterol)</span>
                  <ArrowRight className="w-4 h-4 text-red-500" />
                </button>

                <button
                  onClick={() => handleSimulateReport("glucose")}
                  className="w-full text-left p-3.5 rounded-2xl border border-amber-500/25 bg-amber-500/5 hover:bg-amber-500/10 cursor-pointer text-xs font-semibold flex items-center justify-between"
                >
                  <span className="text-amber-500 font-bold">🍭 Glycemic Profile (Elevated Sugar)</span>
                  <ArrowRight className="w-4 h-4 text-amber-500" />
                </button>

                <button
                  onClick={() => handleSimulateReport("clean")}
                  className="w-full text-left p-3.5 rounded-2xl border border-emerald-500/25 bg-emerald-500/5 hover:bg-emerald-500/10 cursor-pointer text-xs font-semibold flex items-center justify-between"
                >
                  <span className="text-emerald-500 font-bold">🥦 Clean Physiological Audit (All Normal)</span>
                  <ArrowRight className="w-4 h-4 text-emerald-500" />
                </button>
              </div>

            </div>

          </div>

          {/* AI SCANNED DIAGNOSTICS DISPLAY COLUMN */}
          <div className="lg:col-span-7">
            
            {analyzedReport ? (
              <div className="glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 p-6 md:p-8 space-y-6 shadow-2xl">
                
                {/* Header */}
                <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/10 text-[9px] font-extrabold uppercase tracking-widest inline-block">
                      AI Diagnostic Review Verified
                    </span>
                    <h2 className="text-xl font-bold mt-2 text-slate-800 dark:text-white truncate max-w-[260px]">
                      {analyzedReport.fileName}
                    </h2>
                    <span className="text-[10px] text-slate-450 dark:text-slate-400 mt-1 block">Scan Date: {analyzedReport.date}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Health Score Change</span>
                    <p className={`text-xl font-extrabold mt-0.5 ${
                      analyzedReport.healthScoreImpact >= 0 ? "text-emerald-500" : "text-red-500"
                    }`}>
                      {analyzedReport.healthScoreImpact >= 0 ? "+" : ""}{analyzedReport.healthScoreImpact} Pts
                    </p>
                  </div>
                </div>

                {/* Patient summary */}
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-1 text-xs leading-relaxed">
                  <h4 className="font-extrabold text-[#0284c7] uppercase tracking-wider flex items-center gap-1">
                    <ClipboardCheck className="w-4 h-4" />
                    AI Summary Synthesis
                  </h4>
                  <p className="text-slate-550 dark:text-slate-300 italic">
                    “{analyzedReport.summary}”
                  </p>
                </div>

                {/* Anomalies listed */}
                {analyzedReport.abnormalValues.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-red-500 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 animate-bounce" />
                      Anomalies & Deviations Flagged
                    </h4>
                    
                    <div className="space-y-2.5">
                      {analyzedReport.abnormalValues.map((abn, idx) => (
                        <div 
                          key={idx}
                          className="p-4 rounded-2xl border border-red-500/20 bg-red-500/5 flex justify-between items-center"
                        >
                          <div>
                            <strong className="text-xs text-slate-800 dark:text-white block">{abn.test}</strong>
                            <span className="text-[10px] text-slate-450 block mt-0.5">Reference Normal Range: {abn.normalRange}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-base font-extrabold text-red-500 block">{abn.value}</span>
                            <span className="px-1.5 py-0.5 rounded text-[8px] font-extrabold bg-red-500/10 text-red-550 uppercase">
                              {abn.severity} Risk
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Specialist and Package matching */}
                <div className="p-5 rounded-3xl border border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                  <div className="max-w-xs">
                    <span className="text-[9px] text-[#0284c7] font-extrabold uppercase tracking-wide block">SUGGESTED DEPT SPECIALIST</span>
                    <strong className="text-sm font-extrabold text-slate-800 dark:text-white mt-1 block">
                      {analyzedReport.suggestedSpecialist}
                    </strong>
                    <p className="text-[10px] text-slate-450 dark:text-slate-400 mt-1">
                      Our diagnostic engine matched your biological anomalies with top clinical experts in this area.
                    </p>
                  </div>
                  
                  <Link
                    href={`/doctors?dept=${encodeURIComponent(analyzedReport.suggestedSpecialist.split(" ")[0])}`}
                    className="w-full sm:w-auto px-5 py-2.5 text-center text-xs font-bold text-white bg-gradient-to-r from-[#0284c7] to-[#10b981] hover:shadow-lg rounded-xl shrink-0 transition-all flex items-center justify-center gap-1"
                  >
                    <span>Connect Consultant</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Detailed description */}
                <div className="space-y-1.5 text-xs">
                  <h4 className="font-extrabold text-slate-700 dark:text-slate-350 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Clinical Guidance & Interventions
                  </h4>
                  <p className="text-slate-550 dark:text-slate-400 leading-relaxed">
                    {analyzedReport.fullExplanation}
                  </p>
                </div>

              </div>
            ) : (
              <div className="h-full min-h-[380px] rounded-3xl border border-slate-200 dark:border-slate-850 glass-panel bg-white/40 dark:bg-slate-950/40 p-8 flex flex-col items-center justify-center text-center">
                <FileText className="w-14 h-14 text-slate-300 dark:text-slate-700 mb-4 animate-float" />
                <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                  Diagnostics Terminal Idle
                </h3>
                <p className="text-xs text-slate-450 dark:text-slate-400 mt-2 max-w-sm leading-relaxed">
                  Drop a diagnostics report PDF or select a simulated blood panel sample card to test our clinical AI parser immediately.
                </p>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
