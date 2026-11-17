import React from 'react';
import { RotateCcw, CheckCircle2, ShieldAlert } from 'lucide-react';
import { SEO } from '../../components/common/SEO';

export function ReturnPolicy() {
  return (
    <>
      <SEO
        title="15-Day Return & Exchange Policy | CHEXY HUB"
        description="Read our 15-day complimentary doorstep return and size exchange policy."
      />

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="pb-6 mb-8 border-b border-stone-200 dark:border-stone-800">
          <span className="text-xs uppercase font-bold tracking-widest text-terracotta block mb-1">
            Customer Guarantee
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal dark:text-dark-text">
            15-Day Return & Exchange Policy
          </h1>
          <p className="text-xs text-secondary-gray mt-1">Last revised: November 2026</p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-normal">
          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-charcoal dark:text-dark-text flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-terracotta" />
              <span>1. 15-Day Hassle-Free Returns</span>
            </h2>
            <p>
              We want you to adore every check shirt you wear. If the size, fit, or drape isn't perfect, you may request an exchange or full refund within <strong>15 days</strong> of receiving your package.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-charcoal dark:text-dark-text flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-terracotta" />
              <span>2. Free Doorstep Pickup</span>
            </h2>
            <p>
              Once your exchange or return request is logged from your Account, our logistics partner will collect the shirt from your delivery address free of charge.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-charcoal dark:text-dark-text flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-terracotta" />
              <span>3. Garment Condition Criteria</span>
            </h2>
            <p className="text-secondary-gray">
              Returned shirts must be unwashed, unworn (aside from trying on for fit), and accompanied by the original brand tags and cloth packaging.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
