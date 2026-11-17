/**
 * Newsletter Service
 * Simulates subscription locally for the frontend phase
 */

const STORAGE_KEY = 'chexyhub_newsletter_subs';

export const newsletterService = {
  subscribe(email) {
    if (!email || !email.includes('@')) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const subs = stored ? JSON.parse(stored) : [];
      if (subs.includes(email)) {
        return { success: true, message: 'You are already subscribed to our newsletter!' };
      }
      subs.push(email);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(subs));
      return { success: true, message: 'Welcome to CHEXY HUB! Check your inbox for 10% off.' };
    } catch {
      return { success: true, message: 'Thank you for subscribing to CHEXY HUB!' };
    }
  }
};
