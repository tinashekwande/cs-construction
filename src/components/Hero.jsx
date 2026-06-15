import { useEffect } from 'react';

export default function Hero({ onOpenQuote }) {
  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.pageYOffset - 88,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const initUnicorn = () => {
      if (window.UnicornStudio) {
        try {
          window.UnicornStudio.init();
        } catch (err) {
          console.error("UnicornStudio init failed", err);
        }
      }
    };
    initUnicorn();
    // Fallback if script hasn't fully loaded yet
    window.addEventListener('load', initUnicorn);
    return () => window.removeEventListener('load', initUnicorn);
  }, []);

  return (
    <section id="hero" className="w-full relative overflow-hidden bg-slate-50 z-0">
      {/* Unicorn Studio 3D WebGL background (inverted for light theme) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-80" data-container-bg="true">
        <div data-us-project="N9XzvQXu7fA5SY2ewADJ" style={{ width: '100%', height: '100%', filter: 'invert(0.95) hue-rotate(180deg) brightness(1.02) contrast(0.95)' }}></div>
      </div>

      {/* Background soft meshes */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[100px]"></div>
      </div>

      <div className="lg:px-8 flex flex-col md:flex-row max-w-7xl mx-auto pt-36 pr-6 pb-24 pl-6 md:pt-40 md:pb-32 lg:pt-44 lg:pb-40 items-center motion-section relative z-10 w-full">
        <div className="flex-1 md:text-left z-10 text-center relative">
        <div className="inline-flex gap-2 animate-fade-up uppercase text-[10px] font-semibold text-slate-700 tracking-widest font-geist bg-slate-100 border-slate-200/80 border rounded-full mb-8 pt-1.5 pr-3.5 pb-1.5 pl-3.5 gap-x-2 gap-y-2 items-center spring-in shadow-sm backdrop-blur-md">
          10+ Years of Excellence
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
        </div>

        <h1 className="md:text-6xl lg:text-7xl leading-[1.05] animate-fade-up delay-100 text-4xl font-medium text-slate-900 tracking-tight font-jakarta mb-6 spring-in">
          Building your vision,<br />crafting your spaces
        </h1>

        <p className="md:text-lg md:mx-0 leading-relaxed animate-fade-up delay-200 text-base text-slate-600 font-jakarta max-w-xl mr-auto mb-10 ml-auto spring-in">
          CS Construction & Projects Pty Ltd specializes in high-quality building, luxury renovations, and expert plumbing services in Cape Town. No project is too small, no vision is too large.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 md:justify-start animate-fade-up delay-300 gap-x-6 gap-y-6 items-center justify-center spring-in">
          <button 
            onClick={(e) => { e.preventDefault(); onOpenQuote(); }} 
            className="btn-brand-red h-11 px-6 rounded-xl text-xs font-semibold tracking-wide font-geist hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center"
          >
            Request a Quote
          </button>
          <a href="#services" onClick={(e) => handleScroll(e, 'services')} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors border-b border-transparent hover:border-slate-900 pb-0.5 font-geist">
            Explore Our Services &rarr;
          </a>
        </div>
      </div>

      {/* Mobile: single centered image showcase */}
      <div className="block md:hidden w-full mt-12 flex justify-center spring-in animate-fade-up delay-200">
        <div className="relative w-56 aspect-[2/3] overflow-hidden rounded-2xl border border-slate-200 shadow-xl">
          <div className="z-10 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent absolute inset-0"></div>
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" alt="Renovation Work" className="w-full h-full object-cover" />
          <div className="text-[0.6rem] uppercase font-semibold text-blue-600 tracking-wider font-geist bg-white z-20 rounded-md py-1 px-2.5 absolute top-3 right-3 shadow">
            Renovations
          </div>
          <div className="absolute bottom-6 left-4 right-4 z-20">
            <p className="text-[10px] tracking-widest text-white/70 mb-1.5 uppercase font-geist">
              Luxury Finishes
            </p>
            <h3 className="text-lg tracking-tight text-white leading-tight mb-1 font-jakarta font-medium">
              Home Interior<br />Renovations
            </h3>
            <p className="text-[10px] text-white/50 font-geist">By CS Construction</p>
          </div>
        </div>
      </div>

      {/* Tablet+: three overlapping cards */}
      <div className="flex-1 hidden md:block animate-fade-up delay-200 w-full h-[460px] lg:h-[500px] max-w-lg relative perspective-midrange spring-in">
        {/* Back right cover */}
        <div className="aspect-[2/3] overflow-hidden book-float-2 opacity-50 w-64 z-10 border-slate-200 border rounded-2xl absolute top-10 right-4 shadow-xl">
          <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80" alt="Tiling Work" className="w-full h-full object-cover grayscale opacity-60" />
          <div className="z-10 bg-gradient-to-t from-slate-950/50 via-slate-950/0 to-slate-950/20 absolute top-0 right-0 bottom-0 left-0"></div>
        </div>

        {/* Back left cover */}
        <div className="aspect-[2/3] overflow-hidden book-float-1 opacity-70 w-64 border-slate-200 border rounded-2xl absolute top-20 left-0 shadow-xl">
          <div className="bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent z-10 absolute inset-0"></div>
          <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80" alt="Building Construction" className="w-full h-full object-cover" />
          <div className="absolute bottom-6 left-4 right-4 z-20">
            <p className="text-xs tracking-widest text-slate-300 mb-1 font-geist">
              BUILDING
            </p>
            <h3 className="text-xl tracking-tight text-white leading-tight font-jakarta font-medium">
              Turnkey Projects
            </h3>
          </div>
        </div>

        {/* Main front cover */}
        <div className="left-1/2 -translate-x-1/2 aspect-[2/3] overflow-hidden z-20 transition-transform duration-500 hover:scale-105 w-72 border-slate-300/80 border rounded-2xl absolute top-0 shadow-2xl">
          <div className="z-10 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent absolute inset-0"></div>
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" alt="Renovation Work" className="w-full h-full object-cover" />
          <div className="text-[0.65rem] uppercase font-semibold text-blue-600 tracking-wider font-geist bg-white z-20 rounded-md pt-1.5 pr-2.5 pb-1.5 pl-2.5 absolute top-4 right-4 shadow">
            PREMIUM
          </div>
          <div className="absolute bottom-8 left-6 right-6 z-20">
            <p className="text-xs tracking-widest text-white/70 mb-2 uppercase font-geist">
              RENOVATIONS
            </p>
            <h3 className="text-2xl tracking-tight text-white leading-tight mb-2 font-jakarta font-medium">
              Luxury Kitchens<br />& Extensions
            </h3>
            <p className="text-xs text-white/50 font-geist">10 Years Quality</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}
