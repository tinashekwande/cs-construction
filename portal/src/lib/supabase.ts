// CS Construction Portal - Unified Database Client
// Integrates with Supabase when configuration env variables exist; falls back to mockDb when offline.

import { createClient } from '@supabase/supabase-js';
import { mockDb, TeamMember, Quote, Inquiry, Project, MediaFile, ActivityLog, Notification, WebsiteContent, Profile } from './mockDb';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = () => {
  return SUPABASE_URL.trim() !== '' && SUPABASE_ANON_KEY.trim() !== '';
};

// Initialize real Supabase client if configured
const supabase = isSupabaseConfigured() 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// Unified database operations wrapper
export const db = {
  // Profiles
  profiles: {
    list: async (): Promise<Profile[]> => {
      if (supabase) {
        const { data, error } = await supabase.from('profiles').select('*').order('email');
        if (!error && data) return data as Profile[];
      }
      return mockDb.getProfiles();
    },
    save: async (profile: Profile, actorEmail: string): Promise<void> => {
      if (supabase) {
        await supabase.from('profiles').upsert(profile);
        // Log activity in Supabase
        await supabase.from('activity_log').insert({
          user_email: actorEmail,
          action: `Updated profile & role of ${profile.email} to ${profile.role}`,
          module: 'User Management',
          ip_address: '192.168.1.10'
        });
      } else {
        mockDb.saveProfile(profile);
        mockDb.logActivity(actorEmail, `Updated profile & role of ${profile.email} to ${profile.role}`, 'User Management');
      }
    }
  },

  // Team Directory
  team: {
    list: async (): Promise<TeamMember[]> => {
      if (supabase) {
        const { data, error } = await supabase.from('team_members').select('*').order('sort_order', { ascending: true });
        if (!error && data) return data as TeamMember[];
      }
      return mockDb.getTeam().sort((a, b) => a.sort_order - b.sort_order);
    },
    save: async (member: TeamMember, actorEmail: string): Promise<void> => {
      if (supabase) {
        await supabase.from('team_members').upsert(member);
        await supabase.from('activity_log').insert({
          user_email: actorEmail,
          action: `Saved team member ${member.full_name}`,
          module: 'Team'
        });
        await supabase.from('notifications').insert({
          title: 'Team Update',
          message: `${member.full_name} profile has been added/updated.`,
          type: 'team'
        });
      } else {
        mockDb.saveTeamMember(member);
        mockDb.logActivity(actorEmail, `Saved team member ${member.full_name}`, 'Team');
      }
    },
    delete: async (id: string, actorEmail: string): Promise<void> => {
      if (supabase) {
        const { data: member } = await supabase.from('team_members').select('full_name').eq('id', id).single();
        await supabase.from('team_members').delete().eq('id', id);
        if (member) {
          await supabase.from('activity_log').insert({
            user_email: actorEmail,
            action: `Deleted team member ${member.full_name}`,
            module: 'Team'
          });
          await supabase.from('notifications').insert({
            title: 'Team Update',
            message: `Team member ${member.full_name} has been removed.`,
            type: 'team'
          });
        }
      } else {
        mockDb.deleteTeamMember(id);
      }
    },
    reorder: async (orderedIds: string[], actorEmail: string): Promise<void> => {
      if (supabase) {
        // Run update calls in Supabase for each ID (simplified)
        for (let i = 0; i < orderedIds.length; i++) {
          await supabase.from('team_members').update({ sort_order: i + 1 }).eq('id', orderedIds[i]);
        }
        await supabase.from('activity_log').insert({
          user_email: actorEmail,
          action: 'Reordered team members hierarchy',
          module: 'Team'
        });
      } else {
        mockDb.reorderTeam(orderedIds);
      }
    }
  },

  // Quote Requests
  quotes: {
    list: async (): Promise<Quote[]> => {
      if (supabase) {
        const { data, error } = await supabase.from('quotes').select('*').order('submission_date', { ascending: false });
        if (!error && data) return data as Quote[];
      }
      return mockDb.getQuotes().sort((a, b) => new Date(b.submission_date).getTime() - new Date(a.submission_date).getTime());
    },
    save: async (quote: Quote, actorEmail: string): Promise<void> => {
      if (supabase) {
        await supabase.from('quotes').upsert(quote);
        await supabase.from('activity_log').insert({
          user_email: actorEmail,
          action: `Updated quote request status for ${quote.client_name} to ${quote.status}`,
          module: 'Quotes'
        });
      } else {
        mockDb.saveQuote(quote);
      }
    },
    delete: async (id: string, actorEmail: string): Promise<void> => {
      if (supabase) {
        const { data: q } = await supabase.from('quotes').select('client_name').eq('id', id).single();
        await supabase.from('quotes').delete().eq('id', id);
        if (q) {
          await supabase.from('activity_log').insert({
            user_email: actorEmail,
            action: `Deleted quote request of ${q.client_name}`,
            module: 'Quotes'
          });
        }
      } else {
        mockDb.deleteQuote(id);
      }
    }
  },

  // Contact Inquiries
  inquiries: {
    list: async (): Promise<Inquiry[]> => {
      if (supabase) {
        const { data, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
        if (!error && data) return data as Inquiry[];
      }
      return mockDb.getInquiries().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    },
    save: async (inquiry: Inquiry, actorEmail: string): Promise<void> => {
      if (supabase) {
        await supabase.from('inquiries').upsert(inquiry);
      } else {
        mockDb.saveInquiry(inquiry);
      }
    },
    reply: async (id: string, replyMessage: string, actorEmail: string): Promise<void> => {
      if (supabase) {
        const { data: inq } = await supabase.from('inquiries').select('*').eq('id', id).single();
        if (inq) {
          const history = inq.conversation_history || [];
          history.push({
            sender: 'CS Construction Support',
            message: replyMessage,
            timestamp: new Date().toISOString()
          });
          await supabase.from('inquiries').update({
            status: 'Replied',
            conversation_history: history
          }).eq('id', id);
          
          await supabase.from('activity_log').insert({
            user_email: actorEmail,
            action: `Replied to inquiry "${inq.subject}" from ${inq.sender_name}`,
            module: 'Inquiries'
          });
        }
      } else {
        mockDb.replyToInquiry(id, replyMessage, actorEmail);
      }
    },
    delete: async (id: string, actorEmail: string): Promise<void> => {
      if (supabase) {
        const { data: inq } = await supabase.from('inquiries').select('sender_name').eq('id', id).single();
        await supabase.from('inquiries').delete().eq('id', id);
        if (inq) {
          await supabase.from('activity_log').insert({
            user_email: actorEmail,
            action: `Deleted inquiry from ${inq.sender_name}`,
            module: 'Inquiries'
          });
        }
      } else {
        mockDb.deleteInquiry(id);
      }
    }
  },

  // Project Portfolio
  projects: {
    list: async (): Promise<Project[]> => {
      if (supabase) {
        const { data, error } = await supabase.from('projects').select('*').order('completion_date', { ascending: false });
        if (!error && data) return data as Project[];
      }
      return mockDb.getProjects().sort((a, b) => new Date(b.completion_date).getTime() - new Date(a.completion_date).getTime());
    },
    save: async (project: Project, actorEmail: string): Promise<void> => {
      if (supabase) {
        await supabase.from('projects').upsert(project);
        await supabase.from('activity_log').insert({
          user_email: actorEmail,
          action: `Saved portfolio project: ${project.project_name}`,
          module: 'Portfolio'
        });
        await supabase.from('notifications').insert({
          title: 'Portfolio Update',
          message: `Project "${project.project_name}" has been updated.`,
          type: 'content'
        });
      } else {
        mockDb.saveProject(project);
      }
    },
    delete: async (id: string, actorEmail: string): Promise<void> => {
      if (supabase) {
        const { data: p } = await supabase.from('projects').select('project_name').eq('id', id).single();
        await supabase.from('projects').delete().eq('id', id);
        if (p) {
          await supabase.from('activity_log').insert({
            user_email: actorEmail,
            action: `Removed portfolio project: ${p.project_name}`,
            module: 'Portfolio'
          });
        }
      } else {
        mockDb.deleteProject(id);
      }
    }
  },

  // Media Library
  media: {
    list: async (): Promise<MediaFile[]> => {
      if (supabase) {
        const { data, error } = await supabase.from('media_files').select('*').order('uploaded_at', { ascending: false });
        if (!error && data) return data as MediaFile[];
      }
      return mockDb.getMediaFiles().sort((a, b) => new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime());
    },
    upload: async (file: Omit<MediaFile, 'id' | 'uploaded_at'>, actorEmail: string): Promise<void> => {
      const newFile: MediaFile = {
        ...file,
        id: Math.random().toString(36).substring(2, 9),
        uploaded_at: new Date().toISOString()
      };
      if (supabase) {
        await supabase.from('media_files').insert(newFile);
        await supabase.from('activity_log').insert({
          user_email: actorEmail,
          action: `Uploaded media file ${file.filename} to ${file.folder_path}`,
          module: 'Media'
        });
      } else {
        mockDb.addMediaFile(newFile);
      }
    },
    delete: async (id: string, actorEmail: string): Promise<void> => {
      if (supabase) {
        const { data: f } = await supabase.from('media_files').select('filename').eq('id', id).single();
        await supabase.from('media_files').delete().eq('id', id);
        if (f) {
          await supabase.from('activity_log').insert({
            user_email: actorEmail,
            action: `Deleted file ${f.filename}`,
            module: 'Media'
          });
        }
      } else {
        mockDb.deleteMediaFile(id);
      }
    }
  },

  // Activity Logs
  logs: {
    list: async (): Promise<ActivityLog[]> => {
      if (supabase) {
        const { data, error } = await supabase.from('activity_log').select('*').order('timestamp', { ascending: false });
        if (!error && data) return data as ActivityLog[];
      }
      return mockDb.getActivityLogs().sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    },
    log: async (actorEmail: string, action: string, module: string): Promise<void> => {
      if (supabase) {
        await supabase.from('activity_log').insert({
          user_email: actorEmail,
          action,
          module,
          ip_address: '192.168.1.10'
        });
      } else {
        mockDb.logActivity(actorEmail, action, module);
      }
    }
  },

  // Notifications Center
  notifications: {
    list: async (): Promise<Notification[]> => {
      if (supabase) {
        const { data, error } = await supabase.from('notifications').select('*').order('created_at', { ascending: false });
        if (!error && data) return data as Notification[];
      }
      return mockDb.getNotifications().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    },
    markRead: async (id: string): Promise<void> => {
      if (supabase) {
        await supabase.from('notifications').update({ is_read: true }).eq('id', id);
      } else {
        mockDb.markNotificationRead(id);
      }
    },
    markAllRead: async (): Promise<void> => {
      if (supabase) {
        await supabase.from('notifications').update({ is_read: true }).eq('is_read', false);
      } else {
        mockDb.markAllNotificationsRead();
      }
    }
  },

  // CMS Content
  cms: {
    list: async (): Promise<WebsiteContent[]> => {
      if (supabase) {
        const { data, error } = await supabase.from('website_content').select('*');
        if (!error && data) return data as WebsiteContent[];
      }
      return mockDb.getCmsContent();
    },
    save: async (id: string, updates: Partial<WebsiteContent>, actorEmail: string): Promise<void> => {
      if (supabase) {
        await supabase.from('website_content').update({
          ...updates,
          updated_at: new Date().toISOString()
        }).eq('id', id);
        
        await supabase.from('activity_log').insert({
          user_email: actorEmail,
          action: `Modified CMS content for "${id}" page (${updates.status || 'draft'})`,
          module: 'CMS'
        });
        await supabase.from('notifications').insert({
          title: 'CMS Page Update',
          message: `The "${id}" page content has been edited and saved as ${updates.status || 'draft'}.`,
          type: 'content'
        });
      } else {
        mockDb.saveCmsContent(id, updates);
      }
    }
  }
};
