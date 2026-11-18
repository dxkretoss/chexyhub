import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SEO } from '../../components/common/SEO';

const FAQS = [
  {
    category: 'Orders & Delivery',
    questions: [
      {
        q: 'How long does delivery take across India?',
        a: 'Orders are dispatched within 24 hours of placement from our Mumbai fulfillment center. Metro cities receive delivery in 2-3 business days, while non-metro pin codes take 4-5 business days via BlueDart Express Air logistics.'
      },
      {
        q: 'Do you offer Cash on Delivery (COD)?',
        a: 'Yes, Cash on Delivery is available across 19,000+ Indian postal codes. You can pay via cash or scan the courier partner’s dynamic UPI QR code on your doorstep upon delivery.'
      },
      {
        q: 'How can I track my order once placed?',
        a: 'You can track your order anytime from our Order Tracking page or under your Account > My Orders section using your order reference (e.g. CHX-98241).'
      }
    ]
  },
  {
    category: 'Fabrics & Sizing',
    questions: [
      {
        q: 'What cotton grades do you use for your shirts?',
        a: 'We use exclusively 100% Egyptian and organic long-staple combed cotton with 2-ply 80s yarns. Our flannels are double-brushed for ultra-soft warmth, and our linen blends use certified European flax.'
      },
      {
        q: 'How do I choose the correct size for myself or my family?',
        a: 'Every product page includes a comprehensive Size & Measurement Guide with exact chest, shoulder, and sleeve measurements. If you prefer a relaxed or layered fit over a t-shirt, we recommend sizing up.'
      },
      {
        q: 'Will the check shirts shrink after washing?',
        a: 'All our fabrics are pre-washed and peached during finishing to minimize residual shrinkage (under 2% when washed in cold water at 30°C).'
      }
    ]
  },
  {
    category: 'Returns & Exchanges',
    questions: [
      {
        q: 'What is your return & exchange policy?',
        a: 'We offer a hassle-free 15-day return and size exchange policy. If the shirt doesn’t fit or match your expectations, we arrange a free doorstep pickup.'
      },
      {
        q: 'How quickly are refunds processed?',
        a: 'Once the returned shirt passes our quality inspection at the warehouse, refunds to original payment methods (or bank accounts for COD) are completed within 3 to 5 business days.'
      }
    ]
  },
  {
    category: 'Tailoring & Care',
    questions: [
      {
        q: 'How should I care for my 100% long-staple cotton shirt?',
        a: 'We recommend gentle machine wash at 30°C with similar colors. Line dry in shade and iron while slightly damp to maintain weave crispness and vibrant pattern pigments.'
      },
      {
        q: 'Do your checkered patterns match across seams and plackets?',
        a: 'Yes. Every CHEXY HUB garment is pattern-matched by hand across front plackets, chest pockets, and shoulder yokes to ensure seamless symmetry.'
      }
    ]
  }
];

export function FAQ() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const filteredCategories = FAQS.filter(
    (cat) => activeCategory === 'All' || cat.category === activeCategory
  );

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#0E0E0E] text-black dark:text-white transition-colors duration-300 min-h-screen">
      <SEO
        title="Frequently Asked Questions (FAQ) | CHEXY HUB"
        description="Find answers regarding orders, sizing, tailoring craftsmanship, and returns on CHEXY HUB."
      />

      <div className="pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-8 max-w-[1200px] mx-auto w-full">
        {/* Editorial Header */}
        <div className="pb-6 sm:pb-8 border-b border-black/10 dark:border-white/10">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 mb-2">
            <span>CLIENT ADVISORY</span>
            <span>•</span>
            <span>KNOWLEDGE BASE</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-black dark:text-white">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <p className="text-xs sm:text-sm font-light text-stone-600 dark:text-stone-400 max-w-2xl mt-3 leading-relaxed">
            Essential information regarding our yarn-dyed checks, sizing parameters, doorstep delivery,
            and 15-day complimentary exchange service.
          </p>
        </div>

        {/* Minimal Category Tabs */}
        <div className="flex flex-wrap gap-6 border-b border-black/10 dark:border-white/10 py-6 mb-12">
          {['All', 'Orders & Delivery', 'Fabrics & Sizing', 'Returns & Exchanges', 'Tailoring & Care'].map(
            (c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all relative pb-2 ${
                  activeCategory === c
                    ? 'text-black dark:text-white after:content-[""] after:absolute after:bottom-0 after:inset-x-0 after:h-[1px] after:bg-black dark:after:bg-white'
                    : 'text-stone-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {c}
              </button>
            )
          )}
        </div>

        {/* Structured Editorial Accordion */}
        <div className="space-y-12">
          {filteredCategories.map((cat, catIdx) => (
            <div key={catIdx} className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 block pb-2 border-b border-black/10 dark:border-white/10">
                {cat.category}
              </span>

              <div className="divide-y divide-black/10 dark:border-white/10">
                {cat.questions.map((faq, i) => {
                  const globalIdx = `${catIdx}-${i}`;
                  const isOpen = openIndex === globalIdx;

                  return (
                    <div key={i} className="py-5">
                      <button
                        onClick={() => toggleAccordion(globalIdx)}
                        className="w-full text-left flex items-center justify-between text-xs sm:text-sm font-bold uppercase tracking-wider text-black dark:text-white gap-4 group"
                      >
                        <span className="group-hover:opacity-70 transition-opacity">{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-stone-400 flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180 text-black dark:text-white' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="pt-4 text-xs sm:text-sm font-light text-stone-600 dark:text-stone-300 leading-relaxed max-w-3xl animate-fade-in">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Direct Contact Footer */}
        <div className="mt-16 pt-8 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-stone-500 font-light">
          <p>
            Have an unanswered question? Contact our atelier desk at{' '}
            <a href="mailto:concierge@chexyhub.com" className="text-black dark:text-white font-medium hover:underline">
              concierge@chexyhub.com
            </a>
          </p>
          <p className="uppercase tracking-widest text-[10px]">
            STYLE IS A STATEMENT • CHEXY HUB
          </p>
        </div>
      </div>
    </div>
  );
}
