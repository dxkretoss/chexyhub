import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';

export function About() {
  return (
    <div className="bg-[#FAFAFA] dark:bg-[#0E0E0E] text-black dark:text-white transition-colors duration-300 min-h-screen">
      <SEO
        title="About The Label — Editorial Philosophy | CHEXY HUB"
        description="CHEXY HUB is an independent fashion label dedicated to checkered clothing. Style is a statement."
      />

      <div className="pt-24 sm:pt-28 pb-24 px-4 sm:px-8 max-w-[1400px] mx-auto w-full">
        {/* Editorial Brand Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 block">
            ABOUT THE LABEL
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal leading-tight">
            STYLE IS A <br />
            <span className="italic">STATEMENT.</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-light leading-relaxed pt-2">
            An independent fashion label founded on a singular architectural obsession: transforming the timeless checkered shirt into an enduring symbol of contemporary international style.
          </p>
        </div>

        {/* Large Editorial Photo Spread */}
        <div className="mb-20">
          <div className="relative aspect-[16/9] overflow-hidden bg-black">
            <img
              src="https://images.unsplash.com/photo-1782227286076-4f5153a8cdac?auto=format&fit=crop&w=1800&q=85"
              alt="CHEXY HUB Atelier"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        </div>

        {/* Editorial Manifesto */}
        <div className="max-w-3xl mx-auto space-y-12 text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-light leading-relaxed">
          <div className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-black dark:text-white">
              MORE THAN A PATTERN. A VISUAL LANGUAGE.
            </h2>
            <p>
              Checkered patterns are among civilization’s oldest textile traditions. From the storied clan tartans of the Scottish Highlands to the airy Madras handlooms of the Coromandel coast and the crisp gingham of Provence, checks have carried identities and statements across centuries.
            </p>
            <p>
              In contemporary fashion, checkered shirts were too often relegated to generic, ill-fitting casual wear. <strong>CHEXY HUB</strong> was founded to establish an uncompromising fashion house dedicated exclusively to the geometry, weave, and silhouette of checkered apparel.
            </p>
          </div>

          {/* Pillars in Minimal Fashion Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-black/10 dark:border-white/10">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 block">
                01. TEXTILES
              </span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-black dark:text-white">
                Long-Staple Cotton
              </h3>
              <p className="text-xs text-stone-500 font-light">
                Spun from 100% Egyptian and European cotton fibers with peached finishes and double-ply longevity.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 block">
                02. SILHOUETTE
              </span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-black dark:text-white">
                Modern Tailoring
              </h3>
              <p className="text-xs text-stone-500 font-light">
                Relaxed boyfriend drapes, structured button-downs, and child-safe hypoallergenic organic seams.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 block">
                03. CURATION
              </span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-black dark:text-white">
                Editorial Styling
              </h3>
              <p className="text-xs text-stone-500 font-light">
                High-definition lookbooks and seasonal campaign stories to inspire effortless contemporary checkered styling.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-black/10 dark:border-white/10 flex justify-between items-center">
            <Link to="/shop" className="btn-fashion-primary">
              Explore The Collections
            </Link>
            <Link to="/contact" className="btn-fashion-underline">
              Client Services →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
