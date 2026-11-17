import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, ShoppingBag, ArrowRight, Truck, Check, Sparkles, Tag } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { formatPrice } from '../../utils/formatters';
import { paymentService } from '../../services/paymentService';
import { toast } from 'sonner';

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getSubtotal,
    getShippingFee,
    getFreeShippingProgress,
    getRemainingForFreeShipping,
  } = useCartStore();

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const subtotal = getSubtotal();
  const shippingFee = getShippingFee();
  const freeShippingProgress = getFreeShippingProgress();
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

  const handleCheckoutClick = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      {/* Slide-out Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md glass-drawer shadow-2xl flex flex-col border-l border-white/20 dark:border-stone-800 text-charcoal dark:text-dark-text animate-slide-up sm:animate-none">
          {/* Header */}
          <div className="p-6 border-b border-stone-200/80 dark:border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-terracotta" />
              <h2 className="font-serif text-xl font-bold">Shopping Bag</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 font-semibold text-secondary-gray">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-stone-50 dark:bg-stone-900/60 px-6 py-3 border-b border-stone-200/60 dark:border-stone-800/60">
            <div className="flex items-center justify-between text-xs font-medium mb-1.5">
              <div className="flex items-center gap-1.5 text-terracotta">
                <Truck className="w-4 h-4" />
                <span>
                  {remainingForFree === 0
                    ? '🎉 You unlocked Free Express Shipping!'
                    : `Add ${formatPrice(remainingForFree)} more for Free Shipping`}
                </span>
              </div>
              <span className="font-bold text-stone-500">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-terracotta rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-20 h-20 rounded-full bg-terracotta/10 flex items-center justify-center text-terracotta mb-4">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-lg font-bold mb-2">Your Bag is Empty</h3>
                <p className="text-sm text-secondary-gray mb-6 max-w-xs">
                  Discover our premium checkered shirts crafted for timeless everyday style.
                </p>
                <button
                  onClick={() => {
                    closeCart();
                    navigate('/shop');
                  }}
                  className="px-6 py-2.5 rounded-full bg-terracotta text-white font-medium text-sm hover:bg-terracotta-hover shadow-md transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex gap-4 p-3.5 rounded-2xl glass-card border border-white/60 dark:border-white/10 shadow-sm"
                >
                  <Link
                    to={`/product/${item.slug}`}
                    onClick={closeCart}
                    className="w-20 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-stone-100 dark:bg-stone-800"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/product/${item.slug}`}
                          onClick={closeCart}
                          className="font-semibold text-sm line-clamp-1 hover:text-terracotta transition-colors"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.cartItemId)}
                          className="text-stone-400 hover:text-rose-500 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-xs text-secondary-gray">
                        <span>Size: <strong className="text-charcoal dark:text-dark-text">{item.size}</strong></span>
                        <span>•</span>
                        <span className="truncate">Color: <strong className="text-charcoal dark:text-dark-text">{item.color}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-lg p-0.5">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-xs hover:bg-stone-100 dark:hover:bg-stone-800 rounded text-stone-600 dark:text-stone-300"
                        >
                          -
                        </button>
                        <span className="w-7 text-center text-xs font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-xs hover:bg-stone-100 dark:hover:bg-stone-800 rounded text-stone-600 dark:text-stone-300"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="font-bold text-sm text-charcoal dark:text-dark-text">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Coupon & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-stone-200/80 dark:border-stone-800 bg-white/70 dark:bg-stone-900/70 backdrop-blur-md space-y-4">
              {/* Promo Coupon Form */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon: {appliedCoupon.coupon.code} (-{formatPrice(discountAmount)})</span>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 text-xs underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Coupon code (Try CHEXY10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-charcoal dark:text-dark-text focus:outline-none focus:ring-1 focus:ring-terracotta uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-700 hover:bg-stone-800 text-white text-xs font-semibold transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-secondary-gray pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-charcoal dark:text-dark-text">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-terracotta">
                    <span>Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-charcoal dark:text-dark-text">
                    {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-charcoal dark:text-dark-text pt-2 border-t border-stone-200 dark:border-stone-800">
                  <span>Total</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-3.5 px-6 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-colors"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex gap-2">
                  <Link
                    to="/cart"
                    onClick={closeCart}
                    className="flex-1 py-2 text-center rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-semibold text-charcoal dark:text-dark-text transition-colors"
                  >
                    View Bag Details
                  </Link>
                  <button
                    onClick={closeCart}
                    className="flex-1 py-2 text-center text-xs font-medium text-secondary-gray hover:text-charcoal dark:hover:text-dark-text transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
