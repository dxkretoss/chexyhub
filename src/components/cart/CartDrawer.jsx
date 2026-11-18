import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
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
    <div className="fixed inset-0 z-[60] overflow-hidden select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      {/* Slide-out Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-8">
        <div className="w-screen max-w-md bg-white dark:bg-[#111111] text-black dark:text-white shadow-2xl flex flex-col border-l border-black/10 dark:border-white/10 animate-fade-in">
          {/* Header */}
          <div className="p-6 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-xs font-bold uppercase tracking-[0.22em]">
                SHOPPING BAG
              </h2>
              <span className="text-xs font-light text-stone-400">
                ({items.length})
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1 hover:opacity-60 transition-opacity"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Minimal Free Shipping Notification */}
          <div className="bg-stone-50 dark:bg-stone-900 px-6 py-2.5 border-b border-black/5 dark:border-white/5 text-[11px] uppercase tracking-wider text-stone-500 flex justify-between items-center">
            <span>
              {remainingForFree === 0
                ? 'COMPLIMENTARY EXPRESS SHIPPING UNLOCKED'
                : `ADD ${formatPrice(remainingForFree)} FOR FREE SHIPPING`}
            </span>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <ShoppingBag className="w-10 h-10 text-stone-300 stroke-[1]" />
                <h3 className="font-serif text-xl font-normal">YOUR BAG IS EMPTY</h3>
                <p className="text-xs text-stone-500 font-light max-w-xs">
                  Explore our curated collections of checked shirts for Woman, Man, Kids, and Family.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      closeCart();
                      navigate('/shop');
                    }}
                    className="btn-fashion-primary"
                  >
                    Shop Collection
                  </button>
                </div>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex gap-4 pb-6 border-b border-black/5 dark:border-white/5"
                >
                  <Link
                    to={`/product/${item.slug}`}
                    onClick={closeCart}
                    className="w-20 aspect-[3/4] overflow-hidden flex-shrink-0 bg-stone-100 dark:bg-stone-900"
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
                          className="font-medium text-xs line-clamp-1 hover:underline"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.cartItemId)}
                          className="text-stone-400 hover:text-black dark:hover:text-white transition-colors"
                          title="Remove item"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-500 font-light">
                        <span>SIZE: {item.size}</span>
                        <span>•</span>
                        <span className="truncate">COLOR: {item.color}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-stone-300 dark:border-stone-700 text-xs">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-800"
                        >
                          -
                        </button>
                        <span className="w-7 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-800"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-black/10 dark:border-white/10 space-y-4 bg-white dark:bg-[#111111]">
              {/* Minimal Promo Code Input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="PROMO CODE"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 border border-stone-300 dark:border-stone-700 bg-transparent px-3 py-2 text-xs uppercase tracking-wider focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 border border-black dark:border-white text-[11px] font-bold uppercase tracking-wider hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  Apply
                </button>
              </form>

              {appliedCoupon && (
                <div className="flex justify-between items-center text-xs text-emerald-600">
                  <span>DISCOUNT ({appliedCoupon.code})</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              {/* Subtotal */}
              <div className="space-y-1.5 text-xs text-stone-500 font-light">
                <div className="flex justify-between">
                  <span>SUBTOTAL</span>
                  <span className="font-semibold text-black dark:text-white">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>SHIPPING</span>
                  <span className="font-semibold text-black dark:text-white">
                    {shippingFee === 0 ? 'COMPLIMENTARY' : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-black dark:text-white font-bold text-sm pt-2 border-t border-black/10 dark:border-white/10">
                  <span>TOTAL (INCL. TAXES)</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckoutClick}
                className="w-full py-4 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-[0.22em] transition-opacity hover:opacity-85"
              >
                Continue to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
