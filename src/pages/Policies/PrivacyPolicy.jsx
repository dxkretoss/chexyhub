import React from 'react';
import { Lock, ShieldCheck, EyeOff } from 'lucide-react';
import { SEO } from '../../components/common/SEO';

export function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy | CHEXY HUB"
        description="Learn how CHEXY HUB safeguards customer personal information, shipping data, and payment security."
      />

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="pb-6 mb-8 border-b border-stone-200 dark:border-stone-800">
          <span className="text-xs uppercase font-bold tracking-widest text-terracotta block mb-1">
            Data Protection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal dark:text-dark-text">
            Privacy Policy
          </h1>
          <p className="text-xs text-secondary-gray mt-1">Last revised: November 2026</p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-normal">
          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-charcoal dark:text-dark-text flex items-center gap-2">
              <Lock className="w-5 h-5 text-terracotta" />
              <span>1. Information We Collect</span>
            </h2>
            <p>
              When you browse our catalogue, register an account, or order checkered apparel, we collect necessary contact and delivery details such as name, email address, phone number, and physical postal address.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-charcoal dark:text-dark-text flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-terracotta" />
              <span>2. Payment Security Protocol</span>
            </h2>
            <p>
              CHEXY HUB does not store, process, or view credit/debit card numbers or bank credentials. All financial transactions are secured directly by certified PCI-DSS compliant gateways (Razorpay) using 256-bit encrypted channels.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-charcoal dark:text-dark-text flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-terracotta" />
              <span>3. Zero Data Sale Guarantee</span>
            </h2>
            <p>
              We value your privacy like our own. We never sell, rent, or trade your personal data to third-party data brokers or advertisers.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
