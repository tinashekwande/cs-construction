import { useState } from 'react';

const SERVICES_DATA = [
  {
    title: 'Renovations & Tiling',
    desc: 'Top-tier brickwork, plastering, skimming, professional tiling, painting, drywalls, and modern paving upgrades.',
    img: '/images/WhatsApp Image 2026-06-15 at 20.54.10.jpeg',
    tag: 'Finishes'
  },
  {
    title: 'Building & Brickwork',
    desc: 'Turnkey home builds, structural brickwork, extensions, boundary walls, and customized brick construction services.',
    img: '/images/WhatsApp Image 2026-06-15 at 20.54.05.jpeg',
    tag: 'Structural'
  },
  {
    title: 'Professional Plumbing',
    desc: 'Expert geyser installations, unblocking drains, advanced leak detections, pressure testing, and emergency pipe repairs.',
    img: '/images/WhatsApp Image 2026-06-15 at 20.54.01.jpeg',
    tag: 'Utilities'
  },
  {
    title: 'Roofing & Waterproofing',
    desc: 'Complete roof installations, advanced waterproofing systems, structural timber repair, ceiling replacement, and guttering.',
    img: '/images/WhatsApp Image 2026-06-13 at 16.08.54 (1).jpeg',
    tag: 'Protection'
  },
  {
    title: 'Maintenance & Partitioning',
    desc: 'Drywall partitioning, minor electrical repairs, painting maintenance, paving restorations, and structural repairs.',
    img: '/images/WhatsApp Image 2026-06-13 at 16.08.53.jpeg',
    tag: 'Support'
  }
];

export default function Services({ onOpenQuote }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Checklist items
  const [checklist, setChecklist] = useState({
    building: true,
    plumbing: true,
    renovations: true,
    roofing: true
  });

  const toggleChecklist = (key) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SERVICES_DATA.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SERVICES_DATA.length) % SERVICES_DATA.length);
  };

  const getCardStyle = (index) => {
    const diff = index - currentIndex;
    const absDiff = Math.abs(diff);

    const x = diff * 150;
    const z = -absDiff * 140;
    const rY = diff * -12;
    const scale = index === currentIndex ? 1.05 : 0.85 - (absDiff * 0.05);
    const opacity = 1 - (absDiff * 0.25);

    return {
      transform: `translateX(${x}px) translateZ(${z}px) rotateY(${rY}deg) scale(${scale})`,
      zIndex: 100 - absDiff,
      opacity: opacity >= 0 ? opacity : 0,
      pointerEvents: absDiff > 1 ? 'none' : 'auto',
      transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
    };
  };

  return (
    <section id="services" className="border-y motion-section bg-slate-50 border-slate-200 pt-24 pb-24 relative overflow-hidden">
      <div className="lg:px-8 max-w-7xl mr-auto ml-auto pr-6 pl-6">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-4 block font-geist">
            OUR CORE EXPERTISE
          </span>
          <h2 className="md:text-5xl text-3xl text-slate-900 tracking-tight mb-4 font-jakarta font-medium">
            Building &amp; Plumbing Services
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-geist">
            We provide a complete range of residential and commercial property construction and repair services in Cape Town.
          </p>
        </div>

        {/* Main Dashboard UI Grid */}
        <div className="glass-panel bg-white border-slate-200/80 rounded-2xl pt-1 pr-1 pb-1 pl-1 relative shadow-2xl">
          {/* Header mock */}
          <div className="flex bg-slate-100 h-10 border-slate-200 rounded-t-xl border-b pr-4 pl-4 gap-x-2 gap-y-2 items-center">
            <div className="w-3 h-3 rounded-full bg-slate-300"></div>
            <div className="w-3 h-3 rounded-full bg-slate-300"></div>
            <div className="w-3 h-3 rounded-full bg-slate-300"></div>
            <div className="ml-4 text-xs font-medium text-slate-400 font-geist">
              csconstruction.co.za/services
            </div>
          </div>

          <div className="md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white rounded-b-xl pt-6 pr-6 pb-6 pl-6 gap-x-10 gap-y-10">
            {/* Left Column: Scope Selector */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <iconify-icon icon="solar:checklist-minimalistic-linear" className="text-xl text-blue-600"></iconify-icon>
                <h3 className="font-medium text-lg text-slate-900 tracking-tight font-geist">
                  Project Scope
                </h3>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => toggleChecklist('building')}
                  className={`flex w-full items-center gap-4 p-4 border rounded-xl cursor-pointer hover:bg-slate-50 transition-all group text-left ${checklist.building ? 'border-blue-200 bg-blue-50/20' : 'border-slate-200 bg-transparent'}`}
                >
                  <span className={`w-5 h-5 border rounded flex items-center justify-center transition-all ${checklist.building ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white'}`}>
                    {checklist.building && <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>}
                  </span>
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors font-geist">
                    Building &amp; Extensions
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => toggleChecklist('plumbing')}
                  className={`flex w-full items-center gap-4 p-4 border rounded-xl cursor-pointer hover:bg-slate-50 transition-all group text-left ${checklist.plumbing ? 'border-blue-200 bg-blue-50/20' : 'border-slate-200 bg-transparent'}`}
                >
                  <span className={`w-5 h-5 border rounded flex items-center justify-center transition-all ${checklist.plumbing ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white'}`}>
                    {checklist.plumbing && <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>}
                  </span>
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors font-geist">
                    Plumbing &amp; Geysers
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => toggleChecklist('renovations')}
                  className={`flex w-full items-center gap-4 p-4 border rounded-xl cursor-pointer hover:bg-slate-50 transition-all group text-left ${checklist.renovations ? 'border-blue-200 bg-blue-50/20' : 'border-slate-200 bg-transparent'}`}
                >
                  <span className={`w-5 h-5 border rounded flex items-center justify-center transition-all ${checklist.renovations ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white'}`}>
                    {checklist.renovations && <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>}
                  </span>
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors font-geist">
                    Renovations &amp; Tiling
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => toggleChecklist('roofing')}
                  className={`flex w-full items-center gap-4 p-4 border rounded-xl cursor-pointer hover:bg-slate-50 transition-all group text-left ${checklist.roofing ? 'border-blue-200 bg-blue-50/20' : 'border-slate-200 bg-transparent'}`}
                >
                  <span className={`w-5 h-5 border rounded flex items-center justify-center transition-all ${checklist.roofing ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white'}`}>
                    {checklist.roofing && <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>}
                  </span>
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors font-geist">
                    Roofing &amp; Waterproofing
                  </span>
                </button>
              </div>
            </div>

            {/* Middle Column: Interactive Specialties Deck */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex mb-4 gap-x-3 gap-y-3 items-center justify-between">
                <div className="flex items-center gap-3">
                  <iconify-icon icon="solar:gallery-linear" className="text-xl text-blue-600"></iconify-icon>
                  <h3 className="text-lg font-medium text-slate-900 tracking-tight font-geist">
                    Our Specialties
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  {currentIndex + 1} / {SERVICES_DATA.length}
                </span>
              </div>

              <div className="flex flex-col [perspective:2000px] overflow-hidden bg-slate-50 w-full h-[480px] border-slate-200 border rounded-2xl relative items-center justify-center">
                {/* Navigation Buttons */}
                <div className="absolute w-full flex justify-between px-6 z-50 top-1/2 -translate-y-1/2 pointer-events-none">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-800 flex items-center justify-center pointer-events-auto hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-colors z-50 shadow-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m15 18-6-6 6-6"></path>
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-800 flex items-center justify-center pointer-events-auto hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-colors z-50 shadow-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </button>
                </div>

                {/* Deck Container */}
                <div id="deck-aura" className="relative w-[220px] h-[340px] sm:w-[250px] sm:h-[380px] [transform-style:preserve-3d]">
                  {SERVICES_DATA.map((service, index) => {
                    const isCurrent = index === currentIndex;
                    return (
                      <div
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className="carousel-card absolute inset-0 cursor-pointer group"
                        style={getCardStyle(index)}
                      >
                        <div className={`relative w-full h-full rounded-[24px] overflow-hidden bg-slate-900 border transition-all duration-400 ${isCurrent ? 'shadow-2xl border-blue-500/50' : 'shadow-md border-slate-200 hover:border-slate-400'}`}>
                          <img
                            src={service.img}
                            alt={service.title}
                            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${isCurrent ? 'brightness-75' : 'brightness-50 group-hover:brightness-60'}`}
                          />
                          <div className={`absolute inset-x-0 bottom-0 p-6 pt-20 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent transition-all duration-400 pointer-events-none ${isCurrent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'}`}>
                            <span className="text-[9px] uppercase font-bold tracking-widest text-blue-400 mb-1 block">
                              {service.tag}
                            </span>
                            <h3 className="text-[1.1rem] font-semibold text-white tracking-tight mb-1.5 font-geist">
                              {service.title}
                            </h3>
                            <p className="text-[11px] text-slate-300 leading-relaxed font-geist">
                              {service.desc}
                            </p>
                          </div>
                          <div className={`active-dot absolute top-5 right-5 w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_15px_#3b82f6] transition-opacity duration-300 ${isCurrent ? 'opacity-100' : 'opacity-0'}`}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination */}
                <div className="flex gap-2.5 z-50 absolute bottom-6 items-center justify-center">
                  {SERVICES_DATA.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setCurrentIndex(index)}
                      className={`rounded-full transition-all duration-300 ${index === currentIndex ? 'w-2 h-2 bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.8)]' : 'w-1.5 h-1.5 bg-slate-300 hover:bg-slate-500'}`}
                    ></button>
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-400 mt-4 text-center font-geist">
                Browse our core specialties inside the deck card stack.
              </p>
            </div>

            {/* Right Column: Values & Sliders */}
            <div className="lg:col-span-3 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <iconify-icon icon="solar:tuning-square-2-linear" className="text-xl text-blue-600"></iconify-icon>
                <h3 className="text-lg font-medium text-slate-900 tracking-tight font-geist">
                  CS Quality Metrics
                </h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-500 font-geist uppercase tracking-wider">
                    <span>Workmanship Quality</span>
                    <span className="text-blue-600">Premium Standard</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '98%' }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-500 font-geist uppercase tracking-wider">
                    <span>Service Honesty</span>
                    <span className="text-blue-600">Unwavering</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-500 font-geist uppercase tracking-wider">
                    <span>Response Time</span>
                    <span className="text-blue-600">Rapid Delivery</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-500 font-geist uppercase tracking-wider">
                    <span>Team Expertise</span>
                    <span className="text-blue-600">10 Years Experience</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex mt-12 justify-center">
          <button 
            onClick={(e) => { e.preventDefault(); onOpenQuote(); }} 
            className="btn-brand-red h-11 px-6 rounded-xl text-xs font-semibold tracking-wide font-geist hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center"
          >
            Request a Free Estimate
          </button>
        </div>
      </div>
    </section>
  );
}
