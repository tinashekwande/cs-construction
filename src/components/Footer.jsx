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
    <footer className="bg-slate-50 border-slate-200 border-t pt-20 pb-10 z-10 relative" itemScope itemType="https://schema.org/WPFooter">
      <div className="lg:px-8 max-w-7xl mr-auto ml-auto pr-6 pl-6">

        {/* ── Main Grid ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-8 mb-16">

          {/* Brand + NAP */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex gap-3 text-xl font-semibold text-slate-900 tracking-tight font-jakarta items-center">
              <a href="#" className="flex items-center hover-target" onClick={(e) => handleLinkClick(e, 'home')}>
                <img src="/company_logo.png" alt="CS Construction & Projects Logo — Cape Town Building Contractor" className="h-14 w-auto object-contain" />
              </a>
            </div>
            <p className="text-sm text-slate-500 font-geist max-w-sm">
              Cape Town's trusted building contractor and licensed plumber. Serving the entire Western Cape metro with quality workmanship, transparent pricing, and a workmanship guarantee on every project.
            </p>

            {/* NAP — Name Address Phone (semantic for local SEO) */}
            <address className="not-italic text-xs text-slate-400 font-geist space-y-1.5" itemScope itemType="https://schema.org/LocalBusiness">
              <meta itemProp="name" content="CS Construction & Projects" />
              <p className="font-semibold text-slate-700" itemProp="telephone">
                📞 <a href="tel:0717270094" className="hover:text-blue-600 transition-colors">071 727 0094</a>
              </p>
              <p itemProp="email">
                ✉️ <a href="mailto:stevenchimpeni8@gmail.com" className="hover:text-blue-600 transition-colors">stevenchimpeni8@gmail.com</a>
              </p>
              <p itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                📍 <span itemProp="streetAddress">16400 Masoka Street, Bloekombos</span>,{' '}
                <span itemProp="addressLocality">Kraaifontein</span>,{' '}
                <span itemProp="addressRegion">Cape Town</span>,{' '}
                <span itemProp="postalCode">7570</span>
              </p>
              <p>🕒 Mon–Fri: 07:00–18:00 &nbsp;|&nbsp; Sat: 08:00–14:00</p>
            </address>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/27717270094?text=Hi%20CS%20Construction%2C%20I%27d%20like%20a%20free%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white text-xs font-semibold px-4 h-9 rounded-xl font-geist hover:bg-emerald-700 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us
            </a>
          </div>

          {/* Construction Services */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-4 font-geist">Construction Services</h4>
            <ul className="space-y-2.5">
              {[
                'New Home Construction',
                'Home Renovations',
                'Kitchen Renovations',
                'Bathroom Renovations',
                'Home Extensions',
                'Roofing & Waterproofing',
                'Tiling & Plastering',
                'Boundary Walls & Paving',
              ].map(service => (
                <li key={service}>
                  <a
                    href="#services"
                    onClick={(e) => currentPage === 'home' ? handleScroll(e, 'services') : handleLinkClick(e, 'home', 'services')}
                    className="text-xs text-slate-500 hover:text-slate-900 transition-colors font-geist"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Plumbing Services */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-4 font-geist">Plumbing Services</h4>
            <ul className="space-y-2.5">
              {[
                'Emergency Plumbing',
                'Geyser Installation',
                'Solar Geyser Installation',
                'Burst Pipe Repair',
                'Drain Cleaning & Unblocking',
                'Leak Detection & Repair',
                'Bathroom Plumbing',
                'Commercial Plumbing',
              ].map(service => (
                <li key={service}>
                  <a
                    href="#services"
                    onClick={(e) => currentPage === 'home' ? handleScroll(e, 'services') : handleLinkClick(e, 'home', 'services')}
                    className="text-xs text-slate-500 hover:text-slate-900 transition-colors font-geist"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas + Company Links */}
          <div className="space-y-8">
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-4 font-geist">Service Areas</h4>
              <ul className="space-y-2.5">
                {[
                  'Bellville', 'Parow', 'Durbanville', 'Kraaifontein',
                  'Milnerton', 'Table View', 'Century City',
                  'Claremont', 'Wynberg', 'Somerset West',
                  'Stellenbosch', 'Paarl',
                ].map(area => (
                  <li key={area}>
                    <span className="text-xs text-slate-500 font-geist">{area}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-4 font-geist">Company</h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className="text-xs text-slate-500 hover:text-slate-900 transition-colors font-geist">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#gallery" onClick={(e) => handleLinkClick(e, 'gallery')} className="text-xs text-slate-500 hover:text-slate-900 transition-colors font-geist">
                    Portfolio Gallery
                  </a>
                </li>
                <li>
                  <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')} className="text-xs text-slate-500 hover:text-slate-900 transition-colors font-geist">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); onOpenQuote(); }} className="text-xs text-slate-500 hover:text-slate-900 transition-colors font-geist">
                    Request a Free Quote
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/27717270094"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold transition-colors font-geist"
                  >
                    WhatsApp Us
                  </a>
                </li>
                <li>
                  <a
                    href="/portal/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-500 hover:text-amber-600 hover:font-bold transition-all duration-200 font-geist inline-flex items-center gap-1.5"
                  >
                    <span>Staff Portal</span>
                    <span className="bg-amber-500/10 text-amber-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded border border-amber-500/15">Admin</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ────────────────────────────────────────────── */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-xs text-slate-400 font-geist">
              © 2026 CS Construction &amp; Projects Pty Ltd. All rights reserved. | Registered Company, Cape Town, Western Cape, South Africa.
            </p>
            <p className="text-[10px] text-slate-400 font-geist mt-1">
              Building Contractor &amp; Plumbing Services — Cape Town | Bellville | Durbanville | Kraaifontein | Milnerton | Somerset West | Stellenbosch
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href="https://wa.me/27717270094"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp CS Construction"
              className="text-slate-400 hover:text-emerald-600 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <a href="tel:0717270094" aria-label="Call CS Construction" className="text-slate-400 hover:text-blue-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
