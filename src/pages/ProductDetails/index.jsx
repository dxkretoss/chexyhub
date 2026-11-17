import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  Ruler,
  Box,
  Image as ImageIcon,
  Share2,
  Check,
  ChevronRight,
  Maximize2,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { formatPrice } from '../../utils/formatters';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useRecentlyViewedStore } from '../../store/useRecentlyViewedStore';
import { ShirtCanvas } from '../../components/threeD/ShirtCanvas';
import { SizeGuideModal } from '../../components/product/SizeGuideModal';
import { ProductCard } from '../../components/product/ProductCard';
import { SEO } from '../../components/common/SEO';
import { toast } from 'sonner';

export function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];

  const [activeTab, setActiveTab] = useState('specs'); // 'specs', 'fabric', 'shipping', 'reviews'
  const [viewMode, setViewMode] = useState('photo'); // 'photo' or '3d'
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Reviews demo state
  const [reviewsList, setReviewsList] = useState([
    {
      name: 'Devansh K.',
      rating: 5,
      date: '2026-11-05',
      comment: 'The twill weave is so thick and sturdy yet silky smooth on the skin. Sizing is spot on according to the chart.',
      verified: true
    },
    {
      name: 'Ananya S.',
      rating: 5,
      date: '2026-10-22',
      comment: 'Wore this for an outdoor brunch and got tons of questions about where I got it. Definitely buying another colorway.',
      verified: true
    }
  ]);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewName, setNewReviewName] = useState('');

  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { items: recentlyViewed, addRecentlyViewed } = useRecentlyViewedStore();

  const isFavorited = isInWishlist(product.id);

  // Sync state when product slug changes
  useEffect(() => {
    setSelectedImage(product.images[0]);
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0]);
    setQuantity(1);
    setViewMode('photo');
    addRecentlyViewed(product);
  }, [product, addRecentlyViewed]);

  const handleAddToCart = () => {
    addItem(product, {
      size: selectedSize,
      color: selectedColor?.name || product.colors[0]?.name,
      quantity,
    });
    toast.success(`Added ${product.name} (${selectedSize}) to bag`);
  };

  const handleBuyNow = () => {
    addItem(product, {
      size: selectedSize,
      color: selectedColor?.name || product.colors[0]?.name,
      quantity,
    });
    navigate('/checkout');
  };

  const handleWishlistToggle = () => {
    const added = toggleWishlist(product);
    if (added) {
      toast.success('Added to wishlist');
    } else {
      toast.info('Removed from wishlist');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: `Check out this stylish checkered shirt: ${product.name} on CHEXY HUB!`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied to clipboard!');
    }
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewText.trim()) return;
    setReviewsList((prev) => [
      {
        name: newReviewName,
        rating: 5,
        date: new Date().toISOString().split('T')[0],
        comment: newReviewText,
        verified: true,
      },
      ...prev,
    ]);
    setNewReviewName('');
    setNewReviewText('');
    toast.success('Thank you! Your verified review has been published.');
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <>
      <SEO
        title={`${product.name} | CHEXY HUB`}
        description={product.description}
        image={product.images[0]}
      />

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-secondary-gray mb-8">
          <Link to="/" className="hover:text-terracotta transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to={`/${product.category}`} className="hover:text-terracotta capitalize transition-colors">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-charcoal dark:text-dark-text font-medium truncate max-w-xs">
            {product.name}
          </span>
        </nav>

        {/* Top Product Section: Left Visuals & Right Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* ============ LEFT: GALLERY & 3D STUDIO VIEWER ============ */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* View Mode Switcher: High-Res Photos vs Interactive 3D */}
            <div className="flex items-center justify-between">
              <div className="inline-flex p-1 rounded-2xl glass dark:glass-dark border border-stone-200 dark:border-stone-800 text-xs font-semibold">
                <button
                  onClick={() => setViewMode('photo')}
                  className={`px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
                    viewMode === 'photo'
                      ? 'bg-terracotta text-white shadow-sm'
                      : 'text-stone-700 dark:text-stone-300 hover:text-charcoal'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Lookbook Photography</span>
                </button>
                <button
                  onClick={() => setViewMode('3d')}
                  className={`px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
                    viewMode === '3d'
                      ? 'bg-terracotta text-white shadow-sm'
                      : 'text-stone-700 dark:text-stone-300 hover:text-charcoal'
                  }`}
                >
                  <Box className="w-4 h-4" />
                  <span>Interactive 3D Studio</span>
                </button>
              </div>

              <button
                onClick={handleShare}
                className="p-2.5 rounded-full glass dark:glass-dark text-stone-600 dark:text-stone-300 hover:text-terracotta transition-colors"
                title="Share this product"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Display Area: Photos or 3D */}
            {viewMode === 'photo' ? (
              <div className="flex flex-col-reverse md:flex-row gap-4">
                {/* Vertical Thumbnails */}
                <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto no-scrollbar max-h-[580px]">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-16 sm:w-20 aspect-[3/4] rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                        selectedImage === img
                          ? 'border-terracotta scale-105 shadow-md'
                          : 'border-transparent opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* Main Large Image */}
                <div className="relative flex-1 aspect-[3/4] rounded-3xl overflow-hidden bg-stone-100 dark:bg-stone-900 border border-stone-200/70 dark:border-stone-800 shadow-xl group">
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 cursor-zoom-in"
                    onClick={() => setIsLightboxOpen(true)}
                  />
                  <button
                    onClick={() => setIsLightboxOpen(true)}
                    className="absolute top-4 right-4 p-2.5 rounded-full glass dark:glass-dark text-stone-700 dark:text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:text-terracotta"
                    title="Fullscreen Lightbox"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* Interactive 3D Canvas */
              <div className="flex flex-col gap-2">
                <ShirtCanvas
                  modelConfig={product.model3D}
                  fallbackImage={product.thumbnail}
                  className="h-[520px] sm:h-[580px]"
                  autoRotateDefault={false}
                />
                <div className="flex items-center justify-between px-2 text-xs text-secondary-gray">
                  <span>360° Real-time Three.js Canvas Texture</span>
                  <Link
                    to={`/3d-studio?product=${product.slug}`}
                    className="text-terracotta font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>Open in Fullscreen 3D Studio</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* ============ RIGHT: PRODUCT PURCHASE CONTROLS ============ */}
          <div className="lg:col-span-5 flex flex-col">
            {/* Category & Badge */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-bold tracking-widest text-terracotta">
                {product.category} • {product.collection}
              </span>
              <span className="text-xs text-stone-400">SKU: {product.SKU}</span>
            </div>

            {/* Product Title */}
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal dark:text-dark-text mb-3 leading-snug">
              {product.name}
            </h1>

            {/* Rating & Review summary */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? 'fill-amber-500' : ''
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-charcoal dark:text-dark-text">
                {product.rating}
              </span>
              <span className="text-xs text-secondary-gray">
                ({product.reviewCount} verified reviews)
              </span>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-stone-100/70 dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 mb-6">
              <span className="text-3xl font-extrabold text-charcoal dark:text-dark-text">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-stone-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-terracotta/10 text-terracotta">
                    Save {product.discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Color Swatch Selector */}
            <div className="mb-6">
              <label className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-dark-text block mb-2.5">
                Color: <span className="text-terracotta font-medium">{selectedColor?.name}</span>
              </label>
              <div className="flex flex-wrap gap-2.5">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all ${
                      selectedColor?.name === color.name
                        ? 'border-terracotta bg-terracotta/5 text-terracotta ring-1 ring-terracotta'
                        : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-stone-400'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full shadow-inner"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector + Size Guide */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-dark-text">
                  Select Size
                </label>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs text-terracotta font-semibold hover:underline flex items-center gap-1"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size & Fit Guide</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-12 h-12 px-4 rounded-xl border text-xs font-bold transition-all ${
                      selectedSize === size
                        ? 'border-terracotta bg-terracotta text-white shadow-md'
                        : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-stone-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-2xl p-1 bg-white dark:bg-stone-900">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-sm font-bold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-charcoal dark:text-dark-text">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-sm font-bold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-terracotta hover:bg-terracotta-hover text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xl transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                {/* Wishlist */}
                <button
                  onClick={handleWishlistToggle}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    isFavorited
                      ? 'border-terracotta bg-terracotta/10 text-terracotta'
                      : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:text-terracotta'
                  }`}
                  title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-terracotta' : ''}`} />
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 px-6 rounded-2xl bg-charcoal dark:bg-ivory text-white dark:text-charcoal hover:bg-stone-800 dark:hover:bg-white font-semibold text-sm shadow-md transition-colors"
              >
                Instant Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="p-4 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-3 text-xs text-secondary-gray bg-stone-50/50 dark:bg-stone-900/50">
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-terracotta flex-shrink-0" />
                <span>
                  <strong>Free Express Shipping</strong> across India on prepaid orders
                </span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-4 h-4 text-terracotta flex-shrink-0" />
                <span>
                  <strong>15-Day Doorstep Returns</strong> & easy size exchanges
                </span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-terracotta flex-shrink-0" />
                <span>
                  <strong>100% Egyptian Cotton</strong> authenticated quality
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ============ LOWER SECTION: SPECIFICATIONS & REVIEWS TABS ============ */}
        <section className="mt-16 pt-12 border-t border-stone-200 dark:border-stone-800">
          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-4 overflow-x-auto no-scrollbar">
            {[
              { id: 'specs', label: 'Specifications & Fit' },
              { id: 'fabric', label: 'Fabric & Care Instructions' },
              { id: 'shipping', label: 'Shipping & 15-Day Policy' },
              { id: 'reviews', label: `Customer Reviews (${reviewsList.length + product.reviewCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-charcoal text-white dark:bg-ivory dark:text-charcoal shadow-sm'
                    : 'text-secondary-gray hover:text-charcoal dark:hover:text-dark-text'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Panes */}
          <div className="py-8">
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
                <div className="space-y-4 p-6 rounded-2xl glass dark:glass-dark border border-stone-200/60 dark:border-stone-800">
                  <h3 className="font-serif font-bold text-base text-charcoal dark:text-dark-text mb-4">
                    Product Architecture
                  </h3>
                  <div className="grid grid-cols-2 gap-y-3">
                    <span className="text-secondary-gray">Silhouetted Fit:</span>
                    <span className="font-semibold text-charcoal dark:text-dark-text">{product.specifications.fit}</span>
                    <span className="text-secondary-gray">Collar Construction:</span>
                    <span className="font-semibold text-charcoal dark:text-dark-text">{product.specifications.collar}</span>
                    <span className="text-secondary-gray">Sleeve Profile:</span>
                    <span className="font-semibold text-charcoal dark:text-dark-text">{product.specifications.sleeves}</span>
                    <span className="text-secondary-gray">Weave Type:</span>
                    <span className="font-semibold text-charcoal dark:text-dark-text">{product.specifications.weave}</span>
                  </div>
                </div>

                <div className="space-y-4 p-6 rounded-2xl glass dark:glass-dark border border-stone-200/60 dark:border-stone-800">
                  <h3 className="font-serif font-bold text-base text-charcoal dark:text-dark-text mb-4">
                    Fabric Origin & Detail
                  </h3>
                  <div className="grid grid-cols-2 gap-y-3">
                    <span className="text-secondary-gray">Raw Material:</span>
                    <span className="font-semibold text-charcoal dark:text-dark-text">{product.specifications.fabric}</span>
                    <span className="text-secondary-gray">Pattern Style:</span>
                    <span className="font-semibold text-charcoal dark:text-dark-text">{product.collection}</span>
                    <span className="text-secondary-gray">Buttons:</span>
                    <span className="font-semibold text-charcoal dark:text-dark-text">Natural Mother-of-Pearl</span>
                    <span className="text-secondary-gray">Seam Finishing:</span>
                    <span className="font-semibold text-charcoal dark:text-dark-text">Double-Needle French Felled</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'fabric' && (
              <div className="p-6 sm:p-8 rounded-3xl glass dark:glass-dark border border-stone-200/60 dark:border-stone-800 max-w-3xl space-y-4 text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                <h3 className="font-serif font-bold text-lg text-charcoal dark:text-dark-text mb-2">
                  Garment Care Recommendations
                </h3>
                <p className="leading-relaxed">
                  Our checkered shirts are crafted with long-staple yarns dyed before weaving. To preserve the vibrancy of the check pattern and the soft peached hand-feel, we recommend the following care:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-secondary-gray">
                  <li>Machine wash in cold water (maximum 30°C) with gentle detergent.</li>
                  <li>Wash dark colors and high-contrast tartans inside-out.</li>
                  <li>Do not use chlorine bleaches or harsh fabric softeners.</li>
                  <li>Line dry in shade to maintain fiber elasticity and collar shape.</li>
                  <li>Iron at warm setting while slightly damp for that crisp tailored finish.</li>
                </ul>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="p-6 sm:p-8 rounded-3xl glass dark:glass-dark border border-stone-200/60 dark:border-stone-800 max-w-3xl space-y-4 text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                <h3 className="font-serif font-bold text-lg text-charcoal dark:text-dark-text mb-2">
                  Shipping & Return Policy
                </h3>
                <p className="leading-relaxed">
                  We dispatch all orders within 24 hours of placement from our Mumbai fulfillment center. Deliveries to metro cities typically take 2-3 business days, while other locations arrive within 4-5 business days.
                </p>
                <p className="leading-relaxed">
                  Enjoy our <strong>15-day complimentary exchange and return window</strong>. If the fit isn’t absolutely perfect, simply request an exchange from your account dashboard, and our courier will pick it up right from your doorstep.
                </p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8">
                {/* Submit New Review Form */}
                <form
                  onSubmit={handleAddReview}
                  className="p-6 rounded-3xl glass dark:glass-dark border border-stone-200/60 dark:border-stone-800 max-w-2xl"
                >
                  <h4 className="font-serif font-bold text-base text-charcoal dark:text-dark-text mb-3">
                    Write a Verified Review
                  </h4>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      required
                      className="w-full text-xs p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-dark-text"
                    />
                    <textarea
                      placeholder="Share your experience regarding the fabric, fit, and pattern..."
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                      required
                      rows={3}
                      className="w-full text-xs p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-dark-text"
                    />
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold shadow-md transition-colors"
                    >
                      Post Review
                    </button>
                  </div>
                </form>

                {/* Review Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reviewsList.map((rev, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-2xl glass dark:glass-dark border border-stone-200/60 dark:border-stone-800 text-xs"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-charcoal dark:text-dark-text">
                          {rev.name}
                        </span>
                        <div className="flex text-amber-500">
                          {[...Array(rev.rating)].map((_, idx) => (
                            <Star key={idx} className="w-3.5 h-3.5 fill-amber-500" />
                          ))}
                        </div>
                      </div>
                      <p className="text-secondary-gray leading-relaxed mb-2">
                        "{rev.comment}"
                      </p>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                        <Check className="w-3 h-3" /> Verified Purchase
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ============ RELATED PRODUCTS ============ */}
        <section className="mt-16 pt-12 border-t border-stone-200 dark:border-stone-800">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal dark:text-dark-text mb-8">
            Complete The Look & Related Checks
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* ============ RECENTLY VIEWED PRODUCTS ============ */}
        {recentlyViewed.length > 1 && (
          <section className="mt-16 pt-12 border-t border-stone-200 dark:border-stone-800">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal dark:text-dark-text mb-6">
              Recently Viewed
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {recentlyViewed
                .filter((p) => p.id !== product.id)
                .map((item) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.slug}`}
                    className="w-48 flex-shrink-0 p-3 rounded-2xl glass dark:glass-dark hover:border-terracotta border border-stone-200/60 dark:border-stone-800 transition-all group"
                  >
                    <div className="aspect-[3/4] rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 mb-2">
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h4 className="text-xs font-semibold line-clamp-1 group-hover:text-terracotta transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs font-bold text-charcoal dark:text-dark-text mt-1">
                      {formatPrice(item.price)}
                    </p>
                  </Link>
                ))}
            </div>
          </section>
        )}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <img
            src={selectedImage}
            alt={product.name}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <SizeGuideModal
          product={product}
          onClose={() => setIsSizeGuideOpen(false)}
        />
      )}
    </>
  );
}
