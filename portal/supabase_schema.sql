-- CS Construction Portal - Supabase Schema
-- Paste this schema into your Supabase SQL Editor.

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles (User accounts linked to auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  role text not null default 'Viewer' check (role in ('Super Admin', 'Admin', 'Editor', 'Viewer')),
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

comment on table public.profiles is 'Stores user roles and profiles for CS Construction Portal.';

-- Enable RLS on Profiles
alter table public.profiles enable row level security;

-- 2. Team Members
create table public.team_members (
  id uuid default uuid_generate_v4() primary key,
  full_name text not null,
  position text not null,
  biography text,
  profile_photo text,
  qualifications text,
  years_of_experience integer default 0,
  linkedin_url text,
  email text,
  phone_number text,
  sort_order integer default 0,
  is_visible boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.team_members enable row level security;

-- 3. Quotes
create table public.quotes (
  id uuid default uuid_generate_v4() primary key,
  client_name text not null,
  company_name text,
  email text not null,
  phone_number text,
  project_type text not null,
  budget_range text not null,
  description text,
  attachments text[] default '{}'::text[],
  status text default 'New Requests' check (status in ('New Requests', 'In Progress', 'Awaiting Response', 'Approved', 'Rejected')),
  internal_notes text,
  is_archived boolean default false,
  submission_date timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.quotes enable row level security;

-- 4. Inquiries
create table public.inquiries (
  id uuid default uuid_generate_v4() primary key,
  sender_name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  status text default 'New' check (status in ('New', 'Read', 'Replied')),
  conversation_history jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.inquiries enable row level security;

-- 5. Projects (Portfolio)
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  project_name text not null,
  category text not null,
  description text,
  completion_date text,
  location text,
  client_name text,
  before_images text[] default '{}'::text[],
  after_images text[] default '{}'::text[],
  featured_image text,
  gallery text[] default '{}'::text[],
  featured_on_homepage boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.projects enable row level security;

-- 6. Media Files
create table public.media_files (
  id uuid default uuid_generate_v4() primary key,
  filename text not null,
  url text not null,
  size_bytes integer not null,
  mime_type text not null,
  folder_path text default '/' not null,
  uploaded_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.media_files enable row level security;

-- 7. Activity Log (Audit logs)
create table public.activity_log (
  id uuid default uuid_generate_v4() primary key,
  user_email text not null,
  action text not null,
  module text not null,
  ip_address text,
  timestamp timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.activity_log enable row level security;

-- 8. Notifications
create table public.notifications (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  message text not null,
  type text not null check (type in ('quote', 'inquiry', 'team', 'content')),
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.notifications enable row level security;

-- 9. Website Content (CMS)
create table public.website_content (
  id text primary key,
  content jsonb not null default '{}'::jsonb,
  status text default 'draft' check (status in ('draft', 'published')),
  meta_title text,
  meta_description text,
  og_settings jsonb default '{}'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.website_content enable row level security;


-- ==========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================================

-- Helper function to check user role from public.profiles
create or replace function public.get_current_user_role()
returns text as $$
  select role from public.profiles where id = auth.uid();
$$ language sql security definer;

-- 1. Profiles Policies
create policy "Users can view their own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Super Admins can manage all profiles" on public.profiles
  for all using (public.get_current_user_role() = 'Super Admin');

-- 2. Team Members Policies
create policy "Anyone can read team members" on public.team_members
  for select using (true);

create policy "Super Admin, Admin, and Editor can manage team members" on public.team_members
  for all using (public.get_current_user_role() in ('Super Admin', 'Admin', 'Editor'));

-- 3. Quotes Policies
create policy "Super Admin, Admin, and Viewer can read quotes" on public.quotes
  for select using (public.get_current_user_role() in ('Super Admin', 'Admin', 'Viewer'));

create policy "Super Admin and Admin can manage quotes" on public.quotes
  for all using (public.get_current_user_role() in ('Super Admin', 'Admin'));

-- 4. Inquiries Policies
create policy "Super Admin, Admin, and Viewer can read inquiries" on public.inquiries
  for select using (public.get_current_user_role() in ('Super Admin', 'Admin', 'Viewer'));

create policy "Super Admin and Admin can manage inquiries" on public.inquiries
  for all using (public.get_current_user_role() in ('Super Admin', 'Admin'));

-- 5. Projects Policies
create policy "Anyone can read projects" on public.projects
  for select using (true);

create policy "Super Admin, Admin, and Editor can manage projects" on public.projects
  for all using (public.get_current_user_role() in ('Super Admin', 'Admin', 'Editor'));

-- 6. Media Files Policies
create policy "Super Admin, Admin, and Editor can view media files" on public.media_files
  for select using (public.get_current_user_role() in ('Super Admin', 'Admin', 'Editor', 'Viewer'));

create policy "Super Admin, Admin, and Editor can manage media files" on public.media_files
  for all using (public.get_current_user_role() in ('Super Admin', 'Admin', 'Editor'));

-- 7. Activity Log Policies
create policy "Super Admin and Admin can view activity logs" on public.activity_log
  for select using (public.get_current_user_role() in ('Super Admin', 'Admin'));

create policy "System can write activity logs" on public.activity_log
  for insert with check (true);

-- 8. Notifications Policies
create policy "Super Admin, Admin, and Editor can read notifications" on public.notifications
  for select using (public.get_current_user_role() in ('Super Admin', 'Admin', 'Editor', 'Viewer'));

create policy "Super Admin and Admin can update notifications" on public.notifications
  for update using (public.get_current_user_role() in ('Super Admin', 'Admin'));

create policy "System can insert notifications" on public.notifications
  for insert with check (true);

-- 9. Website Content Policies
create policy "Anyone can read published website content" on public.website_content
  for select using (status = 'published' or public.get_current_user_role() in ('Super Admin', 'Admin', 'Editor', 'Viewer'));

create policy "Super Admin, Admin, and Editor can manage website content" on public.website_content
  for all using (public.get_current_user_role() in ('Super Admin', 'Admin', 'Editor'));


-- ==========================================================
-- TRIGGERS AND PROCEDURES
-- ==========================================================

-- Trigger to create a profile automatically when a user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'Viewer');
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
