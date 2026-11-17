import { create } from 'zustand';

const STORAGE_KEY = 'chexyhub_recently_viewed';

const getInitialItems = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const useRecentlyViewedStore = create((set, get) => ({
  items: getInitialItems(),

  addRecentlyViewed: (product) => {
    if (!product || !product.id) return;
    const current = get().items.filter((p) => p.id !== product.id);
    const updated = [
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        originalPrice: product.originalPrice,
        thumbnail: product.thumbnail || product.images[0],
        category: product.category,
        rating: product.rating,
      },
      ...current,
    ].slice(0, 8);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    set({ items: updated });
  },

  clearRecentlyViewed: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ items: [] });
  }
}));
