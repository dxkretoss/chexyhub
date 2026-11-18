import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  ArrowRight,
  Truck,
  ShieldCheck,
  RotateCcw,
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
    <div className="bg-[#FAFAFA] dark:bg-[#0E0E0E] text-black dark:text-white transition-colors duration-300 min-h-screen">
      <SEO
        title="Your Shopping Bag | CHEXY HUB"
        description="Review your checkered shirts and proceed to secure checkout."
      />

      <div className="pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-8 max-w-[1500px] mx-auto w-full">
        <div className="pb-6 mb-8 border-b border-black/10 dark:border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 mb-2">
              <span>ORDER REVIEW</span>
              <span>•</span>
              <span>SHOPPING BAG</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-black dark:text-white">
              SHOPPING BAG ({items.length})
            </h1>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500 hover:text-black dark:hover:text-white transition-colors underline underline-offset-4"
            >
              Clear Bag
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="py-24 max-w-md mx-auto text-center space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 block">
              Atelier Selection
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-black dark:text-white">
              YOUR BAG IS CURRENTLY EMPTY.
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-light leading-relaxed">
              Discover our latest checkered arrivals for Woman, Man, Kids, and Family.
            </p>
            <div className="pt-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-[0.25em] transition-opacity hover:opacity-80"
              >
                <span>Start Shopping</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Items Table */}
            <div className="lg:col-span-8 space-y-8">
              {/* Free shipping threshold progress */}
              <div className="p-4 bg-white dark:bg-[#121212] border border-black/10 dark:border-white/10 text-xs">
                <div className="flex items-center justify-between font-bold uppercase tracking-wider mb-2 text-[11px]">
                  <span>
                    {remainingForFree === 0
                      ? 'Complimentary Express Shipping Unlocked'
                      : `Add ${formatPrice(remainingForFree)} more for Complimentary Express Shipping`}
                  </span>
                  <span>{freeProgress}%</span>
                </div>
                <div className="w-full h-1 bg-stone-200 dark:bg-stone-800">
                  <div
                    className="h-full bg-black dark:bg-white transition-all duration-500"
                    style={{ width: `${freeProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-black/10 dark:divide-white/10 border-y border-black/10 dark:border-white/10">
                {items.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="py-6 flex flex-col sm:flex-row gap-6 items-start"
                  >
                    <Link
                      to={`/product/${item.slug}`}
                      className="w-24 sm:w-28 aspect-[3/4] overflow-hidden bg-stone-100 dark:bg-stone-900 flex-shrink-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    <div className="flex-1 w-full flex flex-col justify-between min-h-[120px]">
                      <div>
                        <div className="flex justify-between items-start gap-4">
                          <Link
                            to={`/product/${item.slug}`}
                            className="font-serif text-lg font-normal text-black dark:text-white hover:opacity-70 transition-opacity"
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeItem(item.cartItemId)}
                            className="text-stone-400 hover:text-black dark:hover:text-white p-1 transition-colors"
                            title="Remove garment"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-stone-500 uppercase tracking-wider mt-1">
                          <span>Size: {item.size}</span>
                          <span>•</span>
                          <span>Color: {item.color}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-black/5 dark:border-white/5">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-black/20 dark:border-white/20">
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-xs text-black dark:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-xs font-bold font-mono">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-xs text-black dark:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="font-bold text-base tracking-wider text-black dark:text-white">
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
            <div className="lg:col-span-4 bg-white dark:bg-[#121212] p-8 border border-black/10 dark:border-white/10 space-y-8 sticky top-28">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 block pb-4 border-b border-black/10 dark:border-white/10">
                Order Summary
              </span>

              {/* Coupon input */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 border border-black dark:border-white text-xs">
                  <span className="font-bold uppercase tracking-wider text-[11px] text-black dark:text-white">
                    Coupon: {appliedCoupon.coupon.code} (-{formatPrice(discountAmount)})
                  </span>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-stone-400 hover:text-black dark:hover:text-white text-xs underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex border-b border-black dark:border-white pb-2">
                  <input
                    type="text"
                    placeholder="PROMO CODE (CHEXY10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full bg-transparent text-xs uppercase tracking-wider text-black dark:text-white placeholder:text-stone-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold uppercase tracking-widest hover:opacity-85 transition-opacity"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Price details */}
              <div className="space-y-3 text-xs tracking-wider uppercase text-stone-600 dark:text-stone-400 pt-2">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-black dark:text-white">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-black dark:text-white font-bold">
                    <span>Coupon Savings</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="font-semibold text-black dark:text-white">
                    {shippingFee === 0 ? 'COMPLIMENTARY' : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-black dark:text-white pt-4 border-t border-black/10 dark:border-white/10">
                  <span>Grand Total</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-black dark:bg-white text-white dark:text-black text-[11px] font-bold uppercase tracking-[0.25em] transition-opacity hover:opacity-85 flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="pt-4 border-t border-black/10 dark:border-white/10 space-y-2 text-[11px] text-stone-400 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>256-bit Encrypted Checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>15-Day Complimentary Returns</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
