import { useState, useEffect } from 'react';
import gsap from 'gsap';

const CATEGORIES = ['All', 'Building', 'Renovations', 'Plumbing', 'Finishes'];

const PROJECTS = [
  {
    id: 1,
    title: 'Luxury Kitchen & Dining Expansion',
    category: 'Renovations',
    location: 'Sea Point, Cape Town',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    description: 'A complete structural layout remodel, knocking down dividing walls to create a premium open-concept kitchen and custom quartz island.',
    scope: ['Wall demolition', 'Geyser repositioning', 'High-end tiling', 'Drywall installation', 'Custom cabinetry fitting'],
    challenge: 'Managing load-bearing wall removals in a multi-story apartment block while maintaining strict noise and dust regulations.',
    solution: 'Engineered steel support beam installation combined with structural checks and scaffolding layout optimizations.',
    stats: { duration: '6 Weeks', client: 'Sarah & Mark L.', materials: 'Premium Quartz & Oak wood' }
  },
  {
    id: 2,
    title: 'Double-Storey Residential Build',
    category: 'Building',
    location: 'Rondebosch, Cape Town',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
    description: 'From foundation excavation to turnkey handover, a luxury modern family home incorporating detailed brickwork and concrete structure.',
    scope: ['Foundation concrete pouring', 'Detailed structural brickwork', 'Roof trusses & sheeting', 'Skimming and plastering', 'Drainage laying'],
    challenge: 'Clay soil conditions required reinforced concrete foundation structuring to prevent future settling or shift.',
    solution: 'Designed and poured a deep rib-and-block foundation system with steel reinforcement bars exceeding municipal specifications.',
    stats: { duration: '5 Months', client: 'Arthur Family', materials: 'Reinforced concrete & premium clay bricks' }
  },
  {
    id: 3,
    title: 'Modern Spa Bathroom Remodel',
    category: 'Plumbing',
    location: 'Durbanville, Cape Town',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
    description: 'Replacing old galvanized pipes with premium PEX piping, adding a modern freestanding tub, floating vanity, and luxury porcelain tiling.',
    scope: ['Copper to PEX piping overhaul', 'Freestanding bathtub plumb-in', 'Walk-in shower drainage block', 'Leak detection checks'],
    challenge: 'The old plumbing lines were hidden inside structural brick walls, presenting high risk of damage to electrical conduits.',
    solution: 'Utilized thermal imaging leak detection to map the internal walls, bypassing cables and re-routing pipe layouts safely.',
    stats: { duration: '3 Weeks', client: 'Dr. Evelyn J.', materials: 'Porcelain tiles & PEX piping' }
  },
  {
    id: 4,
    title: 'Premium Driveway Tiling & Paving',
    category: 'Finishes',
    location: 'Kraaifontein, Cape Town',
    image: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=800&q=80',
    description: 'A structural ground overhaul and installation of heavy-duty concrete pavers laid in a detailed herringbone layout for durability.',
    scope: ['Ground level leveling & compaction', 'Sub-base sand drainage layer', 'Herringbone paving layout', 'Concrete side retaining borders'],
    challenge: 'Steep incline driveway layout presented a major water pooling risk near the garage entrance during winter rains.',
    solution: 'Excavated a dual-line channel drain connection running directly into the main drainage system, preventing pooling.',
    stats: { duration: '2 Weeks', client: 'David K.', materials: 'Heavy-duty concrete pavers & river sand base' }
  },
  {
    id: 5,
    title: 'Waterproofing & Roof Overhaul',
    category: 'Building',
    location: 'Milnerton, Cape Town',
    image: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=800&q=80',
    description: 'Removing damaged timber beams, repairing structural trusses, and applying double-layer torch-on waterproofing membranes.',
    scope: ['Truss structural timber replacement', 'Torch-on waterproofing membrane', 'Corrugated iron roofing sheet fitting', 'Seamless aluminum guttering'],
    challenge: 'Exposed coastal winds required specialized wind-resistant fastening and extra-thick waterproofing layers to prevent salt corrosion.',
    solution: 'Applied premium anti-corrosive fasteners and finished with high-durability bituminous torch-on compound.',
    stats: { duration: '3 Weeks', client: 'Cape Properties Ltd', materials: 'Bituminous membrane & Treated timber' }
  },
  {
    id: 6,
    title: 'Luxury Office Drywalls & Skimming',
    category: 'Finishes',
    location: 'Century City, Cape Town',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    description: 'Installation of high-acoustic drywall panels with flawless skimming and painting to create executive meeting suites.',
    scope: ['Steel frame stud installation', 'Acoustic drywall fitting', 'Joint taping and skimming', 'Premium matte acrylic paint coats'],
    challenge: 'Flawless skimming required over high drywall junctions under bright direct ceiling spotlights.',
    solution: 'Applied three layers of gypsum skimming plaster with expert hand-sanding and cross-lighting inspection checks.',
    stats: { duration: '10 Days', client: 'InnoTech Workspace', materials: 'Gypsum board & acoustic insulation' }
  }
];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    // Animate cards on filter change
    gsap.fromTo('.gallery-card', 
      { opacity: 0, scale: 0.95, y: 15 },
      { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.08 }
    );
  }, [activeTab]);

  const filteredProjects = activeTab === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeTab);

  return (
    <section className="w-full bg-slate-50 min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}></div>
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <span className="uppercase text-[10px] font-semibold text-blue-600 tracking-widest font-geist bg-blue-50 border border-blue-200/50 rounded-full px-3.5 py-1.5 inline-block mb-4">
            Our Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl font-medium text-slate-900 tracking-tight font-jakarta mb-6 leading-tight">
            Premium Projects & Craftsmanship
          </h1>
          <p className="text-slate-600 font-jakarta text-base sm:text-lg leading-relaxed">
            Take a look at some of our residential builds, custom renovations, and plumbing solutions delivered across Cape Town. We pride ourselves on clean, honest workmanship.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 animate-fade-up delay-100">
          {CATEGORIES.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-xs font-medium tracking-tight font-geist transition-all duration-200 cursor-pointer ${
                activeTab === tab
                  ? 'bg-slate-900 text-white shadow-sm border border-slate-900'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900 shadow-sm'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="gallery-card bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300/80 transition-all duration-300 cursor-pointer flex flex-col group"
              style={{ contentVisibility: 'auto' }}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-white/95 text-slate-900 text-xs font-semibold font-geist px-4 py-2 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    View Project Details
                  </span>
                </div>
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-800 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-md border border-slate-200 shadow-sm font-geist">
                  {project.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <p className="text-[10px] font-semibold text-blue-600 tracking-wider uppercase mb-1 font-geist">
                    {project.location}
                  </p>
                  <h3 className="text-lg font-medium text-slate-900 tracking-tight font-jakarta mb-2 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 font-jakarta">
                    {project.description}
                  </p>
                </div>
                
                {/* Footer Info */}
                <div className="border-t border-slate-100 mt-4 pt-4 flex items-center justify-between text-[11px] text-slate-400 font-geist">
                  <span>Duration: <strong className="text-slate-600">{project.stats.duration}</strong></span>
                  <span className="text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                    Explore Details &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/60 backdrop-blur-md animate-fade-in">
          <div className="bg-white w-full max-w-4xl max-h-[85vh] rounded-3xl overflow-y-auto border border-slate-200 shadow-2xl relative animate-scale-up">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full border border-slate-200 bg-slate-50 text-slate-700 flex items-center justify-center hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-colors z-50 shadow cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            {/* Modal Body */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
              {/* Image banner */}
              <div className="md:col-span-6 relative aspect-video md:aspect-auto md:min-h-[500px] bg-slate-100">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="bg-blue-600 text-white text-[9px] uppercase font-bold tracking-widest px-3 py-1 rounded shadow-sm font-geist">
                    {selectedProject.category}
                  </span>
                  <h2 className="text-2xl font-medium text-white tracking-tight font-jakarta mt-2">
                    {selectedProject.title}
                  </h2>
                  <p className="text-white/80 text-xs font-geist mt-1">{selectedProject.location}</p>
                </div>
              </div>

              {/* Details column */}
              <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-geist mb-2">
                    Project Overview
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 font-jakarta">
                    {selectedProject.description}
                  </p>

                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-geist mb-3">
                    Scope of Work
                  </h4>
                  <ul className="grid grid-cols-1 gap-2 mb-6">
                    {selectedProject.scope.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-700 font-jakarta">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Challenge and Solution block */}
                  <div className="border-l-2 border-blue-600 pl-4 mb-6">
                    <p className="text-xs text-slate-500 italic font-jakarta mb-1">
                      <strong>The Challenge:</strong> {selectedProject.challenge}
                    </p>
                    <p className="text-xs text-slate-700 font-jakarta">
                      <strong>Our Solution:</strong> {selectedProject.solution}
                    </p>
                  </div>
                </div>

                {/* Modal footer statistics */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 grid grid-cols-2 gap-4 text-xs font-geist mt-4">
                  <div>
                    <span className="text-slate-400 block mb-0.5">Timeline</span>
                    <strong className="text-slate-800">{selectedProject.stats.duration}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Client Representative</span>
                    <strong className="text-slate-800">{selectedProject.stats.client}</strong>
                  </div>
                  <div className="col-span-2 border-t border-slate-200/60 pt-2 mt-2">
                    <span className="text-slate-400 block mb-0.5">Key Materials Used</span>
                    <strong className="text-slate-800">{selectedProject.stats.materials}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
