import { useEffect } from 'react';
import gsap from 'gsap';
import useSEO from '../hooks/useSEO';

const ABOUT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  'name': 'About CS Construction & Projects — Cape Town Building & Plumbing Experts',
  'description': 'CS Construction & Projects is a professional building contractor and plumbing company in Cape Town, Western Cape, led by founder Steven Chimpeni with over 10 years of hands-on construction experience.',
  'url': 'https://cs-construction.co.za/#about',
  'mainEntity': {
    '@type': ['LocalBusiness', 'GeneralContractor'],
    'name': 'CS Construction & Projects Pty Ltd',
    'foundingDate': '2014',
    'numberOfEmployees': { '@type': 'QuantitativeValue', 'value': 10 },
    'founder': {
      '@type': 'Person',
      'name': 'Steven Chimpeni',
      'jobTitle': 'Director & Project Manager',
      'worksFor': 'CS Construction & Projects Pty Ltd'
    },
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '16400 Masoka Street, Bloekombos',
      'addressLocality': 'Kraaifontein',
      'addressRegion': 'Western Cape',
      'postalCode': '7570',
      'addressCountry': 'ZA'
    }
  }
};

const WHY_CHOOSE = [
  { icon: '🏆', label: '10+ Years Experience', desc: 'Over a decade of hands-on construction and plumbing expertise across Cape Town.' },
  { icon: '📋', label: 'Written Quotes — Always Free', desc: 'Fully itemised quotes with no hidden costs, reviewed and approved by you before any work begins.' },
  { icon: '🔒', label: 'Licensed & Insured', desc: 'Fully registered company with liability insurance for complete peace of mind on every project.' },
  { icon: '📍', label: 'Local Cape Town Company', desc: 'Based in Kraaifontein — we serve the entire Cape Town metro, Western Cape, and surrounding areas.' },
  { icon: '✅', label: 'Workmanship Guarantee', desc: '6–12 month defects guarantee on all completed work. We come back and fix any issue, no charge.' },
  { icon: '🗓️', label: 'Dedicated Project Management', desc: 'Steven personally oversees all projects to ensure quality, compliance, and on-time delivery.' },
  { icon: '💬', label: 'Transparent Communication', desc: 'Regular progress updates, clear communication, and no surprises — from quote to handover.' },
  { icon: '⚡', label: 'Emergency Plumbing 24/7', desc: "Burst pipes and plumbing emergencies don't wait. Neither do we — call us anytime." },
];

const PROCESS_STEPS = [
  { step: '01', title: 'Initial Consultation & Site Visit', desc: 'We visit your property at no charge, assess the scope, and discuss your requirements in detail.' },
  { step: '02', title: 'Detailed Quote & Proposal', desc: 'A written, itemised quote is prepared and emailed to you — broken down by labour and materials.' },
  { step: '03', title: 'Contract & Deposit', desc: 'On acceptance, we sign a project contract and collect a deposit to secure materials and scheduling.' },
  { step: '04', title: 'Procurement & Scheduling', desc: 'Materials are sourced and a project timeline is confirmed with clear milestones and deadlines.' },
  { step: '05', title: 'Construction & Progress Updates', desc: 'Work begins with regular updates from your dedicated site manager throughout the build.' },
  { step: '06', title: 'Final Inspection & Sign-off', desc: 'A thorough walkthrough is completed with you at practical completion to ensure everything meets standard.' },
  { step: '07', title: 'Defects Period & Aftercare', desc: 'A 6–12 month guarantee period begins. We return to address any defects in workmanship at no cost.' },
];

export default function About() {
  useSEO({
    title: "About CS Construction — Cape Town's Trusted Building & Plumbing Experts",
    description: 'CS Construction & Projects: 10+ years building and plumbing excellence in Cape Town. Licensed, insured, workmanship guaranteed. Led by Steven Chimpeni — local, professional, trusted.',
    schema: ABOUT_SCHEMA
  });

  useEffect(() => {
    gsap.fromTo('.about-reveal',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.12 }
    );
  }, []);

  return (
    <main className="w-full bg-slate-50 min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}></div>
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* ── Header ────────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-16 about-reveal">
          <span className="uppercase text-[10px] font-semibold text-blue-600 tracking-widest font-geist bg-blue-50 border border-blue-200/50 rounded-full px-3.5 py-1.5 inline-block mb-4">
            About Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-medium text-slate-900 tracking-tight font-jakarta mb-6 leading-tight">
            Cape Town's Trusted Building &amp; Plumbing Experts
          </h1>
          <p className="text-slate-600 font-jakarta text-base sm:text-lg leading-relaxed">
            Professional, licensed, and locally owned — CS Construction &amp; Projects delivers quality workmanship, honest pricing, and complete project accountability across Cape Town and the Western Cape.
          </p>
        </div>

        {/* ── Story Grid ────────────────────────────────────────────── */}
        <section aria-label="Company story" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7 space-y-6 about-reveal">
            <h2 className="text-2xl sm:text-3xl font-medium text-slate-900 tracking-tight font-jakarta">
              A Decade of Hands-On Building Excellence in Cape Town
            </h2>
            <p className="text-slate-600 font-jakarta leading-relaxed text-sm sm:text-base">
              <strong>CS Construction and Projects Pty Ltd</strong> was founded by <strong>Steven Chimpeni</strong>, a construction professional with over 10 years of personal, hands-on experience in residential and commercial building across Cape Town. From our base in Kraaifontein, we serve homeowners, property developers, commercial clients, and body corporates throughout the Cape Town metropolitan area and broader Western Cape.
            </p>
            <p className="text-slate-600 font-jakarta leading-relaxed text-sm sm:text-base">
              We handle everything from kitchen and bathroom renovations, home extensions, and new builds to professional plumbing services — geyser installations, burst pipe repairs, drain cleaning, and 24/7 emergency call-outs. Every project is managed with clear communication, written quotes, and a workmanship guarantee.
            </p>
            <p className="text-slate-600 font-jakarta leading-relaxed text-sm sm:text-base">
              Our service area spans <strong>Bellville, Parow, Durbanville, Brackenfell, Milnerton, Table View, Century City, Claremont, Rondebosch, Wynberg, Somerset West, Stellenbosch, Paarl</strong> and all major suburbs in between.
            </p>

            {/* Micro Stats */}
            <div className="grid grid-cols-3 gap-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div>
                <span className="text-2xl sm:text-3xl font-semibold text-blue-600 font-jakarta block">10+</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-geist">Years Experience</span>
              </div>
              <div className="border-l border-slate-100 pl-4">
                <span className="text-2xl sm:text-3xl font-semibold text-slate-950 font-jakarta block">250+</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-geist">Completed Projects</span>
              </div>
              <div className="border-l border-slate-100 pl-4">
                <span className="text-2xl sm:text-3xl font-semibold text-slate-950 font-jakarta block">30+</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-geist">Suburbs Served</span>
              </div>
            </div>
          </div>

          {/* Director photo */}
          <div className="lg:col-span-5 relative about-reveal" style={{ contentVisibility: 'auto' }}>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-200 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                alt="Steven Chimpeni — CS Construction Director and Project Manager, Cape Town"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <p className="text-xs text-white/90 font-medium font-geist tracking-wide">Director &amp; Project Manager</p>
                <h3 className="text-lg font-medium text-white tracking-tight font-jakarta mt-0.5">Steven Chimpeni</h3>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600/5 -z-10 rounded-2xl border border-dashed border-blue-600/20"></div>
          </div>
        </section>

        {/* ── Why Choose CS Construction ─────────────────────────────── */}
        <section aria-label="Why choose CS Construction" className="mb-20 about-reveal">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-medium text-slate-900 tracking-tight font-jakarta mb-3">
              Why Cape Town Clients Choose CS Construction
            </h2>
            <p className="text-slate-500 text-sm font-jakarta leading-relaxed">
              We deliver more than construction — we deliver confidence, clarity, and exceptional results.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_CHOOSE.map((item, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-2xl mb-3 block">{item.icon}</span>
                <h3 className="text-sm font-semibold text-slate-900 font-jakarta mb-2">{item.label}</h3>
                <p className="text-xs text-slate-500 font-jakarta leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Our 7-Step Process ─────────────────────────────────────── */}
        <section aria-label="Construction process" className="mb-20 about-reveal">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-medium text-slate-900 tracking-tight font-jakarta mb-3">
              Our Construction Process — From Quote to Handover
            </h2>
            <p className="text-slate-500 text-sm font-jakarta leading-relaxed">
              A clear, structured process ensures every project is delivered on time, on budget, and to the highest standard.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROCESS_STEPS.slice(0, 4).map((step, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative">
                <span className="text-[10px] font-bold text-blue-600 tracking-widest uppercase font-geist mb-3 block">Step {step.step}</span>
                <h3 className="text-sm font-semibold text-slate-900 font-jakarta mb-2">{step.title}</h3>
                <p className="text-xs text-slate-500 font-jakarta leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
            {PROCESS_STEPS.slice(4).map((step, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <span className="text-[10px] font-bold text-blue-600 tracking-widest uppercase font-geist mb-3 block">Step {step.step}</span>
                <h3 className="text-sm font-semibold text-slate-900 font-jakarta mb-2">{step.title}</h3>
                <p className="text-xs text-slate-500 font-jakarta leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Mission / Vision / Values ──────────────────────────────── */}
        <section aria-label="Company values" className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow about-reveal">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/50 flex items-center justify-center text-blue-600 mb-6">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            </div>
            <h3 className="text-lg font-medium text-slate-900 tracking-tight font-jakarta mb-3">Our Vision</h3>
            <p className="text-slate-500 text-xs leading-relaxed font-jakarta">
              To be Cape Town's most trusted construction and plumbing company — recognised for outstanding workmanship, honest service, and genuine commitment to our clients and communities.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow about-reveal">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/50 flex items-center justify-center text-blue-600 mb-6">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h3 className="text-lg font-medium text-slate-900 tracking-tight font-jakarta mb-3">Our Mission</h3>
            <p className="text-slate-500 text-xs leading-relaxed font-jakarta">
              To execute reliable, compliant construction and plumbing projects across Cape Town while empowering our team with modern skills and delivering consistent quality that exceeds client expectations.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow about-reveal">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200/50 flex items-center justify-center text-red-600 mb-6">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            </div>
            <h3 className="text-lg font-medium text-slate-900 tracking-tight font-jakarta mb-3">Our Values</h3>
            <p className="text-slate-500 text-xs leading-relaxed font-jakarta">
              Honesty. Quality. Accountability. Whether it's a small leak repair or a full home extension, our commitment to transparent pricing and premium finishes never changes — regardless of project size or budget.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
