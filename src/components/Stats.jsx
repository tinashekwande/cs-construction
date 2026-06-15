export default function Stats() {
  return (
    <section className="lg:px-8 max-w-7xl mr-auto mb-12 lg:mb-32 ml-auto pr-6 pl-6 motion-section" id="features">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="glass-panel p-4 sm:p-6 md:p-8 rounded-2xl flex flex-col" style={{ transformOrigin: '50% 50%' }}>
          <h2 className="text-2xl sm:text-3xl tracking-tight text-slate-900 mb-1 sm:mb-2 font-jakarta font-medium">
            10 Years
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-geist">
            Wealth of experience managing and taking on projects of all sizes.
          </p>
        </div>
        <div className="glass-panel flex flex-col rounded-2xl p-4 sm:p-6 md:p-8" style={{ transformOrigin: '50% 50%' }}>
          <h2 className="text-2xl sm:text-3xl text-slate-900 tracking-tight mb-1 sm:mb-2 font-jakarta font-medium">
            100%
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-geist">
            Customer satisfaction focus and dedication to seamless solutions.
          </p>
        </div>
        <div className="glass-panel flex flex-col text-white bg-slate-900 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80')] bg-cover bg-center border-transparent rounded-2xl p-4 sm:p-6 md:p-8 relative overflow-hidden shadow-lg" style={{ transformOrigin: '50% 50%' }}>
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px] pointer-events-none"></div>
          <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-1 text-blue-300 font-geist z-10">
            Commitment
          </span>
          <h2 className="text-2xl sm:text-3xl tracking-tight mb-1 sm:mb-2 font-jakarta font-medium text-white z-10">
            Honest
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 font-geist z-10">
            Service delivery and quality workmanship on every task.
          </p>
        </div>
        <div className="glass-panel p-4 sm:p-6 md:p-8 rounded-2xl flex flex-col" style={{ transformOrigin: '50% 50%' }}>
          <h2 className="text-2xl sm:text-3xl tracking-tight text-slate-900 mb-1 sm:mb-2 font-jakarta font-medium">
            Any Size
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-geist">
            From minor repairs to brand new homes and everything in between.
          </p>
        </div>
      </div>
    </section>
  );
}
