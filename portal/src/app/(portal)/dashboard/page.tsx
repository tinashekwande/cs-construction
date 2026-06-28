// CS Construction Portal - Dashboard Overview Page
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/supabase';
import { Quote, Inquiry, Project, TeamMember, ActivityLog } from '@/lib/mockDb';
import GlassCard from '@/components/GlassCard';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import {
  FileText,
  MessageSquare,
  Building,
  Users,
  Clock,
  ArrowRight,
  TrendingUp,
  Globe,
  Plus,
  ArrowUpRight,
  Calculator
} from 'lucide-react';

export default function DashboardPage() {
  const { user, role, canManageContent, canManageQuotes } = useAuth();
  const router = useRouter();
  
  // Dashboard state data
  const [stats, setStats] = useState({
    quotesCount: 0,
    inquiriesCount: 0,
    projectsCount: 0,
    teamCount: 0,
    pendingQuotes: 0,
    newInquiries: 0
  });

  const [recentLogs, setRecentLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  // Hardcoded premium analytics values
  const conversionRate = "18.4%";
  const totalVisits = "4,290";
  
  // Chart datasets
  const inquiryTrendData = [
    { name: 'Jan', value: 12 },
    { name: 'Feb', value: 19 },
    { name: 'Mar', value: 15 },
    { name: 'Apr', value: 27 },
    { name: 'May', value: 34 },
    { name: 'Jun', value: 48 }
  ];

  const trafficSourceData = [
    { name: 'Organic Search', value: 2150, color: '#aa0000' },
    { name: 'Direct Traffic', value: 1240, color: '#048cd8' },
    { name: 'Social Media', value: 620, color: '#475569' },
    { name: 'Referral Link', value: 280, color: '#94a3b8' }
  ];

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const quotes = await db.quotes.list();
        const inquiries = await db.inquiries.list();
        const projects = await db.projects.list();
        const team = await db.team.list();
        const logs = await db.logs.list();

        setStats({
          quotesCount: quotes.length,
          inquiriesCount: inquiries.length,
          projectsCount: projects.length,
          teamCount: team.length,
          pendingQuotes: quotes.filter(q => q.status === 'New Requests').length,
          newInquiries: inquiries.filter(i => i.status === 'New').length
        });

        setRecentLogs(logs.slice(0, 5));
      } catch (err) {
        console.error('Error loading dashboard data', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleSimulateInquiry = async () => {
    // Quick action: simulate website activity
    const mockInquiriesList = [
      {
        sender_name: 'Trevor Jones',
        email: 'trevor@jonesroofs.co.za',
        phone: '+27 (82) 555-3212',
        subject: 'Plastering Subcontracting Quote',
        message: 'Could you give us a plastering estimate for a 150m² concrete ceiling in Camps Bay?'
      },
      {
        sender_name: 'Alice Cooper',
        email: 'alice@cooperdesign.com',
        phone: '+27 (71) 555-8822',
        subject: 'Kitchen Renovation Collaboration',
        message: 'Interested in partnering with CS Construction for custom oak joinery fabrication.'
      }
    ];

    const randomInq = mockInquiriesList[Math.floor(Math.random() * mockInquiriesList.length)];
    const newInquiry: Inquiry = {
      id: Math.random().toString(36).substring(2, 9),
      sender_name: randomInq.sender_name,
      email: randomInq.email,
      phone: randomInq.phone,
      subject: randomInq.subject,
      message: randomInq.message,
      status: 'New',
      conversation_history: [],
      created_at: new Date().toISOString()
    };

    await db.inquiries.save(newInquiry, 'system');
    
    // Refresh stats
    const quotes = await db.quotes.list();
    const inquiries = await db.inquiries.list();
    const logs = await db.logs.list();
    
    setStats(prev => ({
      ...prev,
      inquiriesCount: inquiries.length,
      newInquiries: inquiries.filter(i => i.status === 'New').length
    }));
    setRecentLogs(logs.slice(0, 5));
  };

  const handlePublishAllDrafts = async () => {
    if (!canManageContent) {
      alert('Access Denied: Editor clearance level or higher required.');
      return;
    }
    const cmsList = await db.cms.list();
    cmsList.forEach(async (page) => {
      if (page.status === 'draft') {
        await db.cms.save(page.id, { status: 'published' }, user?.email || 'admin');
      }
    });
    
    alert('All website sections successfully published!');
    const logs = await db.logs.list();
    setRecentLogs(logs.slice(0, 5));
  };

  const widgetsList = [
    { label: 'Total Quotes', val: stats.quotesCount, tag: `${stats.pendingQuotes} pending`, color: 'border-l-primary', icon: FileText, route: '/quotes' },
    { label: 'New Inquiries', val: stats.inquiriesCount, tag: `${stats.newInquiries} unread`, color: 'border-l-accent', icon: MessageSquare, route: '/inquiries' },
    { label: 'Active Projects', val: stats.projectsCount, tag: 'In Portfolio', color: 'border-l-slate-400 dark:border-l-slate-500', icon: Building, route: '/portfolio' },
    { label: 'Team Members', val: stats.teamCount, tag: 'Staff Directory', color: 'border-l-accent', icon: Users, route: '/team' }
  ];

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <span className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header bar welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-card/80 to-slate-100 dark:from-slate-900 dark:to-slate-950 p-6 rounded-2xl border border-border dark:border-slate-900 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-15"></div>
        <div className="relative z-10">
          <p className="text-primary text-xs font-bold uppercase tracking-widest">CS Construction Portal</p>
          <h2 className="text-2xl font-bold text-foreground mt-1">Welcome back, {user?.full_name}!</h2>
          <p className="text-xs text-muted-foreground mt-1">Logged in with security clearance level: <span className="text-primary font-semibold">{role}</span></p>
        </div>
        
        {/* Quick Simulated Actions */}
        <div className="flex flex-wrap gap-2.5 relative z-10">
          <button
            onClick={handleSimulateInquiry}
            className="bg-card hover:bg-slate-100 dark:hover:bg-slate-900 text-foreground border border-border text-xs font-semibold py-2 px-3.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer"
            title="Simulate a client inquiry message from contact page"
          >
            <Plus size={14} className="text-primary" />
            <span>Simulate Website Inquiry</span>
          </button>
          
          {canManageContent && (
            <button
              onClick={handlePublishAllDrafts}
              className="bg-primary hover:bg-primary-hover text-white text-xs font-bold py-2 px-3.5 rounded-lg flex items-center gap-1.5 shadow-md shadow-primary/10 transition cursor-pointer"
            >
              <Globe size={14} />
              <span>Publish Site Changes</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Stats Widgets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {widgetsList.map((w) => {
          const Icon = w.icon;
          return (
            <GlassCard
              key={w.label}
              accent
              accentColor={w.color}
              hoverable
              onClick={() => router.push(w.route)}
              className="cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{w.label}</p>
                  <p className="text-3xl font-extrabold text-slate-800 dark:text-white mt-2 tracking-tight">{w.val}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-primary group-hover:text-white transition duration-300">
                  <Icon size={20} />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-primary group-hover:text-primary-hover transition">
                <span>{w.tag}</span>
                <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition duration-300" />
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Analytics Charts & Activity log columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Inquiry Trends Graph */}
        <GlassCard className="lg:col-span-2 flex flex-col justify-between min-h-[350px]">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-900 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-primary" />
              <h3 className="font-bold text-sm text-slate-800 dark:text-white">Monthly Inquiry Trends</h3>
            </div>
            <span className="text-[10px] bg-primary/10 text-primary font-semibold px-2 py-0.5 rounded">Real-Time Insights</span>
          </div>

          <div className="w-full h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={inquiryTrendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#aa0000" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#aa0000" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                  labelStyle={{ color: 'var(--foreground)', fontSize: '11px', fontWeight: 'bold' }}
                  itemStyle={{ color: 'var(--primary)', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="value" stroke="#aa0000" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100 dark:border-slate-900 text-xs text-slate-400">
            <p>Conversion Success Rate: <span className="font-bold text-primary">{conversionRate}</span></p>
            <p>Visits: <span className="font-bold text-slate-700 dark:text-white">{totalVisits}</span></p>
          </div>
        </GlassCard>

        {/* Traffic Sources Pie Chart */}
        <GlassCard className="flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-900 pb-3">
            <h3 className="font-bold text-sm text-slate-800 dark:text-white">Traffic Sources</h3>
            <span className="text-[10px] text-slate-400">Last 30 days</span>
          </div>

          <div className="w-full h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficSourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {trafficSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px', fontSize: '11px' }}
                  itemStyle={{ color: 'var(--foreground)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 mt-2">
            {trafficSourceData.map((source) => (
              <div key={source.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: source.color }}></span>
                  <span className="text-slate-500 dark:text-slate-400">{source.name}</span>
                </div>
                <span className="font-bold text-slate-700 dark:text-white">{(source.value / 42.9).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Recent Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Activity Log */}
        <GlassCard className="lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-900 pb-3">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-primary" />
                <h3 className="font-bold text-sm text-slate-800 dark:text-white">Recent Security & Audit Logs</h3>
              </div>
              {role === 'Super Admin' && (
                <Link href="/activity" className="text-xs text-primary hover:text-primary-hover font-semibold flex items-center gap-0.5">
                  <span>View all logs</span>
                  <ArrowUpRight size={14} />
                </Link>
              )}
            </div>

            <div className="space-y-3">
              {recentLogs.map((log) => (
                <div key={log.id} className="p-3 bg-slate-100 dark:bg-slate-900/40 rounded-xl border border-slate-200/50 dark:border-slate-900/60 flex items-start justify-between gap-3 text-xs">
                  <div className="flex-grow min-w-0">
                    <p className="font-semibold text-slate-800 dark:text-white">{log.action}</p>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mt-1 select-none">
                      <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-[10px] font-semibold">{log.module}</span>
                      <span>•</span>
                      <span>By {log.user_email}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0 font-medium">{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Quick actions panel */}
        <GlassCard className="flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-900 pb-3">
              <h3 className="font-bold text-sm text-slate-800 dark:text-white">Workflow Shortcuts</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-2.5">
              {canManageQuotes && (
                <button
                  onClick={() => router.push('/quotes')}
                  className="p-3.5 bg-card hover:bg-slate-50 dark:hover:bg-slate-900 border border-border hover:border-primary/30 rounded-xl transition text-left flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary text-white rounded-lg shadow-sm">
                      <Calculator size={16} />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-foreground">Review Quotes</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Approve or reject projects</p>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition" />
                </button>
              )}

              <button
                onClick={() => router.push('/cms')}
                className="p-3.5 bg-card hover:bg-slate-50 dark:hover:bg-slate-900 border border-border hover:border-primary/30 rounded-xl transition text-left flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent text-white rounded-lg">
                    <Globe size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-xs text-foreground">CMS Web Editor</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Manage home or about page</p>
                  </div>
                </div>
                <ArrowRight size={14} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition" />
              </button>

              <button
                onClick={() => router.push('/portfolio')}
                className="p-3.5 bg-card hover:bg-slate-50 dark:hover:bg-slate-900 border border-border hover:border-primary/30 rounded-xl transition text-left flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-border rounded-lg">
                    <Building size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-xs text-foreground">Portfolio Works</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Add completed projects</p>
                  </div>
                </div>
                <ArrowRight size={14} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition" />
              </button>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-xl p-3 text-[10px] text-muted-foreground leading-relaxed mt-4">
            <span className="font-bold text-foreground">Quick Notice:</span> All modifications are tracked automatically under your account handle for audit logs security compliance.
          </div>
        </GlassCard>
      </div>

    </div>
  );
}
