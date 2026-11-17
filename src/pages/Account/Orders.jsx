import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react';
import { orderService } from '../../services/orderService';
import { formatPrice, formatDate } from '../../utils/formatters';
import { SEO } from '../../components/common/SEO';

export function Orders() {
  const orders = orderService.getOrders();

  return (
    <>
      <SEO
        title="My Orders | CHEXY HUB"
        description="View past orders and track shipment statuses for all your CHEXY HUB purchases."
      />

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Navigation Breadcrumb */}
        <Link
          to="/account"
          className="inline-flex items-center gap-1.5 text-xs text-secondary-gray hover:text-terracotta mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Account Overview</span>
        </Link>

        <div className="pb-6 mb-8 border-b border-stone-200 dark:border-stone-800">
          <span className="text-xs uppercase font-bold tracking-widest text-terracotta block mb-1">
            Order History
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal dark:text-dark-text">
            My Orders ({orders.length})
          </h1>
        </div>

        {orders.length === 0 ? (
          <div className="py-20 text-center p-8 rounded-3xl glass dark:glass-dark border border-stone-200 dark:border-stone-800 max-w-md mx-auto">
            <Package className="w-12 h-12 text-terracotta mx-auto mb-3" />
            <h2 className="font-serif text-xl font-bold mb-2">No Orders Placed Yet</h2>
            <p className="text-xs text-secondary-gray mb-6">
              You haven’t completed any purchases yet. Explore our checkered collections.
            </p>
            <Link
              to="/shop"
              className="px-6 py-2.5 rounded-full bg-terracotta text-white text-xs font-semibold"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-6 rounded-3xl glass dark:glass-dark border border-stone-200/80 dark:border-stone-800 space-y-4 shadow-sm"
              >
                {/* Header summary */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800 text-xs">
                  <div>
                    <span className="text-secondary-gray">Order ID: </span>
                    <strong className="text-charcoal dark:text-dark-text font-bold text-sm">
                      #{order.id}
                    </strong>
                    <span className="text-secondary-gray ml-3">
                      Placed on {formatDate(order.createdAt)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-bold text-xs">
                      {order.status}
                    </span>
                    <Link
                      to={`/order-tracking?orderId=${order.id}`}
                      className="px-4 py-1.5 rounded-xl bg-terracotta text-white font-semibold text-xs hover:bg-terracotta-hover transition-colors flex items-center gap-1.5"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Track Shipment</span>
                    </Link>
                  </div>
                </div>

                {/* Items strip */}
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 text-xs">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-20 rounded-xl object-cover bg-stone-100 dark:bg-stone-800 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item.slug}`}
                          className="font-bold text-sm text-charcoal dark:text-dark-text hover:text-terracotta transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <p className="text-secondary-gray mt-0.5">
                          Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                        </p>
                        <p className="font-bold text-charcoal dark:text-dark-text mt-1">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer price & address */}
                <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                  <div className="text-secondary-gray">
                    <span>Delivering to: </span>
                    <strong className="text-charcoal dark:text-dark-text">
                      {order.shippingAddress.fullName}, {order.shippingAddress.city} ({order.shippingAddress.postalCode})
                    </strong>
                  </div>
                  <div className="text-right">
                    <span className="text-secondary-gray">Grand Total: </span>
                    <strong className="text-base font-bold text-charcoal dark:text-dark-text">
                      {formatPrice(order.total)}
                    </strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
