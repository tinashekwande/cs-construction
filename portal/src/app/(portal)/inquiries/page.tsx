// CS Construction Portal - customer Inquiries inbox Page
'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/supabase';
import { Inquiry } from '@/lib/mockDb';
import GlassCard from '@/components/GlassCard';
import {
  MessageSquare,
  Search,
  Mail,
  Phone,
  Calendar,
  Send,
  Trash2,
  Lock,
  X,
  Reply,
  CheckCircle,
  Clock,
  ArrowRight,
  BookOpenCheck
} from 'lucide-react';

export default function InquiriesPage() {
  const { user, role, canManageInquiries } = useAuth();
  
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatusTab, setSelectedStatusTab] = useState<Inquiry['status']>('New');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Detail thread state
  const [selectedInq, setSelectedInq] = useState<Inquiry | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replying, setReplying] = useState(false);

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    try {
      const list = await db.inquiries.list();
      setInquiries(list);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDetail = async (inq: Inquiry) => {
    setSelectedInq(inq);
    setReplyText('');
    
    // Automatically mark as read if new
    if (inq.status === 'New' && canManageInquiries) {
      const updated = { ...inq, status: 'Read' as const };
      try {
        await db.inquiries.save(updated, user?.email || 'admin');
        loadInquiries();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInq || !replyText.trim() || !canManageInquiries) return;
    setReplying(true);

    try {
      await db.inquiries.reply(selectedInq.id, replyText, user?.email || 'admin');
      setReplyText('');
      
      // Reload details & listing
      const list = await db.inquiries.list();
      setInquiries(list);
      const updated = list.find(i => i.id === selectedInq.id);
      if (updated) setSelectedInq(updated);
      
      alert('Reply sent successfully! Conversation history updated.');
    } catch (err) {
      console.error(err);
      alert('Error sending reply.');
    } finally {
      setReplying(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!canManageInquiries) return;
    if (confirm('Are you sure you want to permanently delete this message inquiry?')) {
      try {
        await db.inquiries.delete(id, user?.email || 'admin');
        setSelectedInq(null);
        loadInquiries();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleLoadTemplate = (templateType: 'guarantee' | 'tender') => {
    if (templateType === 'guarantee') {
      setReplyText('Hi, we provide a standard 5-year workmanship guarantee on all torch-on bituminous roofing membranes, backed by our supplier product guarantees of 10 years.');
    } else if (templateType === 'tender') {
      setReplyText('Good day, thank you for reaching out. We have received your subcontracting application. We will review your profile and add you to our supplier list for future residential tenders.');
    }
  };

  const tabs: Inquiry['status'][] = ['New', 'Read', 'Replied'];

  const filteredInquiries = inquiries.filter(i => {
    const matchesTab = i.status === selectedStatusTab;
    const matchesSearch = i.sender_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          i.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          i.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <span className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Access Gate Lock Notice */}
      {!canManageInquiries && (
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl text-primary text-xs font-semibold flex items-center gap-2 select-none animate-pulse-slow">
          <Lock size={14} />
          <span>Viewer/Editor Access: You can read customer messages but do not have clearance to write replies or delete logs.</span>
        </div>
      )}

      {/* Title & Filters bar */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 bg-card border border-border p-4 rounded-xl shadow-md">
        <div className="flex items-center gap-2.5">
          <MessageSquare className="text-primary" size={20} />
          <div>
            <h3 className="font-bold text-sm text-foreground">Client Inbox Messages</h3>
            <p className="text-[10px] text-muted-foreground">Total inbox inquiries: {inquiries.length} records</p>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-background border border-border px-3 py-1.5 rounded-lg text-muted-foreground focus-within:border-primary transition text-xs max-w-xs w-full">
          <Search size={14} />
          <input
            type="text"
            placeholder="Search keywords, subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-foreground placeholder-muted w-full"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border pb-2">
        {tabs.map(tb => {
          const count = inquiries.filter(i => i.status === tb).length;
          const isSelected = selectedStatusTab === tb;
          return (
            <button
              key={tb}
              onClick={() => setSelectedStatusTab(tb)}
              className={`text-xs px-3.5 py-2.5 rounded-t-lg font-bold transition flex items-center gap-2 border-b-2 cursor-pointer
                ${isSelected
                  ? 'border-primary text-primary dark:text-primary bg-primary/[0.02]'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white'
                }
              `}
            >
              <span>{tb} Messages</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold
                ${isSelected ? 'bg-primary text-white' : 'bg-slate-250 dark:bg-slate-800 text-muted-foreground'}
              `}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Split Pane Inbox Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        
        {/* Left side list */}
        <div className="xl:col-span-1 space-y-3">
          {filteredInquiries.length === 0 ? (
            <div className="p-12 text-center text-slate-500 border border-dashed border-slate-200 dark:border-slate-900 rounded-xl text-sm">
              No message logs in folder "{selectedStatusTab}"
            </div>
          ) : (
            filteredInquiries.map((inq) => (
              <div
                key={inq.id}
                onClick={() => handleOpenDetail(inq)}
                className={`p-4 bg-white dark:bg-slate-900 border rounded-xl flex flex-col gap-2 cursor-pointer hover:border-primary/30 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition group
                  ${selectedInq?.id === inq.id ? 'border-primary bg-primary/[0.01]' : 'border-slate-200 dark:border-slate-850'}
                `}
              >
                <div className="flex justify-between items-center select-none">
                  <span className="font-bold text-xs text-slate-850 dark:text-white truncate">{inq.sender_name}</span>
                  <span className="text-[9px] text-slate-400 font-medium">{new Date(inq.created_at).toLocaleDateString()}</span>
                </div>
                <div>
                  <h5 className="font-bold text-xs text-slate-700 dark:text-primary truncate group-hover:text-primary transition">{inq.subject}</h5>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">{inq.message}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right side detail thread (col-span-2) */}
        <div className="xl:col-span-2">
          {selectedInq ? (
            <GlassCard className="space-y-6 animate-slide-in">
              
              {/* Header */}
              <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-900 pb-4">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-800 dark:text-white">{selectedInq.subject}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">From: <span className="font-bold">{selectedInq.sender_name}</span> ({selectedInq.email})</p>
                </div>
                <div className="flex gap-2">
                  {canManageInquiries && (
                    <button
                      onClick={() => handleDelete(selectedInq.id)}
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-400 hover:text-red-500 border border-slate-200 dark:border-slate-850 rounded-lg transition cursor-pointer"
                      title="Delete Thread"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedInq(null)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-200 dark:border-slate-850 rounded-lg transition"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Conversation History Timeline Thread */}
              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                
                {/* 1. Original Client Message */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-slate-700 dark:text-slate-400 text-xs shrink-0 select-none uppercase">
                    {selectedInq.sender_name.substring(0, 2)}
                  </div>
                  <div className="flex-grow p-4 bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-900 rounded-2xl rounded-tl-none space-y-2 max-w-[85%]">
                    <div className="flex justify-between items-center text-[10px] select-none text-slate-400">
                      <span className="font-bold text-slate-600 dark:text-slate-300">{selectedInq.sender_name}</span>
                      <span>{new Date(selectedInq.created_at).toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed whitespace-pre-line">{selectedInq.message}</p>
                    
                    {selectedInq.phone && (
                      <div className="pt-2 flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold border-t border-slate-200 dark:border-slate-900/60">
                        <Phone size={10} />
                        <span>Phone Contact: {selectedInq.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Replied Messages Listing */}
                {(selectedInq.conversation_history || []).map((history, idx) => {
                  const isAdmin = history.sender.includes('CS Construction');
                  return (
                    <div key={idx} className={`flex gap-3 ${isAdmin ? 'justify-end' : ''}`}>
                      {!isAdmin && (
                        <div className="w-8 h-8 rounded-full bg-slate-150 dark:bg-slate-800 border border-slate-200 dark:border-slate-750 flex items-center justify-center font-bold text-slate-400 text-xs shrink-0 select-none uppercase">
                          {selectedInq.sender_name.substring(0, 2)}
                        </div>
                      )}
                      
                      <div className={`flex-grow p-4 border rounded-2xl space-y-2 max-w-[85%]
                        ${isAdmin
                          ? 'bg-primary/10 border-primary/25 rounded-tr-none'
                          : 'bg-slate-100 dark:bg-slate-900/40 border-slate-200 dark:border-slate-900 rounded-tl-none'
                        }
                      `}>
                        <div className="flex justify-between items-center text-[10px] select-none text-slate-400">
                          <span className={`font-bold ${isAdmin ? 'text-primary dark:text-primary' : 'text-slate-500 dark:text-slate-350'}`}>{history.sender}</span>
                          <span>{new Date(history.timestamp).toLocaleString()}</span>
                        </div>
                        <p className="text-xs leading-relaxed whitespace-pre-line text-slate-600 dark:text-slate-300">{history.message}</p>
                      </div>
 
                      {isAdmin && (
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shrink-0 select-none">
                          CS
                        </div>
                      )}
                    </div>
                  );
                })}

              </div>

              {/* Reply Input Box Form */}
              {canManageInquiries && (
                <form onSubmit={handleSendReply} className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-900">
                  
                  {/* Template helpers */}
                  <div className="flex flex-wrap gap-2 select-none">
                    <span className="text-[10px] font-bold text-slate-500 py-1 pl-1">Template shortcuts:</span>
                    <button
                      type="button"
                      onClick={() => handleLoadTemplate('guarantee')}
                      className="bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-850 text-[10px] font-semibold text-slate-600 dark:text-slate-300 py-1 px-2.5 rounded-lg border border-slate-200 dark:border-slate-800 transition cursor-pointer"
                    >
                      Bituminous Waterproofing Guarantee
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLoadTemplate('tender')}
                      className="bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-850 text-[10px] font-semibold text-slate-600 dark:text-slate-300 py-1 px-2.5 rounded-lg border border-slate-200 dark:border-slate-800 transition cursor-pointer"
                    >
                      Subcontractor Tender Review
                    </button>
                  </div>

                  <div className="space-y-2">
                    <textarea
                      rows={4}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={`Draft your email response to ${selectedInq.sender_name}...`}
                      className="w-full bg-slate-100 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-850 rounded-lg p-3 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      disabled={replying}
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={replying || !replyText.trim()}
                      className="bg-primary hover:bg-primary-hover disabled:opacity-50 text-white font-bold py-2.5 px-4 rounded-lg flex items-center gap-1.5 text-xs shadow-md shadow-primary/10 transition cursor-pointer animate-fade-in"
                    >
                      {replying ? (
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        <>
                          <Send size={13} />
                          <span>Send Reply Email</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </GlassCard>
          ) : (
            <div className="hidden xl:flex flex-col items-center justify-center p-12 text-slate-500 border border-dashed border-slate-200 dark:border-slate-900 rounded-xl text-center min-h-[300px] select-none bg-slate-900/10">
              <Mail size={32} className="text-slate-600 mb-2 opacity-50" />
              <p className="text-xs">Select a message in the inbox to view thread details, check history, and send direct replies.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
