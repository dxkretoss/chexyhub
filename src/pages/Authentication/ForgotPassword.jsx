import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import { authService } from '../../services/authService';
import { SEO } from '../../components/common/SEO';
import { toast } from 'sonner';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
    <>
      <SEO
        title="Reset Password | CHEXY HUB"
        description="Reset your CHEXY HUB account password."
      />

      <div className="pt-28 pb-20 px-4 max-w-md mx-auto w-full">
        <div className="p-8 sm:p-10 rounded-3xl glass dark:glass-dark border border-stone-200/80 dark:border-stone-800 shadow-2xl">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs text-secondary-gray hover:text-terracotta mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </Link>

          <div className="text-center mb-8">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal dark:text-dark-text">
              Reset Password
            </h1>
            <p className="text-xs text-secondary-gray mt-2">
              Enter your registered email address and we’ll send you a password recovery link.
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center text-xs space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-emerald-800 dark:text-emerald-400 text-sm">
                Check Your Inbox
              </h3>
              <p className="text-emerald-700 dark:text-emerald-300">
                A password reset instruction email has been dispatched to <strong>{email}</strong>.
              </p>
              <Link
                to="/login"
                className="inline-block mt-4 text-xs font-bold text-terracotta hover:underline"
              >
                Return to Login
              </Link>
            </div>
          ) : (
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

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-all mt-6"
              >
                {loading ? (
                  <span>Sending Link...</span>
                ) : (
                  <>
                    <span>Send Reset Instructions</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
