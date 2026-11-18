/**
 * Dynamic Product Service with Live Supabase Integration
 * Fetches real-time checkered shirt catalog with image storage URLs
 */

import { supabase } from './supabaseClient';
import { COLLECTIONS, CATEGORIES } from '../data/products';

function mapSupabaseProduct(row) {
  return {
    id: row.id,
    sku: row.sku,
    name: row.name,
    slug: row.slug || row.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    category: row.category,
    pattern: row.pattern || 'Scottish Tartan',
    collection: row.collection || 'Highland Heritage',
    price: Number(row.price),
    originalPrice: Number(row.original_price || row.price),
    discount:
      row.original_price && row.original_price > row.price
        ? Math.round(((row.original_price - row.price) / row.original_price) * 100)
        : 0,
    stock: row.stock ?? 20,
    stockStatus:
      row.stock_status ||
      (row.stock > 15 ? 'In Stock' : row.stock > 0 ? 'Low Stock' : 'Out of Stock'),
    thumbnail: row.thumbnail,
    images: row.gallery && row.gallery.length ? [row.thumbnail, ...row.gallery] : [row.thumbnail],
    description: row.description || '',
    fabric: row.fabric || '100% Long-Staple Egyptian Cotton',
    sizes: row.sizes || ['S', 'M', 'L', 'XL'],
    colors: row.colors || [
      { name: 'Heritage Navy', hex: '#1E2D4A' },
      { name: 'Royal Crimson', hex: '#7A1C28' },
    ],
    isFeatured: Boolean(row.is_featured),
    isBestSeller: Boolean(row.is_best_seller),
    isNewArrival: true,
    rating: Number(row.rating || 4.9),
    reviewCount: row.reviews_count || 12,
    tags: [row.category, row.pattern, 'Checkered Shirt'].filter(Boolean),
  };
}

async function fetchAllCatalog() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      return data.map(mapSupabaseProduct);
    }
  } catch (err) {
    console.warn('Failed to fetch live products from Supabase:', err.message);
  }
  return [];
}

export const productService = {
  // Fetch all products with optional filters
  async getProducts(filters = {}) {
    const catalog = await fetchAllCatalog();
    let result = [...catalog];

    if (filters.category && filters.category !== 'all') {
      result = result.filter(
        (p) => p.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.collection && filters.collection !== 'all') {
      result = result.filter((p) => p.collection === filters.collection);
    }

    if (filters.pattern && filters.pattern !== 'all') {
      result = result.filter(
        (p) => (p.pattern || p.model3D?.pattern) === filters.pattern
      );
    }

    if (filters.size) {
      result = result.filter((p) => p.sizes.includes(filters.size));
    }

    if (filters.color) {
      result = result.filter((p) =>
        p.colors.some((c) => c.name.toLowerCase().includes(filters.color.toLowerCase()))
      );
    }

    if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
      result = result.filter(
        (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
      );
    }

    if (filters.inStockOnly) {
      result = result.filter((p) => p.stockStatus !== 'Out of Stock');
    }

    if (filters.hasDiscount) {
      result = result.filter((p) => p.discount > 0);
    }

    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.collection?.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-low':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
          break;
        case 'bestselling':
          result.sort((a, b) => b.reviewCount - a.reviewCount);
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'featured':
        default:
          result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
          break;
      }
    }

    return result;
  },

  // Fetch single product by slug
  async getProductBySlug(slug) {
    const catalog = await fetchAllCatalog();
    const product = catalog.find((p) => p.slug === slug);
    if (!product) {
      throw new Error(`Product with slug "${slug}" not found`);
    }
    return product;
  },

  // Fetch featured products
  async getFeaturedProducts() {
    const catalog = await fetchAllCatalog();
    return catalog.filter((p) => p.isFeatured);
  },

  // Fetch best sellers
  async getBestSellers() {
    const catalog = await fetchAllCatalog();
    return catalog.filter((p) => p.isBestSeller);
  },

  // Fetch new arrivals
  async getNewArrivals() {
    const catalog = await fetchAllCatalog();
    return catalog.filter((p) => p.isNewArrival);
  },

  // Fetch related products
  async getRelatedProducts(category, currentId) {
    const catalog = await fetchAllCatalog();
    return catalog
      .filter((p) => p.category === category && p.id !== currentId)
      .slice(0, 4);
  },

  // Get categories
  async getCategories() {
    return CATEGORIES;
  },

  // Get collections
  async getCollections() {
    return COLLECTIONS;
  },
};
