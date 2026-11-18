import React from 'react';
import { SEO } from '../../components/common/SEO';

export function PrivacyPolicy() {
  const sections = [
    {
      number: '01',
      title: 'COLLECTION OF PERSONAL INFORMATION',
      content:
        'When you browse the CHEXY HUB digital boutique, register an atelier profile, or place an order for checkered shirts, we collect personal identifying information necessary to fulfill your request. This includes your name, postal billing and shipping address, email address, telephone contact, and sizing preferences. We also capture device metrics and browsing interactions to refine catalogue curation.',
    },
    {
      number: '02',
      title: 'USE & DISCLOSURE OF DATA',
      content:
        'Your information is strictly utilized to process transactions, manage deliveries via our express logistics partners (BlueDart, Delhivery), communicate dispatch milestones, and deliver private invitations to seasonal check campaigns when opted in. CHEXY HUB adheres to an uncompromising zero-broker policy: your private records are never monetized, rented, or distributed to advertising syndicates.',
    },
    {
      number: '03',
      title: 'PAYMENT SECURITY & PCI-DSS COMPLIANCE',
      content:
        'CHEXY HUB does not retain, process, or view credit/debit card numbers or confidential banking credentials. All electronic payments are processed through PCI-DSS Level 1 compliant gateway architectures (Razorpay) utilizing end-to-end 256-bit TLS encryption, tokenization, and two-factor authentication.',
    },
    {
      number: '04',
      title: 'COOKIE ARCHITECTURE & PREFERENCES',
      content:
        'We utilize minimal functional and analytical session cookies to remember shopping bag contents, preserve your active colorway filters, and tailor navigation performance across mobile and desktop interfaces. You retain complete authority to modify or reject cookie parameters via your browser configuration at any time.',
    },
    {
      number: '05',
      title: 'YOUR STATUTORY CLIENT RIGHTS',
      content:
        'Under applicable digital privacy legislation, you maintain the fundamental right to access, rectify, export, or permanently erase your client profile and historical transaction log from our records. To submit a data inquiry, please contact our concierge team at privacy@chexyhub.com.',
    },
  ];

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#0E0E0E] text-black dark:text-white transition-colors duration-300 min-h-screen">
      <SEO
        title="Privacy & Data Protection Policy | CHEXY HUB"
        description="Learn how CHEXY HUB safeguards customer personal information, shipping data, and payment security."
      />

      <div className="pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-8 max-w-[1200px] mx-auto w-full">
        {/* Editorial Header */}
        <div className="pb-6 sm:pb-8 border-b border-black/10 dark:border-white/10">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 mb-2">
            <span>LEGAL ARCHIVE</span>
            <span>•</span>
            <span>PRIVACY NOTICE</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-black dark:text-white">
            PRIVACY & DATA PROTECTION
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
            Inquiries regarding personal records: <a href="mailto:privacy@chexyhub.com" className="text-black dark:text-white font-medium hover:underline">privacy@chexyhub.com</a>
          </p>
          <p className="uppercase tracking-widest text-[10px]">
            STYLE IS A STATEMENT • CHEXY HUB
          </p>
        </div>
      </div>
    </div>
  );
}
