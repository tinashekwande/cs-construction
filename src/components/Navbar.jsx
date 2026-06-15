import { useState } from 'react';

export default function Navbar({ onOpenQuote, currentPage, onNavigate }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = (e, id) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.pageYOffset - 88,
        behavior: 'smooth',
      });
    }
  };

  const handleMobileNav = (page, anchorId = null) => {
    setIsMobileMenuOpen(false);
    if (anchorId) {
      if (currentPage !== 'home') {
        onNavigate('home');
        setTimeout(() => {
          const el = document.getElementById(anchorId);
          if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 88, behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById(anchorId);
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 88, behavior: 'smooth' });
      }
    } else {
      onNavigate(page);
      window.scrollTo(0, 0);
    }
  };

  return (
    <nav className="absolute top-0 left-0 right-0 w-full z-50">
      <div className="h-24 w-full flex items-center bg-transparent">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between animate-fade-up spring-in">
          <div className="flex text-xl font-medium text-slate-900 tracking-tight font-jakarta space-x-12 items-center">
            <a href="#" className="flex items-center hover-target" onClick={(e) => { e.preventDefault(); handleMobileNav('home'); }}>
              <img src="/company_logo.png" alt="CS Construction Logo" className="h-16 w-auto object-contain" />
            </a>
            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
              <a 
                href="#services" 
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage !== 'home') {
                    onNavigate('home');
                    setTimeout(() => {
                      const el = document.getElementById('services');
                      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 88, behavior: 'smooth' });
                    }, 100);
                  } else {
                    handleScroll(e, 'services');
                  }
                }} 
                className={`nav-spy-link transition-colors ${currentPage === 'home' ? 'text-slate-600' : 'text-slate-400'}`}
              >
                Services
              </a>
              <a 
                href="#testimonials" 
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage !== 'home') {
                    onNavigate('home');
                    setTimeout(() => {
                      const el = document.getElementById('testimonials');
                      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 88, behavior: 'smooth' });
                    }, 100);
                  } else {
                    handleScroll(e, 'testimonials');
                  }
                }} 
                className={`nav-spy-link transition-colors ${currentPage === 'home' ? 'text-slate-600' : 'text-slate-400'}`}
              >
                Testimonials
              </a>
              <a 
                href="#pricing" 
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage !== 'home') {
                    onNavigate('home');
                    setTimeout(() => {
                      const el = document.getElementById('pricing');
                      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 88, behavior: 'smooth' });
                    }, 100);
                  } else {
                    handleScroll(e, 'pricing');
                  }
                }} 
                className={`nav-spy-link transition-colors ${currentPage === 'home' ? 'text-slate-600' : 'text-slate-400'}`}
              >
                Pricing
              </a>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
              <a 
                href="#gallery" 
                onClick={(e) => { e.preventDefault(); onNavigate('gallery'); }} 
                className={`nav-spy-link transition-colors ${currentPage === 'gallery' ? 'is-active text-red-600' : 'text-slate-600'}`}
              >
                Gallery
              </a>
              <a 
                href="#about" 
                onClick={(e) => { e.preventDefault(); onNavigate('about'); }} 
                className={`nav-spy-link transition-colors ${currentPage === 'about' ? 'is-active text-red-600' : 'text-slate-600'}`}
              >
                About Us
              </a>
              <a 
                href="#contact" 
                onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} 
                className={`nav-spy-link transition-colors ${currentPage === 'contact' ? 'is-active text-red-600' : 'text-slate-600'}`}
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Desktop CTA Button */}
          <button 
            onClick={(e) => { e.preventDefault(); onOpenQuote(); }} 
            className="hidden md:flex btn-brand-red h-11 px-6 rounded-xl text-xs font-semibold tracking-wide font-geist hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer items-center justify-center"
          >
            Request a Quote
          </button>

          {/* Mobile hamburger button */}
          <button 
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex md:hidden items-center justify-center p-2 rounded-xl border border-slate-200 bg-white/80 text-slate-700 hover:text-slate-900 focus:outline-none transition-colors shadow-sm cursor-pointer h-11 w-11"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div 
        className={`md:hidden absolute top-24 left-0 right-0 px-6 pb-6 bg-white/95 backdrop-blur-md border-b border-slate-200/50 shadow-lg transition-all duration-300 ease-in-out transform origin-top z-40 ${
          isMobileMenuOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-95 invisible'
        }`}
      >
        <div className="flex flex-col space-y-4 pt-4 text-base font-semibold">
          <a 
            href="#services" 
            onClick={(e) => {
              e.preventDefault();
              handleMobileNav('home', 'services');
            }} 
            className={`py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors ${currentPage === 'home' ? 'text-slate-800' : 'text-slate-500'}`}
          >
            Services
          </a>
          <a 
            href="#testimonials" 
            onClick={(e) => {
              e.preventDefault();
              handleMobileNav('home', 'testimonials');
            }} 
            className={`py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors ${currentPage === 'home' ? 'text-slate-800' : 'text-slate-500'}`}
          >
            Testimonials
          </a>
          <a 
            href="#pricing" 
            onClick={(e) => {
              e.preventDefault();
              handleMobileNav('home', 'pricing');
            }} 
            className={`py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors ${currentPage === 'home' ? 'text-slate-800' : 'text-slate-500'}`}
          >
            Pricing
          </a>
          <a 
            href="#gallery" 
            onClick={(e) => { e.preventDefault(); handleMobileNav('gallery'); }} 
            className={`py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors ${currentPage === 'gallery' ? 'text-red-600 bg-red-50/50' : 'text-slate-800'}`}
          >
            Gallery
          </a>
          <a 
            href="#about" 
            onClick={(e) => { e.preventDefault(); handleMobileNav('about'); }} 
            className={`py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors ${currentPage === 'about' ? 'text-red-600 bg-red-50/50' : 'text-slate-800'}`}
          >
            About Us
          </a>
          <a 
            href="#contact" 
            onClick={(e) => { e.preventDefault(); handleMobileNav('contact'); }} 
            className={`py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors ${currentPage === 'contact' ? 'text-red-600 bg-red-50/50' : 'text-slate-800'}`}
          >
            Contact
          </a>
          
          <div className="pt-4 border-t border-slate-100">
            <button 
              onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); onOpenQuote(); }} 
              className="btn-brand-red w-full h-11 rounded-xl text-xs font-semibold tracking-wide font-geist hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center cursor-pointer"
            >
              Request a Quote
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
