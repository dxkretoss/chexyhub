import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronDown,
  Box,
  Sparkles,
  ShieldCheck,
  Star,
  Instagram,
  Heart,
  ShoppingBag,
  Layers,
  Award,
  Users,
} from 'lucide-react';
import { PRODUCTS, CATEGORIES, INSTAGRAM_POSTS, CUSTOMER_REVIEWS } from '../../data/products';
import { ProductCard } from '../../components/product/ProductCard';
import { QuickViewModal } from '../../components/product/QuickViewModal';
import { ShirtCanvas } from '../../components/threeD/ShirtCanvas';
import { SEO } from '../../components/common/SEO';
import { newsletterService } from '../../services/newsletterService';
import { formatPrice } from '../../utils/formatters';
import { toast } from 'sonner';

const HERO_LOOKS = [
  {
    id: 'men',
    label: "Men's Tartan",
    category: "Men's Heritage",
    title: 'Royal Highland Tartan Oxford Shirt',
    tagline: 'Structured button-down tailored from 100% Egyptian cotton.',
    price: 2499,
    originalPrice: 3999,
    discount: 38,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=85',
    slug: 'oxford-royal-tartan-shirt',
    badge: 'Bestseller Tartan',
  },
  {
    id: 'women',
    label: "Women's Check",
    category: "Women's Atelier",
    title: 'Parisian Oversized Boyfriend Check',
    tagline: 'Silky drape twill with relaxed dropped shoulders in warm terracotta.',
    price: 2399,
    originalPrice: 3699,
    discount: 35,
    image: 'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=1000&q=85',
    slug: 'parisian-oversized-terracotta-check',
    badge: 'Editorial Choice',
  },
  {
    id: 'family',
    label: 'Family Coordinated',
    category: 'Family Matching',
    title: 'Highland Clan Coordinated Set',
    tagline: 'Harmonized matching patterns for mother, father, and kids.',
    price: 5999,
    originalPrice: 8999,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1000&q=85',
    slug: 'highland-clan-matching-family-set',
    badge: 'Coordinated Clan Set',
  },
];

export function Home() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  
  // Interactive 3D preview model state on homepage
  const [home3DConfig, setHome3DConfig] = useState({
    pattern: 'tartan',
    primaryColor: '#B74737',
    secondaryColor: '#1C2841',
    accentColor: '#EDE7DC',
    gridScale: 12,
    collarType: 'button-down',
  });

  const activeLook = HERO_LOOKS[activeHeroIndex];
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival).slice(0, 6);
  const familySets = PRODUCTS.filter((p) => p.category === 'family').slice(0, 3);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const result = newsletterService.subscribe(newsletterEmail);
    if (result.success) {
      toast.success(result.message);
      setNewsletterEmail('');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <SEO
        title="CHEXY HUB — Check Your Style | Dedicated Checkered Fashion Brand"
        description="Discover premium checkered fashion for Men, Women, Kids and Matching Family Collections. Check your style with CHEXY HUB."
      />

      <div className="flex flex-col w-full overflow-hidden">
        {/* ================= SECTION 2: FULL-SCREEN FASHION HERO ================= */}
        <section className="relative min-h-[90vh] flex flex-col justify-center pt-32 sm:pt-36 lg:pt-40 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-ivory to-soft-beige/40 dark:from-[#111111] dark:via-[#141414] dark:to-dark-bg transition-colors duration-300">
          {/* Subtle checkered grid texture overlay */}
          <div className="absolute inset-0 pattern-check-subtle pointer-events-none opacity-50" />

          {/* Luxury ambient lighting radial gradients */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-terracotta/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-warm-sand/20 dark:bg-stone-800/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Editorial Headline & Actions */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Seasonal Pill with safe clearance */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass dark:glass-dark mb-6 shadow-sm border border-terracotta/30 animate-fade-in">
                <span className="w-2.5 h-2.5 rounded-full bg-terracotta animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-terracotta">
                  Autumn / Winter 2026 Collection
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-black text-charcoal dark:text-dark-text tracking-tight leading-[1.06] mb-6">
                CHECK <br />
                <span className="text-terracotta italic font-serif relative inline-block">
                  YOUR STYLE.
                  <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-terracotta via-warm-sand to-transparent rounded-full opacity-80" />
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg md:text-xl text-stone-600 dark:text-stone-300 max-w-xl font-normal leading-relaxed mb-8">
                Timeless patterns. Modern expressions. Discover checkered fashion meticulously designed for Men, Women, Kids, and matching family moments.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-terracotta hover:bg-terracotta-hover text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>

                <Link
                  to="/3d-studio"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl glass dark:glass-dark hover:bg-white dark:hover:bg-dark-card text-charcoal dark:text-dark-text font-semibold text-sm sm:text-base flex items-center justify-center gap-2 border border-stone-300/80 dark:border-stone-700 shadow-glass transition-all duration-300"
                >
                  <Box className="w-4 h-4 text-terracotta" />
                  <span>Discover 3D Studio</span>
                </Link>
              </div>

              {/* Brand highlights row */}
              <div className="mt-12 pt-8 border-t border-stone-200/80 dark:border-stone-800 flex items-center gap-8 text-xs font-semibold text-stone-500 dark:text-stone-400">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-charcoal dark:text-dark-text text-base">100%</span>
                  <span>Long-Staple Cotton</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-charcoal dark:text-dark-text text-base">4.9★</span>
                  <span>Customer Rating</span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="font-bold text-charcoal dark:text-dark-text text-base">₹1,999+</span>
                  <span>Free Express Shipping</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Card with Look Switcher */}
            <div className="lg:col-span-5 flex flex-col items-center">
              {/* Lookbook Switcher Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-2xl glass dark:glass-dark border border-stone-200/80 dark:border-stone-800 mb-4 shadow-sm">
                {HERO_LOOKS.map((look, idx) => (
                  <button
                    key={look.id}
                    onClick={() => setActiveHeroIndex(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      activeHeroIndex === idx
                        ? 'bg-terracotta text-white shadow-sm'
                        : 'text-stone-600 dark:text-stone-300 hover:text-charcoal'
                    }`}
                  >
                    {look.label}
                  </button>
                ))}
              </div>

              {/* Main Visual Card */}
              <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-stone-800 bg-stone-100 dark:bg-stone-900 group">
                <img
                  src={activeLook.image}
                  alt={activeLook.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full bg-charcoal/90 text-white backdrop-blur-md shadow-md">
                    {activeLook.badge}
                  </span>
                </div>

                {/* 3D studio indicator button */}
                <Link
                  to={`/3d-studio?product=${activeLook.slug}`}
                  className="absolute top-4 right-4 z-10 glass dark:glass-dark p-2.5 rounded-full text-charcoal dark:text-dark-text hover:text-terracotta shadow-md transition-colors"
                  title="View in 3D Studio"
                >
                  <Box className="w-4 h-4 text-terracotta" />
                </Link>

                {/* Floating Glass Promo Overlay */}
                <div className="absolute bottom-4 inset-x-4 glass dark:glass-dark p-4 rounded-2xl border border-white/40 dark:border-stone-700 shadow-xl backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 pr-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-terracotta block">
                        {activeLook.category}
                      </span>
                      <h4 className="font-serif text-sm font-bold text-charcoal dark:text-dark-text truncate">
                        {activeLook.title}
                      </h4>
                      <p className="text-xs font-bold text-charcoal dark:text-dark-text mt-0.5">
                        {formatPrice(activeLook.price)}
                        <span className="text-[10px] font-normal text-stone-400 line-through ml-1.5">
                          {formatPrice(activeLook.originalPrice)}
                        </span>
                      </p>
                    </div>

                    <Link
                      to={`/product/${activeLook.slug}`}
                      className="p-3 rounded-xl bg-terracotta text-white hover:bg-terracotta-hover transition-colors shadow-md flex-shrink-0"
                      title="View Shirt Details"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center text-xs text-secondary-gray opacity-80 hover:opacity-100 transition-opacity">
            <span className="uppercase tracking-widest text-[10px] font-bold mb-1">Scroll to Explore</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-terracotta" />
          </div>
        </section>

        {/* ================= SECTION 3: SHOP BY CATEGORY ================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-terracotta block mb-2">
              Curated Collections
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal dark:text-dark-text">
              Shop by Category
            </h2>
            <p className="text-sm sm:text-base text-secondary-gray mt-3">
              Explore timeless checks designed for every member of the family.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CATEGORIES.filter((c) => c.id !== 'family').map((cat) => (
              <Link
                key={cat.id}
                to={`/${cat.id}`}
                className="group relative rounded-3xl overflow-hidden aspect-[3/4] bg-stone-100 dark:bg-stone-900 shadow-xl border border-stone-200/50 dark:border-stone-800 transition-all duration-500 hover:shadow-card-hover"
              >
                {/* Background Photography */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Gradient Shading */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Floating Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                  <span className="text-xs uppercase font-bold tracking-widest text-warm-sand mb-1">
                    Explore
                  </span>
                  <h3 className="font-serif text-3xl font-bold mb-2">
                    {cat.name.toUpperCase()}
                  </h3>
                  <p className="text-xs text-stone-200 line-clamp-2 mb-4 leading-relaxed font-light">
                    {cat.tagline}
                  </p>
                  <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-white group-hover:text-terracotta-light transition-colors">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ================= SECTION 4: BEST SELLERS ================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-stone-200/70 dark:border-stone-800/70">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-terracotta block mb-2">
                Iconic Checks
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal dark:text-dark-text">
                Best Sellers
              </h2>
              <p className="text-sm text-secondary-gray mt-2">
                The most coveted checkered silhouettes, woven with unparalleled finesse.
              </p>
            </div>
            <Link
              to="/shop"
              className="mt-4 md:mt-0 text-sm font-semibold text-terracotta hover:underline inline-flex items-center gap-1.5"
            >
              <span>View All 24+ Shirts</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        </section>

        {/* ================= SECTION 5: 3D EXPERIENCE PREVIEW ================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-100/70 dark:bg-[#151515] transition-colors border-y border-stone-200/80 dark:border-stone-800/80">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Interactive 3D Canvas */}
            <div className="lg:col-span-7">
              <ShirtCanvas
                modelConfig={home3DConfig}
                className="h-[460px] sm:h-[520px]"
                autoRotateDefault={true}
                sketchfabModelId="fab8adc04eb540919a7b25184f4b6162"
                defaultViewMode="photorealistic"
              />
            </div>

            {/* Right: Narrative & Customization Switches */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-bold uppercase tracking-wider mb-4">
                <Box className="w-3.5 h-3.5" />
                <span>Next-Gen Visualization</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal dark:text-dark-text leading-tight mb-4">
                SEE EVERY DETAIL. <br />
                <span className="text-terracotta">OWN EVERY STYLE.</span>
              </h2>

              <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed mb-6">
                Explore your favorite check shirts in an immersive 3D experience. Rotate 360°, inspect yarn weaves, zoom into mother-of-pearl buttons, and discover every detail before you buy.
              </p>

              {/* Pattern Switchers */}
              <div className="w-full space-y-4 mb-8 p-5 rounded-2xl glass dark:glass-dark border border-stone-200/80 dark:border-stone-800">
                <div>
                  <label className="text-xs font-bold text-charcoal dark:text-dark-text uppercase tracking-wider block mb-2">
                    Live Pattern Switcher
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { type: 'tartan', label: 'Tartan', p: '#B74737', s: '#1C2841' },
                      { type: 'buffalo', label: 'Buffalo', p: '#171717', s: '#F7F5F0' },
                      { type: 'gingham', label: 'Gingham', p: '#1B263B', s: '#FFFFFF' },
                    ].map((pat) => (
                      <button
                        key={pat.type}
                        onClick={() =>
                          setHome3DConfig((prev) => ({
                            ...prev,
                            pattern: pat.type,
                            primaryColor: pat.p,
                            secondaryColor: pat.s,
                          }))
                        }
                        className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                          home3DConfig.pattern === pat.type
                            ? 'border-terracotta bg-terracotta text-white shadow-sm'
                            : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-stone-400'
                        }`}
                      >
                        {pat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color tone swatches */}
                <div>
                  <label className="text-xs font-bold text-charcoal dark:text-dark-text uppercase tracking-wider block mb-2">
                    Palette Accent
                  </label>
                  <div className="flex gap-2">
                    {[
                      { name: 'Terracotta & Navy', p: '#B74737', s: '#1C2841' },
                      { name: 'Forest Green', p: '#1E3F20', s: '#C9BBA6' },
                      { name: 'Smoky Charcoal', p: '#222222', s: '#EDE7DC' },
                      { name: 'Powder Blue', p: '#8EADC2', s: '#FFFFFF' },
                    ].map((pal, i) => (
                      <button
                        key={i}
                        onClick={() =>
                          setHome3DConfig((prev) => ({
                            ...prev,
                            primaryColor: pal.p,
                            secondaryColor: pal.s,
                          }))
                        }
                        className="w-7 h-7 rounded-full border-2 border-white dark:border-stone-800 shadow-sm transition-transform hover:scale-110"
                        style={{ backgroundColor: pal.p }}
                        title={pal.name}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Link to full 3D studio */}
              <Link
                to="/3d-studio"
                className="px-7 py-3.5 rounded-2xl bg-charcoal dark:bg-ivory text-white dark:text-charcoal hover:bg-terracotta dark:hover:bg-terracotta dark:hover:text-white font-semibold text-sm flex items-center gap-2 shadow-lg transition-colors"
              >
                <span>Enter Dedicated 3D Studio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ================= SECTION 6: NEW ARRIVALS ================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-terracotta block mb-2">
                Fresh Off The Loom
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal dark:text-dark-text">
                New Arrivals
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-secondary-gray mt-2 sm:mt-0">
              Scroll horizontally to preview the latest releases
            </p>
          </div>

          {/* Horizontally scrollable collection */}
          <div className="flex gap-6 overflow-x-auto pb-6 pt-2 no-scrollbar">
            {newArrivals.map((product) => (
              <div key={product.id} className="w-[280px] sm:w-[310px] flex-shrink-0">
                <ProductCard
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ================= SECTION 7: FAMILY COLLECTION ================= */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-soft-beige dark:bg-[#1a1816]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <span className="text-xs font-bold uppercase tracking-widest text-terracotta mb-2">
                The Coordinated Wardrobe
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-black text-charcoal dark:text-dark-text leading-tight mb-6">
                ONE PATTERN. <br />
                <span className="italic font-serif text-terracotta">ENDLESS CONNECTIONS.</span>
              </h2>
              <p className="text-base text-stone-700 dark:text-stone-300 leading-relaxed mb-8 max-w-lg">
                Celebrate togetherness with coordinated checkered styles for every member of your family. From matching father-son buffalo checks to mother-daughter pastel ginghams, create memories woven in timeless fashion.
              </p>

              {/* Features list */}
              <div className="space-y-3 mb-8 text-sm font-medium text-stone-700 dark:text-stone-300">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-terracotta/20 text-terracotta flex items-center justify-center text-xs">✓</span>
                  <span>Harmonized yarn palettes with age-specific tailoring</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-terracotta/20 text-terracotta flex items-center justify-center text-xs">✓</span>
                  <span>100% hypoallergenic organic cotton for sensitive skin</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-terracotta/20 text-terracotta flex items-center justify-center text-xs">✓</span>
                  <span>Custom bundle sizing with 20% family savings</span>
                </div>
              </div>

              <Link
                to="/family-collection"
                className="px-8 py-4 rounded-2xl bg-terracotta hover:bg-terracotta-hover text-white font-semibold text-sm flex items-center gap-2 shadow-xl transition-all"
              >
                <span>Explore Family Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right: Family Set Cards */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {familySets.slice(0, 2).map((set) => (
                <div
                  key={set.id}
                  className="rounded-3xl overflow-hidden glass dark:glass-dark border border-white/60 dark:border-stone-800 p-3 shadow-lg"
                >
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-stone-200">
                    <img
                      src={set.images[0]}
                      alt={set.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta">
                      {set.collection}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-charcoal dark:text-dark-text line-clamp-1 mt-0.5">
                      {set.name}
                    </h4>
                    <Link
                      to={`/product/${set.slug}`}
                      className="mt-2 text-xs font-semibold text-terracotta hover:underline block"
                    >
                      View Coordinated Set →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SECTION 8: BRAND STORY ================= */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta block mb-3">
            Our Heritage & Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal dark:text-dark-text mb-6">
            MORE THAN A PATTERN. <br />
            <span className="italic font-serif text-terracotta">IT'S A STATEMENT.</span>
          </h2>
          <p className="text-base sm:text-lg text-secondary-gray leading-relaxed max-w-3xl mx-auto mb-12 font-normal">
            At CHEXY HUB, we believe that the checkered pattern is the ultimate bridge between timeless heritage and modern fashion. Whether it’s an ancient Scottish clan tartan, a sun-drenched coastal Madras, or a sleek urban windowpane, each shirt is woven with purpose, crafted with long-staple cotton, and tailored for generations of effortless confidence.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 rounded-2xl glass dark:glass-dark border border-stone-200/60 dark:border-stone-800">
              <Award className="w-8 h-8 text-terracotta mb-4" />
              <h3 className="font-serif font-bold text-lg mb-2">Timeless Design</h3>
              <p className="text-xs text-secondary-gray leading-relaxed">
                Patterns that transcend passing fads. Crafted with genuine yarn-dyed checks that never fade.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass dark:glass-dark border border-stone-200/60 dark:border-stone-800">
              <Layers className="w-8 h-8 text-terracotta mb-4" />
              <h3 className="font-serif font-bold text-lg mb-2">Unmatched Tactile Comfort</h3>
              <p className="text-xs text-secondary-gray leading-relaxed">
                Superfine long-staple cotton yarns peached to cloud-soft perfection for 24-hour breathability.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass dark:glass-dark border border-stone-200/60 dark:border-stone-800">
              <Users className="w-8 h-8 text-terracotta mb-4" />
              <h3 className="font-serif font-bold text-lg mb-2">Every Generation</h3>
              <p className="text-xs text-secondary-gray leading-relaxed">
                Dedicated tailoring profiles for Men, Women, and Kids so the entire family shares in the style.
              </p>
            </div>
          </div>
        </section>

        {/* ================= SECTION 9: INSTAGRAM SHOPPING GALLERY ================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-stone-200/70 dark:border-stone-800/70">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-terracotta mb-2">
              <Instagram className="w-4 h-4" />
              <span>@CHEXYHUB</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal dark:text-dark-text">
              Check Your Style on Instagram
            </h2>
            <p className="text-xs sm:text-sm text-secondary-gray mt-2">
              Tag #CheckYourStyle and #CHEXYHUB to be featured in our global editorial gallery.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {INSTAGRAM_POSTS.map((post) => (
              <a
                key={post.id}
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="group relative rounded-2xl overflow-hidden aspect-square bg-stone-100 dark:bg-stone-800 block shadow-md"
              >
                <img
                  src={post.image}
                  alt="Instagram Community Style"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 text-white text-xs">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-bold">{post.tag}</span>
                    <Heart className="w-3.5 h-3.5 fill-white" />
                  </div>
                  <p className="line-clamp-2 text-[10px] leading-snug">{post.caption}</p>
                  <span className="text-[10px] font-bold text-warm-sand">
                    {post.likes} likes
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ================= SECTION 10: CUSTOMER REVIEWS ================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-100/60 dark:bg-[#141414] border-t border-stone-200/80 dark:border-stone-800/80 transition-colors">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-terracotta block mb-2">
                Real Customer Love
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal dark:text-dark-text">
                Worn & Loved Across India
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {CUSTOMER_REVIEWS.map((rev) => (
                <div
                  key={rev.id}
                  className="p-6 rounded-3xl glass dark:glass-dark border border-stone-200/60 dark:border-stone-800 flex flex-col justify-between shadow-sm"
                >
                  <div>
                    {/* Stars */}
                    <div className="flex items-center gap-1 text-amber-500 mb-4">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500" />
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed italic mb-4">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-200/60 dark:border-stone-800 flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-charcoal dark:text-dark-text">
                        {rev.name}
                      </h4>
                      <p className="text-[10px] text-secondary-gray">{rev.location}</p>
                      <p className="text-[10px] text-terracotta font-medium truncate max-w-[150px]">
                        Purchased: {rev.productName}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SECTION 11: NEWSLETTER ================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full text-center">
          <div className="p-8 sm:p-14 rounded-3xl bg-charcoal text-white dark:bg-stone-900 border border-stone-800 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-warm-sand block mb-3">
                Join The Inner Circle
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                STAY IN STYLE.
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-8">
                Be the first to discover new arrivals, exclusive collections, and special offers. Get 10% off your first checkered shirt.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="flex-1 px-5 py-3.5 rounded-xl bg-stone-800 text-white placeholder:text-stone-400 border border-stone-700 focus:outline-none focus:ring-2 focus:ring-terracotta text-sm"
                />
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white font-semibold text-sm transition-colors shadow-lg"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </>
  );
}
