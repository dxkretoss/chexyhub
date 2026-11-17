import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Box,
  Sliders,
  Palette,
  ShoppingBag,
  RotateCcw,
  Sparkles,
  Check,
  ArrowRight,
  Layers,
  Scissors
} from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ShirtCanvas } from '../../components/threeD/ShirtCanvas';
import { SKETCHFAB_SHIRT_MODELS } from '../../components/threeD/SketchfabViewer';
import { formatPrice } from '../../utils/formatters';
import { useCartStore } from '../../store/useCartStore';
import { SEO } from '../../components/common/SEO';
import { toast } from 'sonner';

export function Studio3D() {
  const [searchParams] = useSearchParams();
  const productSlug = searchParams.get('product');

  const initialProduct =
    PRODUCTS.find((p) => p.slug === productSlug) || PRODUCTS[0];

  const [selectedProduct, setSelectedProduct] = useState(initialProduct);

  // Custom 3D parameters
  const [patternType, setPatternType] = useState(
    initialProduct.model3D?.pattern || 'tartan'
  );
  const [primaryColor, setPrimaryColor] = useState(
    initialProduct.model3D?.primaryColor || '#B74737'
  );
  const [secondaryColor, setSecondaryColor] = useState(
    initialProduct.model3D?.secondaryColor || '#1C2841'
  );
  const [accentColor, setAccentColor] = useState(
    initialProduct.model3D?.accentColor || '#EDE7DC'
  );
  const [gridScale, setGridScale] = useState(
    initialProduct.model3D?.gridScale || 12
  );
  const [collarType, setCollarType] = useState(
    initialProduct.model3D?.collarType || 'button-down'
  );
  const [sleeveLength, setSleeveLength] = useState('long');
  const [selectedSize, setSelectedSize] = useState(initialProduct.sizes[0]);
  const [sketchfabModelId, setSketchfabModelId] = useState('fab8adc04eb540919a7b25184f4b6162');

  const { addItem } = useCartStore();

  useEffect(() => {
    if (productSlug) {
      const match = PRODUCTS.find((p) => p.slug === productSlug);
      if (match) {
        setSelectedProduct(match);
        setPatternType(match.model3D?.pattern || 'tartan');
        setPrimaryColor(match.model3D?.primaryColor || '#B74737');
        setSecondaryColor(match.model3D?.secondaryColor || '#1C2841');
        setAccentColor(match.model3D?.accentColor || '#EDE7DC');
        setGridScale(match.model3D?.gridScale || 12);
        setCollarType(match.model3D?.collarType || 'button-down');
        setSelectedSize(match.sizes[0]);
      }
    }
  }, [productSlug]);

  const handleProductSelect = (prod) => {
    setSelectedProduct(prod);
    setPatternType(prod.model3D?.pattern || 'tartan');
    setPrimaryColor(prod.model3D?.primaryColor || '#B74737');
    setSecondaryColor(prod.model3D?.secondaryColor || '#1C2841');
    setAccentColor(prod.model3D?.accentColor || '#EDE7DC');
    setGridScale(prod.model3D?.gridScale || 12);
    setCollarType(prod.model3D?.collarType || 'button-down');
    setSelectedSize(prod.sizes[0]);
  };

  const handleAddToCart = () => {
    addItem(selectedProduct, {
      size: selectedSize,
      color: `Custom 3D: ${patternType.toUpperCase()} (${primaryColor})`,
      quantity: 1,
    });
    toast.success(
      `Added custom 3D styled ${selectedProduct.name} to your shopping bag!`
    );
  };

  const handleResetToDefault = () => {
    if (selectedProduct.model3D) {
      setPatternType(selectedProduct.model3D.pattern);
      setPrimaryColor(selectedProduct.model3D.primaryColor);
      setSecondaryColor(selectedProduct.model3D.secondaryColor);
      setAccentColor(selectedProduct.model3D.accentColor);
      setGridScale(selectedProduct.model3D.gridScale);
      setCollarType(selectedProduct.model3D.collarType);
      setSleeveLength('long');
      toast.info('Reset to original garment specifications');
    }
  };

  const modelConfig = {
    pattern: patternType,
    primaryColor,
    secondaryColor,
    accentColor,
    gridScale,
    collarType,
    sleeveLength,
  };

  return (
    <>
      <SEO
        title="Interactive 3D Check Shirt Studio | CHEXY HUB"
        description="Explore, inspect, rotate 360°, and customize checkered shirts in our high-definition interactive 3D studio."
      />

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b border-stone-200 dark:border-stone-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-bold uppercase tracking-wider mb-2">
              <Box className="w-3.5 h-3.5" />
              <span>Real-Time WebGL 3D Studio</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal dark:text-dark-text">
              Check Fashion Studio
            </h1>
            <p className="text-xs sm:text-sm text-secondary-gray mt-2">
              Inspect yarn weaving, experiment with checkered geometries, and rotate in 360° space.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <button
              onClick={handleResetToDefault}
              className="px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 text-xs font-semibold text-secondary-gray hover:text-charcoal dark:hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Settings</span>
            </button>
          </div>
        </div>

        {/* Studio Workspace: Left 3D Canvas & Right Customization Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main 3D Viewport */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <ShirtCanvas
              modelConfig={modelConfig}
              fallbackImage={selectedProduct.thumbnail}
              className="h-[520px] sm:h-[620px]"
              autoRotateDefault={false}
              sketchfabModelId={sketchfabModelId}
              defaultViewMode="photorealistic"
            />

            {/* Product Selector Thumbnails */}
            <div className="p-4 rounded-2xl glass dark:glass-dark border border-stone-200/80 dark:border-stone-800">
              <label className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-dark-text block mb-3">
                Load Shirt From Catalogue
              </label>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                {PRODUCTS.slice(0, 10).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleProductSelect(p)}
                    className={`flex items-center gap-2 p-2 rounded-xl border transition-all flex-shrink-0 text-left ${
                      selectedProduct.id === p.id
                        ? 'border-terracotta bg-terracotta/5 ring-1 ring-terracotta'
                        : 'border-stone-200 dark:border-stone-700 hover:border-stone-400'
                    }`}
                  >
                    <img
                      src={p.thumbnail}
                      alt={p.name}
                      className="w-10 h-12 object-cover rounded-lg"
                    />
                    <div className="w-28 truncate">
                      <p className="text-xs font-bold text-charcoal dark:text-dark-text truncate">
                        {p.name}
                      </p>
                      <p className="text-[10px] text-terracotta font-semibold">
                        {formatPrice(p.price)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Customization Control Panel */}
          <div className="lg:col-span-4 p-6 rounded-3xl glass dark:glass-dark border border-stone-200/80 dark:border-stone-800 space-y-6 shadow-xl">
            {/* Active Product Title & Price */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-terracotta">
                {selectedProduct.category} • {selectedProduct.collection}
              </span>
              <h2 className="font-serif text-xl font-bold text-charcoal dark:text-dark-text mt-0.5">
                {selectedProduct.name}
              </h2>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-black text-charcoal dark:text-dark-text">
                  {formatPrice(selectedProduct.price)}
                </span>
                <span className="text-xs text-stone-400 line-through">
                  {formatPrice(selectedProduct.originalPrice)}
                </span>
              </div>
            </div>

            {/* Curated 3D Models Selector (Including User's Reference) */}
            <div className="p-4 rounded-2xl bg-stone-100/70 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-700/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-dark-text flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-terracotta" />
                  <span>3D Realistic Model</span>
                </label>
                <span className="text-[10px] text-terracotta font-semibold">User Reference</span>
              </div>
              <div className="space-y-1.5">
                {SKETCHFAB_SHIRT_MODELS.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setSketchfabModelId(model.sketchfabId)}
                    className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                      sketchfabModelId === model.sketchfabId
                        ? 'border-terracotta bg-white dark:bg-stone-900 shadow-sm ring-1 ring-terracotta'
                        : 'border-stone-200 dark:border-stone-700 bg-white/60 dark:bg-stone-900/60 hover:border-stone-400'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <span className="block text-xs font-bold text-charcoal dark:text-dark-text truncate">
                        {model.name}
                      </span>
                      <span className="block text-[10px] text-secondary-gray truncate">
                        {model.tag}
                      </span>
                    </div>
                    {sketchfabModelId === model.sketchfabId && (
                      <Check className="w-4 h-4 text-terracotta flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Pattern Weave Switcher */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-dark-text block mb-2.5">
                Pattern Architecture
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                {[
                  { id: 'tartan', label: 'Tartan' },
                  { id: 'buffalo', label: 'Buffalo' },
                  { id: 'gingham', label: 'Gingham' },
                  { id: 'windowpane', label: 'Windowpane' },
                  { id: 'madras', label: 'Madras' },
                ].map((pat) => (
                  <button
                    key={pat.id}
                    onClick={() => setPatternType(pat.id)}
                    className={`py-2 px-2.5 rounded-xl border capitalize transition-all ${
                      patternType === pat.id
                        ? 'border-terracotta bg-terracotta text-white shadow-sm font-bold'
                        : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-stone-400'
                    }`}
                  >
                    {pat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette Switchers */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-dark-text block">
                Yarn Colors
              </label>

              {/* Primary Yarn */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-secondary-gray font-medium">Primary Yarn:</span>
                <div className="flex items-center gap-2">
                  {['#B74737', '#1C2841', '#171717', '#1E3F20', '#8EADC2'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setPrimaryColor(c)}
                      className={`w-6 h-6 rounded-full border-2 transition-transform ${
                        primaryColor === c ? 'scale-125 border-terracotta' : 'border-white'
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              {/* Secondary Yarn */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-secondary-gray font-medium">Intersecting Check:</span>
                <div className="flex items-center gap-2">
                  {['#1C2841', '#F7F5F0', '#B74737', '#EDE7DC', '#3E2723'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setSecondaryColor(c)}
                      className={`w-6 h-6 rounded-full border-2 transition-transform ${
                        secondaryColor === c ? 'scale-125 border-terracotta' : 'border-white'
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Grid Scale Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-dark-text">
                  Check Grid Density
                </label>
                <span className="text-xs font-bold text-terracotta">{gridScale}x</span>
              </div>
              <input
                type="range"
                min="6"
                max="24"
                step="2"
                value={gridScale}
                onChange={(e) => setGridScale(Number(e.target.value))}
                className="w-full accent-terracotta cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-secondary-gray">
                <span>Bold Oversized</span>
                <span>Micro Gingham</span>
              </div>
            </div>

            {/* Collar Style */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-dark-text block mb-2">
                Collar Architecture
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'button-down', label: 'Button-Down' },
                  { id: 'spread', label: 'Spread' },
                  { id: 'camp', label: 'Camp Collar' },
                ].map((col) => (
                  <button
                    key={col.id}
                    onClick={() => setCollarType(col.id)}
                    className={`py-2 px-2 rounded-xl border font-semibold transition-all ${
                      collarType === col.id
                        ? 'border-terracotta bg-terracotta text-white shadow-sm'
                        : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    {col.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sleeve Profile */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-dark-text block mb-2">
                Sleeve Profile
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                <button
                  onClick={() => setSleeveLength('long')}
                  className={`py-2 px-3 rounded-xl border transition-all ${
                    sleeveLength === 'long'
                      ? 'border-terracotta bg-terracotta text-white shadow-sm'
                      : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  Full Sleeve (Cuffed)
                </button>
                <button
                  onClick={() => setSleeveLength('short')}
                  className={`py-2 px-3 rounded-xl border transition-all ${
                    sleeveLength === 'short'
                      ? 'border-terracotta bg-terracotta text-white shadow-sm'
                      : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  Short Sleeve (Resort)
                </button>
              </div>
            </div>

            {/* Size Choice */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-dark-text block mb-2">
                Choose Size
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`min-w-10 h-10 px-2 rounded-xl border text-xs font-bold transition-all ${
                      selectedSize === s
                        ? 'border-terracotta bg-terracotta text-white shadow-sm'
                        : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-stone-200 dark:border-stone-800 space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 rounded-2xl bg-terracotta hover:bg-terracotta-hover text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xl transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Styled Shirt to Bag</span>
              </button>

              <Link
                to={`/product/${selectedProduct.slug}`}
                className="w-full py-3 rounded-xl border border-stone-200 dark:border-stone-700 text-xs font-semibold text-charcoal dark:text-dark-text hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>View Standard Product Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
