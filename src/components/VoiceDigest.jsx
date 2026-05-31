import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Sparkles, 
  Send, 
  Layers, 
  MailCheck, 
  ChevronRight, 
  Calendar,
  Volume2,
  CheckCircle,
  Database
} from 'lucide-react';

export default function VoiceDigest({ addNotification }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStep, setRecordingStep] = useState(0); // 0 = idle, 1 = listening, 2 = transcribing, 3 = finished
  const [transcription, setTranscription] = useState('');
  const [voiceDraft, setVoiceDraft] = useState('');
  const [waveHeight, setWaveHeight] = useState([12, 24, 8, 32, 16, 28, 10, 20, 14, 6]);

  // Simulate audio waveform animation
  useEffect(() => {
    let waveInterval;
    if (isRecording) {
      waveInterval = setInterval(() => {
        setWaveHeight(prev => prev.map(() => Math.floor(Math.random() * 32) + 6));
      }, 100);
    } else {
      setWaveHeight([12, 18, 8, 22, 14, 20, 10, 15, 12, 6]);
    }
    return () => clearInterval(waveInterval);
  }, [isRecording]);

  // Simulate transcription typing and draft generation
  const startVoiceCapture = () => {
    setIsRecording(true);
    setRecordingStep(1);
    setTranscription('');
    setVoiceDraft('');
    
    // Step 1: Listening (3 seconds)
    setTimeout(() => {
      setRecordingStep(2);
      // Type out transcription
      const text = "Draft a friendly reply to John Connor letting him know that next Tuesday at 7:00 PM works perfect for dinner to align on Q3. Ask him if Wednesday night is better if he gets delayed, and ask if he will be accompanied by Marcus.";
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index < text.length) {
          setTranscription(prev => prev + text.charAt(index));
          index += 2; // type fast
        } else {
          clearInterval(typeInterval);
          setIsRecording(false);
          setRecordingStep(3);
          
          // Generate Draft (1.5 seconds later)
          setTimeout(() => {
            setVoiceDraft(`Hi John,

Tuesday night at 7:00 PM works perfectly for dinner to catch up and align on the Q3 operations timeline! 

In case you get delayed, Wednesday night is wide open for me as well, so just let me know what works best. Also, will Marcus be joining us?

Looking forward to catching up!

Best,
Dev`);
            addNotification('Voice transcription parsed and structured into a friendly email draft.');
          }, 1000);
        }
      }, 35);
    }, 2500);
  };

  const resetVoiceAssistant = () => {
    setIsRecording(false);
    setRecordingStep(0);
    setTranscription('');
    setVoiceDraft('');
  };

  const handleSendVoiceDraft = () => {
    setRecordingStep(0);
    setTranscription('');
    setVoiceDraft('');
    addNotification('Voice drafted reply approved and dispatched via SMTP OAuth.');
  };

  return (
    <div className="p-8 space-y-8 select-none max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-cyber-border/40 pb-5">
        <div>
          <h2 className="text-xl font-bold font-sans tracking-wide text-white flex items-center gap-2">
            <Mic className="w-5 h-5 text-cyber-purple" />
            AI Voice Assistant & Daily Digest
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-1">
            Compose contextual emails hands-free with semantic transcription processing and generate comprehensive daily briefings.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* 1. Voice-to-Email Simulator */}
        <div className="glassmorphic p-6 rounded-2xl border border-cyber-border space-y-6">
          <div className="flex items-center justify-between border-b border-cyber-border/40 pb-3.5 select-none">
            <span className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
              <Volume2 className="w-4 h-4 text-cyber-purple animate-pulse-glow" />
              Voice-to-Email Assistant
            </span>
            <span className="px-2 py-0.5 rounded text-[8px] font-mono bg-cyber-purple/10 text-cyber-purple border border-cyber-purple/20">
              Whisper v3 Active
            </span>
          </div>

          <div className="flex flex-col items-center justify-center py-6 text-center space-y-6">
            {/* Visual Waveform */}
            <div className="flex items-end justify-center gap-1.5 h-16 w-full px-8">
              {waveHeight.map((h, i) => (
                <div 
                  key={i} 
                  style={{ height: `${h}px` }} 
                  className={`w-1.5 rounded-full transition-all duration-100 ${
                    isRecording 
                      ? 'bg-gradient-to-t from-cyber-purple to-cyber-blue shadow-lg shadow-cyber-purple/40' 
                      : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>

            {/* Mic Toggle Button */}
            {recordingStep === 0 && (
              <button
                onClick={startVoiceCapture}
                className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyber-purple to-indigo-600 border border-cyber-purple/40 flex items-center justify-center text-white hover:shadow-lg hover:shadow-cyber-purple/25 transition-all duration-300 hover:scale-105"
              >
                <Mic className="w-6 h-6 animate-float" />
              </button>
            )}

            {recordingStep === 1 && (
              <div className="flex flex-col items-center space-y-2">
                <button
                  onClick={resetVoiceAssistant}
                  className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 animate-pulse"
                >
                  <MicOff className="w-6 h-6" />
                </button>
                <span className="text-[10px] font-mono text-red-400 animate-pulse">RECORDING: SPEAK NOW...</span>
              </div>
            )}

            {recordingStep === 2 && (
              <div className="flex flex-col items-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-cyber-blue/10 border border-cyber-blue/30 flex items-center justify-center text-cyber-blue">
                  <Volume2 className="w-6 h-6 animate-spin" />
                </div>
                <span className="text-[10px] font-mono text-cyber-blue">TRANSCRIBING AUDIO VIA WHISPER...</span>
              </div>
            )}

            {recordingStep === 3 && (
              <button
                onClick={resetVoiceAssistant}
                className="px-4 py-2 rounded-xl bg-white/5 border border-cyber-border text-slate-300 text-xs hover:bg-white/10 transition-all duration-300"
              >
                Record New Voice Note
              </button>
            )}
          </div>

          {/* Transcription details */}
          {(transcription || recordingStep === 1) && (
            <div className="bg-black/35 p-4 rounded-xl border border-cyber-border/80 space-y-1.5 select-text">
              <span className="text-[9px] font-mono text-slate-500 uppercase">Live Transcription Output</span>
              <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium">
                {transcription || 'Listening to microphone array...'}
              </p>
            </div>
          )}

          {/* Generated Voice Draft */}
          {voiceDraft && (
            <div className="bg-black/45 p-4 rounded-xl border border-cyber-border space-y-3.5 animate-fadeIn select-text">
              <div className="flex justify-between items-center select-none">
                <span className="text-[9px] font-mono text-cyber-purple uppercase flex items-center gap-1 font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI-Generated Friendly Draft
                </span>
                <span className="text-[9px] text-slate-500 font-mono">Token Count: 68</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap font-sans select-all select-text">
                {voiceDraft}
              </p>
              <div className="flex justify-end gap-2 pt-2 select-none">
                <button
                  onClick={resetVoiceAssistant}
                  className="px-3.5 py-1.5 rounded-lg text-[10px] font-semibold bg-white/5 text-slate-400 border border-cyber-border hover:bg-white/10"
                >
                  Discard
                </button>
                <button
                  onClick={handleSendVoiceDraft}
                  className="px-4 py-1.5 rounded-lg text-[10px] font-bold bg-gradient-to-r from-cyber-purple to-indigo-600 text-white flex items-center gap-1 hover:shadow-md hover:shadow-cyber-purple/10"
                >
                  <Send className="w-3 h-3" />
                  Approve & Dispatch
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 2. Daily Inbox Digest briefing preview */}
        <div className="glassmorphic p-6 rounded-2xl border border-cyber-border space-y-5 select-text">
          <div className="flex items-center justify-between border-b border-cyber-border/40 pb-3.5 select-none">
            <span className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
              <MailCheck className="w-4 h-4 text-cyber-blue" />
              Daily Inbox Digest
            </span>
            <span className="px-2 py-0.5 rounded text-[8px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              08:00 AM Cron Synced
            </span>
          </div>

          <div className="border border-cyber-border rounded-xl bg-black/40 p-5 space-y-4">
            {/* Digest Header */}
            <div className="border-b border-cyber-border/40 pb-3">
              <div className="flex items-center justify-between text-[9px] font-mono text-slate-500">
                <span>DIGEST SOURCE: ANTIGRAVITY 2.0</span>
                <span>MAY 27, 2026</span>
              </div>
              <h3 className="text-sm font-bold text-white mt-1.5 font-sans">
                Good Morning Dev! Here is your AI Inbox Briefing.
              </h3>
              <p className="text-[10px] text-slate-400 font-sans mt-0.5">
                We've analyzed 28 incoming emails from the last 24 hours. Here are the 3 actions requiring your attention:
              </p>
            </div>

            {/* Digest Items */}
            <div className="space-y-3.5">
              {/* Item 1 */}
              <div className="flex items-start gap-3 bg-red-500/5 border border-red-500/10 p-3 rounded-lg">
                <span className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/25 flex items-center justify-center text-[9px] font-mono font-bold text-red-400 select-none">
                  !
                </span>
                <div>
                  <h4 className="text-xs font-bold text-white font-sans">Critical Incident Log (Sarah Connor)</h4>
                  <p className="text-[10px] text-slate-400 font-sans leading-relaxed mt-0.5">
                    Cloud compile storage backups failing. Audit threat Friday. AI generated response drafted & calendar invite booked for 2:00 PM.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-3 bg-cyber-blue/5 border border-cyber-blue/10 p-3 rounded-lg">
                <span className="w-5 h-5 rounded-full bg-cyber-blue/10 border border-cyber-blue/25 flex items-center justify-center text-[9px] font-mono font-bold text-cyber-blue select-none">
                  2
                </span>
                <div>
                  <h4 className="text-xs font-bold text-white font-sans">High Priority Lead (Marcus Wright)</h4>
                  <p className="text-[10px] text-slate-400 font-sans leading-relaxed mt-0.5">
                    Project Angel requests volume API pricing. Hubspot CRM lead created automatically, enterprise pricing sheets packaged for attachment.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-3 bg-black/40 border border-cyber-border p-3 rounded-lg">
                <span className="w-5 h-5 rounded-full bg-white/5 border border-cyber-border flex items-center justify-center text-[9px] font-mono font-bold text-slate-400 select-none">
                  3
                </span>
                <div>
                  <h4 className="text-xs font-bold text-white font-sans">Resistance HQ catch-up (John Connor)</h4>
                  <p className="text-[10px] text-slate-400 font-sans leading-relaxed mt-0.5">
                    Dinner meeting proposed Tuesday 7:00 PM. Auto-schedule slot hold generated in calendar.
                  </p>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="flex items-center justify-between border-t border-cyber-border/40 pt-3 text-[9px] font-mono text-slate-500 select-none">
              <span>Security Blocked: 12 Spam / 2 Phish</span>
              <span>Time saved: 1.4 Hours</span>
            </div>
          </div>

          <div className="flex justify-end select-none">
            <button
              onClick={() => addNotification('Daily Briefing dispatch trigger issued to connected Slack channel #ops-daily.')}
              className="px-4 py-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold text-xs flex items-center gap-1.5 hover:bg-cyan-500/25 transition-all duration-300"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              Sync Digest to Mobile/Slack
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
