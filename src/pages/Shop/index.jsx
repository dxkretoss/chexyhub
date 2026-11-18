import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  RotateCcw,
  Search,
  Grid,
  Columns
} from 'lucide-react';
import { COLLECTIONS } from '../../data/products';
import { useProductsStore } from '../../store/useProductsStore';
import { ProductCard } from '../../components/product/ProductCard';
import { QuickViewModal } from '../../components/product/QuickViewModal';
import { SEO } from '../../components/common/SEO';
import { formatPrice } from '../../utils/formatters';

const ADULT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const KIDS_SIZES = ['3-4Y', '5-6Y', '7-8Y', '9-10Y', '11-12Y'];
const ALL_SIZES = [...ADULT_SIZES, ...KIDS_SIZES];
const ALL_PATTERNS = [
  { id: 'all', label: 'All Patterns' },
  { id: 'tartan', label: 'Scottish Tartan' },
  { id: 'buffalo', label: 'Buffalo Check' },
  { id: 'gingham', label: 'Gingham' },
  { id: 'windowpane', label: 'Windowpane' },
  { id: 'madras', label: 'Summer Madras' },
];

export function Shop({ defaultCategory = 'all' }) {
  const { products: liveProducts, loading: isLoadingProducts } = useProductsStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [gridColumns, setGridColumns] = useState(4); // 2 for editorial, 4 for catalogue

  // Filter States
  const [category, setCategory] = useState(
    searchParams.get('category') || defaultCategory
  );
  const [selectedCollection, setSelectedCollection] = useState(
    searchParams.get('collection') || 'all'
  );
  const [selectedPattern, setSelectedPattern] = useState('all');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState([1000, 8000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  // Sync category if URL or prop changes
  useEffect(() => {
    const cat = searchParams.get('category') || defaultCategory;
    setCategory(cat);
    const search = searchParams.get('search');
    if (search !== null) setSearchQuery(search);
    const coll = searchParams.get('collection');
    if (coll) setSelectedCollection(coll);
  }, [searchParams, defaultCategory]);

  // Filter products logic
  const filteredProducts = useMemo(() => {
    let result = [...liveProducts];

    if (category && category !== 'all') {
      result = result.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (selectedCollection !== 'all') {
      result = result.filter((p) => p.collection === selectedCollection);
    }

    if (selectedPattern !== 'all') {
      result = result.filter((p) => (p.pattern || p.model3D?.pattern) === selectedPattern);
    }

    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        selectedSizes.some((s) => p.sizes.includes(s))
      );
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (inStockOnly) {
      result = result.filter((p) => p.stockStatus !== 'Out of Stock');
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q)
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [
    category,
    selectedCollection,
    selectedPattern,
    selectedSizes,
    priceRange,
    inStockOnly,
    searchQuery,
    sortBy,
  ]);

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const availableSizesToDisplay = useMemo(() => {
    if (category === 'kids') return { adult: [], kids: KIDS_SIZES };
    if (category === 'men' || category === 'women') return { adult: ADULT_SIZES, kids: [] };
    return { adult: ADULT_SIZES, kids: KIDS_SIZES };
  }, [category]);

  const handleClearAll = () => {
    setCategory('all');
    setSelectedCollection('all');
    setSelectedPattern('all');
    setSelectedSizes([]);
    setPriceRange([1000, 8000]);
    setInStockOnly(false);
    setSearchQuery('');
    setSearchParams({});
  };

  const activeFilterCount =
    (category !== 'all' ? 1 : 0) +
    (selectedCollection !== 'all' ? 1 : 0) +
    (selectedPattern !== 'all' ? 1 : 0) +
    selectedSizes.length +
    (inStockOnly ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const getPageTitle = () => {
    if (category === 'women') return "WOMAN'S COLLECTION";
    if (category === 'men') return "MAN'S COLLECTION";
    if (category === 'kids') return "KIDS' COLLECTION";
    if (category === 'family') return 'MATCHING FAMILY COLLECTION';
    return 'ALL CHECK SHIRTS';
  };

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#0E0E0E] text-black dark:text-white transition-colors duration-300 min-h-screen">
      <SEO
        title={`${getPageTitle()} | CHEXY HUB`}
        description="Explore the curated checkered fashion catalogue. Tailored check shirts for Woman, Man, Kids, and Family."
      />

      <div className="pt-24 sm:pt-28 pb-24 px-4 sm:px-8 max-w-[1600px] mx-auto w-full">
        {/* Editorial Collection Header */}
        <div className="pb-8 mb-8 border-b border-black/10 dark:border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 block mb-1">
              CHEXY HUB CATALOGUE
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal">
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-6 text-xs uppercase tracking-[0.2em] text-stone-400">
            <span>{filteredProducts.length} DESIGNS AVAILABLE</span>
          </div>
        </div>

        {/* Minimal Category Tabs */}
        <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar pb-3 mb-6 text-xs font-bold uppercase tracking-[0.2em] border-b border-black/5 dark:border-white/5">
          {[
            { id: 'all', label: 'All Checks' },
            { id: 'women', label: 'Woman' },
            { id: 'men', label: 'Man' },
            { id: 'kids', label: 'Kids' },
            { id: 'family', label: 'Family Collection' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`pb-2 whitespace-nowrap transition-colors relative ${
                category === cat.id
                  ? 'text-black dark:text-white after:content-[""] after:absolute after:bottom-0 after:inset-x-0 after:h-[1px] after:bg-black dark:after:bg-white'
                  : 'text-stone-400 hover:text-black dark:hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Action & Filter Bar (Zara Inspired) */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-black/10 dark:border-white/10 text-xs font-bold uppercase tracking-widest gap-4">
          {/* Left: Filter Drawer Trigger */}
          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="flex items-center gap-2 text-black dark:text-white hover:opacity-70 transition-opacity"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>
              FILTERS {activeFilterCount > 0 && `(${activeFilterCount})`}
            </span>
          </button>

          {/* Right: Grid Switcher & Sort */}
          <div className="flex items-center gap-6">
            {/* 2-Col vs 4-Col Grid Toggle (Desktop) */}
            <div className="hidden sm:flex items-center gap-2 text-stone-400">
              <button
                onClick={() => setGridColumns(2)}
                className={`p-1 transition-colors ${gridColumns === 2 ? 'text-black dark:text-white' : 'hover:text-black dark:hover:text-white'}`}
                title="Editorial 2-Column View"
              >
                <Columns className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridColumns(4)}
                className={`p-1 transition-colors ${gridColumns === 4 ? 'text-black dark:text-white' : 'hover:text-black dark:hover:text-white'}`}
                title="Standard 4-Column Catalogue"
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <span className="text-stone-400 hidden sm:inline">SORT:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-black dark:text-white font-bold uppercase tracking-wider text-[11px] focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-white dark:bg-black">Featured</option>
                <option value="newest" className="bg-white dark:bg-black">New Arrivals</option>
                <option value="price-asc" className="bg-white dark:bg-black">Price: Low to High</option>
                <option value="price-desc" className="bg-white dark:bg-black">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div
            className={`grid gap-x-4 gap-y-12 sm:gap-x-6 sm:gap-y-16 ${
              gridColumns === 2
                ? 'grid-cols-1 sm:grid-cols-2'
                : 'grid-cols-2 md:grid-cols-4'
            }`}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center max-w-md mx-auto space-y-4">
            <h3 className="font-serif text-2xl font-normal">NO PIECES MATCH YOUR CRITERIA</h3>
            <p className="text-xs text-stone-500 font-light">
              Try adjusting your weave type, size, or price filters to explore the rest of the collection.
            </p>
            <div className="pt-2">
              <button onClick={handleClearAll} className="btn-fashion-primary">
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Slide-In Minimalist Filter Drawer */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsFilterDrawerOpen(false)}
          />

          {/* Drawer Body */}
          <div className="relative w-full max-w-md bg-white dark:bg-[#121212] h-full shadow-2xl p-8 z-10 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-8">
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-black/10 dark:border-white/10">
                <span className="text-xs font-bold uppercase tracking-[0.2em]">
                  FILTERS
                </span>
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="p-1 hover:opacity-60 transition-opacity"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Weave Type */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 block">
                  Pattern Architecture
                </span>
                <div className="flex flex-wrap gap-2">
                  {ALL_PATTERNS.map((pat) => (
                    <button
                      key={pat.id}
                      onClick={() => setSelectedPattern(pat.id)}
                      className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider border transition-all ${
                        selectedPattern === pat.id
                          ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black'
                          : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-300'
                      }`}
                    >
                      {pat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">
                    Available Sizes {selectedSizes.length > 0 && `(${selectedSizes.length})`}
                  </span>
                  {selectedSizes.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setSelectedSizes([])}
                      className="text-[10px] uppercase tracking-wider text-stone-500 hover:text-black dark:hover:text-white underline transition-colors"
                    >
                      Clear ({selectedSizes.length})
                    </button>
                  )}
                </div>

                {/* If showing both adult and kids (e.g. All / Family) */}
                {availableSizesToDisplay.adult.length > 0 && availableSizesToDisplay.kids.length > 0 ? (
                  <div className="space-y-3.5">
                    {/* Adult Sizing */}
                    <div>
                      <span className="text-[9px] font-semibold tracking-wider text-stone-400 dark:text-stone-500 uppercase block mb-1.5">
                        Adult Sizing
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {availableSizesToDisplay.adult.map((size) => {
                          const isSelected = selectedSizes.includes(size);
                          return (
                            <button
                              key={size}
                              type="button"
                              onClick={() => toggleSize(size)}
                              className={`min-w-[42px] h-9 px-2.5 text-xs font-semibold uppercase tracking-wider border transition-all flex items-center justify-center whitespace-nowrap ${
                                isSelected
                                  ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black shadow-sm'
                                  : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 bg-white/50 dark:bg-stone-900/50 hover:border-black dark:hover:border-white'
                              }`}
                            >
                              {size}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Junior Sizing */}
                    <div>
                      <span className="text-[9px] font-semibold tracking-wider text-stone-400 dark:text-stone-500 uppercase block mb-1.5">
                        Junior Sizing (Age)
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {availableSizesToDisplay.kids.map((size) => {
                          const isSelected = selectedSizes.includes(size);
                          return (
                            <button
                              key={size}
                              type="button"
                              onClick={() => toggleSize(size)}
                              className={`min-w-[58px] h-9 px-3 text-xs font-semibold uppercase tracking-wider border transition-all flex items-center justify-center whitespace-nowrap ${
                                isSelected
                                  ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black shadow-sm'
                                  : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 bg-white/50 dark:bg-stone-900/50 hover:border-black dark:hover:border-white'
                              }`}
                            >
                              {size}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Single Category Sizing (Men, Women, or Kids) */
                  <div className="flex flex-wrap gap-2">
                    {(availableSizesToDisplay.adult.length > 0
                      ? availableSizesToDisplay.adult
                      : availableSizesToDisplay.kids
                    ).map((size) => {
                      const isSelected = selectedSizes.includes(size);
                      const isKids = size.includes('Y');
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => toggleSize(size)}
                          className={`${
                            isKids ? 'min-w-[58px] px-3' : 'min-w-[42px] px-2.5'
                          } h-9 text-xs font-semibold uppercase tracking-wider border transition-all flex items-center justify-center whitespace-nowrap ${
                            isSelected
                              ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black shadow-sm'
                              : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 bg-white/50 dark:bg-stone-900/50 hover:border-black dark:hover:border-white'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Collection Theme */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 block">
                  Curated Collection Theme
                </span>
                <select
                  value={selectedCollection}
                  onChange={(e) => setSelectedCollection(e.target.value)}
                  className="w-full text-xs font-medium uppercase p-3 border border-stone-300 dark:border-stone-700 bg-transparent text-black dark:text-white focus:outline-none"
                >
                  <option value="all" className="bg-white dark:bg-black">All Themes</option>
                  {COLLECTIONS.map((c) => (
                    <option key={c.id} value={c.name} className="bg-white dark:bg-black">
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">
                    Max Price
                  </span>
                  <span className="text-xs font-bold">
                    {formatPrice(priceRange[1])}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="8000"
                  step="250"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full accent-black dark:accent-white cursor-pointer"
                />
              </div>

              {/* In Stock Toggle */}
              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer text-xs font-medium uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="accent-black dark:accent-white w-4 h-4"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-8 border-t border-black/10 dark:border-white/10 flex gap-3">
              <button
                onClick={handleClearAll}
                className="flex-1 py-3 border border-black dark:border-white text-xs font-bold uppercase tracking-widest text-center"
              >
                Reset
              </button>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="flex-1 py-3 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-widest text-center"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

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
