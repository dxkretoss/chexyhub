/**
 * Order Service
 * Prepares data structures for future Supabase Orders and Order Items tables.
 */

const STORAGE_KEY = 'chexyhub_orders';

const INITIAL_DEMO_ORDERS = [
  {
    id: 'CHX-98241',
    createdAt: '2026-11-10T14:32:00Z',
    items: [
      {
        id: 'men-01',
        name: 'Royal Highland Tartan Oxford Shirt',
        price: 2499,
        quantity: 1,
        size: 'L',
        color: 'Heritage Navy & Crimson',
        image: 'https://images.unsplash.com/photo-1623162905251-e98a25a45a67?auto=format&fit=crop&w=300&q=80',
        slug: 'oxford-royal-tartan-shirt'
      },
      {
        id: 'women-01',
        name: 'Parisian Oversized Check Boyfriend Shirt',
        price: 2399,
        quantity: 1,
        size: 'M',
        color: 'Terracotta & Ivory',
        image: 'https://images.unsplash.com/photo-1612190377025-76afa396bc20?auto=format&fit=crop&w=300&q=80',
        slug: 'parisian-oversized-terracotta-check'
      }
    ],
    status: 'In Transit',
    trackingNumber: 'DEL-IND-9941029',
    courier: 'BlueDart Express',
    estimatedDelivery: '2026-11-18',
    shippingAddress: {
      fullName: 'Aarav Mehta',
      addressLine1: 'Flat 402, Sea Green Heights, Worli',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400018',
      phone: '+91 98200 12345'
    },
    paymentMethod: 'Prepaid (Razorpay UPI)',
    subtotal: 4898,
    discount: 500,
    shippingFee: 0,
    total: 4398,
    timeline: [
      { status: 'Order Placed', time: '10 Nov, 02:32 PM', done: true, description: 'Order confirmed and verified' },
      { status: 'Quality Inspected & Packed', time: '11 Nov, 11:15 AM', done: true, description: 'Hand-inspected at Mumbai Fulfillment Center' },
      { status: 'Handed to Courier', time: '12 Nov, 04:40 PM', done: true, description: 'BlueDart Waybill #9941029 generated' },
      { status: 'In Transit', time: '14 Nov, 09:20 AM', done: true, description: 'Departed Mumbai Central Hub, En Route to Delivery Center' },
      { status: 'Out for Delivery', time: 'Expected 18 Nov', done: false, description: 'Courier partner will contact before arrival' },
      { status: 'Delivered', time: 'Pending', done: false, description: 'Package handed over to recipient' }
    ]
  }
];

export const orderService = {
  getOrders() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_ORDERS));
        return INITIAL_DEMO_ORDERS;
      }
      return JSON.parse(stored);
    } catch {
      return INITIAL_DEMO_ORDERS;
    }
  },

  getOrderById(id) {
    const orders = this.getOrders();
    return orders.find((o) => o.id === id || o.trackingNumber === id);
  },

  createOrder(orderData) {
    const orders = this.getOrders();
    const newOrderId = 'CHX-' + Math.floor(10000 + Math.random() * 90000);
    const trackingNum = 'DEL-IND-' + Math.floor(1000000 + Math.random() * 9000000);
    
    const newOrder = {
      id: newOrderId,
      createdAt: new Date().toISOString(),
      items: orderData.items,
      status: 'Order Placed',
      trackingNumber: trackingNum,
      courier: 'BlueDart Express Premium',
      estimatedDelivery: new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0],
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod || 'Razorpay Gateway (Demo Verified)',
      subtotal: orderData.subtotal,
      discount: orderData.discount || 0,
      shippingFee: orderData.shippingFee || 0,
      total: orderData.total,
      timeline: [
        { status: 'Order Placed', time: 'Just now', done: true, description: 'Order confirmed successfully.' },
        { status: 'Quality Inspected & Packed', time: 'Pending', done: false, description: 'Inspected and packed into eco-conscious craft box.' },
        { status: 'Handed to Courier', time: 'Pending', done: false, description: 'Waybill created for courier pickup.' },
        { status: 'In Transit', time: 'Pending', done: false, description: 'En route to local delivery facility.' },
        { status: 'Out for Delivery', time: 'Pending', done: false, description: 'Courier out for delivery.' },
        { status: 'Delivered', time: 'Pending', done: false, description: 'Safe delivery at recipient address.' }
      ]
    };

    const updated = [newOrder, ...orders];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newOrder;
  }
};
