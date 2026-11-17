import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, Home } from 'lucide-react';
import { SEO } from '../../components/common/SEO';

export function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found (404) | CHEXY HUB"
        description="The requested page could not be found on CHEXY HUB."
      />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-lg mx-auto text-center flex flex-col items-center">
        <div className="w-20 h-20 rounded-3xl bg-terracotta/10 text-terracotta flex items-center justify-center font-serif text-3xl font-extrabold mb-6 shadow-sm">
          404
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-terracotta block mb-2">
          Off The Pattern
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal dark:text-dark-text mb-3">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-secondary-gray leading-relaxed mb-8 max-w-sm">
          The page you are looking for has been moved, renamed, or doesn’t exist in our current collection.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Link
            to="/"
            className="px-6 py-3 rounded-2xl bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            to="/shop"
            className="px-6 py-3 rounded-2xl border border-stone-200 dark:border-stone-700 text-charcoal dark:text-dark-text hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Compass className="w-4 h-4 text-terracotta" />
            <span>Explore Shop</span>
          </Link>
        </div>
      </div>
    </>
  );
}
