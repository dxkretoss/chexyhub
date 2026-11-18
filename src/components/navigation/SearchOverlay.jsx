import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { formatPrice } from '../../utils/formatters';

const POPULAR_SEARCHES = [
  'Royal Tartan',
  'Buffalo Plaid',
  'Summer Madras',
  'Father & Son',
  'Pastel Gingham',
  'Minimalist Windowpane',
  'Flannel Overshirt',
];

export function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase().trim();
    const filtered = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.collection.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 8);
    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-white dark:bg-[#0E0E0E] animate-fade-in text-black dark:text-white select-none">
      {/* Top Bar */}
      <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 py-6 flex items-center justify-between border-b border-black/10 dark:border-white/10">
        <Link to="/" onClick={onClose} className="flex items-center">
          {/* Desktop Light & Dark */}
          <img
            src="/assets/logo.png"
            alt="CHEXY HUB"
            className="hidden sm:block dark:hidden dark:sm:hidden h-11 md:h-12 w-auto object-contain"
          />
          <img
            src="/assets/logo_dark.png"
            alt="CHEXY HUB"
            className="hidden sm:dark:block h-11 md:h-12 w-auto object-contain"
          />
          {/* Mobile Light & Dark */}
          <img
            src="/assets/mob_logo.png"
            alt="CHEXY HUB"
            className="block sm:hidden dark:hidden h-9 w-9 object-contain rounded-md"
          />
          <img
            src="/assets/mob_logo_dark.png"
            alt="CHEXY HUB"
            className="hidden dark:block dark:sm:hidden sm:hidden h-9 w-9 object-contain rounded-md"
          />
        </Link>
        <button
          onClick={onClose}
          className="p-2 hover:opacity-60 transition-opacity"
          title="Close search"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Search Input Container */}
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-8 pt-12 pb-8 flex flex-col flex-1 overflow-y-auto no-scrollbar">
        <div className="relative flex items-center pb-4 border-b border-black dark:border-white">
          <Search className="w-6 h-6 text-stone-400 mr-4 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="ENTER SEARCH TERMS (TARTAN, GINGHAM, WOMAN...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-lg sm:text-2xl font-normal bg-transparent text-black dark:text-white placeholder:text-stone-400 focus:outline-none uppercase tracking-wider"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-black dark:hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        {!query && (
          <div className="mt-12 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 block">
              TRENDING EDITORIAL SEARCHES
            </span>
            <div className="flex flex-wrap gap-3">
              {POPULAR_SEARCHES.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-4 py-2 border border-stone-300 dark:border-stone-700 text-xs font-semibold uppercase tracking-wider hover:border-black dark:hover:border-white transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Live Search Results */}
        {query && (
          <div className="mt-10">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-black/5 dark:border-white/5 text-xs uppercase tracking-widest text-stone-400">
              <span>{results.length} PIECES FOUND FOR "{query}"</span>
              {results.length > 0 && (
                <Link
                  to={`/shop?search=${encodeURIComponent(query)}`}
                  onClick={onClose}
                  className="text-black dark:text-white hover:underline flex items-center gap-1 font-bold"
                >
                  <span>View All Results</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>

            {results.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-stone-500 text-xs uppercase tracking-widest">
                  No pieces found matching "{query}". Try searching for 'tartan', 'gingham', or 'flannel'.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.slug}`}
                    onClick={onClose}
                    className="group block"
                  >
                    <div className="aspect-[3/4] overflow-hidden bg-stone-100 dark:bg-stone-900 mb-2">
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block">
                      {product.category}
                    </span>
                    <h4 className="text-xs font-medium text-black dark:text-white line-clamp-1 group-hover:underline">
                      {product.name}
                    </h4>
                    <p className="text-xs font-semibold mt-0.5">
                      {formatPrice(product.price)}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
