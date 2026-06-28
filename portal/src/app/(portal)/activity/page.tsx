// CS Construction Portal - Activity Audit Logging Page
'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/supabase';
import { ActivityLog } from '@/lib/mockDb';
import GlassCard from '@/components/GlassCard';
import {
  History,
  Search,
  SlidersHorizontal,
  Download,
  Trash2,
  Lock,
  Calendar,
  Layers
} from 'lucide-react';

export default function ActivityPage() {
  const { role, canManageSettings } = useAuth(); // Super Admin has settings permission
  
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [moduleFilter, setModuleFilter] = useState('All');

  useEffect(() => {
    // Only load for Super Admin & Admin
    if (['Super Admin', 'Admin'].includes(role)) {
      loadLogs();
    } else {
      setLoading(false);
    }
  }, [role]);

  const loadLogs = async () => {
    try {
      const list = await db.logs.list();
      setLogs(list);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearLogs = async () => {
    if (!canManageSettings) return;
    if (confirm('Are you absolutely sure you want to permanently clear all audit logs? This action is irreversible.')) {
      try {
        // Clear in mock storage
        localStorage.setItem('cscon_db_logs', JSON.stringify([]));
        loadLogs();
        alert('All activity logs have been cleared.');
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleExport = (type: 'csv' | 'json') => {
    if (type === 'json') {
      const blob = new Blob([JSON.stringify(filteredLogs, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cscon_audit_logs_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
    } else {
      // Export CSV
      const headers = ['ID', 'User', 'Action', 'Module', 'IP Address', 'Timestamp'];
      const rows = filteredLogs.map(l => [
        l.id,
        l.user_email,
        `"${l.action.replace(/"/g, '""')}"`,
        l.module,
        l.ip_address,
        l.timestamp
      ]);
      const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cscon_audit_logs_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
    }
  };

  const modules = ['All', 'Auth', 'Quotes', 'Inquiries', 'Team', 'Portfolio', 'CMS', 'Media', 'User Management'];

  const filteredLogs = logs.filter(l => {
    const matchesModule = moduleFilter === 'All' || l.module === moduleFilter;
    const matchesSearch = l.user_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.module.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesModule && matchesSearch;
  });

  if (!['Super Admin', 'Admin'].includes(role)) {
    // RENDER ACCESS DENIED LOCK PAGE
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center max-w-md mx-auto select-none mt-12 bg-card border border-border rounded-2xl">
        <div className="p-4 bg-red-500/10 text-red-500 rounded-full border border-red-500/20 mb-4 animate-bounce">
          <Lock size={36} />
        </div>
        <h3 className="font-extrabold text-lg text-foreground">Security Bypass Alert</h3>
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
          Access Denied: The "Activity Audit Logs" database module requires <span className="text-primary font-bold">Admin</span> or <span className="text-primary font-bold">Super Admin</span> clearance.
        </p>
        <div className="bg-background p-3 rounded-lg text-[10px] text-muted-foreground leading-relaxed mt-4 w-full">
          Use the <span className="font-bold text-primary">Demo Role Switcher</span> in the top-right profile dropdown to upgrade your clearance level.
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <span className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Title & Filters bar */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 bg-card border border-border p-4 rounded-xl shadow-md">
        
        {/* Title */}
        <div className="flex items-center gap-2.5 select-none">
          <History className="text-primary" size={20} />
          <div>
            <h3 className="font-bold text-sm text-foreground">System Audit logs</h3>
            <p className="text-[10px] text-muted-foreground">Security event logging system • {filteredLogs.length} events logged</p>
          </div>
        </div>

        {/* Actions & Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search box */}
          <div className="flex items-center gap-2 bg-background border border-border px-3 py-1.5 rounded-lg text-muted-foreground focus-within:border-primary transition text-xs select-none">
            <Search size={14} />
            <input
              type="text"
              placeholder="Search user, actions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-foreground placeholder-muted w-40 sm:w-48"
            />
          </div>

          {/* Module filter */}
          <div className="flex items-center gap-2 bg-background border border-border px-3 py-1.5 rounded-lg text-muted-foreground text-xs">
            <Layers size={14} />
            <select
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
              className="bg-transparent border-none outline-none text-foreground cursor-pointer"
            >
              {modules.map(m => (
                <option key={m} value={m} className="bg-card text-foreground">{m}</option>
              ))}
            </select>
          </div>

          {/* Export button dropdown */}
          <button
            onClick={() => handleExport('csv')}
            className="bg-card hover:bg-slate-100 dark:hover:bg-slate-800 border border-border text-foreground py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer select-none"
          >
            <Download size={13} className="text-primary" />
            <span>Export CSV</span>
          </button>

          {/* Clear logs */}
          {canManageSettings && (
            <button
              onClick={handleClearLogs}
              className="bg-red-950/40 text-red-400 hover:bg-red-900/40 border border-red-900/40 py-1.5 px-3 rounded-lg text-xs font-semibold transition flex items-center gap-1 cursor-pointer select-none"
            >
              <Trash2 size={13} />
              <span>Clear Logs</span>
            </button>
          )}
        </div>

      </div>

      {/* Audit Logs Table Panel */}
      <GlassCard className="p-0 overflow-hidden">
        
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/60 border-b border-border text-muted-foreground select-none font-semibold">
                <th className="p-4 font-bold">User Email</th>
                <th className="p-4 font-bold">Logged Action Description</th>
                <th className="p-4 font-bold text-center">Module</th>
                <th className="p-4 font-bold text-center">IP Address</th>
                <th className="p-4 font-bold">Timestamp Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-muted-foreground font-semibold border-b border-border">
                    No activity audit logs matches filter query.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="border-b border-border hover:bg-slate-100 dark:hover:bg-slate-900/20 transition duration-150">
                    <td className="p-4 font-bold text-slate-800 dark:text-slate-200 select-all">{log.user_email}</td>
                    <td className="p-4 font-medium text-slate-650 dark:text-slate-300">{log.action}</td>
                    <td className="p-4 text-center">
                      <span className="bg-primary/10 text-primary dark:text-primary/90 px-2 py-0.5 rounded font-extrabold text-[9px] select-none uppercase tracking-wide">
                        {log.module}
                      </span>
                    </td>
                    <td className="p-4 text-center text-slate-500 font-medium select-all">{log.ip_address}</td>
                    <td className="p-4 text-slate-400 select-none">
                      <div className="flex flex-col">
                        <span>{new Date(log.timestamp).toLocaleDateString()}</span>
                        <span className="text-[9px] mt-0.5">{new Date(log.timestamp).toLocaleTimeString()}</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </GlassCard>

    </div>
  );
}
