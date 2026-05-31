"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useClinic, Appointment } from "@/context/ClinicContext";
import confetti from "canvas-confetti";
import { 
  Calendar, 
  MapPin, 
  User, 
  Building, 
  Clock, 
  ShieldCheck, 
  Key, 
  CreditCard,
  QrCode,
  CheckCircle,
  FileText,
  Video,
  ChevronRight,
  ChevronLeft,
  Star
} from "lucide-react";

function BookingPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const paramDoctorId = searchParams.get("doctor") || "";
  const paramHospitalId = searchParams.get("hospital") || "";
  const paramTime = searchParams.get("time") || "";

  const { doctors, hospitals, bookAppointment } = useClinic();
  
  // Steps: 1. Hospital & Type, 2. Doctor, 3. Date & Time, 4. Patient info & OTP, 5. QR Receipt
  const [step, setStep] = useState(1);
  
  // Form State
  const [selectedHospital, setSelectedHospital] = useState(paramHospitalId);
  const [consultationType, setConsultationType] = useState<"OPD" | "Teleconsultation">("OPD");
  const [selectedDept, setSelectedDept] = useState("Cardiology");
  const [selectedDoctor, setSelectedDoctor] = useState(paramDoctorId);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState(paramTime);
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [otpCode, setOtpCode] = useState("");
  
  // Verification states
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [createdApt, setCreatedApt] = useState<Appointment | null>(null);

  // Sync parameters from find doctors page
  useEffect(() => {
    if (paramDoctorId) {
      const matchDoc = doctors.find(d => d.id === paramDoctorId);
      if (matchDoc) {
        setSelectedDoctor(paramDoctorId);
        setSelectedDept(matchDoc.speciality);
        // Find matching hospital
        const matchHosp = hospitals.find(h => hospNameIncludes(h.name, matchDoc.hospital));
        if (matchHosp) setSelectedHospital(matchHosp.id);
      }
      setStep(3); // skip to slot selection directly
    } else if (paramHospitalId) {
      setSelectedHospital(paramHospitalId);
      setStep(1);
    }
  }, [paramDoctorId, paramHospitalId]);

  const hospNameIncludes = (h1: string, h2: string) => {
    return h1.toLowerCase().includes(h2.split(",")[0].toLowerCase());
  };

  const getHospitalName = () => {
    const hosp = hospitals.find(h => h.id === selectedHospital);
    return hosp ? hosp.name : "Devroshan Smart Hub";
  };

  const getDoctorName = () => {
    const doc = doctors.find(d => d.id === selectedDoctor);
    return doc ? doc.name : "Dr. Roshan Dev";
  };

  const handleSendOTP = () => {
    if (!patientPhone) {
      alert("Please enter a valid mobile number!");
      return;
    }
    setOtpSent(true);
    alert("✓ Devroshan Clinic OTP sent to " + patientPhone + "! Code is: 7023");
  };

  const handleVerifyOTP = () => {
    if (otpCode === "7023") {
      setOtpVerified(true);
      // Process Appointment Booking
      const aptData = {
        hospitalId: selectedHospital || "hosp-1",
        hospitalName: getHospitalName(),
        departmentName: selectedDept,
        doctorId: selectedDoctor || "doc-1",
        doctorName: getDoctorName(),
        doctorSpeciality: selectedDept,
        patientName: patientName || "John Doe",
        date: bookingDate || new Date().toISOString().split("T")[0],
        timeSlot: bookingTime || "11:30 AM",
        type: consultationType
      };

      const finalApt = bookAppointment(aptData);
      setCreatedApt(finalApt);
      
      // Blast premium confetti
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });

      setStep(5);
    } else {
      alert("⚠️ Invalid verification code! Please check your credentials.");
    }
  };

  return (
    <div className="w-full bg-mesh min-h-screen py-16 px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Header Block */}
        <div className="text-center mb-10">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#0284c7]">Digital Registrar</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white mt-1">
            Secure Clinic Consultation
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-lg mx-auto">
            Book automated OPD slots or real-time WebRTC teleconsultations. Recieve scan-ready check-in tickets instantly.
          </p>
        </div>

        {/* Step Progress indicators */}
        {step < 5 && (
          <div className="flex items-center justify-between px-4 mb-8 text-[10px] uppercase font-bold text-slate-450 dark:text-slate-400 border-b border-slate-200/50 dark:border-slate-800/40 pb-4">
            <span className={step === 1 ? "text-[#0284c7]" : ""}>1. Hub & Class</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className={step === 2 ? "text-[#0284c7]" : ""}>2. Consultant</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className={step === 3 ? "text-[#0284c7]" : ""}>3. Availability</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className={step === 4 ? "text-[#0284c7]" : ""}>4. Checkout</span>
          </div>
        )}

        {/* Dynamic Wizard Body */}
        <div className="glass-panel rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white/40 dark:bg-slate-950/40 p-6 md:p-8 shadow-2xl">
          
          {/* STEP 1: Hospital, Speciality & Type */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Building className="w-5 h-5 text-[#0284c7]" />
                Select Hospital & Consultation Format
              </h2>
              
              {/* Format selection toggler */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setConsultationType("OPD")}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition-all flex items-start gap-3 ${
                    consultationType === "OPD"
                      ? "border-[#0284c7] bg-[#0284c7]/5 text-[#0284c7]"
                      : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
                  }`}
                >
                  <Building className="w-5 h-5 text-[#0284c7] shrink-0" />
                  <div>
                    <strong className="text-xs text-slate-800 dark:text-white block">OPD Physical Visit</strong>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Check-in dynamically at clinic waitrooms.</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setConsultationType("Teleconsultation")}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition-all flex items-start gap-3 ${
                    consultationType === "Teleconsultation"
                      ? "border-emerald-500 bg-emerald-500/5 text-emerald-500"
                      : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
                  }`}
                >
                  <Video className="w-5 h-5 text-emerald-500 shrink-0" />
                  <div>
                    <strong className="text-xs text-slate-800 dark:text-white block">Video Consultation</strong>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Stream direct WebRTC consultation grids anywhere.</span>
                  </div>
                </button>
              </div>

              {/* Hospital Locator */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-350">Select Clinical Hub</label>
                <select
                  value={selectedHospital}
                  onChange={(e) => setSelectedHospital(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                >
                  <option value="">Select Hospital Location</option>
                  {hospitals.map((h) => (
                    <option key={h.id} value={h.id}>{h.name}</option>
                  ))}
                </select>
              </div>

              {/* Speciality locator */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-350">Department Specialty</label>
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                >
                  <option value="Cardiology">Cardiology & Vascular Surgery</option>
                  <option value="Neurology">Neurology & Neuro Sciences</option>
                  <option value="Oncology">Oncology & Immunotherapy</option>
                  <option value="Robotic Surgery">Robotic Surgery Institute</option>
                  <option value="Genomic Medicine">Genomic Medicine Lab</option>
                </select>
              </div>

              {/* Button group */}
              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  disabled={!selectedHospital}
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0284c7] to-[#10b981] disabled:opacity-50 text-white text-xs font-bold hover:shadow-lg transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>Choose Doctor</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 2: Doctor Selection */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <User className="w-5 h-5 text-[#0284c7]" />
                Select Medical Consultant
              </h2>
              
              <div className="grid grid-cols-1 gap-4">
                {doctors
                  .filter(d => d.speciality.toLowerCase() === selectedDept.toLowerCase())
                  .map((doc) => (
                    <button
                      type="button"
                      key={doc.id}
                      onClick={() => setSelectedDoctor(doc.id)}
                      className={`p-4 rounded-2xl border text-left cursor-pointer transition-all flex gap-4 ${
                        selectedDoctor === doc.id
                          ? "border-[#0284c7] bg-[#0284c7]/5"
                          : "border-slate-200 dark:border-slate-800 hover:border-slate-350"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={doc.image} 
                        alt={doc.name} 
                        className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200/50" 
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <strong className="text-xs text-slate-800 dark:text-white block">{doc.name}</strong>
                          <span className="flex items-center gap-1 text-amber-500 text-[10px] font-bold">
                            <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                            {doc.rating}
                          </span>
                        </div>
                        <span className="text-[9px] text-[#0284c7] font-semibold tracking-wider block mt-0.5 uppercase">{doc.speciality}</span>
                        <p className="text-[10px] text-slate-550 dark:text-slate-400 mt-1 leading-relaxed">{doc.bio.substring(0, 100)}...</p>
                      </div>
                    </button>
                  ))}
              </div>

              {/* Button navigation */}
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl border border-slate-350 dark:border-slate-800 text-xs font-bold text-slate-650 dark:text-slate-300 hover:bg-slate-50 cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  disabled={!selectedDoctor}
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0284c7] to-[#10b981] disabled:opacity-50 text-white text-xs font-bold hover:shadow-lg transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>Select Slot</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 3: Date & Time selector */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#0284c7]" />
                Select Availability Calendar
              </h2>

              {/* Date Input */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-350">Choose Date</label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-850 dark:text-slate-200 focus:outline-none"
                />
              </div>

              {/* Hours Grid */}
              <div className="flex flex-col gap-2.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-350">Choose Hour Slot</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["09:00 AM", "10:30 AM", "11:30 AM", "01:00 PM", "02:00 PM", "03:30 PM", "04:30 PM", "05:30 PM"].map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setBookingTime(t)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        bookingTime === t
                          ? "bg-emerald-500 border-emerald-500 text-white"
                          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-300 hover:border-slate-300"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Button navigation */}
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-xl border border-slate-350 dark:border-slate-800 text-xs font-bold text-slate-650 dark:text-slate-300 hover:bg-slate-50 cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  disabled={!bookingDate || !bookingTime}
                  onClick={() => setStep(4)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0284c7] to-[#10b981] disabled:opacity-50 text-white text-xs font-bold hover:shadow-lg transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>Checkout Information</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 4: Patient Details & OTP Checkout */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#0284c7]" />
                Patient Verification & Checkout
              </h2>

              {/* Patient Name */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-350">Patient Full Name</label>
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <User className="w-4.5 h-4.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Enter patient complete name"
                    className="w-full bg-transparent text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              {/* Phone number */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-350">Mobile Registration Number</label>
                <div className="flex gap-2">
                  <div className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <FileText className="w-4.5 h-4.5 text-slate-400" />
                    <input
                      type="tel"
                      required
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full bg-transparent text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
                  >
                    {otpSent ? "Resend" : "Send OTP"}
                  </button>
                </div>
              </div>

              {/* OTP Code */}
              {otpSent && (
                <div className="flex flex-col gap-2.5 p-4 rounded-2xl border border-emerald-500/10 bg-emerald-500/5">
                  <label className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Key className="w-3.5 h-3.5" />
                    Security Verification Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={4}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="XXXX"
                      className="w-24 text-center tracking-[8px] px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-bold text-slate-800 dark:text-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOTP}
                      className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold cursor-pointer"
                    >
                      Verify & Confirm Booking
                    </button>
                  </div>
                  <span className="text-[9px] text-emerald-500/80">Code is 7023. This simulations validates checkout securely.</span>
                </div>
              )}

              {/* Button navigation */}
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-4 py-2.5 rounded-xl border border-slate-350 dark:border-slate-800 text-xs font-bold text-slate-650 dark:text-slate-300 hover:bg-slate-50 cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              </div>

            </div>
          )}

          {/* STEP 5: QR Receipt */}
          {step === 5 && createdApt && (
            <div className="text-center space-y-6">
              
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7" />
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">OPD Ticket Generated!</h2>
                <p className="text-xs text-slate-550 dark:text-slate-400 mt-1">
                  Your appointment slot is fully reserved on our electronic medical system.
                </p>
              </div>

              {/* QR Receipt Card wrapper */}
              <div className="max-w-md mx-auto p-6 rounded-3xl border border-dashed border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-900 text-left shadow-lg relative">
                
                {/* Visual medical ticket notches */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-850" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-50 dark:bg-slate-950 border-l border-slate-200 dark:border-slate-850" />

                <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-800 dark:text-white">Devroshan Clinic Ticket</h3>
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-extrabold bg-[#0284c7]/10 text-[#0284c7] uppercase mt-1 inline-block">
                      {createdApt.type} Visit
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">TICKET ID</span>
                    <p className="text-[11px] font-mono font-bold text-slate-800 dark:text-white">{createdApt.qrCodeToken}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-b border-slate-100 dark:border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-450 dark:text-slate-400">PATIENT NAME</span>
                    <p className="font-bold text-slate-800 dark:text-slate-250">{createdApt.patientName}</p>
                  </div>
                  <div>
                    <span className="text-slate-450 dark:text-slate-400">PHYSICIAN</span>
                    <p className="font-bold text-slate-800 dark:text-slate-250">{createdApt.doctorName}</p>
                  </div>
                  <div>
                    <span className="text-slate-450 dark:text-slate-400">DATE</span>
                    <p className="font-bold text-slate-800 dark:text-slate-250">{createdApt.date}</p>
                  </div>
                  <div>
                    <span className="text-slate-450 dark:text-slate-400">TIME SLOT</span>
                    <p className="font-bold text-slate-800 dark:text-slate-250">{createdApt.timeSlot}</p>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center pt-5">
                  
                  {/* Stylized vector QR Code placeholder */}
                  <div className="w-36 h-36 border border-slate-100 dark:border-slate-850 p-2 bg-white rounded-xl shadow-sm flex items-center justify-center">
                    <QrCode className="w-32 h-32 text-slate-900" />
                  </div>
                  
                  <span className="text-[8px] text-slate-400 uppercase tracking-widest font-extrabold mt-3">
                    Scan at Waiting Room Check-in Kiosk
                  </span>
                </div>

              </div>

              {/* Action buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <Link
                  href="/dashboard/patient"
                  className="flex-1 text-center py-2.5 text-xs font-bold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-850 rounded-xl"
                >
                  Track in Patient Portal
                </Link>
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="flex-1 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-250 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-200 cursor-pointer"
                >
                  Back to Home
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="w-full bg-mesh min-h-screen py-16 px-6 flex items-center justify-center text-xs font-bold text-slate-500 uppercase tracking-widest">Initializing Smart Registrar...</div>}>
      <BookingPageInner />
    </Suspense>
  );
}
