"use client";

import React, { useState, useEffect, useRef } from "react";
import { useClinic } from "@/context/ClinicContext";
import confetti from "canvas-confetti";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Send, 
  Share2, 
  FileText, 
  Sparkles, 
  Download, 
  Heart, 
  MessageSquare,
  Bot,
  Activity,
  CheckCircle,
  Clock
} from "lucide-react";

export default function TeleconsultationPage() {
  const { doctors, reports } = useClinic();
  
  const [activeDoctor, setActiveDoctor] = useState(doctors[0]);
  const [messages, setMessages] = useState<Array<{ sender: "user" | "doctor" | "system"; text: string; time: string }>>([
    {
      sender: "system",
      text: "Securing peer-to-peer WebRTC signal stream...",
      time: "Now"
    },
    {
      sender: "doctor",
      text: "Hello! I am Dr. Roshan Dev. I am reviewing your shared telemetry feed and medical panels. How are you feeling today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [videoActive, setVideoActive] = useState(true);
  const [micActive, setMicActive] = useState(true);
  
  // Prescription generation
  const [prescriptionGenerated, setPrescriptionGenerated] = useState(false);
  const [sharedReport, setSharedReport] = useState<string | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { sender: "user" as const, text: inputMessage, time: timeStr };
    
    setMessages(prev => [...prev, userMsg]);
    setInputMessage("");

    // Simulate doctor response
    setTimeout(() => {
      let replyText = "I see. We should definitely cross-reference those indicators with your active daily metrics. Have you noticed any chest tightness or respiratory sensitivity?";
      const query = inputMessage.toLowerCase();

      if (query.includes("pain") || query.includes("chest") || query.includes("heart")) {
        replyText = "Chest discomfort must be closely monitored. I'm recommending a localized coronary calcium check and an immediate lipid panel evaluation. I will write a customized digital prescription with clinical guidelines shortly.";
      } else if (query.includes("report") || query.includes("blood") || query.includes("cholesterol")) {
        replyText = "Yes, looking at your uploaded diagnostics panel: total cholesterol at 242 and HbA1c at 5.8% indicate moderate risks. Let's start you on a mild lipid-lowering cardioton and a carbohydrate-contained meal plan.";
      } else if (query.includes("thank") || query.includes("ok")) {
        replyText = "You're welcome. Sustaining structural cardiovascular safety requires consistent micro-revisions to daily diet. Let's generate your AI clinical guidelines so you have a structured plan.";
      }

      setMessages(prev => [...prev, {
        sender: "doctor" as const,
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1200);
  };

  const shareReportWithDoctor = (reportName: string) => {
    setSharedReport(reportName);
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setMessages(prev => [
      ...prev,
      { sender: "user" as const, text: `[SHARED REPORT] Shared medical file: ${reportName}`, time: timeStr },
      { sender: "doctor" as const, text: `Excellent. I have opened ${reportName}. It shows borderline elevation in cholesterol and pre-diabetic ranges. I will incorporate this data into your custom wellness prescription.`, time: timeStr }
    ]);
  };

  const handleGeneratePrescription = () => {
    setPrescriptionGenerated(true);
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
  };

  return (
    <div className="w-full bg-mesh min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#0284c7]">Telehealth Grid</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-white mt-1">
              Virtual Consultation Clinic
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Connect via full-duplex WebRTC video nodes, exchange diagnostics reports, and receive AI-compiled digital prescriptions immediately.
            </p>
          </div>

          {/* Attending physician header */}
          <div className="flex items-center gap-3 p-3.5 glass-panel rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/10">
            <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-slate-250/50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={activeDoctor.image} 
                alt={activeDoctor.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <span className="text-[9px] text-[#0284c7] font-bold uppercase tracking-wider block">ATTENDING PHYSICIAN</span>
              <h3 className="text-xs font-extrabold text-slate-800 dark:text-white mt-0.5">{activeDoctor.name}</h3>
            </div>
          </div>
        </div>

        {/* Main Grid Consultation Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUMN 1: Video consultation streams */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Primary Video Container */}
            <div className="w-full aspect-video rounded-3xl bg-slate-950 border border-slate-800 relative overflow-hidden shadow-2xl flex items-center justify-center">
              
              {/* Main Doctor Screen */}
              {videoActive ? (
                <div className="absolute inset-0 w-full h-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={activeDoctor.image} 
                    alt={activeDoctor.name} 
                    className="w-full h-full object-cover opacity-90 filter brightness-95" 
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5 border border-slate-800">
                      <Clock className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                      Attending: {activeDoctor.name}
                    </span>
                    <span className="px-2 py-1 rounded bg-[#0284c7] text-[10px] font-extrabold text-white uppercase tracking-wide">
                      HD 1080P
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <VideoOff className="w-12 h-12 text-slate-650 mx-auto animate-pulse" />
                  <p className="text-xs text-slate-500">Peer video connection suspended</p>
                </div>
              )}

              {/* Patient Picture-In-Picture Grid overlay */}
              <div className="absolute bottom-4 right-4 w-32 aspect-video sm:w-40 rounded-2xl bg-slate-900 border-2 border-[#0284c7] shadow-xl overflow-hidden z-20">
                <div className="w-full h-full bg-slate-800 flex items-center justify-center relative">
                  <div className="absolute top-1 left-2 text-[8px] font-bold text-white uppercase">Patient Feed</div>
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white uppercase">
                    ME
                  </div>
                </div>
              </div>

              {/* Media Controllers bar */}
              <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                <button
                  onClick={() => setVideoActive(!videoActive)}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                    videoActive 
                      ? "bg-slate-950/80 border-slate-800 text-white hover:bg-slate-900" 
                      : "bg-red-600 border-red-500 text-white"
                  }`}
                  title="Toggle Video feed"
                >
                  {videoActive ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setMicActive(!micActive)}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                    micActive 
                      ? "bg-slate-950/80 border-slate-800 text-white hover:bg-slate-900" 
                      : "bg-red-600 border-red-500 text-white"
                  }`}
                  title="Toggle Microphone"
                >
                  {micActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                </button>
              </div>

              {/* Connection status overlay */}
              <div className="absolute top-4 right-4 px-2 py-1 rounded bg-slate-950/80 text-[8px] font-extrabold text-emerald-400 border border-slate-800 tracking-widest uppercase">
                📶 CONNECTED - LATENCY: 14MS
              </div>

            </div>

            {/* Sharing Diagnostic reports panel */}
            <div className="glass-panel rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white/40 dark:bg-slate-950/40 p-6">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Share2 className="w-4.5 h-4.5 text-[#0284c7]" />
                Share Laboratory Reports with Attending
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reports.map((rep) => (
                  <div 
                    key={rep.id}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-5 h-5 text-[#0284c7] shrink-0" />
                      <div>
                        <strong className="text-xs text-slate-800 dark:text-white block truncate max-w-[140px]">{rep.fileName}</strong>
                        <span className="text-[9px] text-slate-450 mt-0.5 block">{rep.date}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => shareReportWithDoctor(rep.fileName)}
                      disabled={sharedReport === rep.fileName}
                      className="px-2.5 py-1 rounded-lg bg-[#0284c7]/10 hover:bg-[#0284c7]/20 disabled:opacity-50 text-[#0284c7] dark:text-[#38bdf8] text-[9px] font-bold cursor-pointer transition-all border border-[#0284c7]/15"
                    >
                      {sharedReport === rep.fileName ? "Shared" : "Share"}
                    </button>
                  </div>
                ))}

                {reports.length === 0 && (
                  <p className="col-span-2 text-xs text-slate-500 text-center py-4">
                    No diagnostic reports found in patient vault. Upload files inside the Report Analyzer portal first!
                  </p>
                )}
              </div>
            </div>

          </div>

          {/* COLUMN 2: Chat & AI Prescription Summary */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Direct consultation text chat panel */}
            <div className="glass-panel rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white/40 dark:bg-slate-950/40 p-5 h-[360px] flex flex-col overflow-hidden shadow-xl">
              
              <div className="pb-3 border-b border-slate-100 dark:border-slate-800/80 mb-3 flex items-center gap-2">
                <MessageSquare className="w-4.5 h-4.5 text-[#0284c7]" />
                <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                  Attending Chat Room
                </h3>
              </div>

              {/* Chat flow list */}
              <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
                {messages.map((m, idx) => {
                  const isDoctor = m.sender === "doctor";
                  const isSys = m.sender === "system";

                  if (isSys) {
                    return (
                      <div key={idx} className="text-center py-1">
                        <span className="px-3 py-1 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[8px] font-extrabold text-slate-500 uppercase tracking-widest">
                          🛡️ {m.text}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div 
                      key={idx}
                      className={`flex items-start gap-2.5 ${!isDoctor ? "flex-row-reverse" : ""}`}
                    >
                      <div className={`p-3 rounded-2xl text-[11px] leading-relaxed relative ${
                        isDoctor 
                          ? "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-250 rounded-tl-none shadow-sm"
                          : "bg-[#0284c7] text-white rounded-tr-none shadow-sm shadow-[#0284c7]/20"
                      }`}>
                        {m.text}
                      </div>
                      <span className="text-[8px] text-slate-400 mt-1 self-end">{m.time}</span>
                    </div>
                  );
                })}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input form */}
              <form 
                onSubmit={handleSendMessage}
                className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Message Dr. Dev..."
                  className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-xl text-xs focus:outline-none focus:border-[#0284c7]"
                />
                
                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-gradient-to-r from-[#0284c7] to-[#10b981] text-white flex items-center justify-center cursor-pointer shadow-lg shadow-[#0284c7]/10"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>

            {/* AI Prescription Generator panel */}
            <div className="glass-panel rounded-3xl border border-slate-250 dark:border-slate-800/80 bg-white/40 dark:bg-slate-950/40 p-6 flex flex-col justify-between min-h-[220px]">
              <div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/10 text-[9px] font-extrabold uppercase tracking-wide inline-block mb-3">
                  AI Prescriptions Engine
                </span>
                
                <h3 className="text-base font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-4.5 h-4.5 text-emerald-500 animate-spin" />
                  Generate Custom Digital Prescriptions
                </h3>
                
                <p className="text-xs text-slate-500 dark:text-slate-450 mt-1.5 leading-relaxed">
                  Synthesizes physiological indicators, shared medical diagnostics files, and consult dialog history to draft HIPAA-approved medical recipes instantly.
                </p>
              </div>

              {/* Booking CTA triggers */}
              {!prescriptionGenerated ? (
                <button
                  type="button"
                  onClick={handleGeneratePrescription}
                  className="w-full mt-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#0284c7] to-[#10b981] hover:shadow-lg rounded-xl cursor-pointer"
                >
                  Verify & Compile Digital Prescription
                </button>
              ) : (
                <div className="mt-6 space-y-4">
                  
                  {/* Generated PDF/Record preview */}
                  <div className="p-4 rounded-2xl border border-emerald-500/10 bg-emerald-500/5 text-xs">
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400 block mb-2 flex items-center gap-1">
                      <CheckCircle className="w-4.5 h-4.5" />
                      AI PRESCRIPTION VERIFIED
                    </span>
                    <div className="space-y-1 text-slate-750 dark:text-slate-300">
                      <p><strong>Primary Therapeutics:</strong> Lipitor (Atorvastatin) 10mg QD, Metformin 500mg BID</p>
                      <p><strong>Diets Roster:</strong> Strict low sodium (under 2g/day), complex carbohydrates focus.</p>
                      <p><strong>Next checkup:</strong> Lipids & ECG check-in with Dr. Roshan Dev in 14 days.</p>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => alert("✓ Digital Prescription saved in local patient health records vault!")}
                      className="flex-1 text-center py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-200 cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Record</span>
                    </button>
                  </div>

                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
