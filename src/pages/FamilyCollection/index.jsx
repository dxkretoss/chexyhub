import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProductsStore } from '../../store/useProductsStore';
import { ProductCard } from '../../components/product/ProductCard';
import { QuickViewModal } from '../../components/product/QuickViewModal';
import { SEO } from '../../components/common/SEO';

export function FamilyCollection() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const { products: liveProducts } = useProductsStore();
  const familyProducts = liveProducts.filter((p) => p.category === 'family');

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#0E0E0E] text-black dark:text-white transition-colors duration-300 min-h-screen">
      <SEO
        title="Matching Family Checkered Collection | CHEXY HUB"
        description="One pattern, endless connections. Harmonious matching checkered shirts for fathers, mothers, and kids."
      />

      <div className="pt-24 sm:pt-28 pb-24">
        {/* Editorial Campaign Hero */}
        <section className="relative px-4 sm:px-8 max-w-[1600px] mx-auto mb-20 select-none">
          <div className="relative min-h-[520px] sm:min-h-[600px] flex items-end p-8 sm:p-16 text-white overflow-hidden bg-black">
            {/* Background Image */}
            <img
              src="https://images.unsplash.com/photo-1602848137189-ad9301200244?auto=format&fit=crop&w=1800&q=85"
              alt="CHEXY Family Collection"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="relative z-10 max-w-2xl space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-300 block">
                SPECIAL EDITORIAL LINE
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal leading-tight">
                ONE PATTERN. <br />
                <span className="italic">ENDLESS CONNECTIONS.</span>
              </h1>
              <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed max-w-lg">
                Celebrate shared moments with coordinated check shirts for every member of the family. Tailored from matching European yarn-dyed cotton.
              </p>
              <div className="pt-2 flex flex-wrap gap-6 text-[11px] font-bold uppercase tracking-[0.2em] text-stone-300">
                <span>• Father & Son Sets</span>
                <span>• Mother & Daughter Duos</span>
                <span>• Clan Matching Pieces</span>
              </div>
            </div>
          </div>
        </section>

        {/* Collection Grid */}
        <section className="px-4 sm:px-8 max-w-[1600px] mx-auto">
          <div className="pb-6 mb-10 border-b border-black/10 dark:border-white/10 flex items-end justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 block mb-1">
                Curated Sets
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal">
                THE MATCHING COLLECTION
              </h2>
            </div>
            <span className="text-xs uppercase tracking-widest text-stone-400">
              {familyProducts.length} SETS AVAILABLE
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 sm:gap-x-6 sm:gap-y-16">
            {familyProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        </section>
      </div>

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}
