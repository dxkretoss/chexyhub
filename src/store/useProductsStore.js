import { create } from 'zustand';
import { supabase } from '../services/supabaseClient';

export function mapDbProduct(row) {
  if (!row) return null;
  return {
    id: row.id,
    sku: row.sku || `CH-${row.id.substring(0, 5).toUpperCase()}`,
    name: row.name,
    slug: row.slug || row.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    category: row.category || 'men',
    pattern: row.pattern || 'Scottish Tartan',
    collection: row.collection || 'Highland Heritage',
    price: Number(row.price),
    originalPrice: Number(row.original_price || row.price),
    discount:
      row.original_price && Number(row.original_price) > Number(row.price)
        ? Math.round(((Number(row.original_price) - Number(row.price)) / Number(row.original_price)) * 100)
        : 0,
    stock: Number(row.stock ?? 20),
    stockStatus:
      row.stock_status ||
      (Number(row.stock) > 15 ? 'In Stock' : Number(row.stock) > 0 ? 'Low Stock' : 'Out of Stock'),
    thumbnail: row.thumbnail,
    images: row.gallery && row.gallery.length ? [row.thumbnail, ...row.gallery] : [row.thumbnail],
    description: row.description || '',
    fabric: row.fabric || '100% Long-Staple Egyptian Cotton',
    sizes: row.sizes || ['S', 'M', 'L', 'XL'],
    colors: row.colors && row.colors.length ? row.colors : [
      { name: 'Heritage Navy', hex: '#1E2D4A' },
      { name: 'Royal Crimson', hex: '#7A1C28' },
    ],
    isFeatured: Boolean(row.is_featured),
    isBestSeller: Boolean(row.is_best_seller),
    isNewArrival: true,
    rating: Number(row.rating || 4.9),
    reviewCount: Number(row.reviews_count || 12),
    tags: [row.category, row.pattern, 'Checkered Shirt'].filter(Boolean),
  };
}

export const useProductsStore = create((set, get) => ({
  products: [],
  loading: true,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      const mapped = (data || []).map(mapDbProduct);
      set({ products: mapped, loading: false });
      return mapped;
    } catch (err) {
      console.warn('Error fetching live products from Supabase:', err.message);
      set({ products: [], loading: false, error: err.message });
      return [];
    }
  },

  getProductBySlug: (slug) => {
    return get().products.find((p) => p.slug === slug || p.id === slug);
  },

  getFeaturedProducts: () => {
    return get().products.filter((p) => p.isFeatured);
  },

  getBestSellers: () => {
    return get().products.filter((p) => p.isBestSeller);
  },

  getNewArrivals: () => {
    return get().products.filter((p) => p.isNewArrival);
  },
}));
