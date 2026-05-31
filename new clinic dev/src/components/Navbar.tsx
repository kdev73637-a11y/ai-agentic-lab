"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClinic } from "@/context/ClinicContext";
import { 
  HeartPulse, 
  Activity, 
  User, 
  ShieldAlert, 
  Menu, 
  X, 
  Globe, 
  Flame, 
  Sliders, 
  ChevronDown, 
  Radio
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme, role, setRole, ambulanceSos, selectedLanguage, setSelectedLanguage } = useClinic();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hospitals", path: "/hospitals" },
    { name: "Doctors", path: "/doctors" },
    { name: "Specialities", path: "/specialities" },
    { name: "Teleconsultation", path: "/teleconsultation" },
    { name: "Packages", path: "/health-packages" },
    { name: "Report Analyzer", path: "/report-analyzer" },
    { name: "Emergency SOS", path: "/emergency" },
    { name: "Services", path: "/services" }
  ];

  const languages = ["English", "Español", "Deutsch", "العربية", "हिन्दी"];

  const handleRoleToggle = () => {
    setRole(role === "patient" ? "admin" : "patient");
  };

  return (
    <header className="w-full z-50 transition-all duration-300">
      {/* Top Banner Bar */}
      <div className="w-full bg-[#0284c7]/95 dark:bg-[#0b1329]/90 text-white text-xs py-2 px-4 border-b border-white/5 flex flex-wrap justify-between items-center z-50">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 font-medium">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            Live Bed Counter: <strong className="text-emerald-400">402 Available</strong>
          </span>
          <span className="hidden md:inline text-white/70">|</span>
          <span className="hidden md:inline font-semibold">
            Emergency Hotline: <a href="tel:108" className="hover:underline text-emerald-400">108 (24x7 Support)</a>
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative">
            <button 
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1 hover:text-emerald-400 transition-colors py-0.5 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{selectedLanguage}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {langDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-32 glass-panel bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl py-1 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setLangDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-[#0284c7]/10 hover:text-[#0284c7] transition-all cursor-pointer"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="hover:text-emerald-400 transition-colors cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="w-full sticky top-0 glass-panel border-b border-slate-200/50 dark:border-slate-800/40 bg-white/70 dark:bg-[#030712]/75 py-3 px-6 flex justify-between items-center transition-all">
        {/* Clinic Branding */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0284c7] to-[#10b981] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
            <HeartPulse className="w-6 h-6 text-white animate-heartbeat" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-[#0284c7] to-[#10b981] dark:from-[#38bdf8] dark:to-[#34d399] bg-clip-text text-transparent">
              Devroshan Clinic
            </h1>
            <p className="text-[9px] tracking-widest uppercase font-semibold text-slate-500 dark:text-slate-400">
              Future of Smart Healthcare
            </p>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            const isSOS = link.name === "Emergency SOS";
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`text-sm font-medium relative py-1 transition-colors hover:text-[#0284c7] dark:hover:text-[#38bdf8] ${
                  isActive 
                    ? "text-[#0284c7] dark:text-[#38bdf8]" 
                    : isSOS && ambulanceSos.active
                      ? "text-red-500 font-bold flex items-center gap-1 animate-pulse"
                      : "text-slate-600 dark:text-slate-300"
                }`}
              >
                {isSOS && ambulanceSos.active && <ShieldAlert className="w-3.5 h-3.5 text-red-500" />}
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#0284c7] to-[#10b981] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Portal Switching & Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Active Mode indicator / Switcher */}
          <button 
            onClick={handleRoleToggle}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border border-[#0284c7]/30 bg-[#0284c7]/5 hover:bg-[#0284c7]/10 text-[#0284c7] dark:text-[#38bdf8] cursor-pointer transition-all"
            title="Switch Dashboard Perspective"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Mode: {role === "patient" ? "Patient" : "Hospital Admin"}</span>
          </button>

          {/* User Dashboard routing */}
          <Link
            href={role === "patient" ? "/dashboard/patient" : "/dashboard/admin"}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#0284c7] to-[#10b981] rounded-xl hover:shadow-[#0284c7]/25 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            <User className="w-4 h-4" />
            <span>{role === "patient" ? "Patient Portal" : "Admin Panel"}</span>
          </Link>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="flex lg:hidden items-center gap-3">
          <button 
            onClick={handleRoleToggle}
            className="px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 cursor-pointer"
          >
            {role === "patient" ? "Patient" : "Admin"}
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer"
            aria-label="Open Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute left-0 w-full glass-panel bg-white/95 dark:bg-[#030712]/95 border-b border-slate-300 dark:border-slate-800 py-6 px-6 z-40 transition-all duration-300 shadow-2xl">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-semibold py-2 border-b border-slate-200/50 dark:border-slate-800/40 hover:text-[#0284c7] dark:hover:text-[#38bdf8] flex items-center justify-between ${
                  pathname === link.path ? "text-[#0284c7] dark:text-[#38bdf8]" : "text-slate-700 dark:text-slate-200"
                }`}
              >
                <span>{link.name}</span>
                {link.name === "Emergency SOS" && ambulanceSos.active && (
                  <span className="px-2 py-0.5 text-[10px] font-bold text-white bg-red-500 rounded-full animate-pulse">
                    Active Dispatch
                  </span>
                )}
              </Link>
            ))}

            <div className="flex flex-col gap-3 mt-4">
              <Link
                href={role === "patient" ? "/dashboard/patient" : "/dashboard/admin"}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 text-center text-sm font-bold text-white bg-gradient-to-r from-[#0284c7] to-[#10b981] rounded-xl"
              >
                Go to {role === "patient" ? "Patient Dashboard" : "Admin Dashboard"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
