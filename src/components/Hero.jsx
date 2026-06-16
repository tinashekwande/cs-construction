import { useEffect, useState, useRef, useCallback } from 'react';
import { HERO_SLIDESHOW_IMAGES } from './Gallery';

// SlidingCard renders a single card position (front/back-left/back-right).
// Instead of swapping src, it layers ALL images on top of each other and
// crossfades between them with opacity + a Ken Burns zoom on the active one.
function SlideCard({ currentIndex, offset = 0, className = '', labelSlot = null, grayscale = false }) {
  const total = HERO_SLIDESHOW_IMAGES.length;
  const activeIdx = (currentIndex + offset) % total;

  return (
    <div className={`overflow-hidden rounded-2xl ${className}`}>
      {/* Stack every image; only the active one is fully opaque */}
      {HERO_SLIDESHOW_IMAGES.map((slide, i) => {
        const isActive = i === activeIdx;
        return (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.label}
            className={[
              'absolute inset-0 w-full h-full object-cover',
              grayscale ? 'grayscale' : '',
              // Ken Burns: active image slowly zooms in over 5s
              isActive ? 'scale-110 animate-ken-burns' : 'scale-100',
            ].join(' ')}
            style={{
              opacity: isActive ? 1 : 0,
              transition: 'opacity 900ms cubic-bezier(0.4,0,0.2,1)',
              willChange: 'opacity, transform',
            }}
          />
        );
      })}
      {/* Overlay and label rendered on top */}
      {labelSlot}
    </div>
  );
}

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

  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);
  const total = HERO_SLIDESHOW_IMAGES.length;

  const startTimer = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % total);
    }, 5000);
  }, [total]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(intervalRef.current);
  }, [startTimer]);

  const goTo = (i) => {
    setCurrentSlide(i);
    startTimer(); // reset timer on manual change
  };

  useEffect(() => {
    const initUnicorn = () => {
      if (window.UnicornStudio) {
        try { window.UnicornStudio.init(); } catch (err) { /* silent */ }
      }
    };
    initUnicorn();
    window.addEventListener('load', initUnicorn);
    return () => window.removeEventListener('load', initUnicorn);
  }, []);

  const frontSlide  = HERO_SLIDESHOW_IMAGES[currentSlide];
  const leftSlide   = HERO_SLIDESHOW_IMAGES[(currentSlide + 1) % total];
  const rightSlide  = HERO_SLIDESHOW_IMAGES[(currentSlide + 2) % total];

  return (
    <>
      {/* Ken Burns keyframe injected once */}
      <style>{`
        @keyframes kenBurns {
          0%   { transform: scale(1);    }
          100% { transform: scale(1.12); }
        }
        .animate-ken-burns {
          animation: kenBurns 6s ease-in-out forwards;
        }
      `}</style>

      <section id="hero" className="w-full relative overflow-hidden bg-slate-50 z-0">
        {/* Unicorn Studio WebGL background */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-80" data-container-bg="true">
          <div data-us-project="N9XzvQXu7fA5SY2ewADJ" style={{ width: '100%', height: '100%', filter: 'invert(0.95) hue-rotate(180deg) brightness(1.02) contrast(0.95)' }}></div>
        </div>

        {/* Soft background blobs */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[100px]"></div>
        </div>

        <div className="lg:px-8 flex flex-col md:flex-row max-w-7xl mx-auto pt-36 pr-6 pb-24 pl-6 md:pt-40 md:pb-32 lg:pt-44 lg:pb-40 items-center motion-section relative z-10 w-full">

          {/* ── LEFT: Text block ─────────────────────────────────────────── */}
          <div className="flex-1 md:text-left z-10 text-center relative">
            <div className="inline-flex gap-2 animate-fade-up uppercase text-[10px] font-semibold text-slate-700 tracking-widest font-geist bg-slate-100 border-slate-200/80 border rounded-full mb-8 pt-1.5 pr-3.5 pb-1.5 pl-3.5 items-center spring-in shadow-sm backdrop-blur-md">
              10+ Years of Excellence
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
            </div>

            <h1 className="md:text-6xl lg:text-7xl leading-[1.05] animate-fade-up delay-100 text-4xl font-medium text-slate-900 tracking-tight font-jakarta mb-6 spring-in">
              Building your vision,<br />crafting your spaces
            </h1>

            <p className="md:text-lg md:mx-0 leading-relaxed animate-fade-up delay-200 text-base text-slate-600 font-jakarta max-w-xl mr-auto mb-10 ml-auto spring-in">
              CS Construction &amp; Projects Pty Ltd specializes in high-quality building, luxury renovations, and expert plumbing services in Cape Town. No project is too small, no vision is too large.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 md:justify-start animate-fade-up delay-300 items-center justify-center spring-in">
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

            {/* Progress-bar dot indicators */}
            <div className="flex gap-2 mt-8 justify-center md:justify-start items-center">
              {HERO_SLIDESHOW_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`rounded-full transition-all duration-500 ease-out ${i === currentSlide ? 'w-7 h-1.5 bg-blue-600' : 'w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400'}`}
                />
              ))}
            </div>
          </div>

          {/* ── MOBILE: single card ───────────────────────────────────────── */}
          <div className="block md:hidden w-full mt-12 flex justify-center spring-in animate-fade-up delay-200">
            <div className="relative w-56 aspect-[2/3] border border-slate-200 shadow-xl rounded-2xl">
              {/* Crossfading image stack */}
              <SlideCard
                currentIndex={currentSlide}
                offset={0}
                className="absolute inset-0"
              />
              {/* Overlays */}
              <div className="z-10 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent absolute inset-0 rounded-2xl pointer-events-none"></div>
              <div className="text-[0.6rem] uppercase font-semibold text-blue-600 tracking-wider font-geist bg-white z-20 rounded-md py-1 px-2.5 absolute top-3 right-3 shadow"
                style={{ transition: 'opacity 600ms', opacity: 1 }}>
                {frontSlide.category}
              </div>
              <div className="absolute bottom-6 left-4 right-4 z-20">
                <p className="text-[10px] tracking-widest text-white/70 mb-1.5 uppercase font-geist">{frontSlide.category}</p>
                <h3
                  className="text-lg tracking-tight text-white leading-tight mb-1 font-jakarta font-medium"
                  style={{ transition: 'opacity 600ms ease', opacity: 1 }}
                >
                  {frontSlide.label}
                </h3>
                <p className="text-[10px] text-white/50 font-geist">By CS Construction</p>
              </div>
            </div>
          </div>

          {/* ── DESKTOP: three overlapping cards ─────────────────────────── */}
          <div className="flex-1 hidden md:flex animate-fade-up delay-200 w-full h-[460px] lg:h-[500px] max-w-lg relative perspective-midrange spring-in items-start justify-center">

            {/* Back-right card */}
            <div className="aspect-[2/3] book-float-2 opacity-50 w-64 z-10 border-slate-200 border rounded-2xl absolute top-10 right-4 shadow-xl"
                 style={{ willChange: 'opacity, transform' }}>
              <SlideCard
                currentIndex={currentSlide}
                offset={2}
                grayscale
                className="absolute inset-0 opacity-60"
              />
              <div className="z-10 bg-gradient-to-t from-slate-950/50 via-slate-950/0 to-slate-950/20 absolute inset-0 rounded-2xl pointer-events-none"></div>
            </div>

            {/* Back-left card */}
            <div className="aspect-[2/3] book-float-1 opacity-70 w-64 border-slate-200 border rounded-2xl absolute top-20 left-0 shadow-xl z-10"
                 style={{ willChange: 'opacity, transform' }}>
              <SlideCard
                currentIndex={currentSlide}
                offset={1}
                className="absolute inset-0"
              />
              <div className="bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent z-10 absolute inset-0 rounded-2xl pointer-events-none"></div>
              {/* Animated label */}
              <div className="absolute bottom-6 left-4 right-4 z-20 pointer-events-none">
                <p
                  key={`bl-cat-${currentSlide}`}
                  className="text-xs tracking-widest text-slate-300 mb-1 font-geist uppercase"
                  style={{ animation: 'fadeSlideUp 0.7s ease forwards' }}
                >
                  {leftSlide.category}
                </p>
                <h3
                  key={`bl-lbl-${currentSlide}`}
                  className="text-xl tracking-tight text-white leading-tight font-jakarta font-medium"
                  style={{ animation: 'fadeSlideUp 0.7s 0.08s ease forwards', opacity: 0 }}
                >
                  {leftSlide.label}
                </h3>
              </div>
            </div>

            {/* Front / main card */}
            <div
              className="left-1/2 -translate-x-1/2 aspect-[2/3] z-20 hover:scale-[1.03] w-72 border-slate-300/80 border rounded-2xl absolute top-0 shadow-2xl"
              style={{ transition: 'transform 500ms cubic-bezier(0.34,1.56,0.64,1)', willChange: 'transform' }}
            >
              <SlideCard
                currentIndex={currentSlide}
                offset={0}
                className="absolute inset-0"
              />
              <div className="z-10 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent absolute inset-0 rounded-2xl pointer-events-none"></div>

              {/* "PREMIUM" badge – fades with slide */}
              <div
                key={`badge-${currentSlide}`}
                className="text-[0.65rem] uppercase font-semibold text-blue-600 tracking-wider font-geist bg-white z-20 rounded-md pt-1.5 pr-2.5 pb-1.5 pl-2.5 absolute top-4 right-4 shadow"
                style={{ animation: 'fadeSlideDown 0.6s ease forwards' }}
              >
                PREMIUM
              </div>

              {/* Front label – fades up with slide */}
              <div className="absolute bottom-8 left-6 right-6 z-20 pointer-events-none">
                <p
                  key={`cat-${currentSlide}`}
                  className="text-xs tracking-widest text-white/70 mb-2 uppercase font-geist"
                  style={{ animation: 'fadeSlideUp 0.65s ease forwards' }}
                >
                  {frontSlide.category}
                </p>
                <h3
                  key={`lbl-${currentSlide}`}
                  className="text-2xl tracking-tight text-white leading-tight mb-2 font-jakarta font-medium"
                  style={{ animation: 'fadeSlideUp 0.65s 0.1s ease forwards', opacity: 0 }}
                >
                  {frontSlide.label}
                </h3>
                <p className="text-xs text-white/50 font-geist">10 Years Quality</p>
              </div>
            </div>
          </div>
        </div>

        {/* Shared keyframes for label micro-animations */}
        <style>{`
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(10px); }
            to   { opacity: 1; transform: translateY(0);    }
          }
          @keyframes fadeSlideDown {
            from { opacity: 0; transform: translateY(-6px); }
            to   { opacity: 1; transform: translateY(0);    }
          }
        `}</style>
      </section>
    </>
  );
}
