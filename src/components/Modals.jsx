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
  const [whatsappUrl, setWhatsappUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const projectLabels = {
      building: 'Building & Brickwork',
      renovations: 'Renovations & Tiling',
      plumbing: 'Plumbing & Geysers',
      roofing: 'Roofing & Waterproofing',
      maintenance: 'Minor Maintenance'
    };

    const projectLabel = projectLabels[formData.projectType] || formData.projectType;

    const message = `*NEW QUOTE REQUEST - CS CONSTRUCTION*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Email:* ${formData.email}\n` +
      `*Project Type:* ${projectLabel}\n\n` +
      `*Project Details:*\n${formData.details || 'N/A'}`;

    const url = `https://wa.me/27717270094?text=${encodeURIComponent(message)}`;
    setWhatsappUrl(url);

    // Open WhatsApp
    window.open(url, '_blank');

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 200);
  };

  const handleClose = () => {
    setSuccess(false);
    setWhatsappUrl('');
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
                className="w-full h-12 flex items-center justify-center gap-2 rounded-xl text-xs font-semibold tracking-wide font-geist bg-emerald-600 hover:bg-emerald-700 text-white active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-50 shadow-md uppercase tracking-wider"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                {loading ? 'Opening WhatsApp...' : 'Submit Request via WhatsApp'}
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center text-center py-6 gap-4 pt-6">
              <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shadow-md text-emerald-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h4 className="text-xl text-slate-900 font-jakarta font-semibold tracking-tight">Redirecting to WhatsApp!</h4>
              <p className="text-xs text-slate-500 font-geist max-w-xs leading-relaxed">
                Your quote request details have been generated. If WhatsApp did not open automatically, click below to open your chat with Director Steven.
              </p>
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl text-xs font-bold font-geist shadow-md hover:scale-[1.02] transition-all"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Open WhatsApp Chat
                </a>
              )}
              <button
                type="button"
                onClick={handleClose}
                className="mt-1 px-6 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors cursor-pointer"
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
