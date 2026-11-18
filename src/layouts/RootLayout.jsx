import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/navigation/Navbar';
import { MobileBottomNav } from '../components/navigation/MobileBottomNav';
import { Footer } from '../components/layout/Footer';
import { CartDrawer } from '../components/cart/CartDrawer';
import { ScrollToTop } from '../components/common/ScrollToTop';
import { useThemeStore } from '../store/useThemeStore';

export function RootLayout() {
  const { initTheme } = useThemeStore();
  const location = useLocation();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  // Auth pages have their own dedicated full-bleed split-screen layout (Left: Image, Right: Form)
  const isAuthPage = ['/login', '/register', '/forgot-password'].includes(location.pathname);

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0E0E0E] text-black dark:text-white transition-colors duration-300">
        <ScrollToTop />
        <Outlet />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-ivory text-charcoal dark:bg-dark-bg dark:text-dark-text selection:bg-terracotta selection:text-white transition-colors duration-300">
      <ScrollToTop />
      <Navbar />
      <CartDrawer />
      
      <main className="flex-1 pb-16 lg:pb-0">
        <Outlet />
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
