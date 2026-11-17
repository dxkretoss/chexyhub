import React from 'react';
import { FileText, Scale, ShieldCheck } from 'lucide-react';
import { SEO } from '../../components/common/SEO';

export function TermsAndConditions() {
  return (
    <>
      <SEO
        title="Terms & Conditions | CHEXY HUB"
        description="Review the terms and conditions governing purchases and usage on CHEXY HUB."
      />

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="pb-6 mb-8 border-b border-stone-200 dark:border-stone-800">
          <span className="text-xs uppercase font-bold tracking-widest text-terracotta block mb-1">
            Legal Terms
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal dark:text-dark-text">
            Terms & Conditions
          </h1>
          <p className="text-xs text-secondary-gray mt-1">Last revised: November 2026</p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-normal">
          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-charcoal dark:text-dark-text flex items-center gap-2">
              <FileText className="w-5 h-5 text-terracotta" />
              <span>1. Agreement Overview</span>
            </h2>
            <p>
              By accessing, browsing, or purchasing from <strong>CHEXY HUB</strong>, you agree to comply with and be bound by these Terms and Conditions along with our Shipping and Return policies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-charcoal dark:text-dark-text flex items-center gap-2">
              <Scale className="w-5 h-5 text-terracotta" />
              <span>2. Product Representation & 3D Visualization</span>
            </h2>
            <p>
              We strive to display our fabric check patterns, weaves, and hues as accurately as modern WebGL rendering allows. Minor color variance may naturally occur depending on your individual monitor calibration and display brightness.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-charcoal dark:text-dark-text flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-terracotta" />
              <span>3. Intellectual Property Rights</span>
            </h2>
            <p>
              All branding marks, "CHECK YOUR STYLE" trademark slogans, imagery, 3D geometric configurations, and digital assets remain the exclusive intellectual property of CHEXY HUB.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
