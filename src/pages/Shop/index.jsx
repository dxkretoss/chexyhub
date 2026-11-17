import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  Filter,
  RotateCcw,
  Search,
  Sparkles,
} from 'lucide-react';
import { PRODUCTS, COLLECTIONS, CATEGORIES } from '../../data/products';
import { ProductCard } from '../../components/product/ProductCard';
import { QuickViewModal } from '../../components/product/QuickViewModal';
import { SEO } from '../../components/common/SEO';
import { formatPrice } from '../../utils/formatters';

const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3-4Y', '5-6Y', '7-8Y', '9-10Y', '11-12Y'];
const ALL_PATTERNS = [
  { id: 'all', label: 'All Patterns' },
  { id: 'tartan', label: 'Highland Tartan' },
  { id: 'buffalo', label: 'Buffalo Check' },
  { id: 'gingham', label: 'Gingham' },
  { id: 'windowpane', label: 'Windowpane' },
  { id: 'madras', label: 'Summer Madras' },
];

export function Shop({ defaultCategory = 'all' }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

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
  const [discountOnly, setDiscountOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  // Keep category in sync if URL or prop changes
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
    let result = [...PRODUCTS];

    if (category && category !== 'all') {
      result = result.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (selectedCollection !== 'all') {
      result = result.filter((p) => p.collection === selectedCollection);
    }

    if (selectedPattern !== 'all') {
      result = result.filter((p) => p.model3D?.pattern === selectedPattern);
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

    if (discountOnly) {
      result = result.filter((p) => p.discount > 0);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
        break;
      case 'bestselling':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
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
    discountOnly,
    searchQuery,
    sortBy,
  ]);

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleClearAll = () => {
    setCategory('all');
    setSelectedCollection('all');
    setSelectedPattern('all');
    setSelectedSizes([]);
    setPriceRange([1000, 8000]);
    setInStockOnly(false);
    setDiscountOnly(false);
    setSearchQuery('');
    setSearchParams({});
  };

  const hasActiveFilters =
    category !== 'all' ||
    selectedCollection !== 'all' ||
    selectedPattern !== 'all' ||
    selectedSizes.length > 0 ||
    priceRange[0] > 1000 ||
    priceRange[1] < 8000 ||
    inStockOnly ||
    discountOnly ||
    searchQuery.trim() !== '';

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Selection */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-dark-text mb-3">
          Category
        </h4>
        <div className="space-y-1.5 text-xs">
          {[
            { id: 'all', label: 'All Collections' },
            { id: 'men', label: "Men's Checks" },
            { id: 'women', label: "Women's Checks" },
            { id: 'kids', label: "Kids & Juniors" },
            { id: 'family', label: "Matching Family Sets" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`w-full text-left px-3 py-2 rounded-xl transition-colors font-medium flex items-center justify-between ${
                category === cat.id
                  ? 'bg-terracotta text-white font-bold shadow-sm'
                  : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <span>{cat.label}</span>
              {category === cat.id && <span className="text-xs">✓</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Pattern Type */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-dark-text mb-3">
          Pattern Weave
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {ALL_PATTERNS.map((pat) => (
            <button
              key={pat.id}
              onClick={() => setSelectedPattern(pat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                selectedPattern === pat.id
                  ? 'border-terracotta bg-terracotta/10 text-terracotta font-bold'
                  : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
              }`}
            >
              {pat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Size Checkboxes */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-dark-text mb-3">
          Available Sizes
        </h4>
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`min-w-9 h-9 px-2 rounded-xl text-xs font-bold border transition-all ${
                selectedSizes.includes(size)
                  ? 'border-terracotta bg-terracotta text-white shadow-sm'
                  : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-stone-400'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-dark-text">
            Price Range
          </h4>
          <span className="text-xs font-bold text-terracotta">
            Up to {formatPrice(priceRange[1])}
          </span>
        </div>
        <input
          type="range"
          min="1000"
          max="8000"
          step="250"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          className="w-full accent-terracotta cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-secondary-gray mt-1">
          <span>₹1,000</span>
          <span>₹8,000</span>
        </div>
      </div>

      {/* Collections Dropdown */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-dark-text mb-2">
          Collection Theme
        </h4>
        <select
          value={selectedCollection}
          onChange={(e) => setSelectedCollection(e.target.value)}
          className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-charcoal dark:text-dark-text focus:outline-none focus:ring-1 focus:ring-terracotta"
        >
          <option value="all">All Themes</option>
          {COLLECTIONS.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Toggles */}
      <div className="space-y-3 pt-2 border-t border-stone-100 dark:border-stone-800 text-xs">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="rounded text-terracotta focus:ring-terracotta w-4 h-4"
          />
          <span className="text-stone-700 dark:text-stone-300 font-medium">In Stock Only</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={discountOnly}
            onChange={(e) => setDiscountOnly(e.target.checked)}
            className="rounded text-terracotta focus:ring-terracotta w-4 h-4"
          />
          <span className="text-stone-700 dark:text-stone-300 font-medium">On Sale Only</span>
        </label>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <button
          onClick={handleClearAll}
          className="w-full py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-xs font-semibold text-secondary-gray hover:text-terracotta hover:border-terracotta flex items-center justify-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      )}
    </div>
  );

  return (
    <>
      <SEO
        title="Shop All Premium Checkered Shirts | CHEXY HUB"
        description="Browse the full collection of men, women, kids, and matching family checkered shirts."
      />

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Page Header */}
        <div className="mb-8 pb-6 border-b border-stone-200 dark:border-stone-800">
          <span className="text-xs uppercase font-bold tracking-widest text-terracotta block mb-1">
            Catalogue
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal dark:text-dark-text capitalize">
            {category === 'all'
              ? 'All Checkered Shirts'
              : `${category}'s Collection`}
          </h1>
          <p className="text-xs sm:text-sm text-secondary-gray mt-2">
            Showing {filteredProducts.length} authentic checkered designs crafted with long-staple cotton.
          </p>
        </div>

        {/* Action Bar: Search Bar, Mobile Filter Trigger, Sort Dropdown */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Quick Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search in this catalogue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-8 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-dark-text focus:outline-none focus:ring-1 focus:ring-terracotta"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-charcoal"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden px-4 py-2.5 rounded-xl glass dark:glass-dark text-xs font-semibold text-charcoal dark:text-dark-text flex items-center gap-2 border border-stone-200 dark:border-stone-700 shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4 text-terracotta" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-terracotta" />
              )}
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-secondary-gray hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-semibold px-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-dark-text focus:outline-none focus:ring-1 focus:ring-terracotta"
              >
                <option value="featured">Featured First</option>
                <option value="newest">Newest Arrivals</option>
                <option value="bestselling">Best Selling</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-xs text-secondary-gray font-medium">Active:</span>
            {category !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-stone-200 dark:bg-stone-800 text-charcoal dark:text-dark-text">
                <span>Category: {category}</span>
                <button onClick={() => setCategory('all')}>
                  <X className="w-3 h-3 text-stone-500" />
                </button>
              </span>
            )}
            {selectedPattern !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-stone-200 dark:bg-stone-800 text-charcoal dark:text-dark-text">
                <span>Pattern: {selectedPattern}</span>
                <button onClick={() => setSelectedPattern('all')}>
                  <X className="w-3 h-3 text-stone-500" />
                </button>
              </span>
            )}
            {selectedCollection !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-stone-200 dark:bg-stone-800 text-charcoal dark:text-dark-text">
                <span>Theme: {selectedCollection}</span>
                <button onClick={() => setSelectedCollection('all')}>
                  <X className="w-3 h-3 text-stone-500" />
                </button>
              </span>
            )}
            {selectedSizes.map((sz) => (
              <span
                key={sz}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-stone-200 dark:bg-stone-800 text-charcoal dark:text-dark-text"
              >
                <span>Size: {sz}</span>
                <button onClick={() => toggleSize(sz)}>
                  <X className="w-3 h-3 text-stone-500" />
                </button>
              </span>
            ))}
            <button
              onClick={handleClearAll}
              className="text-xs font-semibold text-terracotta hover:underline ml-2"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 p-6 rounded-3xl glass dark:glass-dark border border-stone-200/80 dark:border-stone-800 self-start sticky top-24 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200 dark:border-stone-800">
              <h3 className="font-serif font-bold text-base flex items-center gap-2">
                <Filter className="w-4 h-4 text-terracotta" />
                <span>Filters</span>
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={handleClearAll}
                  className="text-xs text-terracotta hover:underline font-semibold"
                >
                  Reset
                </button>
              )}
            </div>
            <FilterContent />
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center text-center p-8 rounded-3xl glass dark:glass-dark border border-stone-200 dark:border-stone-800">
                <div className="w-16 h-16 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mb-4">
                  <Filter className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold mb-2">
                  No matching shirts found
                </h3>
                <p className="text-sm text-secondary-gray max-w-sm mb-6">
                  Try adjusting your filters, price range, or searching for other checkered styles.
                </p>
                <button
                  onClick={handleClearAll}
                  className="px-6 py-2.5 rounded-full bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Slide-out Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs glass-drawer shadow-2xl flex flex-col p-6 text-charcoal dark:text-dark-text overflow-y-auto no-scrollbar">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200 dark:border-stone-800">
                <h3 className="font-serif font-bold text-lg flex items-center gap-2">
                  <Filter className="w-5 h-5 text-terracotta" />
                  <span>Filter Products</span>
                </h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <FilterContent />

              <div className="pt-6 mt-6 border-t border-stone-200 dark:border-stone-800">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3 rounded-xl bg-terracotta text-white font-semibold text-xs shadow-md"
                >
                  Show Results ({filteredProducts.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
