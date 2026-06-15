export default function Pricing({ onOpenQuote }) {
  return (
    <section className="lg:px-8 bg-slate-50 border-t border-slate-200 pt-32 pb-32 max-w-7xl mr-auto ml-auto pr-6 pl-6 flex flex-col items-center relative motion-section" id="pricing">
      {/* Background Soft Mesh */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-100/20 blur-[130px]"></div>
      </div>

      <div className="text-center mb-16 z-10 relative">
        <span className="uppercase block text-xs font-semibold text-blue-600 tracking-widest mb-4 font-geist">
          ESTIMATES &amp; PLANS
        </span>
        <h2 className="md:text-5xl text-3xl text-slate-900 tracking-tight mb-4 font-jakarta font-medium">
          Service Packages
        </h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto font-geist">
          No project is too small or too large. We offer transparent pricing structures tailored to your specific building and plumbing requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center w-full max-w-6xl mx-auto z-10 relative">
        {/* Starter Plan (Free) */}
        <div className="glass-panel bg-white flex flex-col h-[calc(100%-2rem)] hover:border-blue-300 transition-colors border-slate-200 border rounded-2xl pt-8 pr-8 pb-12 pl-8 shadow-sm hover:shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl text-slate-900 tracking-tight font-jakarta font-semibold">
                Minor Repairs
              </h3>
              <p className="text-xs text-slate-500 font-geist">
                Urgent repairs &amp; general fixes
              </p>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl tracking-tight text-slate-900 font-jakarta font-medium">
                Free
              </span>
              <span className="text-sm text-slate-500 font-geist">Initial Estimate</span>
            </div>
            <p className="text-xs text-slate-400 mt-2 font-geist">
              Quotes are 100% free with no obligation
            </p>
          </div>

          <ul className="space-y-4 text-sm text-slate-600 flex-grow mb-10">
            <li className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 shrink-0 mt-0.5">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span className="font-geist">Unblocking drains &amp; leak detection</span>
            </li>
            <li className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 shrink-0 mt-0.5">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span className="font-geist">Tiling touch-ups &amp; plaster repairs</span>
            </li>
            <li className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 shrink-0 mt-0.5">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span className="font-geist">Minor electrical &amp; geyser checks</span>
            </li>
          </ul>

          <button type="button" onClick={onOpenQuote} className="h-11 flex items-center justify-center transition-all text-sm font-semibold text-slate-800 font-geist bg-transparent w-full border-slate-300 border rounded-xl hover:bg-slate-900 hover:text-white hover:border-slate-900 shadow-sm hover:shadow-md cursor-pointer">
            Request Inspection
          </button>
        </div>

        {/* Architect Plan (Animated Gradient) */}
        <div className="relative group rounded-2xl p-[1px] h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
          {/* Animated Border Container */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-slate-200"></div>
            {/* Spinning Highlight using royal blue & red matching company logo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[15rem] bg-gradient-to-b from-transparent via-blue-600 to-transparent opacity-90" style={{ transformOrigin: 'center', animation: 'rotatePlan 6s linear infinite' }}></div>
          </div>

          {/* Inner Card Content */}
          <div className="flex flex-col transition-all duration-300 z-10 w-full h-full rounded-[15px] pt-8 pr-8 pb-8 pl-8 relative bg-white" style={{ boxShadow: '0px -16px 24px 0px rgba(0, 0, 0, 0.01) inset' }}>
            <div className="absolute top-0 right-8 transform -translate-y-1/2">
              <span className="text-[9px] uppercase font-bold text-white tracking-widest bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full pt-1 pr-3 pb-1 pl-3 shadow-md font-geist">
                POPULAR
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex text-blue-600 bg-gradient-to-br from-blue-100/50 to-indigo-100/50 w-10 h-10 border-blue-200/50 border rounded-xl items-center justify-center shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight font-jakarta">
                  Renovations
                </h3>
                <p className="text-xs text-slate-500 font-geist">
                  Home extensions &amp; bathroom revamps
                </p>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl tracking-tight text-slate-900 font-jakarta font-semibold">
                  Custom
                </span>
                <span className="text-sm text-slate-500 font-geist">Project Rates</span>
              </div>
              <p className="text-xs text-slate-400 mt-2 font-geist">
                Tailored according to sizes &amp; premium finishes
              </p>
            </div>

            <ul className="space-y-4 text-sm text-slate-700 flex-grow mb-10">
              <li className="flex items-start gap-3 font-geist font-medium">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '1.25rem', height: '1.25rem', backgroundColor: 'rgb(219 234 254)', borderRadius: '50%', flexShrink: 0 }} className="mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgb(29 78 216)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                Kitchens, Bathrooms &amp; Plastering
              </li>
              <li className="flex items-start gap-3 font-geist font-medium">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '1.25rem', height: '1.25rem', backgroundColor: 'rgb(219 234 254)', borderRadius: '50%', flexShrink: 0 }} className="mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgb(29 78 216)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                Tiling, Skimming &amp; Drywall partitions
              </li>
              <li className="flex items-start gap-3 font-geist font-medium">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '1.25rem', height: '1.25rem', backgroundColor: 'rgb(219 234 254)', borderRadius: '50%', flexShrink: 0 }} className="mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgb(29 78 216)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                Full painting &amp; floor paving
              </li>
            </ul>

            <button type="button" onClick={onOpenQuote} className="btn-brand-red h-11 flex items-center justify-center transition-all text-sm font-semibold font-geist w-full rounded-xl hover:scale-[1.01] cursor-pointer">
              Book Project Consult
            </button>
          </div>
        </div>

        {/* Turnkey Build Plan */}
        <div className="glass-panel bg-white flex flex-col h-[calc(100%-2rem)] hover:border-blue-300 transition-colors border-slate-200 border rounded-2xl pt-8 pr-8 pb-12 pl-8 shadow-sm hover:shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 3v18" />
                <path d="M15 3v18" />
                <path d="M3 9h18" />
                <path d="M3 15h18" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl text-slate-900 tracking-tight font-jakarta font-semibold">
                Turnkey Builds
              </h3>
              <p className="text-xs text-slate-500 font-geist">
                New homes &amp; complete roofing
              </p>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl tracking-tight text-slate-900 font-jakarta font-medium">
                Contract
              </span>
              <span className="text-sm text-slate-500 font-geist">Based Pricing</span>
            </div>
            <p className="text-xs text-slate-400 mt-2 font-geist">
              Detailed breakdown of material &amp; labor costs
            </p>
          </div>

          <ul className="space-y-4 text-sm text-slate-600 flex-grow mb-10">
            <li className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 shrink-0 mt-0.5">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span className="font-geist">Brand new home construction</span>
            </li>
            <li className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 shrink-0 mt-0.5">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span className="font-geist">Complete roofing &amp; waterproofing overhauls</span>
            </li>
            <li className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 shrink-0 mt-0.5">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span className="font-geist">Complete property plumbing &amp; utilities builds</span>
            </li>
          </ul>

          <button type="button" onClick={onOpenQuote} className="h-11 flex items-center justify-center transition-all text-sm font-semibold text-slate-800 font-geist bg-transparent w-full border-slate-300 border rounded-xl hover:bg-slate-900 hover:text-white hover:border-slate-900 shadow-sm hover:shadow-md cursor-pointer">
            Contact Turnkey Specialist
          </button>
        </div>
      </div>
    </section>
  );
}
