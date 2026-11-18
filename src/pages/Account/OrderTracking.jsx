import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Truck,
  Check,
  Clock,
  Package,
  MapPin,
  Search,
  ArrowRight,
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
    <div className="bg-[#FAFAFA] dark:bg-[#0E0E0E] text-black dark:text-white transition-colors duration-300 min-h-screen">
      <SEO
        title="Live Order Tracking | CHEXY HUB"
        description="Track your checkered shirt shipment in real time with our courier integration."
      />

      <div className="pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-8 max-w-[1200px] mx-auto w-full">
        {/* Editorial Header */}
        <div className="pb-6 sm:pb-8 border-b border-black/10 dark:border-white/10 mb-8 sm:mb-10">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 mb-2">
            <span>CLIENT ADVISORY</span>
            <span>•</span>
            <span>LIVE LOGISTICS</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-black dark:text-white">
            TRACK YOUR SHIPMENT
          </h1>
          <p className="text-xs sm:text-sm font-light text-stone-600 dark:text-stone-400 mt-2">
            Enter your order reference code (e.g. CHX-98241) or courier AWB tracking identifier.
          </p>
        </div>

        {/* Minimal Search Bar */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-16 flex border-b border-black dark:border-white pb-3">
          <Search className="w-5 h-5 text-stone-400 mr-3 flex-shrink-0 self-center" />
          <input
            type="text"
            placeholder="ENTER ORDER ID (E.G. CHX-98241)"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 bg-transparent text-xs uppercase tracking-wider text-black dark:text-white placeholder:text-stone-400 focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black text-[11px] font-bold uppercase tracking-[0.2em] hover:opacity-85 transition-opacity"
          >
            Locate
          </button>
        </form>

        {trackedOrder ? (
          <div className="space-y-12">
            {/* Shipment Summary Panel */}
            <div className="bg-white dark:bg-[#121212] p-8 sm:p-12 border border-black/10 dark:border-white/10 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-black/10 dark:border-white/10 text-xs">
                <div>
                  <span className="text-stone-400 uppercase tracking-widest text-[10px] block">Order Identifier</span>
                  <strong className="text-black dark:text-white text-base font-bold font-mono">
                    #{trackedOrder.id}
                  </strong>
                  <span className="text-stone-500 text-xs block mt-0.5">
                    Carrier: {trackedOrder.courier}
                  </span>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-stone-400 uppercase tracking-widest text-[10px] block">Waybill / Air AWB</span>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-black dark:text-white">
                    {trackedOrder.trackingNumber}
                  </span>
                </div>
              </div>

              {/* Status & ETA */}
              <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-stone-400 block mb-1">
                    Consignment State
                  </span>
                  <h3 className="font-serif text-2xl font-normal text-black dark:text-white">
                    {trackedOrder.status}
                  </h3>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-stone-400 block mb-1">
                    Estimated Atelier Delivery
                  </span>
                  <strong className="text-base font-bold text-black dark:text-white">
                    {formatDate(trackedOrder.estimatedDelivery)}
                  </strong>
                </div>
              </div>

              {/* Step Timeline */}
              <div className="mt-12 pt-8 border-t border-black/10 dark:border-white/10">
                <div className="space-y-8 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-px before:bg-black/15 dark:before:bg-white/15">
                  {trackedOrder.timeline.map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-6">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center z-10 flex-shrink-0 transition-colors ${
                          step.done
                            ? 'bg-black dark:bg-white text-white dark:text-black'
                            : 'bg-stone-200 dark:bg-stone-800 text-stone-400'
                        }`}
                      >
                        {step.done ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <Clock className="w-3.5 h-3.5" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h4 className="font-bold text-xs uppercase tracking-wider text-black dark:text-white">
                            {step.status}
                          </h4>
                          <span className="text-[11px] font-mono text-stone-400">
                            {step.time}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 font-light mt-1 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Package Contents & Destination Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Package Details */}
              <div className="bg-white dark:bg-[#121212] p-8 border border-black/10 dark:border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 block mb-4">
                  Consigned Garments
                </span>
                <div className="space-y-4 divide-y divide-black/10 dark:divide-white/10">
                  {trackedOrder.items.map((item, idx) => (
                    <div key={idx} className="pt-4 first:pt-0 flex items-center gap-4 text-xs">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-18 object-cover bg-stone-100 dark:bg-stone-900 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <Link
                          to={`/product/${item.slug}`}
                          className="font-bold uppercase tracking-wider text-black dark:text-white truncate block hover:opacity-60 transition-opacity"
                        >
                          {item.name}
                        </Link>
                        <p className="text-stone-400 text-[11px]">
                          SIZE: {item.size} • QTY: {item.quantity}
                        </p>
                        <p className="font-bold text-black dark:text-white text-xs pt-1">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Destination Address */}
              <div className="bg-white dark:bg-[#121212] p-8 border border-black/10 dark:border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 block mb-4">
                  Delivery Destination
                </span>
                <div className="text-xs space-y-1.5 text-stone-600 dark:text-stone-400 leading-relaxed font-light">
                  <strong className="text-black dark:text-white font-bold block text-sm uppercase tracking-wider">
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
                  <p className="pt-3 font-medium text-black dark:text-white flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-stone-400" />
                    <span>{trackedOrder.shippingAddress.phone}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-20 text-center max-w-md mx-auto space-y-4">
            <h3 className="font-serif text-2xl font-normal text-black dark:text-white">
              NO CONSIGNMENT FOUND
            </h3>
            <p className="text-xs text-stone-500 font-light">
              We could not locate an active shipment matching "{inputQuery}". Please verify your order reference.
            </p>
            <div className="pt-4">
              <Link
                to="/account/orders"
                className="inline-block text-xs font-bold uppercase tracking-[0.2em] underline underline-offset-4 hover:opacity-70 transition-opacity"
              >
                Access My Account Orders →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
