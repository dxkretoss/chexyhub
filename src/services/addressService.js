/**
 * Address Service
 * Future Supabase customer addresses table
 */

const STORAGE_KEY = 'chexyhub_addresses';

const INITIAL_ADDRESSES = [
  {
    id: 'addr-1',
    fullName: 'Aarav Mehta',
    addressLine1: 'Flat 402, Sea Green Heights',
    addressLine2: 'Sir Pochkhanawala Road, Worli',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400018',
    phone: '+91 98200 12345',
    isDefault: true,
    tag: 'Home'
  },
  {
    id: 'addr-2',
    fullName: 'Aarav Mehta',
    addressLine1: 'Level 14, One BKC, G Block',
    addressLine2: 'Bandra Kurla Complex',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400051',
    phone: '+91 98200 54321',
    isDefault: false,
    tag: 'Office'
  }
];

export const addressService = {
  getAddresses() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ADDRESSES));
        return INITIAL_ADDRESSES;
      }
      return JSON.parse(stored);
    } catch {
      return INITIAL_ADDRESSES;
    }
  },

  addAddress(address) {
    const addresses = this.getAddresses();
    const newAddr = {
      ...address,
      id: 'addr-' + Date.now(),
      isDefault: address.isDefault || addresses.length === 0,
    };
    let updated = addresses;
    if (newAddr.isDefault) {
      updated = updated.map((a) => ({ ...a, isDefault: false }));
    }
    updated = [newAddr, ...updated];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newAddr;
  },

  updateAddress(id, updates) {
    let addresses = this.getAddresses();
    if (updates.isDefault) {
      addresses = addresses.map((a) => ({ ...a, isDefault: false }));
    }
    const updated = addresses.map((a) => (a.id === id ? { ...a, ...updates } : a));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated.find((a) => a.id === id);
  },

  deleteAddress(id) {
    const addresses = this.getAddresses();
    const updated = addresses.filter((a) => a.id !== id);
    if (updated.length > 0 && !updated.some((a) => a.isDefault)) {
      updated[0].isDefault = true;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  }
};
