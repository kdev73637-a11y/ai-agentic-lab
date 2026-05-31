"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useClinic } from "@/context/ClinicContext";
import { 
  Search, 
  Sparkles, 
  MapPin, 
  Clock, 
  Star, 
  Award, 
  Calendar, 
  Filter,
  CheckCircle,
  Video
} from "lucide-react";

function DoctorsPageInner() {
  const searchParams = useSearchParams();
  const searchParamQuery = searchParams.get("search") || "";
  const paramDept = searchParams.get("dept") || "";
  
  const { doctors } = useClinic();
  const [searchQuery, setSearchQuery] = useState(searchParamQuery);
  const [selectedSpeciality, setSelectedSpeciality] = useState<string>("All");
  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [minExperience, setMinExperience] = useState<number>(0);

  // Synchronize search params from search box on home page
  useEffect(() => {
    if (searchParamQuery) {
      setSearchQuery(searchParamQuery);
    }
    if (paramDept) {
      setSelectedSpeciality(paramDept.charAt(0).toUpperCase() + paramDept.slice(1));
    }
  }, [searchParamQuery, paramDept]);

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.speciality.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.bio.toLowerCase().includes(searchQuery.toLowerCase());
                          
    const matchesSpeciality = selectedSpeciality === "All" || 
                              doc.speciality.toLowerCase() === selectedSpeciality.toLowerCase();
                              
    const matchesCity = selectedCity === "All" || doc.city === selectedCity;
    const matchesExperience = doc.experience >= minExperience;

    return matchesSearch && matchesSpeciality && matchesCity && matchesExperience;
  });

  // Unique list of specialities for selector tabs
  const specialitiesList = ["All", "Cardiology", "Neurology", "Oncology", "Robotic Surgery", "Genomic Medicine"];

  return (
    <div className="w-full bg-mesh min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#0284c7]">Clinical Staff</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-white mt-2">
              Find a Medical Specialist
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Connect with leading consultants, clinical pioneers, and robotic surgeons backed by highly precise diagnostic recommendations.
            </p>
          </div>
          
          {/* Quick Stats banner */}
          <div className="p-3.5 glass-panel rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#0284c7]/5 flex items-center gap-3 shrink-0">
            <Sparkles className="w-5 h-5 text-emerald-400 animate-bounce" />
            <div>
              <span className="text-[10px] text-slate-405 uppercase font-semibold">Diagnostic Matchmaking</span>
              <p className="text-xs font-bold text-slate-800 dark:text-white mt-0.5">AI Recommendation Score Active</p>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 p-6 mb-10 flex flex-col gap-6">
          
          {/* Search Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <Search className="w-5 h-5 text-slate-450 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by physician name, diagnostic specialty, credentials..."
                className="w-full bg-transparent text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
              />
            </div>

            {/* City Filter */}
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-350 focus:outline-none"
            >
              <option value="All">All Regions</option>
              <option value="Mumbai">Mumbai Sector</option>
              <option value="Delhi">Delhi Sector</option>
              <option value="Bangalore">Bangalore Sector</option>
            </select>
          </div>

          {/* Specialty Selector Row */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-emerald-400" />
              Filter by Department Specialty
            </span>
            <div className="flex flex-wrap gap-2">
              {specialitiesList.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpeciality(spec)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedSpeciality === spec
                      ? "bg-[#0284c7] text-white shadow-lg"
                      : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-350 border border-slate-200 dark:border-slate-800 hover:border-slate-300"
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Specialists Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredDoctors.map((doc) => {
            
            // Calculate a beautiful custom matching score
            let matchScore = 95;
            if (searchQuery) matchScore += 3;
            if (selectedSpeciality !== "All") matchScore += 1;
            matchScore = Math.min(99, matchScore);

            return (
              <div 
                key={doc.id}
                className="p-6 glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/10 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  
                  {/* Doctor Bio & Image header */}
                  <div className="flex gap-4 items-start pb-5 border-b border-slate-100 dark:border-slate-800/80">
                    
                    {/* Image */}
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 relative bg-slate-100 border border-slate-200/50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={doc.image} 
                        alt={doc.name} 
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 right-1 p-0.5 rounded bg-emerald-500 text-white block" title="Teleconsultation Available">
                        <Video className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    {/* Bio metadata */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2 py-0.5 rounded-lg bg-[#0284c7]/5 text-[9px] text-[#0284c7] dark:text-[#38bdf8] font-extrabold uppercase">
                          {doc.speciality}
                        </span>
                        <span className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded-lg text-[9px] font-bold">
                          <Sparkles className="w-3 h-3 text-emerald-400" />
                          <span>{matchScore}% Match Score</span>
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-1">{doc.name}</h3>
                      <p className="text-xs text-slate-450 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-red-400" />
                        {doc.hospital}
                      </p>
                    </div>

                  </div>

                  {/* Experience & Ratings row */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-b border-slate-100 dark:border-slate-800/80 text-xs">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-slate-450 dark:text-slate-400">Clinical Experience</span>
                      <strong className="text-slate-800 dark:text-slate-200">{doc.experience} Years active</strong>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-slate-450 dark:text-slate-400">Patient Feedbacks</span>
                      <strong className="text-slate-800 dark:text-slate-200 flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                        {doc.rating} ({doc.reviewsCount} reviews)
                      </strong>
                    </div>
                  </div>

                  {/* Achievements and bio */}
                  <div className="py-4 space-y-3">
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
                      “{doc.bio}”
                    </p>
                    
                    {/* Credentials tags */}
                    <div className="space-y-1.5">
                      <h4 className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-[#0284c7]" />
                        Professional Distinctions:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {doc.achievements.map((ach, idx) => (
                          <span 
                            key={idx}
                            className="px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 text-[9px] text-slate-500 dark:text-slate-450 font-semibold"
                          >
                            ✓ {ach}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Available Slots CTAs */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/85 mt-2">
                  <span className="text-[9px] text-slate-400 uppercase font-extrabold tracking-wider block mb-2">
                    Next Available Appointments Today:
                  </span>
                  
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {doc.availability.map((time, idx) => (
                      <Link
                        key={idx}
                        href={`/booking?doctor=${doc.id}&time=${encodeURIComponent(time)}`}
                        className="px-2.5 py-1 text-[10px] rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-emerald-500 font-bold hover:bg-emerald-500/10 hover:border-emerald-500/20 transition-all cursor-pointer"
                      >
                        {time}
                      </Link>
                    ))}
                  </div>

                  <Link
                    href={`/booking?doctor=${doc.id}`}
                    className="w-full block text-center py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#0284c7] to-[#10b981] rounded-xl hover:shadow-lg transition-all"
                  >
                    Select & Secure consultation
                  </Link>
                </div>

              </div>
            );
          })}

          {filteredDoctors.length === 0 && (
            <div className="col-span-2 p-12 text-center border border-slate-200 dark:border-slate-800 rounded-3xl glass-panel bg-white/40">
              <p className="text-slate-500 dark:text-slate-450">No medical consultants found matching those selected criteria.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default function DoctorsPage() {
  return (
    <Suspense fallback={<div className="w-full bg-mesh min-h-screen py-16 px-6 flex items-center justify-center text-xs font-bold text-slate-500 uppercase tracking-widest">Searching Clinic specialists...</div>}>
      <DoctorsPageInner />
    </Suspense>
  );
}
