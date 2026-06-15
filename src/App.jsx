import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Services from './components/Services';
import Process from './components/Process';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { QuoteRequestModal } from './components/Modals';

// Import New Pages
import Gallery from './components/Gallery';
import About from './components/About';
import Contact from './components/Contact';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const navigateTo = (page) => {
    if (page === currentPage) return;
    
    // Smooth GSAP page-out transition
    gsap.to('.page-content-wrapper', {
      opacity: 0,
      y: -12,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
        // Smooth GSAP page-in transition
        gsap.fromTo('.page-content-wrapper',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', clearProps: 'transform,opacity' }
        );
      }
    });
  };

  useEffect(() => {
    // 1. Reveal animations for .animate-fade-up elements
    const fadeElements = document.querySelectorAll('.animate-fade-up');
    fadeElements.forEach((el, i) => {
      el.classList.add('spring-in');
      gsap.set(el, { opacity: 0, y: 28, scale: 0.965, transformOrigin: '50% 50%' });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: () =>
          gsap.to(el, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.78,
            ease: 'elastic.out(0.82, 0.58)',
            delay: Math.min(i * 0.03, 0.18),
            clearProps: 'transform,opacity',
          }),
      });
    });

    // 2. Perspective entrance animations for .glass-panel elements
    const glassPanels = document.querySelectorAll('.glass-panel');
    glassPanels.forEach((el, i) => {
      gsap.set(el, { transformPerspective: 1000, transformOrigin: '50% 50%' });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () =>
          gsap.fromTo(
            el,
            { opacity: 0, y: 34, scale: 0.94, rotateX: 6 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              duration: 0.82,
              delay: (i % 6) * 0.04,
              ease: 'elastic.out(0.78, 0.55)',
              clearProps: 'transform,opacity',
            }
          ),
      });
    });

    // 3. Elastic micro-animations on hover/click for buttons & CTAs
    const ctas = document.querySelectorAll('.motion-cta, button');
    ctas.forEach((el) => {
      const target = el.matches('button') ? el : el.querySelector('button');
      if (!target) return;

      const hoverIn = () => gsap.to(target, { scaleX: 1.03, scaleY: 0.97, y: -2, duration: 0.22, ease: 'back.out(2.2)', overwrite: true });
      const hoverOut = () => gsap.to(target, { scaleX: 1, scaleY: 1, y: 0, duration: 0.2, ease: 'power2.out', overwrite: true });
      const pressDown = () => gsap.to(target, { scaleX: 0.97, scaleY: 1.05, y: 1, duration: 0.08, ease: 'power2.out', overwrite: true });
      const pressUp = () => gsap.to(target, { scaleX: 1.03, scaleY: 0.97, y: -2, duration: 0.18, ease: 'back.out(2.4)', overwrite: true });

      target.addEventListener('mouseenter', hoverIn);
      target.addEventListener('mouseleave', hoverOut);
      target.addEventListener('mousedown', pressDown);
      target.addEventListener('mouseup', pressUp);

      // Cleaners will run on unmount
      target._cleanup = () => {
        target.removeEventListener('mouseenter', hoverIn);
        target.removeEventListener('mouseleave', hoverOut);
        target.removeEventListener('mousedown', pressDown);
        target.removeEventListener('mouseup', pressUp);
      };
    });

    // Refresh triggers to register new viewport heights
    ScrollTrigger.refresh();

    return () => {
      ctas.forEach((el) => {
        const target = el.matches('button') ? el : el.querySelector('button');
        if (target && target._cleanup) {
          target._cleanup();
        }
      });
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [currentPage]);

  return (
    <div className="min-h-screen flex flex-col font-jakarta relative">
      
      {/* Grid Background Pattern */}
      <div className="fixed inset-0 pointer-events-none z-[-1]" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)', backgroundSize: '4rem 4rem', maskImage: 'radial-gradient(circle at center, black, transparent 80%)', WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)' }}></div>

      <Navbar onOpenQuote={() => setIsQuoteOpen(true)} currentPage={currentPage} onNavigate={navigateTo} />
      
      <div className="page-content-wrapper flex-grow flex flex-col">
        {currentPage === 'home' && (
          <>
            <Hero onOpenQuote={() => setIsQuoteOpen(true)} />
            <Stats />
            <Services onOpenQuote={() => setIsQuoteOpen(true)} />
            <Process />
            <Pricing onOpenQuote={() => setIsQuoteOpen(true)} />
            <FAQ />
          </>
        )}
        {currentPage === 'gallery' && <Gallery />}
        {currentPage === 'about' && <About />}
        {currentPage === 'contact' && <Contact />}
      </div>

      <Footer onOpenQuote={() => setIsQuoteOpen(true)} currentPage={currentPage} onNavigate={navigateTo} />

      <QuoteRequestModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </div>
  );
}
