import { useState, useEffect } from 'react';
import gsap from 'gsap';
import useSEO from '../hooks/useSEO';

const CONTACT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  'name': 'Contact CS Construction & Projects — Cape Town',
  'description': 'Contact CS Construction & Projects for building, renovation, and plumbing services in Cape Town and the Western Cape. Call, WhatsApp, or email us for a free quote.',
  'url': 'https://cs-construction.co.za/#contact',
  'mainEntity': {
    '@type': ['LocalBusiness', 'GeneralContractor', 'Plumber'],
    'name': 'CS Construction & Projects',
    'telephone': '+27717270094',
    'email': 'stevenchimpeni8@gmail.com',
    'openingHoursSpecification': [
      { '@type': 'OpeningHoursSpecification', 'dayOfWeek': ['Monday','Tuesday','Wednesday','Thursday','Friday'], 'opens': '07:00', 'closes': '18:00' },
      { '@type': 'OpeningHoursSpecification', 'dayOfWeek': 'Saturday', 'opens': '08:00', 'closes': '14:00' }
    ],
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '16400 Masoka Street, Bloekombos',
      'addressLocality': 'Kraaifontein',
      'addressRegion': 'Western Cape',
      'postalCode': '7570',
      'addressCountry': 'ZA'
    },
    'geo': { '@type': 'GeoCoordinates', 'latitude': -33.8491, 'longitude': 18.7037 }
  }
};

const SERVICE_AREAS = [
  'Bellville', 'Parow', 'Goodwood', 'Durbanville', 'Brackenfell',
  'Kraaifontein', 'Blue Downs', 'Milnerton', 'Table View', 'Bloubergstrand',
  'Century City', 'Pinelands', 'Woodstock', 'Salt River', 'Observatory',
  'Mowbray', 'Rondebosch', 'Claremont', 'Wynberg', 'Athlone',
  'Muizenberg', 'Fish Hoek', 'Hout Bay', 'Constantia', 'Somerset West',
  'Strand', 'Gordon\'s Bay', 'Stellenbosch', 'Paarl', 'Worcester'
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Renovations',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useSEO({
    title: 'Contact CS Construction — Building & Plumbing Services Cape Town',
    description: 'Get a free quote from CS Construction & Projects. Call 071 727 0094 or WhatsApp us. Building contractor and plumber serving all of Cape Town and the Western Cape.',
    schema: CONTACT_SCHEMA
  });

  useEffect(() => {
    gsap.fromTo('.contact-reveal',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1 }
    );
  }, []);

  const [whatsappLink, setWhatsappLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const message = `*NEW QUOTE REQUEST - CS CONSTRUCTION*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Email:* ${formData.email}\n` +
      `*Service Required:* ${formData.service}\n\n` +
      `*Project Details & Message:*\n${formData.message}`;

    const url = `https://wa.me/27717270094?text=${encodeURIComponent(message)}`;
    setWhatsappLink(url);

    // Open WhatsApp in a new tab
    window.open(url, '_blank');

    setTimeout(() => {
      gsap.fromTo('.success-check',
        { scale: 0, rotate: -30 },
        { scale: 1, rotate: 0, duration: 0.5, ease: 'back.out(1.8)' }
      );
    }, 100);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', phone: '', service: 'Renovations', message: '' });
    setWhatsappLink('');
    setIsSubmitted(false);
  };

  return (
    <main className="w-full bg-slate-50 min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}></div>
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* ── Emergency Plumbing Banner ─────────────────────────────── */}
        <div className="contact-reveal bg-red-50 border border-red-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="text-xl shrink-0">🚨</span>
            <div>
              <p className="text-sm font-semibold text-red-800 font-jakarta">Plumbing Emergency in Cape Town?</p>
              <p className="text-xs text-red-600 font-jakarta mt-0.5">Burst pipe, blocked drain, or geyser failure? Don't wait — call us now for rapid response.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:0717270094"
              className="inline-flex items-center gap-2 bg-red-600 text-white px-4 h-10 rounded-xl text-xs font-bold font-geist hover:bg-red-700 transition-colors"
            >
              📞 071 727 0094
            </a>
            <a
              href="https://wa.me/27717270094?text=EMERGENCY%3A%20I%20need%20urgent%20plumbing%20help%20in%20Cape%20Town."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 h-10 rounded-xl text-xs font-bold font-geist hover:bg-emerald-700 transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* ── Header ────────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-14 contact-reveal">
          <span className="uppercase text-[10px] font-semibold text-blue-600 tracking-widest font-geist bg-blue-50 border border-blue-200/50 rounded-full px-3.5 py-1.5 inline-block mb-4">
            Contact Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-medium text-slate-900 tracking-tight font-jakarta mb-6 leading-tight">
            Get in Touch — Free Quotes, Fast Response
          </h1>
          <p className="text-slate-600 font-jakarta text-base sm:text-lg leading-relaxed">
            Whether you're planning a home renovation, need a new build quote, or have a plumbing emergency in Cape Town — we're ready to help. Call, WhatsApp, or fill out the form below.
          </p>
        </div>

        {/* ── Contact Grid ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16">

          {/* Info Column */}
          <div className="lg:col-span-5 flex flex-col space-y-6 contact-reveal">
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-medium text-slate-900 tracking-tight font-jakarta mb-1">
                  CS Construction &amp; Projects
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed font-jakarta">
                  Based in Kraaifontein, Cape Town. We provide building, renovation, and plumbing services across the entire Cape Town metropolitan area and Western Cape.
                </p>
              </div>

              {/* Contact details */}
              <address className="not-italic space-y-3 text-sm font-jakarta text-slate-700">
                {/* Phone */}
                <a href="tel:0717270094" className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-500/50 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/50">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-geist uppercase tracking-wider">Phone / Call-to-Call</span>
                    <strong className="text-slate-800 text-sm font-medium group-hover:text-blue-600 transition-colors">071 727 0094</strong>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/27717270094?text=Hi%20CS%20Construction%2C%20I%27d%20like%20a%20free%20quote%20for%20my%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-emerald-500/50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/50">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-geist uppercase tracking-wider">WhatsApp Chat</span>
                    <strong className="text-slate-800 text-sm font-medium group-hover:text-emerald-600 transition-colors">WhatsApp Us Now</strong>
                  </div>
                </a>

                {/* Email */}
                <a href="mailto:stevenchimpeni8@gmail.com" className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-500/50 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/50">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-geist uppercase tracking-wider">Send Email</span>
                    <strong className="text-slate-800 text-sm font-medium group-hover:text-blue-600 transition-colors">stevenchimpeni8@gmail.com</strong>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/50">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-geist uppercase tracking-wider">Office Address</span>
                    <span className="text-slate-800 text-xs font-medium block leading-tight">
                      16400 Masoka Street, Bloekombos,<br />Kraaifontein, Cape Town, 7570
                    </span>
                  </div>
                </div>

                {/* Business hours */}
                <div className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200/50">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-geist uppercase tracking-wider">Business Hours</span>
                    <span className="text-slate-800 text-xs font-medium block leading-tight">
                      Mon–Fri: 07:00–18:00 &nbsp;|&nbsp; Sat: 08:00–14:00<br />
                      <span className="text-red-600 font-semibold">Plumbing emergencies: 24/7</span>
                    </span>
                  </div>
                </div>
              </address>
            </div>

            {/* Service Coverage Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-geist mb-3">
                Areas We Serve in Cape Town &amp; Western Cape
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {SERVICE_AREAS.map(area => (
                  <span key={area} className="text-[10px] font-medium text-slate-600 bg-slate-100 border border-slate-200 rounded-full px-2.5 py-1 font-geist">
                    {area}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs font-geist text-slate-600 mt-4 relative">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping absolute left-0 shrink-0"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
                <span className="pl-3 font-medium text-slate-800">Active Service Area — Entire Cape Town Metro</span>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-7 contact-reveal">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm h-full flex flex-col justify-center">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h2 className="text-xl font-medium text-slate-900 tracking-tight font-jakarta mb-1">
                      Request a Free Quote
                    </h2>
                    <p className="text-xs text-slate-400 font-geist">We'll respond within 24 hours. No obligation, no pressure.</p>
                  </div>

                  {/* Name */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="contact-name" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-geist">Full Name</label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 bg-slate-50 font-jakarta w-full"
                    />
                  </div>

                  {/* Contact Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="contact-email" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-geist">Email Address</label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 bg-slate-50 font-jakarta w-full"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="contact-phone" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-geist">Phone Number</label>
                      <input
                        type="tel"
                        id="contact-phone"
                        name="phone"
                        required
                        placeholder="071 727 0094"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 bg-slate-50 font-jakarta w-full"
                      />
                    </div>
                  </div>

                  {/* Service Selector */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="contact-service" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-geist">Service Required</label>
                    <select
                      id="contact-service"
                      name="service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 bg-slate-50 font-jakarta w-full cursor-pointer"
                    >
                      <option value="Renovations">Home Renovations (Kitchen / Bathroom / Extensions)</option>
                      <option value="Building">New Home or Commercial Construction</option>
                      <option value="Plumbing">Plumbing — General / Emergency / Geyser</option>
                      <option value="Roofing">Roofing &amp; Waterproofing</option>
                      <option value="Finishes">Tiling / Plastering / Painting / Paving</option>
                      <option value="DrainCleaning">Drain Cleaning &amp; Unblocking</option>
                      <option value="LeakDetection">Leak Detection &amp; Burst Pipe Repair</option>
                      <option value="Other">Other Repairs &amp; Maintenance</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="contact-message" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-geist">Project Details &amp; Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows="4"
                      required
                      placeholder="Describe your project, the suburb you're in, and any specific requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 bg-slate-50 font-jakarta w-full resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <div className="pt-2 space-y-3">
                    <button
                      type="submit"
                      className="w-full h-12 flex items-center justify-center gap-2 rounded-xl text-xs font-semibold tracking-widest uppercase font-geist bg-emerald-600 hover:bg-emerald-700 text-white transition-all hover:brightness-110 active:scale-[0.985] cursor-pointer shadow-md"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Send Quote Request via WhatsApp
                    </button>
                    <p className="text-center text-[10px] text-slate-400 font-geist">
                      Submitting will open WhatsApp with your quote details ready to send directly to Director Steven.
                    </p>
                  </div>
                </form>
              ) : (
                <div className="text-center py-10 space-y-5 flex flex-col items-center">
                  <div className="success-check w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shadow-md">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-slate-900 tracking-tight font-jakarta mb-2">Redirecting to WhatsApp...</h3>
                    <p className="text-slate-500 text-sm max-w-sm mx-auto font-jakarta leading-relaxed">
                      Your quote details have been formatted. If WhatsApp did not open automatically, click the button below to send your request.
                    </p>
                  </div>

                  {whatsappLink && (
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 h-11 rounded-xl text-xs font-bold font-geist shadow-md hover:scale-105 transition-all"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Open WhatsApp Chat
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors shadow-sm font-geist cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
