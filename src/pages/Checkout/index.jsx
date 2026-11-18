import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  CreditCard,
  Smartphone,
  Banknote,
  Truck,
  Lock,
  ArrowRight,
  Info,
  AlertCircle
} from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useAuthStore } from '../../store/useAuthStore';
import { formatPrice } from '../../utils/formatters';
import { orderService } from '../../services/orderService';
import { paymentService } from '../../services/paymentService';
import { SEO } from '../../components/common/SEO';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

export function Checkout() {
  const { items, getSubtotal, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    email: user?.email || 'aarav.mehta@example.com',
    fullName: user?.name || 'Aarav Mehta',
    phone: user?.phone || '+91 98200 12345',
    addressLine1: 'Flat 402, Sea Green Heights, Worli',
    addressLine2: 'Near Coastal Promenade',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400018',
    deliveryMethod: 'express', // 'express' or 'standard'
    paymentMethod: 'razorpay', // 'razorpay', 'upi', 'cod'
  });

  const [couponCode, setCouponCode] = useState('CHEXY10');
  const [appliedCoupon, setAppliedCoupon] = useState({
    coupon: { code: 'CHEXY10', discountPercent: 10 },
    discountAmount: Math.round(getSubtotal() * 0.1),
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRazorpayDemoModal, setShowRazorpayDemoModal] = useState(false);

  const subtotal = getSubtotal();
  const shippingFee = formData.deliveryMethod === 'express' ? 0 : 99;
  const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const result = paymentService.validateCoupon(couponCode, subtotal);
    if (result.valid) {
      setAppliedCoupon(result);
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.addressLine1 || !formData.city || !formData.postalCode) {
      toast.error('Please complete all compulsory shipping fields');
      return;
    }

    if (formData.paymentMethod === 'razorpay') {
      setShowRazorpayDemoModal(true);
      return;
    }

    finalizeOrder(formData.paymentMethod === 'upi' ? 'UPI Instant Payment' : 'Cash on Delivery (COD)');
  };

  const finalizeOrder = (paymentDetails) => {
    setIsProcessing(true);

    setTimeout(() => {
      const createdOrder = orderService.createOrder({
        customer: {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
        },
        shippingAddress: {
          fullName: formData.fullName,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          phone: formData.phone,
        },
        items: items.map((i) => ({
          id: i.id,
          name: i.name,
          slug: i.slug,
          image: i.image,
          size: i.size,
          color: i.color,
          price: i.price,
          quantity: i.quantity,
        })),
        pricing: {
          subtotal,
          shippingFee,
          discountAmount,
          grandTotal,
        },
        paymentMethod: paymentDetails,
        deliveryMethod: formData.deliveryMethod,
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      clearCart();
      setIsProcessing(false);
      setShowRazorpayDemoModal(false);
      toast.success(`Order ${createdOrder.id} confirmed successfully!`);
      navigate(`/order-tracking?orderId=${createdOrder.id}`);
    }, 1200);
  };

  if (items.length === 0) {
    return (
      <div className="pt-24 sm:pt-28 pb-16 px-4 max-w-md mx-auto text-center space-y-4">
        <h2 className="font-serif text-3xl font-normal text-black dark:text-white">YOUR BAG IS EMPTY</h2>
        <p className="text-xs text-stone-500 font-light">
          Add some stylish check shirts to your bag before proceeding to checkout.
        </p>
        <div className="pt-4">
          <Link
            to="/shop"
            className="inline-block px-8 py-3.5 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-[0.25em]"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#0E0E0E] text-black dark:text-white transition-colors duration-300 min-h-screen">
      <SEO
        title="Secure Checkout | CHEXY HUB"
        description="Complete your order for premium checkered fashion with secure delivery."
      />

      <div className="pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-8 max-w-[1500px] mx-auto w-full">
        {/* Title & Trust Header */}
        <div className="pb-6 mb-8 border-b border-black/10 dark:border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 mb-2">
              <span>ORDER PROCESSING</span>
              <span>•</span>
              <span>CONFIRMATION</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-black dark:text-white">
              SECURE CHECKOUT
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-light">
            <Lock className="w-4 h-4 text-black dark:text-white" />
            <span>256-Bit SSL Encrypted Verification</span>
          </div>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ============ LEFT COLUMN: ADDRESS & PAYMENT ============ */}
          <div className="lg:col-span-7 space-y-12">
            {/* 1. Contact Information */}
            <div className="bg-white dark:bg-[#121212] p-8 sm:p-10 border border-black/10 dark:border-white/10 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-black/10 dark:border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">01</span>
                <h2 className="font-serif text-xl font-normal text-black dark:text-white">
                  CLIENT DETAILS
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 block mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-black/30 dark:border-white/30 py-3 text-xs uppercase tracking-wider text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 block mb-2">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-black/30 dark:border-white/30 py-3 text-xs uppercase tracking-wider text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* 2. Delivery Address */}
            <div className="bg-white dark:bg-[#121212] p-8 sm:p-10 border border-black/10 dark:border-white/10 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-black/10 dark:border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">02</span>
                <h2 className="font-serif text-xl font-normal text-black dark:text-white">
                  SHIPPING DESTINATION
                </h2>
              </div>

              <div className="space-y-6 text-xs">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 block mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-black/30 dark:border-white/30 py-3 text-xs uppercase tracking-wider text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 block mb-2">
                    Flat / House No. / Building / Street *
                  </label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-black/30 dark:border-white/30 py-3 text-xs uppercase tracking-wider text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 block mb-2">
                    Landmark / Floor (Optional)
                  </label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-black/30 dark:border-white/30 py-3 text-xs uppercase tracking-wider text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 block mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-black/30 dark:border-white/30 py-3 text-xs uppercase tracking-wider text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 block mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-black/30 dark:border-white/30 py-3 text-xs uppercase tracking-wider text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 block mb-2">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-black/30 dark:border-white/30 py-3 text-xs uppercase tracking-wider text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Delivery Method */}
            <div className="bg-white dark:bg-[#121212] p-8 sm:p-10 border border-black/10 dark:border-white/10 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-black/10 dark:border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">03</span>
                <h2 className="font-serif text-xl font-normal text-black dark:text-white">
                  DELIVERY SPEED
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <label
                  className={`p-5 border cursor-pointer transition-all flex flex-col justify-between ${
                    formData.deliveryMethod === 'express'
                      ? 'border-black dark:border-white bg-black/5 dark:bg-white/5'
                      : 'border-black/15 dark:border-white/15 hover:border-black/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold uppercase tracking-wider text-black dark:text-white">
                      Express Courier (Air)
                    </span>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="express"
                      checked={formData.deliveryMethod === 'express'}
                      onChange={handleChange}
                      className="accent-black dark:accent-white"
                    />
                  </div>
                  <p className="text-stone-500 font-light text-[11px] leading-relaxed">
                    2 to 3 business days via BlueDart Air.
                  </p>
                  <span className="font-bold text-black dark:text-white mt-3 block text-[11px] tracking-wider">COMPLIMENTARY</span>
                </label>

                <label
                  className={`p-5 border cursor-pointer transition-all flex flex-col justify-between ${
                    formData.deliveryMethod === 'standard'
                      ? 'border-black dark:border-white bg-black/5 dark:bg-white/5'
                      : 'border-black/15 dark:border-white/15 hover:border-black/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold uppercase tracking-wider text-black dark:text-white">
                      Standard Surface
                    </span>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="standard"
                      checked={formData.deliveryMethod === 'standard'}
                      onChange={handleChange}
                      className="accent-black dark:accent-white"
                    />
                  </div>
                  <p className="text-stone-500 font-light text-[11px] leading-relaxed">
                    4 to 5 business days via surface logistics.
                  </p>
                  <span className="font-bold text-black dark:text-white mt-3 block text-[11px] tracking-wider">₹99</span>
                </label>
              </div>
            </div>

            {/* 4. Payment Method Selection */}
            <div className="bg-white dark:bg-[#121212] p-8 sm:p-10 border border-black/10 dark:border-white/10 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-black/10 dark:border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">04</span>
                <h2 className="font-serif text-xl font-normal text-black dark:text-white">
                  PAYMENT GATEWAY
                </h2>
              </div>

              <div className="p-3 border border-black/15 dark:border-white/15 text-[11px] text-stone-500 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-black dark:text-white flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Frontend Demo Mode:</strong> Razorpay integration abstraction active. No real monetary transaction is incurred during checkout simulation.
                </span>
              </div>

              <div className="space-y-3 text-xs">
                {/* Razorpay Option */}
                <label
                  className={`p-5 border cursor-pointer transition-all flex items-center justify-between ${
                    formData.paymentMethod === 'razorpay'
                      ? 'border-black dark:border-white bg-black/5 dark:bg-white/5'
                      : 'border-black/15 dark:border-white/15 hover:border-black/40'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <CreditCard className="w-5 h-5 text-black dark:text-white" />
                    <div>
                      <div className="font-bold uppercase tracking-wider text-black dark:text-white">
                        Razorpay Smart Checkout
                      </div>
                      <p className="text-stone-500 text-[11px] font-light mt-0.5">
                        Credit / Debit Cards, NetBanking, Wallets
                      </p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="razorpay"
                    checked={formData.paymentMethod === 'razorpay'}
                    onChange={handleChange}
                    className="accent-black dark:accent-white"
                  />
                </label>

                {/* Instant UPI */}
                <label
                  className={`p-5 border cursor-pointer transition-all flex items-center justify-between ${
                    formData.paymentMethod === 'upi'
                      ? 'border-black dark:border-white bg-black/5 dark:bg-white/5'
                      : 'border-black/15 dark:border-white/15 hover:border-black/40'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Smartphone className="w-5 h-5 text-black dark:text-white" />
                    <div>
                      <div className="font-bold uppercase tracking-wider text-black dark:text-white">
                        Instant UPI
                      </div>
                      <p className="text-stone-500 text-[11px] font-light mt-0.5">
                        Google Pay, PhonePe, Paytm, CRED
                      </p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={handleChange}
                    className="accent-black dark:accent-white"
                  />
                </label>

                {/* Cash on Delivery */}
                <label
                  className={`p-5 border cursor-pointer transition-all flex items-center justify-between ${
                    formData.paymentMethod === 'cod'
                      ? 'border-black dark:border-white bg-black/5 dark:bg-white/5'
                      : 'border-black/15 dark:border-white/15 hover:border-black/40'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Banknote className="w-5 h-5 text-black dark:text-white" />
                    <div>
                      <div className="font-bold uppercase tracking-wider text-black dark:text-white">
                        Cash on Delivery (COD)
                      </div>
                      <p className="text-stone-500 text-[11px] font-light mt-0.5">
                        Pay cash or scan dynamic QR code at your doorstep
                      </p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                    className="accent-black dark:accent-white"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* ============ RIGHT COLUMN: ORDER SUMMARY ============ */}
          <div className="lg:col-span-5 bg-white dark:bg-[#121212] p-8 border border-black/10 dark:border-white/10 space-y-8 sticky top-28">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 block pb-4 border-b border-black/10 dark:border-white/10">
              Consignment Items ({items.length})
            </span>

            {/* Items Strip */}
            <div className="max-h-60 overflow-y-auto space-y-4 divide-y divide-black/10 dark:divide-white/10 no-scrollbar pr-1">
              {items.map((i) => (
                <div key={i.cartItemId} className="pt-4 first:pt-0 flex gap-4 text-xs">
                  <img
                    src={i.image}
                    alt={i.name}
                    className="w-12 h-16 object-cover bg-stone-100 dark:bg-stone-900 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <h4 className="font-bold uppercase tracking-wider text-black dark:text-white truncate">
                      {i.name}
                    </h4>
                    <p className="text-stone-400 text-[11px]">
                      SIZE: {i.size} • QTY: {i.quantity}
                    </p>
                    <p className="font-bold text-black dark:text-white text-xs pt-1">
                      {formatPrice(i.price * i.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon input */}
            <div className="pt-4 border-t border-black/10 dark:border-white/10">
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 border border-black dark:border-white text-xs">
                  <span className="font-bold uppercase tracking-wider text-[11px] text-black dark:text-white">
                    Coupon: {appliedCoupon.coupon.code} (-{formatPrice(discountAmount)})
                  </span>
                  <button
                    type="button"
                    onClick={() => setAppliedCoupon(null)}
                    className="text-stone-400 hover:text-black dark:hover:text-white text-xs underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex border-b border-black dark:border-white pb-2">
                  <input
                    type="text"
                    placeholder="PROMO CODE"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full bg-transparent text-xs uppercase tracking-wider text-black dark:text-white placeholder:text-stone-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-4 py-1.5 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold uppercase tracking-widest hover:opacity-85 transition-opacity"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            {/* Price Details */}
            <div className="space-y-3 text-xs tracking-wider uppercase text-stone-600 dark:text-stone-400 pt-2 border-t border-black/10 dark:border-white/10">
              <div className="flex justify-between">
                <span>Bag Subtotal</span>
                <span className="font-semibold text-black dark:text-white">
                  {formatPrice(subtotal)}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-black dark:text-white font-bold">
                  <span>Coupon Discount</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Transit</span>
                <span className="font-semibold text-black dark:text-white">
                  {shippingFee === 0 ? 'COMPLIMENTARY' : formatPrice(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-black dark:text-white pt-4 border-t border-black/10 dark:border-white/10">
                <span>Grand Total</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-black dark:bg-white text-white dark:text-black text-[11px] font-bold uppercase tracking-[0.25em] transition-opacity hover:opacity-85 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Securing Order...</span>
              ) : (
                <>
                  <span>Confirm & Pay {formatPrice(grandTotal)}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            <p className="text-[10px] text-center text-stone-400 leading-relaxed uppercase tracking-wider">
              By confirming, you agree to CHEXY HUB's 15-Day Return Policy & Atelier Conditions.
            </p>
          </div>
        </form>
      </div>

      {/* Razorpay Gateway Simulation Modal */}
      {showRazorpayDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setShowRazorpayDemoModal(false)}
          />
          <div className="relative w-full max-w-md bg-white dark:bg-[#121212] border border-black/10 dark:border-white/10 shadow-2xl p-8 z-10 animate-fade-in text-black dark:text-white">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10 mb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 block">Gateway Integration</span>
                <h3 className="font-serif text-lg font-normal">Razorpay Smart Checkout</h3>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 border border-black dark:border-white">
                Demo
              </span>
            </div>

            <div className="space-y-4 text-xs mb-8">
              <div className="p-4 border border-black/15 dark:border-white/15 space-y-2">
                <div className="flex justify-between">
                  <span className="text-stone-400 uppercase tracking-widest text-[10px]">Merchant</span>
                  <strong className="font-serif">CHEXY HUB Luxury Fashion</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400 uppercase tracking-widest text-[10px]">Payable Total</span>
                  <strong className="text-sm font-bold">{formatPrice(grandTotal)}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400 uppercase tracking-widest text-[10px]">Client</span>
                  <span>{formData.fullName}</span>
                </div>
              </div>

              <p className="text-[11px] text-stone-500 font-light leading-relaxed">
                Simulation of the secure Razorpay standard gateway interface. No actual financial charge will be debited.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => finalizeOrder('Razorpay (Demo Signature Verified)')}
                disabled={isProcessing}
                className="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-[0.25em] transition-opacity hover:opacity-85 flex items-center justify-center gap-2"
              >
                {isProcessing ? 'Verifying Gateway Signature...' : `Authorize Payment (${formatPrice(grandTotal)})`}
              </button>

              <button
                onClick={() => setShowRazorpayDemoModal(false)}
                className="w-full py-2.5 text-center text-xs uppercase tracking-widest text-stone-400 hover:text-black dark:hover:text-white transition-colors"
              >
                Cancel and return to checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
