'use client';
import { useState } from 'react';
import { MessageCircle, X, Send, Bot, Minimize2 } from 'lucide-react';

const messages = [
  { from: 'bot', text: 'Hi! I\'m DevAIO assistant. How can I help you today?' },
  { from: 'bot', text: 'I can help you: \n• Book a demo\n• Answer product questions\n• Show pricing plans\n• Connect you with sales' },
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [chats, setChats] = useState(messages);

  const sendMessage = () => {
    if (!input.trim()) return;
    setChats((prev) => [
      ...prev,
      { from: 'user', text: input },
      { from: 'bot', text: 'Thanks for reaching out! Our team will get back to you shortly. Or would you like to book a demo right now?' },
    ]);
    setInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {open && (
        <div className="mb-4 w-80 glass-strong rounded-2xl overflow-hidden shadow-2xl border border-indigo-500/20 animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">DevAIO Assistant</p>
                <div className="flex items-center gap-1">
                  <div className="status-dot scale-75" />
                  <span className="text-white/70 text-xs">Online</span>
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-3" style={{ background: 'rgba(5,8,22,0.95)' }}>
            {chats.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.from === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed whitespace-pre-line ${
                    msg.from === 'user'
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                      : 'glass text-slate-200'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          <div className="px-3 pb-2" style={{ background: 'rgba(5,8,22,0.95)' }}>
            <div className="flex gap-1.5 flex-wrap">
              {['Book Demo', 'See Pricing', 'Talk to Sales'].map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setChats((prev) => [
                      ...prev,
                      { from: 'user', text: q },
                      { from: 'bot', text: q === 'Book Demo' ? 'Great! You can book a demo at calendly.com/devaio. Our team will show you a live personalized demo within 24 hours!' : q === 'See Pricing' ? 'Our plans start at just $49/month. Scroll up to see the full pricing section, or I can explain the differences!' : 'Connecting you with our sales team now. You can also email us at sales@devaio.com or call +1 (800) DEVAIO-1' },
                    ]);
                  }}
                  className="text-xs glass px-2.5 py-1 rounded-full text-slate-300 hover:text-white hover:border-indigo-500/50 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-3 border-t border-white/5" style={{ background: 'rgba(5,8,22,0.95)' }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 bg-transparent text-slate-200 text-xs outline-none placeholder:text-slate-600"
            />
            <button
              onClick={sendMessage}
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Send className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 glow-purple animate-pulse-glow"
      >
        {open ? (
          <Minimize2 className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
        {!open && (
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
            1
          </div>
        )}
      </button>
    </div>
  );
}
