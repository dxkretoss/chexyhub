import React from 'react';
import { Truck, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { SEO } from '../../components/common/SEO';

export function ShippingPolicy() {
  return (
    <>
      <SEO
        title="Shipping & Delivery Policy | CHEXY HUB"
        description="Learn about our express courier delivery timelines, free shipping threshold, and packaging across India."
      />

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="pb-6 mb-8 border-b border-stone-200 dark:border-stone-800">
          <span className="text-xs uppercase font-bold tracking-widest text-terracotta block mb-1">
            Logistics & Delivery
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal dark:text-dark-text">
            Shipping Policy
          </h1>
          <p className="text-xs text-secondary-gray mt-1">Last revised: November 2026</p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-normal">
          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-charcoal dark:text-dark-text flex items-center gap-2">
              <Truck className="w-5 h-5 text-terracotta" />
              <span>1. Dispatch & Delivery Timelines</span>
            </h2>
            <p>
              Every checkered shirt ordered at CHEXY HUB is inspected by our quality control atelier and dispatched within 24 hours of confirmation.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-secondary-gray">
              <li><strong>Metro Destinations (Mumbai, Delhi NCR, Bengaluru, Chennai, Kolkata, Hyderabad, Pune):</strong> 2 to 3 business days via BlueDart Air Express.</li>
              <li><strong>Rest of India:</strong> 4 to 5 business days via surface express networks.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-charcoal dark:text-dark-text flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-terracotta" />
              <span>2. Shipping Charges & Free Threshold</span>
            </h2>
            <p>
              We provide <strong>Complimentary Express Shipping</strong> on all prepaid orders exceeding <strong>₹1,999</strong>. For orders below this threshold or standard surface delivery, a nominal flat convenience fee of ₹99 to ₹149 is applied at checkout.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-charcoal dark:text-dark-text flex items-center gap-2">
              <MapPin className="w-5 h-5 text-terracotta" />
              <span>3. Order Tracking</span>
            </h2>
            <p>
              Upon courier hand-off, you will receive an SMS and email notification with your AWB tracking link. You may also track the real-time location and timeline on our dedicated Order Tracking page anytime.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
