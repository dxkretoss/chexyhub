/**
 * Payment Service (Future Razorpay Architecture)
 * 
 * Future Production Workflow:
 * 1. Customer initiates checkout with validated cart and delivery address.
 * 2. Client calls backend: POST /api/payment/create-order { amount, currency: 'INR' }.
 * 3. Secure backend uses Razorpay secret key (NEVER in client) to generate razorpay_order_id.
 * 4. Client launches Razorpay Standard Checkout SDK modal with options { key: RAZORPAY_KEY_ID, order_id, prefill }.
 * 5. On payment completion, Razorpay returns { razorpay_payment_id, razorpay_order_id, razorpay_signature }.
 * 6. Client sends payload to backend: POST /api/payment/verify-signature.
 * 7. Backend securely validates HMAC-SHA256 signature and records transaction in Supabase orders table.
 * 8. Order confirmed and customer redirected to confirmation.
 * 
 * Note: Never store secret keys in frontend or LocalStorage.
 */

export const paymentService = {
  // Demo payment options supported
  getPaymentMethods() {
    return [
      {
        id: 'razorpay',
        name: 'Razorpay Secure Checkout',
        subtitle: 'UPI, Credit/Debit Cards, NetBanking, Wallets',
        badge: 'Recommended',
        icon: 'CreditCard'
      },
      {
        id: 'upi',
        name: 'Instant UPI',
        subtitle: 'Google Pay, PhonePe, Paytm, BHIM',
        badge: 'Zero Convenience Fee',
        icon: 'Smartphone'
      },
      {
        id: 'cod',
        name: 'Cash on Delivery',
        subtitle: 'Pay via cash or UPI scanner upon delivery',
        badge: 'Available',
        icon: 'Banknote'
      }
    ];
  },

  // Available coupons
  getCoupons() {
    return [
      { code: 'CHEXY10', discountPercent: 10, minSpend: 1500, description: '10% off on orders above ₹1,500' },
      { code: 'FIRSTCHECK', discountPercent: 15, minSpend: 2000, description: '15% off on your first order' },
      { code: 'FAMILY20', discountPercent: 20, minSpend: 4999, description: '20% off on matching family sets' }
    ];
  },

  // Validate coupon
  validateCoupon(code, subtotal) {
    const coupon = this.getCoupons().find(
      (c) => c.code.toUpperCase() === code.trim().toUpperCase()
    );
    if (!coupon) {
      return { valid: false, message: 'Invalid promo code. Try CHEXY10 or FIRSTCHECK.' };
    }
    if (subtotal < coupon.minSpend) {
      return {
        valid: false,
        message: `Minimum order value for ${coupon.code} is ₹${coupon.minSpend}.`
      };
    }
    const discountAmount = Math.round((subtotal * coupon.discountPercent) / 100);
    return {
      valid: true,
      coupon,
      discountAmount,
      message: `Coupon ${coupon.code} applied! You saved ₹${discountAmount}.`
    };
  },

  // Process checkout transaction (demo simulation for frontend phase)
  async processPayment({ orderId, amount, method, customerDetails }) {
    // Simulating gateway network handshake
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      success: true,
      transactionId: 'TXN-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
      gateway: method === 'razorpay' ? 'Razorpay Standard (Demo Mode)' : method,
      amount,
      currency: 'INR',
      status: 'VERIFIED_DEMO',
      timestamp: new Date().toISOString()
    };
  }
};
