import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sun, Moon, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useThemeStore } from '../../store/useThemeStore';
import { SEO } from '../../components/common/SEO';
import { toast } from 'sonner';

export function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  const { register, loading } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreeTerms) {
      toast.error('Please agree to the Terms & Conditions to create an account.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }

    const result = await register({
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      password: formData.password,
    });

    if (result.success) {
      toast.success(`Welcome to CHEXY HUB, ${result.user.name}!`);
      navigate('/account');
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="min-h-screen lg:h-screen w-full flex flex-col lg:flex-row bg-white dark:bg-[#0E0E0E] text-black dark:text-white transition-colors duration-300 lg:overflow-hidden">
      <SEO
        title="Create Account | CHEXY HUB"
        description="Join CHEXY HUB for personalized checkered fashion recommendations and seamless order tracking."
      />

      {/* ============================================================== */}
      {/* LEFT SIDE: Fashion Check Shirt Campaign Imagery                */}
      {/* ============================================================== */}
      <div className="relative w-full lg:w-1/2 h-64 sm:h-80 lg:h-screen lg:sticky lg:top-0 overflow-hidden bg-stone-900 select-none flex-shrink-0">
        <img
          src="https://images.unsplash.com/photo-1623162905251-e98a25a45a67?auto=format&fit=crop&w=1600&q=85"
          alt="CHEXY HUB Checkered Atelier"
          className="w-full h-full object-cover object-center animate-fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 lg:bg-gradient-to-r lg:from-black/40 lg:via-black/20 lg:to-black/60" />



        {/* Bottom editorial caption on left */}
        <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8 z-10 text-white">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-300 block mb-1">
            ATELIER REGISTRATION
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight">
            BECOME AN ATELIER MEMBER.
          </h2>
          <p className="text-xs text-stone-300 font-light mt-1.5 max-w-md hidden sm:block leading-relaxed">
            Gain priority access to limited seasonal check drops, private lookbook styling sessions, and streamlined express checkout.
          </p>
        </div>
      </div>

      {/* ============================================================== */}
      {/* RIGHT SIDE: Dedicated Registration Form (Scrollable)           */}
      {/* ============================================================== */}
      <div className="w-full lg:w-1/2 min-h-screen lg:h-screen flex flex-col justify-start px-6 sm:px-10 lg:px-14 py-4 sm:py-6 overflow-y-auto">
        {/* Top bar on right: Logo & Theme switch */}
        <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10 mb-4 sm:mb-5">
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
        <div className="w-full max-w-[480px] mx-auto my-auto py-3">
          <div className="mb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 block mb-1">
              Registration
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-black dark:text-white">
              CREATE ACCOUNT
            </h1>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-light mt-1 leading-relaxed">
              Register with CHEXY HUB to save bespoke sizing parameters, track active dispatches, and save family collections.
            </p>
          </div>

          <form onSubmit={handleSubmit} autoComplete="off" className="space-y-3.5">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 block mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Eleanor Vance"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                className="w-full bg-transparent border-b border-black/30 dark:border-white/30 py-2 text-xs text-black dark:text-white placeholder:text-stone-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 block mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck="false"
                className="w-full bg-transparent border-b border-black/30 dark:border-white/30 py-2 text-xs text-black dark:text-white placeholder:text-stone-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 block mb-1">
                Contact Telephone *
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
                required
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                className="w-full bg-transparent border-b border-black/30 dark:border-white/30 py-2 text-xs text-black dark:text-white placeholder:text-stone-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 block mb-1">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Min 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                    autoCorrect="off"
                    autoCapitalize="none"
                    spellCheck="false"
                    className="w-full bg-transparent border-b border-black/30 dark:border-white/30 py-2 pr-9 text-xs text-black dark:text-white placeholder:text-stone-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-1.5 text-stone-400 hover:text-black dark:hover:text-white transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 block mb-1">
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Re-enter password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                    autoCorrect="off"
                    autoCapitalize="none"
                    spellCheck="false"
                    className="w-full bg-transparent border-b border-black/30 dark:border-white/30 py-2 pr-9 text-xs text-black dark:text-white placeholder:text-stone-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-1.5 text-stone-400 hover:text-black dark:hover:text-white transition-colors"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer select-none text-xs text-stone-600 dark:text-stone-400">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-3.5 h-3.5 mt-0.5 accent-black dark:accent-white cursor-pointer flex-shrink-0"
                />
                <span className="text-[11px] leading-snug">
                  I consent to the{' '}
                  <Link to="/terms-and-conditions" className="underline underline-offset-2 hover:text-black dark:hover:text-white">
                    Terms & Conditions
                  </Link>{' '}
                  and acknowledge the{' '}
                  <Link to="/privacy-policy" className="underline underline-offset-2 hover:text-black dark:hover:text-white">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-[0.22em] transition-opacity hover:opacity-85 flex items-center justify-center gap-2 mt-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <span>Registering Account...</span>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Switch link */}
          <div className="mt-5 pt-3 border-t border-black/10 dark:border-white/10 text-center text-xs text-stone-500 font-light">
            <span>Already registered with CHEXY HUB? </span>
            <Link
              to="/login"
              className="font-bold text-black dark:text-white uppercase tracking-wider underline underline-offset-4 hover:opacity-75 transition-opacity ml-1"
            >
              Sign In
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
