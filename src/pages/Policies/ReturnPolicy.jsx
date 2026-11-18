import React from 'react';
import { SEO } from '../../components/common/SEO';

export function ReturnPolicy() {
  const sections = [
    {
      number: '01',
      title: '15-DAY ATELIER EXCHANGE & RETURN WINDOW',
      content:
        'We desire that every checkered garment complements your wardrobe flawlessly. If the silhouette, chest fit, or color tone does not meet your expectations, you may initiate a complimentary doorstep return or size exchange within 15 calendar days of parcel receipt.',
    },
    {
      number: '02',
      title: 'DOORSTEP REVERSE LOGISTICS',
      content:
        'Once logged via your online account or through our concierge advisors, our dedicated courier partner will arrange reverse collection directly from your address. Reverse pickup is fully covered by CHEXY HUB at zero auxiliary charge to you.',
    },
    {
      number: '03',
      title: 'GARMENT INTEGRITY CRITERIA',
      content:
        'To qualify for a full restitution or exchange, garments must remain in pristine condition: unworn (apart from trial fit assessment), unwashed, devoid of fragrances or laundering scents, and retaining all original woven labels, spare buttons, and protective garment packaging.',
    },
    {
      number: '04',
      title: 'REFUND TIMELINES & MODALITIES',
      content:
        'Following arrival at our Mumbai atelier and rapid quality verification (completed within 24 hours of reception), refunds are initiated directly to the original payment instrument. Prepaid card/UPI settlements reflect within 3 to 5 business days, while Cash on Delivery orders are settled via immediate IMPS/NEFT bank transfer.',
    },
  ];

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#0E0E0E] text-black dark:text-white transition-colors duration-300 min-h-screen">
      <SEO
        title="15-Day Return & Exchange Policy | CHEXY HUB"
        description="Read our 15-day complimentary doorstep return and size exchange policy."
      />

      <div className="pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-8 max-w-[1200px] mx-auto w-full">
        {/* Editorial Header */}
        <div className="pb-6 sm:pb-8 border-b border-black/10 dark:border-white/10">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 mb-2">
            <span>CLIENT SERVICES</span>
            <span>•</span>
            <span>RETURNS & EXCHANGES</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-black dark:text-white">
            RETURNS & EXCHANGES
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-3 text-xs uppercase tracking-widest text-stone-500">
            <span>15-DAY COMPLIMENTARY DOORSTEP PICKUP • EFFORTLESS FIT ASSURANCE</span>
            <span>LAST REVISED: NOVEMBER 2026</span>
          </div>
        </div>

        {/* Structured Editorial Sections */}
        <div className="divide-y divide-black/10 dark:border-white/10">
          {sections.map((sec) => (
            <div
              key={sec.number}
              className="py-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-baseline"
            >
              <div className="md:col-span-4 space-y-1">
                <span className="text-[11px] font-mono font-bold tracking-widest text-stone-400 block">
                  {sec.number}
                </span>
                <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-black dark:text-white">
                  {sec.title}
                </h2>
              </div>
              <div className="md:col-span-8">
                <p className="text-xs sm:text-sm font-light text-stone-700 dark:text-stone-300 leading-relaxed">
                  {sec.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Legal Contact Assistance */}
        <div className="mt-12 pt-8 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-stone-500 font-light">
          <p>
            Initiate exchange or return: <a href="mailto:concierge@chexyhub.com" className="text-black dark:text-white font-medium hover:underline">concierge@chexyhub.com</a>
          </p>
          <p className="uppercase tracking-widest text-[10px]">
            STYLE IS A STATEMENT • CHEXY HUB
          </p>
        </div>
      </div>
    </div>
  );
}
