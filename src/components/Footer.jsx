export default function Footer({ onOpenQuote, currentPage, onNavigate }) {
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

  const handleLinkClick = (e, targetPage, anchorId = null) => {
    e.preventDefault();
    onNavigate(targetPage);
    if (anchorId) {
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 88, behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-50 border-slate-200 border-t pt-20 pb-10 z-10 relative">
      <div className="lg:px-8 max-w-7xl mr-auto ml-auto pr-6 pl-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-2 space-y-4">
            <div className="flex gap-3 text-xl font-semibold text-slate-900 tracking-tight font-jakarta items-center">
              <a href="#" className="flex items-center hover-target" onClick={(e) => handleLinkClick(e, 'home')}>
                <img src="/company_logo.png" alt="CS Construction Logo" className="h-14 w-auto object-contain" />
              </a>
            </div>
            <p className="text-sm text-slate-500 font-geist max-w-sm">
              Skilled builders and professional plumbers dedicated to quality workmanship, honest service delivery, and brilliant customer service in Cape Town.
            </p>
            <div className="text-xs text-slate-400 font-geist space-y-1">
              <p className="font-semibold text-slate-700">Contact Details:</p>
              <p>📍 16400 Masoka Street, Bloekombos, Kraaifontein, 7570, Cape Town</p>
              <p>📞 Phone: <a href="tel:0717270094" className="hover:text-blue-600">071 727 0094</a></p>
              <p>✉️ Email: <a href="mailto:stevenchimpeni8@gmail.com" className="hover:text-blue-600">stevenchimpeni8@gmail.com</a></p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-4 font-geist">
              Services
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#services" onClick={(e) => currentPage === 'home' ? handleScroll(e, 'services') : handleLinkClick(e, 'home', 'services')} className="text-sm text-slate-500 hover:text-slate-900 transition-colors font-geist">
                  Building &amp; Extensions
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => currentPage === 'home' ? handleScroll(e, 'services') : handleLinkClick(e, 'home', 'services')} className="text-sm text-slate-500 hover:text-slate-900 transition-colors font-geist">
                  Renovations &amp; Tiling
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => currentPage === 'home' ? handleScroll(e, 'services') : handleLinkClick(e, 'home', 'services')} className="text-sm text-slate-500 hover:text-slate-900 transition-colors font-geist">
                  Professional Plumbing
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => currentPage === 'home' ? handleScroll(e, 'services') : handleLinkClick(e, 'home', 'services')} className="text-sm text-slate-500 hover:text-slate-900 transition-colors font-geist">
                  Roofing &amp; Waterproofing
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-4 font-geist">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className="text-sm text-slate-500 hover:text-slate-900 transition-colors font-geist">
                  About Us
                </a>
              </li>
              <li>
                <a href="#gallery" onClick={(e) => handleLinkClick(e, 'gallery')} className="text-sm text-slate-500 hover:text-slate-900 transition-colors font-geist">
                  Portfolio Gallery
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')} className="text-sm text-slate-500 hover:text-slate-900 transition-colors font-geist">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); onOpenQuote(); }} className="text-sm text-slate-500 hover:text-slate-900 transition-colors font-geist">
                  Request an Estimate
                </a>
              </li>
              <li>
                <a 
                  href="http://localhost:3000/login" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-slate-500 hover:text-amber-600 hover:font-bold transition-all duration-200 font-geist inline-flex items-center gap-1.5"
                >
                  <span>Staff Portal</span>
                  <span className="bg-amber-500/10 text-amber-700 dark:text-amber-500 text-[9px] font-extrabold px-1.5 py-0.5 rounded border border-amber-500/15">Admin</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400 font-geist">
            © 2026 CS Construction &amp; Projects Pty Ltd. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
              <iconify-icon icon="solar:library-linear" className="text-xl"></iconify-icon>
            </a>
            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
              <iconify-icon icon="solar:code-circle-linear" className="text-xl"></iconify-icon>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
