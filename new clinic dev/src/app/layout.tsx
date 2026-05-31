import type { Metadata } from "next";
import { ClinicProvider } from "@/context/ClinicContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIFloatingAssistant from "@/components/AIFloatingAssistant";
import "./globals.css";

export const metadata: Metadata = {
  title: "Devroshan Clinic - Future of Smart Healthcare",
  description: "Advanced AI-powered healthcare, smart consultations, and world-class medical services for modern patients.",
  keywords: ["Devroshan Clinic", "Smart Healthcare", "Teleconsultation", "AI Report Analyzer", "Robotic Surgery", "Cardiology", "Neurology"],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col antialiased bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans">
        <ClinicProvider>
          <Navbar />
          <main className="flex-1 w-full relative z-10">
            {children}
          </main>
          <Footer />
          <AIFloatingAssistant />
        </ClinicProvider>
      </body>
    </html>
  );
}
