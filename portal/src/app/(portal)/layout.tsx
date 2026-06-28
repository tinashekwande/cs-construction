// CS Construction Portal - Portal Main Layout (Sidebar + TopNav + Router Gate)
'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import TopNav from '@/components/TopNav';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

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

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background text-foreground transition-colors duration-200">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Loading Session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  // Get current section label for page header
  const getPageTitle = () => {
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length === 0) return 'Dashboard';
    const segment = parts[0];
    switch (segment) {
      case 'dashboard': return 'Dashboard Overview';
      case 'cms': return 'Website CMS Manager';
      case 'team': return 'Team Directory Manager';
      case 'quotes': return 'Quote Requests Pipeline';
      case 'inquiries': return 'Customer Inquiries Inbox';
      case 'portfolio': return 'Project Portfolio Manager';
      case 'media': return 'Media Library';
      case 'users': return 'User Access Settings';
      case 'activity': return 'Audit Logs & Activity';
      default: return segment.charAt(0).toUpperCase() + segment.slice(1);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground transition-colors duration-200 relative">
      
      {/* Unicorn Studio 3D WebGL background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30 dark:opacity-10" data-container-bg="true">
        <div data-us-project="N9XzvQXu7fA5SY2ewADJ" className="w-full h-full filter invert-[0.95] hue-rotate-180 brightness-[1.02] contrast-[0.95] dark:filter-none"></div>
      </div>

      {/* Sidebar Navigation */}
      <Sidebar
        onToggleCollapse={(collapsed) => setSidebarCollapsed(collapsed)}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      {/* Viewport Frame */}
      <div className="flex flex-col flex-grow min-w-0 h-full overflow-hidden relative z-10">
        {/* Top bar header */}
        <TopNav
          onMobileMenuOpen={() => setMobileSidebarOpen(true)}
          title={getPageTitle()}
        />

        {/* Scrollable container for page content */}
        <main className="flex-grow overflow-y-auto p-4 sm:p-6 relative">
          {/* Fine subtle overlay layout grid */}
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none z-0"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
