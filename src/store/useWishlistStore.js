import { create } from 'zustand';
import { wishlistService } from '../services/wishlistService';
import { useCartStore } from './useCartStore';

export const useWishlistStore = create((set, get) => ({
  items: wishlistService.getWishlist(),

  toggleWishlist: (product) => {
    const items = get().items;
    const exists = items.some((p) => p.id === product.id);
    let updated;
    if (exists) {
      updated = items.filter((p) => p.id !== product.id);
    } else {
      updated = [
        ...items,
        {
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          originalPrice: product.originalPrice,
          thumbnail: product.thumbnail || product.images[0],
          category: product.category,
          sizes: product.sizes,
          colors: product.colors,
          rating: product.rating,
          stockStatus: product.stockStatus,
        }
      ];
    }
    wishlistService.saveWishlist(updated);
    set({ items: updated });
    return !exists;
  },

  isInWishlist: (productId) => {
    return get().items.some((p) => p.id === productId);
  },

  removeFromWishlist: (productId) => {
    const updated = get().items.filter((p) => p.id !== productId);
    wishlistService.saveWishlist(updated);
    set({ items: updated });
  },

  moveToCart: (product, options = {}) => {
    useCartStore.getState().addItem(product, options);
    get().removeFromWishlist(product.id);
  },

  clearWishlist: () => {
    wishlistService.clearWishlist();
    set({ items: [] });
  }
}));
