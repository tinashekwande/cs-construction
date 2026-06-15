import { useEffect } from 'react';
import gsap from 'gsap';

export default function About() {
  useEffect(() => {
    // Reveal text sections
    gsap.fromTo('.about-reveal',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.12 }
    );
  }, []);

  return (
    <section className="w-full bg-slate-50 min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}></div>
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 about-reveal">
          <span className="uppercase text-[10px] font-semibold text-blue-600 tracking-widest font-geist bg-blue-50 border border-blue-200/50 rounded-full px-3.5 py-1.5 inline-block mb-4">
            About Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-medium text-slate-900 tracking-tight font-jakarta mb-6 leading-tight">
            Our Story & Work Ethic
          </h1>
          <p className="text-slate-600 font-jakarta text-base sm:text-lg leading-relaxed">
            Striving for excellence through our commitment to quality workmanship, honest service delivery, and community development.
          </p>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Text content */}
          <div className="lg:col-span-7 space-y-6 about-reveal">
            <h2 className="text-2xl sm:text-3xl font-medium text-slate-900 tracking-tight font-jakarta">
              A Decade of Hand-on Building Experience
            </h2>
            <p className="text-slate-600 font-jakarta leading-relaxed text-sm sm:text-base">
              <strong>CS Construction and Projects Pty Ltd</strong> entered the competitive construction industry under the guidance of our founder and director, <strong>Steven Chimpeni</strong>. With over 10 years of personal experience, Steven has built an active, results-driven team capable of handling everything from residential repairs to premium turnkey builds in Cape Town.
            </p>
            <p className="text-slate-600 font-jakarta leading-relaxed text-sm sm:text-base">
              We take pride in keeping our client’s peace of mind at the core of all operations. By using modern building practices, clear pricing, and thorough project management, we guarantee clean transitions and beautiful finishes.
            </p>

            {/* Micro Stats Card */}
            <div className="grid grid-cols-3 gap-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div>
                <span className="text-2xl sm:text-3xl font-semibold text-blue-600 font-jakarta block">10+</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-geist">Years Experience</span>
              </div>
              <div className="border-l border-slate-100 pl-4">
                <span className="text-2xl sm:text-3xl font-semibold text-slate-950 font-jakarta block">250+</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-geist">Completed Jobs</span>
              </div>
              <div className="border-l border-slate-100 pl-4">
                <span className="text-2xl sm:text-3xl font-semibold text-slate-950 font-jakarta block">100%</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-geist">Peace of Mind</span>
              </div>
            </div>
          </div>

          {/* Graphic/Image showcase */}
          <div className="lg:col-span-5 relative about-reveal" style={{ contentVisibility: 'auto' }}>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-200 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                alt="Steven Chimpeni on Construction Site"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <p className="text-xs text-white/90 font-medium font-geist tracking-wide">
                  Director & Team Lead
                </p>
                <h3 className="text-lg font-medium text-white tracking-tight font-jakarta mt-0.5">
                  Steven Chimpeni
                </h3>
              </div>
            </div>
            {/* Dotted overlap box */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600/5 -z-10 rounded-2xl border border-dashed border-blue-600/20"></div>
          </div>
        </div>

        {/* Mission & Vision & Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow about-reveal">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/50 flex items-center justify-center text-blue-600 mb-6">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            </div>
            <h3 className="text-lg font-medium text-slate-900 tracking-tight font-jakarta mb-3">
              Our Vision
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed font-jakarta">
              Striving for excellence through our commitment to quality workmanship and honest, dependable service delivery across all projects.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow about-reveal">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/50 flex items-center justify-center text-blue-600 mb-6">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h3 className="text-lg font-medium text-slate-900 tracking-tight font-jakarta mb-3">
              Our Mission
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed font-jakarta">
              We focus on executing reliable, compliant projects while dedicating resources to educating and empowering our staff in modern plumbing and building trade standards.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow about-reveal">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200/50 flex items-center justify-center text-red-600 mb-6">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            </div>
            <h3 className="text-lg font-medium text-slate-900 tracking-tight font-jakarta mb-3">
              Honest Values
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed font-jakarta">
              No project is too small or too large. From pipe leak detections to luxury home extensions, our commitment to quality materials and transparency remains unwavering.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
