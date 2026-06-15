import { useState } from 'react';

export function QuoteRequestModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'renovations',
    details: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  const handleClose = () => {
    setSuccess(false);
    setFormData({ name: '', email: '', phone: '', projectType: 'renovations', details: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        onClick={handleClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300"
      ></div>

      {/* Panel */}
      <div className="relative w-full max-w-md rounded-[28px] p-[1px] overflow-hidden shadow-2xl z-10 transition-all duration-300">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-200"></div>
          <div className="absolute top-1/2 left-1/2 w-[200%] h-[16rem] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-blue-600 to-transparent opacity-80" style={{ transformOrigin: 'center', animation: 'rotatePlan 6s linear infinite' }}></div>
        </div>
        <div className="relative z-10 rounded-[27px] border border-slate-100 bg-white p-6 sm:p-8">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-blue-600 font-bold mb-1">CS Construction</p>
              <h3 className="text-2xl text-slate-900 tracking-tight font-jakarta font-semibold">Request a Free Quote</h3>
            </div>
            <button 
              onClick={handleClose} 
              type="button" 
              aria-label="Close" 
              className="h-10 w-10 rounded-full border border-slate-200 bg-slate-50 text-slate-700 flex items-center justify-center hover:bg-slate-950 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-4 pt-5">
              <div className="grid gap-1.5">
                <label className="text-xs font-semibold text-slate-500 font-geist uppercase tracking-widest">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Steven Chimpeni" 
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 font-geist"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 font-geist uppercase tracking-widest">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="071 727 0094" 
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 font-geist"
                  />
                </div>
                <div className="grid gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 font-geist uppercase tracking-widest">Project Type</label>
                  <select 
                    value={formData.projectType}
                    onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 font-geist"
                  >
                    <option value="building">Building &amp; Brickwork</option>
                    <option value="renovations">Renovations &amp; Tiling</option>
                    <option value="plumbing">Plumbing &amp; Geysers</option>
                    <option value="roofing">Roofing &amp; Waterproofing</option>
                    <option value="maintenance">Minor Maintenance</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-1.5">
                <label className="text-xs font-semibold text-slate-500 font-geist uppercase tracking-widest">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="client@gmail.com" 
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 font-geist"
                />
              </div>

              <div className="grid gap-1.5">
                <label className="text-xs font-semibold text-slate-500 font-geist uppercase tracking-widest">Project Details</label>
                <textarea 
                  rows="3"
                  value={formData.details}
                  onChange={(e) => setFormData({...formData, details: e.target.value})}
                  placeholder="Briefly describe what you need built, repaired or renovated..." 
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 font-geist resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="btn-brand-red w-full h-12 flex items-center justify-center rounded-xl text-sm font-semibold tracking-wide font-geist active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center text-center py-8 gap-4 pt-8">
              <div className="w-14 h-14 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h4 className="text-xl text-slate-900 font-jakarta font-semibold tracking-tight">Request Received!</h4>
              <p className="text-sm text-slate-500 font-geist max-w-xs">
                Thank you for reaching out. Director Steven Chimpeni will review your details and contact you within 24 hours.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-4 px-6 py-2.5 rounded-xl bg-slate-950 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
