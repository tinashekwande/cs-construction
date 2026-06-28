// CS Construction Portal - Mock Database Layer
// Runs in browser's localStorage for zero-config demo mode.

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: 'Super Admin' | 'Admin' | 'Editor' | 'Viewer';
  updated_at: string;
}

export interface TeamMember {
  id: string;
  full_name: string;
  position: string;
  biography: string;
  profile_photo: string;
  qualifications: string;
  years_of_experience: number;
  linkedin_url: string;
  email: string;
  phone_number: string;
  sort_order: number;
  is_visible: boolean;
  created_at: string;
}

export interface Quote {
  id: string;
  client_name: string;
  company_name: string;
  email: string;
  phone_number: string;
  project_type: string;
  budget_range: string;
  description: string;
  attachments: string[];
  status: 'New Requests' | 'In Progress' | 'Awaiting Response' | 'Approved' | 'Rejected';
  internal_notes: string;
  is_archived: boolean;
  submission_date: string;
}

export interface Inquiry {
  id: string;
  sender_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'New' | 'Read' | 'Replied';
  conversation_history: { sender: string; message: string; timestamp: string }[];
  created_at: string;
}

export interface Project {
  id: string;
  project_name: string;
  category: string;
  description: string;
  completion_date: string;
  location: string;
  client_name: string;
  before_images: string[];
  after_images: string[];
  featured_image: string;
  gallery: string[];
  featured_on_homepage: boolean;
  created_at: string;
}

export interface MediaFile {
  id: string;
  filename: string;
  url: string;
  size_bytes: number;
  mime_type: string;
  folder_path: string;
  uploaded_at: string;
}

export interface ActivityLog {
  id: string;
  user_email: string;
  action: string;
  module: string;
  ip_address: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'quote' | 'inquiry' | 'team' | 'content';
  is_read: boolean;
  created_at: string;
}

export interface WebsiteContent {
  id: string;
  content: any;
  status: 'draft' | 'published';
  meta_title: string;
  meta_description: string;
  og_settings: {
    title?: string;
    description?: string;
    image?: string;
  };
  updated_at: string;
}

// Initial High-Fidelity Demo Data
const INITIAL_PROFILES: Profile[] = [
  { id: '1', email: 'superadmin@cscon.co.za', full_name: 'John Doe', role: 'Super Admin', updated_at: new Date().toISOString() },
  { id: '2', email: 'admin@cscon.co.za', full_name: 'Sarah Smith', role: 'Admin', updated_at: new Date().toISOString() },
  { id: '3', email: 'editor@cscon.co.za', full_name: 'Mike Johnson', role: 'Editor', updated_at: new Date().toISOString() },
  { id: '4', email: 'viewer@cscon.co.za', full_name: 'David Lee', role: 'Viewer', updated_at: new Date().toISOString() }
];

const INITIAL_TEAM: TeamMember[] = [
  {
    id: 't1',
    full_name: 'Clinton Savage',
    position: 'Managing Director & Lead Contractor',
    biography: 'With over 20 years in high-end residential construction and commercial project management, Clinton heads up CS Construction with a focus on precision structural craftsmanship and client relationship management.',
    profile_photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    qualifications: 'BSc Construction Management, NHBRC Certified Builder',
    years_of_experience: 22,
    linkedin_url: 'https://linkedin.com/in/clinton-savage-cscon',
    email: 'clinton@csconstruction.co.za',
    phone_number: '+27 (82) 555-0192',
    sort_order: 1,
    is_visible: true,
    created_at: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 't2',
    full_name: 'Thabo Ndlovu',
    position: 'Senior Structural Foreman',
    biography: 'Thabo coordinates concrete pouring, structural steel works, and bricklaying schedules on our double-story and commercial projects, ensuring strict municipal building codes compliance.',
    profile_photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    qualifications: 'National Diploma in Civil Engineering',
    years_of_experience: 15,
    linkedin_url: 'https://linkedin.com/in/thabo-ndlovu-foreman',
    email: 'thabo@csconstruction.co.za',
    phone_number: '+27 (71) 555-8832',
    sort_order: 2,
    is_visible: true,
    created_at: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 't3',
    full_name: 'Leandra Weyers',
    position: 'Finishes Coordinator & Interior Liaison',
    biography: 'Leandra oversees high-end tiling, gypsum plaster skimming, cabinetry fittings, and luxury lighting details, bridging the gap between raw construction layout and aesthetic handover.',
    profile_photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    qualifications: 'Diploma in Interior Architecture & Design',
    years_of_experience: 8,
    linkedin_url: 'https://linkedin.com/in/leandra-weyers-design',
    email: 'leandra@csconstruction.co.za',
    phone_number: '+27 (73) 555-9821',
    sort_order: 3,
    is_visible: true,
    created_at: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const INITIAL_QUOTES: Quote[] = [
  {
    id: 'q1',
    client_name: 'Sarah & Mark Lawson',
    company_name: '',
    email: 'sarah.lawson@gmail.com',
    phone_number: '+27 (83) 555-0982',
    project_type: 'Renovation & Extension',
    budget_range: 'R 800,000 - R 1,500,000',
    description: 'Looking to demolish our dividing kitchen wall, build a custom 50m² dining extension outwards into the garden, and fit a luxury island with custom oak joinery.',
    attachments: ['kitchen_layout.pdf', 'site_photo_backyard.png'],
    status: 'New Requests',
    internal_notes: 'Highly motivated client. Property is in Sea Point. Needs structural engineer review for load-bearing wall removal.',
    is_archived: false,
    submission_date: new Date(Date.now() - 2 * 3600 * 1000).toISOString() // 2 hours ago
  },
  {
    id: 'q2',
    client_name: 'Arthur Miller',
    company_name: 'Miller Property Holdings',
    email: 'arthur@millerprop.co.za',
    phone_number: '+27 (82) 555-1100',
    project_type: 'New Residential Build',
    budget_range: 'R 3,000,000 +',
    description: 'Procured land in Rondebosch and looking to build a premium 400m² double-storey modern home. Architectural plans are already approved by city council.',
    attachments: ['approved_architectural_drawings.pdf', 'soil_survey_report.pdf'],
    status: 'In Progress',
    internal_notes: 'Meeting scheduled for site excavation planning next Tuesday. Soil is clay, rib-and-block foundation needed.',
    is_archived: false,
    submission_date: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString() // 2 days ago
  },
  {
    id: 'q3',
    client_name: 'Dr. Evelyn Jenkins',
    company_name: 'Prestige Clinic',
    email: 'evelyn@prestigeclinic.co.za',
    phone_number: '+27 (71) 555-9011',
    project_type: 'Commercial Refurbishment',
    budget_range: 'R 1,500,000 - R 3,000,000',
    description: 'Complete replacement of water piping system across 12 consulting rooms, installation of commercial-grade non-slip floor finishes, and new drywall partitions.',
    attachments: ['clinic_specifications.docx'],
    status: 'Awaiting Response',
    internal_notes: 'Sent formal quote estimate on Friday. Waiting for hospital board approval.',
    is_archived: false,
    submission_date: new Date(Date.now() - 6 * 24 * 3600 * 1000).toISOString()
  },
  {
    id: 'q4',
    client_name: 'David Kramer',
    company_name: '',
    email: 'david@kramer.co.za',
    phone_number: '+27 (84) 555-7761',
    project_type: 'Plumbing & Drainage Overhaul',
    budget_range: 'R 150,000 - R 400,000',
    description: 'Old galvanized pipe replacement in a heritage cottage, drainage clearing, and driveway cobblestone paving repair.',
    attachments: [],
    status: 'Approved',
    internal_notes: 'Deposit paid. Materials ordered. Work to commence on 20th June.',
    is_archived: false,
    submission_date: new Date(Date.now() - 12 * 24 * 3600 * 1000).toISOString()
  }
];

const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'i1',
    sender_name: 'Robert Mulder',
    email: 'robert@mulderelectrical.co.za',
    phone: '+27 (82) 555-4432',
    subject: 'Subcontracting Electrical Tenders',
    message: 'Good day, we are a registered electrical contractor and would love to tender for the electrical installations on your upcoming double-storey residential builds in Cape Town.',
    status: 'New',
    conversation_history: [],
    created_at: new Date(Date.now() - 4 * 3600 * 1000).toISOString() // 4 hrs ago
  },
  {
    id: 'i2',
    sender_name: 'Jane Harrison',
    email: 'jane@harrisonhomes.co.za',
    phone: '+27 (73) 555-1212',
    subject: 'Request for Client Reference',
    message: 'Hello, our firm is looking at contracting you for bricklaying and plastering on 3 townhouses in Durbanville. Could you provide 2 references of similar recent projects?',
    status: 'Read',
    conversation_history: [],
    created_at: new Date(Date.now() - 1.5 * 24 * 3600 * 1000).toISOString()
  },
  {
    id: 'i3',
    sender_name: 'Marcus Brody',
    email: 'marcus@brody.com',
    phone: '+27 (84) 555-8911',
    subject: 'Waterproofing Guarantee Inquiry',
    message: 'What is the standard guarantee duration for the torch-on waterproofing membranes applied to flat concrete roofs?',
    status: 'Replied',
    conversation_history: [
      { sender: 'Marcus Brody', message: 'What is the standard guarantee duration for the torch-on waterproofing membranes applied to flat concrete roofs?', timestamp: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString() },
      { sender: 'CS Construction Admin', message: 'Hi Marcus, we provide a standard 5-year workmanship guarantee on all torch-on bituminous roofing membranes, backed by our supplier product guarantees of 10 years.', timestamp: new Date(Date.now() - 3.8 * 24 * 3600 * 1000).toISOString() }
    ],
    created_at: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString()
  }
];

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p1',
    project_name: 'Luxury Kitchen & Dining Expansion',
    category: 'Renovations',
    description: 'A complete structural layout remodel, knocking down dividing walls to create a premium open-concept kitchen and custom quartz island.',
    completion_date: '2026-05-10',
    location: 'Sea Point, Cape Town',
    client_name: 'Sarah & Mark L.',
    before_images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80'],
    after_images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'],
    featured_image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80'
    ],
    featured_on_homepage: true,
    created_at: new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString()
  },
  {
    id: 'p2',
    project_name: 'Double-Storey Residential Build',
    category: 'Building',
    description: 'From foundation excavation to turnkey handover, a luxury modern family home incorporating detailed brickwork and concrete structure.',
    completion_date: '2026-04-18',
    location: 'Rondebosch, Cape Town',
    client_name: 'Arthur Family',
    before_images: ['https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=600&q=80'],
    after_images: ['https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80'],
    featured_image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'
    ],
    featured_on_homepage: true,
    created_at: new Date(Date.now() - 60 * 24 * 3600 * 1000).toISOString()
  },
  {
    id: 'p3',
    project_name: 'Modern Spa Bathroom Remodel',
    category: 'Plumbing',
    description: 'Replacing old galvanized pipes with premium PEX piping, adding a modern freestanding tub, floating vanity, and luxury porcelain tiling.',
    completion_date: '2026-05-24',
    location: 'Durbanville, Cape Town',
    client_name: 'Dr. Evelyn J.',
    before_images: ['https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80'],
    after_images: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80'],
    featured_image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
      'https://images.unsplash.com/photo-1552321554-5fecd8c7856a?w=800&q=80'
    ],
    featured_on_homepage: false,
    created_at: new Date(Date.now() - 15 * 24 * 3600 * 1000).toISOString()
  }
];

const INITIAL_MEDIA: MediaFile[] = [
  { id: 'm1', filename: 'approved_architectural_drawings.pdf', url: '#', size_bytes: 4200000, mime_type: 'application/pdf', folder_path: '/Drawings', uploaded_at: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString() },
  { id: 'm2', filename: 'soil_survey_report.pdf', url: '#', size_bytes: 1500000, mime_type: 'application/pdf', folder_path: '/Surveys', uploaded_at: new Date(Date.now() - 6 * 24 * 3600 * 1000).toISOString() },
  { id: 'm3', filename: 'kitchen_layout.pdf', url: '#', size_bytes: 900000, mime_type: 'application/pdf', folder_path: '/Projects', uploaded_at: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString() },
  { id: 'm4', filename: 'site_photo_backyard.png', url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80', size_bytes: 1800000, mime_type: 'image/png', folder_path: '/Photos', uploaded_at: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString() },
  { id: 'm5', filename: 'concrete_casting_detail.jpg', url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&q=80', size_bytes: 2200000, mime_type: 'image/jpeg', folder_path: '/Photos', uploaded_at: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString() }
];

const INITIAL_LOGS: ActivityLog[] = [
  { id: 'l1', user_email: 'superadmin@cscon.co.za', action: 'Published Home Page changes', module: 'CMS', ip_address: '192.168.1.10', timestamp: new Date(Date.now() - 1 * 3600 * 1000).toISOString() },
  { id: 'l2', user_email: 'admin@cscon.co.za', action: 'Approved quote request for David Kramer', module: 'Quotes', ip_address: '192.168.1.15', timestamp: new Date(Date.now() - 5 * 3600 * 1000).toISOString() },
  { id: 'l3', user_email: 'editor@cscon.co.za', action: 'Added team member Clinton Savage', module: 'Team', ip_address: '192.168.1.22', timestamp: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString() },
  { id: 'l4', user_email: 'admin@cscon.co.za', action: 'Created folder "/Drawings"', module: 'Media', ip_address: '192.168.1.15', timestamp: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString() }
];

const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'New Quote Request', message: 'Sarah & Mark Lawson submitted a quote request for "Renovation & Extension".', type: 'quote', is_read: false, created_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString() },
  { id: 'n2', title: 'New Website Message', message: 'Robert Mulder sent a subcontracting inquiry.', type: 'inquiry', is_read: false, created_at: new Date(Date.now() - 4 * 3600 * 1000).toISOString() },
  { id: 'n3', title: 'Team Directory Updated', message: 'Thabo Ndlovu was set to visible.', type: 'team', is_read: true, created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString() }
];

const INITIAL_CMS: WebsiteContent[] = [
  {
    id: 'home',
    content: {
      hero_title: 'Building Excellence, Restoring Trust',
      hero_subtitle: 'Premium residential construction, commercial partitioning, and custom plumbing solutions in Cape Town.',
      hero_cta: 'Request Free Quote',
      featured_tagline: 'High-end Construction Services'
    },
    status: 'published',
    meta_title: 'CS Construction | Premium Home Builders & Commercial Contractors',
    meta_description: 'CS Construction provides turnkey structural brickwork, bespoke kitchen expansions, professional acoustic drywalls, and certified plumbing across Cape Town.',
    og_settings: { title: 'CS Construction - Turnkey Construction Services', description: 'Exceptional structural building and premium finishes.', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800' },
    updated_at: new Date().toISOString()
  },
  {
    id: 'about',
    content: {
      company_history: 'Founded by Clinton Savage, CS Construction has grown from a specialized residential tiling team to a comprehensive principal contracting firm serving Cape Town’s Atlantic Seaboard and Southern Suburbs.',
      mission_statement: 'To construct structures that stand the test of time, delivered with absolute cost transparency, engineering precision, and architectural elegance.',
      values: ['Aesthetic Precision', 'Structural Integity', 'Client Cooperation', 'Safety First']
    },
    status: 'published',
    meta_title: 'About Us | CS Construction',
    meta_description: 'Learn about our journey, structural engineering values, and our construction team in Cape Town.',
    og_settings: {},
    updated_at: new Date().toISOString()
  },
  {
    id: 'services',
    content: {
      services_list: [
        { title: 'Turnkey Residential Building', desc: 'From site leveling, steel foundations, brickwork, to roof sheeting and final finishes.' },
        { title: 'Bespoke Home Renovations', desc: 'High-end structural remodels, expansions, open-concept conversions, and custom joinery.' },
        { title: 'Commercial Drywalling & Partitions', desc: 'Acoustic-insulated drywalling, partition planning, skim plastering, and corporate painting.' },
        { title: 'Advanced Plumbing & Copper Overhauls', desc: 'PEX re-piping, drainage laying, sub-surface leak detection, and sanitary ware fit-outs.' }
      ]
    },
    status: 'published',
    meta_title: 'Our Construction & Plumbing Services | CS Construction',
    meta_description: 'Explore our construction capabilities including structural concrete, luxury home renovations, acoustic drywalls, and high-performance plumbing.',
    og_settings: {},
    updated_at: new Date().toISOString()
  }
];

// Helper to get or set localStorage data
const getStore = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  const data = localStorage.getItem(`cscon_db_${key}`);
  if (!data) {
    localStorage.setItem(`cscon_db_${key}`, JSON.stringify(defaultValue));
    return defaultValue;
  }
  return JSON.parse(data);
};

const setStore = <T>(key: string, value: T): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(`cscon_db_${key}`, JSON.stringify(value));
  }
};

export const mockDb = {
  // Profiles & Auth
  getProfiles: () => getStore<Profile[]>('profiles', INITIAL_PROFILES),
  saveProfile: (p: Profile) => {
    const list = mockDb.getProfiles();
    const idx = list.findIndex(item => item.id === p.id);
    if (idx >= 0) list[idx] = p;
    else list.push(p);
    setStore('profiles', list);
    mockDb.logActivity('system', `Updated user role for ${p.email} to ${p.role}`, 'User Management');
  },

  // Team
  getTeam: () => getStore<TeamMember[]>('team', INITIAL_TEAM),
  saveTeamMember: (m: TeamMember) => {
    const list = mockDb.getTeam();
    const idx = list.findIndex(item => item.id === m.id);
    const isNew = idx < 0;
    if (!isNew) {
      list[idx] = m;
    } else {
      list.push(m);
    }
    setStore('team', list);
    mockDb.logActivity('system', `${isNew ? 'Added' : 'Updated'} team member ${m.full_name}`, 'Team');
    mockDb.createNotification('Team Update', `${m.full_name} profile has been ${isNew ? 'added' : 'updated'}.`, 'team');
  },
  deleteTeamMember: (id: string) => {
    const list = mockDb.getTeam();
    const member = list.find(item => item.id === id);
    const filtered = list.filter(item => item.id !== id);
    setStore('team', filtered);
    if (member) {
      mockDb.logActivity('system', `Deleted team member ${member.full_name}`, 'Team');
      mockDb.createNotification('Team Update', `Team member ${member.full_name} has been removed.`, 'team');
    }
  },
  reorderTeam: (orderedIds: string[]) => {
    const list = mockDb.getTeam();
    const reordered = orderedIds.map((id, index) => {
      const found = list.find(item => item.id === id);
      if (found) {
        return { ...found, sort_order: index + 1 };
      }
      return null;
    }).filter((x): x is TeamMember => x !== null);
    
    // Add any that were missing from orderedIds
    list.forEach(item => {
      if (!orderedIds.includes(item.id)) {
        reordered.push({ ...item, sort_order: reordered.length + 1 });
      }
    });

    setStore('team', reordered);
    mockDb.logActivity('system', 'Reordered team members hierarchy', 'Team');
  },

  // Quotes
  getQuotes: () => getStore<Quote[]>('quotes', INITIAL_QUOTES),
  saveQuote: (q: Quote) => {
    const list = mockDb.getQuotes();
    const idx = list.findIndex(item => item.id === q.id);
    const isNew = idx < 0;
    if (!isNew) list[idx] = q;
    else list.push(q);
    setStore('quotes', list);
    
    if (isNew) {
      mockDb.createNotification('New Quote Request', `${q.client_name} submitted a new quote request.`, 'quote');
      mockDb.logActivity('system', `Submitted new quote request: ${q.client_name}`, 'Quotes');
    } else {
      mockDb.logActivity('system', `Updated quote status for ${q.client_name} to "${q.status}"`, 'Quotes');
    }
  },
  deleteQuote: (id: string) => {
    const list = mockDb.getQuotes();
    const quote = list.find(item => item.id === id);
    const filtered = list.filter(item => item.id !== id);
    setStore('quotes', filtered);
    if (quote) {
      mockDb.logActivity('system', `Deleted quote record of ${quote.client_name}`, 'Quotes');
    }
  },

  // Inquiries
  getInquiries: () => getStore<Inquiry[]>('inquiries', INITIAL_INQUIRIES),
  saveInquiry: (inq: Inquiry) => {
    const list = mockDb.getInquiries();
    const idx = list.findIndex(item => item.id === inq.id);
    const isNew = idx < 0;
    if (!isNew) list[idx] = inq;
    else list.push(inq);
    setStore('inquiries', list);

    if (isNew) {
      mockDb.createNotification('New Inquiry Received', `Inquiry from ${inq.sender_name}: "${inq.subject}"`, 'inquiry');
      mockDb.logActivity('system', `Received contact inquiry from ${inq.sender_name}`, 'Inquiries');
    }
  },
  replyToInquiry: (id: string, replyMessage: string, senderEmail: string) => {
    const list = mockDb.getInquiries();
    const idx = list.findIndex(item => item.id === id);
    if (idx >= 0) {
      const inq = list[idx];
      const history = [...(inq.conversation_history || [])];
      history.push({
        sender: 'CS Construction Support',
        message: replyMessage,
        timestamp: new Date().toISOString()
      });
      list[idx] = {
        ...inq,
        status: 'Replied',
        conversation_history: history
      };
      setStore('inquiries', list);
      mockDb.logActivity(senderEmail, `Replied to inquiry: "${inq.subject}" from ${inq.sender_name}`, 'Inquiries');
    }
  },
  deleteInquiry: (id: string) => {
    const list = mockDb.getInquiries();
    const inq = list.find(item => item.id === id);
    const filtered = list.filter(item => item.id !== id);
    setStore('inquiries', filtered);
    if (inq) {
      mockDb.logActivity('system', `Deleted inquiry from ${inq.sender_name}`, 'Inquiries');
    }
  },

  // Projects
  getProjects: () => getStore<Project[]>('projects', INITIAL_PROJECTS),
  saveProject: (p: Project) => {
    const list = mockDb.getProjects();
    const idx = list.findIndex(item => item.id === p.id);
    const isNew = idx < 0;
    if (!isNew) list[idx] = p;
    else list.push(p);
    setStore('projects', list);
    mockDb.logActivity('system', `${isNew ? 'Added' : 'Updated'} project portfolio item: ${p.project_name}`, 'Portfolio');
    mockDb.createNotification('Portfolio Update', `Project "${p.project_name}" has been ${isNew ? 'published' : 'modified'}.`, 'content');
  },
  deleteProject: (id: string) => {
    const list = mockDb.getProjects();
    const p = list.find(item => item.id === id);
    const filtered = list.filter(item => item.id !== id);
    setStore('projects', filtered);
    if (p) {
      mockDb.logActivity('system', `Removed project portfolio item: ${p.project_name}`, 'Portfolio');
    }
  },

  // Media Files
  getMediaFiles: () => getStore<MediaFile[]>('media', INITIAL_MEDIA),
  addMediaFile: (f: MediaFile) => {
    const list = mockDb.getMediaFiles();
    list.push(f);
    setStore('media', list);
    mockDb.logActivity('system', `Uploaded file: ${f.filename} to ${f.folder_path}`, 'Media');
  },
  deleteMediaFile: (id: string) => {
    const list = mockDb.getMediaFiles();
    const f = list.find(item => item.id === id);
    const filtered = list.filter(item => item.id !== id);
    setStore('media', filtered);
    if (f) {
      mockDb.logActivity('system', `Deleted file: ${f.filename}`, 'Media');
    }
  },

  // Activity Log
  getActivityLogs: () => getStore<ActivityLog[]>('logs', INITIAL_LOGS),
  logActivity: (userEmail: string, action: string, module: string) => {
    const list = mockDb.getActivityLogs();
    list.unshift({
      id: Math.random().toString(36).substring(2, 9),
      user_email: userEmail,
      action,
      module,
      ip_address: '192.168.1.10',
      timestamp: new Date().toISOString()
    });
    // Keep last 200 logs
    setStore('logs', list.slice(0, 200));
  },
  clearActivityLogs: () => {
    setStore('logs', []);
  },

  // Notifications
  getNotifications: () => getStore<Notification[]>('notifications', INITIAL_NOTIFICATIONS),
  createNotification: (title: string, message: string, type: 'quote' | 'inquiry' | 'team' | 'content') => {
    const list = mockDb.getNotifications();
    list.unshift({
      id: Math.random().toString(36).substring(2, 9),
      title,
      message,
      type,
      is_read: false,
      created_at: new Date().toISOString()
    });
    setStore('notifications', list.slice(0, 50));
  },
  markNotificationRead: (id: string) => {
    const list = mockDb.getNotifications();
    const idx = list.findIndex(item => item.id === id);
    if (idx >= 0) {
      list[idx].is_read = true;
      setStore('notifications', list);
    }
  },
  markAllNotificationsRead: () => {
    const list = mockDb.getNotifications();
    list.forEach(item => { item.is_read = true; });
    setStore('notifications', list);
  },

  // CMS Content
  getCmsContent: () => getStore<WebsiteContent[]>('cms', INITIAL_CMS),
  saveCmsContent: (id: string, updates: Partial<WebsiteContent>) => {
    const list = mockDb.getCmsContent();
    const idx = list.findIndex(item => item.id === id);
    if (idx >= 0) {
      list[idx] = {
        ...list[idx],
        ...updates,
        updated_at: new Date().toISOString()
      };
      setStore('cms', list);
      mockDb.logActivity('system', `Updated ${id} page content (${updates.status || 'draft'})`, 'CMS');
      mockDb.createNotification('CMS Content Change', `The "${id}" page content has been edited.`, 'content');
    }
  }
};
