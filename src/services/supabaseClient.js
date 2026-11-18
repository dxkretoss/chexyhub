import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://hunappgssgxhdhlyeqfr.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    // Disable built-in Supabase Auth session persistence to maintain 100% custom auth
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});

export const USER_TOKEN_KEY = 'chexyhub_token';
export const USER_PROFILE_KEY = 'chexyhub_user';

// Helper to get Bearer header
export const getAuthHeaders = () => {
  const token = localStorage.getItem(USER_TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Simple client-side token generator for fallback when RPC is used directly
function createFallbackToken(payload) {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const exp = Math.floor(Date.now() / 1000) + 7 * 24 * 3600;
  const body = btoa(JSON.stringify({ ...payload, exp, iat: Math.floor(Date.now() / 1000) }));
  const sig = btoa('chexyhub-verified-atelier-sig');
  return `${header}.${body}.${sig}`;
}

// Custom Storefront Customer Authentication
export const customAuth = {
  // Sign Up customer
  async signUp({ name, email, password, phone }) {
    // 1. Try Supabase Edge Function first
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/auth-register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ name, email, password, phone }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.token && data.user) {
          localStorage.setItem(USER_TOKEN_KEY, data.token);
          localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(data.user));
          return { success: true, user: data.user, token: data.token };
        }
      }
    } catch {
      // Fallback to PostgreSQL RPC function
    }

    // 2. Direct PostgreSQL RPC fallback with Blowfish bcrypt hashing
    const { data: user, error } = await supabase.rpc('custom_user_register', {
      p_name: name,
      p_email: email,
      p_password: password,
      p_phone: phone || null,
    });

    if (error) {
      throw new Error(error.message || 'Registration failed');
    }

    const token = createFallbackToken({ sub: user.id, email: user.email, role: 'customer' });
    localStorage.setItem(USER_TOKEN_KEY, token);
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(user));
    return { success: true, user, token };
  },

  // Sign In customer
  async signIn({ email, password }) {
    // 1. Try Supabase Edge Function first
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/auth-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.token && data.user) {
          localStorage.setItem(USER_TOKEN_KEY, data.token);
          localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(data.user));
          return { success: true, user: data.user, token: data.token };
        }
      }
    } catch {
      // Fallback to PostgreSQL RPC function
    }

    // 2. Direct PostgreSQL RPC fallback with Blowfish bcrypt verification
    const { data: user, error } = await supabase.rpc('custom_user_login', {
      p_email: email,
      p_password: password,
    });

    if (error) {
      throw new Error(error.message || 'Invalid email or password.');
    }

    const token = createFallbackToken({ sub: user.id, email: user.email, role: 'customer' });
    localStorage.setItem(USER_TOKEN_KEY, token);
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(user));
    return { success: true, user, token };
  },

  // Current session retrieval
  getCurrentUser() {
    try {
      const stored = localStorage.getItem(USER_PROFILE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  // Sign Out
  signOut() {
    localStorage.removeItem(USER_TOKEN_KEY);
    localStorage.removeItem(USER_PROFILE_KEY);
    return true;
  },

  // Update customer profile
  async updateProfile(updates) {
    const current = this.getCurrentUser();
    if (!current?.id) throw new Error('No authenticated customer');

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', current.id)
      .select()
      .single();

    if (error) throw new Error(error.message);

    const merged = { ...current, ...data };
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(merged));
    return merged;
  },
};
