import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  Box,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useThemeStore } from '../../store/useThemeStore';
import { useAuthStore } from '../../store/useAuthStore';
import { SearchOverlay } from './SearchOverlay';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);

  const location = useLocation();
  const { getItemCount, openCart } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { theme, toggleTheme } = useThemeStore();
  const { user, isAuthenticated } = useAuthStore();

  const cartCount = getItemCount();
  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveMegaMenu(null);
  }, [location.pathname]);

  // Notice: 'Home' and 'About' removed as requested (Logo links to Home; About is in Footer)
  const navLinks = [
    { name: 'Shop All', path: '/shop' },
    {
      name: 'Men',
      path: '/men',
      hasMega: true,
      megaContent: {
        title: "Men's Checkered Atelier",
        subtitle: 'Heritage Weaves & Contemporary Fits',
        description: '100% long-staple Egyptian cotton tailored into structured button-downs, heavyweight brushed flannels, and breathable summer Madras.',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
        featuredTag: 'Highland Tartans',
        viewAllLink: '/men',
        viewAllText: "Explore All Men's Checks",
        links: [
          { label: 'Royal Highland Clan Tartans', to: '/shop?category=men&collection=Highland+Heritage', desc: '100% Egyptian cotton twill' },
          { label: 'Lumberjack Heavyweight Flannels', to: '/shop?category=men&collection=Lumberjack+Heritage', desc: 'Double-brushed warmth' },
          { label: 'Artisan Indigo Summer Madras', to: '/shop?category=men&collection=Summer+Madras', desc: 'Lightweight yarn-dyed checks' },
          { label: 'Minimalist Windowpane Linen', to: '/shop?category=men&collection=Minimalist+Windowpane', desc: 'Relaxed resort silhouette' },
          { label: 'Executive Navy Gingham Poplin', to: '/shop?category=men&collection=Urban+Tartan', desc: 'Crisp 80s 2-ply office style' },
        ]
      }
    },
    {
      name: 'Women',
      path: '/women',
      hasMega: true,
      megaContent: {
        title: "Women's Checkered Studio",
        subtitle: 'Editorial Drapes & Parisian Tailoring',
        description: 'Effortless boyfriend silhouettes, cropped gingham blouses, and fluid Nordic windowpane tunics designed for elevated everyday elegance.',
        image: 'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=600&q=80',
        featuredTag: 'Parisian Terracotta',
        viewAllLink: '/women',
        viewAllText: "Explore All Women's Checks",
        links: [
          { label: 'Parisian Oversized Boyfriend Checks', to: '/shop?category=women&collection=Urban+Tartan', desc: 'Relaxed dropped-shoulder drape' },
          { label: 'Provençal Pastel Gingham Blouses', to: '/shop?category=women&collection=Pastel+Gingham', desc: 'Balloon sleeves & cropped ties' },
          { label: 'Nordic Windowpane Flannel Tunics', to: '/shop?category=women&collection=Minimalist+Windowpane', desc: 'Mandarin collar fluid cut' },
          { label: 'Amalfi Coast Citrus Madras', to: '/shop?category=women&collection=Summer+Madras', desc: '100% European flax linen' },
          { label: 'SoHo Micro-Houndstooth Shirts', to: '/shop?category=women&collection=Urban+Tartan', desc: 'Structured double-breasted' },
        ]
      }
    },
    {
      name: 'Kids',
      path: '/kids',
      hasMega: true,
      megaContent: {
        title: 'Junior Check Explorers',
        subtitle: '100% Organic & Gentle on Sensitive Skin',
        description: 'Durable, hypoallergenic check shirts with snap closures, reinforced seams, and cheerful European patterns crafted for active play.',
        image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80',
        featuredTag: 'Organic Hypoallergenic',
        viewAllLink: '/kids',
        viewAllText: "Explore All Junior Checks",
        links: [
          { label: 'Junior Royal Clan Tartans', to: '/kids', desc: 'Hypoallergenic soft combed cotton' },
          { label: 'Little Explorer Sunny Gingham', to: '/kids', desc: 'Featherweight breathable poplin' },
          { label: 'Junior Trail Blazer Flannels', to: '/kids', desc: 'Cozy brushed overshirt cut' },
          { label: 'Coastal Breeze Summer Madras', to: '/kids', desc: 'Vibrant quick-dry playwear' },
        ]
      }
    },
    { name: 'Family Collection', path: '/family-collection', badge: 'Coordinated' },
    { name: '3D Studio', path: '/3d-studio', isStudio: true },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-navbar py-2.5 sm:py-3 shadow-glass'
            : 'bg-ivory/90 dark:bg-dark-bg/90 backdrop-blur-xl py-3 sm:py-3.5 border-b border-stone-200/50 dark:border-stone-800/50 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* 1. Left: Brand Logo using official logo images */}
            <Link to="/" className="flex items-center group py-0.5">
              {/* Desktop / Tablet: Full Horizontal Brand Logo */}
              <img
                src="/assets/logo.png"
                alt="CHEXY HUB — Check Your Style"
                className="hidden sm:block h-10 md:h-11 w-auto object-contain dark:invert transition-transform duration-300 group-hover:scale-[1.03]"
              />
              {/* Mobile: Compact Square Emblem Logo */}
              <img
                src="/assets/mob_logo.png"
                alt="CHEXY HUB"
                className="sm:hidden h-9 w-9 object-contain rounded-xl transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* 2. Center: Desktop Navigation Links with High-End Mega Menus */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.hasMega && setActiveMegaMenu(link.name)}
                  onMouseLeave={() => link.hasMega && setActiveMegaMenu(null)}
                >
                  <Link
                    to={link.path}
                    className={`px-3.5 py-2 rounded-full text-xs xl:text-sm font-semibold transition-all flex items-center gap-1 ${
                      location.pathname === link.path
                        ? 'text-terracotta bg-terracotta/10 shadow-sm'
                        : 'text-charcoal dark:text-dark-text hover:text-terracotta dark:hover:text-terracotta hover:bg-white/60 dark:hover:bg-stone-800/60'
                    } ${link.isStudio ? 'bg-charcoal text-white dark:bg-ivory dark:text-charcoal px-3.5 py-1.5 shadow-md hover:bg-terracotta dark:hover:bg-terracotta dark:hover:text-white' : ''}`}
                  >
                    {link.isStudio && <Box className="w-3.5 h-3.5 mr-0.5 text-terracotta" />}
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="text-[10px] px-1.5 py-0.2 bg-terracotta/10 text-terracotta rounded-full font-bold">
                        {link.badge}
                      </span>
                    )}
                    {link.hasMega && (
                      <ChevronDown className="w-3.5 h-3.5 text-secondary-gray transition-transform duration-200" />
                    )}
                  </Link>

                  {/* Mega Menu Dropdown: High-Opacity Crystal Glass (Zero text bleed-through) */}
                  {link.hasMega && activeMegaMenu === link.name && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[660px] xl:w-[720px] animate-fade-in z-50">
                      {/* Transparent mouse bridge to avoid hover flicker */}
                      <div className="absolute inset-x-0 -top-3 h-4 bg-transparent pointer-events-auto" />
                      
                      <div className="glass-megamenu rounded-3xl p-6 xl:p-7 grid grid-cols-12 gap-6 backdrop-blur-3xl text-left select-none">
                        {/* Left Side: Curated Weaves & Categories (7 cols) */}
                        <div className="col-span-7 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="w-2 h-2 rounded-full bg-terracotta" />
                              <p className="text-[11px] font-bold uppercase tracking-widest text-terracotta">
                                {link.megaContent.title}
                              </p>
                            </div>
                            <h4 className="font-serif text-base font-bold text-charcoal dark:text-dark-text mb-2">
                              {link.megaContent.subtitle}
                            </h4>
                            <p className="text-xs text-secondary-gray mb-4 leading-relaxed font-normal">
                              {link.megaContent.description}
                            </p>

                            <ul className="space-y-1.5 border-t border-stone-200/80 dark:border-stone-800/80 pt-3">
                              {link.megaContent.links.map((item, i) => (
                                <li key={i}>
                                  <Link
                                    to={item.to}
                                    onClick={() => setActiveMegaMenu(null)}
                                    className="p-2 rounded-xl text-xs font-semibold text-charcoal dark:text-dark-text hover:bg-stone-100/80 dark:hover:bg-stone-800/80 hover:text-terracotta flex items-center justify-between group/item transition-all"
                                  >
                                    <div>
                                      <span className="block font-bold">{item.label}</span>
                                      {item.desc && (
                                        <span className="block text-[11px] text-secondary-gray font-normal">
                                          {item.desc}
                                        </span>
                                      )}
                                    </div>
                                    <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover/item:text-terracotta transition-transform group-hover/item:translate-x-1" />
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="pt-3 mt-2 border-t border-stone-200/60 dark:border-stone-800/60">
                            <Link
                              to={link.megaContent.viewAllLink}
                              onClick={() => setActiveMegaMenu(null)}
                              className="text-xs font-bold text-terracotta hover:underline inline-flex items-center gap-1.5"
                            >
                              <span>{link.megaContent.viewAllText}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>

                        {/* Right Side: High-Fashion Curated Look Card (5 cols) */}
                        <div className="col-span-5 relative rounded-2xl overflow-hidden aspect-[3/4] bg-stone-100 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-inner group/card">
                          <img
                            src={link.megaContent.image}
                            alt=""
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-4 text-white">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-warm-sand mb-0.5">
                              {link.megaContent.featuredTag}
                            </span>
                            <span className="font-serif text-sm font-bold">
                              {link.name} Signature Edits
                            </span>
                            <Link
                              to={link.path}
                              onClick={() => setActiveMegaMenu(null)}
                              className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-white hover:text-terracotta-light underline transition-colors"
                            >
                              <span>Browse Lookbook</span>
                              <span>→</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* 3. Right: Utility Icons (Search, Theme, Wishlist, Account, Cart) */}
            <div className="flex items-center space-x-2 sm:space-x-2.5">
              {/* Search Icon */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 sm:p-2.5 rounded-full glass-pill hover:bg-white dark:hover:bg-stone-800 text-charcoal dark:text-dark-text transition-all"
                title="Search (Esc)"
              >
                <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 sm:p-2.5 rounded-full glass-pill hover:bg-white dark:hover:bg-stone-800 text-charcoal dark:text-dark-text transition-all"
                title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-stone-700" />
                )}
              </button>

              {/* Wishlist Link */}
              <Link
                to="/wishlist"
                className="relative p-2 sm:p-2.5 rounded-full glass-pill hover:bg-white dark:hover:bg-stone-800 text-charcoal dark:text-dark-text transition-all hidden sm:flex"
                title="Wishlist"
              >
                <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-terracotta text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account Dropdown Link */}
              <Link
                to={isAuthenticated ? '/account' : '/login'}
                className="p-2 sm:p-2.5 rounded-full glass-pill hover:bg-white dark:hover:bg-stone-800 text-charcoal dark:text-dark-text transition-all hidden sm:flex"
                title={isAuthenticated ? `Account: ${user?.name}` : 'Login / Register'}
              >
                <User className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={openCart}
                className="relative p-2 sm:p-2.5 rounded-full bg-charcoal text-white dark:bg-ivory dark:text-charcoal hover:bg-terracotta dark:hover:bg-terracotta dark:hover:text-white transition-all shadow-md flex items-center justify-center"
                title="Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-terracotta text-white text-[10px] font-bold flex items-center justify-center border-2 border-white dark:border-dark-bg shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-full lg:hidden text-charcoal dark:text-dark-text hover:bg-stone-200/50 dark:hover:bg-stone-800"
                title="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden glass-drawer border-b border-stone-200 dark:border-stone-800 animate-slide-up px-6 py-6 mt-3 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200/60 dark:border-stone-800/60">
              <img
                src="/assets/logo.png"
                alt="CHEXY HUB"
                className="h-8 w-auto object-contain dark:invert"
              />
              <span className="text-[10px] uppercase font-bold tracking-widest text-secondary-gray">
                Check Your Style
              </span>
            </div>

            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-2xl text-sm font-semibold transition-colors flex items-center justify-between ${
                    location.pathname === link.path
                      ? 'bg-terracotta text-white shadow-sm'
                      : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-charcoal dark:text-dark-text'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {link.isStudio && <Box className="w-4 h-4 text-terracotta" />}
                    <span>{link.name}</span>
                  </div>
                  {link.badge && (
                    <span className="text-[10px] px-2 py-0.5 bg-terracotta/20 rounded-full font-bold">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
              <Link
                to={isAuthenticated ? '/account' : '/login'}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 text-xs font-bold text-charcoal dark:text-dark-text"
              >
                <User className="w-4 h-4 text-terracotta" />
                <span>{isAuthenticated ? user?.name : 'Sign In / Register'}</span>
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-xs text-secondary-gray">Theme:</span>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full border border-stone-200 dark:border-stone-700"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Overlay Modal */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
