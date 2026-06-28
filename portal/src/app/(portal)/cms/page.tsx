// CS Construction Portal - Website Content Management System (CMS) Page
'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/supabase';
import { WebsiteContent } from '@/lib/mockDb';
import GlassCard from '@/components/GlassCard';
import {
  Globe,
  Save,
  Rocket,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Lock,
  Search,
  CheckCircle,
  FileText,
  FileCode,
  Layout
} from 'lucide-react';

export default function CmsPage() {
  const { user, role, canManageContent } = useAuth();
  
  const [pages, setPages] = useState<WebsiteContent[]>([]);
  const [selectedPageId, setSelectedPageId] = useState<string>('home');
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'preview'>('content');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);

  // Active page editing buffers
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [ogSettings, setOgSettings] = useState({ title: '', description: '', image: '' });
  const [content, setContent] = useState<any>({});

  useEffect(() => {
    loadCMS();
  }, []);

  const loadCMS = async () => {
    try {
      const list = await db.cms.list();
      setPages(list);
      
      // Initialize editing buffer with home page
      const homePage = list.find(p => p.id === 'home');
      if (homePage) {
        loadPageToBuffer(homePage);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadPageToBuffer = (page: WebsiteContent) => {
    setStatus(page.status);
    setMetaTitle(page.meta_title || '');
    setMetaDescription(page.meta_description || '');
    setOgSettings({
      title: page.og_settings?.title || '',
      description: page.og_settings?.description || '',
      image: page.og_settings?.image || ''
    });
    setContent(JSON.parse(JSON.stringify(page.content))); // Deep clone
  };

  const handlePageSelect = (id: string) => {
    setSelectedPageId(id);
    const found = pages.find(p => p.id === id);
    if (found) {
      loadPageToBuffer(found);
    }
  };

  const handleSaveDraft = async () => {
    if (!canManageContent) return;
    setSaving(true);
    try {
      const updates = {
        status: 'draft' as const,
        meta_title: metaTitle,
        meta_description: metaDescription,
        og_settings: ogSettings,
        content
      };
      await db.cms.save(selectedPageId, updates, user?.email || 'admin');
      
      // Reload pages
      const list = await db.cms.list();
      setPages(list);
      setStatus('draft');
      alert('Draft saved successfully! Change status to published to make it public.');
    } catch (err) {
      console.error(err);
      alert('Failed to save draft.');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!canManageContent) return;
    setPublishing(true);
    try {
      const updates = {
        status: 'published' as const,
        meta_title: metaTitle,
        meta_description: metaDescription,
        og_settings: ogSettings,
        content
      };
      await db.cms.save(selectedPageId, updates, user?.email || 'admin');
      
      // Reload pages
      const list = await db.cms.list();
      setPages(list);
      setStatus('published');
      alert('Changes published successfully! The website has been updated.');
    } catch (err) {
      console.error(err);
      alert('Publishing failed.');
    } finally {
      setPublishing(false);
    }
  };

  // Helper dynamic handlers for key values based on pages
  const handleContentTextChange = (key: string, value: string) => {
    setContent((prev: any) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleServiceChange = (index: number, key: string, value: string) => {
    const list = [...(content.services_list || [])];
    list[index] = { ...list[index], [key]: value };
    setContent((prev: any) => ({ ...prev, services_list: list }));
  };

  const handleAddService = () => {
    const list = [...(content.services_list || [])];
    list.push({ title: 'New Service Title', desc: 'Detailed description of construction capability.' });
    setContent((prev: any) => ({ ...prev, services_list: list }));
  };

  const handleRemoveService = (index: number) => {
    const list = content.services_list.filter((_: any, i: number) => i !== index);
    setContent((prev: any) => ({ ...prev, services_list: list }));
  };

  const handleMoveService = (index: number, direction: 'up' | 'down') => {
    const list = [...(content.services_list || [])];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;
    
    // Swap
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;
    
    setContent((prev: any) => ({ ...prev, services_list: list }));
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <span className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Read-Only Warning for Viewers */}
      {!canManageContent && (
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl text-primary text-xs font-semibold flex items-center gap-2 select-none animate-pulse-slow">
          <Lock size={14} />
          <span>Viewer Access Only: You can browse settings but cannot save drafts or publish content changes.</span>
        </div>
      )}

      {/* Main Layout Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Page selector sidebar */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-xs font-extrabold text-slate-400 dark:text-slate-500 tracking-wider uppercase pl-1 select-none">Webpages Index</h3>
          <div className="grid grid-cols-1 gap-1.5">
            {pages.map((p) => {
              const isSelected = selectedPageId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handlePageSelect(p.id)}
                  className={`text-left p-3.5 rounded-xl border transition flex items-center justify-between group cursor-pointer
                    ${isSelected
                      ? 'bg-primary text-white border-primary font-bold shadow-md shadow-primary/10'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }
                  `}
                >
                  <div className="flex items-center gap-2">
                    <Layout size={16} />
                    <span className="text-xs capitalize font-bold">{p.id} Page</span>
                  </div>
                  <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded
                    ${isSelected
                      ? 'bg-primary-dark text-white'
                      : p.status === 'published'
                        ? 'bg-green-500/10 text-green-500'
                        : 'bg-primary/10 text-primary'
                    }
                  `}>
                    {p.status.toUpperCase()}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CMS Editor Main Panel */}
        <div className="lg:col-span-3 space-y-6">
          <GlassCard>
            
            {/* Tab Navigation header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-900 pb-4 mb-6">
              <div className="flex gap-2">
                {(['content', 'seo', 'preview'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-xs px-3.5 py-2 rounded-lg font-bold transition capitalize cursor-pointer
                      ${activeTab === tab
                        ? 'bg-primary/10 text-primary border border-primary/20'
                        : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white'
                      }
                    `}
                  >
                    {tab} Settings
                  </button>
                ))}
              </div>

              {/* Save Draft / Publish buttons */}
              {canManageContent && (
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={handleSaveDraft}
                    disabled={saving || publishing}
                    className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold py-2 px-3.5 rounded-lg flex items-center gap-1.5 text-xs transition cursor-pointer"
                  >
                    {saving ? <span className="w-3.5 h-3.5 border-2 border-slate-200 border-t-transparent rounded-full animate-spin"></span> : <Save size={14} className="text-primary" />}
                    <span>Save Draft</span>
                  </button>
                  <button
                    onClick={handlePublish}
                    disabled={saving || publishing}
                    className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-3.5 rounded-lg flex items-center gap-1.5 text-xs shadow-md shadow-primary/10 transition cursor-pointer"
                  >
                    {publishing ? <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : <Rocket size={14} />}
                    <span>Publish live</span>
                  </button>
                </div>
              )}
            </div>

            {/* TAB CONTENT: Content Blocks */}
            {activeTab === 'content' && (
              <div className="space-y-6 animate-fade-in">
                {selectedPageId === 'home' && (
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase">Hero Headline Title</label>
                      <input
                        type="text"
                        value={content.hero_title || ''}
                        onChange={(e) => handleContentTextChange('hero_title', e.target.value)}
                        className="w-full bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 px-3.5 text-sm outline-none focus:border-primary transition"
                        disabled={!canManageContent}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase">Hero Subtitle Tagline</label>
                      <textarea
                        rows={3}
                        value={content.hero_subtitle || ''}
                        onChange={(e) => handleContentTextChange('hero_subtitle', e.target.value)}
                        className="w-full bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 px-3.5 text-sm outline-none focus:border-primary transition"
                        disabled={!canManageContent}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase">Primary Button CTA</label>
                        <input
                          type="text"
                          value={content.hero_cta || ''}
                          onChange={(e) => handleContentTextChange('hero_cta', e.target.value)}
                          className="w-full bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 px-3.5 text-sm outline-none focus:border-primary transition"
                          disabled={!canManageContent}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase">Featured Section Label</label>
                        <input
                          type="text"
                          value={content.featured_tagline || ''}
                          onChange={(e) => handleContentTextChange('featured_tagline', e.target.value)}
                          className="w-full bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 px-3.5 text-sm outline-none focus:border-primary transition"
                          disabled={!canManageContent}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedPageId === 'about' && (
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase">Company Profile History</label>
                      <textarea
                        rows={5}
                        value={content.company_history || ''}
                        onChange={(e) => handleContentTextChange('company_history', e.target.value)}
                        className="w-full bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 px-3.5 text-sm outline-none focus:border-primary transition"
                        disabled={!canManageContent}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase">Core Mission Statement</label>
                      <textarea
                        rows={3}
                        value={content.mission_statement || ''}
                        onChange={(e) => handleContentTextChange('mission_statement', e.target.value)}
                        className="w-full bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 px-3.5 text-sm outline-none focus:border-primary transition"
                        disabled={!canManageContent}
                      />
                    </div>
                  </div>
                )}

                {selectedPageId === 'services' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-400 uppercase">Service Card Blocks</label>
                      {canManageContent && (
                        <button
                          onClick={handleAddService}
                          className="text-xs text-primary hover:text-primary-hover font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Plus size={12} />
                          Add Block
                        </button>
                      )}
                    </div>
                    
                    <div className="space-y-3.5">
                      {(content.services_list || []).map((service: any, idx: number) => (
                        <div key={idx} className="p-4 bg-slate-100 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-4">
                          {/* Ordering Actions */}
                          {canManageContent && (
                            <div className="flex flex-col gap-1 shrink-0">
                              <button onClick={() => handleMoveService(idx, 'up')} disabled={idx === 0} className="p-1 text-slate-400 hover:text-white disabled:opacity-30">
                                <ArrowUp size={14} />
                              </button>
                              <button onClick={() => handleMoveService(idx, 'down')} disabled={idx === content.services_list.length - 1} className="p-1 text-slate-400 hover:text-white disabled:opacity-30">
                                <ArrowDown size={14} />
                              </button>
                            </div>
                          )}

                          {/* Inputs */}
                          <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="md:col-span-1 space-y-1">
                              <input
                                type="text"
                                value={service.title}
                                onChange={(e) => handleServiceChange(idx, 'title', e.target.value)}
                                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-2 px-3 text-xs font-bold outline-none focus:border-primary"
                                disabled={!canManageContent}
                              />
                            </div>
                            <div className="md:col-span-2 space-y-1">
                              <input
                                type="text"
                                value={service.desc}
                                onChange={(e) => handleServiceChange(idx, 'desc', e.target.value)}
                                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-2 px-3 text-xs outline-none focus:border-primary"
                                disabled={!canManageContent}
                              />
                            </div>
                          </div>

                          {/* Delete Button */}
                          {canManageContent && (
                            <button
                              onClick={() => handleRemoveService(idx)}
                              className="p-1 text-slate-400 hover:text-red-500 transition shrink-0 cursor-pointer"
                              title="Delete Service Block"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: SEO Meta Tags */}
            {activeTab === 'seo' && (
              <div className="space-y-4 animate-fade-in">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase">Browser Meta Title</label>
                    <input
                      type="text"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      placeholder="e.g. CS Construction | Services"
                      className="w-full bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 px-3.5 text-sm outline-none focus:border-primary transition"
                      disabled={!canManageContent}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase">Browser Meta Description</label>
                    <textarea
                      rows={3}
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      placeholder="A brief summary describing this page for search results indexing."
                      className="w-full bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 px-3.5 text-sm outline-none focus:border-primary transition"
                      disabled={!canManageContent}
                    />
                  </div>
                  
                  {/* Open Graph Group */}
                  <div className="p-4 bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-900 rounded-xl space-y-4">
                    <p className="text-xs font-extrabold text-primary select-none">Open Graph Settings (Social Sharing Preview)</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">OG Title</label>
                        <input
                          type="text"
                          value={ogSettings.title || ''}
                          onChange={(e) => setOgSettings({ ...ogSettings, title: e.target.value })}
                          className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg py-2 px-3 text-xs outline-none focus:border-primary"
                          disabled={!canManageContent}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">OG Image URL</label>
                        <input
                          type="text"
                          value={ogSettings.image || ''}
                          onChange={(e) => setOgSettings({ ...ogSettings, image: e.target.value })}
                          placeholder="https://..."
                          className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg py-2 px-3 text-xs outline-none focus:border-primary"
                          disabled={!canManageContent}
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">OG Description</label>
                      <input
                        type="text"
                        value={ogSettings.description || ''}
                        onChange={(e) => setOgSettings({ ...ogSettings, description: e.target.value })}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg py-2 px-3 text-xs outline-none focus:border-primary"
                        disabled={!canManageContent}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Preview */}
            {activeTab === 'preview' && (
              <div className="space-y-6 animate-fade-in">
                <div className="border border-border rounded-xl overflow-hidden bg-card select-none">
                  {/* Browser Bar */}
                  <div className="bg-slate-50 dark:bg-slate-900 px-4 py-2 border-b border-border flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                    </div>
                    <div className="bg-background text-[10px] text-muted-foreground px-4 py-1.5 rounded border border-border w-full max-w-sm truncate ml-4 select-all">
                      https://csconstruction.co.za/{selectedPageId}
                    </div>
                  </div>

                  {/* Browser viewport simulation */}
                  <div className="p-8 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 min-h-[300px]">
                    {selectedPageId === 'home' && (
                      <div className="max-w-xl mx-auto text-center space-y-4 py-8">
                        <span className="bg-primary/10 text-primary text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full">
                          {content.featured_tagline || 'Tagline'}
                        </span>
                        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
                          {content.hero_title || 'Hero Headline Title'}
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {content.hero_subtitle || 'Hero Subtitle text description'}
                        </p>
                        <button className="bg-primary hover:bg-primary-hover text-white font-bold py-2.5 px-6 rounded-lg text-xs shadow-md mt-4 pointer-events-none">
                          {content.hero_cta || 'CTA Button'}
                        </button>
                      </div>
                    )}

                    {selectedPageId === 'about' && (
                      <div className="max-w-xl mx-auto space-y-6 py-4">
                        <div className="border-l-4 border-primary pl-4 py-1">
                          <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Our Mission</h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 italic leading-relaxed">
                            "{content.mission_statement || 'Mission statement goes here.'}"
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Company History</h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            {content.company_history || 'Company history text.'}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedPageId === 'services' && (
                      <div className="max-w-3xl mx-auto py-4">
                        <h3 className="font-bold text-center text-slate-900 dark:text-white mb-6">Our Specializations</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {(content.services_list || []).map((service: any, idx: number) => (
                            <div key={idx} className="p-4 border border-border rounded-lg bg-slate-50 dark:bg-slate-900/60">
                              <h4 className="font-bold text-sm text-slate-900 dark:text-white">{service.title}</h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{service.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

          </GlassCard>
        </div>

      </div>

    </div>
  );
}
