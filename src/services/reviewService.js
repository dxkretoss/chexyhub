/**
 * Review Service
 * Future Supabase Reviews table
 */

import { CUSTOMER_REVIEWS } from '../data/products';

const STORAGE_KEY = 'chexyhub_reviews';

export const reviewService = {
  getReviews() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(CUSTOMER_REVIEWS));
        return CUSTOMER_REVIEWS;
      }
      return JSON.parse(stored);
    } catch {
      return CUSTOMER_REVIEWS;
    }
  },

  addReview(newReview) {
    const reviews = this.getReviews();
    const reviewObj = {
      ...newReview,
      id: 'rev-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      verified: true
    };
    const updated = [reviewObj, ...reviews];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return reviewObj;
  }
};
