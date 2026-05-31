"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HeartPulse, Mail, Phone, MapPin, ShieldCheck, Globe, Star } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-8 px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* About & Branding */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0284c7] to-[#10b981] flex items-center justify-center">
              <HeartPulse className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Devroshan Clinic
              </h2>
              <p className="text-[10px] tracking-wider text-emerald-400 uppercase font-semibold">
                Future of Smart Healthcare
              </p>
            </div>
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed mt-2">
            Pioneering the next generation of interconnected digital therapeutics, high-accuracy AI diagnostics, robotic surgery systems, and trust-first clinical networks.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-semibold text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>HIPAA Compliant Vault</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-semibold text-white">
              <Star className="w-4 h-4 text-amber-400" />
              <span>NABH & JCI Accredited</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold mb-5 tracking-wide text-sm uppercase">Smart Portals</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/hospitals" className="hover:text-emerald-400 transition-colors">Hospital Locator & Beds</Link>
            </li>
            <li>
              <Link href="/doctors" className="hover:text-emerald-400 transition-colors">Find a Medical Specialist</Link>
            </li>
            <li>
              <Link href="/booking" className="hover:text-emerald-400 transition-colors">Book OPD Consultations</Link>
            </li>
            <li>
              <Link href="/teleconsultation" className="hover:text-emerald-400 transition-colors">AI Teleconsultation Hub</Link>
            </li>
            <li>
              <Link href="/report-analyzer" className="hover:text-emerald-400 transition-colors">AI Medical Report Analyzer</Link>
            </li>
            <li>
              <Link href="/emergency" className="hover:text-emerald-400 transition-colors">Emergency Ambulance Tracker</Link>
            </li>
          </ul>
        </div>

        {/* Contact Coordinates */}
        <div>
          <h3 className="text-white font-bold mb-5 tracking-wide text-sm uppercase">Contact Coordinates</h3>
          <ul className="space-y-4 text-sm text-slate-400">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Devroshan Central Smart Hub, Bandra Kurla Complex, Smart Health Avenue, Mumbai, India
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
              <a href="tel:+919142177466" className="hover:text-emerald-400 transition-colors">+91 91421 77466</a>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-5 h-5 text-emerald-400 shrink-0 font-bold flex items-center justify-center">💬</span>
              <a href="https://wa.me/919142177466" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">WhatsApp: +91 91421 77466</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-emerald-400 shrink-0" />
              <a href="mailto:support@devroshan.clinic" className="hover:text-emerald-400 transition-colors">support@devroshan.clinic</a>
            </li>
          </ul>
        </div>

        {/* Health Newsletter */}
        <div>
          <h3 className="text-white font-bold mb-5 tracking-wide text-sm uppercase">Gen AI Newsletter</h3>
          <p className="text-sm text-slate-400 leading-relaxed mb-4">
            Receive personalized AI health reports, health trends, and clinical alerts curated specifically for your profile.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter patient email"
                className="w-full bg-slate-800 text-white border border-slate-700 px-3 py-2 rounded-xl text-sm focus:outline-none focus:border-emerald-400"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-[#0284c7] to-[#10b981] text-white px-4 py-2 rounded-xl text-xs font-bold hover:shadow-lg transition-all cursor-pointer"
              >
                Subscribe
              </button>
            </div>
            {subscribed && (
              <span className="text-xs text-emerald-400 font-semibold animate-pulse">
                ✓ Enrolled in Devroshan AI wellness alerts!
              </span>
            )}
          </form>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <div>
          <p>© {new Date().getFullYear()} Devroshan Healthcare Group. All Rights Reserved. HIPAA & GDPR Certified.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/" className="hover:underline">Privacy Policy</Link>
          <Link href="/" className="hover:underline">Terms of Service</Link>
          <Link href="/" className="hover:underline">Biometric Disclosure</Link>
          <Link href="/" className="hover:underline">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}
