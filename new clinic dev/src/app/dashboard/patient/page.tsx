"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useClinic } from "@/context/ClinicContext";
import { 
  Activity, 
  Watch, 
  Calendar, 
  FileText, 
  Heart, 
  User, 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  ChevronRight,
  QrCode,
  Bell
} from "lucide-react";

export default function PatientDashboard() {
  const { 
    appointments, 
    reports, 
    vitals, 
    wearableSyncing, 
    setWearableSyncing,
    wearableBrand, 
    setWearableBrand,
    checkInOPD,
    cancelAppointment
  } = useClinic();

  const [activeTab, setActiveTab] = useState<"overview" | "appointments" | "records" | "vitals">("overview");
  const [showQRModal, setShowQRModal] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Calculate dynamic Health Score
  const calculateHealthScore = () => {
    let score = 92;
    // Lower score based on abnormal values in reports
    reports.forEach((rep) => {
      score += rep.healthScoreImpact;
    });
    // Adjust slightly for heart rate spikes
    if (vitals.heartRate > 90) score -= 2;
    return Math.max(45, Math.min(100, score));
  };

  const healthScore = calculateHealthScore();

  // Animated Scrolling Canvas ECG/Heart Rate tracker
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let x = 0;
    const points: number[] = Array(canvas.width).fill(canvas.height / 2);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background grid lines
      ctx.strokeStyle = "rgba(2, 132, 199, 0.05)";
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let j = 0; j < canvas.height; j += 20) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(canvas.width, j);
        ctx.stroke();
      }

      // ECG wave mathematical synthesis
      let y = canvas.height / 2;
      const t = Date.now() * 0.005 * (vitals.heartRate / 70); // frequency based on heart rate
      
      // Generate QRS heartbeat complexes periodically
      const cycle = t % (2 * Math.PI);
      if (cycle < 0.2) {
        // P Wave
        y -= Math.sin(cycle * 5 * Math.PI) * 4;
      } else if (cycle >= 0.4 && cycle < 0.5) {
        // Q Wave
        y += 5;
      } else if (cycle >= 0.5 && cycle < 0.7) {
        // R Wave (Tall Spike)
        y -= Math.sin((cycle - 0.5) * 5 * Math.PI) * 28;
      } else if (cycle >= 0.7 && cycle < 0.8) {
        // S Wave
        y += 8;
      } else if (cycle >= 1.0 && cycle < 1.4) {
        // T Wave
        y -= Math.sin((cycle - 1.0) * 2.5 * Math.PI) * 6;
      }

      points.push(y);
      if (points.length > canvas.width) {
        points.shift();
      }

      // Draw ECG Line
      ctx.beginPath();
      ctx.strokeStyle = "rgba(16, 185, 129, 0.85)"; // glowing emerald
      ctx.lineWidth = 2;
      ctx.shadowColor = "rgba(16, 185, 129, 0.4)";
      ctx.shadowBlur = 8;
      
      for (let i = 0; i < points.length; i++) {
        if (i === 0) {
          ctx.moveTo(i, points[i]);
        } else {
          ctx.lineTo(i, points[i]);
        }
      }
      ctx.stroke();
      ctx.shadowBlur = 0; // reset blur

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, [vitals.heartRate]);

  return (
    <div className="w-full bg-mesh min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#0284c7]">Patient Center</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-white mt-1">
              Personal Health Portal
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Monitor dynamic physiological indices, manage scheduling tickets, and access parsed laboratory summaries securely.
            </p>
          </div>

          {/* Wearable synchronizer */}
          <div className="flex flex-wrap items-center gap-3 p-3 glass-panel rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/10 shrink-0">
            <Watch className="w-5 h-5 text-[#0284c7] shrink-0" />
            <select
              value={wearableBrand}
              onChange={(e) => setWearableBrand(e.target.value as any)}
              className="px-2 py-1 bg-transparent border-none text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none"
            >
              <option value="Apple Watch">Sync: Apple Watch</option>
              <option value="Fitbit">Sync: Fitbit Array</option>
              <option value="Samsung Health">Sync: Samsung Health</option>
              <option value="Google Fit">Sync: Google Fit</option>
              <option value="None">Disconnect Streams</option>
            </select>
            
            <button
              onClick={() => setWearableSyncing(!wearableSyncing)}
              className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase transition-all cursor-pointer ${
                wearableSyncing && wearableBrand !== "None"
                  ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/15 animate-pulse"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-500"
              }`}
            >
              {wearableSyncing && wearableBrand !== "None" ? "Live Stream" : "Suspended"}
            </button>
          </div>
        </div>

        {/* Dashboard Grid Cockpit */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDEBAR: Vitality and Health Score Dials */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Health Score Dial Panel */}
            <div className="glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 p-6 flex flex-col items-center text-center">
              <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-5">
                Aggregate Biological Score
              </h3>

              {/* Glowing SVG Ring Dial */}
              <div className="w-40 h-40 relative flex items-center justify-center mb-4">
                <svg className="w-full h-full transform -rotate-95">
                  {/* Background Circle */}
                  <circle
                    cx="80"
                    cy="80"
                    r="68"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="10"
                    className="text-slate-100 dark:text-slate-800"
                  />
                  {/* Filled Arc */}
                  <circle
                    cx="80"
                    cy="80"
                    r="68"
                    fill="none"
                    stroke="url(#scoreGrad)"
                    strokeWidth="10"
                    strokeDasharray={2 * Math.PI * 68}
                    strokeDashoffset={2 * Math.PI * 68 * (1 - healthScore / 100)}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0284c7" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Score Centered */}
                <div className="absolute flex flex-col items-center">
                  <span className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">{healthScore}</span>
                  <span className="text-[10px] text-slate-450 uppercase font-bold tracking-wider">HEALTH SCORE</span>
                </div>
              </div>

              {/* Health Score status feedback */}
              <div className="text-xs px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850">
                {healthScore >= 90 ? (
                  <span className="text-emerald-500 font-bold flex items-center gap-1">
                    <CheckCircle className="w-4.5 h-4.5" /> Optimal Bio-Stasis
                  </span>
                ) : (
                  <span className="text-amber-500 font-bold flex items-center gap-1 leading-snug">
                    <AlertTriangle className="w-4.5 h-4.5 animate-bounce shrink-0" /> Borderline Lipid Deviation
                  </span>
                )}
                <p className="text-[10px] text-slate-400 mt-1 max-w-[200px] leading-relaxed mx-auto">
                  Derived dynamically from your parsed blood sheets and synced telemetry heart indices.
                </p>
              </div>

            </div>

            {/* Scrolling Canvas ECG widget */}
            <div className="glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold text-slate-850 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-emerald-500" />
                  ECG Telemetry Feed
                </h3>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1">
                  <Heart className="w-4 h-4 fill-red-500 stroke-red-500 animate-heartbeat" />
                  {vitals.heartRate} BPM
                </span>
              </div>

              {/* Live Wave Canvas */}
              <div className="w-full h-24 rounded-2xl bg-slate-900 overflow-hidden border border-slate-800 relative">
                <canvas 
                  ref={canvasRef} 
                  width={340} 
                  height={96}
                  className="w-full h-full block" 
                />
              </div>

              {/* Wearable metadata */}
              <div className="grid grid-cols-2 gap-3 mt-4 text-[10px] uppercase font-bold text-slate-450 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3">
                <div className="flex flex-col gap-0.5">
                  <span>BLOOD OXYGEN SpO2</span>
                  <strong className="text-slate-800 dark:text-slate-200 text-xs">{vitals.oxygen}% Optimal</strong>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span>BLOOD PRESSURE</span>
                  <strong className="text-slate-800 dark:text-slate-200 text-xs">{vitals.bloodPressure}</strong>
                </div>
              </div>

            </div>

            {/* Daily Medical Reminders */}
            <div className="glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 p-5">
              <h3 className="text-xs font-bold text-slate-850 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-[#0284c7]" />
                Daily Therapeutics Reminders
              </h3>
              
              <div className="space-y-2 text-xs">
                {[
                  { drug: "Atorvastatin (Lipitor) 10mg", dosage: "1 Tablet, Post-Dinner", status: "Due tonight" },
                  { drug: "Metformin (Glucophage) 500mg", dosage: "1 Tablet, BID (Morning/Night)", status: "Completed Morning" }
                ].map((med, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 flex justify-between items-center"
                  >
                    <div>
                      <strong className="text-slate-800 dark:text-white font-bold block">{med.drug}</strong>
                      <span className="text-[10px] text-slate-450 block mt-0.5">{med.dosage}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[8px] font-extrabold bg-[#0284c7]/10 text-[#0284c7] uppercase">
                      {med.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT VIEWPORT: Tab Panels (Overview, Bookings, Records) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* View selectors tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 pb-2 gap-4">
              {["overview", "appointments", "records"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`text-sm font-bold uppercase pb-1.5 relative cursor-pointer ${
                    activeTab === tab 
                      ? "text-[#0284c7] dark:text-[#38bdf8]" 
                      : "text-slate-450 dark:text-slate-400 hover:text-slate-650"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0284c7] rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* TAB PANEL 1: OVERVIEW COMPILATION */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                
                {/* Upcoming appointments alert */}
                <div className="glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/10 p-6">
                  <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100 dark:border-slate-800/80">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-[#0284c7]" />
                      Scheduled Doctor Consultations
                    </h3>
                    <Link href="/booking" className="text-xs text-[#0284c7] dark:text-[#38bdf8] flex items-center gap-0.5 hover:underline">
                      <span>Schedule New</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {appointments.map((apt) => (
                      <div 
                        key={apt.id}
                        className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <strong className="text-sm font-extrabold text-slate-800 dark:text-white">{apt.doctorName}</strong>
                            <span className="px-2 py-0.5 rounded-lg bg-[#0284c7]/5 text-[9px] text-[#0284c7] font-bold uppercase">
                              {apt.doctorSpeciality}
                            </span>
                          </div>
                          <span className="text-xs text-slate-450 dark:text-slate-400 block mt-1.5 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#0284c7]" />
                            {apt.date} at <strong>{apt.timeSlot}</strong> ({apt.type} consultation)
                          </span>
                        </div>

                        {/* Interactive checkin actions */}
                        <div className="flex gap-2 w-full md:w-auto shrink-0">
                          {apt.status === "Scheduled" ? (
                            <>
                              <button
                                onClick={() => checkInOPD(apt.id)}
                                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0284c7] to-[#10b981] text-white text-xs font-bold hover:shadow-lg transition-all cursor-pointer"
                              >
                                Self Check-In
                              </button>
                              <button
                                onClick={() => setShowQRModal(apt.qrCodeToken)}
                                className="p-2 rounded-xl border border-slate-250 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-350 cursor-pointer flex items-center justify-center"
                                title="View QR Ticket"
                              >
                                <QrCode className="w-4.5 h-4.5" />
                              </button>
                            </>
                          ) : (
                            <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/15 text-emerald-500 text-xs font-bold flex items-center gap-1">
                              <CheckCircle className="w-4 h-4" />
                              Checked-In / In Queue
                            </span>
                          )}
                          
                          <button
                            onClick={() => cancelAppointment(apt.id)}
                            className="px-3 py-2 rounded-xl text-slate-400 hover:text-red-500 text-xs font-semibold cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ))}

                    {appointments.length === 0 && (
                      <p className="text-xs text-slate-500 text-center py-6">
                        No active medical appointments scheduled. Head to the Book Appointment link to secure slots!
                      </p>
                    )}
                  </div>

                </div>

                {/* Scanned records timeline */}
                <div className="glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/10 p-6">
                  <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100 dark:border-slate-800/80">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#0284c7]" />
                      Laboratory Diagnostics Vault
                    </h3>
                    <Link href="/report-analyzer" className="text-xs text-[#0284c7] dark:text-[#38bdf8] flex items-center gap-0.5 hover:underline">
                      <span>Upload & Analyze</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {reports.map((rep) => (
                      <div 
                        key={rep.id}
                        className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <strong className="text-sm font-bold text-slate-800 dark:text-white">{rep.fileName}</strong>
                            <span className="text-[10px] text-slate-450 block mt-0.5">Scanned on: {rep.date}</span>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase ${
                            rep.healthScoreImpact >= 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                          }`}>
                            {rep.healthScoreImpact >= 0 ? "+" : ""}{rep.healthScoreImpact} Pts Impact
                          </span>
                        </div>

                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2.5 italic">
                          “{rep.summary}”
                        </p>
                      </div>
                    ))}

                    {reports.length === 0 && (
                      <p className="text-xs text-slate-500 text-center py-6">
                        No laboratory sheets parsed inside patient profile. Upload files on the Report Analyzer page!
                      </p>
                    )}
                  </div>
                </div>

              </div>
            )}

            {/* TAB PANEL 2: DETAILED APPOINTMENTS LIST */}
            {activeTab === "appointments" && (
              <div className="glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/40 p-6 space-y-4">
                <h2 className="text-base font-bold text-slate-800 dark:text-white mb-2">My Consultation Schedules History</h2>
                {appointments.map((apt) => (
                  <div key={apt.id} className="p-4 border-b border-slate-100 dark:border-slate-800 pb-4 last:border-b-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <strong className="text-sm font-bold text-slate-800 dark:text-white">{apt.doctorName}</strong>
                        <p className="text-xs text-[#0284c7] font-semibold mt-0.5">{apt.doctorSpeciality}</p>
                      </div>
                      <span className="px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900 border text-[9px] font-bold text-slate-600 dark:text-slate-400 uppercase">
                        {apt.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                      Hospital: {apt.hospitalName} | formato: {apt.type} consultation | slot: {apt.date} at {apt.timeSlot}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* TAB PANEL 3: DIAGNOSTIC RECORDS LIST */}
            {activeTab === "records" && (
              <div className="glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/40 p-6 space-y-4">
                <h2 className="text-base font-bold text-slate-800 dark:text-white mb-2">My Laboratory Records Archives</h2>
                {reports.map((rep) => (
                  <div key={rep.id} className="p-4 border-b border-slate-100 dark:border-slate-800 pb-4 last:border-b-0 space-y-2">
                    <div className="flex justify-between">
                      <strong className="text-xs text-slate-800 dark:text-white font-bold">{rep.fileName}</strong>
                      <span className="text-[10px] text-slate-400">{rep.date}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">{rep.summary}</p>
                    <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed">{rep.fullExplanation}</p>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* DYNAMIC QR TICKET VIEWER MODAL CONTAINER */}
      {showQRModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="w-full max-w-sm glass-panel bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 text-center space-y-5 relative animate-float">
            
            <button 
              onClick={() => setShowQRModal(null)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-450 dark:text-slate-450 cursor-pointer"
            >
              ✕
            </button>

            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                Physical OPD Pass
              </h3>
              <p className="text-[10px] text-slate-400 mt-1">Scan at Waiting Room Check-in Kiosk</p>
            </div>

            <div className="w-40 h-40 border border-slate-100 dark:border-slate-800 p-2 bg-white rounded-2xl mx-auto flex items-center justify-center">
              <QrCode className="w-36 h-36 text-slate-900" />
            </div>

            <div className="text-[11px] font-mono font-bold text-slate-850 dark:text-slate-200 border-t border-slate-100 dark:border-slate-800 pt-3">
              PASS: {showQRModal}
            </div>

            <button
              onClick={() => {
                // Find matching appointment and checkin
                const apt = appointments.find(ap => ap.qrCodeToken === showQRModal);
                if (apt) checkInOPD(apt.id);
                setShowQRModal(null);
                alert("✓ QR Ticket Checked-in! Your OPD waiting room wait time is now synced in real-time.");
              }}
              className="w-full py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Simulate Kiosk Check-In
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
