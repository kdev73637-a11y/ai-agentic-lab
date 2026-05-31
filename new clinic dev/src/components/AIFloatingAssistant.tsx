"use client";

import React, { useState, useEffect, useRef } from "react";
import { useClinic } from "@/context/ClinicContext";
import { 
  Bot, 
  MessageSquare, 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Sparkles, 
  Activity, 
  Stethoscope,
  Volume2
} from "lucide-react";

export default function AIFloatingAssistant() {
  const { chatMessages, sendChatMessage } = useClinic();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isOpen]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputMessage.trim() === "") return;
    sendChatMessage(inputMessage);
    setInputMessage("");
  };

  // Voice Interaction Simulation
  const toggleVoiceMode = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      setInputMessage("Listening for voice symptoms...");
      
      // Simulate hearing voice symptoms after 3 seconds
      setTimeout(() => {
        setIsListening(false);
        const randomSymptoms = [
          "I have sharp chest pains spreading to my arm",
          "Can you suggest a top brain specialist near Delhi?",
          "I'm feeling fatigued with a fasting sugar of 145",
          "How can I book an appointment with Dr. Roshan Dev?"
        ];
        const randomChoice = randomSymptoms[Math.floor(Math.random() * randomSymptoms.length)];
        setInputMessage(randomChoice);
      }, 2500);
    }
  };

  const speakLastMessage = (text: string) => {
    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }
    
    setIsSpeaking(true);
    // Simulate reading aloud with synthesis voice
    setTimeout(() => {
      setIsSpeaking(false);
    }, 4000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Expanded AI Panel */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[500px] mb-4 glass-panel bg-white/95 dark:bg-slate-950/95 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 transform scale-100 origin-bottom-right animate-float">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#0284c7] to-[#10b981] text-white flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-emerald-500 animate-ping" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">Devika AI</h3>
                <p className="text-[10px] text-white/80">Smart Medical Companion</p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/10 transition-colors text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50 dark:bg-slate-900/30">
            {chatMessages.map((msg, idx) => {
              const isAI = msg.sender === "ai";
              return (
                <div 
                  key={idx} 
                  className={`flex items-start gap-2.5 ${!isAI ? "flex-row-reverse" : ""}`}
                >
                  {isAI ? (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#0284c7] to-[#10b981] flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0 text-slate-600 dark:text-slate-300 font-bold text-xs uppercase">
                      P
                    </div>
                  )}

                  <div className="flex flex-col gap-1 max-w-[75%]">
                    <div className={`p-3 rounded-2xl text-xs leading-relaxed relative ${
                      isAI 
                        ? "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none shadow-sm"
                        : "bg-[#0284c7] text-white rounded-tr-none shadow-sm shadow-[#0284c7]/20"
                    }`}>
                      {msg.text}
                      
                      {isAI && (
                        <button
                          onClick={() => speakLastMessage(msg.text)}
                          className={`absolute -bottom-2 -right-2 p-1 rounded-full border bg-white dark:bg-slate-800 cursor-pointer shadow-sm hover:scale-105 transition-transform ${
                            isSpeaking ? "text-emerald-500 border-emerald-200" : "text-slate-400 border-slate-200 dark:border-slate-700"
                          }`}
                          title="Speak Text"
                        >
                          <Volume2 className={`w-3 h-3 ${isSpeaking ? "animate-bounce" : ""}`} />
                        </button>
                      )}
                    </div>
                    <span className={`text-[9px] text-slate-400 px-1 ${!isAI ? "text-right" : ""}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Triage Helpers */}
          <div className="px-4 py-2 border-t border-slate-200/50 dark:border-slate-800/40 bg-white/40 dark:bg-slate-950/40 flex gap-2 overflow-x-auto whitespace-nowrap">
            <button
              onClick={() => setInputMessage("Check my cardiovascular symptoms")}
              className="px-2.5 py-1 text-[10px] font-semibold rounded-full border border-slate-200 dark:border-slate-800 hover:border-[#0284c7] hover:text-[#0284c7] dark:hover:text-[#38bdf8] transition-colors cursor-pointer bg-white dark:bg-slate-900"
            >
              ❤️ Cardiovascular Check
            </button>
            <button
              onClick={() => setInputMessage("Analyze sugar & diabetic vitals")}
              className="px-2.5 py-1 text-[10px] font-semibold rounded-full border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors cursor-pointer bg-white dark:bg-slate-900"
            >
              🩺 Sugar Panel
            </button>
            <button
              onClick={() => setInputMessage("Suggest doctor for persistent migraines")}
              className="px-2.5 py-1 text-[10px] font-semibold rounded-full border border-slate-200 dark:border-slate-800 hover:border-[#0284c7] hover:text-[#0284c7] dark:hover:text-[#38bdf8] transition-colors cursor-pointer bg-white dark:bg-slate-900"
            >
              🧠 Brain Specialist
            </button>
          </div>

          {/* Input Panel */}
          <form 
            onSubmit={handleSendMessage}
            className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex gap-2"
          >
            <button
              type="button"
              onClick={toggleVoiceMode}
              className={`p-2.5 rounded-xl border flex items-center justify-center cursor-pointer transition-colors ${
                isListening 
                  ? "bg-red-500 border-red-400 text-white animate-pulse" 
                  : "bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:text-[#0284c7]"
              }`}
              title="Voice Triage Input"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
            
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask Devika (e.g. Chest pain symptoms)"
              className="flex-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#0284c7]"
            />
            
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-gradient-to-r from-[#0284c7] to-[#10b981] hover:shadow-lg text-white flex items-center justify-center cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

      {/* Persistent Animated Floating Bubble Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#0284c7] to-[#10b981] flex items-center justify-center text-white shadow-xl hover:shadow-[#0284c7]/40 hover:scale-105 active:scale-95 transition-all cursor-pointer relative group border-2 border-white dark:border-slate-950"
        title="Open AI Receptionist"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white dark:border-slate-950 animate-pulse flex items-center justify-center text-[9px] text-white font-bold font-sans">
          ●
        </span>
        
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative w-7 h-7 flex items-center justify-center">
            <Bot className="w-7 h-7 absolute animate-pulse opacity-50" />
            <Sparkles className="w-6 h-6 z-10 animate-bounce" />
          </div>
        )}
      </button>

    </div>
  );
}
