/**
 * Wishlist Service
 * Ready for future Supabase Database integration (wishlist table).
 * Persists locally in the frontend phase.
 */

const STORAGE_KEY = 'chexyhub_wishlist';

export const wishlistService = {
  getWishlist() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveWishlist(items) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  },

  clearWishlist() {
    localStorage.removeItem(STORAGE_KEY);
  }
};
