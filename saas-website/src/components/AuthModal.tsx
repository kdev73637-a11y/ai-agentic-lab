'use client';
import { useState, useEffect } from 'react';
import { X, Zap, Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AuthModal() {
  const { modalOpen, closeModal, activeTab, setActiveTab, login, register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Reset form when switching tabs or closing
  useEffect(() => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
    setShowPassword(false);
  }, [activeTab, modalOpen]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeModal();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeModal]);

  // Prevent body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

  if (!modalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (activeTab === 'register') {
      if (!name.trim()) return setError('Please enter your full name.');
      if (password !== confirmPassword) return setError('Passwords do not match.');
      if (password.length < 6) return setError('Password must be at least 6 characters.');
    }

    setLoading(true);
    try {
      const result =
        activeTab === 'login'
          ? await login(email, password)
          : await register(name, email, password);

      if (!result.success) {
        setError(result.error || 'Something went wrong.');
      } else {
        setSuccess(activeTab === 'login' ? 'Welcome back! Redirecting...' : 'Account created! Welcome to DevAIO!');
      }
    } finally {
      setLoading(false);
    }
  };

  const features = [
    '14-day free trial, no credit card',
    'Deploy AI Agents in minutes',
    'Cancel anytime',
    'Priority support included',
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-4xl glass-strong rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col lg:flex-row animate-slide-up">

        {/* Left Panel — Branding */}
        <div className="lg:w-5/12 bg-gradient-to-br from-indigo-900/80 via-purple-900/60 to-indigo-900/80 p-8 flex flex-col justify-between relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 dot-grid opacity-20" />
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-8">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl text-white">
                Dev<span className="gradient-text">AIO</span>
              </span>
            </div>

            <h2 className="font-heading text-2xl font-bold text-white mb-2">
              {activeTab === 'login' ? 'Welcome back! 👋' : 'Start for free today 🚀'}
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-8">
              {activeTab === 'login'
                ? 'Log back into your DevAIO dashboard and continue automating your business.'
                : 'Join 50,000+ businesses using DevAIO to automate, grow, and scale with AI.'}
            </p>

            {/* Feature List */}
            <ul className="space-y-3 hidden lg:block">
              {features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Stats */}
          <div className="relative z-10 hidden lg:grid grid-cols-2 gap-3 mt-8">
            {[
              { val: '50K+', label: 'Users' },
              { val: '99.9%', label: 'Uptime' },
              { val: '10M+', label: 'AI Tasks' },
              { val: '340%', label: 'Avg ROI' },
            ].map((s, i) => (
              <div key={i} className="glass rounded-xl p-3 text-center">
                <div className="gradient-text font-bold font-heading text-lg">{s.val}</div>
                <div className="text-slate-500 text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel — Form */}
        <div className="lg:w-7/12 p-8 flex flex-col justify-center" style={{ background: 'rgba(5,8,22,0.95)' }}>
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1.5 glass rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Tabs */}
          <div className="flex rounded-xl glass p-1 mb-8 w-full max-w-xs mx-auto">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'login'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'register'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Get Started
            </button>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-4 flex items-center gap-2.5 bg-green-500/10 border border-green-500/30 text-green-400 text-sm px-4 py-3 rounded-xl">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              {success}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name — Register only */}
            {activeTab === 'register' && (
              <div className="relative">
                <label className="text-slate-400 text-xs font-medium mb-1.5 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Smith"
                    required
                    className="w-full glass rounded-xl px-4 py-3 pl-10 text-sm text-slate-200 placeholder:text-slate-600 outline-none border border-transparent focus:border-indigo-500/50 transition-all duration-200"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="text-slate-400 text-xs font-medium mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="w-full glass rounded-xl px-4 py-3 pl-10 text-sm text-slate-200 placeholder:text-slate-600 outline-none border border-transparent focus:border-indigo-500/50 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-slate-400 text-xs font-medium mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full glass rounded-xl px-4 py-3 pl-10 pr-10 text-sm text-slate-200 placeholder:text-slate-600 outline-none border border-transparent focus:border-indigo-500/50 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password — Register only */}
            {activeTab === 'register' && (
              <div>
                <label className="text-slate-400 text-xs font-medium mb-1.5 block">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full glass rounded-xl px-4 py-3 pl-10 text-sm text-slate-200 placeholder:text-slate-600 outline-none border border-transparent focus:border-indigo-500/50 transition-all duration-200"
                  />
                </div>
              </div>
            )}

            {/* Forgot Password */}
            {activeTab === 'login' && (
              <div className="text-right">
                <button type="button" className="text-indigo-400 hover:text-indigo-300 text-xs transition-colors">
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3.5 text-sm font-semibold flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {activeTab === 'login' ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                <>
                  {activeTab === 'login' ? 'Sign In' : 'Create Free Account'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-px bg-white/5" />
              <span className="text-slate-600 text-xs">or</span>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            {/* Social Auth Placeholder */}
            <button
              type="button"
              className="w-full btn-secondary py-3 text-sm flex items-center justify-center gap-2"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            {/* Switch tab */}
            <p className="text-center text-slate-500 text-xs mt-2">
              {activeTab === 'login' ? (
                <>
                  Don&apos;t have an account?{' '}
                  <button type="button" onClick={() => setActiveTab('register')} className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                    Sign up free
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button type="button" onClick={() => setActiveTab('login')} className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                    Sign in
                  </button>
                </>
              )}
            </p>

            {activeTab === 'register' && (
              <p className="text-center text-slate-600 text-xs">
                By signing up you agree to our{' '}
                <a href="#" className="text-indigo-400 hover:underline">Terms</a>{' '}
                and{' '}
                <a href="#" className="text-indigo-400 hover:underline">Privacy Policy</a>.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
