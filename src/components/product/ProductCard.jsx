import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Check } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useCartStore } from '../../store/useCartStore';
import { toast } from 'sonner';

export function ProductCard({ product, onQuickView }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || null);
  const [isHovered, setIsHovered] = useState(false);
  const [showSizes, setShowSizes] = useState(false);

  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { addItem } = useCartStore();

  const isFavorited = isInWishlist(product.id);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product);
    if (added) {
      toast.success(`Saved to wishlist`);
    } else {
      toast.info(`Removed from wishlist`);
    }
  };

  const handleSelectSize = (e, size) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, {
      size: size,
      color: selectedColor?.name || product.colors[0]?.name,
      quantity: 1,
    });
    setShowSizes(false);
    toast.success(`Added ${product.name} (Size: ${size}) to bag`);
  };

  // Primary image vs alternate hover image
  const primaryImg = product.images[0] || product.thumbnail;
  const hoverImg = product.images[1] || primaryImg;

  return (
    <div
      className="group relative flex flex-col bg-white dark:bg-[#141414] select-none transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowSizes(false);
      }}
    >
      {/* Editorial Image Canvas */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 dark:bg-stone-900">
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={isHovered && hoverImg !== primaryImg ? hoverImg : primaryImg}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </Link>

        {/* Subtle Minimal Editorial Label (Top Left) */}
        {product.isNewArrival && (
          <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest text-black bg-white/90 dark:bg-black/90 dark:text-white px-2 py-0.5 pointer-events-none">
            New
          </span>
        )}
        {product.isBestSeller && !product.isNewArrival && (
          <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest text-black bg-white/90 dark:bg-black/90 dark:text-white px-2 py-0.5 pointer-events-none">
            Editorial Pick
          </span>
        )}

        {/* Minimal Wishlist Heart (Top Right) */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 p-2 transition-all duration-200 ${
            isFavorited
              ? 'opacity-100 text-terracotta'
              : 'opacity-100 sm:opacity-0 sm:group-hover:opacity-100 text-black dark:text-white hover:scale-110'
          }`}
          title={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          aria-label="Wishlist"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorited ? 'fill-terracotta text-terracotta' : 'fill-none'
            }`}
          />
        </button>

        {/* Zara-Style Slide-Up Quick Add to Bag Bar */}
        <div
          className={`absolute inset-x-0 bottom-0 z-10 transition-all duration-300 ease-out ${
            isHovered
              ? 'translate-y-0 opacity-100'
              : 'translate-y-full opacity-0 pointer-events-none'
          }`}
        >
          {showSizes ? (
            <div className="bg-white/95 dark:bg-black/95 backdrop-blur-md p-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-1 overflow-x-auto">
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mr-1 flex-shrink-0">
                Size:
              </span>
              <div className="flex items-center gap-1.5 flex-1 justify-end flex-wrap sm:flex-nowrap">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={(e) => handleSelectSize(e, s)}
                    className={`${
                      s.length > 3 ? 'min-w-[42px] px-1.5' : 'w-7'
                    } h-7 text-[10px] font-semibold whitespace-nowrap border border-stone-300 dark:border-stone-700 hover:border-black dark:hover:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors flex items-center justify-center`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowSizes(true);
              }}
              className="w-full py-3 bg-black/90 dark:bg-white/90 text-white dark:text-black backdrop-blur-md text-[11px] font-bold uppercase tracking-[0.2em] transition-colors hover:bg-black dark:hover:bg-white flex items-center justify-center gap-2"
            >
              <span>+ Add to Bag</span>
            </button>
          )}
        </div>
      </div>

      {/* Minimal Product Meta (Below Image) */}
      <div className="pt-3 pb-2 flex flex-col">
        {/* Product Title */}
        <Link
          to={`/product/${product.slug}`}
          className="text-xs font-medium tracking-wide text-black dark:text-white hover:underline transition-colors line-clamp-1"
        >
          {product.name}
        </Link>

        {/* Pricing */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-xs font-semibold text-black dark:text-white tracking-wide">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-[11px] text-stone-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Minimal Color Swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 mt-2">
            {product.colors.slice(0, 4).map((c, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedColor(c);
                }}
                className={`w-2.5 h-2.5 rounded-full border transition-transform ${
                  selectedColor?.name === c.name
                    ? 'scale-125 border-black dark:border-white ring-1 ring-black/30 dark:ring-white/40'
                    : 'border-black/20 hover:scale-110'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
                aria-label={c.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-stone-400 font-light ml-0.5">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
