import { useState, useEffect } from 'react';
import gsap from 'gsap';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Renovations',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    gsap.fromTo('.contact-reveal',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1 }
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Animate success card
    setTimeout(() => {
      gsap.fromTo('.success-check',
        { scale: 0, rotate: -30 },
        { scale: 1, rotate: 0, duration: 0.5, ease: 'back.out(1.8)' }
      );
    }, 100);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: 'Renovations',
      message: ''
    });
    setIsSubmitted(false);
  };

  return (
    <section className="w-full bg-slate-50 min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}></div>
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 contact-reveal">
          <span className="uppercase text-[10px] font-semibold text-blue-600 tracking-widest font-geist bg-blue-50 border border-blue-200/50 rounded-full px-3.5 py-1.5 inline-block mb-4">
            Contact Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-medium text-slate-900 tracking-tight font-jakarta mb-6 leading-tight">
            Get in touch with us
          </h1>
          <p className="text-slate-600 font-jakarta text-base sm:text-lg leading-relaxed">
            Have a project in mind or an emergency plumbing repair? Give us a call, send an email, or fill out the request form below.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Info Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 contact-reveal">
            <div className="space-y-6">
              <h2 className="text-2xl font-medium text-slate-900 tracking-tight font-jakarta">
                CS Construction & Projects
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed font-jakarta">
                Our main office is located in Bloekombos, Kraaifontein. We offer active building, luxury renovations, and plumbing coverage throughout the Cape Town metropolitan area.
              </p>

              {/* Contact list details */}
              <div className="space-y-4 pt-4 text-sm font-jakarta text-slate-700">
                {/* Phone */}
                <a href="tel:0717270094" className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-500/50 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/50">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-geist uppercase tracking-wider">Phone Call / WhatsApp</span>
                    <strong className="text-slate-800 text-sm font-medium group-hover:text-blue-600 transition-colors">071 727 0094</strong>
                  </div>
                </a>

                {/* Email */}
                <a href="mailto:stevenchimpeni8@gmail.com" className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-500/50 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/50">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-geist uppercase tracking-wider">Send Email</span>
                    <strong className="text-slate-800 text-sm font-medium group-hover:text-blue-600 transition-colors">stevenchimpeni8@gmail.com</strong>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/50">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-geist uppercase tracking-wider">Office Address</span>
                    <span className="text-slate-800 text-xs font-medium block leading-tight">
                      16400 Masoka Street, Bloekombos,<br />Kraaifontein, Kraaifontein, 7570
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual SVG Map Indicator */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-[180px] relative overflow-hidden" style={{ contentVisibility: 'auto' }}>
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20px 20px, #048cd8 2px, transparent 0)', backgroundSize: '16px 16px' }}></div>
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-geist">
                  Coverage Area
                </h4>
                <p className="text-slate-800 text-[13px] font-medium mt-1 leading-tight font-jakarta">
                  Cape Town Metro & Surrounds
                </p>
                <p className="text-slate-500 text-[11px] font-jakarta">Kraaifontein base providing rapid response plumbing.</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-geist text-slate-600 mt-4 relative z-10">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping absolute left-0 shrink-0"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
                <span className="pl-3 font-medium text-slate-800">Active Service Area</span>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-7 contact-reveal">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm h-full flex flex-col justify-center">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-medium text-slate-900 tracking-tight font-jakarta mb-2">
                    Send a Message
                  </h3>
                  
                  {/* Name */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="name" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-geist">Full Name</label>
                    <input
                      type="text"
                      id="name"
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
                      <label htmlFor="email" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-geist">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 bg-slate-50 font-jakarta w-full"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="phone" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-geist">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
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
                    <label htmlFor="service" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-geist">Project Service Type</label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 bg-slate-50 font-jakarta w-full cursor-pointer"
                    >
                      <option value="Renovations">Luxury Renovations & Extensions</option>
                      <option value="Building">New Home Construction</option>
                      <option value="Plumbing">Expert Plumbing / Leak Detection</option>
                      <option value="Finishes">Tiling / Plastering / Skimming</option>
                      <option value="Roofing">Roofing & Waterproofing</option>
                      <option value="Other">Other Repairs & Maintenance</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="message" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-geist">Message / Project Details</label>
                    <textarea
                      id="message"
                      rows="4"
                      required
                      placeholder="Describe your project needs here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 bg-slate-50 font-jakarta w-full resize-none"
                    ></textarea>
                  </div>

                  {/* Submit button wrapper */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="btn-brand-red w-full h-12 flex items-center justify-center rounded-xl text-xs font-semibold tracking-widest uppercase font-geist transition-all hover:brightness-110 active:scale-[0.985] cursor-pointer"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-12 space-y-6 flex flex-col items-center">
                  <div className="success-check w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shadow-md">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-slate-900 tracking-tight font-jakarta mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-slate-500 text-sm max-w-sm mx-auto font-jakarta">
                      Thank you for contacting CS Construction & Projects. Steven or a representative will get back to you within 24 hours.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 h-11 flex items-center justify-center rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors shadow-sm font-geist cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
