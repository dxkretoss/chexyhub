/**
 * Auth Service Interface
 * Designed for future Supabase Auth integration (email/password, OAuth, session management).
 * Includes mock demo adapter for frontend operation with LocalStorage persistence.
 */

const STORAGE_KEY = 'chexyhub_demo_user';

export const authService = {
  // Current user session
  getCurrentUser() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  // Mock sign in
  async signIn({ email, password }) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    // Demo validation
    if (!email || !password) {
      throw new Error('Please provide both email and password.');
    }

    const demoUser = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      email: email,
      name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').trim() || 'Valued Customer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      phone: '+91 98765 43210',
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser));
    return demoUser;
  },

  // Mock sign up
  async signUp({ name, email, password, phone }) {
    await new Promise((resolve) => setTimeout(resolve, 350));
    
    if (!name || !email || !password) {
      throw new Error('All required fields must be filled.');
    }

    const newUser = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      email,
      name,
      phone: phone || '+91 98765 43210',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    return newUser;
  },

  // Mock sign out
  async signOut() {
    await new Promise((resolve) => setTimeout(resolve, 150));
    localStorage.removeItem(STORAGE_KEY);
    return true;
  },

  // Update profile
  async updateProfile(updates) {
    await new Promise((resolve) => setTimeout(resolve, 250));
    const current = this.getCurrentUser();
    if (!current) throw new Error('No authenticated user');

    const updated = { ...current, ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },

  // Password reset request
  async requestPasswordReset(email) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (!email) throw new Error('Email is required');
    return { success: true, message: `Password reset email sent to ${email}` };
  }
};
