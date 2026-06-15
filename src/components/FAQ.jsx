import { useState } from 'react';

const FAQ_DATA = [
  {
    q: 'Do you handle both small repairs and large construction projects?',
    a: 'Yes, absolutely. No project is too small or too large. Our commitment extends to every project. We handle everything from minor plumbing leaks, drain unblocking, and tiling touch-ups to full home additions and new construction.'
  },
  {
    q: 'Are your building and plumbing services insured?',
    a: 'Yes, CS Construction and Projects is a registered entity. We maintain full liability insurance and follow strict safety guidelines to ensure complete peace of mind for our clients and our workers.'
  },
  {
    q: 'How do I get an estimate for my project?',
    a: 'You can fill out our "Request a Quote" form on the website, email us at stevenchimpeni8@gmail.com, or call us at 071 727 0094. We offer free consultations and detailed estimates for all renovations and plumbing work.'
  },
  {
    q: 'Which areas in Cape Town do you service?',
    a: 'We are based in Kraaifontein, Cape Town, and service the entire Cape Town metropolitan region, including the Northern Suburbs, Southern Suburbs, City Bowl, and surrounding suburbs.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-slate-50 max-w-4xl mr-auto ml-auto pt-24 pr-6 pb-16 pl-6 border-t border-slate-200">
      {/* Heading */}
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="sm:text-5xl text-4xl font-semibold text-slate-900 tracking-tight font-jakarta">
          Your Questions, Answered
        </h2>
        <p className="sm:text-lg leading-relaxed text-base text-slate-500 font-jakarta max-w-2xl mt-4 mr-auto ml-auto">
          Get instant answers to the most common questions about our services and process.
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-5">
        {FAQ_DATA.map((item, index) => {
          const isOpen = index === openIndex;
          return (
            <div
              key={index}
              className={`rounded-3xl border transition-all duration-300 ring-1 ring-black/5 overflow-hidden ${
                isOpen
                  ? 'border-blue-200 bg-gradient-to-b from-blue-50/50 via-blue-50/20 to-white'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 sm:px-8 py-5 sm:py-6 flex items-start justify-between gap-6 transition-colors"
              >
                <span className="sm:text-xl text-lg font-semibold text-slate-900 tracking-tight font-jakarta">
                  {item.q}
                </span>
                <span className="inline-flex items-center justify-center rounded-full bg-slate-100 ring-1 ring-slate-200 text-slate-600 h-8 w-8 shrink-0 transition-transform duration-200">
                  <div className="relative">
                    {/* minus icon */}
                    <div
                      className="absolute inset-0 flex items-center justify-center transition-all duration-300"
                      style={{
                        opacity: isOpen ? 1 : 0,
                        transform: isOpen ? 'rotate(0deg)' : 'rotate(90deg)',
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M5 12h14" />
                      </svg>
                    </div>
                    {/* plus icon */}
                    <div
                      className="flex items-center justify-center transition-all duration-300"
                      style={{
                        opacity: isOpen ? 0 : 1,
                        transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    </div>
                  </div>
                </span>
              </button>
              
              <div
                className="transition-all duration-300 ease-in-out overflow-hidden"
                style={{
                  maxHeight: isOpen ? '200px' : '0',
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <div className="sm:px-8 sm:pb-8 pt-0 pr-6 pb-6 pl-6">
                  <p className="sm:text-base leading-relaxed text-sm text-slate-600 font-jakarta">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
