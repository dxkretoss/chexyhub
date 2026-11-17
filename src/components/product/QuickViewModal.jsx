import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Star, Heart, ShoppingBag, Box, Check, ShieldCheck, RefreshCw } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { toast } from 'sonner';

export function QuickViewModal({ product, onClose }) {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(product.images[0] || product.thumbnail);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);

  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, {
      size: selectedSize,
      color: selectedColor?.name || product.colors[0]?.name,
      quantity,
    });
    toast.success(`Added ${product.name} to cart`);
    onClose();
  };

  const handleWishlistToggle = () => {
    const added = toggleWishlist(product);
    if (added) {
      toast.success('Added to wishlist');
    } else {
      toast.info('Removed from wishlist');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl glass-megamenu border border-white/80 dark:border-white/10 shadow-2xl p-6 md:p-8 z-10 animate-fade-in no-scrollbar backdrop-blur-3xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full glass dark:glass-dark text-stone-500 hover:text-charcoal dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-900 border border-stone-200/50 dark:border-stone-800">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <Link
                to={`/3d-studio?product=${product.slug}`}
                onClick={onClose}
                className="absolute bottom-4 left-4 glass dark:glass-dark px-3 py-1.5 rounded-full text-xs font-medium text-charcoal dark:text-dark-text flex items-center gap-1.5 hover:text-terracotta shadow-md transition-colors"
              >
                <Box className="w-4 h-4 text-terracotta" />
                <span>View in 3D Studio</span>
              </Link>
            </div>

            {/* Thumbnail navigation */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImage === img
                      ? 'border-terracotta scale-105'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info & Selectors */}
          <div className="flex flex-col">
            <span className="text-xs uppercase font-bold tracking-wider text-terracotta mb-1">
              {product.category} • {product.collection}
            </span>
            <h2 className="text-2xl font-serif font-bold text-charcoal dark:text-dark-text mb-2">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? 'fill-amber-500' : ''
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-charcoal dark:text-dark-text">
                {product.rating}
              </span>
              <span className="text-xs text-secondary-gray">
                ({product.reviewCount} customer reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 pb-4 border-b border-stone-200 dark:border-dark-border">
              <span className="text-2xl font-bold text-charcoal dark:text-dark-text">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-base text-stone-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-sm font-semibold text-terracotta">
                    Save {product.discount}%
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-stone-600 dark:text-stone-300 mt-4 leading-relaxed line-clamp-3">
              {product.description}
            </p>

            {/* Color Swatches */}
            <div className="mt-5">
              <label className="text-xs font-semibold text-charcoal dark:text-dark-text block mb-2">
                Color: <span className="font-normal text-secondary-gray">{selectedColor?.name}</span>
              </label>
              <div className="flex items-center gap-2">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                      selectedColor?.name === color.name
                        ? 'border-terracotta bg-terracotta/5 text-terracotta ring-1 ring-terracotta'
                        : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full shadow-inner"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mt-5">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-charcoal dark:text-dark-text">
                  Select Size
                </label>
                <Link
                  to={`/product/${product.slug}`}
                  onClick={onClose}
                  className="text-xs text-terracotta hover:underline"
                >
                  View Size Guide
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-10 h-10 px-3 rounded-xl border text-xs font-bold transition-all ${
                      selectedSize === size
                        ? 'border-terracotta bg-terracotta text-white shadow-sm'
                        : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-stone-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center rounded-xl border border-stone-200 dark:border-stone-700 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg text-base"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-sm text-charcoal dark:text-dark-text">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg text-base"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 px-6 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleWishlistToggle}
                className={`p-3 rounded-xl border transition-colors ${
                  isFavorited
                    ? 'border-terracotta bg-terracotta/10 text-terracotta'
                    : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:text-terracotta'
                }`}
                title={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-terracotta' : ''}`} />
              </button>
            </div>

            {/* View Full Product Link */}
            <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-between items-center">
              <Link
                to={`/product/${product.slug}`}
                onClick={onClose}
                className="text-xs font-semibold text-terracotta hover:underline flex items-center gap-1"
              >
                <span>View Full Product Details & Specifications</span>
                <span>→</span>
              </Link>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>{product.stockStatus}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
