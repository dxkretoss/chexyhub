import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, ArrowRight, Sparkles, UserCheck } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { SEO } from '../../components/common/SEO';
import { toast } from 'sonner';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/account';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login({ email, password });
    if (result.success) {
      toast.success(`Welcome back, ${result.user.name}!`);
      navigate(from, { replace: true });
    } else {
      toast.error(result.error);
    }
  };

  const handleDemoAutofill = () => {
    setEmail('aarav.mehta@example.com');
    setPassword('ChexyHub2026!');
    toast.info('Demo credentials auto-filled!');
  };

  return (
    <>
      <SEO
        title="Sign In | CHEXY HUB"
        description="Sign in to your CHEXY HUB account to track orders and manage your saved addresses."
      />

      <div className="pt-28 pb-20 px-4 max-w-md mx-auto w-full">
        <div className="p-8 sm:p-10 rounded-3xl glass dark:glass-dark border border-stone-200/80 dark:border-stone-800 shadow-2xl">
          {/* Brand header */}
          <div className="text-center mb-8">
            <img
              src="/assets/mob_logo.png"
              alt="CHEXY HUB"
              className="w-14 h-14 mx-auto mb-3 object-contain rounded-2xl shadow-sm"
            />
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal dark:text-dark-text">
              Welcome Back
            </h1>
            <p className="text-xs text-secondary-gray mt-1">
              Sign in to manage your checkered wardrobe & track deliveries.
            </p>
          </div>

          {/* Quick Demo Credentials Autofill Banner */}
          <div className="mb-6 p-3 rounded-2xl bg-terracotta/5 border border-terracotta/20 flex items-center justify-between text-xs">
            <div>
              <p className="font-bold text-terracotta">Try Demo Account</p>
              <p className="text-[11px] text-secondary-gray">Aarav Mehta (demo user)</p>
            </div>
            <button
              type="button"
              onClick={handleDemoAutofill}
              className="px-3 py-1.5 rounded-xl bg-terracotta text-white font-semibold text-[11px] hover:bg-terracotta-hover transition-colors"
            >
              Auto Fill
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-charcoal dark:text-dark-text block mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-dark-text focus:outline-none focus:ring-1 focus:ring-terracotta"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="font-semibold text-charcoal dark:text-dark-text">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] text-terracotta hover:underline font-semibold"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-dark-text focus:outline-none focus:ring-1 focus:ring-terracotta"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-all mt-6"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Registration link */}
          <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-800 text-center text-xs text-secondary-gray">
            <span>Don't have an account yet? </span>
            <Link
              to="/register"
              className="font-bold text-terracotta hover:underline"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
