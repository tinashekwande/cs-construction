import { useState } from 'react';
import useSEO from '../hooks/useSEO';

// ─── Construction FAQs ────────────────────────────────────────────────────────
const CONSTRUCTION_FAQS = [
  {
    q: 'Do you provide written quotes?',
    a: 'Yes. Every project begins with a detailed, written quote broken down by materials and labour. We will never start work without your written approval. Our quotes are free and carry no obligation — contact us on 071 727 0094 to request yours.'
  },
  {
    q: 'Are you NHBRC registered?',
    a: 'CS Construction & Projects is a registered business entity operating in full compliance with South African building regulations and the National Building Regulations and Building Standards Act. We advise all clients to request compliance documentation from any contractor before a major build. Contact us for full registration details.'
  },
  {
    q: 'Do I need building plans for a renovation?',
    a: 'It depends on the scope. Adding a new room, changing the external footprint of your home, or altering load-bearing structures all require approved building plans submitted to your local municipality. Minor internal renovations such as tiling, painting, or replacing fixtures generally do not. We advise on your specific project and can assist with building plan submission.'
  },
  {
    q: 'How long does a kitchen renovation take?',
    a: 'A standard kitchen renovation in Cape Town takes 2 to 6 weeks. A cosmetic refresh — new tiling, painting, and fitting replacements — can take 1–2 weeks. A full gut renovation involving plumbing relocation, new cabinetry, and tiling typically takes 4–6 weeks. We provide a written project schedule before starting.'
  },
  {
    q: 'How long does a bathroom renovation take?',
    a: 'Most bathroom renovations take 1–3 weeks. A straightforward tiling and sanware replacement can be completed in 5–7 days. A full strip-and-refit with new waterproofing, plumbing, tiling, and fittings typically takes 2–3 weeks. Your timeline is confirmed in writing at the quotation stage.'
  },
  {
    q: 'What is included in a home extension project?',
    a: 'A typical home extension includes: foundation work, brickwork and structural walling, roof installation (trusses, sheeting or tiles), window and door fitting, internal plastering and skimming, electrical rough-in coordination, floor preparation and tiling, painting, and final handover. We manage every trade and provide a single point of accountability throughout.'
  },
  {
    q: 'Do you handle building plan submissions?',
    a: 'We assist clients with building plan preparation for basic extensions and additions. For complex projects requiring a certified architect or structural engineer, we coordinate with trusted professionals in our network. We can support plan submission to the local municipality, approval tracking, and compliance sign-off.'
  },
  {
    q: 'What areas in Cape Town do you service?',
    a: 'We service the entire Cape Town metropolitan area and surrounding Western Cape — from Bellville, Parow, Kraaifontein, Durbanville and Brackenfell in the north, to Claremont, Rondebosch, Wynberg and Muizenberg in the south, and across to Milnerton, Table View, Century City, Somerset West, Strand, Stellenbosch, and Paarl. Contact us to confirm availability in your suburb.'
  },
  {
    q: 'What is your payment structure?',
    a: 'We work on a staged payment structure tied to project milestones: a deposit of 30–50% to secure materials and schedule the project, a midpoint payment at a defined construction milestone, and a final payment on client sign-off at practical completion. We never request full payment upfront. All terms are documented in your project contract.'
  },
  {
    q: 'Do you offer a workmanship guarantee?',
    a: 'Yes. CS Construction & Projects stands behind all work delivered. We offer a workmanship defects guarantee of 6–12 months on completed projects. If a defect arises from our workmanship within the guarantee period, we will return and remedy it at no cost to you. Manufacturer and supplier warranties are passed through on all materials.'
  }
];

// ─── Plumbing FAQs ────────────────────────────────────────────────────────────
const PLUMBING_FAQS = [
  {
    q: 'Do you offer emergency plumbing services?',
    a: 'Yes. We respond to plumbing emergencies across Cape Town including burst pipes, blocked drains, geyser failures, sewage backflow, and major leaks. Call us on 071 727 0094, describe your emergency, and we will dispatch a plumber as quickly as possible with a confirmed arrival window.'
  },
  {
    q: 'What are your call-out rates?',
    a: 'Our call-out rate varies depending on the time of day, your location, and the nature of the job. We always provide a quote before commencing work so you know the exact cost upfront. Standard rates apply during business hours (Mon–Fri 07:00–18:00). After-hours and weekend call-outs carry a premium. Contact us for current rates.'
  },
  {
    q: 'How quickly can a plumber arrive?',
    a: 'For emergencies, we aim to respond within 2–4 hours anywhere in the Cape Town metro area. For standard bookings, we typically schedule within 1–2 business days. We always confirm an exact arrival window before dispatch so you are never left waiting without information.'
  },
  {
    q: 'Do you fix burst pipes after hours?',
    a: 'Yes. Burst pipes are treated as emergencies and we respond after hours, weekends, and on public holidays. Call 071 727 0094 immediately. In the meantime, locate and shut off your water meter stopcock to minimise water damage to your property. Do not wait until morning — water damage escalates quickly and significantly increases repair costs.'
  },
  {
    q: 'How do I know if my geyser needs replacing?',
    a: 'Signs your geyser may need replacing include: water not reaching the correct temperature, rust-coloured water from hot taps, visible corrosion on the geyser body, the geyser being over 10 years old, repeated element failures, a leaking pressure control valve, or a rising electricity bill indicating reduced efficiency. Call us for a free geyser assessment across Cape Town.'
  },
  {
    q: 'What does a new geyser installation cost in South Africa?',
    a: 'In Cape Town, a standard 150L electrical geyser replacement (supply and installation) typically costs between R6 000 and R12 000 depending on the brand, capacity, and accessibility of the installation point. Solar geysers and heat pumps cost more upfront (R18 000–R35 000+) but deliver significant long-term electricity savings. We provide a full written quote before starting any installation.'
  },
  {
    q: 'Are your plumbers licensed?',
    a: 'Our plumbing team is trained and experienced in compliance with South African plumbing standards, including SANS 10252 and local authority requirements for residential and commercial plumbing work. We are able to issue Certificate of Compliance (COC) documentation for qualifying plumbing work on request.'
  },
  {
    q: 'Do you issue plumbing compliance certificates?',
    a: 'Yes. Certificates of Compliance (COC) for plumbing work are available on request and are required by law for property transfers, insurance claims, and certain new installations including geysers. Contact us to confirm whether your project qualifies for a COC and we will arrange the necessary testing and certification.'
  },
  {
    q: 'What causes blocked drains?',
    a: 'The most common causes of blocked drains in Cape Town homes include grease and fat buildup in kitchen drains, hair and soap scum in bathroom drains, sanitary products or wet wipes flushed down toilets, tree root ingress in outdoor pipes, and collapsed or displaced drain sections in older properties. We use drain snakes, high-pressure water jetting, and CCTV drain inspection to diagnose and clear blockages effectively.'
  },
  {
    q: 'Can you detect hidden water leaks?',
    a: 'Yes. We use acoustic leak detection equipment and pressure testing to locate water leaks hidden behind walls, under floors, or underground — without unnecessary destructive opening. If you notice a sudden increase in your water account, a damp patch on a wall, or hear running water with all taps closed, call us immediately. Early leak detection prevents structural damage, mould growth, and excessive water bills.'
  }
];

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    ...CONSTRUCTION_FAQS.map(item => ({
      '@type': 'Question',
      'name': item.q,
      'acceptedAnswer': { '@type': 'Answer', 'text': item.a }
    })),
    ...PLUMBING_FAQS.map(item => ({
      '@type': 'Question',
      'name': item.q,
      'acceptedAnswer': { '@type': 'Answer', 'text': item.a }
    }))
  ]
};

function AccordionItem({ item, index, isOpen, onToggle }) {
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 ring-1 ring-black/5 overflow-hidden ${
        isOpen
          ? 'border-blue-200 bg-gradient-to-b from-blue-50/50 via-blue-50/20 to-white'
          : 'border-slate-200 bg-white hover:bg-slate-50'
      }`}
    >
      <button
        type="button"
        onClick={() => onToggle(index)}
        className="w-full text-left px-6 sm:px-8 py-5 sm:py-6 flex items-start justify-between gap-6 transition-colors cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="sm:text-lg text-base font-semibold text-slate-900 tracking-tight font-jakarta">
          {item.q}
        </span>
        <span className="inline-flex items-center justify-center rounded-full bg-slate-100 ring-1 ring-slate-200 text-slate-600 h-8 w-8 shrink-0 transition-transform duration-200">
          <div className="relative w-4 h-4">
            <div
              className="absolute inset-0 flex items-center justify-center transition-all duration-300"
              style={{ opacity: isOpen ? 1 : 0, transform: isOpen ? 'rotate(0deg)' : 'rotate(90deg)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /></svg>
            </div>
            <div
              className="flex items-center justify-center transition-all duration-300"
              style={{ opacity: isOpen ? 0 : 1, transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
            </div>
          </div>
        </span>
      </button>
      <div
        className="transition-all duration-300 ease-in-out overflow-hidden"
        style={{ maxHeight: isOpen ? '400px' : '0', opacity: isOpen ? 1 : 0 }}
      >
        <div className="sm:px-8 sm:pb-8 pt-0 pr-6 pb-6 pl-6">
          <p className="sm:text-base leading-relaxed text-sm text-slate-600 font-jakarta">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [activeTab, setActiveTab] = useState('construction');
  const [openIndex, setOpenIndex] = useState(0);

  // Inject FAQPage JSON-LD schema for Google rich results / featured snippets
  useSEO({ schema: FAQ_SCHEMA });

  const items = activeTab === 'construction' ? CONSTRUCTION_FAQS : PLUMBING_FAQS;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setOpenIndex(0);
  };

  return (
    <div className="bg-slate-50 max-w-4xl mr-auto ml-auto pt-24 pr-6 pb-16 pl-6 border-t border-slate-200">
      {/* Heading */}
      <div className="text-center mb-12 sm:mb-16">
        <span className="uppercase text-[10px] font-semibold text-blue-600 tracking-widest font-geist bg-blue-50 border border-blue-200/50 rounded-full px-3.5 py-1.5 inline-block mb-4">
          FAQ
        </span>
        <h2 className="sm:text-5xl text-4xl font-semibold text-slate-900 tracking-tight font-jakarta">
          Your Questions, Answered
        </h2>
        <p className="sm:text-lg leading-relaxed text-base text-slate-500 font-jakarta max-w-2xl mt-4 mr-auto ml-auto">
          Everything you need to know about hiring a building contractor or plumber in Cape Town. Can't find your answer? Call us on <a href="tel:0717270094" className="text-blue-600 font-medium hover:underline">071 727 0094</a>.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2 justify-center mb-10 bg-slate-100 border border-slate-200 rounded-2xl p-1.5 max-w-sm mx-auto">
        <button
          type="button"
          onClick={() => handleTabChange('construction')}
          className={`flex-1 px-5 py-2.5 rounded-xl text-xs font-semibold tracking-tight font-geist transition-all duration-200 cursor-pointer ${
            activeTab === 'construction'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          🏗️ Construction
        </button>
        <button
          type="button"
          onClick={() => handleTabChange('plumbing')}
          className={`flex-1 px-5 py-2.5 rounded-xl text-xs font-semibold tracking-tight font-geist transition-all duration-200 cursor-pointer ${
            activeTab === 'plumbing'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          🔧 Plumbing
        </button>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        {items.map((item, index) => (
          <AccordionItem
            key={`${activeTab}-${index}`}
            item={item}
            index={index}
            isOpen={index === openIndex}
            onToggle={(i) => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <p className="text-slate-500 text-sm font-jakarta mb-4">
          Have a specific question about your project? We offer <strong className="text-slate-800">free consultations</strong> with no obligation.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="tel:0717270094"
            className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-6 h-11 rounded-xl text-xs font-semibold font-geist hover:bg-slate-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            Call 071 727 0094
          </a>
          <a
            href="https://wa.me/27717270094?text=Hi%20CS%20Construction%2C%20I%20have%20a%20question%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 h-11 rounded-xl text-xs font-semibold font-geist hover:bg-emerald-700 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
}
