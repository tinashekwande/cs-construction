// CS Construction Portal - Project Portfolio Management Page
'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/supabase';
import { Project } from '@/lib/mockDb';
import GlassCard from '@/components/GlassCard';
import {
  Building,
  Plus,
  Trash2,
  Edit2,
  Calendar,
  MapPin,
  User,
  Star,
  X,
  Save,
  Lock,
  ArrowRightLeft,
  ChevronRight,
  Sliders
} from 'lucide-react';

export default function PortfolioPage() {
  const { user, role, canManageContent } = useAuth();
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Interactive Slider State
  const [activeSliderProj, setActiveSliderProj] = useState<Project | null>(null);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0-100
  
  // Edit Form State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProj, setEditingProj] = useState<Project | null>(null);

  const [projectName, setProjectName] = useState('');
  const [category, setCategory] = useState('Renovations');
  const [description, setDescription] = useState('');
  const [completionDate, setCompletionDate] = useState('');
  const [location, setLocation] = useState('');
  const [clientName, setClientName] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [beforeImage, setBeforeImage] = useState('');
  const [afterImage, setAfterImage] = useState('');
  const [featuredOnHomepage, setFeaturedOnHomepage] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const list = await db.projects.list();
      setProjects(list);
      // Auto-set the first project for the before/after slider preview
      if (list.length > 0 && !activeSliderProj) {
        setActiveSliderProj(list[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    if (!canManageContent) return;
    setEditingProj(null);
    setProjectName('');
    setCategory('Renovations');
    setDescription('');
    setCompletionDate(new Date().toISOString().split('T')[0]);
    setLocation('Cape Town');
    setClientName('');
    setFeaturedImage('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80');
    setBeforeImage('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80');
    setAfterImage('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80');
    setFeaturedOnHomepage(false);
    setModalOpen(true);
  };

  const handleOpenEditModal = (p: Project) => {
    if (!canManageContent) return;
    setEditingProj(p);
    setProjectName(p.project_name);
    setCategory(p.category);
    setDescription(p.description || '');
    setCompletionDate(p.completion_date || '');
    setLocation(p.location || '');
    setClientName(p.client_name || '');
    setFeaturedImage(p.featured_image || '');
    setBeforeImage(p.before_images?.[0] || '');
    setAfterImage(p.after_images?.[0] || '');
    setFeaturedOnHomepage(p.featured_on_homepage);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canManageContent) return;

    const record: Project = {
      id: editingProj ? editingProj.id : Math.random().toString(36).substring(2, 9),
      project_name: projectName,
      category,
      description,
      completion_date: completionDate,
      location,
      client_name: clientName,
      before_images: beforeImage ? [beforeImage] : [],
      after_images: afterImage ? [afterImage] : [],
      featured_image: featuredImage,
      gallery: afterImage ? [afterImage] : [],
      featured_on_homepage: featuredOnHomepage,
      created_at: editingProj ? editingProj.created_at : new Date().toISOString()
    };

    try {
      await db.projects.save(record, user?.email || 'admin');
      setModalOpen(false);
      loadProjects();
    } catch (err) {
      console.error(err);
      alert('Failed to save project.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!canManageContent) return;
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await db.projects.delete(id, user?.email || 'admin');
        if (activeSliderProj?.id === id) {
          setActiveSliderProj(null);
        }
        loadProjects();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleToggleFeatured = async (p: Project) => {
    if (!canManageContent) return;
    const updated = { ...p, featured_on_homepage: !p.featured_on_homepage };
    try {
      await db.projects.save(updated, user?.email || 'admin');
      loadProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const categories = ['Renovations', 'Building', 'Plumbing', 'Finishes'];

  return (
    <div className="space-y-6">
      
      {/* Access Gate Warning */}
      {!canManageContent && (
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl text-primary text-xs font-semibold flex items-center gap-2 select-none animate-pulse-slow">
          <Lock size={14} />
          <span>Viewer Access Only: You do not have permissions to modify, delete, or add projects.</span>
        </div>
      )}

      {/* Grid: Left side project cards & Right side interactive slider */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Project Listing (col-span-2) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-card border border-border p-4 rounded-xl shadow-md">
            <div className="flex items-center gap-2.5">
              <Building className="text-primary" size={20} />
              <div>
                <h3 className="font-bold text-sm text-foreground">Project Showcases</h3>
                <p className="text-[10px] text-muted-foreground">Total portfolio works: {projects.length} entries</p>
              </div>
            </div>

            {canManageContent && (
              <button
                onClick={handleOpenAddModal}
                className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-3.5 rounded-lg flex items-center justify-center gap-1.5 text-xs shadow-md shadow-primary/10 transition cursor-pointer"
              >
                <Plus size={14} />
                <span>Add Project</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((p) => {
              const isSelectedForSlider = activeSliderProj?.id === p.id;
              return (
                <div
                  key={p.id}
                  className={`glass-panel rounded-xl overflow-hidden border transition duration-300 relative group flex flex-col justify-between h-[360px]
                    ${isSelectedForSlider ? 'border-primary shadow-lg' : 'border-border'}
                  `}
                >
                  {/* Project image banner */}
                  <div className="h-44 overflow-hidden relative select-none">
                    <img
                      src={p.featured_image || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600'}
                      alt={p.project_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    
                    {/* Category Label */}
                    <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur border border-slate-800 text-primary text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {p.category}
                    </span>

                    {/* Featured star */}
                    {p.featured_on_homepage && (
                      <span className="absolute top-3 right-3 bg-primary text-white p-1.5 rounded-md shadow" title="Featured on Homepage">
                        <Star size={10} fill="currentColor" />
                      </span>
                    )}
                  </div>

                  {/* Body content */}
                  <div className="p-4 flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-slate-800 dark:text-white line-clamp-1">{p.project_name}</h4>
                      <p className="text-[10px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">{p.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-3 text-[10px] text-slate-500">
                      <div className="flex items-center gap-1 select-none"><MapPin size={10} /><span>{p.location || 'Cape Town'}</span></div>
                      <div className="flex items-center gap-1 select-none"><Calendar size={10} /><span>{p.completion_date}</span></div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-3 border-t border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/10 flex items-center justify-between">
                    {/* Slider selector */}
                    <button
                      onClick={() => setActiveSliderProj(p)}
                      className="text-[10px] text-primary hover:text-primary-hover font-bold flex items-center gap-1 cursor-pointer select-none"
                    >
                      <ArrowRightLeft size={10} />
                      <span>Before / After</span>
                    </button>

                    {/* Edit Tools */}
                    {canManageContent && (
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => handleToggleFeatured(p)}
                          className={`p-1.5 border rounded-lg transition cursor-pointer
                            ${p.featured_on_homepage
                              ? 'bg-primary/10 border-primary/30 text-primary hover:bg-slate-900'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-primary'
                            }
                          `}
                          title="Toggle Featured Homepage"
                        >
                          <Star size={12} fill={p.featured_on_homepage ? 'currentColor' : 'none'} />
                        </button>
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="p-1.5 bg-slate-900 border border-slate-800 text-slate-455 hover:text-primary rounded-lg transition cursor-pointer"
                          title="Edit Project"
                        >
                          <Edit2 size={12} />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-1.5 bg-slate-900 border border-slate-800 text-slate-455 hover:text-red-500 rounded-lg transition cursor-pointer"
                          title="Delete Project"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Before / After Interactive Slider (col-span-1) */}
        <div className="lg:col-span-1">
          {activeSliderProj ? (
            <GlassCard className="space-y-4">
              <div className="border-b border-slate-100 dark:border-slate-900 pb-3 flex items-center gap-2 select-none">
                <ArrowRightLeft className="text-primary" size={16} />
                <h4 className="font-bold text-sm text-slate-800 dark:text-white">Before / After Slider</h4>
              </div>

              <div>
                <h5 className="font-bold text-xs text-slate-700 dark:text-white truncate">{activeSliderProj.project_name}</h5>
                <p className="text-[10px] text-slate-500 mt-1">{activeSliderProj.location} • Client: {activeSliderProj.client_name || 'N/A'}</p>
              </div>

              {/* Slider View Box Container */}
              {activeSliderProj.before_images?.[0] && activeSliderProj.after_images?.[0] ? (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow border border-slate-200 dark:border-slate-850 select-none">
                  {/* AFTER Image (Background) */}
                  <img
                    src={activeSliderProj.after_images[0]}
                    alt="After structural remodel"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2.5 right-3 bg-green-500/80 text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded shadow">
                    AFTER
                  </div>

                  {/* BEFORE Image (Foreground clipped by position) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <img
                      src={activeSliderProj.before_images[0]}
                      alt="Before construction layout"
                      className="absolute inset-0 w-full h-full object-cover max-w-none"
                      style={{ width: '100%', height: '100%' }} // Note: width needs to align with parent container
                    />
                    <div className="absolute bottom-2.5 left-3 bg-red-500/80 text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded shadow">
                      BEFORE
                    </div>
                  </div>

                  {/* Invisible Drag Controller Range Input Overlay */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPosition}
                    onChange={(e) => setSliderPosition(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                  />

                  {/* Visual Slider Line bar handle */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-primary z-10 pointer-events-none"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shadow shadow-primary/20">
                      <Sliders size={12} className="rotate-90" />
                    </div>
                  </div>

                </div>
              ) : (
                <div className="p-8 text-center text-slate-500 border border-slate-200 dark:border-slate-900 rounded-xl text-xs">
                  This project does not have before and after images uploaded.
                </div>
              )}

              <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center select-none">
                Hover and drag your cursor over the slider above to evaluate construction changes.
              </p>

            </GlassCard>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-slate-500 border border-dashed border-slate-200 dark:border-slate-900 rounded-xl text-center min-h-[200px] select-none bg-slate-900/10">
              <ArrowRightLeft size={24} className="text-slate-600 mb-2 opacity-50" />
              <p className="text-[10px]">Select a project card's "Before/After" action to preview structural transitions.</p>
            </div>
          )}
        </div>

      </div>

      {/* Add / Edit Modal Overlay */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModalOpen(false)}></div>
          
          <div className="relative glass-panel bg-card rounded-2xl max-w-xl w-full border border-border overflow-hidden shadow-2xl animate-scale-up">
            
            {/* Header */}
            <div className="p-5 border-b border-border flex justify-between items-center bg-slate-50 dark:bg-slate-900/60">
              <div className="flex items-center gap-2">
                <Building size={18} className="text-primary" />
                <h4 className="font-bold text-sm text-foreground">{editingProj ? 'Edit Project Details' : 'Add New Portfolio Project'}</h4>
              </div>
              <button onClick={() => setModalOpen(false)} className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                <X size={16} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-5 max-h-[75vh] overflow-y-auto space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Project Name *</label>
                  <input
                    type="text"
                    required
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg py-2 px-3 text-xs outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg py-2 px-3 text-xs outline-none focus:border-primary cursor-pointer"
                  >
                    {categories.map(c => (
                      <option key={c} value={c} className="bg-slate-950">{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Project Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg py-2 px-3 text-xs outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Sea Point"
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg py-2 px-3 text-xs outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Completion Date</label>
                  <input
                    type="date"
                    value={completionDate}
                    onChange={(e) => setCompletionDate(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg py-2 px-3 text-xs outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Client Name</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg py-2 px-3 text-xs outline-none focus:border-primary"
                  />
                </div>
              </div>              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Featured Image URL</label>
                <input
                  type="text"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg py-2 px-3 text-xs outline-none focus:border-primary"
                />
              </div>
 
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Before Image URL</label>
                  <input
                    type="text"
                    value={beforeImage}
                    onChange={(e) => setBeforeImage(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg py-2 px-3 text-xs outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">After Image URL</label>
                  <input
                    type="text"
                    value={afterImage}
                    onChange={(e) => setAfterImage(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg py-2 px-3 text-xs outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 select-none">
                <input
                  type="checkbox"
                  id="featuredOnHomepage"
                  checked={featuredOnHomepage}
                  onChange={(e) => setFeaturedOnHomepage(e.target.checked)}
                  className="tech-checkbox"
                />
                <label htmlFor="featuredOnHomepage" className="text-xs font-semibold text-foreground cursor-pointer">Feature on Homepage</label>
              </div>

              {/* Submit */}
              <div className="pt-4 border-t border-border flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-card hover:bg-slate-100 dark:hover:bg-slate-900 border border-border text-foreground font-bold py-2 px-4 rounded-lg text-xs transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-lg text-xs shadow-md shadow-primary/10 transition cursor-pointer"
                >
                  Save Project
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
