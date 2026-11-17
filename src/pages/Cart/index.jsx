import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  ShoppingBag,
  ArrowRight,
  Truck,
  Tag,
  ShieldCheck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { formatPrice } from '../../utils/formatters';
import { paymentService } from '../../services/paymentService';
import { SEO } from '../../components/common/SEO';
import { toast } from 'sonner';

export function Cart() {
  const {
    items,
    removeItem,
    updateQuantity,
    getSubtotal,
    getShippingFee,
    getFreeShippingProgress,
    getRemainingForFreeShipping,
    clearCart,
  } = useCartStore();

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const navigate = useNavigate();

  const subtotal = getSubtotal();
  const shippingFee = getShippingFee();
  const freeProgress = getFreeShippingProgress();
  const remainingForFree = getRemainingForFreeShipping();

  const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    const result = paymentService.validateCoupon(couponCode, subtotal);
    if (result.valid) {
      setAppliedCoupon(result);
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    toast.info('Coupon removed');
  };

  return (
    <>
      <SEO
        title="Your Shopping Bag | CHEXY HUB"
        description="Review your checkered shirts and proceed to secure checkout."
      />

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="pb-6 mb-8 border-b border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-end justify-between">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-terracotta block mb-1">
              Order Review
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal dark:text-dark-text">
              Shopping Bag ({items.length})
            </h1>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="mt-3 sm:mt-0 text-xs font-semibold text-secondary-gray hover:text-rose-600 transition-colors"
            >
              Clear Bag
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center p-8 rounded-3xl glass dark:glass-dark border border-stone-200 dark:border-stone-800 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl font-bold mb-2">Your Bag is Empty</h2>
            <p className="text-sm text-secondary-gray mb-6">
              Looks like you haven't added any checkered shirts yet. Explore our latest arrivals!
            </p>
            <Link
              to="/shop"
              className="px-6 py-3 rounded-full bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold shadow-md transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Items Table */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free shipping banner */}
              <div className="p-4 rounded-2xl glass dark:glass-dark border border-stone-200 dark:border-stone-800">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <div className="flex items-center gap-2 text-terracotta">
                    <Truck className="w-4 h-4" />
                    <span>
                      {remainingForFree === 0
                        ? '🎉 You unlocked Free Express Shipping!'
                        : `Add ${formatPrice(remainingForFree)} more for Free Shipping`}
                    </span>
                  </div>
                  <span>{freeProgress}%</span>
                </div>
                <div className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-terracotta transition-all duration-500 rounded-full"
                    style={{ width: `${freeProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="flex flex-col sm:flex-row gap-4 p-4 rounded-3xl glass dark:glass-dark border border-stone-200/80 dark:border-stone-800 shadow-sm"
                  >
                    <Link
                      to={`/product/${item.slug}`}
                      className="w-24 h-32 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-900 flex-shrink-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <Link
                            to={`/product/${item.slug}`}
                            className="font-serif font-bold text-base text-charcoal dark:text-dark-text hover:text-terracotta transition-colors"
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeItem(item.cartItemId)}
                            className="text-stone-400 hover:text-rose-500 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-secondary-gray mt-1">
                          <span>Size: <strong>{item.size}</strong></span>
                          <span>•</span>
                          <span>Color: <strong>{item.color}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-stone-100 dark:border-stone-800">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-xl p-0.5">
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-xs text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-xs font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-xs text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="font-bold text-base text-charcoal dark:text-dark-text">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Summary Panel */}
            <div className="lg:col-span-4 p-6 rounded-3xl glass dark:glass-dark border border-stone-200/80 dark:border-stone-800 space-y-6 self-start shadow-xl">
              <h2 className="font-serif text-xl font-bold text-charcoal dark:text-dark-text pb-4 border-b border-stone-200 dark:border-stone-800">
                Order Summary
              </h2>

              {/* Coupon input */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs">
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                    Coupon: {appliedCoupon.coupon.code} (-{formatPrice(discountAmount)})
                  </span>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-stone-400 hover:text-stone-700 text-xs underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code (CHEXY10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-dark-text uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-stone-900 text-white dark:bg-stone-700 text-xs font-semibold"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Price details */}
              <div className="space-y-2 text-xs text-secondary-gray pt-2">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-charcoal dark:text-dark-text">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-terracotta">
                    <span>Coupon Savings</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="font-semibold text-charcoal dark:text-dark-text">
                    {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold text-charcoal dark:text-dark-text pt-4 border-t border-stone-200 dark:border-stone-800">
                  <span>Grand Total</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 rounded-2xl bg-terracotta hover:bg-terracotta-hover text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xl transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-2 text-[11px] text-secondary-gray">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-terracotta" />
                  <span>Razorpay Verified 256-bit encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-3.5 h-3.5 text-terracotta" />
                  <span>15-Day Doorstep Returns & Exchanges</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
