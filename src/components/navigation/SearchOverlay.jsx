import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, ArrowRight, Tag, Star } from 'lucide-react';
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
    ).slice(0, 6);
    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-ivory/95 dark:bg-dark-bg/95 backdrop-blur-xl animate-fade-in">
      {/* Top Bar */}
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 flex items-center justify-between border-b border-stone-200 dark:border-stone-800">
        <Link to="/" onClick={onClose} className="flex items-center gap-2">
          <img
            src="/assets/logo.png"
            alt="CHEXY HUB"
            className="h-9 w-auto object-contain dark:invert"
          />
        </Link>
        <button
          onClick={onClose}
          className="p-2.5 rounded-full hover:bg-stone-200/60 dark:hover:bg-stone-800 text-charcoal dark:text-dark-text transition-colors"
          title="Close search (Esc)"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Search Input Container */}
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 pt-10 pb-6 flex flex-col flex-1 overflow-y-auto no-scrollbar">
        <div className="relative flex items-center pb-4 border-b-2 border-stone-300 dark:border-stone-700 focus-within:border-terracotta transition-colors">
          <Search className="w-7 h-7 text-stone-400 mr-4" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search checkered shirts, tartans, flannels..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-xl sm:text-2xl font-medium bg-transparent text-charcoal dark:text-dark-text placeholder:text-stone-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-charcoal dark:hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        {!query && (
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-secondary-gray mb-3 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" />
              <span>Trending Searches</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-4 py-2 rounded-full glass dark:glass-dark text-xs font-medium text-charcoal dark:text-dark-text hover:border-terracotta hover:text-terracotta transition-all shadow-sm"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Live Search Results */}
        {query && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary-gray">
                Found {results.length} {results.length === 1 ? 'result' : 'results'} for "{query}"
              </p>
              {results.length > 0 && (
                <Link
                  to={`/shop?search=${encodeURIComponent(query)}`}
                  onClick={onClose}
                  className="text-xs text-terracotta font-semibold hover:underline flex items-center gap-1"
                >
                  <span>View All Results</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>

            {results.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-stone-500 text-sm">
                  No checkered shirts found matching "{query}". Try searching for 'tartan', 'gingham', or 'men'.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3 p-3 rounded-2xl glass dark:glass-dark hover:border-terracotta transition-all group"
                  >
                    <div className="w-16 h-20 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 flex-shrink-0">
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta">
                        {product.category}
                      </span>
                      <h4 className="text-xs font-semibold text-charcoal dark:text-dark-text line-clamp-1 group-hover:text-terracotta transition-colors">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-1 text-[11px] text-amber-500 mt-0.5">
                        <Star className="w-3 h-3 fill-amber-500" />
                        <span>{product.rating}</span>
                      </div>
                      <p className="text-xs font-bold text-charcoal dark:text-dark-text mt-1">
                        {formatPrice(product.price)}
                      </p>
                    </div>
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
