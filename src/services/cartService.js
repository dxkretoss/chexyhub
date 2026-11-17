/**
 * Cart Service
 * Ready for future Supabase Database integration (cart_items table).
 * Persists locally in the frontend phase.
 */

const STORAGE_KEY = 'chexyhub_cart';

export const cartService = {
  getCart() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveCart(items) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  },

  clearCart() {
    localStorage.removeItem(STORAGE_KEY);
  }
};
