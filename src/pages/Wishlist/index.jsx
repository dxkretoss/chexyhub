import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
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
    <>
      <SEO
        title="My Wishlist | CHEXY HUB"
        description="View your saved checkered shirts and move them directly to your shopping bag."
      />

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-8 border-b border-stone-200 dark:border-stone-800">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-terracotta block mb-1">
              Saved Favorites
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal dark:text-dark-text">
              My Wishlist ({items.length})
            </h1>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearWishlist}
              className="mt-3 sm:mt-0 text-xs font-semibold text-secondary-gray hover:text-rose-600 transition-colors"
            >
              Clear Wishlist
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center p-8 rounded-3xl glass dark:glass-dark border border-stone-200 dark:border-stone-800 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl font-bold mb-2">Your Wishlist is Empty</h2>
            <p className="text-sm text-secondary-gray mb-6">
              Save your favorite check shirts to keep track of new arrivals and seasonal offers.
            </p>
            <Link
              to="/shop"
              className="px-6 py-3 rounded-full bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold transition-colors shadow-md"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col rounded-2xl bg-white dark:bg-dark-card border border-stone-200 dark:border-dark-border overflow-hidden shadow-sm hover:shadow-card-hover transition-all"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 dark:bg-stone-900">
                  <Link to={`/product/${item.slug}`}>
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 p-2 rounded-full glass dark:glass-dark text-stone-500 hover:text-rose-500 transition-colors shadow-sm"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-terracotta">
                      {item.category}
                    </span>
                    <Link to={`/product/${item.slug}`}>
                      <h3 className="font-semibold text-sm text-charcoal dark:text-dark-text line-clamp-1 mt-0.5 hover:text-terracotta transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-base font-bold text-charcoal dark:text-dark-text mt-2">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="mt-4 w-full py-2.5 px-4 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
