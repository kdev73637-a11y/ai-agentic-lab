"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useClinic } from "@/context/ClinicContext";
import { 
  Building, 
  MapPin, 
  Clock, 
  Activity, 
  Search, 
  ShieldCheck, 
  ChevronRight, 
  CheckCircle,
  AlertTriangle,
  Flame,
  Radio
} from "lucide-react";

export default function HospitalsPage() {
  const { hospitals, triggerSOS } = useClinic();
  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHospitals = hospitals.filter((h) => {
    const matchesCity = selectedCity === "All" || h.city === selectedCity;
    const matchesSearch = h.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          h.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  return (
    <div className="w-full bg-mesh min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#0284c7]">Clinical Infrastructure</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-white mt-2">
              Smart Hospital Locator
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Monitor active bed reserves, ICU vacancies, live emergency queues, and localized robotic tech capabilities across our premium clinical network.
            </p>
          </div>

          {/* Quick Actions / Filters */}
          <div className="flex flex-wrap gap-2.5">
            {["All", "Mumbai", "Delhi", "Bangalore"].map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCity === city
                    ? "bg-[#0284c7] text-white shadow-lg shadow-[#0284c7]/25"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-350 border border-slate-200 dark:border-slate-800 hover:border-slate-300"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Statistics Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 glass-panel rounded-2xl bg-white/40 dark:bg-slate-950/40 p-2.5 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <Search className="w-5 h-5 text-slate-400 shrink-0 ml-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by hospital name or sector..."
              className="w-full bg-transparent text-sm text-slate-800 dark:text-slate-250 focus:outline-none"
            />
          </div>

          {/* Aggregate bed metric */}
          <div className="p-4 glass-panel rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#0284c7]/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <Radio className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Net Vacancy</span>
                <p className="text-sm font-bold text-slate-800 dark:text-white mt-0.5">402 Available Beds</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[8px] font-extrabold bg-emerald-500/15 text-emerald-500 uppercase">
              Normal Load
            </span>
          </div>
        </div>

        {/* Main Grid View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Map Simulation column */}
          <div className="lg:col-span-4 glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 p-5 sticky top-24 min-h-[460px] flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-2">
                Unified Sector Radar
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-450 leading-relaxed mb-4">
                Active telemetry tracks coordinating dispatches, nearby JCI hospitals, and global patient check-in queues.
              </p>
              
              {/* Vector Grid Map Simulation */}
              <div className="w-full aspect-square rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden flex items-center justify-center">
                
                {/* Radar Grid Lines */}
                <div className="absolute inset-0 grid-overlay opacity-20" />
                <div className="absolute w-48 h-48 rounded-full border border-slate-800 animate-pulse" />
                <div className="absolute w-72 h-72 rounded-full border border-slate-800/50" />
                <div className="absolute w-24 h-24 rounded-full border border-slate-800/80" />

                {/* Glowing pins mapping selected locations */}
                <div className="absolute top-[40%] left-[30%] text-center group cursor-pointer">
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#0284c7] rounded-full border-2 border-white animate-ping" />
                  <span className="w-3.5 h-3.5 bg-[#0284c7] rounded-full border border-white block" />
                  <span className="absolute left-1/2 -translate-x-1/2 mt-1 px-1.5 py-0.5 rounded text-[7px] font-bold text-white bg-slate-950/90 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    Mumbai Smart Hub
                  </span>
                </div>

                <div className="absolute top-[25%] left-[65%] text-center group cursor-pointer">
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#10b981] rounded-full border-2 border-white animate-ping" />
                  <span className="w-3.5 h-3.5 bg-[#10b981] rounded-full border border-white block" />
                  <span className="absolute left-1/2 -translate-x-1/2 mt-1 px-1.5 py-0.5 rounded text-[7px] font-bold text-white bg-slate-950/90 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    Delhi Neuro Hub
                  </span>
                </div>

                <div className="absolute top-[70%] left-[55%] text-center group cursor-pointer">
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-500 rounded-full border-2 border-white animate-ping" />
                  <span className="w-3.5 h-3.5 bg-amber-500 rounded-full border border-white block" />
                  <span className="absolute left-1/2 -translate-x-1/2 mt-1 px-1.5 py-0.5 rounded text-[7px] font-bold text-white bg-slate-950/90 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    Bangalore Genomic Hub
                  </span>
                </div>

                {/* Patient location pin */}
                <div className="absolute top-[52%] left-[48%]">
                  <div className="relative">
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-ping" />
                    <MapPin className="w-5 h-5 text-red-500" />
                  </div>
                  <span className="absolute left-1/2 -translate-x-1/2 mt-1 px-1.5 py-0.5 rounded text-[7px] font-bold text-white bg-red-600/90 whitespace-nowrap">
                    YOUR POSITION
                  </span>
                </div>

              </div>
            </div>

            {/* GPS Telemetry coordinates footer */}
            <div className="mt-4 border-t border-slate-100 dark:border-slate-800 pt-3 text-[10px] text-slate-500 flex justify-between">
              <span>LAT: 19.0760° N</span>
              <span>LNG: 72.8777° E</span>
              <span>GPS SYNC ACTIVE</span>
            </div>

          </div>

          {/* Hospital Cards Column */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {filteredHospitals.map((hosp) => {
              const bedOccupancyPercent = Math.round(((hosp.totalBeds - hosp.bedsAvailable) / hosp.totalBeds) * 100);
              const icuOccupancyPercent = Math.round(((hosp.totalIcu - hosp.icuAvailable) / hosp.totalIcu) * 100);

              return (
                <div 
                  key={hosp.id}
                  className="p-6 glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/10 hover:shadow-xl transition-all"
                >
                  {/* Top line with status info */}
                  <div className="flex flex-wrap justify-between items-start gap-4 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                    <div>
                      <div className="flex items-center gap-2">
                        <Building className="w-5 h-5 text-[#0284c7] dark:text-[#38bdf8]" />
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white">{hosp.name}</h2>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-450 dark:text-slate-400 mt-1">
                        <MapPin className="w-4 h-4 text-emerald-500" />
                        <span>{hosp.address}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/5 text-emerald-500 border border-emerald-500/10 text-xs font-bold">
                        <Clock className="w-3.5 h-3.5 animate-pulse" />
                        <span>Wait Time: {hosp.emergencyWaitMinutes} mins</span>
                      </div>
                    </div>
                  </div>

                  {/* Accreditations badges */}
                  <div className="flex flex-wrap gap-2 py-4">
                    {hosp.accreditations.map((badge, idx) => (
                      <span 
                        key={idx}
                        className="px-2.5 py-0.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-[10px] text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Occupancy metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                    
                    {/* General Beds reserves */}
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-slate-600 dark:text-slate-350">General Bed Vacancy</span>
                        <span className="text-slate-800 dark:text-white">{hosp.bedsAvailable} / {hosp.totalBeds} Available</span>
                      </div>
                      
                      {/* Bed availability status bar */}
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#0284c7] to-[#10b981] rounded-full transition-all duration-500" 
                          style={{ width: `${100 - bedOccupancyPercent}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-450 dark:text-slate-400">
                        {bedOccupancyPercent}% of aggregate capacity currently occupied.
                      </span>
                    </div>

                    {/* Critical ICU Capacity */}
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-slate-600 dark:text-slate-350">Critical ICU Reserves</span>
                        <span className="text-slate-800 dark:text-white">{hosp.icuAvailable} / {hosp.totalIcu} Available</span>
                      </div>
                      
                      {/* ICU availability status bar */}
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            icuOccupancyPercent > 80 
                              ? "bg-red-500" 
                              : "bg-gradient-to-r from-[#0284c7] to-[#10b981]"
                          }`} 
                          style={{ width: `${100 - icuOccupancyPercent}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-450 dark:text-slate-400 flex items-center gap-1">
                        {icuOccupancyPercent}% occupied. 
                        {hosp.icuAvailable <= 12 && (
                          <span className="text-amber-500 font-bold animate-pulse flex items-center gap-0.5">
                            <AlertTriangle className="w-3 h-3" /> Critical Load
                          </span>
                        )}
                      </span>
                    </div>

                  </div>

                  {/* Core Tech stack listed */}
                  <div className="py-4 border-t border-slate-100 dark:border-slate-800/80">
                    <h4 className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider mb-2">
                      Smart Diagnostics Operating in Unit:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {hosp.technologies.map((tech, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-0.5 rounded bg-[#0284c7]/5 text-[9px] text-[#0284c7] dark:text-[#38bdf8] font-bold border border-[#0284c7]/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Direct Operations actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/85 mt-2">
                    <Link
                      href={`/booking?hospital=${hosp.id}`}
                      className="flex-1 text-center py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#0284c7] to-[#10b981] rounded-xl hover:shadow-lg transition-all"
                    >
                      Book OPD Consultation
                    </Link>
                    
                    <button
                      onClick={() => {
                        triggerSOS(hosp.id);
                        alert(`✓ Dispatched Devroshan smart ambulance from ${hosp.name}! Head over to the Emergency SOS tracker to view live mapping.`);
                      }}
                      className="flex-1 text-center py-2.5 text-xs font-bold text-red-500 bg-red-500/5 border border-red-500/20 rounded-xl hover:bg-red-500/10 transition-colors cursor-pointer"
                    >
                      Dispatch SOS Ambulance
                    </button>
                  </div>

                </div>
              );
            })}

            {filteredHospitals.length === 0 && (
              <div className="p-12 text-center border border-slate-200 dark:border-slate-800 rounded-3xl glass-panel bg-white/40">
                <p className="text-slate-500 dark:text-slate-400">No medical hubs found matching those specific filters.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
