/**
 * Product Service
 * Prepared for future Supabase Database integration:
 * - Products, Categories, Product Variants, Inventory
 */

import { PRODUCTS, COLLECTIONS, CATEGORIES } from '../data/products';

export const productService = {
  // Fetch all products with optional filters
  async getProducts(filters = {}) {
    // Simulating async API call delay
    await new Promise((resolve) => setTimeout(resolve, 80));

    let result = [...PRODUCTS];

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
          p.description.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
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
    await new Promise((resolve) => setTimeout(resolve, 50));
    const product = PRODUCTS.find((p) => p.slug === slug);
    if (!product) {
      throw new Error(`Product with slug "${slug}" not found`);
    }
    return product;
  },

  // Fetch featured products
  async getFeaturedProducts() {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return PRODUCTS.filter((p) => p.isFeatured);
  },

  // Fetch best sellers
  async getBestSellers() {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return PRODUCTS.filter((p) => p.isBestSeller);
  },

  // Fetch new arrivals
  async getNewArrivals() {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return PRODUCTS.filter((p) => p.isNewArrival);
  },

  // Fetch related products
  async getRelatedProducts(category, currentId) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return PRODUCTS.filter(
      (p) => p.category === category && p.id !== currentId
    ).slice(0, 4);
  },

  // Get categories
  async getCategories() {
    return CATEGORIES;
  },

  // Get collections
  async getCollections() {
    return COLLECTIONS;
  }
};
