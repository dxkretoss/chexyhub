import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, ArrowRight } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { toast } from 'sonner';

export function QuickViewModal({ product, onClose }) {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(product.images[0] || product.thumbnail);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, {
      size: selectedSize,
      color: selectedColor?.name || product.colors[0]?.name,
      quantity: 1,
    });
    toast.success(`Added ${product.name} (Size: ${selectedSize}) to bag`);
    onClose();
  };

  const handleWishlistToggle = () => {
    const added = toggleWishlist(product);
    if (added) {
      toast.success('Saved to wishlist');
    } else {
      toast.info('Removed from wishlist');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#121212] text-black dark:text-white border border-black/10 dark:border-white/10 shadow-2xl p-6 sm:p-8 z-10 animate-fade-in no-scrollbar">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-black dark:hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 dark:bg-stone-900">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail navigation */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-14 aspect-[3/4] overflow-hidden border transition-all flex-shrink-0 ${
                    selectedImage === img
                      ? 'border-black dark:border-white'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info & Selectors */}
          <div className="flex flex-col space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 block mb-1">
                {product.collection}
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-normal">
                {product.name}
              </h2>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-base font-semibold">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xs text-stone-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-stone-600 dark:text-stone-300 font-light leading-relaxed line-clamp-3">
              {product.description}
            </p>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-wider">
                  <span className="font-bold">Color:</span>
                  <span className="text-stone-500">{selectedColor?.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((c, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(c)}
                      className={`w-4 h-4 rounded-full border transition-all ${
                        selectedColor?.name === c.name
                          ? 'border-black dark:border-white ring-2 ring-black/20 dark:ring-white/40 scale-110'
                          : 'border-black/20 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider block">
                Size:
              </span>

              {product.sizes.some((s) => s.length > 8) ? (
                <div className="grid grid-cols-1 gap-1.5">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`py-2 px-3 text-xs font-medium border transition-all text-left flex items-center justify-between ${
                        selectedSize === s
                          ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black font-semibold'
                          : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:border-black dark:hover:border-white'
                      }`}
                    >
                      <span className="line-clamp-1">{s}</span>
                      {selectedSize === s && (
                        <span className="w-1.5 h-1.5 rounded-full bg-current ml-2 flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`flex-1 min-w-[46px] py-2 px-2 text-xs font-semibold uppercase border transition-all text-center whitespace-nowrap ${
                        selectedSize === s
                          ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black'
                          : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:border-black dark:hover:border-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 space-y-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-[0.2em] transition-opacity hover:opacity-85"
              >
                Add to Bag
              </button>

              <div className="flex gap-2">
                <Link
                  to={`/product/${product.slug}`}
                  onClick={onClose}
                  className="flex-1 py-2.5 border border-black dark:border-white text-center text-[11px] font-bold uppercase tracking-wider hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  View Full Details
                </Link>
                <button
                  onClick={handleWishlistToggle}
                  className={`p-2.5 border border-black dark:border-white transition-colors ${
                    isFavorited ? 'bg-black text-white dark:bg-white dark:text-black' : 'hover:opacity-70'
                  }`}
                  title="Save to wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : 'fill-none'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
