import React from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';
import { useWishlistStore } from '../../store/useWishlistStore';
import { formatPrice } from '../../utils/formatters';
import { SEO } from '../../components/common/SEO';
import { toast } from 'sonner';

export function Wishlist() {
  const { items, removeFromWishlist, moveToCart, clearWishlist } = useWishlistStore();

  const handleMoveToCart = (item) => {
    moveToCart(item, {
      size: item.sizes ? item.sizes[0] : 'M',
      color: item.colors ? item.colors[0]?.name : 'Default',
    });
    toast.success(`Moved ${item.name} to shopping bag`);
  };

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#0E0E0E] text-black dark:text-white transition-colors duration-300 min-h-screen">
      <SEO
        title="My Wishlist | CHEXY HUB"
        description="View your saved checkered shirts and move them directly to your shopping bag."
      />

      <div className="pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-8 max-w-[1600px] mx-auto w-full">
        {/* Editorial Header */}
        <div className="pb-6 mb-8 border-b border-black/10 dark:border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 mb-2">
              <span>PERSONAL ATELIER</span>
              <span>•</span>
              <span>SAVED PIECES</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-black dark:text-white">
              MY WISHLIST ({items.length})
            </h1>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500 hover:text-black dark:hover:text-white transition-colors self-start sm:self-auto underline underline-offset-4"
            >
              Clear All Selection
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="py-24 max-w-md mx-auto text-center space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 block">
              Curated Wardrobe
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-black dark:text-white">
              YOUR SELECTION IS EMPTY.
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-light leading-relaxed">
              Explore our checkered collections for Woman, Man, Kids, and Family to save your favorite silhouettes.
            </p>
            <div className="pt-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-[0.25em] transition-opacity hover:opacity-80"
              >
                <span>Discover Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-12">
            {items.map((item) => (
              <div key={item.id} className="group relative flex flex-col select-none">
                {/* Image Container with Quick Remove Action */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 dark:bg-stone-900 mb-4">
                  <Link to={`/product/${item.slug}`} className="block w-full h-full">
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-black/90 backdrop-blur-sm text-black dark:text-white hover:opacity-60 transition-opacity"
                    title="Remove from wishlist"
                    aria-label="Remove item"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Garment Details */}
                <div className="space-y-1 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 block">
                      {item.collection || item.category}
                    </span>
                    <Link to={`/product/${item.slug}`}>
                      <h3 className="text-xs font-medium uppercase tracking-wider text-black dark:text-white truncate hover:opacity-60 transition-opacity mt-0.5">
                        {item.name}
                      </h3>
                    </Link>
                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-xs font-bold tracking-wider text-black dark:text-white">
                        {formatPrice(item.price)}
                      </span>
                      {item.originalPrice && (
                        <span className="text-[11px] text-stone-400 line-through">
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="mt-4 w-full py-3 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold uppercase tracking-[0.2em] transition-opacity hover:opacity-85 text-center"
                  >
                    Move to Shopping Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
