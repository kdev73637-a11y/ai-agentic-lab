import ParticleBackground from '@/components/ParticleBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import AIAgents from '@/components/AIAgents';
import Services from '@/components/Services';
import Dashboard from '@/components/Dashboard';
import Workflow from '@/components/Workflow';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import CaseStudies from '@/components/CaseStudies';
import Integrations from '@/components/Integrations';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050816] overflow-x-hidden">
      {/* Animated Particle Background */}
      <ParticleBackground />

      {/* Global Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Animated mesh gradient blobs */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,1) 0%, transparent 70%)',
            top: '-20%',
            left: '60%',
            animation: 'orb 25s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-8"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,1) 0%, transparent 70%)',
            top: '40%',
            left: '-10%',
            animation: 'orb 30s ease-in-out 5s infinite reverse',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-6"
          style={{
            background: 'radial-gradient(circle, rgba(34,211,238,1) 0%, transparent 70%)',
            top: '70%',
            right: '-10%',
            animation: 'orb 22s ease-in-out 10s infinite',
          }}
        />
        {/* Grid pattern */}
        <div className="absolute inset-0 dot-grid opacity-20" />
      </div>

      {/* Sticky Navbar */}
      <Navbar />

      {/* Page Sections */}
      <div className="relative z-10">
        <Hero />

        <div className="relative">
          {/* Section separator */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
          <Features />
        </div>

        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
          <AIAgents />
        </div>

        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
          <Services />
        </div>

        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
          <Dashboard />
        </div>

        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
          <Workflow />
        </div>

        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
          <Pricing />
        </div>

        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
          <Testimonials />
        </div>

        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
          <CaseStudies />
        </div>

        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
          <Integrations />
        </div>

        <Footer />
      </div>

      {/* Floating AI Chat Widget */}
      <ChatWidget />
    </main>
  );
}
