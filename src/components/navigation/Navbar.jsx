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
  ArrowRight,
  ChevronDown
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
  const [mobileExpandedCategory, setMobileExpandedCategory] = useState(null);

  const location = useLocation();
  const { getItemCount, openCart } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { theme, toggleTheme } = useThemeStore();
  const { user, isAuthenticated } = useAuthStore();

  const cartCount = getItemCount();
  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on page route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveMegaMenu(null);
    setMobileExpandedCategory(null);
  }, [location.pathname]);

  // Luxury Minimal Fashion Navigation Structure
  const navLinks = [
    {
      name: 'WOMAN',
      path: '/women',
      hasMega: true,
      megaContent: {
        headline: "WOMAN'S COLLECTION",
        subline: 'Oversized boyfriend cuts, fluid drapery and contemporary windowpane checks.',
        image: 'https://images.unsplash.com/photo-1610886886310-be2828d6afd5?auto=format&fit=crop&w=700&q=85',
        viewAllLink: '/women',
        categories: [
          { label: 'View All Check Shirts', to: '/women' },
          { label: 'Oversized Silhouette', to: '/women?collection=Urban+Tartan' },
          { label: 'Pastel Gingham Blouses', to: '/women?collection=Pastel+Gingham' },
          { label: 'Nordic Windowpane Tunics', to: '/women?collection=Minimalist+Windowpane' },
          { label: 'Summer Linen Madras', to: '/women?collection=Summer+Madras' },
        ],
      },
    },
    {
      name: 'MAN',
      path: '/men',
      hasMega: true,
      megaContent: {
        headline: "MAN'S COLLECTION",
        subline: 'Heritage weaves, structured collars, and heavyweight brushed flannels.',
        image: 'https://images.unsplash.com/photo-1623162905251-e98a25a45a67?auto=format&fit=crop&w=700&q=85',
        viewAllLink: '/men',
        categories: [
          { label: 'View All Check Shirts', to: '/men' },
          { label: 'Royal Scottish Tartans', to: '/men?collection=Highland+Heritage' },
          { label: 'Lumberjack Heavy Flannel', to: '/men?collection=Lumberjack+Heritage' },
          { label: 'Summer Yarn-Dyed Madras', to: '/men?collection=Summer+Madras' },
          { label: 'Minimalist Windowpane', to: '/men?collection=Minimalist+Windowpane' },
        ],
      },
    },
    {
      name: 'KIDS',
      path: '/kids',
      hasMega: true,
      megaContent: {
        headline: "KIDS' COLLECTION",
        subline: '100% hypoallergenic organic cotton for young explorers.',
        image: 'https://images.unsplash.com/photo-1627278107893-b89d828d4ff3?auto=format&fit=crop&w=700&q=85',
        viewAllLink: '/kids',
        categories: [
          { label: 'View All Kids Checks', to: '/kids' },
          { label: 'Junior Tartan Shirts', to: '/kids' },
          { label: 'Little Gingham Essentials', to: '/kids' },
          { label: 'Cozy Flannel Overshirts', to: '/kids' },
        ],
      },
    },
    {
      name: 'FAMILY',
      path: '/family-collection',
      hasMega: true,
      megaContent: {
        headline: "FAMILY COLLECTION",
        subline: 'Harmonious yarn-dyed checks tailored for parents, siblings, and coordinated celebrations.',
        image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=700&q=85',
        viewAllLink: '/family-collection',
        categories: [
          { label: 'View All Family Sets', to: '/family-collection' },
          { label: 'Parent & Child Matching Duo', to: '/family-collection' },
          { label: 'Full Family Tartan Capsule', to: '/family-collection' },
          { label: 'Sibling Twin Check Shirts', to: '/family-collection' },
        ],
      },
    },
    {
      name: 'NEW COLLECTION',
      path: '/shop?filter=new',
      hasMega: false,
    },
  ];

  const activeMegaLink = navLinks.find((l) => l.hasMega && l.name === activeMegaMenu);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          activeMegaLink || isScrolled
            ? 'bg-white dark:bg-[#111111] py-2.5 sm:py-3 border-b border-black/10 dark:border-white/10 shadow-sm'
            : 'bg-white/95 dark:bg-[#0e0e0e]/95 backdrop-blur-md py-3 sm:py-4 border-b border-black/5 dark:border-white/5'
        }`}
        onMouseLeave={() => setActiveMegaMenu(null)}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Hamburger (Left on mobile) */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1.5 -ml-1.5 text-black dark:text-white"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            {/* Left/Center: Brand Wordmark */}
            <div className="flex items-center gap-8 xl:gap-12">
              <Link to="/" className="flex items-center group py-0.5">
                {/* Desktop: Light & Dark Logos (Increased Size for High Fashion Presence) */}
                <img
                  src="/assets/logo.png"
                  alt="CHEXY HUB"
                  className="hidden sm:block dark:hidden dark:sm:hidden h-11 sm:h-12 md:h-14 lg:h-14 w-auto object-contain transition-opacity hover:opacity-85"
                />
                <img
                  src="/assets/logo_dark.png"
                  alt="CHEXY HUB"
                  className="hidden sm:dark:block h-11 sm:h-12 md:h-14 lg:h-14 w-auto object-contain transition-opacity hover:opacity-85"
                />
                {/* Mobile: Light & Dark Logos */}
                <img
                  src="/assets/mob_logo.png"
                  alt="CHEXY HUB"
                  className="block sm:hidden dark:hidden h-10 w-10 object-contain rounded-md"
                />
                <img
                  src="/assets/mob_logo_dark.png"
                  alt="CHEXY HUB"
                  className="hidden dark:block dark:sm:hidden sm:hidden h-10 w-10 object-contain rounded-md"
                />
              </Link>

              {/* Desktop Minimal Navigation Links (Zara Inspired with Chevron for Megamenu) */}
              <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9">
                {navLinks.map((link) => (
                  <div
                    key={link.name}
                    className="relative py-2"
                    onMouseEnter={() => {
                      if (link.hasMega) setActiveMegaMenu(link.name);
                      else setActiveMegaMenu(null);
                    }}
                  >
                    <Link
                      to={link.path}
                      className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.22em] transition-all relative py-1 ${
                        location.pathname === link.path
                          ? 'text-black dark:text-white after:content-[""] after:absolute after:bottom-0 after:inset-x-0 after:h-[1px] after:bg-black dark:after:bg-white'
                          : 'text-stone-600 dark:text-stone-300 hover:text-black dark:hover:text-white'
                      }`}
                    >
                      <span>{link.name}</span>
                      {link.hasMega && (
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            activeMegaMenu === link.name
                              ? 'rotate-180 text-black dark:text-white'
                              : 'text-stone-400 group-hover:text-black dark:text-stone-500 dark:group-hover:text-white'
                          }`}
                        />
                      )}
                    </Link>
                  </div>
                ))}
              </nav>
            </div>

            {/* Right: Minimal Actions (Search, Account, Wishlist, Bag) */}
            <div className="flex items-center space-x-4 sm:space-x-6 text-black dark:text-white">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-1 hover:opacity-60 transition-opacity"
                title="Search Collection"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Account */}
              <Link
                to={isAuthenticated ? '/account' : '/login'}
                className="p-1 hover:opacity-60 transition-opacity hidden sm:block"
                title={isAuthenticated ? 'My Account' : 'Sign In'}
                aria-label="Account"
              >
                <User className="w-4 h-4" />
              </Link>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="p-1 relative hover:opacity-60 transition-opacity"
                title="Wishlist"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-black dark:bg-white" />
                )}
              </Link>

              {/* Shopping Bag */}
              <button
                onClick={openCart}
                className="flex items-center gap-1.5 text-xs font-bold tracking-widest hover:opacity-60 transition-opacity"
                title="Shopping Bag"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="text-[11px] font-medium tracking-normal">
                  ({cartCount})
                </span>
              </button>

              {/* Dark/Light Minimal Toggle */}
              <button
                onClick={toggleTheme}
                className="p-1 text-stone-400 hover:text-black dark:hover:text-white transition-colors"
                title="Toggle Theme"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* High-Fashion Minimalist Mega Menu (100% Solid Opaque Background) */}
        {activeMegaLink && activeMegaLink.megaContent && (
          <div
            className="hidden lg:block absolute top-full inset-x-0 bg-white dark:bg-[#111111] border-b border-black/10 dark:border-white/10 shadow-2xl py-10 sm:py-12 px-8 sm:px-12 z-50 animate-fade-in select-none"
            onMouseEnter={() => setActiveMegaMenu(activeMegaLink.name)}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <div className="max-w-[1300px] mx-auto grid grid-cols-12 gap-12 items-start">
              {/* Categories List (7 cols) */}
              <div className="col-span-7 space-y-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 block mb-2">
                    Curated Line
                  </span>
                  <h3 className="font-serif text-2xl font-normal text-black dark:text-white">
                    {activeMegaLink.megaContent.headline}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-md font-light leading-relaxed">
                    {activeMegaLink.megaContent.subline}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/10 dark:border-white/10">
                  <ul className="space-y-3">
                    {activeMegaLink.megaContent.categories.map((cat, i) => (
                      <li key={i}>
                        <Link
                          to={cat.to}
                          onClick={() => setActiveMegaMenu(null)}
                          className="text-xs font-medium tracking-wider uppercase text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white transition-colors inline-flex items-center gap-2 group/link"
                        >
                          <span>{cat.label}</span>
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Lookbook Campaign Photo (5 cols) */}
              <div className="col-span-5">
                <Link
                  to={activeMegaLink.megaContent.viewAllLink}
                  onClick={() => setActiveMegaMenu(null)}
                  className="group/img block relative aspect-[4/5] overflow-hidden bg-stone-100 dark:bg-stone-900"
                >
                  <img
                    src={activeMegaLink.megaContent.image}
                    alt={activeMegaLink.megaContent.headline}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                      Explore Campaign →
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Subtle page backdrop dimmer when mega menu is open */}
      {activeMegaLink && (
        <div
          className="hidden lg:block fixed inset-0 z-40 bg-black/25 dark:bg-black/60 backdrop-blur-[2px] transition-opacity animate-fade-in"
          onClick={() => setActiveMegaMenu(null)}
          onMouseEnter={() => setActiveMegaMenu(null)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Editorial Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-4/5 max-w-sm bg-white dark:bg-[#111111] h-full shadow-2xl flex flex-col justify-between p-8 z-10 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-8 border-b border-black/10 dark:border-white/10">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center">
                  <img
                    src="/assets/logo.png"
                    alt="CHEXY HUB"
                    className="block dark:hidden h-9 sm:h-10 w-auto object-contain"
                  />
                  <img
                    src="/assets/logo_dark.png"
                    alt="CHEXY HUB"
                    className="hidden dark:block h-9 sm:h-10 w-auto object-contain"
                  />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-black dark:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Main Nav with Expandable Subcategories */}
              <div className="py-8 space-y-5">
                {navLinks.map((link) => (
                  <div key={link.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Link
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-sm sm:text-base font-bold uppercase tracking-[0.22em] text-black dark:text-white hover:opacity-60 transition-opacity"
                      >
                        {link.name}
                      </Link>
                      {link.hasMega && (
                        <button
                          type="button"
                          onClick={() =>
                            setMobileExpandedCategory(
                              mobileExpandedCategory === link.name ? null : link.name
                            )
                          }
                          className="p-1 text-stone-500 hover:text-black dark:hover:text-white"
                          aria-label={`Toggle ${link.name} menu`}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              mobileExpandedCategory === link.name ? 'rotate-180 text-black dark:text-white' : ''
                            }`}
                          />
                        </button>
                      )}
                    </div>
                    {link.hasMega && mobileExpandedCategory === link.name && (
                      <div className="pl-3 py-1 space-y-2 border-l border-stone-200 dark:border-stone-800 animate-fade-in">
                        {link.megaContent.categories.map((cat, i) => (
                          <Link
                            key={i}
                            to={cat.to}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 hover:text-black dark:hover:text-white py-1"
                          >
                            {cat.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Footer Links */}
            <div className="pt-6 border-t border-black/10 dark:border-white/10 space-y-3 text-xs uppercase tracking-widest text-stone-500">
              <Link to="/account" onClick={() => setIsMobileMenuOpen(false)} className="block">
                My Account
              </Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block">
                About the Label
              </Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block">
                Client Services
              </Link>
              <p className="text-[10px] tracking-normal text-stone-400 pt-4">
                © {new Date().getFullYear()} CHEXY HUB. STYLE IS A STATEMENT.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Global Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
