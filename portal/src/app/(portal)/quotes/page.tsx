// CS Construction Portal - Quote Request Management Page
'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/supabase';
import { Quote } from '@/lib/mockDb';
import GlassCard from '@/components/GlassCard';
import {
  ClipboardList,
  Search,
  SlidersHorizontal,
  Mail,
  Phone,
  Calendar,
  FileDown,
  Trash2,
  Lock,
  X,
  Save,
  Archive,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

export default function QuotesPage() {
  const { user, role, canManageQuotes } = useAuth();
  
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<Quote['status']>('New Requests');
  const [searchQuery, setSearchQuery] = useState('');
  const [projectFilter, setProjectFilter] = useState('All');
  
  // Drawer / modal detail state
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [internalNotes, setInternalNotes] = useState('');
  const [currentStatus, setCurrentStatus] = useState<Quote['status']>('New Requests');

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    try {
      const list = await db.quotes.list();
      setQuotes(list);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDetail = (q: Quote) => {
    setSelectedQuote(q);
    setInternalNotes(q.internal_notes || '');
    setCurrentStatus(q.status);
  };

  const handleSaveDetails = async () => {
    if (!selectedQuote || !canManageQuotes) return;
    
    const updated: Quote = {
      ...selectedQuote,
      status: currentStatus,
      internal_notes: internalNotes
    };

    try {
      await db.quotes.save(updated, user?.email || 'admin');
      
      // Update local listing
      const list = await db.quotes.list();
      setQuotes(list);
      setSelectedQuote(updated);
      alert('Quote status and notes successfully saved.');
    } catch (err) {
      console.error(err);
      alert('Error updating quote.');
    }
  };

  const handleArchive = async (q: Quote) => {
    if (!canManageQuotes) return;
    const updated = { ...q, is_archived: !q.is_archived };
    try {
      await db.quotes.save(updated, user?.email || 'admin');
      loadQuotes();
      if (selectedQuote && selectedQuote.id === q.id) {
        setSelectedQuote(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!canManageQuotes) return;
    if (confirm('Are you sure you want to permanently delete this quote record? This cannot be undone.')) {
      try {
        await db.quotes.delete(id, user?.email || 'admin');
        setSelectedQuote(null);
        loadQuotes();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleExportPDF = () => {
    if (!selectedQuote) return;
    // Premium PDF printing action
    window.print();
  };

  const statuses: Quote['status'][] = ['New Requests', 'In Progress', 'Awaiting Response', 'Approved', 'Rejected'];

  const projectTypes = ['All', 'Renovation & Extension', 'New Residential Build', 'Plumbing', 'Commercial'];

  const filteredQuotes = quotes.filter(q => {
    if (q.is_archived) return false;
    const matchesStatus = q.status === selectedStatus;
    const matchesSearch = q.client_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (q.company_name && q.company_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          q.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProject = projectFilter === 'All' || q.project_type === projectFilter;
    
    return matchesStatus && matchesSearch && matchesProject;
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
      
      {/* Access Gate Warning */}
      {!canManageQuotes && (
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl text-primary text-xs font-semibold flex items-center gap-2 select-none animate-pulse-slow">
          <Lock size={14} />
          <span>Viewer/Editor Access: You can view client requests but cannot change pipeline status, write notes, or delete.</span>
        </div>
      )}

      {/* Title & Filters Bar */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 bg-card border border-border p-4 rounded-xl shadow-md">
        
        {/* Title */}
        <div className="flex items-center gap-2.5">
          <ClipboardList className="text-primary" size={20} />
          <div>
            <h3 className="font-bold text-sm text-foreground">Client Quote Pipeline</h3>
            <p className="text-[10px] text-muted-foreground">Total active client requests: {quotes.filter(q => !q.is_archived).length}</p>
          </div>
        </div>

        {/* Filters Group */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search box */}
          <div className="flex items-center gap-2 bg-background border border-border px-3 py-1.5 rounded-lg text-muted-foreground focus-within:border-primary transition text-xs">
            <Search size={14} />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-foreground placeholder-muted w-full"
            />
          </div>

          {/* Project Dropdown */}
          <div className="flex items-center gap-2 bg-background border border-border px-3 py-1.5 rounded-lg text-muted-foreground text-xs">
            <SlidersHorizontal size={14} />
            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="bg-transparent border-none outline-none text-foreground cursor-pointer"
            >
              {projectTypes.map(p => (
                <option key={p} value={p} className="bg-card text-foreground">{p}</option>
              ))}
            </select>
          </div>
        </div>

      </div>

      {/* Status Pipeline Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-border pb-2">
        {statuses.map(st => {
          const count = quotes.filter(q => q.status === st && !q.is_archived).length;
          const isSelected = selectedStatus === st;
          return (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`text-xs px-3.5 py-2.5 rounded-t-lg font-bold transition flex items-center gap-2 border-b-2 cursor-pointer
                ${isSelected
                  ? 'border-primary text-primary dark:text-primary bg-primary/[0.02]'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white'
                }
              `}
            >
              <span>{st}</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold
                ${isSelected ? 'bg-primary text-white' : 'bg-slate-250 dark:bg-slate-800 text-muted-foreground'}
              `}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Listing View (Table & Drawer layout) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        
        {/* Quote list (col-span-2) */}
        <div className="xl:col-span-2 space-y-3">
          {filteredQuotes.length === 0 ? (
            <div className="p-12 text-center text-slate-500 border border-dashed border-slate-200 dark:border-slate-900 rounded-xl text-sm">
              No quote requests in status category "{selectedStatus}"
            </div>
          ) : (
            filteredQuotes.map((q) => (
              <div
                key={q.id}
                onClick={() => handleOpenDetail(q)}
                className={`p-4 bg-white dark:bg-slate-900 border rounded-xl flex items-center justify-between gap-4 cursor-pointer hover:border-primary/30 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition group
                  ${selectedQuote?.id === q.id ? 'border-primary bg-primary/[0.01]' : 'border-slate-200 dark:border-slate-850'}
                `}
              >
                <div className="min-w-0 flex-grow">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-slate-800 dark:text-white truncate">{q.client_name}</h4>
                    {q.company_name && (
                      <span className="text-[10px] text-slate-400 font-semibold truncate bg-slate-100 dark:bg-slate-850 px-1.5 py-0.5 rounded select-none">
                        {q.company_name}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-primary dark:text-primary font-semibold mt-0.5">{q.project_type}</p>
                  <p className="text-[10px] text-slate-500 mt-2 flex items-center gap-4">
                    <span className="flex items-center gap-1 font-medium select-none">
                      <Calendar size={10} />
                      {new Date(q.submission_date).toLocaleDateString()}
                    </span>
                    <span>•</span>
                    <span className="font-bold text-slate-600 dark:text-slate-300">{q.budget_range}</span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {q.attachments && q.attachments.length > 0 && (
                    <span className="text-[9px] font-extrabold bg-blue-500/10 text-blue-500 px-1.5 py-0.5 rounded shrink-0">
                      {q.attachments.length} ATCH
                    </span>
                  )}
                  <ChevronRight size={16} className="text-slate-400 group-hover:text-primary group-hover:translate-x-0.5 transition" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quote details view panel (col-span-1) */}
        <div className="xl:col-span-1">
          {selectedQuote ? (
            <GlassCard className="space-y-5 print:p-0 print:border-none print:shadow-none animate-slide-in relative">
              
              {/* Card top details */}
              <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-900 pb-4">
                <div>
                  <h4 className="font-extrabold text-base text-slate-800 dark:text-white">{selectedQuote.client_name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{selectedQuote.company_name || 'Individual client'}</p>
                </div>
                <button
                  onClick={() => setSelectedQuote(null)}
                  className="p-1 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-400 hover:text-white rounded-lg transition"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Status and Action tools */}
              <div className="space-y-4">
                
                {/* Pipeline select */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Assigned Pipeline Status</label>
                  <select
                    value={currentStatus}
                    onChange={(e) => setCurrentStatus(e.target.value as any)}
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg py-2 px-3 text-xs outline-none focus:border-primary cursor-pointer font-bold text-slate-800 dark:text-slate-200"
                    disabled={!canManageQuotes}
                  >
                    {statuses.map(st => (
                      <option key={st} value={st} className="bg-slate-950 font-bold">{st}</option>
                    ))}
                  </select>
                </div>

                {/* Details list */}
                <div className="space-y-3 bg-slate-100 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-900 p-4 rounded-xl text-xs space-y-2">
                  <p className="flex justify-between"><span className="text-slate-500">Project Type:</span> <span className="font-bold text-slate-800 dark:text-slate-200">{selectedQuote.project_type}</span></p>
                  <p className="flex justify-between"><span className="text-slate-500">Budget Range:</span> <span className="font-bold text-primary">{selectedQuote.budget_range}</span></p>
                  <p className="flex justify-between"><span className="text-slate-500">Submitted:</span> <span className="font-medium">{new Date(selectedQuote.submission_date).toLocaleDateString()}</span></p>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Project Description</label>
                  <p className="p-3 bg-slate-100 dark:bg-slate-900/30 border border-slate-200/50 dark:border-slate-900 rounded-lg text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    {selectedQuote.description || 'No project description supplied.'}
                  </p>
                </div>

                {/* Attachments */}
                {selectedQuote.attachments && selectedQuote.attachments.length > 0 && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Client Attachments</label>
                    <div className="grid grid-cols-1 gap-1.5">
                      {selectedQuote.attachments.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg text-[10px]">
                          <span className="font-bold text-slate-500 truncate">{file}</span>
                          <button className="text-blue-500 hover:text-blue-400 flex items-center gap-0.5 font-bold cursor-pointer">
                            <span>Open</span>
                            <ExternalLink size={10} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Internal Notes */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Internal Review Notes</label>
                  <textarea
                    rows={4}
                    value={internalNotes}
                    onChange={(e) => setInternalNotes(e.target.value)}
                    placeholder="Enter internal review notes visible to admins only..."
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg p-3 text-xs outline-none focus:border-primary"
                    disabled={!canManageQuotes}
                  />
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-900">
                  {canManageQuotes && (
                    <button
                      onClick={handleSaveDetails}
                      className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-3.5 rounded-lg flex items-center justify-center gap-1.5 text-xs shadow-md shadow-primary/10 transition cursor-pointer"
                    >
                      <Save size={13} />
                      <span>Save Changes</span>
                    </button>
                  )}
                  
                  <button
                    onClick={handleExportPDF}
                    className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 py-2 px-3.5 rounded-lg flex items-center justify-center gap-1.5 text-xs transition cursor-pointer"
                  >
                    <FileDown size={13} />
                    <span>Print PDF</span>
                  </button>

                  {canManageQuotes && (
                    <>
                      <button
                        onClick={() => handleArchive(selectedQuote)}
                        className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white py-2 px-3 rounded-lg text-xs transition cursor-pointer"
                        title={selectedQuote.is_archived ? 'Restore' : 'Archive'}
                      >
                        <Archive size={13} />
                      </button>
                      <button
                        onClick={() => handleDelete(selectedQuote.id)}
                        className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-red-500 py-2 px-3 rounded-lg text-xs transition cursor-pointer"
                        title="Delete Quote"
                      >
                        <Trash2 size={13} />
                      </button>
                    </>
                  )}
                </div>

                {/* Direct Mail Link */}
                <div className="pt-2">
                  <a
                    href={`mailto:${selectedQuote.email}?subject=CS Construction - Quote Request Review`}
                    className="w-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 border border-blue-500/10 py-2 px-4 rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition text-center"
                  >
                    <Mail size={14} />
                    <span>Contact {selectedQuote.client_name.split(' ')[0]} via Email</span>
                  </a>
                </div>

              </div>

            </GlassCard>
          ) : (
            <div className="hidden xl:flex flex-col items-center justify-center p-12 text-slate-500 border border-dashed border-slate-200 dark:border-slate-900 rounded-xl text-center min-h-[300px] select-none bg-slate-900/10">
              <ClipboardList size={32} className="text-slate-600 mb-2 opacity-50" />
              <p className="text-xs">Select a client quote request on the left pipeline directory to review files, modify status, and write details notes.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
