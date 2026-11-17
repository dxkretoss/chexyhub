import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Plus, Trash2, Edit2, ArrowLeft, Check } from 'lucide-react';
import { addressService } from '../../services/addressService';
import { SEO } from '../../components/common/SEO';
import { toast } from 'sonner';

export function Addresses() {
  const [addresses, setAddresses] = useState(addressService.getAddresses());
  const [isAdding, setIsAdding] = useState(false);
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

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newAddress.fullName || !newAddress.addressLine1 || !newAddress.city) {
      toast.error('Please fill required address fields.');
      return;
    }
    const added = addressService.addAddress(newAddress);
    setAddresses(addressService.getAddresses());
    setIsAdding(false);
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

  const handleDelete = (id) => {
    const updated = addressService.deleteAddress(id);
    setAddresses(updated);
    toast.info('Address removed.');
  };

  const handleSetDefault = (id) => {
    addressService.updateAddress(id, { isDefault: true });
    setAddresses(addressService.getAddresses());
    toast.success('Default address updated.');
  };

  return (
    <>
      <SEO
        title="Saved Addresses | CHEXY HUB"
        description="Manage your saved delivery addresses on CHEXY HUB."
      />

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <Link
          to="/account"
          className="inline-flex items-center gap-1.5 text-xs text-secondary-gray hover:text-terracotta mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Account Overview</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-stone-200 dark:border-stone-800 gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-terracotta block mb-1">
              Delivery Locations
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal dark:text-dark-text">
              Saved Address Book ({addresses.length})
            </h1>
          </div>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-4 py-2.5 rounded-xl bg-terracotta text-white font-semibold text-xs hover:bg-terracotta-hover flex items-center gap-1.5 self-start sm:self-auto transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>{isAdding ? 'Cancel' : 'Add New Address'}</span>
          </button>
        </div>

        {/* Add Address Form Accordion */}
        {isAdding && (
          <form
            onSubmit={handleAddSubmit}
            className="p-6 sm:p-8 rounded-3xl glass dark:glass-dark border border-stone-200/80 dark:border-stone-800 mb-8 space-y-4 text-xs shadow-md animate-fade-in"
          >
            <h3 className="font-serif font-bold text-base text-charcoal dark:text-dark-text mb-4">
              Enter New Delivery Address
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold block mb-1 text-charcoal dark:text-dark-text">Full Name *</label>
                <input
                  type="text"
                  placeholder="Recipient Name"
                  value={newAddress.fullName}
                  onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                  required
                  className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-dark-text"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1 text-charcoal dark:text-dark-text">Phone Number *</label>
                <input
                  type="tel"
                  placeholder="+91 98200 12345"
                  value={newAddress.phone}
                  onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                  required
                  className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-dark-text"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold block mb-1 text-charcoal dark:text-dark-text">Flat / House / Street *</label>
              <input
                type="text"
                placeholder="402 Sea Green, Worli"
                value={newAddress.addressLine1}
                onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                required
                className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-dark-text"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-semibold block mb-1 text-charcoal dark:text-dark-text">City *</label>
                <input
                  type="text"
                  placeholder="Mumbai"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                  required
                  className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-dark-text"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1 text-charcoal dark:text-dark-text">State *</label>
                <input
                  type="text"
                  placeholder="Maharashtra"
                  value={newAddress.state}
                  onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                  required
                  className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-dark-text"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1 text-charcoal dark:text-dark-text">PIN Code *</label>
                <input
                  type="text"
                  placeholder="400018"
                  value={newAddress.postalCode}
                  onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                  required
                  className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-dark-text"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-charcoal dark:text-dark-text">
                <input
                  type="checkbox"
                  checked={newAddress.isDefault}
                  onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                  className="rounded text-terracotta focus:ring-terracotta w-4 h-4"
                />
                <span>Set as primary default address</span>
              </label>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white font-semibold text-xs transition-colors"
            >
              Save Address
            </button>
          </form>
        )}

        {/* Saved Addresses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`p-6 rounded-3xl glass dark:glass-dark border transition-all flex flex-col justify-between ${
                addr.isDefault
                  ? 'border-terracotta ring-1 ring-terracotta/40'
                  : 'border-stone-200/80 dark:border-stone-800'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-[10px] font-bold text-secondary-gray uppercase">
                    {addr.tag}
                  </span>
                  {addr.isDefault && (
                    <span className="text-[11px] font-bold text-terracotta flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Default Address</span>
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-sm text-charcoal dark:text-dark-text">
                  {addr.fullName}
                </h3>
                <p className="text-xs text-secondary-gray leading-relaxed">
                  {addr.addressLine1}
                  {addr.addressLine2 ? `, ${addr.addressLine2}` : ''}
                  <br />
                  {addr.city}, {addr.state} — {addr.postalCode}
                </p>
                <p className="text-xs text-secondary-gray">Phone: {addr.phone}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                {!addr.isDefault && (
                  <button
                    onClick={() => handleSetDefault(addr.id)}
                    className="text-terracotta hover:underline font-semibold"
                  >
                    Make Default
                  </button>
                )}
                <button
                  onClick={() => handleDelete(addr.id)}
                  className="text-stone-400 hover:text-rose-600 ml-auto transition-colors p-1"
                  title="Delete address"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
