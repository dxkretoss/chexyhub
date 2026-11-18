import React from 'react';
import { SEO } from '../../components/common/SEO';

export function ShippingPolicy() {
  const sections = [
    {
      number: '01',
      title: 'DISPATCH & ATELIER PREPARATION',
      content:
        'Every garment in our checkered collections undergoes individual finishing, button inspection, and hand-folding prior to dispatch. Orders placed before 14:00 IST Monday through Friday are prepared and dispatched within 24 hours from our Mumbai fulfillment atelier.',
    },
    {
      number: '02',
      title: 'TRANSIT TIMELINES & COURIER PARTNERS',
      content:
        'We partner exclusively with premier air courier services including BlueDart Air Express and Delhivery Premier to ensure your shirts arrive safely. Metro destinations (Mumbai, Delhi NCR, Bengaluru, Chennai, Kolkata, Hyderabad, Pune) receive delivery within 2 to 3 business days. Tier-2 and regional Indian locations are typically delivered in 4 to 5 business days.',
    },
    {
      number: '03',
      title: 'SHIPPING TARIFFS & COMPLIMENTARY TIERS',
      content:
        'CHEXY HUB provides complimentary Express Delivery on all orders exceeding ₹1,999. For orders below this qualifying threshold, a flat delivery fee of ₹99 is applied at checkout. All duties, state entry taxes, and GST are fully covered by CHEXY HUB.',
    },
    {
      number: '04',
      title: 'SHIPMENT TRACKING & SIGNATURE DELIVERY',
      content:
        'The moment your parcel is assigned to our logistics partner, an automated confirmation email and SMS dispatch link with your digital AWB number will be issued. Real-time courier milestones can be monitored directly on our Order Tracking portal.',
    },
  ];

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#0E0E0E] text-black dark:text-white transition-colors duration-300 min-h-screen">
      <SEO
        title="Shipping & Delivery Policy | CHEXY HUB"
        description="Learn about our express courier delivery timelines, free shipping threshold, and packaging across India."
      />

      <div className="pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-8 max-w-[1200px] mx-auto w-full">
        {/* Editorial Header */}
        <div className="pb-6 sm:pb-8 border-b border-black/10 dark:border-white/10">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 mb-2">
            <span>CLIENT SERVICES</span>
            <span>•</span>
            <span>LOGISTICS & TRANSIT</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-black dark:text-white">
            SHIPPING & DELIVERY
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-3 text-xs uppercase tracking-widest text-stone-500">
            <span>ALL INDIA AIR EXPRESS • DISPATCH WITHIN 24 HOURS</span>
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
            Logistics concierge: <a href="mailto:concierge@chexyhub.com" className="text-black dark:text-white font-medium hover:underline">concierge@chexyhub.com</a>
          </p>
          <p className="uppercase tracking-widest text-[10px]">
            STYLE IS A STATEMENT • CHEXY HUB
          </p>
        </div>
      </div>
    </div>
  );
}
