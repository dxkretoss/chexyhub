import { create } from 'zustand';
import { cartService } from '../services/cartService';

const FREE_SHIPPING_THRESHOLD = 1999;
const STANDARD_SHIPPING_FEE = 149;

export const useCartStore = create((set, get) => ({
  items: cartService.getCart(),
  isCartOpen: false,

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  addItem: (product, { size, color, quantity = 1 }) => {
    const items = get().items;
    const selectedColor = typeof color === 'string' ? color : color?.name || product.colors[0]?.name;
    const selectedSize = size || product.sizes[0];
    const cartItemId = `${product.id}-${selectedSize}-${selectedColor}`;

    const existingIndex = items.findIndex((i) => i.cartItemId === cartItemId);

    let updated;
    if (existingIndex > -1) {
      updated = [...items];
      updated[existingIndex].quantity += quantity;
    } else {
      updated = [
        ...items,
        {
          cartItemId,
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.thumbnail || product.images[0],
          size: selectedSize,
          color: selectedColor,
          quantity,
          category: product.category,
        }
      ];
    }

    cartService.saveCart(updated);
    set({ items: updated, isCartOpen: true });
  },

  removeItem: (cartItemId) => {
    const updated = get().items.filter((i) => i.cartItemId !== cartItemId);
    cartService.saveCart(updated);
    set({ items: updated });
  },

  updateQuantity: (cartItemId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(cartItemId);
      return;
    }
    const updated = get().items.map((i) =>
      i.cartItemId === cartItemId ? { ...i, quantity } : i
    );
    cartService.saveCart(updated);
    set({ items: updated });
  },

  updateItemOptions: (cartItemId, { size, color }) => {
    const items = get().items;
    const target = items.find((i) => i.cartItemId === cartItemId);
    if (!target) return;

    const newSize = size || target.size;
    const newColor = color || target.color;
    const newCartItemId = `${target.id}-${newSize}-${newColor}`;

    const updated = items.map((i) => {
      if (i.cartItemId === cartItemId) {
        return {
          ...i,
          cartItemId: newCartItemId,
          size: newSize,
          color: newColor,
        };
      }
      return i;
    });

    cartService.saveCart(updated);
    set({ items: updated });
  },

  clearCart: () => {
    cartService.clearCart();
    set({ items: [] });
  },

  // Calculations
  getSubtotal: () => {
    return get().items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  },

  getOriginalTotal: () => {
    return get().items.reduce((acc, item) => acc + (item.originalPrice || item.price) * item.quantity, 0);
  },

  getItemCount: () => {
    return get().items.reduce((acc, item) => acc + item.quantity, 0);
  },

  getShippingFee: () => {
    const subtotal = get().getSubtotal();
    if (subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD) {
      return 0;
    }
    return STANDARD_SHIPPING_FEE;
  },

  getFreeShippingThreshold: () => FREE_SHIPPING_THRESHOLD,

  getFreeShippingProgress: () => {
    const subtotal = get().getSubtotal();
    return Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  },

  getRemainingForFreeShipping: () => {
    const subtotal = get().getSubtotal();
    return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  }
}));
