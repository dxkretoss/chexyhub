import React from 'react';
import { SEO } from '../../components/common/SEO';

export function TermsAndConditions() {
  const sections = [
    {
      number: '01',
      title: 'ACCEPTANCE OF CONDITIONS',
      content:
        'By browsing, creating an account, or acquiring apparel through CHEXY HUB, you explicitly consent to and agree to be governed by these Terms and Conditions, together with our Privacy Policy, Shipping Agreement, and Return Guidelines. If you do not accept these provisions without reservation, please discontinue interaction with this platform.',
    },
    {
      number: '02',
      title: 'AUTHENTICITY & TEXTILE REPRESENTATION',
      content:
        'CHEXY HUB specializes solely in curated checkered apparel. Every visual representation, fabric weave photograph, and colorway displayed across our digital catalogue has been crafted under controlled studio lighting. Due to organic yarn-dying processes and varying display calibrations, slight optical differences in check pattern scale and tonal depth may naturally occur.',
    },
    {
      number: '03',
      title: 'ORDERS, PRICING & TRANSACTION ACCEPTANCE',
      content:
        'All prices listed are denominated in Indian Rupees (INR ₹) and are inclusive of relevant statutory GST levies. We reserve the right to decline or cancel orders in cases of demonstrable typographical inaccuracies, fraudulent flags from payment validation gateways, or unexpected stock allocation deficits. In any such circumstance, your full remuneration will be credited immediately to the original instrument.',
    },
    {
      number: '04',
      title: 'INTELLECTUAL PROPERTY & BRAND RIGHTS',
      content:
        'All visual assets, editorial campaigns, garment silhouettes, trademarks ("CHEXY HUB", "CHECK YOUR STYLE", "STYLE IS A STATEMENT"), typography, and software codes remain the sole and exclusive intellectual property of CHEXY HUB. Unauthorized duplication, framing, or commercial redistribution without prior written consent is strictly prohibited.',
    },
    {
      number: '05',
      title: 'JURISDICTION & APPLICABLE STATUTE',
      content:
        'These terms shall be interpreted and governed in accordance with the substantive laws of India. Any legal dispute, controversy, or claim arising out of your purchases with CHEXY HUB shall be submitted to the exclusive jurisdiction of the competent courts situated in Mumbai, Maharashtra.',
    },
  ];

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#0E0E0E] text-black dark:text-white transition-colors duration-300 min-h-screen">
      <SEO
        title="Terms & Conditions | CHEXY HUB"
        description="Review the terms and conditions governing purchases and usage on CHEXY HUB."
      />

      <div className="pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-8 max-w-[1200px] mx-auto w-full">
        {/* Editorial Header */}
        <div className="pb-6 sm:pb-8 border-b border-black/10 dark:border-white/10">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 mb-2">
            <span>LEGAL ARCHIVE</span>
            <span>•</span>
            <span>CONDITIONS OF PURCHASE</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-black dark:text-white">
            TERMS & CONDITIONS
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-3 text-xs uppercase tracking-widest text-stone-500">
            <span>CHEXY HUB ATELIER • ALL RIGHTS RESERVED</span>
            <span>LAST REVISED: NOVEMBER 2026</span>
          </div>
        </div>

        {/* Structured Editorial Sections */}
        <div className="divide-y divide-black/10 dark:divide-white/10">
          {sections.map((sec) => (
            <div
              key={sec.number}
              className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-baseline"
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
            Legal inquiries & corporate governance: <a href="mailto:legal@chexyhub.com" className="text-black dark:text-white font-medium hover:underline">legal@chexyhub.com</a>
          </p>
          <p className="uppercase tracking-widest text-[10px]">
            STYLE IS A STATEMENT • CHEXY HUB
          </p>
        </div>
      </div>
    </div>
  );
}
