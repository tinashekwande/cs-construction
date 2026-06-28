// CS Construction Portal - Sidebar Component
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/supabase';
import {
  LayoutDashboard,
  Globe,
  Users,
  ClipboardList,
  MessageSquare,
  Briefcase,
  Image as ImageIcon,
  ShieldAlert,
  History,
  LogOut,
  ChevronLeft,
  ChevronRight,
  HardHat,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  onToggleCollapse?: (collapsed: boolean) => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onToggleCollapse,
  mobileOpen = false,
  onMobileClose
}) => {
  const pathname = usePathname();
  const { user, role, logout } = useAuth();
  
  const [collapsed, setCollapsed] = useState(false);
  const [counts, setCounts] = useState({ quotes: 0, inquiries: 0 });

  useEffect(() => {
    // Fetch count of pending quotes & inquiries for badge numbers
    const loadCounts = async () => {
      try {
        const quotes = await db.quotes.list();
        const pendingQuotes = quotes.filter(q => q.status === 'New Requests').length;

        const inquiries = await db.inquiries.list();
        const pendingInquiries = inquiries.filter(i => i.status === 'New').length;

        setCounts({ quotes: pendingQuotes, inquiries: pendingInquiries });
      } catch (err) {
        console.error('Error fetching badges counts', err);
      }
    };

    loadCounts();
    // Refresh counts every 30 seconds
    const interval = setInterval(loadCounts, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleCollapseToggle = () => {
    const nextState = !collapsed;
    setCollapsed(nextState);
    if (onToggleCollapse) onToggleCollapse(nextState);
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Website CMS', path: '/cms', icon: Globe },
    { name: 'Team Directory', path: '/team', icon: Users },
    { name: 'Quote Requests', path: '/quotes', icon: ClipboardList, badge: counts.quotes },
    { name: 'Inbox Inquiries', path: '/inquiries', icon: MessageSquare, badge: counts.inquiries },
    { name: 'Project Portfolio', path: '/portfolio', icon: Briefcase },
    { name: 'Media Library', path: '/media', icon: ImageIcon },
    { name: 'User Access', path: '/users', icon: ShieldAlert, adminOnly: true },
    { name: 'Activity Log', path: '/activity', icon: History, adminOnly: true }
  ];

  const filteredItems = navItems.filter(item => {
    if (item.adminOnly) {
      return ['Super Admin', 'Admin'].includes(role);
    }
    return true;
  });

  const sidebarWidthClass = collapsed ? 'w-20' : 'w-64';

  const renderContent = () => (
    <div className="flex flex-col h-full bg-card text-foreground relative">
      {/* Brand Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-3.5 select-none">
          <div className="shrink-0 flex items-center justify-center">
            <img 
              src="/company_logo.png" 
              alt="CS Construction Logo" 
              className={collapsed ? "h-7 w-auto object-contain" : "h-10 w-auto object-contain"} 
            />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-extrabold tracking-wider text-sm text-foreground">CS CONSTRUCTION</span>
              <span className="text-[9px] text-primary font-bold tracking-widest">PORTAL SYSTEM</span>
            </div>
          )}
        </Link>
        {onMobileClose && (
          <button onClick={onMobileClose} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg text-muted-foreground hover:text-foreground transition">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Navigation List */}
      <nav className="flex-grow py-6 px-3 space-y-1.5 overflow-y-auto">
        {filteredItems.map(item => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.path}
              onClick={onMobileClose}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-150 group relative
                ${isActive
                  ? 'bg-primary text-white font-semibold shadow-md shadow-primary/10'
                  : 'text-muted-foreground hover:bg-slate-100 hover:text-foreground dark:hover:bg-slate-800/60 dark:hover:text-foreground'
                }
              `}
              title={collapsed ? item.name : undefined}
            >
              <Icon size={20} className={`shrink-0 ${isActive ? 'text-white' : 'text-muted-foreground group-hover:text-foreground'}`} />
              
              {!collapsed && (
                <span className="text-sm truncate flex-grow">{item.name}</span>
              )}

              {/* Badge */}
              {item.badge && item.badge > 0 ? (
                collapsed ? (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-slate-950">
                    {item.badge}
                  </span>
                ) : (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold
                    ${isActive ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'}
                  `}>
                    {item.badge}
                  </span>
                )
              ) : null}
            </Link>
          );
        })}
      </nav>

      {/* User Session Info */}
      <div className="p-4 border-t border-border bg-slate-50/50 dark:bg-slate-900/60 shrink-0">
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 border border-border flex items-center justify-center font-bold text-primary shrink-0 uppercase select-none">
            {user?.full_name ? user.full_name.substring(0, 2) : 'US'}
          </div>
          
          {!collapsed && (
            <div className="flex-grow min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{user?.full_name || 'Admin User'}</p>
              <p className="text-xs text-primary/90 font-medium tracking-wide truncate">{role}</p>
            </div>
          )}
        </div>

        {/* Action button */}
        {!collapsed ? (
          <button
            onClick={logout}
            className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-slate-100/55 dark:bg-slate-900/60 hover:bg-red-50 dark:hover:bg-red-950/20 text-muted-foreground hover:text-red-500 dark:hover:text-red-400 text-xs font-semibold border border-border hover:border-red-500/20 dark:hover:border-red-900/30 transition-all duration-150"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        ) : (
          <button
            onClick={logout}
            className="mt-4 w-full flex items-center justify-center py-2 text-muted-foreground hover:text-red-500 transition"
            title="Sign Out"
          >
            <LogOut size={18} />
          </button>
        )}
      </div>

      {/* Toggle Collapse Desktop button */}
      <button
        onClick={handleCollapseToggle}
        className="hidden md:flex absolute top-1/2 -right-3.5 transform -translate-y-1/2 w-7 h-7 bg-primary text-white border border-border rounded-full items-center justify-center cursor-pointer shadow-md shadow-primary/15 hover:bg-primary-hover transition z-50"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar wrapper */}
      <aside className={`hidden md:block ${sidebarWidthClass} transition-all duration-300 ease-in-out h-screen shrink-0 border-r border-border z-40 relative`}>
        {renderContent()}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Overlay backdrop */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onMobileClose}></div>
          
          {/* Drawer content panel */}
          <div className="relative w-64 max-w-xs h-full animate-slide-in">
            {renderContent()}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
