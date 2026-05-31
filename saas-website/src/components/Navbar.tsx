'use client';
import { useState, useEffect } from 'react';
import { Menu, X, Zap, LogOut, User, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'Solutions', href: '#agents' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout, openModal, loading } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close user menu on outside click
  useEffect(() => {
    const onClick = () => setUserMenuOpen(false);
    if (userMenuOpen) document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [userMenuOpen]);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
  };

  // Get initials for avatar
  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-strong border-b border-white/5 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo('#home')} className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center glow-purple transition-all duration-300 group-hover:scale-110">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-heading font-bold text-xl text-white">
            Dev<span className="gradient-text">AIO</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {loading ? (
            <div className="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
          ) : user ? (
            /* Logged-in state */
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setUserMenuOpen(!userMenuOpen); }}
                className="flex items-center gap-2.5 glass px-3 py-2 rounded-xl hover:border-indigo-500/40 transition-all duration-200 group"
              >
                {/* Avatar */}
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                  {initials}
                </div>
                <div className="text-left">
                  <p className="text-white text-xs font-medium leading-none">{user.name.split(' ')[0]}</p>
                  <p className="text-slate-500 text-xs capitalize">{user.plan} plan</p>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown */}
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 glass-strong rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                  {/* User info */}
                  <div className="px-4 py-3 border-b border-white/5">
                    <p className="text-white text-sm font-medium">{user.name}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{user.email}</p>
                    <div className="inline-flex items-center gap-1 mt-1.5 bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 text-xs px-2 py-0.5 rounded-full capitalize">
                      {user.plan} plan
                    </div>
                  </div>
                  {/* Menu items */}
                  <div className="p-2">
                    <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 text-sm transition-all duration-150">
                      <User className="w-4 h-4" />
                      My Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 text-sm transition-all duration-150 mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Logged-out state */
            <>
              <button
                onClick={() => openModal('login')}
                className="btn-secondary text-sm px-5 py-2.5"
              >
                Login
              </button>
              <button
                onClick={() => openModal('register')}
                className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Get Started
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden glass-strong border-t border-white/5 transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="text-slate-300 hover:text-white text-sm font-medium py-2 text-left border-b border-white/5 transition-colors"
            >
              {link.label}
            </button>
          ))}

          {user ? (
            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-3 py-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                  {initials}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{user.name}</p>
                  <p className="text-slate-500 text-xs">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full btn-secondary text-sm flex items-center justify-center gap-2 text-red-400 border-red-500/30"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex gap-3 pt-2">
              <button onClick={() => { openModal('login'); setMobileOpen(false); }} className="btn-secondary text-sm flex-1">
                Login
              </button>
              <button onClick={() => { openModal('register'); setMobileOpen(false); }} className="btn-primary text-sm flex-1">
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
