import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Sun, Moon } from 'lucide-react';
import { authService } from '../../services/authService';
import { useThemeStore } from '../../store/useThemeStore';
import { SEO } from '../../components/common/SEO';
import { toast } from 'sonner';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { theme, toggleTheme } = useThemeStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.requestPasswordReset(email);
      setIsSubmitted(true);
      toast.success(`Password reset link sent to ${email}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen lg:h-screen w-full flex flex-col lg:flex-row bg-white dark:bg-[#0E0E0E] text-black dark:text-white transition-colors duration-300 lg:overflow-hidden">
      <SEO
        title="Reset Password | CHEXY HUB"
        description="Reset your CHEXY HUB account password."
      />

      {/* ============================================================== */}
      {/* LEFT SIDE: Fashion Check Shirt Campaign Imagery                */}
      {/* ============================================================== */}
      <div className="relative w-full lg:w-1/2 h-64 sm:h-80 lg:h-screen lg:sticky lg:top-0 overflow-hidden bg-stone-900 select-none flex-shrink-0">
        <img
          src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1600&q=85"
          alt="CHEXY HUB Heritage Check"
          className="w-full h-full object-cover object-center animate-fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 lg:bg-gradient-to-r lg:from-black/40 lg:via-black/20 lg:to-black/60" />



        {/* Bottom editorial caption on left */}
        <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8 z-10 text-white">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-300 block mb-1">
            CREDENTIALS RECOVERY
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight">
            RESTORE ATELIER ACCESS.
          </h2>
          <p className="text-xs text-stone-300 font-light mt-1.5 max-w-md hidden sm:block leading-relaxed">
            Secure client account recovery protected with end-to-end token verification.
          </p>
        </div>
      </div>

      {/* ============================================================== */}
      {/* RIGHT SIDE: Dedicated Password Reset Form (Compact)            */}
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
        <div className="w-full max-w-[460px] mx-auto my-auto py-4">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 hover:text-black dark:hover:text-white mb-3 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </Link>

          <div className="mb-5">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 block mb-1">
              Password Recovery
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-black dark:text-white">
              RESET PASSWORD
            </h1>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-light mt-1.5 leading-relaxed">
              Enter your registered client email address and our system will dispatch a secure recovery token.
            </p>
          </div>

          {isSubmitted ? (
            <div className="py-8 px-6 border border-black/10 dark:border-white/10 text-center space-y-4 bg-stone-50 dark:bg-stone-900/40">
              <div className="w-12 h-12 mx-auto rounded-full border border-black dark:border-white flex items-center justify-center text-black dark:text-white">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-normal text-black dark:text-white">
                INSTRUCTIONS DISPATCHED
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-light">
                A password reset notification has been forwarded to <strong className="font-semibold text-black dark:text-white">{email}</strong>.
              </p>
              <div className="pt-2">
                <Link
                  to="/login"
                  className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] underline underline-offset-4 hover:opacity-70 transition-opacity"
                >
                  Return to Sign In →
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="reset_email"
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

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-[0.22em] transition-opacity hover:opacity-85 flex items-center justify-center gap-2 mt-3 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span>Dispatching Link...</span>
                ) : (
                  <>
                    <span>Send Reset Instructions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10 text-center text-xs text-stone-500 font-light">
            <span>Remember your credentials? </span>
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
