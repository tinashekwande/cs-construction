// CS Construction Portal - User Management & Access Control Page
'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/supabase';
import { Profile } from '@/lib/mockDb';
import GlassCard from '@/components/GlassCard';
import {
  ShieldAlert,
  Lock,
  UserCheck,
  CheckCircle,
  XCircle,
  HelpCircle,
  Save
} from 'lucide-react';

export default function UsersPage() {
  const { user, role, canManageUsers, canManageSettings } = useAuth();
  
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Buffers for changes
  const [roleEdits, setRoleEdits] = useState<{ [id: string]: Profile['role'] }>({});

  useEffect(() => {
    // Only load if Admin or Super Admin
    if (['Super Admin', 'Admin'].includes(role)) {
      loadProfiles();
    } else {
      setLoading(false);
    }
  }, [role]);

  const loadProfiles = async () => {
    try {
      const list = await db.profiles.list();
      setProfiles(list);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (id: string, newRole: Profile['role']) => {
    setRoleEdits(prev => ({
      ...prev,
      [id]: newRole
    }));
  };

  const handleSaveRole = async (profile: Profile) => {
    if (!canManageUsers) return;
    const nextRole = roleEdits[profile.id];
    if (!nextRole || nextRole === profile.role) return;

    const updated = {
      ...profile,
      role: nextRole
    };

    try {
      await db.profiles.save(updated, user?.email || 'admin');
      
      // Clear edits and reload
      setRoleEdits(prev => {
        const copy = { ...prev };
        delete copy[profile.id];
        return copy;
      });
      loadProfiles();
      alert(`User role for ${profile.email} updated to ${nextRole}`);
    } catch (err) {
      console.error(err);
      alert('Error updating user role.');
    }
  };

  // Role Permissions Matrix Configuration for UI Grid
  const permissionsMatrix = [
    { module: 'Dashboard Metrics', super: true, admin: true, editor: true, viewer: true },
    { module: 'Inquiries Inbox View', super: true, admin: true, editor: false, viewer: true },
    { module: 'Quotes Pipeline View', super: true, admin: true, editor: false, viewer: true },
    { module: 'CMS Content & Gallery CRUD', super: true, admin: true, editor: true, viewer: false },
    { module: 'Team Directory CRUD', super: true, admin: true, editor: true, viewer: false },
    { module: 'Send Inquiries Reply Emails', super: true, admin: true, editor: false, viewer: false },
    { module: 'Change Quotes Pipeline status', super: true, admin: true, editor: false, viewer: false },
    { module: 'User Role Administration', super: true, admin: false, editor: false, viewer: false },
    { module: 'Clear System Audit Logs', super: true, admin: false, editor: false, viewer: false }
  ];

  if (!['Super Admin', 'Admin'].includes(role)) {
    // RENDER ACCESS DENIED LOCK PAGE
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center max-w-md mx-auto select-none mt-12 bg-card border border-border rounded-2xl">
        <div className="p-4 bg-red-500/10 text-red-500 rounded-full border border-red-500/20 mb-4 animate-bounce">
          <Lock size={36} />
        </div>
        <h3 className="font-extrabold text-lg text-foreground">Security Bypass Alert</h3>
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
          Access Denied: The "User Access" management module requires <span className="text-primary font-bold">Admin</span> or <span className="text-primary font-bold">Super Admin</span> clearance.
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
      
      {/* Super Admin / Admin warning header */}
      {!canManageUsers && (
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl text-primary text-xs font-semibold flex items-center gap-2 select-none animate-pulse-slow">
          <Lock size={14} />
          <span>Admin Access Only: You can review settings and role permissions matrix, but only Super Admins can alter active user roles.</span>
        </div>
      )}

      {/* Grid: Left side user role dropdowns & Right side permissions matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* User Profiles Roles Management (col-span-2) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5 bg-card border border-border p-4 rounded-xl shadow-md">
            <UserCheck className="text-primary" size={20} />
            <div>
              <h3 className="font-bold text-sm text-foreground">System User Profiles</h3>
              <p className="text-[10px] text-muted-foreground">Total registered portal users: {profiles.length}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {profiles.map((profile) => {
              const currentEditRole = roleEdits[profile.id] || profile.role;
              const hasEdits = roleEdits[profile.id] !== undefined && roleEdits[profile.id] !== profile.role;
              const isSelf = profile.email === user?.email;

              return (
                <GlassCard key={profile.id} className="p-4 flex flex-col justify-between h-36">
                  <div className="flex justify-between items-start">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-850 dark:text-white truncate">{profile.full_name}</span>
                        {isSelf && (
                          <span className="bg-primary/10 text-primary text-[8px] font-bold px-1 py-0.5 rounded select-none shrink-0 border border-primary/15">YOU</span>
                        )}
                      </div>
                      <p className="text-[10px] text-muted-foreground truncate mt-1">{profile.email}</p>
                    </div>
                    
                    <span className="bg-slate-100 dark:bg-slate-900 border border-border text-slate-500 text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                      {profile.role}
                    </span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between gap-3">
                    <select
                      value={currentEditRole}
                      onChange={(e) => handleRoleChange(profile.id, e.target.value as any)}
                      className="bg-background border border-border rounded-lg py-1.5 px-3.5 text-xs outline-none focus:border-primary cursor-pointer font-semibold text-foreground"
                      disabled={!canManageUsers || isSelf}
                    >
                      <option value="Super Admin">Super Admin</option>
                      <option value="Admin">Admin</option>
                      <option value="Editor">Editor</option>
                      <option value="Viewer">Viewer</option>
                    </select>

                    {hasEdits && (
                      <button
                        onClick={() => handleSaveRole(profile)}
                        className="bg-primary hover:bg-primary-hover text-white font-bold py-1.5 px-3 rounded-lg text-[10px] shadow transition cursor-pointer flex items-center gap-1"
                      >
                        <Save size={12} />
                        <span>Save</span>
                      </button>
                    )}
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>

        {/* Permissions Matrix (col-span-3) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center gap-2 bg-card border border-border p-4 rounded-xl shadow-md select-none">
            <ShieldAlert className="text-primary" size={18} />
            <h4 className="font-bold text-xs text-foreground">System Role Permissions Matrix</h4>
          </div>

          <div className="glass-panel rounded-xl overflow-hidden border border-border">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/60 border-b border-border text-muted-foreground select-none font-semibold">
                  <th className="p-3 font-bold">Capability / Module</th>
                  <th className="p-3 font-bold text-center">Super</th>
                  <th className="p-3 font-bold text-center">Admin</th>
                  <th className="p-3 font-bold text-center">Editor</th>
                  <th className="p-3 font-bold text-center">Viewer</th>
                </tr>
              </thead>
              <tbody>
                {permissionsMatrix.map((row) => (
                  <tr key={row.module} className="border-b border-slate-100 dark:border-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-900/20 transition duration-150">
                    <td className="p-3 font-medium text-slate-700 dark:text-slate-300">{row.module}</td>
                    <td className="p-3 text-center">
                      {row.super ? <CheckCircle size={14} className="text-green-500 mx-auto" /> : <XCircle size={14} className="text-slate-600 mx-auto" />}
                    </td>
                    <td className="p-3 text-center">
                      {row.admin ? <CheckCircle size={14} className="text-green-500 mx-auto" /> : <XCircle size={14} className="text-slate-600 mx-auto" />}
                    </td>
                    <td className="p-3 text-center">
                      {row.editor ? <CheckCircle size={14} className="text-green-500 mx-auto" /> : <XCircle size={14} className="text-slate-600 mx-auto" />}
                    </td>
                    <td className="p-3 text-center">
                      {row.viewer ? <CheckCircle size={14} className="text-green-500 mx-auto" /> : <XCircle size={14} className="text-slate-600 mx-auto" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>

    </div>
  );
}
