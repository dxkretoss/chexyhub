import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Heart, User } from 'lucide-react';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useAuthStore } from '../../store/useAuthStore';

export function MobileBottomNav() {
  const { items: wishlistItems } = useWishlistStore();
  const { isAuthenticated } = useAuthStore();
  const wishlistCount = wishlistItems.length;

  const navItems = [
    { label: 'HOME', to: '/', icon: Home },
    { label: 'CATALOGUE', to: '/shop', icon: Compass },
    { label: 'WISHLIST', to: '/wishlist', icon: Heart, badge: wishlistCount },
    { label: 'ACCOUNT', to: isAuthenticated ? '/account' : '/login', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/95 dark:bg-[#111111]/95 backdrop-blur-md border-t border-black/10 dark:border-white/10 pb-safe shadow-sm select-none">
      <div className="flex items-center justify-around h-14 px-2 max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `relative flex flex-col items-center justify-center flex-1 h-full py-1 text-[9px] font-bold tracking-wider transition-colors ${
                  isActive
                    ? 'text-black dark:text-white'
                    : 'text-stone-400 hover:text-black dark:hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative">
                    <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2]' : 'stroke-[1.5]'}`} />
                    {item.badge > 0 && (
                      <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-[8px] font-bold flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="mt-1 truncate">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
