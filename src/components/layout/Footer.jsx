import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { newsletterService } from '../../services/newsletterService';
import { toast } from 'sonner';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    const result = newsletterService.subscribe(email);
    if (result.success) {
      toast.success(result.message);
      setIsSubscribed(true);
      setEmail('');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <footer className="bg-white dark:bg-[#0c0c0c] text-black dark:text-white border-t border-black/10 dark:border-white/10 transition-colors">
      {/* 1. Minimal Fashion Newsletter Section */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-16 sm:py-20 border-b border-black/10 dark:border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 block">
              Join the Atelier
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-black dark:text-white">
              STAY INFORMED ABOUT NEW CAMPAIGNS.
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-light max-w-md">
              Receive private previews of seasonal check releases, editorial lookbooks, and exclusive studio invitations.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER YOUR EMAIL ADDRESS"
                required
                className="flex-1 bg-transparent border-b border-black dark:border-white py-3 text-xs tracking-wider uppercase placeholder:text-stone-400 focus:outline-none"
              />
              <button
                type="submit"
                className="py-3 px-8 bg-black dark:bg-white text-white dark:text-black text-[11px] font-bold uppercase tracking-[0.2em] transition-opacity hover:opacity-80"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 2. Architectural Navigation Columns */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Col 1: Collections */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">
              COLLECTIONS
            </h4>
            <ul className="space-y-2.5 text-xs font-medium tracking-wider uppercase">
              <li>
                <Link to="/women" className="text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white transition-colors">
                  Woman
                </Link>
              </li>
              <li>
                <Link to="/men" className="text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white transition-colors">
                  Man
                </Link>
              </li>
              <li>
                <Link to="/kids" className="text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white transition-colors">
                  Kids
                </Link>
              </li>
              <li>
                <Link to="/family-collection" className="text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white transition-colors">
                  Family Collection
                </Link>
              </li>
              <li>
                <Link to="/shop?filter=new" className="text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Client Services */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">
              HELP & SUPPORT
            </h4>
            <ul className="space-y-2.5 text-xs font-medium tracking-wider uppercase">
              <li>
                <Link to="/contact" className="text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/order-tracking" className="text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: The Label */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">
              THE BRAND
            </h4>
            <ul className="space-y-2.5 text-xs font-medium tracking-wider uppercase">
              <li>
                <Link to="/about" className="text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white transition-colors">
                  About CHEXY HUB
                </Link>
              </li>
              <li>
                <span className="text-stone-400">Yarn-Dyed Craftsmanship</span>
              </li>
              <li>
                <span className="text-stone-400">Sustainable Weaves</span>
              </li>
              <li>
                <span className="text-stone-400">Press & Editorial</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Social */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">
              LEGAL & SOCIAL
            </h4>
            <ul className="space-y-2.5 text-xs font-medium tracking-wider uppercase">
              <li>
                <Link to="/privacy-policy" className="text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li className="pt-2">
                <div className="flex gap-4 text-xs font-bold tracking-widest text-stone-600 dark:text-stone-400">
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white">
                    INSTAGRAM
                  </a>
                  <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white">
                    PINTEREST
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Bottom Bar: Brand Wordmark, Tagline, Currency, Copyright */}
      <div className="border-t border-black/10 dark:border-white/10 py-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-stone-500 font-light">
          <div className="flex items-center gap-4">
            <span className="font-bold tracking-[0.25em] text-black dark:text-white uppercase">
              CHEXY HUB
            </span>
            <span className="hidden sm:inline text-stone-300 dark:text-stone-700">•</span>
            <span className="tracking-widest uppercase">STYLE IS A STATEMENT</span>
          </div>

          <div className="flex items-center gap-6">
            <span>INDIA (INR ₹)</span>
            <span>© {new Date().getFullYear()} CHEXY HUB. ALL RIGHTS RESERVED.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
