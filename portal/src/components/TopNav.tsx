// CS Construction Portal - Top Navigation & Notifications Component
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/supabase';
import { Notification } from '../lib/mockDb';
import {
  Bell,
  Search,
  Sun,
  Moon,
  ChevronDown,
  LogOut,
  User,
  ShieldCheck,
  CheckCheck,
  Menu,
  Sparkles
} from 'lucide-react';

interface TopNavProps {
  onMobileMenuOpen: () => void;
  title?: string;
}

export const TopNav: React.FC<TopNavProps> = ({ onMobileMenuOpen, title }) => {
  const { user, role, switchRole, logout } = useAuth();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // Notifications state
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Theme initialization
    const savedTheme = localStorage.getItem('cscon_theme') || 'light';
    setTheme(savedTheme as any);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Notifications sync
    const loadNotifs = async () => {
      try {
        const list = await db.notifications.list();
        setNotifications(list);
      } catch (err) {
        console.error('Error fetching notifications', err);
      }
    };

    loadNotifs();
    const interval = setInterval(loadNotifs, 10000); // Check notifications every 10s

    // Close dropdowns on click outside
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      clearInterval(interval);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('cscon_theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await db.notifications.markAllRead();
      const list = await db.notifications.list();
      setNotifications(list);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNotifClick = async (id: string) => {
    try {
      await db.notifications.markRead(id);
      const list = await db.notifications.list();
      setNotifications(list);
    } catch (err) {
      console.error(err);
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const roles: ('Super Admin' | 'Admin' | 'Editor' | 'Viewer')[] = [
    'Super Admin',
    'Admin',
    'Editor',
    'Viewer'
  ];

  return (
    <header className="h-16 border-b border-border bg-card/75 dark:bg-card/45 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-6 transition-colors duration-200">
      {/* Mobile Hamburger & Page Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMobileMenuOpen}
          className="md:hidden p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition"
        >
          <Menu size={20} />
        </button>
        {title && (
          <h1 className="font-bold text-lg text-foreground select-none">
            {title}
          </h1>
        )}
      </div>

      {/* Global Actions */}
      <div className="flex items-center gap-4">
        {/* Search Box */}
        <div className="hidden lg:flex items-center gap-2 bg-slate-100 dark:bg-slate-900 border border-border px-3 py-1.5 rounded-lg text-slate-400 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition max-w-xs">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search documents, logs..."
            className="bg-transparent border-none outline-none text-xs text-foreground placeholder-slate-400 w-44"
          />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications Center */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition relative"
            title="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4.5 h-4.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white dark:border-slate-950">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {notifDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 glass-panel rounded-xl shadow-2xl border border-border bg-card p-2 z-50 animate-fade-in">
              <div className="flex items-center justify-between p-3 border-b border-border">
                <span className="font-bold text-sm text-foreground">Notifications</span>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-xs text-primary hover:text-primary-hover font-semibold flex items-center gap-1"
                  >
                    <CheckCheck size={12} />
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto py-1.5">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground text-xs">
                    No notifications to display
                  </div>
                ) : (
                  notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => handleNotifClick(n.id)}
                      className={`p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900/60 cursor-pointer transition flex flex-col gap-1 border-l-2
                        ${n.is_read ? 'border-transparent opacity-60' : 'border-primary dark:border-primary/80 bg-primary/[0.02]'}
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-foreground">{n.title}</span>
                        <span className="text-[10px] text-muted-foreground">{new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown & Demo Bypass */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-900 p-1.5 rounded-lg transition"
          >
            <div className="w-8 h-8 rounded-full bg-slate-250 dark:bg-slate-800 border border-border flex items-center justify-center font-bold text-primary uppercase select-none text-xs">
              {user?.full_name ? user.full_name.substring(0, 2) : 'US'}
            </div>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {/* Profile Dropdown Menu */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 glass-panel rounded-xl shadow-2xl border border-border bg-card p-2 z-50 animate-fade-in">
              <div className="p-3 border-b border-border">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Logged in as</p>
                <p className="font-semibold text-sm text-foreground truncate">{user?.full_name}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>

              {/* Demo Bypass Role Switcher */}
              <div className="p-3 border-b border-border bg-primary/[0.02] rounded-lg my-1.5">
                <p className="text-[10px] font-bold text-primary flex items-center gap-1 select-none mb-2">
                  <Sparkles size={10} />
                  DEMO ROLE SWITCHER
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {roles.map(r => (
                    <button
                      key={r}
                      onClick={() => switchRole(r)}
                      className={`text-[10px] py-1.5 px-2 rounded font-medium border text-center transition
                        ${role === r
                          ? 'bg-primary text-white border-primary font-bold shadow-sm shadow-primary/10'
                          : 'bg-card border-border text-foreground hover:bg-slate-100 dark:hover:bg-slate-900'
                        }
                      `}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="py-1">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition"
                >
                  <LogOut size={14} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNav;
