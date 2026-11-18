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

      <div className="pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-lg mx-auto text-center flex flex-col items-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 block mb-2">
          ERROR 404 • ARCHIVE NOT FOUND
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-black dark:text-white mb-3">
          Page Not Found
        </h1>
        <p className="text-xs text-stone-500 font-light leading-relaxed mb-8 max-w-sm">
          The editorial piece or archive you are looking for has been relocated or is currently unavailable.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Link
            to="/"
            className="px-8 py-3.5 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-[0.22em] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Boutique</span>
          </Link>
          <Link
            to="/shop"
            className="px-8 py-3.5 border border-black dark:border-white text-black dark:text-white text-xs font-bold uppercase tracking-[0.22em] flex items-center justify-center gap-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Explore Collection</span>
          </Link>
        </div>
      </div>
    </>
  );
}
