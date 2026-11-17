import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Send,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Lock,
} from 'lucide-react';
import { newsletterService } from '../../services/newsletterService';
import { toast } from 'sonner';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
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
    <footer className="bg-stone-100 dark:bg-[#121212] text-charcoal dark:text-dark-text border-t border-stone-200 dark:border-stone-800 transition-colors duration-300">
      {/* 1. Value Propositions Banner */}
      <div className="border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider">Free Shipping</h4>
                <p className="text-xs text-secondary-gray mt-0.5">On all prepaid orders above ₹1,999</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center flex-shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider">Easy 15-Day Returns</h4>
                <p className="text-xs text-secondary-gray mt-0.5">Hassle-free doorstep exchanges</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider">100% Long-Staple Cotton</h4>
                <p className="text-xs text-secondary-gray mt-0.5">Peached twills & yarn-dyed checks</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider">Verified Razorpay Gateway</h4>
                <p className="text-xs text-secondary-gray mt-0.5">256-bit encrypted secure checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <img
                src="/assets/logo.png"
                alt="CHEXY HUB"
                className="h-10 w-auto object-contain dark:invert"
              />
            </Link>
            <p className="text-sm text-secondary-gray leading-relaxed max-w-sm">
              Check Your Style. A modern fashion destination where timeless check patterns meet contemporary tailoring. Crafted with love for men, women, kids, and matching family moments.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full glass dark:glass-dark text-stone-600 dark:text-stone-300 hover:text-terracotta transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full glass dark:glass-dark text-stone-600 dark:text-stone-300 hover:text-terracotta transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full glass dark:glass-dark text-stone-600 dark:text-stone-300 hover:text-terracotta transition-colors"
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full glass dark:glass-dark text-stone-600 dark:text-stone-300 hover:text-terracotta transition-colors"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop Columns */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-dark-text mb-4">
              Collections
            </h3>
            <ul className="space-y-2.5 text-sm text-secondary-gray">
              <li>
                <Link to="/men" className="hover:text-terracotta transition-colors">
                  Men's Checks
                </Link>
              </li>
              <li>
                <Link to="/women" className="hover:text-terracotta transition-colors">
                  Women's Checks
                </Link>
              </li>
              <li>
                <Link to="/kids" className="hover:text-terracotta transition-colors">
                  Kids & Junior Checks
                </Link>
              </li>
              <li>
                <Link to="/family-collection" className="hover:text-terracotta transition-colors">
                  Family Matching Sets
                </Link>
              </li>
              <li>
                <Link to="/3d-studio" className="hover:text-terracotta transition-colors">
                  Interactive 3D Studio
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-terracotta transition-colors">
                  All Checkered Shirts
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-dark-text mb-4">
              Customer Support
            </h3>
            <ul className="space-y-2.5 text-sm text-secondary-gray">
              <li>
                <Link to="/about" className="hover:text-terracotta transition-colors font-semibold text-charcoal dark:text-dark-text">
                  About CHEXY HUB
                </Link>
              </li>
              <li>
                <Link to="/order-tracking" className="hover:text-terracotta transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="hover:text-terracotta transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="hover:text-terracotta transition-colors">
                  15-Day Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-terracotta transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-terracotta transition-colors">
                  Contact Our Concierge
                </Link>
              </li>
              <li>
                <Link to="/account/addresses" className="hover:text-terracotta transition-colors">
                  Address Book
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-dark-text mb-2">
              Stay In Style
            </h3>
            <p className="text-xs text-secondary-gray mb-4 leading-relaxed">
              Subscribe for early access to limited edition tartans and seasonal promotions.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-dark-text focus:outline-none focus:ring-1 focus:ring-terracotta"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            {isSubscribed && (
              <p className="text-xs text-emerald-600 mt-2 font-medium">
                Thank you for subscribing!
              </p>
            )}
          </div>
        </div>

        {/* 3. Bottom Bar: Payment Badges & Legal Links */}
        <div className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-secondary-gray">
          <div>
            <p>© {new Date().getFullYear()} CHEXY HUB. All rights reserved. Check Your Style™.</p>
          </div>

          {/* Secure Payment Badges */}
          <div className="flex items-center gap-2 text-[11px] font-semibold">
            <span className="flex items-center gap-1 text-stone-500">
              <Lock className="w-3.5 h-3.5" />
              <span>Razorpay Verified</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-stone-200 dark:bg-stone-800">UPI</span>
            <span className="px-2 py-0.5 rounded bg-stone-200 dark:bg-stone-800">RuPay</span>
            <span className="px-2 py-0.5 rounded bg-stone-200 dark:bg-stone-800">Visa</span>
            <span className="px-2 py-0.5 rounded bg-stone-200 dark:bg-stone-800">Mastercard</span>
            <span className="px-2 py-0.5 rounded bg-stone-200 dark:bg-stone-800">NetBanking</span>
          </div>

          {/* Legal Links */}
          <div className="flex items-center space-x-4">
            <Link to="/about" className="hover:text-terracotta transition-colors">
              About Us
            </Link>
            <Link to="/privacy-policy" className="hover:text-terracotta transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-terracotta transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
