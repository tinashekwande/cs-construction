// CS Construction Portal - Authentication Context & Hooks
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '../lib/supabase';
import { Profile } from '../lib/mockDb';

interface AuthContextType {
  user: { email: string; full_name: string } | null;
  role: 'Super Admin' | 'Admin' | 'Editor' | 'Viewer';
  loading: boolean;
  login: (email: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (newRole: 'Super Admin' | 'Admin' | 'Editor' | 'Viewer') => void;
  // Permissions helpers
  canManageContent: boolean; // Home, About, Services, Projects
  canManageTeam: boolean; // Add, edit, delete, reorder team
  canManageQuotes: boolean; // View, change status, add internal notes, delete
  canManageInquiries: boolean; // View, mark read, reply, delete
  canManageSettings: boolean; // System preferences
  canManageUsers: boolean; // Edit user roles
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ email: string; full_name: string } | null>(null);
  const [role, setRole] = useState<'Super Admin' | 'Admin' | 'Editor' | 'Viewer'>('Viewer');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user session exists in localStorage
    const savedUser = localStorage.getItem('cscon_auth_user');
    const savedRole = localStorage.getItem('cscon_auth_role');
    
    if (savedUser && savedRole) {
      setUser(JSON.parse(savedUser));
      setRole(savedRole as any);
    }
    setLoading(false);
  }, []);

  const login = async (email: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Find matching mock profile
      const profilesList = await db.profiles.list();
      const matched = profilesList.find(p => p.email.toLowerCase() === email.toLowerCase());

      if (matched) {
        const userData = { email: matched.email, full_name: matched.full_name || 'User' };
        setUser(userData);
        setRole(matched.role);
        
        localStorage.setItem('cscon_auth_user', JSON.stringify(userData));
        localStorage.setItem('cscon_auth_role', matched.role);
        
        await db.logs.log(matched.email, 'User logged into management portal successfully', 'Auth');
        setLoading(false);
        return true;
      }
      
      // If no matched email, let's create a temporary Viewer account
      const tempUser = { email, full_name: email.split('@')[0] };
      setUser(tempUser);
      setRole('Viewer');
      
      localStorage.setItem('cscon_auth_user', JSON.stringify(tempUser));
      localStorage.setItem('cscon_auth_role', 'Viewer');
      
      await db.logs.log(email, 'New visitor logged in as temporary Viewer', 'Auth');
      setLoading(false);
      return true;
    } catch (err) {
      console.error(err);
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    if (user) {
      db.logs.log(user.email, 'User logged out of management portal', 'Auth');
    }
    setUser(null);
    setRole('Viewer');
    localStorage.removeItem('cscon_auth_user');
    localStorage.removeItem('cscon_auth_role');
    router.push('/login');
  };

  const switchRole = (newRole: 'Super Admin' | 'Admin' | 'Editor' | 'Viewer') => {
    setRole(newRole);
    localStorage.setItem('cscon_auth_role', newRole);
    if (user) {
      db.logs.log(user.email, `Switched session view role to ${newRole} (Bypass Mode)`, 'Auth');
    }
  };

  // Define authorization permissions
  const canManageContent = ['Super Admin', 'Admin', 'Editor'].includes(role);
  const canManageTeam = ['Super Admin', 'Admin', 'Editor'].includes(role);
  const canManageQuotes = ['Super Admin', 'Admin'].includes(role);
  const canManageInquiries = ['Super Admin', 'Admin'].includes(role);
  const canManageSettings = ['Super Admin'].includes(role);
  const canManageUsers = ['Super Admin'].includes(role);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        login,
        logout,
        switchRole,
        canManageContent,
        canManageTeam,
        canManageQuotes,
        canManageInquiries,
        canManageSettings,
        canManageUsers
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
