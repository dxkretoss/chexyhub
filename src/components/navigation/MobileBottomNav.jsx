import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Heart, User, Box } from 'lucide-react';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useAuthStore } from '../../store/useAuthStore';

export function MobileBottomNav() {
  const { items: wishlistItems } = useWishlistStore();
  const { isAuthenticated } = useAuthStore();
  const wishlistCount = wishlistItems.length;

  const navItems = [
    { label: 'Home', to: '/', icon: Home },
    { label: 'Shop', to: '/shop', icon: Compass },
    { label: '3D Studio', to: '/3d-studio', icon: Box },
    { label: 'Wishlist', to: '/wishlist', icon: Heart, badge: wishlistCount },
    { label: 'Account', to: isAuthenticated ? '/account' : '/login', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 lg:hidden glass-drawer border-t border-stone-200/80 dark:border-stone-800 pb-safe shadow-[0_-8px_30px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-around h-16 px-2 max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `relative flex flex-col items-center justify-center flex-1 h-full py-1 text-[10px] font-semibold transition-colors ${
                  isActive
                    ? 'text-terracotta'
                    : 'text-stone-500 dark:text-stone-400 hover:text-charcoal dark:hover:text-stone-200'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative">
                    <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                    {item.badge > 0 && (
                      <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-terracotta text-white text-[9px] font-bold flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="mt-1 truncate">{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-1 w-1 h-1 rounded-full bg-terracotta" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
