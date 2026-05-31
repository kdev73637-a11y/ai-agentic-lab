"use client";

import React, { useState, useEffect, useRef } from "react";
import { useClinic } from "@/context/ClinicContext";
import { 
  Building, 
  Users, 
  TrendingUp, 
  ShieldAlert, 
  MapPin, 
  Clock, 
  Sparkles, 
  Plus, 
  CheckCircle,
  Activity,
  FileText,
  DollarSign
} from "lucide-react";

interface AdminBlog {
  id: string;
  title: string;
  category: string;
  status: "Published" | "Draft";
  clicks: number;
}

export default function AdminDashboard() {
  const { appointments, reports, ambulanceSos, cancelSOS } = useClinic();
  
  const [blogs, setBlogs] = useState<AdminBlog[]>([
    { id: "blog-1", title: "Cardiopulmonary Longevity Metrics", category: "Cardiology", status: "Published", clicks: 1204 },
    { id: "blog-2", title: "Understanding High-Field fMRI Diagnostics", category: "Neurology", status: "Published", clicks: 802 },
    { id: "blog-3", title: "The Genomic Revolution in Cancer Care", category: "Oncology", status: "Published", clicks: 1420 }
  ]);

  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogCat, setNewBlogCat] = useState("General");
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Auto-generate AI Blog
  const handleAutoGenerateBlog = () => {
    const ideas = [
      "AI Diagnostics in Micro-Tumor Screenings",
      "Predictive Stress Indicators in Wearable ECG Arrays",
      "Custom Immunotherapy Roster Guidelines",
      "Robotic Coronary Angioplasty Advancements",
      "Understanding Glomerular Filtration Rates (GFR)"
    ];
    const categories = ["Genomics", "Cardiology", "Oncology", "Cardiology", "Nephrology"];
    
    const randomIdx = Math.floor(Math.random() * ideas.length);
    const newB: AdminBlog = {
      id: `blog-${Math.random().toString(36).substr(2, 9)}`,
      title: ideas[randomIdx],
      category: categories[randomIdx],
      status: "Published",
      clicks: 0
    };

    setBlogs(prev => [newB, ...prev]);
    alert("✓ Devroshan Clinic Gen-AI Content Engine automatically compiled and published article: " + newB.title);
  };

  const handleCreateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlogTitle.trim()) return;

    const newB: AdminBlog = {
      id: `blog-${Math.random().toString(36).substr(2, 9)}`,
      title: newBlogTitle,
      category: newBlogCat,
      status: "Draft",
      clicks: 0
    };

    setBlogs(prev => [newB, ...prev]);
    setNewBlogTitle("");
  };

  // Draw Patient Inflow Forecast Graph on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background grid lines
    ctx.strokeStyle = "rgba(226, 232, 240, 0.05)";
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let j = 0; j < canvas.height; j += 30) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(canvas.width, j);
      ctx.stroke();
    }

    // Historical admits curve data
    const historicalPoints = [12, 18, 15, 22, 28, 25, 34, 38, 30, 42];
    // AI Forecast curve points
    const forecastPoints = [42, 46, 52, 48, 58, 64, 70];

    // Plot Historical line
    ctx.beginPath();
    ctx.strokeStyle = "rgba(2, 132, 199, 0.75)"; // blue
    ctx.lineWidth = 2.5;
    historicalPoints.forEach((val, idx) => {
      const x = idx * 24;
      const y = canvas.height - (val * 2) - 10;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Plot Forecast line (dashed neon green)
    ctx.beginPath();
    ctx.strokeStyle = "rgba(16, 185, 129, 0.85)"; // green
    ctx.lineWidth = 2.5;
    ctx.setLineDash([4, 4]);
    forecastPoints.forEach((val, idx) => {
      const offsetIdx = idx + historicalPoints.length - 1;
      const x = offsetIdx * 24;
      const y = canvas.height - (val * 2) - 10;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.setLineDash([]); // reset dash

    // Add labels on graph
    ctx.fillStyle = "rgba(148, 163, 184, 0.8)";
    ctx.font = "8px Outfit, sans-serif";
    ctx.fillText("HISTORICAL RUN", 10, canvas.height - 12);
    ctx.fillStyle = "rgba(16, 185, 129, 0.9)";
    ctx.fillText("AI ADMIT FORECAST (NEXT-GEN)", canvas.width - 150, canvas.height - 12);

  }, []);

  return (
    <div className="w-full bg-mesh min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#0284c7]">Clinical Command Center</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-white mt-1">
              Hospital Operations AI Panel
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Track emergency dispatches, review admission forecast analytics, and compile clinical media alerts in real-time.
            </p>
          </div>

          <div className="flex items-center gap-3 p-3 glass-panel rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/10 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest">
              Live Operations sync
            </span>
          </div>
        </div>

        {/* Clinical Operations KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Active Beds Occupied", val: "732 / 1250", percent: "58.5% capacity", icon: <Building className="w-5 h-5 text-[#0284c7]" /> },
            { label: "Consultation Queue", val: appointments.length.toString(), percent: `${appointments.filter(a=>a.status==="In Queue").length} checked-in`, icon: <Users className="w-5 h-5 text-emerald-500" /> },
            { label: "Emergency SOS", val: ambulanceSos.active ? "1 Active Incident" : "0 Active Alerts", percent: ambulanceSos.active ? "Ambulance Dispatched" : "Radar Scope Clean", icon: <ShieldAlert className={`w-5 h-5 ${ambulanceSos.active ? "text-red-500 animate-pulse" : "text-slate-400"}`} /> },
            { label: "Daily Revenue Estimate", val: `$${(appointments.length * 150) + (reports.length * 90)}`, percent: "AI diagnostic billing", icon: <DollarSign className="w-5 h-5 text-amber-500" /> }
          ].map((kpi, idx) => (
            <div 
              key={idx}
              className="p-5 glass-panel rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/10"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] text-slate-450 dark:text-slate-405 uppercase font-extrabold tracking-wider">{kpi.label}</span>
                <div className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center">
                  {kpi.icon}
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white leading-none">{kpi.val}</h3>
              <p className="text-[10px] text-slate-400 mt-1">{kpi.percent}</p>
            </div>
          ))}
        </div>

        {/* Main Grid Panels Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUMN 1: Live Ambulance dispatch and admit charts */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* ACTIVE SOS INCIDENT MONITOR */}
            {ambulanceSos.active && (
              <div className="p-6 rounded-3xl border border-red-500/30 bg-red-500/5 glow-glow-blue space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-red-500/10">
                  <h3 className="text-sm font-extrabold text-red-500 uppercase tracking-widest flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 animate-pulse" />
                    Emergency Dispatch Incident Monitor
                  </h3>
                  <button
                    onClick={cancelSOS}
                    className="px-3 py-1.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold uppercase transition-all cursor-pointer"
                  >
                    Clear Incident
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-750 dark:text-slate-350">
                  <div className="flex flex-col gap-0.5">
                    <span>SECTOR HOSPITAL</span>
                    <strong className="text-slate-800 dark:text-white font-bold">{ambulanceSos.hospitalName}</strong>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span>GPS STATUS</span>
                    <strong className="text-slate-800 dark:text-white font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      {ambulanceSos.status}
                    </strong>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span>PATIENT ETA</span>
                    <strong className="text-slate-800 dark:text-white font-bold text-red-500">{ambulanceSos.eta} Mins remaining</strong>
                  </div>
                </div>

                {/* GPS mapping indices footer */}
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl flex justify-between text-[9px] text-slate-400 font-mono">
                  <span>AMB LAT: {ambulanceSos.ambulanceLat.toFixed(4)}° N</span>
                  <span>AMB LNG: {ambulanceSos.ambulanceLng.toFixed(4)}° E</span>
                  <span>INCIDENT ZONE SYNCED</span>
                </div>

              </div>
            )}

            {/* Patient admit forecast graph */}
            <div className="glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 p-6">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Activity className="w-4.5 h-4.5 text-[#0284c7]" />
                Predictive Admit Analytics (Historical vs. AI Intake)
              </h3>
              
              {/* Admits canvas */}
              <div className="w-full h-44 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden relative">
                <canvas 
                  ref={canvasRef} 
                  width={680} 
                  height={176}
                  className="w-full h-full block" 
                />
              </div>

              <div className="flex justify-between items-center mt-3 text-[10px] text-slate-400">
                <span>00:00 HRS</span>
                <span>08:00 HRS</span>
                <span>16:00 HRS</span>
                <span>PREDICTED SURGE INFLOW</span>
              </div>
            </div>

            {/* Active wait queue list */}
            <div className="glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/40 p-6">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-4">
                Active OPD Queue Tracker
              </h3>
              <div className="space-y-3.5">
                {appointments
                  .filter(a => a.status === "In Queue")
                  .map((ap) => (
                    <div 
                      key={ap.id}
                      className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 flex justify-between items-center text-xs"
                    >
                      <div>
                        <strong className="text-slate-850 dark:text-white font-bold block">{ap.patientName}</strong>
                        <span className="text-[10px] text-slate-450 mt-0.5 block">Attending: {ap.doctorName} ({ap.doctorSpeciality})</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-extrabold uppercase">
                        Active Check-In Ticket: {ap.qrCodeToken.split("-")[1]}
                      </span>
                    </div>
                  ))}

                {appointments.filter(a=>a.status==="In Queue").length === 0 && (
                  <p className="text-xs text-slate-500 text-center py-4">
                    No active patients currently checked-in at waitrooms. Queue radar clean.
                  </p>
                )}
              </div>
            </div>

          </div>

          {/* COLUMN 2: Blog CMS and newsletter compilation */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Blog CMS Center */}
            <div className="glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 p-5 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800/80">
                <h3 className="text-xs font-bold text-slate-850 dark:text-white uppercase tracking-wider">
                  Health Blog CMS Panel
                </h3>
                
                <button
                  onClick={handleAutoGenerateBlog}
                  className="p-1.5 rounded-lg border border-emerald-500/10 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-500 text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                  title="Generate Blog with AI"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Gen-AI Blog</span>
                </button>
              </div>

              {/* CMS form creator */}
              <form onSubmit={handleCreateBlog} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-slate-450 dark:text-slate-400 font-bold uppercase">Article Title</label>
                  <input
                    type="text"
                    required
                    value={newBlogTitle}
                    onChange={(e) => setNewBlogTitle(e.target.value)}
                    placeholder="Enter blog headline"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:border-[#0284c7]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-slate-450 dark:text-slate-400 font-bold uppercase">Category</label>
                  <select
                    value={newBlogCat}
                    onChange={(e) => setNewBlogCat(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:outline-none"
                  >
                    <option value="Cardiology">Cardiology & Vascular</option>
                    <option value="Neurology">Neurology & Brains</option>
                    <option value="Oncology">Oncology & Genomes</option>
                    <option value="General">General Wellness</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-slate-900 dark:bg-slate-800 hover:bg-slate-850 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Draft Manual Article</span>
                </button>
              </form>

              {/* Published listings */}
              <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4 text-xs">
                <span className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider block mb-1">
                  Active Blogs Stream:
                </span>
                
                {blogs.map((b) => (
                  <div 
                    key={b.id}
                    className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex justify-between items-center"
                  >
                    <div>
                      <strong className="text-slate-800 dark:text-white font-bold block truncate max-w-[130px]">{b.title}</strong>
                      <span className="text-[9px] text-[#0284c7] block mt-0.5">{b.category}</span>
                    </div>
                    <div className="text-right">
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-extrabold bg-[#0284c7]/10 text-[#0284c7] uppercase">
                        {b.status}
                      </span>
                      {b.clicks > 0 && <span className="text-[9px] text-slate-400 block mt-1">{b.clicks} views</span>}
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
