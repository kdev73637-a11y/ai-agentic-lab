"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Doctor {
  id: string;
  name: string;
  speciality: string;
  experience: number;
  rating: number;
  reviewsCount: number;
  hospital: string;
  city: string;
  availability: string[];
  image: string;
  achievements: string[];
  bio: string;
}

export interface Hospital {
  id: string;
  name: string;
  city: string;
  bedsAvailable: number;
  totalBeds: number;
  icuAvailable: number;
  totalIcu: number;
  emergencyWaitMinutes: number;
  rating: number;
  accreditations: string[];
  technologies: string[];
  address: string;
}

export interface Appointment {
  id: string;
  hospitalId: string;
  hospitalName: string;
  departmentName: string;
  doctorId: string;
  doctorName: string;
  doctorSpeciality: string;
  patientName: string;
  date: string;
  timeSlot: string;
  otpVerified: boolean;
  status: "Scheduled" | "In Queue" | "Completed" | "Cancelled";
  qrCodeToken: string;
  type: "OPD" | "Teleconsultation";
}

export interface LabReport {
  id: string;
  fileName: string;
  date: string;
  summary: string;
  abnormalValues: { test: string; value: string; normalRange: string; severity: "Low" | "Moderate" | "High" }[];
  suggestedSpecialist: string;
  healthScoreImpact: number;
  fullExplanation: string;
}

export interface Vitals {
  heartRate: number;
  bloodPressure: string;
  oxygen: number;
  sleepHours: number;
  steps: number;
  vitalsHistory: { time: string; hr: number; bp: number }[];
}

export interface AmbulanceSOS {
  active: boolean;
  hospitalId: string;
  hospitalName: string;
  patientLat: number;
  patientLng: number;
  ambulanceLat: number;
  ambulanceLng: number;
  eta: number; // in minutes
  status: "Idle" | "Dispatched" | "Arrived" | "Heading to Clinic";
}

export interface Message {
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

interface ClinicContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
  role: "patient" | "admin";
  setRole: (role: "patient" | "admin") => void;
  doctors: Doctor[];
  hospitals: Hospital[];
  appointments: Appointment[];
  bookAppointment: (appointment: Omit<Appointment, "id" | "status" | "qrCodeToken" | "otpVerified">) => Appointment;
  cancelAppointment: (id: string) => void;
  reports: LabReport[];
  uploadReport: (fileName: string, rawText: string) => LabReport;
  vitals: Vitals;
  wearableSyncing: boolean;
  setWearableSyncing: (syncing: boolean) => void;
  wearableBrand: "Apple Watch" | "Fitbit" | "Samsung Health" | "Google Fit" | "None";
  setWearableBrand: (brand: "Apple Watch" | "Fitbit" | "Samsung Health" | "Google Fit" | "None") => void;
  ambulanceSos: AmbulanceSOS;
  triggerSOS: (hospitalId: string) => void;
  cancelSOS: () => void;
  chatMessages: Message[];
  sendChatMessage: (text: string) => void;
  opdQueuePosition: number;
  opdWaitingTime: number;
  checkInOPD: (appointmentId: string) => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
}

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

// Sample Doctors
const initialDoctors: Doctor[] = [
  {
    id: "doc-1",
    name: "Dr. Roshan Dev",
    speciality: "Cardiology",
    experience: 18,
    rating: 4.9,
    reviewsCount: 312,
    hospital: "Devroshan Smart Hub, Mumbai",
    city: "Mumbai",
    availability: ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"],
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
    achievements: ["Pioneer of Robotic Angioplasty", "Chief Cardiology Officer"],
    bio: "Dr. Roshan Dev is an internationally acclaimed Cardiologist specializing in robotic heart surgeries, AI diagnostics, and non-invasive coronary interventions."
  },
  {
    id: "doc-2",
    name: "Dr. Elena Rostova",
    speciality: "Neurology",
    experience: 15,
    rating: 4.8,
    reviewsCount: 204,
    hospital: "Devroshan Neuro-Center, Delhi",
    city: "Delhi",
    availability: ["10:00 AM", "12:00 PM", "03:00 PM", "05:00 PM"],
    image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400",
    achievements: ["AI Neurological Mapping Innovator", "Brain-Machine Interface Scholar"],
    bio: "Dr. Rostova specializes in AI-powered brain mapping, deep brain stimulation (DBS), and neural regeneration sciences."
  },
  {
    id: "doc-3",
    name: "Dr. Arjun Mehta",
    speciality: "Oncology",
    experience: 16,
    rating: 4.95,
    reviewsCount: 180,
    hospital: "Devroshan Cancer Center, Bangalore",
    city: "Bangalore",
    availability: ["09:30 AM", "11:00 AM", "01:30 PM", "04:00 PM"],
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400",
    achievements: ["Car-T Cell Therapy Expert", "National Oncology Research Chair"],
    bio: "Dr. Mehta leads immunotherapy research and genomic tumor sequencing programs, bringing personalized oncological care to cancer patients."
  },
  {
    id: "doc-4",
    name: "Dr. Priya Sharma",
    speciality: "Robotic Surgery",
    experience: 14,
    rating: 4.7,
    reviewsCount: 152,
    hospital: "Devroshan Smart Hub, Mumbai",
    city: "Mumbai",
    availability: ["11:00 AM", "01:00 PM", "03:30 PM", "05:30 PM"],
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400",
    achievements: ["Completed 1,000+ Robotic Resections", "DaVinci Surgical System Certified Tutor"],
    bio: "Dr. Priya Sharma is a global specialist in minimally invasive robotic surgeries covering gastroenterology and gynecology."
  },
  {
    id: "doc-5",
    name: "Dr. Marcus Vance",
    speciality: "Genomic Medicine",
    experience: 12,
    rating: 4.85,
    reviewsCount: 98,
    hospital: "Devroshan Innovation Lab, Bangalore",
    city: "Bangalore",
    availability: ["08:30 AM", "10:30 AM", "02:30 PM", "06:00 PM"],
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400",
    achievements: ["CRISPR Treatment Architect", "Elected Fellow of Genomics Society"],
    bio: "Dr. Marcus Vance is a genomic sequencing specialist, implementing gene editing therapies for rare hereditary diseases."
  }
];

// Sample Hospitals
const initialHospitals: Hospital[] = [
  {
    id: "hosp-1",
    name: "Devroshan Smart Hub, Mumbai",
    city: "Mumbai",
    bedsAvailable: 148,
    totalBeds: 450,
    icuAvailable: 24,
    totalIcu: 80,
    emergencyWaitMinutes: 8,
    rating: 4.9,
    accreditations: ["NABH Gold Standard", "JCI Gold Seal", "AI-Powered Smart Care Cert"],
    technologies: ["DaVinci Xi Robotic Arms", "Mako Joint Robotics", "Smart ICU Live Monitors"],
    address: "Bandra Kurla Complex, Smart Health Avenue, Mumbai, 400051"
  },
  {
    id: "hosp-2",
    name: "Devroshan Neuro-Center, Delhi",
    city: "Delhi",
    bedsAvailable: 89,
    totalBeds: 300,
    icuAvailable: 11,
    totalIcu: 60,
    emergencyWaitMinutes: 12,
    rating: 4.8,
    accreditations: ["NABH Certified", "JCI Quality Care accreditation"],
    technologies: ["AI Neurological Imaging Suite", "Intraoperative Brain Mapping"],
    address: "Chanakyapuri, Neuro Science Boulevard, New Delhi, 110021"
  },
  {
    id: "hosp-3",
    name: "Devroshan Cancer & Genomic Hub, Bangalore",
    city: "Bangalore",
    bedsAvailable: 165,
    totalBeds: 500,
    icuAvailable: 35,
    totalIcu: 100,
    emergencyWaitMinutes: 6,
    rating: 4.95,
    accreditations: ["NABH Platinum", "JCI Excellence in Oncology Award"],
    technologies: ["Digital Pathology Scanner", "DNA High-Throughput Sequencer", "Linear Accelerators"],
    address: "Electronic City Phase 1, Bio-Tech Hub, Bangalore, 560100"
  }
];

export const ClinicProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [role, setRole] = useState<"patient" | "admin">("patient");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [reports, setReports] = useState<LabReport[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
  
  // OPD Queue Position State
  const [opdQueuePosition, setOpdQueuePosition] = useState<number>(12);
  const [opdWaitingTime, setOpdWaitingTime] = useState<number>(34);

  // Wearable Devices state
  const [wearableSyncing, setWearableSyncing] = useState<boolean>(true);
  const [wearableBrand, setWearableBrand] = useState<"Apple Watch" | "Fitbit" | "Samsung Health" | "Google Fit" | "None">("Apple Watch");
  const [vitals, setVitals] = useState<Vitals>({
    heartRate: 72,
    bloodPressure: "120/80",
    oxygen: 99,
    sleepHours: 7.2,
    steps: 8420,
    vitalsHistory: []
  });

  // SOS Ambulance state
  const [ambulanceSos, setAmbulanceSos] = useState<AmbulanceSOS>({
    active: false,
    hospitalId: "",
    hospitalName: "",
    patientLat: 19.0760,
    patientLng: 72.8777,
    ambulanceLat: 19.0880,
    ambulanceLng: 72.8897,
    eta: 0,
    status: "Idle"
  });

  // Chat message state
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Hello! I am Devika, your Devroshan Clinic AI health receptionist. I can help symptom-check your vitals, arrange quick dispatches, recommend top consultants, or schedule clinic slots. How are you feeling today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // Read theme and stored appointments on start
  useEffect(() => {
    // Load local storage items
    const savedTheme = localStorage.getItem("devroshan-theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      document.documentElement.classList.add("dark");
    }

    const savedAppointments = localStorage.getItem("devroshan-appointments");
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    } else {
      // Pre-seed 1 mock booking
      const preseeded: Appointment[] = [
        {
          id: "apt-seed-1",
          hospitalId: "hosp-1",
          hospitalName: "Devroshan Smart Hub, Mumbai",
          departmentName: "Cardiology",
          doctorId: "doc-1",
          doctorName: "Dr. Roshan Dev",
          doctorSpeciality: "Cardiology",
          patientName: "John Doe",
          date: new Date(Date.now() + 86400000).toISOString().split("T")[0], // Tomorrow
          timeSlot: "11:30 AM",
          otpVerified: true,
          status: "Scheduled",
          qrCodeToken: "DEVROSHAN-7023-APPOINTMENT",
          type: "OPD"
        }
      ];
      setAppointments(preseeded);
      localStorage.setItem("devroshan-appointments", JSON.stringify(preseeded));
    }

    const savedReports = localStorage.getItem("devroshan-reports");
    if (savedReports) {
      setReports(JSON.parse(savedReports));
    } else {
      // Pre-seed 1 mock lab report
      const preseededReport: LabReport[] = [
        {
          id: "rep-seed-1",
          fileName: "Blood_Panel_Comprehensive_Q2_26.pdf",
          date: new Date(Date.now() - 432000000).toISOString().split("T")[0], // 5 days ago
          summary: "Comprehensive Blood Profile shows healthy metabolic indicators, though Cholesterol and Hemoglobin A1C are slightly elevated. Liver and renal panel markers are perfectly normal.",
          abnormalValues: [
            { test: "Total Cholesterol", value: "242 mg/dL", normalRange: "< 200 mg/dL", severity: "Moderate" },
            { test: "Hemoglobin A1c (HbA1c)", value: "5.8 %", normalRange: "< 5.7 %", severity: "Low" }
          ],
          suggestedSpecialist: "Cardiology & Internal Medicine",
          healthScoreImpact: -4,
          fullExplanation: "A cholesterol level of 242 mg/dL represents a moderately elevated blood level. The HbA1c of 5.8% is considered pre-diabetic. We recommend cutting down saturated fats, introducing aerobic activity 4 days a week, and consulting with our specialist Dr. Roshan Dev for a customized lipid therapy review."
        }
      ];
      setReports(preseededReport);
      localStorage.setItem("devroshan-reports", JSON.stringify(preseededReport));
    }
  }, []);

  // Theme Toggler
  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("devroshan-theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  // Simulating real-time wearable device vitals streaming
  useEffect(() => {
    if (!wearableSyncing || wearableBrand === "None") return;

    const interval = setInterval(() => {
      setVitals((prev) => {
        // Vary heart rate smoothly around 65 - 85 bpm
        const baseHR = prev.heartRate;
        const hrDelta = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const nextHR = Math.max(60, Math.min(105, baseHR + hrDelta));

        // Sleep variations (fixed, slightly incremented step counts)
        const nextSteps = prev.steps + Math.floor(Math.random() * 20);

        // Keep vitals history up to 10 indices for canvas visualizers
        const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const newHistory = [...prev.vitalsHistory, { time: timeNow, hr: nextHR, bp: 120 }].slice(-10);

        // If heart rate goes spikes above 100, trigger simulated alert notification
        return {
          ...prev,
          heartRate: nextHR,
          steps: nextSteps,
          vitalsHistory: newHistory
        };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [wearableSyncing, wearableBrand]);

  // Simulating Real-time Ambulance SOS Routing
  useEffect(() => {
    if (!ambulanceSos.active) return;

    const interval = setInterval(() => {
      setAmbulanceSos((prev) => {
        if (prev.status === "Heading to Clinic" && prev.eta <= 1) {
          clearInterval(interval);
          return {
            ...prev,
            eta: 0,
            status: "Arrived",
            ambulanceLat: prev.patientLat,
            ambulanceLng: prev.patientLng
          };
        }

        if (prev.status === "Dispatched" && prev.eta <= 1) {
          // Reached patient, now moving back to clinic
          return {
            ...prev,
            eta: 5,
            status: "Heading to Clinic",
            ambulanceLat: prev.patientLat,
            ambulanceLng: prev.patientLng
          };
        }

        // Increment Lat/Lng vectors towards patient
        const latDelta = (prev.patientLat - prev.ambulanceLat) / (prev.eta * 2);
        const lngDelta = (prev.patientLng - prev.ambulanceLng) / (prev.eta * 2);

        return {
          ...prev,
          eta: Math.max(1, prev.eta - 1),
          ambulanceLat: prev.ambulanceLat + (isNaN(latDelta) ? 0 : latDelta),
          ambulanceLng: prev.ambulanceLng + (isNaN(lngDelta) ? 0 : lngDelta)
        };
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [ambulanceSos.active, ambulanceSos.status]);

  // OPD check-in helper
  const checkInOPD = (appointmentId: string) => {
    setAppointments((prev) => {
      const nextApts = prev.map((ap) => {
        if (ap.id === appointmentId) {
          return { ...ap, status: "In Queue" as const };
        }
        return ap;
      });
      localStorage.setItem("devroshan-appointments", JSON.stringify(nextApts));
      return nextApts;
    });

    // Start OPD counter countdown simulation
    setOpdQueuePosition(5);
    setOpdWaitingTime(15);
  };

  // Appointment Booker
  const bookAppointment = (appointment: Omit<Appointment, "id" | "status" | "qrCodeToken" | "otpVerified">) => {
    const id = `apt-${Math.random().toString(36).substr(2, 9)}`;
    const qrToken = `DEVROSHAN-${Math.floor(1000 + Math.random() * 9000)}-APPOINTMENT`;
    
    const newAppointment: Appointment = {
      ...appointment,
      id,
      status: "Scheduled",
      qrCodeToken: qrToken,
      otpVerified: true
    };

    setAppointments((prev) => {
      const nextApts = [...prev, newAppointment];
      localStorage.setItem("devroshan-appointments", JSON.stringify(nextApts));
      return nextApts;
    });

    // Auto-update dashboard metrics
    return newAppointment;
  };

  // Cancel Appointment
  const cancelAppointment = (id: string) => {
    setAppointments((prev) => {
      const nextApts = prev.map((ap) => {
        if (ap.id === id) {
          return { ...ap, status: "Cancelled" as const };
        }
        return ap;
      });
      localStorage.setItem("devroshan-appointments", JSON.stringify(nextApts));
      return nextApts;
    });
  };

  // Upload Medical lab report simulator
  const uploadReport = (fileName: string, rawText: string) => {
    const id = `rep-${Math.random().toString(36).substr(2, 9)}`;
    
    // Simulate smart AI report parsing
    const hasHighSugar = rawText.toLowerCase().includes("glucose") || rawText.toLowerCase().includes("diabetes") || rawText.toLowerCase().includes("hba1c");
    const hasHighBP = rawText.toLowerCase().includes("bp") || rawText.toLowerCase().includes("hypertension") || rawText.toLowerCase().includes("systolic");
    
    const abnormalValues = [];
    let summary = "The lab diagnostics analyzer compiled a clean bill of health. Cardiovascular, renal, and diabetic indicator ranges are fully balanced.";
    let suggestedSpecialist = "Internal Medicine / General Wellness";
    let healthScoreImpact = 2;
    let fullExplanation = "All values read within ideal clinical thresholds. We advise sustaining your active diet plan, regular cardio routines, and periodic annual monitoring.";

    if (hasHighSugar) {
      abnormalValues.push({
        test: "Fasting Blood Glucose",
        value: "148 mg/dL",
        normalRange: "70 - 100 mg/dL",
        severity: "High" as const
      });
      summary = "AI analysis flagged elevated Fasting Blood Glucose levels indicating hyper-glycemic activity. Prompt lifestyle revisions and clinical consultation are advised.";
      suggestedSpecialist = "Endocrinology & Diabetology";
      healthScoreImpact = -8;
      fullExplanation = "A fasting glucose level of 148 mg/dL is classified within hyper-glycemic thresholds. Immediate intervention including refined sugar containment, daily dynamic metabolic testing, and specialist review is recommended.";
    }

    if (hasHighBP) {
      abnormalValues.push({
        test: "Systolic BP",
        value: "145 mmHg",
        normalRange: "< 120 mmHg",
        severity: "Moderate" as const
      });
      summary = hasHighSugar 
        ? "AI Diagnostics reports co-existing signs of pre-hypertension and elevated glycemic markers. Direct lifestyle counseling and clinical intervention is recommended."
        : "AI Diagnostics flagged borderline Stage-1 Hypertension. Total lipids and dynamic vascular resistance evaluation is advised.";
      suggestedSpecialist = "Cardiology";
      healthScoreImpact = hasHighSugar ? -15 : -6;
      fullExplanation = "Systolic blood pressure reading at 145 mmHg signifies moderate cardiovascular wall tension. Reduce dietary sodium loads, implement stress relief measures, and schedule a telemetry ECG with Dr. Roshan Dev.";
    }

    const newReport: LabReport = {
      id,
      fileName,
      date: new Date().toISOString().split("T")[0],
      summary,
      abnormalValues,
      suggestedSpecialist,
      healthScoreImpact,
      fullExplanation
    };

    setReports((prev) => {
      const nextReports = [newReport, ...prev];
      localStorage.setItem("devroshan-reports", JSON.stringify(nextReports));
      return nextReports;
    });

    return newReport;
  };

  // SOS Trigger
  const triggerSOS = (hospitalId: string) => {
    const selectedHospital = initialHospitals.find(h => h.id === hospitalId) || initialHospitals[0];
    
    // Set active SOS tracker
    setAmbulanceSos({
      active: true,
      hospitalId: selectedHospital.id,
      hospitalName: selectedHospital.name,
      patientLat: 19.0760 + (Math.random() * 0.01 - 0.005),
      patientLng: 72.8777 + (Math.random() * 0.01 - 0.005),
      ambulanceLat: 19.0760 - 0.02,
      ambulanceLng: 72.8777 + 0.02,
      eta: 8,
      status: "Dispatched"
    });
  };

  // Cancel SOS
  const cancelSOS = () => {
    setAmbulanceSos(prev => ({
      ...prev,
      active: false,
      status: "Idle"
    }));
  };

  // Send message to AI health assistant
  const sendChatMessage = (text: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = { sender: "user", text, timestamp: time };
    
    setChatMessages(prev => [...prev, userMsg]);

    // Simulate smart medical chatbot conversational routing responses
    setTimeout(() => {
      let reply = "I've noted that observation. For localized pain or recurring discomfort, I recommend consulting with our clinic specialists for direct pathology screenings.";
      const query = text.toLowerCase();

      if (query.includes("heart") || query.includes("chest") || query.includes("cardiac") || query.includes("ecg")) {
        reply = "Chest tightness or palpitations warrant immediate attention. I've routed Dr. Roshan Dev (Cardiology Chief) as your top recommendation. If you are experiencing acute pain, please tap the Emergency SOS ambulance link in the navbar.";
      } else if (query.includes("brain") || query.includes("headache") || query.includes("migraine") || query.includes("neuro")) {
        reply = "Neurological sensitivities require comprehensive diagnostics. I suggest consulting Dr. Elena Rostova at our dedicated Neuro-Center in Delhi. Would you like me to suggest booking slots?";
      } else if (query.includes("sugar") || query.includes("diabetes") || query.includes("glucose")) {
        reply = "Sustained high glycemic values are best reviewed by Endocrinology. I've added a note to your personal health dashboard. Our Heart Health checkup package includes standard sugar panels.";
      } else if (query.includes("appointment") || query.includes("book") || query.includes("schedule")) {
        reply = "I can guide your scheduling. Click on the 'Book Appointment' link in our main navigation, select your preferred location (Mumbai, Delhi, or Bangalore), and select your doctor to secure a real-time QR ticket.";
      } else if (query.includes("hello") || query.includes("hi")) {
        reply = "Hello! I am ready. You can query clinical details, request diagnostics analyses, book doctor appointments, or request real-time ambulance tracking. What can I do for you?";
      }

      setChatMessages(prev => [...prev, {
        sender: "ai",
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  return (
    <ClinicContext.Provider
      value={{
        theme,
        toggleTheme,
        role,
        setRole,
        doctors: initialDoctors,
        hospitals: initialHospitals,
        appointments,
        bookAppointment,
        cancelAppointment,
        reports,
        uploadReport,
        vitals,
        wearableSyncing,
        setWearableSyncing,
        wearableBrand,
        setWearableBrand,
        ambulanceSos,
        triggerSOS,
        cancelSOS,
        chatMessages,
        sendChatMessage,
        opdQueuePosition,
        opdWaitingTime,
        checkInOPD,
        selectedLanguage,
        setSelectedLanguage
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
};

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (context === undefined) {
    throw new Error("useClinic must be used within a ClinicProvider");
  }
  return context;
};
