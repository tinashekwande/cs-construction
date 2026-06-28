export default function Process() {
  return (
    <div id="testimonials" className="[animation:fadeSlideIn_0.8s_ease-out_0.1s_both] animate-on-scroll sm:px-6 lg:px-8 bg-slate-50 max-w-7xl mr-auto ml-auto pr-4 pl-4 border-t border-slate-200">
      <div className="overflow-hidden xl:bg-white border border-slate-200 border-dashed rounded-none mt-6 relative shadow-sm">
        {/* Background Overlay */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(1200px_400px_at_50%_-10%,rgba(59,130,246,0.1),transparent)]"></div>
          <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,rgba(0,0,0,.7)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,.7)_1px,transparent_1px)] bg-[size:28px_28px]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white"></div>
        </div>

        {/* Testimonials */}
        <section className="motion-section flex min-h-[68vh] flex-col sm:py-28 md:min-h-[76vh] md:pl-8 md:pr-8 md:pt-16 md:pb-8 text-left mr-auto ml-auto pt-16 pr-8 pb-8 pl-8 relative justify-center" aria-label="Client testimonials and reviews">
          {/* AggregateRating Schema */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "CS Construction and Projects",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "47"
              }
            })}
          </script>

          {/* Section Header */}
          <div className="text-left max-w-3xl mb-16">
            <span className="uppercase block text-xs font-semibold text-blue-600 tracking-widest mb-4 font-geist">
              Client Reviews &amp; Testimonials
            </span>
            <h2 className="sm:text-4xl lg:text-5xl text-3xl text-slate-900 tracking-tight mb-4 font-jakarta font-medium">
              Workmanship built on trust
            </h2>
            <p className="sm:text-lg leading-relaxed text-base text-slate-500 font-geist">
              Hear from real clients across Cape Town who chose CS Construction &amp; Projects for their building, renovation, and plumbing needs.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="w-full">
            {/* Top feature testimonial */}
            <div className="grid lg:grid-cols-2 lg:gap-y-8 lg:gap-x-6 gap-x-6 gap-y-8 items-stretch">
              {/* Main quote */}
              <div className="flex flex-col sm:p-10 sm:bg-white text-left bg-white ring-slate-200 ring-1 rounded-2xl pt-8 pr-8 pb-8 pl-8 relative justify-center shadow-md">
                <div className="mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <path d="M3 21c3 0 7-2 7-7V4H3v10" />
                    <path d="M14 21c3 0 7-2 7-7V4h-7v10" />
                  </svg>
                </div>
                {/* Star rating */}
                <div className="flex gap-0.5 mb-3" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                </div>
                <p className="sm:text-3xl lg:text-4xl leading-snug text-2xl text-slate-900 tracking-tight font-jakarta font-medium">
                  "CS Construction and Projects did an exceptional job renovating our kitchen and tiling the main halls. Steven managed everything with high professionalism, and the final delivery exceeded our expectations."
                </p>
                <div className="mt-8">
                  <div className="text-base font-semibold text-slate-900 font-geist">Sarah L.</div>
                  <div className="text-sm text-slate-500 mt-0.5 font-geist">Homeowner, Kraaifontein · Kitchen Renovation &amp; Tiling</div>
                </div>
              </div>

              <div className="overflow-hidden min-h-[320px] bg-slate-100 ring-slate-200 ring-1 rounded-2xl relative shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1617174699241-f461180aa2b4?w=1600&q=80"
                  alt="Completed kitchen renovation project by CS Construction — Cape Town professional builder"
                  className="opacity-100 w-full h-full object-cover rounded-2xl"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent mix-blend-multiply"></div>
                <div className="bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950/40 absolute inset-0"></div>
              </div>
            </div>

            {/* Grid of small testimonials */}
            <div className="grid lg:grid-cols-3 mt-6 relative gap-x-6 gap-y-6" style={{ minHeight: '240px' }}>

              {/* Card 1 */}
              <div className="flex flex-col bg-white overflow-hidden text-left rounded-xl ring-slate-200 ring-1 pt-6 pr-6 pb-6 pl-6 justify-between shadow-sm hover:shadow-md transition-shadow">
                <div style={{ animation: 'smoothSlideInUp 6s ease-in-out 0s infinite' }} className="flex flex-col h-full justify-between">
                  <div>
                    <div className="flex gap-0.5 mb-3" aria-label="5 out of 5 stars">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      ))}
                    </div>
                    <p className="leading-relaxed text-sm text-slate-600 font-geist">
                      "I had an urgent plumbing leak behind my drywall. CS Construction detected it instantly, repaired the pipe, and skimmed the wall cleanly. Very reliable and quick service!"
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-6 border-t border-slate-100 pt-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold text-xs text-blue-700">ER</div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 font-geist">Elena R.</div>
                      <div className="text-xs text-slate-500 font-geist">Milnerton · Leak Detection &amp; Repair</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex flex-col bg-white overflow-hidden text-left rounded-xl ring-slate-200 ring-1 pt-6 pr-6 pb-6 pl-6 justify-between shadow-sm hover:shadow-md transition-shadow">
                <div style={{ animation: 'smoothSlideInUp 6s ease-in-out 1s infinite' }} className="flex flex-col h-full justify-between">
                  <div>
                    <div className="flex gap-0.5 mb-3" aria-label="5 out of 5 stars">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      ))}
                    </div>
                    <p className="leading-relaxed text-sm text-slate-600 font-geist">
                      "Steven has done brickwork and tiling for three of our turnkey projects. The level of detail and workmanship quality is consistent and pro-grade. We will continue working with them."
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-6 border-t border-slate-100 pt-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold text-xs text-blue-700">MS</div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 font-geist">Michael S.</div>
                      <div className="text-xs text-slate-500 font-geist">Property Developer, Bellville · Brickwork &amp; Tiling</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="flex flex-col bg-white overflow-hidden text-left rounded-xl ring-slate-200 ring-1 pt-6 pr-6 pb-6 pl-6 justify-between shadow-sm hover:shadow-md transition-shadow">
                <div style={{ animation: 'smoothSlideInUp 6s ease-in-out 2s infinite' }} className="flex flex-col h-full justify-between">
                  <div>
                    <div className="flex gap-0.5 mb-3" aria-label="5 out of 5 stars">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      ))}
                    </div>
                    <p className="leading-relaxed text-sm text-slate-600 font-geist">
                      "Finally, an honest construction service. Steven provided clear estimates, completed drywall installations in our office, and sorted electrical issues. Transparent and highly professional."
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-6 border-t border-slate-100 pt-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold text-xs text-blue-700">JV</div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 font-geist">Jaxson V.</div>
                      <div className="text-xs text-slate-500 font-geist">Commercial Client, Century City · Office Fit-Out</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Reviews CTA */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                </div>
                <span className="text-sm font-semibold text-slate-800 font-geist">4.9 / 5</span>
                <span className="text-xs text-slate-500 font-geist">(47 Google reviews)</span>
              </div>
              <a
                href="https://www.google.com/search?q=CS+Construction+Projects+Cape+Town+reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 font-semibold font-geist hover:underline"
              >
                See All Reviews on Google →
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
