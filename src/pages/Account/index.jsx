import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import {
  User,
  Package,
  MapPin,
  Heart,
  LogOut,
  ChevronRight,
  Edit2,
  Truck,
  Plus,
  Trash2,
  ArrowRight,
  Check
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { orderService } from '../../services/orderService';
import { addressService } from '../../services/addressService';
import { useWishlistStore } from '../../store/useWishlistStore';
import { formatPrice, formatDate } from '../../utils/formatters';
import { SEO } from '../../components/common/SEO';
import { toast } from 'sonner';

export function Account({ initialTab = 'profile' }) {
  const { user, logout, updateProfile } = useAuthStore();
  const { items: wishlistItems } = useWishlistStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Orders & Addresses states
  const [orders, setOrders] = useState(() => orderService.getOrders());
  const [addresses, setAddresses] = useState(() => addressService.getAddresses());

  // Determine active tab from location or prop
  const getTabFromLocation = () => {
    if (location.pathname.includes('/orders') || searchParams.get('tab') === 'orders') return 'orders';
    if (location.pathname.includes('/addresses') || searchParams.get('tab') === 'addresses') return 'addresses';
    return initialTab || 'profile';
  };

  const [activeTab, setActiveTab] = useState(getTabFromLocation());

  useEffect(() => {
    setActiveTab(getTabFromLocation());
  }, [location.pathname, searchParams, initialTab]);

  // Profile Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Aarav Mehta',
    phone: user?.phone || '+91 98200 12345',
    email: user?.email || 'aarav.mehta@example.com',
  });

  // Sync profile data when user updates
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || 'Aarav Mehta',
        phone: user.phone || '+91 98200 12345',
        email: user.email || 'aarav.mehta@example.com',
      });
    }
  }, [user]);

  // Add Address State
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    tag: 'Home',
    isDefault: false,
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

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    if (tabKey === 'orders') {
      navigate('/account/orders');
    } else if (tabKey === 'addresses') {
      navigate('/account/addresses');
    } else {
      navigate('/account');
    }
  };

  const handleAddAddressSubmit = (e) => {
    e.preventDefault();
    if (!newAddress.fullName || !newAddress.addressLine1 || !newAddress.city) {
      toast.error('Please fill in the required address fields.');
      return;
    }
    addressService.addAddress(newAddress);
    setAddresses(addressService.getAddresses());
    setIsAddingAddress(false);
    setNewAddress({
      fullName: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      tag: 'Home',
      isDefault: false,
    });
    toast.success('Address added to your address book.');
  };

  const handleDeleteAddress = (id) => {
    const updated = addressService.deleteAddress(id);
    setAddresses(updated);
    toast.info('Address removed.');
  };

  const handleSetDefaultAddress = (id) => {
    addressService.updateAddress(id, { isDefault: true });
    setAddresses(addressService.getAddresses());
    toast.success('Default delivery address updated.');
  };

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#0E0E0E] text-black dark:text-white transition-colors duration-300 min-h-screen">
      <SEO
        title="Client Atelier Portal | CHEXY HUB"
        description="Manage your profile, view orders, and update delivery addresses on CHEXY HUB."
      />

      <div className="pt-24 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-8 max-w-[1500px] mx-auto w-full">
        {/* ============================================================== */}
        {/* TOP BAR: Client Atelier Profile Summary Header                 */}
        {/* ============================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-black/10 dark:border-white/10 gap-6">
          <div className="flex items-center gap-5 sm:gap-6">
            <div className="w-16 h-16 border border-black/20 dark:border-white/20 flex items-center justify-center font-serif text-2xl uppercase overflow-hidden bg-white dark:bg-[#121212] flex-shrink-0">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span>{user?.name ? user.name[0] : 'U'}</span>
              )}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 block mb-1">
                Atelier Client
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-black dark:text-white">
                {user?.name || 'Aarav Mehta'}
              </h1>
              <p className="text-xs text-stone-500 font-light mt-0.5">
                {user?.email || 'aarav.mehta@example.com'}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="px-6 py-2.5 border border-black/20 dark:border-white/20 text-xs uppercase tracking-widest font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black flex items-center gap-2 self-start sm:self-auto transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* MAIN LAYOUT: Sticky Sidebar (Left) & Dynamic Content (Right)  */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ============================================================ */}
          {/* STICKY NAVIGATION SIDEBAR (3 cols)                           */}
          {/* ============================================================ */}
          <aside className="lg:col-span-3 lg:sticky lg:top-28 space-y-4 select-none z-10">
            <div className="border border-black/10 dark:border-white/10 divide-y divide-black/10 dark:divide-white/10 bg-white dark:bg-[#121212] shadow-sm">
              {/* Tab 1: Profile Overview */}
              <button
                type="button"
                onClick={() => handleTabChange('profile')}
                className={`w-full flex items-center justify-between px-5 py-4 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-left ${
                  activeTab === 'profile'
                    ? 'bg-black dark:bg-white text-white dark:text-black'
                    : 'text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-900/60 hover:text-black dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4" />
                  <span>Profile Overview</span>
                </div>
                {activeTab === 'profile' && <ChevronRight className="w-3.5 h-3.5" />}
              </button>

              {/* Tab 2: Order History */}
              <button
                type="button"
                onClick={() => handleTabChange('orders')}
                className={`w-full flex items-center justify-between px-5 py-4 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-left ${
                  activeTab === 'orders'
                    ? 'bg-black dark:bg-white text-white dark:text-black'
                    : 'text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-900/60 hover:text-black dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Package className="w-4 h-4" />
                  <span>Order History</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold">
                    ({orders.length})
                  </span>
                  {activeTab === 'orders' && <ChevronRight className="w-3.5 h-3.5" />}
                </div>
              </button>

              {/* Tab 3: Address Book */}
              <button
                type="button"
                onClick={() => handleTabChange('addresses')}
                className={`w-full flex items-center justify-between px-5 py-4 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-left ${
                  activeTab === 'addresses'
                    ? 'bg-black dark:bg-white text-white dark:text-black'
                    : 'text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-900/60 hover:text-black dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4" />
                  <span>Address Book</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold">
                    ({addresses.length})
                  </span>
                  {activeTab === 'addresses' && <ChevronRight className="w-3.5 h-3.5" />}
                </div>
              </button>

              {/* Tab 4: Saved Wishlist */}
              <Link
                to="/wishlist"
                className="flex items-center justify-between px-5 py-4 text-xs font-medium uppercase tracking-wider text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-900/60 hover:text-black dark:hover:text-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Heart className="w-4 h-4" />
                  <span>Saved Wishlist</span>
                </div>
                <span className="text-[10px] font-mono font-bold">
                  ({wishlistItems.length})
                </span>
              </Link>
            </div>

            {/* Atelier Concierge Card */}
            <div className="p-5 border border-black/10 dark:border-white/10 bg-white dark:bg-[#121212] text-xs space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block">
                Atelier Concierge
              </span>
              <p className="text-stone-500 dark:text-stone-400 text-[11px] font-light leading-relaxed">
                Need sizing guidance, custom patterns, or shipment support?
              </p>
              <Link
                to="/contact"
                className="text-[10px] font-bold uppercase tracking-wider underline underline-offset-4 hover:opacity-70 transition-opacity block pt-1 text-black dark:text-white"
              >
                Contact Support →
              </Link>
            </div>
          </aside>

          {/* ============================================================ */}
          {/* MAIN DYNAMIC CONTENT AREA (9 cols)                           */}
          {/* ============================================================ */}
          <main className="lg:col-span-9 min-h-[500px]">
            {/* ---------------------------------------------------------- */}
            {/* TAB 1: PROFILE OVERVIEW                                     */}
            {/* ---------------------------------------------------------- */}
            {activeTab === 'profile' && (
              <div className="space-y-8 animate-fade-in">
                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div
                    onClick={() => handleTabChange('orders')}
                    className="p-6 bg-white dark:bg-[#121212] border border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white transition-colors cursor-pointer"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 block mb-2">
                      Total Orders
                    </span>
                    <span className="text-3xl font-normal font-serif text-black dark:text-white">
                      {orders.length}
                    </span>
                  </div>

                  <div
                    onClick={() => handleTabChange('orders')}
                    className="p-6 bg-white dark:bg-[#121212] border border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white transition-colors cursor-pointer"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 block mb-2">
                      In Transit
                    </span>
                    <span className="text-3xl font-normal font-serif text-black dark:text-white">
                      {orders.filter((o) => o.status !== 'Delivered').length}
                    </span>
                  </div>

                  <div
                    onClick={() => handleTabChange('addresses')}
                    className="p-6 bg-white dark:bg-[#121212] border border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white transition-colors cursor-pointer"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 block mb-2">
                      Saved Addresses
                    </span>
                    <span className="text-3xl font-normal font-serif text-black dark:text-white">
                      {addresses.length}
                    </span>
                  </div>

                  <Link
                    to="/wishlist"
                    className="p-6 bg-white dark:bg-[#121212] border border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white transition-colors block"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 block mb-2">
                      Wishlist Items
                    </span>
                    <span className="text-3xl font-normal font-serif text-black dark:text-white">
                      {wishlistItems.length}
                    </span>
                  </Link>
                </div>

                {/* Profile Information Box */}
                <div className="bg-white dark:bg-[#121212] p-8 sm:p-10 border border-black/10 dark:border-white/10 shadow-sm space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 block mb-1">
                        Client Details
                      </span>
                      <h3 className="font-serif text-xl font-normal text-black dark:text-white">
                        PERSONAL PROFILE
                      </h3>
                    </div>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="text-xs font-bold uppercase tracking-wider underline underline-offset-4 hover:opacity-70 transition-opacity flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                    </button>
                  </div>

                  {isEditing ? (
                    <form onSubmit={handleSaveProfile} className="space-y-6 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 block mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={profileData.name}
                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                            required
                            className="w-full bg-transparent border-b border-black/30 dark:border-white/30 py-2.5 text-xs text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 block mb-2">
                            Telephone
                          </label>
                          <input
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                            required
                            className="w-full bg-transparent border-b border-black/30 dark:border-white/30 py-2.5 text-xs text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 block mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          required
                          className="w-full bg-transparent border-b border-black/30 dark:border-white/30 py-2.5 text-xs text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-8 py-3.5 bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-[0.2em] text-[11px] hover:opacity-85 transition-opacity cursor-pointer"
                      >
                        Save Changes
                      </button>
                    </form>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-xs">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block">
                          Full Name
                        </span>
                        <strong className="text-black dark:text-white font-medium text-sm block">
                          {user?.name || 'Aarav Mehta'}
                        </strong>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block">
                          Primary Email
                        </span>
                        <strong className="text-black dark:text-white font-medium text-sm block">
                          {user?.email || 'aarav.mehta@example.com'}
                        </strong>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block">
                          Mobile Contact
                        </span>
                        <strong className="text-black dark:text-white font-medium text-sm block">
                          {user?.phone || '+91 98200 12345'}
                        </strong>
                      </div>
                    </div>
                  )}
                </div>

                {/* Recent Purchases Preview */}
                <div className="bg-white dark:bg-[#121212] p-8 sm:p-10 border border-black/10 dark:border-white/10 shadow-sm space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
                    <h3 className="font-serif text-xl font-normal text-black dark:text-white">
                      RECENT PURCHASES
                    </h3>
                    <button
                      type="button"
                      onClick={() => handleTabChange('orders')}
                      className="text-xs font-bold uppercase tracking-wider underline underline-offset-4 hover:opacity-70 transition-opacity cursor-pointer"
                    >
                      View All Orders ({orders.length}) →
                    </button>
                  </div>

                  {orders.length === 0 ? (
                    <p className="text-xs text-stone-500 font-light py-4">No purchases recorded yet.</p>
                  ) : (
                    <div className="divide-y divide-black/10 dark:divide-white/10">
                      {orders.slice(0, 2).map((order) => (
                        <div
                          key={order.id}
                          className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <strong className="text-black dark:text-white font-mono font-bold text-sm">
                                #{order.id}
                              </strong>
                              <span className="px-2 py-0.5 border border-black/20 dark:border-white/20 text-[10px] uppercase font-bold tracking-wider text-black dark:text-white">
                                {order.status}
                              </span>
                            </div>
                            <p className="text-stone-500 font-light">
                              {order.items.length} {order.items.length === 1 ? 'item' : 'items'} • Total: {formatPrice(order.total)}
                            </p>
                          </div>

                          <Link
                            to={`/order-tracking?orderId=${order.id}`}
                            className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest text-[10px] hover:opacity-85 transition-opacity self-end sm:self-auto"
                          >
                            Track Shipment
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ---------------------------------------------------------- */}
            {/* TAB 2: ORDER HISTORY (FULL DETAILED LIST)                  */}
            {/* ---------------------------------------------------------- */}
            {activeTab === 'orders' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 block mb-1">
                      Transaction Archive
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-black dark:text-white">
                      ORDER HISTORY ({orders.length})
                    </h2>
                  </div>
                </div>

                {orders.length === 0 ? (
                  <div className="py-20 text-center max-w-md mx-auto space-y-4 bg-white dark:bg-[#121212] p-8 border border-black/10 dark:border-white/10">
                    <Package className="w-10 h-10 mx-auto text-stone-400 stroke-1" />
                    <h3 className="font-serif text-xl font-normal text-black dark:text-white">NO ORDERS RECORDED</h3>
                    <p className="text-xs text-stone-500 font-light">
                      You haven't completed any check shirt purchases yet. Explore our latest arrivals.
                    </p>
                    <div className="pt-2">
                      <Link
                        to="/shop"
                        className="inline-block px-8 py-3.5 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-[0.25em]"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-white dark:bg-[#121212] p-6 sm:p-8 border border-black/10 dark:border-white/10 space-y-6 shadow-sm"
                      >
                        {/* Header summary */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-black/10 dark:border-white/10 text-xs">
                          <div>
                            <span className="text-stone-400 uppercase tracking-widest text-[10px] block">Order Ref</span>
                            <strong className="text-black dark:text-white font-mono font-bold text-sm">
                              #{order.id}
                            </strong>
                            <span className="text-stone-500 text-xs block mt-0.5">
                              Placed on {formatDate(order.createdAt)}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 sm:gap-4">
                            <span className="px-2.5 py-1 border border-black/20 dark:border-white/20 text-black dark:text-white font-bold text-[10px] uppercase tracking-wider">
                              {order.status}
                            </span>
                            <Link
                              to={`/order-tracking?orderId=${order.id}`}
                              className="px-5 py-2 bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest text-[10px] hover:opacity-80 transition-opacity flex items-center gap-2"
                            >
                              <Truck className="w-3.5 h-3.5" />
                              <span>Track Shipment</span>
                            </Link>
                          </div>
                        </div>

                        {/* Items list */}
                        <div className="divide-y divide-black/10 dark:divide-white/10">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="py-4 first:pt-0 flex items-center gap-4 text-xs">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-20 object-cover bg-stone-100 dark:bg-stone-900 flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0 space-y-0.5">
                                <Link
                                  to={`/product/${item.slug}`}
                                  className="font-bold text-sm uppercase tracking-wider text-black dark:text-white hover:opacity-60 transition-opacity line-clamp-1"
                                >
                                  {item.name}
                                </Link>
                                <p className="text-stone-400 text-[11px]">
                                  SIZE: {item.size} • COLOR: {item.color} • QTY: {item.quantity}
                                </p>
                                <p className="font-bold text-black dark:text-white mt-1">
                                  {formatPrice(item.price * item.quantity)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Footer price & address */}
                        <div className="pt-5 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                          <div className="text-stone-500 font-light">
                            <span>Delivering to: </span>
                            <strong className="text-black dark:text-white font-medium">
                              {order.shippingAddress?.fullName || 'Client'}, {order.shippingAddress?.city || ''} ({order.shippingAddress?.postalCode || ''})
                            </strong>
                          </div>
                          <div className="text-right">
                            <span className="text-stone-400 uppercase tracking-widest text-[10px] mr-2">Grand Total</span>
                            <strong className="text-base font-bold text-black dark:text-white">
                              {formatPrice(order.total)}
                            </strong>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ---------------------------------------------------------- */}
            {/* TAB 3: ADDRESS BOOK                                        */}
            {/* ---------------------------------------------------------- */}
            {activeTab === 'addresses' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-black/10 dark:border-white/10 gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 block mb-1">
                      Client Destinations
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-black dark:text-white">
                      SAVED ADDRESSES ({addresses.length})
                    </h2>
                  </div>

                  <button
                    onClick={() => setIsAddingAddress(!isAddingAddress)}
                    className="px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest text-[11px] flex items-center gap-2 self-start sm:self-auto hover:opacity-85 transition-opacity cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{isAddingAddress ? 'Cancel' : 'Add New Address'}</span>
                  </button>
                </div>

                {/* Add Address Form Accordion */}
                {isAddingAddress && (
                  <form
                    onSubmit={handleAddAddressSubmit}
                    className="p-6 sm:p-8 bg-white dark:bg-[#121212] border border-black/10 dark:border-white/10 space-y-5 text-xs shadow-sm animate-fade-in"
                  >
                    <h3 className="font-serif text-lg font-normal text-black dark:text-white mb-2">
                      NEW DESTINATION PARAMETERS
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 block mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          placeholder="Recipient Name"
                          value={newAddress.fullName}
                          onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                          required
                          className="w-full bg-transparent border-b border-black/30 dark:border-white/30 py-2.5 text-xs text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 block mb-1.5">
                          Telephone Contact *
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 98200 12345"
                          value={newAddress.phone}
                          onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                          required
                          className="w-full bg-transparent border-b border-black/30 dark:border-white/30 py-2.5 text-xs text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 block mb-1.5">
                        Address Line 1 *
                      </label>
                      <input
                        type="text"
                        placeholder="House / Flat / Street / Landmark"
                        value={newAddress.addressLine1}
                        onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                        required
                        className="w-full bg-transparent border-b border-black/30 dark:border-white/30 py-2.5 text-xs text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 block mb-1.5">
                          City *
                        </label>
                        <input
                          type="text"
                          placeholder="City"
                          value={newAddress.city}
                          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                          required
                          className="w-full bg-transparent border-b border-black/30 dark:border-white/30 py-2.5 text-xs text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 block mb-1.5">
                          State *
                        </label>
                        <input
                          type="text"
                          placeholder="State"
                          value={newAddress.state}
                          onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                          required
                          className="w-full bg-transparent border-b border-black/30 dark:border-white/30 py-2.5 text-xs text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 block mb-1.5">
                          PIN Code *
                        </label>
                        <input
                          type="text"
                          placeholder="Postal PIN"
                          value={newAddress.postalCode}
                          onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                          required
                          className="w-full bg-transparent border-b border-black/30 dark:border-white/30 py-2.5 text-xs text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="submit"
                        className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-[0.2em] text-xs hover:opacity-85 transition-opacity cursor-pointer"
                      >
                        Save Address
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddingAddress(false)}
                        className="px-6 py-3 border border-black/20 dark:border-white/20 text-xs uppercase tracking-wider font-bold hover:opacity-70 transition-opacity cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {/* Address Cards Grid */}
                {addresses.length === 0 ? (
                  <div className="py-16 text-center max-w-md mx-auto space-y-4 bg-white dark:bg-[#121212] p-8 border border-black/10 dark:border-white/10">
                    <MapPin className="w-10 h-10 mx-auto text-stone-400 stroke-1" />
                    <h3 className="font-serif text-xl font-normal text-black dark:text-white">NO SAVED ADDRESSES</h3>
                    <p className="text-xs text-stone-500 font-light">
                      Add a destination address to expedite checkout during seasonal check drops.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className={`p-6 sm:p-7 bg-white dark:bg-[#121212] border flex flex-col justify-between ${
                          addr.isDefault
                            ? 'border-black dark:border-white ring-1 ring-black dark:ring-white'
                            : 'border-black/10 dark:border-white/10'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                              {addr.tag || 'Delivery Destination'}
                            </span>
                            {addr.isDefault && (
                              <span className="px-2 py-0.5 border border-black dark:border-white text-[10px] uppercase font-bold tracking-widest text-black dark:text-white">
                                Primary Default
                              </span>
                            )}
                          </div>

                          <div className="text-xs text-stone-600 dark:text-stone-300 space-y-1 font-light leading-relaxed">
                            <strong className="text-black dark:text-white font-bold block text-sm tracking-wide">
                              {addr.fullName}
                            </strong>
                            <p>{addr.addressLine1}</p>
                            {addr.addressLine2 && <p>{addr.addressLine2}</p>}
                            <p>
                              {addr.city}, {addr.state} — {addr.postalCode}
                            </p>
                            <p className="pt-2 text-stone-400 text-[11px]">Phone: {addr.phone}</p>
                          </div>
                        </div>

                        <div className="pt-5 mt-5 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs">
                          {!addr.isDefault ? (
                            <button
                              onClick={() => handleSetDefaultAddress(addr.id)}
                              className="text-[11px] font-bold uppercase tracking-wider underline underline-offset-4 hover:opacity-70 transition-opacity cursor-pointer"
                            >
                              Set as Default
                            </button>
                          ) : (
                            <span className="text-[11px] text-stone-400 uppercase tracking-wider font-light flex items-center gap-1">
                              <Check className="w-3 h-3" />
                              <span>Default Selected</span>
                            </span>
                          )}

                          <button
                            onClick={() => handleDeleteAddress(addr.id)}
                            className="text-stone-400 hover:text-red-500 dark:hover:text-red-400 p-1 transition-colors cursor-pointer"
                            title="Remove address"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
