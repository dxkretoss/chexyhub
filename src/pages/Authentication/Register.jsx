import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
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

  const { register, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }

    const result = await register({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
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
    <>
      <SEO
        title="Create Account | CHEXY HUB"
        description="Join CHEXY HUB for personalized checkered fashion recommendations and seamless order tracking."
      />

      <div className="pt-28 pb-20 px-4 max-w-md mx-auto w-full">
        <div className="p-8 sm:p-10 rounded-3xl glass dark:glass-dark border border-stone-200/80 dark:border-stone-800 shadow-2xl">
          <div className="text-center mb-8">
            <img
              src="/assets/mob_logo.png"
              alt="CHEXY HUB"
              className="w-14 h-14 mx-auto mb-3 object-contain rounded-2xl shadow-sm"
            />
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal dark:text-dark-text">
              Create an Account
            </h1>
            <p className="text-xs text-secondary-gray mt-1">
              Check your style. Unlock exclusive drops & family set savings.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-charcoal dark:text-dark-text block mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="name"
                  placeholder="Aarav Mehta"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-3 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-dark-text focus:outline-none focus:ring-1 focus:ring-terracotta"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-charcoal dark:text-dark-text block mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-3 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-dark-text focus:outline-none focus:ring-1 focus:ring-terracotta"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-charcoal dark:text-dark-text block mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-3 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-dark-text focus:outline-none focus:ring-1 focus:ring-terracotta"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-charcoal dark:text-dark-text block mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  name="password"
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-3 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-dark-text focus:outline-none focus:ring-1 focus:ring-terracotta"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-charcoal dark:text-dark-text block mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
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
                <span>Creating Account...</span>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-800 text-center text-xs text-secondary-gray">
            <span>Already registered with CHEXY HUB? </span>
            <Link to="/login" className="font-bold text-terracotta hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
