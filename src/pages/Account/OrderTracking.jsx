import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Truck,
  CheckCircle2,
  Clock,
  Package,
  MapPin,
  Search,
  ArrowRight,
  ShieldCheck,
  Phone
} from 'lucide-react';
import { orderService } from '../../services/orderService';
import { formatPrice, formatDate } from '../../utils/formatters';
import { SEO } from '../../components/common/SEO';

export function OrderTracking() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialOrderId = searchParams.get('orderId') || 'CHX-98241';

  const [inputQuery, setInputQuery] = useState(initialOrderId);
  const [trackedOrder, setTrackedOrder] = useState(
    orderService.getOrderById(initialOrderId) || orderService.getOrders()[0]
  );

  useEffect(() => {
    const id = searchParams.get('orderId');
    if (id) {
      const match = orderService.getOrderById(id);
      if (match) {
        setTrackedOrder(match);
        setInputQuery(id);
      }
    }
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    const match = orderService.getOrderById(inputQuery.trim());
    if (match) {
      setTrackedOrder(match);
      setSearchParams({ orderId: match.id });
    } else {
      setTrackedOrder(null);
    }
  };

  return (
    <>
      <SEO
        title="Live Order Tracking | CHEXY HUB"
        description="Track your checkered shirt shipment in real time with our courier integration."
      />

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase font-bold tracking-widest text-terracotta block mb-1">
            Real-Time Logistics
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal dark:text-dark-text">
            Track Your Order
          </h1>
          <p className="text-xs sm:text-sm text-secondary-gray mt-2">
            Enter your Order ID (e.g. CHX-98241) or BlueDart waybill tracking number.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto mb-12 flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Enter Order ID (CHX-98241)"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="w-full text-xs pl-10 pr-3 py-3 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-dark-text uppercase focus:outline-none focus:ring-1 focus:ring-terracotta"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold shadow-md transition-colors"
          >
            Track
          </button>
        </form>

        {trackedOrder ? (
          <div className="space-y-8">
            {/* Shipment Summary Card */}
            <div className="p-6 sm:p-8 rounded-3xl glass dark:glass-dark border border-stone-200/80 dark:border-stone-800 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800 text-xs">
                <div>
                  <span className="text-secondary-gray">Order Reference: </span>
                  <strong className="text-charcoal dark:text-dark-text text-sm font-bold">
                    #{trackedOrder.id}
                  </strong>
                  <span className="text-secondary-gray ml-3">
                    Courier: {trackedOrder.courier}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-secondary-gray">Waybill / AWB: </span>
                  <span className="font-mono font-bold text-terracotta bg-terracotta/10 px-2 py-0.5 rounded-lg">
                    {trackedOrder.trackingNumber}
                  </span>
                </div>
              </div>

              {/* Estimated Delivery Notice */}
              <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase font-bold tracking-wider text-secondary-gray">
                      Current Status
                    </span>
                    <h3 className="font-serif text-xl font-bold text-charcoal dark:text-dark-text">
                      {trackedOrder.status}
                    </h3>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-secondary-gray block">Estimated Delivery</span>
                  <strong className="text-sm font-bold text-charcoal dark:text-dark-text">
                    {formatDate(trackedOrder.estimatedDelivery)}
                  </strong>
                </div>
              </div>

              {/* Visual Step-by-Step Timeline */}
              <div className="mt-10 pt-6 border-t border-stone-100 dark:border-stone-800">
                <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200 dark:before:bg-stone-800">
                  {trackedOrder.timeline.map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center z-10 flex-shrink-0 transition-colors ${
                          step.done
                            ? 'bg-terracotta text-white shadow-md'
                            : 'bg-stone-200 dark:bg-stone-800 text-stone-400'
                        }`}
                      >
                        {step.done ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <Clock className="w-4 h-4" />
                        )}
                      </div>

                      <div className="flex-1 pt-0.5">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-xs sm:text-sm text-charcoal dark:text-dark-text">
                            {step.status}
                          </h4>
                          <span className="text-[11px] text-secondary-gray font-medium">
                            {step.time}
                          </span>
                        </div>
                        <p className="text-xs text-secondary-gray mt-0.5 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Package Items & Address Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Package Contents */}
              <div className="p-6 rounded-3xl glass dark:glass-dark border border-stone-200/80 dark:border-stone-800 space-y-3">
                <h4 className="font-serif font-bold text-sm text-charcoal dark:text-dark-text flex items-center gap-2">
                  <Package className="w-4 h-4 text-terracotta" />
                  <span>Package Contents</span>
                </h4>
                <div className="space-y-3 pt-2">
                  {trackedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-16 rounded-xl object-cover bg-stone-100 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item.slug}`}
                          className="font-semibold text-charcoal dark:text-dark-text hover:text-terracotta truncate block"
                        >
                          {item.name}
                        </Link>
                        <p className="text-secondary-gray text-[11px]">
                          Size: {item.size} • Qty: {item.quantity}
                        </p>
                        <p className="font-bold text-charcoal dark:text-dark-text mt-0.5">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Address Details */}
              <div className="p-6 rounded-3xl glass dark:glass-dark border border-stone-200/80 dark:border-stone-800 space-y-3">
                <h4 className="font-serif font-bold text-sm text-charcoal dark:text-dark-text flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-terracotta" />
                  <span>Destination Address</span>
                </h4>
                <div className="text-xs space-y-1.5 pt-2 text-secondary-gray leading-relaxed">
                  <strong className="text-charcoal dark:text-dark-text font-bold block text-sm">
                    {trackedOrder.shippingAddress.fullName}
                  </strong>
                  <p>{trackedOrder.shippingAddress.addressLine1}</p>
                  {trackedOrder.shippingAddress.addressLine2 && (
                    <p>{trackedOrder.shippingAddress.addressLine2}</p>
                  )}
                  <p>
                    {trackedOrder.shippingAddress.city}, {trackedOrder.shippingAddress.state} —{' '}
                    {trackedOrder.shippingAddress.postalCode}
                  </p>
                  <p className="pt-2 flex items-center gap-1.5 font-medium text-charcoal dark:text-dark-text">
                    <Phone className="w-3.5 h-3.5 text-terracotta" />
                    <span>{trackedOrder.shippingAddress.phone}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-16 text-center p-8 rounded-3xl glass dark:glass-dark border border-stone-200 dark:border-stone-800 max-w-md mx-auto">
            <h3 className="font-serif text-lg font-bold mb-2">Order Not Found</h3>
            <p className="text-xs text-secondary-gray mb-4">
              We couldn't locate an active shipment for "{inputQuery}". Please check your Order ID or view your past orders in your account.
            </p>
            <Link
              to="/account/orders"
              className="text-xs font-semibold text-terracotta hover:underline"
            >
              View Orders in My Account →
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
