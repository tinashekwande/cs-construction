// CS Construction Portal - Team Directory Management Page
'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/supabase';
import { TeamMember } from '@/lib/mockDb';
import GlassCard from '@/components/GlassCard';
import {
  Users,
  Plus,
  Trash2,
  Edit2,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Mail,
  Phone,
  Globe,
  X,
  Save,
  Lock,
  Briefcase
} from 'lucide-react';

export default function TeamPage() {
  const { user, role, canManageTeam } = useAuth();
  
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  // Form states
  const [fullName, setFullName] = useState('');
  const [position, setPosition] = useState('');
  const [biography, setBiography] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState(0);
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = async () => {
    try {
      const list = await db.team.list();
      setTeam(list);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    if (!canManageTeam) return;
    setEditingMember(null);
    setFullName('');
    setPosition('');
    setBiography('');
    setProfilePhoto('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80'); // placeholder female
    setQualifications('');
    setYearsOfExperience(5);
    setLinkedinUrl('');
    setEmail('');
    setPhoneNumber('');
    setIsVisible(true);
    setModalOpen(true);
  };

  const handleOpenEditModal = (member: TeamMember) => {
    if (!canManageTeam) return;
    setEditingMember(member);
    setFullName(member.full_name);
    setPosition(member.position);
    setBiography(member.biography || '');
    setProfilePhoto(member.profile_photo || '');
    setQualifications(member.qualifications || '');
    setYearsOfExperience(member.years_of_experience);
    setLinkedinUrl(member.linkedin_url || '');
    setEmail(member.email || '');
    setPhoneNumber(member.phone_number || '');
    setIsVisible(member.is_visible);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canManageTeam) return;
    
    const record: TeamMember = {
      id: editingMember ? editingMember.id : Math.random().toString(36).substring(2, 9),
      full_name: fullName,
      position,
      biography,
      profile_photo: profilePhoto || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
      qualifications,
      years_of_experience: Number(yearsOfExperience),
      linkedin_url: linkedinUrl,
      email,
      phone_number: phoneNumber,
      sort_order: editingMember ? editingMember.sort_order : team.length + 1,
      is_visible: isVisible,
      created_at: editingMember ? editingMember.created_at : new Date().toISOString()
    };

    try {
      await db.team.save(record, user?.email || 'admin');
      setModalOpen(false);
      loadTeam();
    } catch (err) {
      console.error(err);
      alert('Error saving team member.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!canManageTeam) return;
    if (confirm('Are you sure you want to remove this team member from the directory?')) {
      try {
        await db.team.delete(id, user?.email || 'admin');
        loadTeam();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleToggleVisibility = async (member: TeamMember) => {
    if (!canManageTeam) return;
    const updated = { ...member, is_visible: !member.is_visible };
    try {
      await db.team.save(updated, user?.email || 'admin');
      loadTeam();
    } catch (err) {
      console.error(err);
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    if (!canManageTeam) return;
    const list = [...team];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;
    
    // Extract ordered IDs
    const orderedIds = list.map(m => m.id);
    const temp = orderedIds[index];
    orderedIds[index] = orderedIds[targetIdx];
    orderedIds[targetIdx] = temp;

    try {
      await db.team.reorder(orderedIds, user?.email || 'admin');
      loadTeam();
    } catch (err) {
      console.error(err);
    }
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
      
      {/* Access Gate Lock Notice */}
      {!canManageTeam && (
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl text-primary text-xs font-semibold flex items-center gap-2 select-none animate-pulse-slow">
          <Lock size={14} />
          <span>Viewer Access Only: You do not have permissions to add, edit, or reorder team members.</span>
        </div>
      )}

      {/* Title & Actions Bar */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-card border border-border p-4 rounded-xl shadow-md">
        <div className="flex items-center gap-2.5">
          <Users className="text-primary" size={20} />
          <div>
            <h3 className="font-bold text-sm text-foreground">Team Listing Directory</h3>
            <p className="text-[10px] text-muted-foreground">Total staff displayed on homepage: {team.filter(t => t.is_visible).length} visible</p>
          </div>
        </div>

        {canManageTeam && (
          <button
            onClick={handleOpenAddModal}
            className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-3.5 rounded-lg flex items-center justify-center gap-1.5 text-xs shadow-md shadow-primary/10 transition cursor-pointer"
          >
            <Plus size={14} />
            <span>Add Team Member</span>
          </button>
        )}
      </div>

      {/* Cards List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member, idx) => (
          <GlassCard key={member.id} className={`flex flex-col justify-between group ${!member.is_visible ? 'opacity-50' : ''}`}>
            
            {/* Upper profile content */}
            <div>
              <div className="flex items-start gap-4">
                <img
                  src={member.profile_photo || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400'}
                  alt={member.full_name}
                  className="w-16 h-16 rounded-xl border border-slate-200 dark:border-slate-800 object-cover shrink-0 select-none"
                />
                <div className="min-w-0 flex-grow">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-sm text-slate-800 dark:text-white truncate">{member.full_name}</h4>
                    {!member.is_visible && (
                      <span className="bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[8px] font-bold px-1 py-0.5 rounded select-none shrink-0">HIDDEN</span>
                    )}
                  </div>
                  <p className="text-xs text-primary dark:text-primary font-semibold truncate mt-0.5">{member.position}</p>
                  <p className="text-[10px] text-slate-400 select-none mt-1 flex items-center gap-1">
                    <Briefcase size={10} />
                    <span>{member.years_of_experience} yrs experience</span>
                  </p>
                </div>
              </div>

              {/* Biography details */}
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 leading-relaxed line-clamp-3" title={member.biography}>
                {member.biography || 'No biography details provided.'}
              </p>

              {/* Qualifications badges */}
              {member.qualifications && (
                <div className="mt-3 bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850 p-2 rounded-lg text-[10px] text-slate-500 truncate">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Cert:</span> {member.qualifications}
                </div>
              )}
            </div>

            {/* Bottom Actions footer bar */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-900 flex items-center justify-between gap-4">
              {/* Contact Icons */}
              <div className="flex gap-2">
                {member.email && (
                  <a href={`mailto:${member.email}`} className="text-slate-400 hover:text-white" title={member.email}>
                    <Mail size={14} />
                  </a>
                )}
                {member.phone_number && (
                  <a href={`tel:${member.phone_number}`} className="text-slate-400 hover:text-white" title={member.phone_number}>
                    <Phone size={14} />
                  </a>
                )}
                {member.linkedin_url && (
                  <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary" title="LinkedIn Profile">
                    <Globe size={14} />
                  </a>
                )}
              </div>

              {/* Sorting & Edit Tools */}
              {canManageTeam && (
                <div className="flex items-center gap-1">
                  <button onClick={() => handleMove(idx, 'up')} disabled={idx === 0} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-900 rounded text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer">
                    <ArrowUp size={13} />
                  </button>
                  <button onClick={() => handleMove(idx, 'down')} disabled={idx === team.length - 1} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-900 rounded text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer">
                    <ArrowDown size={13} />
                  </button>
                  <button onClick={() => handleToggleVisibility(member)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-900 rounded text-slate-400 hover:text-primary cursor-pointer" title={member.is_visible ? 'Hide' : 'Show'}>
                    {member.is_visible ? <Eye size={13} /> : <EyeOff size={13} />}
                  </button>
                  <button onClick={() => handleOpenEditModal(member)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-900 rounded text-slate-400 hover:text-primary cursor-pointer" title="Edit Profile">
                    <Edit2 size={13} />
                  </button>
                  <button onClick={() => handleDelete(member.id)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-900 rounded text-slate-400 hover:text-red-500 cursor-pointer" title="Delete Profile">
                    <Trash2 size={13} />
                  </button>
                </div>
              )}
            </div>

          </GlassCard>
        ))}
      </div>

      {/* Add / Edit Modal Overlay */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModalOpen(false)}></div>
          
          <div className="relative glass-panel bg-card rounded-2xl max-w-xl w-full border border-border overflow-hidden shadow-2xl animate-scale-up">
            
            {/* Header */}
            <div className="p-5 border-b border-border flex justify-between items-center bg-slate-50 dark:bg-slate-900/60">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-primary" />
                <h4 className="font-bold text-sm text-foreground">{editingMember ? 'Edit Profile Details' : 'Add New Team Member'}</h4>
              </div>
              <button onClick={() => setModalOpen(false)} className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                <X size={16} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-5 max-h-[75vh] overflow-y-auto space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg py-2 px-3 text-xs outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Position *</label>
                  <input
                    type="text"
                    required
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="e.g. Project Foreman"
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg py-2 px-3 text-xs outline-none focus:border-primary"
                  />
                </div>
              </div>
 
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Qualifications</label>
                  <input
                    type="text"
                    value={qualifications}
                    onChange={(e) => setQualifications(e.target.value)}
                    placeholder="e.g. BSc Construction Management"
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg py-2 px-3 text-xs outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Years of Experience</label>
                  <input
                    type="number"
                    value={yearsOfExperience}
                    onChange={(e) => setYearsOfExperience(Number(e.target.value))}
                    min={0}
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg py-2 px-3 text-xs outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Biography</label>
                <textarea
                  rows={3}
                  value={biography}
                  onChange={(e) => setBiography(e.target.value)}
                  placeholder="Provide a brief background description..."
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg py-2 px-3 text-xs outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Profile Photo URL</label>
                <input
                  type="text"
                  value={profilePhoto}
                  onChange={(e) => setProfilePhoto(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg py-2 px-3 text-xs outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg py-2 px-3 text-xs outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Phone Number</label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg py-2 px-3 text-xs outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">LinkedIn Profile URL</label>
                  <input
                    type="text"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg py-2 px-3 text-xs outline-none focus:border-primary"
                  />
                </div>
                <div className="flex items-center gap-2 pt-5 select-none">
                  <input
                    type="checkbox"
                    id="isVisible"
                    checked={isVisible}
                    onChange={(e) => setIsVisible(e.target.checked)}
                    className="tech-checkbox"
                  />
                  <label htmlFor="isVisible" className="text-xs font-semibold text-foreground cursor-pointer">Visible on Website</label>
                </div>
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
                  Save Profile
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
