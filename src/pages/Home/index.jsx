import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { INSTAGRAM_POSTS } from '../../data/products';
import { useProductsStore } from '../../store/useProductsStore';
import { ProductCard } from '../../components/product/ProductCard';
import { QuickViewModal } from '../../components/product/QuickViewModal';
import { SEO } from '../../components/common/SEO';

const HERO_SLIDES = [
  {
    id: 'woman',
    category: 'Woman',
    tag: 'COLLECTION 01 / WOMAN',
    headlineMain: 'THE OVERSIZED',
    headlineItalic: 'SILHOUETTE.',
    description: 'Effortless boyfriend cuts, fluid drapery, and contemporary windowpane checks engineered in pure Egyptian cotton.',
    primaryCtaText: 'Shop Woman',
    primaryCtaLink: '/women',
    secondaryCtaText: 'New Arrivals',
    secondaryCtaLink: '/shop?filter=new',
    image: 'https://images.unsplash.com/photo-1610886886310-be2828d6afd5?auto=format&fit=crop&w=2000&q=85',
    alt: 'CHEXY HUB Woman Checkered Collection',
    index: '01 // 04'
  },
  {
    id: 'man',
    category: 'Man',
    tag: 'COLLECTION 02 / MAN',
    headlineMain: 'HERITAGE TARTAN',
    headlineItalic: 'TAILORING.',
    description: 'Structured button-downs, Scottish Royal clan weaves, and heavyweight brushed flannels built for timeless modern poise.',
    primaryCtaText: 'Shop Man',
    primaryCtaLink: '/men',
    secondaryCtaText: 'New Arrivals',
    secondaryCtaLink: '/shop?filter=new',
    image: 'https://images.unsplash.com/photo-1623162905251-e98a25a45a67?auto=format&fit=crop&w=2000&q=85',
    alt: 'CHEXY HUB Man Checkered Collection',
    index: '02 // 04'
  },
  {
    id: 'kids',
    category: 'Kids',
    tag: 'COLLECTION 03 / KIDS',
    headlineMain: 'JUNIOR PLAYGROUND',
    headlineItalic: 'ADVENTURES.',
    description: 'Ultra-soft, hypoallergenic combed cotton check shirts crafted with reinforced seams and playful everyday comfort.',
    primaryCtaText: 'Shop Kids',
    primaryCtaLink: '/kids',
    secondaryCtaText: 'New Arrivals',
    secondaryCtaLink: '/shop?filter=new',
    image: 'https://images.unsplash.com/photo-1627278107893-b89d828d4ff3?auto=format&fit=crop&w=2000&q=85',
    alt: 'CHEXY HUB Kids Checkered Collection',
    index: '03 // 04'
  },
  {
    id: 'family',
    category: 'Family',
    tag: 'COLLECTION 04 / MATCHING FAMILY',
    headlineMain: 'UNIFIED MOMENTS',
    headlineItalic: 'COORDINATED.',
    description: 'Coordinated mother-daughter, father-son, and complete 4-piece matching checkered sets woven from complementary yarns.',
    primaryCtaText: 'Shop Family',
    primaryCtaLink: '/family-collection',
    secondaryCtaText: 'New Arrivals',
    secondaryCtaLink: '/shop?filter=new',
    image: 'https://images.unsplash.com/photo-1602848137189-ad9301200244?auto=format&fit=crop&w=2000&q=85',
    alt: 'CHEXY HUB Matching Family Checkered Sets',
    index: '04 // 04'
  }
];

export function Home() {
  const [selectedCategoryTab, setSelectedCategoryTab] = useState('all');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Hero carousel state
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const currentSlide = HERO_SLIDES[currentSlideIndex];

  // 5-Second Auto-rotation
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, currentSlideIndex]);

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const { products: liveProducts } = useProductsStore();

  // Filter products for featured grid
  const filteredProducts = liveProducts.filter((p) => {
    if (selectedCategoryTab === 'all') return p.isFeatured || p.isBestSeller;
    return p.category === selectedCategoryTab;
  }).slice(0, 8);

  const newCollectionProducts = liveProducts.filter((p) => p.isNewArrival).slice(0, 4);

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#0E0E0E] text-black dark:text-white transition-colors duration-300">
      <SEO
        title="CHEXY HUB — Style Is A Statement | Premium Checkered Fashion"
        description="Dedicated checkered-shirt fashion label. Discover curated collections for Woman, Man, Kids, and Matching Family Collections."
      />

      {/* ============================================================== */}
      {/* SECTION 1: FULL-SCREEN FASHION CAMPAIGN HERO CAROUSEL (5 SEC)   */}
      {/* ============================================================== */}
      <section
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative h-screen min-h-[600px] w-full overflow-hidden flex items-end pb-20 sm:pb-24 px-4 sm:px-12 select-none"
      >
        {/* Full-bleed Campaign Background Images with 1s Crossfade */}
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlideIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className={`w-full h-full object-cover object-center transition-transform duration-[7000ms] ease-out ${
                idx === currentSlideIndex ? 'scale-105' : 'scale-100'
              }`}
            />
            {/* Subtle editorial vignette & gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/25" />
          </div>
        ))}

        {/* Hero Content Overlay (Dynamic Text per Gender & Collection) */}
        <div className="relative z-10 max-w-[1500px] w-full mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 text-white">
          <div key={currentSlide.id} className="max-w-2xl space-y-3 animate-fade-in">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] text-stone-300 block">
              {currentSlide.tag}
            </span>
            <h1 className="font-serif text-3xl sm:text-6xl md:text-7xl font-normal leading-none tracking-tight">
              {currentSlide.headlineMain} <br />
              <span className="italic font-normal">{currentSlide.headlineItalic}</span>
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 max-w-lg font-light tracking-wide leading-relaxed pt-1 sm:pt-2">
              {currentSlide.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-3 sm:pt-4 w-full sm:w-auto">
              <Link
                to={currentSlide.primaryCtaLink}
                className="py-3.5 px-8 bg-white text-black text-center text-[11px] font-bold uppercase tracking-[0.22em] transition-opacity hover:opacity-90 shadow-sm"
              >
                {currentSlide.primaryCtaText}
              </Link>
              <Link
                to={currentSlide.secondaryCtaLink}
                className="py-3.5 px-8 bg-transparent border border-white text-white text-center text-[11px] font-bold uppercase tracking-[0.22em] transition-all hover:bg-white hover:text-black"
              >
                {currentSlide.secondaryCtaText}
              </Link>
            </div>
          </div>

          {/* Right Controls: Slide Index & Interactive Dot Animation */}
          <div className="flex flex-col items-start md:items-end text-right text-stone-300 space-y-4">
            <div className="hidden md:flex flex-col items-end space-y-1">
              <span className="text-[10px] uppercase tracking-[0.25em]">CHEXY HUB ATELIER</span>
              <span className="text-xs font-mono tracking-widest text-white">
                {currentSlide.index}
              </span>
            </div>

            {/* Dot Animation with 5-Second Live Progress Indicator */}
            <div className="flex items-center gap-3 bg-black/30 backdrop-blur-md px-4 py-2 border border-white/10 rounded-full">
              {/* Prev Arrow */}
              <button
                type="button"
                onClick={handlePrevSlide}
                className="p-1 text-white/70 hover:text-white transition-colors cursor-pointer"
                title="Previous Collection"
                aria-label="Previous Collection"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              {/* 4 Interactive Dots */}
              <div className="flex items-center gap-2">
                {HERO_SLIDES.map((slide, idx) => {
                  const isActive = idx === currentSlideIndex;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setCurrentSlideIndex(idx)}
                      className="group flex items-center gap-1.5 cursor-pointer py-1 focus:outline-none"
                      title={`${slide.category} Collection`}
                      aria-label={`Go to slide ${idx + 1}: ${slide.category}`}
                    >
                      <div
                        className={`h-2 rounded-full transition-all duration-500 relative overflow-hidden ${
                          isActive
                            ? 'w-9 sm:w-11 bg-white/25'
                            : 'w-2 bg-white/40 group-hover:bg-white/70 group-hover:w-3'
                        }`}
                      >
                        {isActive && (
                          <div
                            key={currentSlideIndex}
                            className="absolute inset-y-0 left-0 bg-white rounded-full"
                            style={{
                              animation: !isPaused ? 'heroProgress 5s linear forwards' : 'none',
                              width: isPaused ? '100%' : undefined
                            }}
                          />
                        )}
                      </div>
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider transition-all duration-300 ${
                          isActive
                            ? 'text-white font-mono opacity-100'
                            : 'hidden group-hover:inline text-stone-400 opacity-80'
                        }`}
                      >
                        {slide.category}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Next Arrow */}
              <button
                type="button"
                onClick={handleNextSlide}
                className="p-1 text-white/70 hover:text-white transition-colors cursor-pointer"
                title="Next Collection"
                aria-label="Next Collection"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Subtle scroll down indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 animate-bounce pointer-events-none">
          <ChevronDown className="w-5 h-5" />
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 2: NEW COLLECTION EDITORIAL                            */}
      {/* ============================================================== */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-8 max-w-[1380px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Balanced Editorial Campaign Image (6 cols) */}
          <div className="lg:col-span-6">
            <div className="relative h-[360px] sm:h-[440px] lg:h-[500px] w-full overflow-hidden bg-stone-100 dark:bg-stone-900 group">
              <img
                src="https://images.unsplash.com/photo-1612190377025-76afa396bc20?auto=format&fit=crop&w=1200&q=85"
                alt="New Collection Editorial"
                className="w-full h-full object-cover object-[center_22%] transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute top-5 left-5 bg-white/90 dark:bg-black/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]">
                Autumn Lookbook
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Focus & Storytelling (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-5 lg:pl-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 block">
              Editorial Focus
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight">
              THE MODERN <br />
              <span className="italic">SILHOUETTE.</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-light leading-relaxed">
              Check shirts liberated from standard utility. Designed with dropped shoulders, elongated plackets, and peached yarn-dyed cotton, this season’s editorial captures bold geometric check structures tailored for everyday confidence.
            </p>

            {/* Asymmetric secondary detail thumbnail */}
            <div className="pt-2 flex items-center gap-5 sm:gap-6">
              <div className="w-20 h-28 sm:w-24 sm:h-32 overflow-hidden bg-stone-100 dark:bg-stone-800 flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1782226728289-f81457b760f5?auto=format&fit=crop&w=400&q=80"
                  alt="Tartan Weave"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-widest text-black dark:text-white block">
                  Heritage Tartans & Twills
                </span>
                <p className="text-xs text-stone-500 font-light leading-snug">
                  100% Egyptian long-staple cotton with custom woven patterns.
                </p>
                <Link
                  to="/shop?filter=new"
                  className="btn-fashion-underline text-black dark:text-white inline-block pt-1"
                >
                  Discover the Line →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 3: SHOP BY CATEGORY (3 FULL-HEIGHT PANELS)             */}
      {/* ============================================================== */}
      <section className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* WOMAN */}
          <Link
            to="/women"
            className="group relative h-[520px] sm:h-[680px] overflow-hidden bg-stone-900 select-none block"
          >
            <img
              src="https://images.unsplash.com/photo-1601610694617-a2bf5b5e35f8?auto=format&fit=crop&w=1000&q=85"
              alt="Woman Collection"
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 sm:p-12 text-white">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-300 mb-1">
                Collection
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight">
                WOMAN
              </h3>
              <p className="text-xs text-stone-300 font-light mt-2 mb-4 max-w-xs">
                Effortless boyfriend cuts, oversized drapes, and fluid Nordic windowpanes.
              </p>
              <span className="btn-fashion-underline text-white inline-flex self-start">
                Explore Woman →
              </span>
            </div>
          </Link>

          {/* MAN */}
          <Link
            to="/men"
            className="group relative h-[520px] sm:h-[680px] overflow-hidden bg-stone-900 select-none block border-y md:border-y-0 md:border-x border-black/10 dark:border-white/10"
          >
            <img
              src="https://images.unsplash.com/photo-1623162905251-e98a25a45a67?auto=format&fit=crop&w=1000&q=85"
              alt="Man Collection"
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 sm:p-12 text-white">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-300 mb-1">
                Collection
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight">
                MAN
              </h3>
              <p className="text-xs text-stone-300 font-light mt-2 mb-4 max-w-xs">
                Structured button-downs, Scottish clan tartans, and heavyweight brushed flannels.
              </p>
              <span className="btn-fashion-underline text-white inline-flex self-start">
                Explore Man →
              </span>
            </div>
          </Link>

          {/* KIDS */}
          <Link
            to="/kids"
            className="group relative h-[520px] sm:h-[680px] overflow-hidden bg-stone-900 select-none block"
          >
            <img
              src="https://images.unsplash.com/photo-1627278107893-b89d828d4ff3?auto=format&fit=crop&w=1000&q=85"
              alt="Kids Collection"
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 sm:p-12 text-white">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-300 mb-1">
                Collection
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight">
                KIDS
              </h3>
              <p className="text-xs text-stone-300 font-light mt-2 mb-4 max-w-xs">
                Pure hypoallergenic organic weaves designed for joyful exploration.
              </p>
              <span className="btn-fashion-underline text-white inline-flex self-start">
                Explore Kids →
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 4: FEATURED PRODUCTS (MINIMAL EDITORIAL GRID)          */}
      {/* ============================================================== */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 max-w-[1500px] mx-auto">
        {/* Minimal Header & Category Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-10 border-b border-black/10 dark:border-white/10 gap-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 block mb-1">
              Curated Selection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal">
              FEATURED CHECKS
            </h2>
          </div>

          {/* Minimal Category Tabs (Zara Style) */}
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar text-[11px] font-bold uppercase tracking-[0.2em]">
            {[
              { id: 'all', label: 'All' },
              { id: 'women', label: 'Woman' },
              { id: 'men', label: 'Man' },
              { id: 'kids', label: 'Kids' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategoryTab(tab.id)}
                className={`pb-1 transition-colors relative ${
                  selectedCategoryTab === tab.id
                    ? 'text-black dark:text-white after:content-[""] after:absolute after:bottom-0 after:inset-x-0 after:h-[1px] after:bg-black dark:after:bg-white'
                    : 'text-stone-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Minimalist 4-Column Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 sm:gap-x-6 sm:gap-y-16">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>

        <div className="pt-16 text-center">
          <Link
            to="/shop"
            className="btn-fashion-outline"
          >
            View Complete Catalogue
          </Link>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 5: CAMPAIGN STORYTELLING (FULL-WIDTH SPREAD)           */}
      {/* ============================================================== */}
      <section className="relative w-full py-28 sm:py-36 px-6 sm:px-12 bg-black text-white overflow-hidden select-none">
        {/* Editorial Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1599837855737-d15830f71159?auto=format&fit=crop&w=2000&q=85"
            alt="Campaign Storytelling"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-stone-400 block">
            The Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal leading-tight tracking-tight">
            “MORE THAN A PATTERN. <br />
            <span className="italic">A STATEMENT OF IDENTITY.”</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed max-w-2xl mx-auto">
            At CHEXY HUB, we dedicate ourselves exclusively to checkered fashion. Every tartan weave, windowpane line, and Madras cross is selected to elevate personal style across every generation.
          </p>

          <div className="pt-4">
            <Link
              to="/about"
              className="py-3 px-8 bg-white text-black text-[11px] font-bold uppercase tracking-[0.22em] transition-opacity hover:opacity-85 inline-block"
            >
              Read Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 6: FAMILY COLLECTION CAMPAIGN                          */}
      {/* ============================================================== */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 max-w-[1500px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Narrative (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 block">
              Coordinated Heritage
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight">
              ONE PATTERN. <br />
              <span className="italic">ENDLESS CONNECTIONS.</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-light leading-relaxed">
              Celebrate family milestones with harmonized check patterns. From father-child matching tartans to complete family sets, our pieces create timeless memories.
            </p>
            <div>
              <Link
                to="/family-collection"
                className="btn-fashion-primary"
              >
                Shop Family Collection
              </Link>
            </div>
          </div>

          {/* Right: Asymmetric Family Editorial Image (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden bg-stone-100 dark:bg-stone-900 group">
              <img
                src="https://images.unsplash.com/photo-1602848137189-ad9301200244?auto=format&fit=crop&w=1400&q=85"
                alt="Family Collection"
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute bottom-6 left-6 bg-white/90 dark:bg-black/90 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em]">
                Coordinated Check Shirts
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 8: INSTAGRAM EDITORIAL GALLERY                         */}
      {/* ============================================================== */}
      <section className="py-16 sm:py-24 border-t border-black/10 dark:border-white/10">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8 mb-10 flex items-end justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 block mb-1">
              Social Lookbook
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal">
              @CHEXYHUB
            </h3>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="btn-fashion-underline text-xs"
          >
            Follow on Instagram →
          </a>
        </div>

        {/* 6-Column Minimalist Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 px-2">
          {INSTAGRAM_POSTS.slice(0, 6).map((post) => (
            <a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square overflow-hidden bg-stone-100 dark:bg-stone-900 block"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center text-white text-[11px] font-medium tracking-wider uppercase">
                <span>View Post</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Quick View Modal */}
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
