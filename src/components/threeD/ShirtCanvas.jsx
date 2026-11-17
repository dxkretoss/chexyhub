import React, { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { ShirtGeometry } from './ShirtGeometry';
import { SketchfabViewer } from './SketchfabViewer';
import {
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  RefreshCw,
  Sparkles,
  Layers,
  Box,
} from 'lucide-react';

// Error Boundary for WebGL fallback
class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error('Three.js Canvas Error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export function ShirtCanvas({
  modelConfig = {
    pattern: 'tartan',
    primaryColor: '#B74737',
    secondaryColor: '#1C2841',
    accentColor: '#EDE7DC',
    gridScale: 12,
    collarType: 'button-down',
  },
  fallbackImage,
  showControls = true,
  interactive = true,
  autoRotateDefault = false,
  className = 'h-[520px] sm:h-[620px]',
  sketchfabModelId = 'fab8adc04eb540919a7b25184f4b6162',
  defaultViewMode = 'photorealistic', // 'photorealistic' | 'procedural'
  onCustomize,
}) {
  const [viewMode, setViewMode] = useState(defaultViewMode);
  const controlsRef = useRef(null);
  const containerRef = useRef(null);
  const [autoRotate, setAutoRotate] = useState(autoRotateDefault);
  const [bgTheme, setBgTheme] = useState('studio'); // 'studio', 'ivory', 'dark', 'sand'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeView, setActiveView] = useState('front');

  // Background gradient map
  const bgColors = {
    studio: 'from-stone-100 to-stone-200 dark:from-stone-900 dark:to-stone-950',
    ivory: 'from-[#FAF8F5] to-[#EDE7DC] dark:from-[#171717] dark:to-[#111111]',
    dark: 'from-[#191919] to-[#0A0A0A]',
    sand: 'from-[#F3ECE1] to-[#E3D6C4] dark:from-[#25201B] dark:to-[#15120F]',
  };

  const handleZoom = (delta) => {
    if (!controlsRef.current) return;
    const currentDistance = controlsRef.current.getDistance();
    const newDistance = Math.max(2.0, Math.min(6.5, currentDistance + delta));
    controlsRef.current.object.position.multiplyScalar(newDistance / currentDistance);
    controlsRef.current.update();
  };

  const handleSetView = (view) => {
    if (!controlsRef.current) return;
    setActiveView(view);
    setAutoRotate(false);
    const camera = controlsRef.current.object;
    if (view === 'front') {
      camera.position.set(0, 0.2, 3.6);
    } else if (view === 'back') {
      camera.position.set(0, 0.2, -3.6);
    } else if (view === 'side') {
      camera.position.set(3.6, 0.2, 0);
    } else if (view === 'collar') {
      camera.position.set(0, 1.3, 1.8);
    }
    controlsRef.current.target.set(0, 0.2, 0);
    controlsRef.current.update();
  };

  const handleReset = () => {
    if (!controlsRef.current) return;
    controlsRef.current.reset();
    controlsRef.current.object.position.set(0, 0.2, 3.6);
    controlsRef.current.target.set(0, 0.2, 0);
    controlsRef.current.update();
    setActiveView('front');
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const fallbackUI = (
    <div className={`relative w-full ${className} flex flex-col items-center justify-center bg-stone-100 dark:bg-stone-900 rounded-3xl p-6 text-center overflow-hidden`}>
      {fallbackImage ? (
        <img
          src={fallbackImage}
          alt="Product 3D Preview"
          className="max-h-[80%] max-w-[80%] object-contain rounded-2xl shadow-xl transition-transform duration-500 hover:scale-105"
        />
      ) : (
        <div className="w-48 h-48 rounded-2xl bg-terracotta/10 flex items-center justify-center text-terracotta">
          <Sparkles className="w-12 h-12" />
        </div>
      )}
      <div className="mt-4">
        <p className="text-sm font-semibold text-charcoal dark:text-dark-text">3D Preview Mode</p>
        <p className="text-xs text-secondary-gray mt-1">WebGL is unavailable. Showing high-resolution photography view.</p>
      </div>
    </div>
  );

  return (
    <div className="relative w-full flex flex-col gap-2">
      {/* 3D Mode Switcher Header Pill */}
      <div className="flex items-center justify-between px-1">
        <div className="inline-flex p-1 rounded-2xl glass dark:glass-dark border border-stone-200/80 dark:border-stone-800 shadow-sm text-xs font-semibold">
          <button
            onClick={() => setViewMode('photorealistic')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              viewMode === 'photorealistic'
                ? 'bg-terracotta text-white shadow-sm font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:text-charcoal dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Photorealistic 3D Model</span>
          </button>
          <button
            onClick={() => setViewMode('procedural')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              viewMode === 'procedural'
                ? 'bg-terracotta text-white shadow-sm font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:text-charcoal dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Weave 3D</span>
          </button>
        </div>

        <span className="text-[11px] text-secondary-gray hidden sm:inline">
          {viewMode === 'photorealistic'
            ? 'Official 3D Model: Linen/Cotton Button Shirt'
            : 'Customizable procedural check weave'}
        </span>
      </div>

      {/* Main Viewport Container */}
      {viewMode === 'photorealistic' ? (
        <SketchfabViewer
          modelId={sketchfabModelId}
          className={className}
          showModelSwitcher={true}
        />
      ) : (
        <CanvasErrorBoundary fallback={fallbackUI}>
          <div
            ref={containerRef}
            className={`relative w-full ${className} rounded-3xl overflow-hidden bg-gradient-to-br ${bgColors[bgTheme]} transition-colors duration-500 shadow-xl border border-stone-200/60 dark:border-stone-800/60 select-none group`}
          >
            {/* Top Floating Badge & Background Switcher */}
            <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
              <div className="glass-pill px-3 py-1.5 rounded-full flex items-center space-x-2 shadow-sm text-xs font-medium text-charcoal dark:text-dark-text">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Tailored Check Studio</span>
              </div>
              
              <div className="hidden sm:flex items-center space-x-1 glass-pill p-1 rounded-full text-xs">
                {['studio', 'ivory', 'dark', 'sand'].map((theme) => (
                  <button
                    key={theme}
                    onClick={() => setBgTheme(theme)}
                    className={`px-2.5 py-1 rounded-full capitalize transition-all ${
                      bgTheme === theme
                        ? 'bg-terracotta text-white shadow-sm'
                        : 'text-stone-600 dark:text-stone-300 hover:text-charcoal'
                    }`}
                    title={`Switch to ${theme} backdrop`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>

            {/* Top Right Controls: Fullscreen & Auto-Rotate */}
            <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`p-2 rounded-full glass-pill text-xs transition-all shadow-sm ${
                  autoRotate ? 'bg-terracotta text-white ring-2 ring-terracotta/40' : 'text-charcoal dark:text-dark-text hover:bg-stone-200/50'
                }`}
                title={autoRotate ? 'Stop Rotation' : 'Auto Rotate 360°'}
              >
                <RefreshCw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} />
              </button>

              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-full glass-pill text-charcoal dark:text-dark-text hover:bg-stone-200/50 shadow-sm transition-all"
                title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>

            {/* 3D Canvas Viewport */}
            <Canvas
              shadows
              camera={{ position: [0, 0.2, 3.6], fov: 42 }}
              className="cursor-grab active:cursor-grabbing w-full h-full"
            >
              <ambientLight intensity={0.85} />
              <directionalLight
                position={[4, 8, 5]}
                intensity={1.3}
                castShadow
                shadow-mapSize={[1024, 1024]}
              />
              <directionalLight position={[-4, 4, -4]} intensity={0.6} />
              <directionalLight position={[0, -2, 3]} intensity={0.35} />

              <Suspense fallback={null}>
                <ShirtGeometry
                  patternType={modelConfig.pattern || 'tartan'}
                  primaryColor={modelConfig.primaryColor || '#B74737'}
                  secondaryColor={modelConfig.secondaryColor || '#1C2841'}
                  accentColor={modelConfig.accentColor || '#EDE7DC'}
                  gridScale={modelConfig.gridScale || 12}
                  collarType={modelConfig.collarType || 'button-down'}
                  sleeveLength={modelConfig.sleeveLength || 'long'}
                />
                <ContactShadows
                  position={[0, -1.0, 0]}
                  opacity={0.5}
                  scale={6}
                  blur={2.2}
                  far={4}
                />
              </Suspense>

              <OrbitControls
                ref={controlsRef}
                enabled={interactive}
                enablePan={false}
                enableZoom={interactive}
                minDistance={2.0}
                maxDistance={6.0}
                minPolarAngle={Math.PI / 4.5}
                maxPolarAngle={Math.PI / 1.7}
                autoRotate={autoRotate}
                autoRotateSpeed={2.0}
                dampingFactor={0.06}
              />
            </Canvas>

            {/* Bottom Floating Control Dock */}
            {showControls && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center space-x-1.5 glass-card px-3 py-2 rounded-2xl shadow-glass border border-white/40 dark:border-stone-800 backdrop-blur-md">
                {/* View presets */}
                <div className="flex items-center space-x-1 pr-2 border-r border-stone-300 dark:border-stone-700">
                  <button
                    onClick={() => handleSetView('front')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                      activeView === 'front'
                        ? 'bg-terracotta text-white shadow-sm'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200/50 dark:hover:bg-stone-800'
                    }`}
                  >
                    Front
                  </button>
                  <button
                    onClick={() => handleSetView('back')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                      activeView === 'back'
                        ? 'bg-terracotta text-white shadow-sm'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200/50 dark:hover:bg-stone-800'
                    }`}
                  >
                    Back
                  </button>
                  <button
                    onClick={() => handleSetView('side')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                      activeView === 'side'
                        ? 'bg-terracotta text-white shadow-sm'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200/50 dark:hover:bg-stone-800'
                    }`}
                  >
                    Side
                  </button>
                  <button
                    onClick={() => handleSetView('collar')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                      activeView === 'collar'
                        ? 'bg-terracotta text-white shadow-sm'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200/50 dark:hover:bg-stone-800'
                    }`}
                  >
                    Collar
                  </button>
                </div>

                {/* Zoom buttons */}
                <div className="flex items-center space-x-1 pl-1">
                  <button
                    onClick={() => handleZoom(-0.5)}
                    className="p-1.5 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-200/50 dark:hover:bg-stone-800 transition-colors"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleZoom(0.5)}
                    className="p-1.5 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-200/50 dark:hover:bg-stone-800 transition-colors"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleReset}
                    className="p-1.5 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-200/50 dark:hover:bg-stone-800 transition-colors"
                    title="Reset Camera"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </CanvasErrorBoundary>
      )}
    </div>
  );
}
