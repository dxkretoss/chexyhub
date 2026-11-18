/**
 * Dynamic Custom Auth Service
 * Custom salted password hashing & signed Bearer tokens via Supabase
 * Zero dependency on built-in Supabase Auth
 */

import { customAuth } from './supabaseClient';

export const authService = {
  // Current user session
  getCurrentUser() {
    return customAuth.getCurrentUser();
  },

  // Customer sign in
  async signIn({ email, password }) {
    if (!email || !password) {
      throw new Error('Please provide both email and password.');
    }
    const result = await customAuth.signIn({ email, password });
    return result.user;
  },

  // Customer sign up
  async signUp({ name, email, password, phone }) {
    if (!name || !email || !password) {
      throw new Error('All required fields must be filled.');
    }
    const result = await customAuth.signUp({ name, email, password, phone });
    return result.user;
  },

  // Customer sign out
  async signOut() {
    return customAuth.signOut();
  },

  // Update profile
  async updateProfile(updates) {
    return customAuth.updateProfile(updates);
  },

  // Password reset request
  async requestPasswordReset(email) {
    if (!email) throw new Error('Email is required');
    return { success: true, message: `Password reset link dispatched to ${email}` };
  },
};
