import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  CreditCard,
  Smartphone,
  Banknote,
  Truck,
  CheckCircle,
  Lock,
  ArrowRight,
  Info,
  Sparkles,
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
  const { items, getSubtotal, getShippingFee, clearCart } = useCartStore();
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
      toast.error('Please complete all mandatory delivery address fields.');
      return;
    }

    if (formData.paymentMethod === 'razorpay' || formData.paymentMethod === 'upi') {
      setShowRazorpayDemoModal(true);
    } else {
      finalizeOrder('Cash on Delivery');
    }
  };

  const finalizeOrder = (paymentGatewayString) => {
    setIsProcessing(true);

    setTimeout(() => {
      const createdOrder = orderService.createOrder({
        items: items.map((i) => ({
          id: i.id,
          name: i.name,
          slug: i.slug,
          price: i.price,
          quantity: i.quantity,
          size: i.size,
          color: i.color,
          image: i.image,
        })),
        shippingAddress: {
          fullName: formData.fullName,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          phone: formData.phone,
        },
        paymentMethod: paymentGatewayString,
        subtotal,
        discount: discountAmount,
        shippingFee,
        total: grandTotal,
      });

      confetti({
        particleCount: 100,
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
      <div className="pt-32 pb-20 px-4 max-w-md mx-auto text-center">
        <h2 className="font-serif text-2xl font-bold mb-3">Your Bag is Empty</h2>
        <p className="text-sm text-secondary-gray mb-6">
          Add some stylish check shirts to your bag before checking out.
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 rounded-full bg-terracotta text-white text-xs font-semibold"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Secure Checkout | CHEXY HUB"
        description="Complete your order for premium checkered fashion with secure delivery."
      />

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Title & Trust Header */}
        <div className="pb-6 mb-8 border-b border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-terracotta block mb-1">
              Final Step
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal dark:text-dark-text">
              Secure Checkout
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>256-Bit SSL Encrypted Verification</span>
          </div>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* ============ LEFT COLUMN: ADDRESS & PAYMENT ============ */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Contact Information */}
            <div className="p-6 sm:p-8 rounded-3xl glass dark:glass-dark border border-stone-200/80 dark:border-stone-800 space-y-4 shadow-sm">
              <h2 className="font-serif text-lg font-bold text-charcoal dark:text-dark-text flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-terracotta text-white text-xs flex items-center justify-center font-bold">1</span>
                <span>Contact Details</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-semibold text-charcoal dark:text-dark-text block mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-dark-text focus:outline-none focus:ring-1 focus:ring-terracotta"
                  />
                </div>
                <div>
                  <label className="font-semibold text-charcoal dark:text-dark-text block mb-1.5">
                    Phone Number (for Courier SMS updates) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-dark-text focus:outline-none focus:ring-1 focus:ring-terracotta"
                  />
                </div>
              </div>
            </div>

            {/* 2. Delivery Address */}
            <div className="p-6 sm:p-8 rounded-3xl glass dark:glass-dark border border-stone-200/80 dark:border-stone-800 space-y-4 shadow-sm">
              <h2 className="font-serif text-lg font-bold text-charcoal dark:text-dark-text flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-terracotta text-white text-xs flex items-center justify-center font-bold">2</span>
                <span>Shipping Address</span>
              </h2>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-charcoal dark:text-dark-text block mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-dark-text focus:outline-none focus:ring-1 focus:ring-terracotta"
                  />
                </div>

                <div>
                  <label className="font-semibold text-charcoal dark:text-dark-text block mb-1.5">
                    Flat / House No. / Building / Street *
                  </label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-dark-text focus:outline-none focus:ring-1 focus:ring-terracotta"
                  />
                </div>

                <div>
                  <label className="font-semibold text-charcoal dark:text-dark-text block mb-1.5">
                    Landmark / Area (Optional)
                  </label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-dark-text focus:outline-none focus:ring-1 focus:ring-terracotta"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="font-semibold text-charcoal dark:text-dark-text block mb-1.5">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-dark-text focus:outline-none focus:ring-1 focus:ring-terracotta"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-charcoal dark:text-dark-text block mb-1.5">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-dark-text focus:outline-none focus:ring-1 focus:ring-terracotta"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-charcoal dark:text-dark-text block mb-1.5">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                      className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-dark-text focus:outline-none focus:ring-1 focus:ring-terracotta"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Delivery Method */}
            <div className="p-6 sm:p-8 rounded-3xl glass dark:glass-dark border border-stone-200/80 dark:border-stone-800 space-y-4 shadow-sm">
              <h2 className="font-serif text-lg font-bold text-charcoal dark:text-dark-text flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-terracotta text-white text-xs flex items-center justify-center font-bold">3</span>
                <span>Delivery Method</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <label
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    formData.deliveryMethod === 'express'
                      ? 'border-terracotta bg-terracotta/5 ring-1 ring-terracotta'
                      : 'border-stone-200 dark:border-stone-700 hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 font-bold text-charcoal dark:text-dark-text">
                      <Truck className="w-4 h-4 text-terracotta" />
                      <span>Express Courier (Air)</span>
                    </div>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="express"
                      checked={formData.deliveryMethod === 'express'}
                      onChange={handleChange}
                      className="text-terracotta focus:ring-terracotta"
                    />
                  </div>
                  <p className="text-secondary-gray leading-relaxed">
                    2-3 business days via BlueDart Air. Free on current bag.
                  </p>
                  <span className="font-bold text-emerald-600 mt-2 block">FREE</span>
                </label>

                <label
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    formData.deliveryMethod === 'standard'
                      ? 'border-terracotta bg-terracotta/5 ring-1 ring-terracotta'
                      : 'border-stone-200 dark:border-stone-700 hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 font-bold text-charcoal dark:text-dark-text">
                      <Truck className="w-4 h-4 text-secondary-gray" />
                      <span>Standard Surface</span>
                    </div>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="standard"
                      checked={formData.deliveryMethod === 'standard'}
                      onChange={handleChange}
                      className="text-terracotta focus:ring-terracotta"
                    />
                  </div>
                  <p className="text-secondary-gray leading-relaxed">
                    4-6 business days via surface logistics.
                  </p>
                  <span className="font-bold text-charcoal dark:text-dark-text mt-2 block">₹99</span>
                </label>
              </div>
            </div>

            {/* 4. Payment Method Selection */}
            <div className="p-6 sm:p-8 rounded-3xl glass dark:glass-dark border border-stone-200/80 dark:border-stone-800 space-y-4 shadow-sm">
              <h2 className="font-serif text-lg font-bold text-charcoal dark:text-dark-text flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-terracotta text-white text-xs flex items-center justify-center font-bold">4</span>
                <span>Payment Method</span>
              </h2>

              {/* Architecture Alert */}
              <div className="p-3 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-[11px] text-secondary-gray flex items-start gap-2.5">
                <Info className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Frontend Demo Architecture:</strong> Razorpay Standard integration placeholder prepared with secure signature verification abstraction. No real payment charge is made.
                </span>
              </div>

              <div className="space-y-3 text-xs">
                {/* Razorpay Option */}
                <label
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    formData.paymentMethod === 'razorpay'
                      ? 'border-terracotta bg-terracotta/5 ring-1 ring-terracotta'
                      : 'border-stone-200 dark:border-stone-700 hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center flex-shrink-0">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 font-bold text-charcoal dark:text-dark-text">
                        <span>Razorpay Smart Checkout</span>
                        <span className="px-2 py-0.5 rounded-full bg-terracotta text-white text-[10px]">Recommended</span>
                      </div>
                      <p className="text-secondary-gray mt-0.5">
                        Credit/Debit Cards, NetBanking, Wallets, EMI
                      </p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="razorpay"
                    checked={formData.paymentMethod === 'razorpay'}
                    onChange={handleChange}
                    className="text-terracotta focus:ring-terracotta"
                  />
                </label>

                {/* Instant UPI */}
                <label
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    formData.paymentMethod === 'upi'
                      ? 'border-terracotta bg-terracotta/5 ring-1 ring-terracotta'
                      : 'border-stone-200 dark:border-stone-700 hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 font-bold text-charcoal dark:text-dark-text">
                        <span>Instant UPI</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400 text-[10px]">Fastest</span>
                      </div>
                      <p className="text-secondary-gray mt-0.5">
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
                    className="text-terracotta focus:ring-terracotta"
                  />
                </label>

                {/* Cash on Delivery */}
                <label
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    formData.paymentMethod === 'cod'
                      ? 'border-terracotta bg-terracotta/5 ring-1 ring-terracotta'
                      : 'border-stone-200 dark:border-stone-700 hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center justify-center flex-shrink-0">
                      <Banknote className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-charcoal dark:text-dark-text">
                        Cash on Delivery
                      </div>
                      <p className="text-secondary-gray mt-0.5">
                        Pay cash or scan QR code on arrival
                      </p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                    className="text-terracotta focus:ring-terracotta"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* ============ RIGHT COLUMN: ORDER SUMMARY ============ */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl glass dark:glass-dark border border-stone-200/80 dark:border-stone-800 space-y-6 self-start shadow-xl sticky top-24">
              <h2 className="font-serif text-xl font-bold text-charcoal dark:text-dark-text pb-4 border-b border-stone-200 dark:border-stone-800">
                Order Review ({items.length} {items.length === 1 ? 'item' : 'items'})
              </h2>

              {/* Items Compact Strip */}
              <div className="max-h-60 overflow-y-auto space-y-3 no-scrollbar pr-1">
                {items.map((i) => (
                  <div key={i.cartItemId} className="flex gap-3 text-xs">
                    <img
                      src={i.image}
                      alt={i.name}
                      className="w-12 h-16 rounded-xl object-cover bg-stone-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-charcoal dark:text-dark-text truncate">
                        {i.name}
                      </h4>
                      <p className="text-secondary-gray text-[11px] mt-0.5">
                        Size: {i.size} • Qty: {i.quantity}
                      </p>
                      <p className="font-bold text-charcoal dark:text-dark-text mt-1">
                        {formatPrice(i.price * i.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon input */}
              <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs">
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                      {appliedCoupon.coupon.code} (-{formatPrice(discountAmount)})
                    </span>
                    <button
                      type="button"
                      onClick={() => setAppliedCoupon(null)}
                      className="text-stone-400 hover:text-stone-700 text-xs underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-dark-text uppercase"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-4 py-2.5 rounded-xl bg-stone-900 text-white dark:bg-stone-700 text-xs font-semibold"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Price Calculation */}
              <div className="space-y-2 text-xs text-secondary-gray pt-2 border-t border-stone-100 dark:border-stone-800">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-charcoal dark:text-dark-text">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-terracotta">
                    <span>Coupon Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className="font-semibold text-charcoal dark:text-dark-text">
                    {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold text-charcoal dark:text-dark-text pt-4 border-t border-stone-200 dark:border-stone-800">
                  <span>Grand Total</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-2xl bg-terracotta hover:bg-terracotta-hover text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xl transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <span>Confirm & Pay {formatPrice(grandTotal)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-[10px] text-center text-secondary-gray leading-relaxed">
                By placing this order, you agree to CHEXY HUB's 15-Day Return Policy & Terms of Service.
              </p>
            </div>
          </div>
        </form>
      </div>

      {/* Razorpay Gateway Simulation Modal */}
      {showRazorpayDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowRazorpayDemoModal(false)}
          />
          <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl p-6 sm:p-8 z-10 animate-fade-in text-charcoal dark:text-dark-text">
            {/* Razorpay Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0C2340] flex items-center justify-center text-[#3395FF] font-bold text-xs">
                  R
                </div>
                <div>
                  <h3 className="font-bold text-sm">Razorpay Checkout</h3>
                  <p className="text-[10px] text-secondary-gray">Standard Payment Gateway Flow</p>
                </div>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
                Demo Mode
              </span>
            </div>

            <div className="space-y-4 text-xs mb-6">
              <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800 space-y-1">
                <div className="flex justify-between">
                  <span className="text-secondary-gray">Merchant:</span>
                  <strong className="text-charcoal dark:text-dark-text">CHEXY HUB Luxury Fashion</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-gray">Payable Amount:</span>
                  <strong className="text-charcoal dark:text-dark-text text-sm">{formatPrice(grandTotal)}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-gray">Customer:</span>
                  <span>{formData.fullName}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-800 dark:text-amber-300">
                <AlertCircle className="w-4 h-4 inline mr-1 text-amber-600" />
                This is a simulation of the future Razorpay client checkout modal. No actual banking credentials or card details are requested or recorded.
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => finalizeOrder('Razorpay (Demo Signature Verified)')}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl bg-[#3395FF] hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                {isProcessing ? 'Verifying Gateway Signature...' : `Simulate Successful Payment (${formatPrice(grandTotal)})`}
              </button>

              <button
                onClick={() => setShowRazorpayDemoModal(false)}
                className="w-full py-2.5 text-center text-xs text-secondary-gray hover:text-charcoal transition-colors"
              >
                Cancel and return to checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
