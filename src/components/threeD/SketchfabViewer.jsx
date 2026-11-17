import React, { useState } from 'react';
import { Maximize2, Minimize2, RotateCcw, Sparkles, Layers } from 'lucide-react';

export const SKETCHFAB_SHIRT_MODELS = [
  {
    id: 'shirt2-reference',
    name: 'Atelier Linen Button Shirt (User Ref)',
    sketchfabId: 'fab8adc04eb540919a7b25184f4b6162',
    tag: 'Editorial Reference',
    description: 'Realistic tailored button-front shirt with natural linen creases, Mandarin collar, and front placket buttons.',
  },
  {
    id: 'men-full-sleeve-checked',
    name: 'Highland Blue Checked Oxford',
    sketchfabId: '98adb75cdf5645e782c1f703c21809e9',
    tag: 'Classic Check',
    description: 'Full-sleeve tailored checked shirt with structured collar, chest pocket, and authentic yarn-dyed tartan pattern.',
  },
  {
    id: 'men-short-sleeve-checked',
    name: 'Summer Madras Short Sleeve',
    sketchfabId: 'd0382cb7247043de89cfea0c0ca1c94a',
    tag: 'Short Sleeve Check',
    description: 'Breezy short-sleeve check shirt with dual flap pockets and casual resort silhouette.',
  },
];

export function SketchfabViewer({
  modelId = 'fab8adc04eb540919a7b25184f4b6162',
  className = 'h-[520px] sm:h-[620px]',
  showModelSwitcher = true,
  onModelChange,
}) {
  const [currentModelId, setCurrentModelId] = useState(modelId);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = React.useRef(null);

  const handleSelectModel = (id) => {
    setCurrentModelId(id);
    setIsLoading(true);
    if (onModelChange) {
      onModelChange(id);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const reloadIframe = () => {
    setIsLoading(true);
    const iframe = containerRef.current?.querySelector('iframe');
    if (iframe) {
      iframe.src = iframe.src;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className} rounded-3xl overflow-hidden bg-stone-900 border border-stone-200/60 dark:border-stone-800/80 shadow-2xl flex flex-col group`}
    >
      {/* Top Floating Glass Bar */}
      <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
        {/* Left: Quality Badge & Model Selector */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="glass-pill px-3 py-1.5 rounded-full flex items-center gap-2 shadow-glass text-xs font-semibold text-charcoal dark:text-white">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden sm:inline">Photorealistic 3D Model</span>
            <span className="sm:hidden">3D Model</span>
          </div>

          {showModelSwitcher && (
            <div className="hidden md:flex items-center gap-1 glass-pill p-1 rounded-full text-xs">
              {SKETCHFAB_SHIRT_MODELS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleSelectModel(m.sketchfabId)}
                  className={`px-3 py-1 rounded-full transition-all font-medium ${
                    currentModelId === m.sketchfabId
                      ? 'bg-terracotta text-white shadow-sm'
                      : 'text-stone-700 dark:text-stone-300 hover:text-charcoal dark:hover:text-white'
                  }`}
                  title={m.description}
                >
                  {m.tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Controls (Reload, Fullscreen) */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={reloadIframe}
            className="p-2 rounded-full glass-pill text-charcoal dark:text-white hover:bg-white/80 dark:hover:bg-stone-800 transition-all shadow-glass"
            title="Reset 3D Camera"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-full glass-pill text-charcoal dark:text-white hover:bg-white/80 dark:hover:bg-stone-800 transition-all shadow-glass"
            title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-stone-900/90 backdrop-blur-sm text-white">
          <div className="w-12 h-12 border-4 border-terracotta/30 border-t-terracotta rounded-full animate-spin mb-4" />
          <p className="font-serif text-lg font-bold">Loading 3D Fashion Asset...</p>
          <p className="text-xs text-stone-400 mt-1">
            Rendering high-detail fabric, wrinkles, and stitching
          </p>
        </div>
      )}

      {/* Sketchfab 3D Model Embed Iframe */}
      <iframe
        title="CHEXY HUB 3D Shirt Model"
        src={`https://sketchfab.com/models/${currentModelId}/embed?autostart=1&internal=1&tracking=0&ui_infos=0&ui_watermark=0&ui_help=0&ui_settings=0&ui_inspector=0&ui_annotations=0&ui_ar=0&ui_hint=0`}
        className="w-full h-full border-0"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        onLoad={() => setIsLoading(false)}
      />

      {/* Bottom Floating Hint */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="glass-pill px-4 py-1.5 rounded-full text-[11px] font-medium text-stone-700 dark:text-stone-300 shadow-glass border border-white/40 dark:border-stone-700">
          Click & Drag to Rotate 360° • Scroll to Zoom
        </div>
      </div>
    </div>
  );
}
