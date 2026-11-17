import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ShieldCheck, Heart, Sparkles, Users, ArrowRight } from 'lucide-react';
import { SEO } from '../../components/common/SEO';

export function About() {
  return (
    <>
      <SEO
        title="About Us — Brand Story & Craftsmanship | CHEXY HUB"
        description="Learn about CHEXY HUB's mission to craft the finest checkered shirts with timeless patterns and modern expressions."
      />

      <div className="pt-24 pb-20">
        {/* Editorial Brand Hero */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
          <div className="relative rounded-3xl overflow-hidden min-h-[440px] flex items-center p-8 sm:p-14 lg:p-20 bg-charcoal text-white shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1600&q=80"
              alt="CHEXY HUB Heritage"
              className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

            <div className="relative z-10 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-warm-sand block mb-2">
                Our Story & Heritage
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-4">
                CHECK <br />
                <span className="italic font-serif text-terracotta">YOUR STYLE.</span>
              </h1>
              <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                A dedicated fashion brand born out of a singular obsession: elevating the timeless checkered shirt into an enduring symbol of contemporary international style.
              </p>
            </div>
          </div>
        </section>

        {/* Narrative Section */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12 text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed font-normal">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal dark:text-dark-text mb-4">
              More Than a Pattern. A Timeless Language.
            </h2>
            <p>
              Checkered patterns are among civilization’s oldest textile traditions. From the storied clan tartans of the Scottish Highlands to the airy Madras handlooms of the Coromandel coast and the crisp gingham picnics of Provence, checks have carried stories, identities, and celebrations across centuries.
            </p>
            <p className="mt-4">
              Yet in modern retail, checkered shirts were often relegated to generic, ill-fitting casual wear. In 2026, <strong>CHEXY HUB</strong> was founded to change that — creating an uncompromising fashion house dedicated exclusively to the art, weave, and silhouette of checkered apparel.
            </p>
          </div>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-6 rounded-2xl glass dark:glass-dark border border-stone-200/80 dark:border-stone-800 space-y-2">
              <Sparkles className="w-6 h-6 text-terracotta mb-2" />
              <h3 className="font-serif font-bold text-base text-charcoal dark:text-dark-text">
                100% Egyptian Cotton
              </h3>
              <p className="text-xs text-secondary-gray leading-relaxed">
                We use exclusively extra-long staple combed yarns that resist pilling, breathe naturally, and soften with every wash.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass dark:glass-dark border border-stone-200/80 dark:border-stone-800 space-y-2">
              <Award className="w-6 h-6 text-terracotta mb-2" />
              <h3 className="font-serif font-bold text-base text-charcoal dark:text-dark-text">
                Impeccable Placket Alignment
              </h3>
              <p className="text-xs text-secondary-gray leading-relaxed">
                Every chest pocket, yoke seam, and placket is meticulously hand-cut so that horizontal check lines meet seamlessly.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass dark:glass-dark border border-stone-200/80 dark:border-stone-800 space-y-2">
              <Users className="w-6 h-6 text-terracotta mb-2" />
              <h3 className="font-serif font-bold text-base text-charcoal dark:text-dark-text">
                Coordinated Family Moments
              </h3>
              <p className="text-xs text-secondary-gray leading-relaxed">
                We believe in shared memories. Our matching family collections create picture-perfect harmonies for vacations and milestones.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-xl font-bold text-charcoal dark:text-dark-text">
                Ready to find your signature check?
              </h3>
              <p className="text-xs text-secondary-gray mt-1">
                Explore tailored fits for Men, Women, Kids, and Family Collections.
              </p>
            </div>
            <Link
              to="/shop"
              className="px-6 py-3 rounded-2xl bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold flex items-center gap-2 shadow-lg transition-colors flex-shrink-0"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
