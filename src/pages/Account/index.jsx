import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Package,
  MapPin,
  Heart,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Edit2,
  Check,
  Truck
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { orderService } from '../../services/orderService';
import { addressService } from '../../services/addressService';
import { useWishlistStore } from '../../store/useWishlistStore';
import { formatPrice } from '../../utils/formatters';
import { SEO } from '../../components/common/SEO';
import { toast } from 'sonner';

export function Account() {
  const { user, logout, updateProfile } = useAuthStore();
  const { items: wishlistItems } = useWishlistStore();
  const navigate = useNavigate();

  const orders = orderService.getOrders();
  const addresses = addressService.getAddresses();

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Aarav Mehta',
    phone: user?.phone || '+91 98200 12345',
    email: user?.email || 'aarav.mehta@example.com',
  });

  const handleLogout = async () => {
    await logout();
    toast.info('You have been signed out.');
    navigate('/login');
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    await updateProfile(profileData);
    setIsEditing(false);
    toast.success('Profile details updated successfully!');
  };

  return (
    <>
      <SEO
        title="My Account | CHEXY HUB"
        description="Manage your profile, view orders, and update delivery addresses on CHEXY HUB."
      />

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Account Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-stone-200 dark:border-stone-800 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-terracotta/10 text-terracotta border border-terracotta/20 flex items-center justify-center font-bold text-2xl overflow-hidden shadow-inner">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span>{user?.name ? user.name[0] : 'U'}</span>
              )}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-terracotta">
                Verified Member
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal dark:text-dark-text">
                {user?.name || 'Aarav Mehta'}
              </h1>
              <p className="text-xs text-secondary-gray mt-0.5">{user?.email || 'aarav.mehta@example.com'}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-600 dark:text-stone-300 hover:text-rose-600 hover:border-rose-300 flex items-center gap-2 self-start sm:self-auto transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Layout: Sidebar & Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Navigation Sidebar */}
          <aside className="lg:col-span-3 space-y-2">
            <div className="p-3 rounded-2xl glass dark:glass-dark border border-stone-200/80 dark:border-stone-800 space-y-1">
              <Link
                to="/account"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold bg-terracotta text-white shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4" />
                  <span>Overview & Profile</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                to="/account/orders"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Package className="w-4 h-4" />
                  <span>My Orders</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-200 dark:bg-stone-700 font-bold">
                  {orders.length}
                </span>
              </Link>

              <Link
                to="/account/addresses"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4" />
                  <span>Address Book</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-200 dark:bg-stone-700 font-bold">
                  {addresses.length}
                </span>
              </Link>

              <Link
                to="/wishlist"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Heart className="w-4 h-4" />
                  <span>Saved Wishlist</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-200 dark:bg-stone-700 font-bold">
                  {wishlistItems.length}
                </span>
              </Link>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-9 space-y-8">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl glass dark:glass-dark border border-stone-200/60 dark:border-stone-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-secondary-gray block mb-1">
                  Total Orders
                </span>
                <span className="text-2xl font-black text-charcoal dark:text-dark-text">
                  {orders.length}
                </span>
              </div>

              <div className="p-4 rounded-2xl glass dark:glass-dark border border-stone-200/60 dark:border-stone-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-secondary-gray block mb-1">
                  Active Shipments
                </span>
                <span className="text-2xl font-black text-terracotta">
                  {orders.filter((o) => o.status !== 'Delivered').length}
                </span>
              </div>

              <div className="p-4 rounded-2xl glass dark:glass-dark border border-stone-200/60 dark:border-stone-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-secondary-gray block mb-1">
                  Addresses Saved
                </span>
                <span className="text-2xl font-black text-charcoal dark:text-dark-text">
                  {addresses.length}
                </span>
              </div>

              <div className="p-4 rounded-2xl glass dark:glass-dark border border-stone-200/60 dark:border-stone-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-secondary-gray block mb-1">
                  Saved in Wishlist
                </span>
                <span className="text-2xl font-black text-charcoal dark:text-dark-text">
                  {wishlistItems.length}
                </span>
              </div>
            </div>

            {/* Profile Information Box */}
            <div className="p-6 sm:p-8 rounded-3xl glass dark:glass-dark border border-stone-200/80 dark:border-stone-800 space-y-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
                <div>
                  <h3 className="font-serif text-lg font-bold text-charcoal dark:text-dark-text">
                    Personal Profile Details
                  </h3>
                  <p className="text-xs text-secondary-gray">
                    Used for shipping notifications and courier dispatch
                  </p>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-3.5 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 text-xs font-semibold text-terracotta hover:border-terracotta transition-colors flex items-center gap-1.5"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold block mb-1 text-charcoal dark:text-dark-text">Full Name</label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        required
                        className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-dark-text"
                      />
                    </div>
                    <div>
                      <label className="font-semibold block mb-1 text-charcoal dark:text-dark-text">Phone Number</label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        required
                        className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-dark-text"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-semibold block mb-1 text-charcoal dark:text-dark-text">Email Address</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      required
                      className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-dark-text"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white font-semibold text-xs transition-colors"
                  >
                    Save Changes
                  </button>
                </form>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
                  <div>
                    <span className="text-secondary-gray block mb-1">Full Name</span>
                    <strong className="text-charcoal dark:text-dark-text font-semibold text-sm">
                      {user?.name || 'Aarav Mehta'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-secondary-gray block mb-1">Primary Email</span>
                    <strong className="text-charcoal dark:text-dark-text font-semibold text-sm">
                      {user?.email || 'aarav.mehta@example.com'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-secondary-gray block mb-1">Mobile Contact</span>
                    <strong className="text-charcoal dark:text-dark-text font-semibold text-sm">
                      {user?.phone || '+91 98200 12345'}
                    </strong>
                  </div>
                </div>
              )}
            </div>

            {/* Recent Orders Preview */}
            <div className="p-6 sm:p-8 rounded-3xl glass dark:glass-dark border border-stone-200/80 dark:border-stone-800 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
                <h3 className="font-serif text-lg font-bold text-charcoal dark:text-dark-text flex items-center gap-2">
                  <Package className="w-4 h-4 text-terracotta" />
                  <span>Recent Purchases</span>
                </h3>
                <Link
                  to="/account/orders"
                  className="text-xs font-semibold text-terracotta hover:underline"
                >
                  View All Orders →
                </Link>
              </div>

              {orders.slice(0, 2).map((order) => (
                <div
                  key={order.id}
                  className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center font-bold">
                      <Truck className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-charcoal dark:text-dark-text font-bold text-sm">
                          Order #{order.id}
                        </strong>
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-bold text-[10px]">
                          {order.status}
                        </span>
                      </div>
                      <p className="text-secondary-gray mt-0.5">
                        {order.items.length} {order.items.length === 1 ? 'item' : 'items'} • Total: {formatPrice(order.total)}
                      </p>
                    </div>
                  </div>

                  <Link
                    to={`/order-tracking?orderId=${order.id}`}
                    className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-terracotta hover:text-white font-semibold text-xs transition-colors self-end sm:self-auto"
                  >
                    Track Shipment
                  </Link>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
