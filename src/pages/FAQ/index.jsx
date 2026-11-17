import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';
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
    category: 'Interactive 3D Studio',
    questions: [
      {
        q: 'How does the 3D Studio work?',
        a: 'Our 3D Studio utilizes modern WebGL and Three.js technologies to dynamically render 3D shirt models with mathematically accurate fabric weaves, plackets, collar types, and pattern scales in real-time.'
      },
      {
        q: 'Can I purchase a shirt customized in the 3D studio?',
        a: 'Yes! You can click "Add Styled Shirt to Bag" directly from the 3D studio, and our master cutters will tailor the exact pattern scale and collar configuration chosen.'
      }
    ]
  }
];

export function FAQ() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState('');

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const filteredCategories = FAQS.filter(
    (cat) => activeCategory === 'All' || cat.category === activeCategory
  );

  return (
    <>
      <SEO
        title="Frequently Asked Questions (FAQ) | CHEXY HUB"
        description="Find answers regarding orders, sizing, 3D visualization, and returns on CHEXY HUB."
      />

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-terracotta block mb-1">
            Help Center
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal dark:text-dark-text">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-secondary-gray mt-2">
            Everything you need to know about our checkered fabrics, fit guide, and ordering process.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {['All', 'Orders & Delivery', 'Fabrics & Sizing', 'Returns & Exchanges', 'Interactive 3D Studio'].map(
            (c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === c
                    ? 'bg-terracotta text-white shadow-sm'
                    : 'glass dark:glass-dark text-stone-700 dark:text-stone-300 hover:text-charcoal'
                }`}
              >
                {c}
              </button>
            )
          )}
        </div>

        {/* Accordions */}
        <div className="space-y-8">
          {filteredCategories.map((cat, catIdx) => (
            <div key={catIdx} className="space-y-3">
              <h2 className="font-serif text-lg font-bold text-charcoal dark:text-dark-text flex items-center gap-2 pb-2 border-b border-stone-200 dark:border-stone-800">
                <HelpCircle className="w-4 h-4 text-terracotta" />
                <span>{cat.category}</span>
              </h2>

              <div className="space-y-3">
                {cat.questions.map((faq, i) => {
                  const globalIdx = `${catIdx}-${i}`;
                  const isOpen = openIndex === globalIdx;

                  return (
                    <div
                      key={i}
                      className="rounded-2xl glass dark:glass-dark border border-stone-200/80 dark:border-stone-800 overflow-hidden shadow-sm"
                    >
                      <button
                        onClick={() => toggleAccordion(globalIdx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-charcoal dark:text-dark-text gap-4"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-secondary-gray flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180 text-terracotta' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-5 sm:px-5 text-xs text-secondary-gray leading-relaxed border-t border-stone-100 dark:border-stone-800/80 pt-3">
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
      </div>
    </>
  );
}
