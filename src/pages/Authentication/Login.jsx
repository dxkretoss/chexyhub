import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Sun, Moon, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useThemeStore } from '../../store/useThemeStore';
import { SEO } from '../../components/common/SEO';
import { toast } from 'sonner';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const { login, loading } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/account';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error('Please enter both your email address and password.');
      return;
    }
    const result = await login({ email: email.trim().toLowerCase(), password });
    if (result.success) {
      toast.success(`Welcome back, ${result.user.name}!`);
      navigate(from, { replace: true });
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="min-h-screen lg:h-screen w-full flex flex-col lg:flex-row bg-white dark:bg-[#0E0E0E] text-black dark:text-white transition-colors duration-300 lg:overflow-hidden">
      <SEO
        title="Sign In | CHEXY HUB"
        description="Sign in to your CHEXY HUB atelier account to manage orders and saved addresses."
      />

      {/* ============================================================== */}
      {/* LEFT SIDE: Fashion Check Shirt Campaign Imagery (Sticky Screensize) */}
      {/* ============================================================== */}
      <div className="relative w-full lg:w-1/2 h-64 sm:h-80 lg:h-screen lg:sticky lg:top-0 overflow-hidden bg-stone-900 select-none flex-shrink-0">
        <img
          src="https://images.unsplash.com/photo-1610886886310-be2828d6afd5?auto=format&fit=crop&w=1600&q=85"
          alt="CHEXY HUB Autumn Checkered Campaign"
          className="w-full h-full object-cover object-center animate-fade-in"
        />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 lg:bg-gradient-to-r lg:from-black/40 lg:via-black/20 lg:to-black/60" />



        {/* Bottom editorial caption on left */}
        <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8 z-10 text-white">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-300 block mb-1">
            COLLECTION 01 / AUTUMN WINTER 2026
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight">
            STYLE IS A STATEMENT.
          </h2>
          <p className="text-xs text-stone-300 font-light mt-1.5 max-w-md hidden sm:block leading-relaxed">
            Every yarn dyed. Every pattern hand-aligned. Experience modern checkered tailoring engineered with pure Egyptian cotton.
          </p>
        </div>
      </div>

      {/* ============================================================== */}
      {/* RIGHT SIDE: Dedicated Minimalist Sign In Form (Scrollable)     */}
      {/* ============================================================== */}
      <div className="w-full lg:w-1/2 min-h-screen lg:h-screen flex flex-col justify-start px-6 sm:px-10 lg:px-14 py-4 sm:py-6 overflow-y-auto">
        {/* Top bar on right: Logo & Theme switch */}
        <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10 mb-4 sm:mb-6">
          <Link to="/" className="flex items-center">
            {/* Desktop Logos */}
            <img
              src="/assets/logo.png"
              alt="CHEXY HUB"
              className="hidden sm:block dark:hidden h-8 sm:h-9 w-auto object-contain"
            />
            <img
              src="/assets/logo_dark.png"
              alt="CHEXY HUB"
              className="hidden sm:dark:block h-8 sm:h-9 w-auto object-contain"
            />
            {/* Mobile Logos */}
            <img
              src="/assets/mob_logo.png"
              alt="CHEXY HUB"
              className="block sm:hidden dark:hidden h-8 w-8 object-contain rounded-md"
            />
            <img
              src="/assets/mob_logo_dark.png"
              alt="CHEXY HUB"
              className="hidden dark:block dark:sm:hidden h-8 w-8 object-contain rounded-md"
            />
          </Link>

          <button
            onClick={toggleTheme}
            className="p-1.5 border border-black/15 dark:border-white/15 text-stone-500 hover:text-black dark:hover:text-white transition-colors"
            title="Toggle Theme"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        {/* Center form (Vertically centered) */}
        <div className="w-full max-w-[460px] mx-auto my-auto py-4">
          <div className="mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 block mb-1">
              Client Portal
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-black dark:text-white">
              LOG IN
            </h1>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-light mt-1.5 leading-relaxed">
              Enter your credentials to access your checkered wardrobe, saved sizing, and order tracking.
            </p>
          </div>

          <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 block mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck="false"
                className="w-full bg-transparent border-b border-black/30 dark:border-white/30 py-2.5 text-xs text-black dark:text-white placeholder:text-stone-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">
                  Password *
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[10px] uppercase tracking-wider text-stone-500 hover:text-black dark:hover:text-white transition-colors underline underline-offset-4"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  autoCorrect="off"
                  autoCapitalize="none"
                  spellCheck="false"
                  className="w-full bg-transparent border-b border-black/30 dark:border-white/30 py-2.5 pr-10 text-xs text-black dark:text-white placeholder:text-stone-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-stone-400 hover:text-black dark:hover:text-white transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer select-none text-xs text-stone-600 dark:text-stone-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 accent-black dark:accent-white cursor-pointer"
                />
                <span className="text-[11px]">Remember me on this device</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-[0.22em] transition-opacity hover:opacity-85 flex items-center justify-center gap-2 mt-3 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Switch link */}
          <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10 text-center text-xs text-stone-500 font-light">
            <span>New to CHEXY HUB? </span>
            <Link
              to="/register"
              className="font-bold text-black dark:text-white uppercase tracking-wider underline underline-offset-4 hover:opacity-75 transition-opacity ml-1"
            >
              Create an Account
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-3 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-stone-500 font-light mt-auto">
          <span>© {new Date().getFullYear()} CHEXY HUB. ALL RIGHTS RESERVED.</span>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-black dark:hover:text-white uppercase tracking-wider">
              Privacy
            </Link>
            <span>•</span>
            <Link to="/terms-and-conditions" className="hover:text-black dark:hover:text-white uppercase tracking-wider">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
