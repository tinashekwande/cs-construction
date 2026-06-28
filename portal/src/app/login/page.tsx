// CS Construction Portal - Login & Demo Bypass Page (Light Theme & Animated Grid)
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { HardHat, Sparkles, Mail, Lock, ShieldCheck, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const { user, login, switchRole } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  useEffect(() => {
    // Initialize UnicornStudio WebGL
    const initUnicorn = () => {
      const win = window as any;
      if (win.UnicornStudio) {
        try {
          win.UnicornStudio.init();
        } catch (err) {
          console.error("UnicornStudio init failed", err);
        }
      }
    };
    initUnicorn();
    window.addEventListener('load', initUnicorn);
    return () => window.removeEventListener('load', initUnicorn);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    setError('');
    setLoading(true);
    
    const success = await login(email);
    if (success) {
      router.push('/dashboard');
    } else {
      setError('Invalid login credentials.');
      setLoading(false);
    }
  };

  const handleQuickLogin = async (demoEmail: string, demoRole: 'Super Admin' | 'Admin' | 'Editor' | 'Viewer') => {
    setLoading(true);
    setEmail(demoEmail);
    setPassword('••••••••');
    
    const success = await login(demoEmail);
    if (success) {
      switchRole(demoRole);
      router.push('/dashboard');
    } else {
      setError('Quick login failed.');
      setLoading(false);
    }
  };

  const demoAccounts = [
    { email: 'superadmin@cscon.co.za', label: 'Super Admin', desc: 'Full Access & Users Control', role: 'Super Admin' as const },
    { email: 'admin@cscon.co.za', label: 'Admin', desc: 'Content, Inquiries & Quotes Control', role: 'Admin' as const },
    { email: 'editor@cscon.co.za', label: 'Editor', desc: 'Manage Content & Portfolio Only', role: 'Editor' as const },
    { email: 'viewer@cscon.co.za', label: 'Viewer', desc: 'Read-only Access for Audits', role: 'Viewer' as const }
  ];

  return (
    <div className="min-h-screen w-screen flex flex-col md:flex-row bg-background text-foreground relative overflow-hidden font-sans transition-colors duration-300">
      
      {/* Unicorn Studio 3D WebGL background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30 dark:opacity-10" data-container-bg="true">
        <div data-us-project="N9XzvQXu7fA5SY2ewADJ" className="w-full h-full filter invert-[0.95] hue-rotate-180 brightness-[1.02] contrast-[0.95] dark:filter-none"></div>
      </div>

      {/* Dynamic Grid Overlay (matching the main site layout grid) */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none z-0"></div>

      {/* Left panel - Branding and Info */}
      <div className="flex-1 flex flex-col justify-between p-8 sm:p-12 md:p-16 relative z-10 bg-card/40 dark:bg-card/10 border-b md:border-b-0 md:border-r border-border backdrop-blur-md">
        <div className="flex items-center gap-3.5">
          <img 
            src="/company_logo.png" 
            alt="CS Construction Logo" 
            className="h-12 w-auto object-contain select-none" 
          />
          <div>
            <span className="font-extrabold tracking-wider text-sm block text-slate-900 dark:text-white">CS CONSTRUCTION</span>
            <span className="text-[9px] text-red-600 dark:text-red-400 font-bold tracking-widest block uppercase">Enterprise Portal</span>
          </div>
        </div>

        <div className="my-12 max-w-md">
          {/* Animated badge */}
          <div className="inline-flex gap-2 uppercase text-[9px] font-bold text-slate-600 dark:text-slate-400 tracking-widest bg-white dark:bg-slate-900 border-slate-250 dark:border-slate-800 border rounded-full mb-6 py-1 px-3 items-center shadow-sm select-none">
            <span>Staff Management Gateway</span>
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
            Building your vision,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-650 to-blue-600 dark:from-red-500 dark:to-blue-400">managing your spaces.</span>
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            Access the secure back-office admin system to manage website pages content, edit the team listings, review real-time analytics graphs, and administer client quote estimates.
          </p>
        </div>

        <div className="text-slate-400 dark:text-slate-500 text-xs flex items-center gap-2 select-none">
          <ShieldCheck size={14} className="text-red-500 dark:text-red-400" />
          <span>Secured Session Management & Role-Based Access Control</span>
        </div>
      </div>

      {/* Right panel - Form & Demo Switcher */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 relative z-10 overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          
          {/* Glass Form Card */}
          <div className="glass-panel p-8 rounded-2xl border border-border bg-card/75 dark:bg-card/45 relative shadow-2xl">
            <div className="space-y-2 mb-6">
              <h3 className="text-xl font-bold text-foreground">Sign In</h3>
              <p className="text-xs text-muted-foreground">Enter credentials or choose a quick login role bypass below.</p>
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-xs text-destructive font-medium mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground font-medium">Email Address</label>
                <div className="relative flex items-center">
                  <Mail size={16} className="absolute left-3 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-white dark:bg-slate-900 border border-border rounded-lg py-2.5 pl-10 pr-4 text-sm text-foreground placeholder-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground font-medium">Password</label>
                <div className="relative flex items-center">
                  <Lock size={16} className="absolute left-3 text-muted-foreground" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white dark:bg-slate-900 border border-border rounded-lg py-2.5 pl-10 pr-4 text-sm text-foreground placeholder-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                    disabled={loading}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm shadow-md hover:shadow-lg transition cursor-pointer"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span>Sign In to Portal</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick Access Demo Accounts Card */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-primary px-1 select-none">
              <Sparkles size={12} />
              <span>INTERACTIVE DEMO BYPASS BY ROLE</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {demoAccounts.map((acct) => (
                <button
                  key={acct.role}
                  onClick={() => handleQuickLogin(acct.email, acct.role)}
                  disabled={loading}
                  className="glass-panel text-left p-3.5 rounded-xl border border-border hover:border-primary/30 hover:bg-slate-100 dark:hover:bg-slate-900/50 bg-card/60 dark:bg-card/25 shadow-sm transition group flex flex-col justify-between h-24"
                >
                  <div>
                    <p className="font-bold text-xs text-foreground group-hover:text-primary transition">{acct.label}</p>
                    <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2 leading-relaxed">{acct.desc}</p>
                  </div>
                  <span className="text-[9px] text-muted-foreground/85 block truncate">{acct.email}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
