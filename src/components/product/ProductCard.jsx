import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Box, Star } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useCartStore } from '../../store/useCartStore';
import { toast } from 'sonner';

export function ProductCard({ product, onQuickView }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || null);
  const [isHovered, setIsHovered] = useState(false);

  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { addItem } = useCartStore();

  const isFavorited = isInWishlist(product.id);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product);
    if (added) {
      toast.success(`Added "${product.name}" to wishlist`);
    } else {
      toast.info(`Removed from wishlist`);
    }
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, {
      size: product.sizes[0],
      color: selectedColor?.name || product.colors[0]?.name,
      quantity: 1,
    });
    toast.success(`Added ${product.name} (Size: ${product.sizes[0]}) to cart`);
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  // Primary image vs alternate hover image
  const primaryImg = product.images[0] || product.thumbnail;
  const hoverImg = product.images[1] || primaryImg;

  return (
    <div
      className="group relative flex flex-col rounded-3xl glass-card border border-stone-200/80 dark:border-white/10 overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Area */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 dark:bg-stone-900">
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={isHovered && hoverImg !== primaryImg ? hoverImg : primaryImg}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {product.isBestSeller && (
            <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full bg-charcoal text-white dark:bg-ivory dark:text-charcoal shadow-sm">
              Bestseller
            </span>
          )}
          {product.isNewArrival && (
            <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full bg-terracotta text-white shadow-sm">
              New Arrival
            </span>
          )}
          {product.discount > 0 && !product.isNewArrival && !product.isBestSeller && (
            <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full bg-amber-600 text-white shadow-sm">
              {product.discount}% Off
            </span>
          )}
        </div>

        {/* 3D studio badge indicator */}
        <Link
          to={`/3d-studio?product=${product.slug}`}
          onClick={(e) => e.stopPropagation()}
          className="absolute top-3 right-12 z-10 p-2 rounded-full glass dark:glass-dark text-charcoal dark:text-dark-text opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-terracotta"
          title="View in 3D Studio"
        >
          <Box className="w-4 h-4" />
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full glass dark:glass-dark transition-all duration-300 shadow-sm ${
            isFavorited
              ? 'text-terracotta bg-white/90'
              : 'text-stone-700 dark:text-stone-300 hover:text-terracotta'
          }`}
          title={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-terracotta' : ''}`} />
        </button>

        {/* Quick View & Quick Add Floating Bottom Bar on Hover */}
        <div className="absolute bottom-3 inset-x-3 z-10 flex items-center gap-2 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleQuickViewClick}
            className="flex-1 py-2.5 px-3 rounded-xl glass dark:glass-dark text-xs font-semibold text-charcoal dark:text-dark-text hover:bg-white dark:hover:bg-dark-card flex items-center justify-center gap-1.5 shadow-md transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
          <button
            onClick={handleQuickAdd}
            className="py-2.5 px-3.5 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md transition-colors"
            title="Quick Add to Cart (Default Size)"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="flex flex-col p-4 flex-1">
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-xs text-secondary-gray mb-1">
          <span className="uppercase tracking-wider font-medium text-[11px]">
            {product.category} • {product.collection}
          </span>
          <div className="flex items-center gap-1 text-amber-500 font-semibold">
            <Star className="w-3 h-3 fill-amber-500" />
            <span>{product.rating}</span>
            <span className="text-secondary-gray font-normal text-[10px]">
              ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Product Title */}
        <Link to={`/product/${product.slug}`} className="group-hover:text-terracotta transition-colors">
          <h3 className="text-sm font-semibold text-charcoal dark:text-dark-text line-clamp-1 mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Price Row */}
        <div className="flex items-baseline gap-2 mb-3 mt-auto">
          <span className="text-base font-bold text-charcoal dark:text-dark-text">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <>
              <span className="text-xs text-stone-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="text-xs font-semibold text-terracotta">
                ({product.discount}% OFF)
              </span>
            </>
          )}
        </div>

        {/* Color Swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 pt-2 border-t border-stone-100 dark:border-stone-800">
            {product.colors.map((color, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedColor(color)}
                className={`relative w-4 h-4 rounded-full transition-transform ${
                  selectedColor?.name === color.name
                    ? 'ring-2 ring-terracotta ring-offset-1 scale-110'
                    : 'opacity-75 hover:opacity-100'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            <span className="text-[11px] text-secondary-gray ml-auto">
              {product.sizes.length} sizes
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
