import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, ArrowRight, Users, Gift, ShieldCheck } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../../components/product/ProductCard';
import { QuickViewModal } from '../../components/product/QuickViewModal';
import { SEO } from '../../components/common/SEO';

export function FamilyCollection() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const familyProducts = PRODUCTS.filter((p) => p.category === 'family');

  return (
    <>
      <SEO
        title="Matching Family Checkered Collection | CHEXY HUB"
        description="One pattern, endless connections. Harmonious matching checkered shirts for fathers, mothers, and kids."
      />

      <div className="pt-24 pb-20">
        {/* Editorial Campaign Hero */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
          <div className="relative rounded-3xl overflow-hidden min-h-[460px] flex items-center p-8 sm:p-14 lg:p-20 text-white shadow-2xl bg-charcoal">
            {/* Background Image */}
            <img
              src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1600&q=80"
              alt="CHEXY Family Collection"
              className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

            <div className="relative z-10 max-w-xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta text-white text-xs font-bold uppercase tracking-wider mb-4">
                <Users className="w-3.5 h-3.5" />
                <span>The Coordinated Wardrobe</span>
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-4">
                ONE PATTERN. <br />
                <span className="italic font-serif text-terracotta">ENDLESS CONNECTIONS.</span>
              </h1>
              <p className="text-sm sm:text-base text-stone-300 leading-relaxed mb-8">
                Celebrate togetherness with coordinated checkered styles designed for father & son, mother & daughter, or full matching clan sets. Perfectly harmonized yarn dye palettes crafted from 100% organic cotton.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-semibold">
                <div className="glass px-4 py-2 rounded-xl text-white">
                  ✓ Father & Son Duos
                </div>
                <div className="glass px-4 py-2 rounded-xl text-white">
                  ✓ Mother & Daughter Pairs
                </div>
                <div className="glass px-4 py-2 rounded-xl text-white">
                  ✓ 4-Piece Holiday Packs
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Coordinated Products Grid */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-terracotta block mb-2">
              Shared Moments
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal dark:text-dark-text">
              Coordinated Family Collections
            </h2>
            <p className="text-sm text-secondary-gray mt-2">
              Each set includes coordinated shirts crafted to match in pattern and weave, individually tailored for adult and child proportions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {familyProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        </section>

        {/* Family Gifting Banner */}
        <section className="mt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="p-8 sm:p-12 rounded-3xl glass dark:glass-dark border border-stone-200/80 dark:border-stone-800 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-terracotta/10 text-terracotta flex items-center justify-center flex-shrink-0">
                <Gift className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal dark:text-dark-text">
                  Gifting a Coordinated Family Set?
                </h3>
                <p className="text-xs sm:text-sm text-secondary-gray mt-1">
                  We offer complimentary bespoke gift packaging, ribbon ties, and personalized handwritten cards with every family collection order.
                </p>
              </div>
            </div>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl bg-charcoal text-white dark:bg-ivory dark:text-charcoal text-xs font-semibold hover:bg-terracotta dark:hover:bg-terracotta dark:hover:text-white transition-colors flex-shrink-0"
            >
              Request Bespoke Gifting
            </Link>
          </div>
        </section>
      </div>

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </>
  );
}
