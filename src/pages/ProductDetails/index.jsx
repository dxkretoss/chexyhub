import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Ruler,
  Share2,
  ChevronDown,
  ChevronUp,
  Maximize2
} from 'lucide-react';
import { useProductsStore } from '../../store/useProductsStore';
import { formatPrice } from '../../utils/formatters';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useRecentlyViewedStore } from '../../store/useRecentlyViewedStore';
import { SizeGuideModal } from '../../components/product/SizeGuideModal';
import { ProductCard } from '../../components/product/ProductCard';
import { SEO } from '../../components/common/SEO';
import { toast } from 'sonner';

export function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products: liveProducts, loading: isLoading } = useProductsStore();

  const product = liveProducts.find((p) => p.slug === slug || p.id === slug);

  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState({ name: 'Classic', hex: '#000' });
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images?.[0] || product.thumbnail || '');
      setSelectedSize(product.sizes?.[0] || 'M');
      setSelectedColor(product.colors?.[0] || { name: 'Classic', hex: '#000' });
    }
  }, [product]);

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState('composition'); // 'composition', 'fit', 'shipping'

  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { items: recentlyViewed, addRecentlyViewed } = useRecentlyViewedStore();

  const isFavorited = isInWishlist(product.id);

  // Sync state when product slug changes
  useEffect(() => {
    setSelectedImage(product.images[0]);
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0]);
    addRecentlyViewed(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product, addRecentlyViewed]);

  const handleAddToCart = () => {
    addItem(product, {
      size: selectedSize,
      color: selectedColor?.name || product.colors[0]?.name,
      quantity: 1,
    });
    toast.success(`Added ${product.name} (Size: ${selectedSize}) to bag`);
  };

  const handleWishlistToggle = () => {
    const added = toggleWishlist(product);
    if (added) {
      toast.success('Saved to wishlist');
    } else {
      toast.info('Removed from wishlist');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name || 'CHEXY HUB Shirt',
        text: `Check out the ${product?.name} at CHEXY HUB`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied to clipboard');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xs tracking-widest uppercase text-stone-500">
        Loading atelier silhouette...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 space-y-4">
        <h2 className="font-serif text-2xl">Piece Not Found</h2>
        <p className="text-xs text-stone-500 uppercase tracking-widest">
          This checkered shirt piece may have been updated or moved.
        </p>
        <Link to="/shop" className="px-6 py-2.5 bg-black text-white dark:bg-white dark:text-black text-xs uppercase tracking-widest font-bold">
          Return to Catalogue
        </Link>
      </div>
    );
  }

  const relatedProducts = liveProducts.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#0E0E0E] text-black dark:text-white transition-colors duration-300 min-h-screen">
      <SEO
        title={`${product.name} | CHEXY HUB`}
        description={product.description}
        image={product.images[0]}
      />

      <div className="pt-24 sm:pt-28 pb-24 px-4 sm:px-8 max-w-[1600px] mx-auto w-full">
        {/* Minimal Breadcrumb */}
        <nav className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 mb-8 flex items-center gap-2">
          <Link to="/" className="hover:text-black dark:hover:text-white transition-colors">
            CHEXY HUB
          </Link>
          <span>/</span>
          <Link to={`/${product.category}`} className="hover:text-black dark:hover:text-white transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-black dark:text-white truncate max-w-xs">
            {product.name}
          </span>
        </nav>

        {/* Main Product Layout: Left Gallery & Right Sticky Rail (Zara Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* ============ LEFT: EDITORIAL GALLERY ============ */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Gallery Header */}
            <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-white/10 text-xs font-bold uppercase tracking-widest">
              <span className="text-stone-400">Lookbook Imagery ({product.images.length} Views)</span>

              <button
                onClick={handleShare}
                className="p-1 text-stone-400 hover:text-black dark:hover:text-white transition-colors"
                title="Share piece"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Display Canvas: Lookbook */}
            <div className="flex flex-col-reverse md:flex-row gap-4">
              {/* Vertical Thumbnails */}
              <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto no-scrollbar max-h-[680px]">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-16 sm:w-20 aspect-[3/4] overflow-hidden border transition-all flex-shrink-0 ${
                      selectedImage === img
                        ? 'border-black dark:border-white'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Main Large Photograph */}
              <div className="relative flex-1 aspect-[3/4] overflow-hidden bg-stone-100 dark:bg-stone-900 group">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 cursor-zoom-in"
                  onClick={() => setIsLightboxOpen(true)}
                />
                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-black/80 text-black dark:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ============ RIGHT: MINIMAL PRODUCT RAIL (STICKY) ============ */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            {/* Title & Collection */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 block mb-1">
                {product.collection}
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-normal leading-snug">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-lg font-semibold tracking-wide">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xs text-stone-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-400 uppercase tracking-widest mt-1">
                MRP INCL. OF ALL TAXES
              </p>
            </div>

            {/* Description */}
            <p className="text-xs text-stone-600 dark:text-stone-300 font-light leading-relaxed">
              {product.description}
            </p>

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs uppercase tracking-wider">
                  <span className="font-bold">Color:</span>
                  <span className="text-stone-500">{selectedColor?.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(c)}
                      className={`w-5 h-5 rounded-full border transition-all ${
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
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between text-xs uppercase tracking-wider">
                <span className="font-bold">Size:</span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-stone-400 hover:text-black dark:hover:text-white transition-colors underline text-[11px]"
                >
                  Size Guide
                </button>
              </div>

              {product.sizes.some((s) => s.length > 8) ? (
                /* Multi-piece Family Combo / Custom Pack selector */
                <div className="grid grid-cols-1 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`py-2.5 px-3.5 text-xs font-medium tracking-wide border transition-all text-left flex items-center justify-between ${
                        selectedSize === s
                          ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black font-semibold'
                          : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-black dark:hover:border-white'
                      }`}
                    >
                      <span>{s}</span>
                      {selectedSize === s && (
                        <span className="w-1.5 h-1.5 rounded-full bg-current ml-2 flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                /* Compact Row-Wise Sizing (Kids, Men, Women) */
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`flex-1 min-w-[54px] sm:min-w-[60px] py-2.5 sm:py-3 px-2.5 text-xs font-semibold uppercase tracking-wider border transition-all text-center whitespace-nowrap ${
                        selectedSize === s
                          ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black shadow-sm'
                          : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-black dark:hover:border-white bg-white/40 dark:bg-stone-900/40'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Primary Actions (Zara Style) */}
            <div className="pt-4 space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-[0.22em] transition-opacity hover:opacity-85"
              >
                Add to Bag
              </button>

              <button
                onClick={handleWishlistToggle}
                className={`w-full py-3.5 border border-black dark:border-white text-center text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 ${
                  isFavorited
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : 'fill-none'}`} />
                <span>{isFavorited ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>

            {/* Minimal Accordion Information */}
            <div className="pt-6 border-t border-black/10 dark:border-white/10 divide-y divide-black/10 dark:divide-white/10 text-xs font-medium uppercase tracking-wider">
              {/* 1. Composition */}
              <div>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'composition' ? '' : 'composition')}
                  className="w-full py-4 flex items-center justify-between text-left hover:opacity-70"
                >
                  <span>Composition & Care</span>
                  {openAccordion === 'composition' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'composition' && (
                  <div className="pb-4 text-stone-500 normal-case space-y-1.5 font-light">
                    <p>• {product.specifications?.fabric || '100% Long-Staple Egyptian Cotton'}</p>
                    <p>• {product.specifications?.weave || 'Twill Weave with Peached Finish'}</p>
                    <p>• {product.specifications?.care || 'Machine wash cold at 30°C. Warm iron. Do not tumble dry.'}</p>
                  </div>
                )}
              </div>

              {/* 2. Fit & Measurements */}
              <div>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'fit' ? '' : 'fit')}
                  className="w-full py-4 flex items-center justify-between text-left hover:opacity-70"
                >
                  <span>Fit & Tailoring</span>
                  {openAccordion === 'fit' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'fit' && (
                  <div className="pb-4 text-stone-500 normal-case space-y-1.5 font-light">
                    <p>• Fit: {product.specifications?.fit || 'Tailored Modern Slim'}</p>
                    <p>• Collar: {product.specifications?.collar || 'Structured Button-Down'}</p>
                    <p>• Sleeves: {product.specifications?.sleeves || 'Full Sleeve with Adjustable Barrel Cuffs'}</p>
                  </div>
                )}
              </div>

              {/* 3. Shipping & Returns */}
              <div>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'shipping' ? '' : 'shipping')}
                  className="w-full py-4 flex items-center justify-between text-left hover:opacity-70"
                >
                  <span>Shipping & Returns</span>
                  {openAccordion === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'shipping' && (
                  <div className="pb-4 text-stone-500 normal-case space-y-1.5 font-light">
                    <p>• Complimentary express shipping on all prepaid orders.</p>
                    <p>• Doorstep delivery within 3–5 business days.</p>
                    <p>• 15-day complimentary exchange & return policy.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ============ RELATED EDITORIAL SELECTION ============ */}
        <section className="pt-24 mt-20 border-t border-black/10 dark:border-white/10">
          <div className="pb-6 mb-10 flex items-end justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 block mb-1">
                Curated Suggestions
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal">
                COMPLETE THE LOOK
              </h2>
            </div>
            <Link to={`/${product.category}`} className="btn-fashion-underline text-xs">
              View More Pieces →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 sm:gap-x-6 sm:gap-y-16">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <SizeGuideModal
          isOpen={isSizeGuideOpen}
          onClose={() => setIsSizeGuideOpen(false)}
          productCategory={product.category}
        />
      )}

      {/* Fullscreen Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setIsLightboxOpen(false)}
        >
          <img
            src={selectedImage}
            alt={product.name}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </div>
  );
}
