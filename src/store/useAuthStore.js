import { create } from 'zustand';
import { authService } from '../services/authService';

export const useAuthStore = create((set) => ({
  user: authService.getCurrentUser(),
  isAuthenticated: !!authService.getCurrentUser(),
  loading: false,

  login: async ({ email, password }) => {
    set({ loading: true });
    try {
      const user = await authService.signIn({ email, password });
      set({ user, isAuthenticated: true, loading: false });
      return { success: true, user };
    } catch (err) {
      set({ loading: false });
      return { success: false, error: err.message };
    }
  },

  register: async ({ name, email, password, phone }) => {
    set({ loading: true });
    try {
      const user = await authService.signUp({ name, email, password, phone });
      set({ user, isAuthenticated: true, loading: false });
      return { success: true, user };
    } catch (err) {
      set({ loading: false });
      return { success: false, error: err.message };
    }
  },

  logout: async () => {
    await authService.signOut();
    set({ user: null, isAuthenticated: false });
  },

  updateProfile: async (updates) => {
    const updated = await authService.updateProfile(updates);
    set({ user: updated });
    return updated;
  }
}));
