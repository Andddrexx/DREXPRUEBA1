import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Product, CartItem } from '../types';

export type DeliveryMethod = 'hand' | 'shipping';

export const SHIPPING_BASE_COST = 3.99;
export const FREE_SHIPPING_MIN_ITEMS = 2;

export interface CartToast {
  id: number;
  productName: string;
}

interface CartContextType {
  cart: CartItem[];
  deliveryMethod: DeliveryMethod;
  setDeliveryMethod: (method: DeliveryMethod) => void;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getDiscount: () => number;
  getFinalPrice: () => number;
  getShippingCost: () => number;
  toasts: CartToast[];
  dismissToast: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('hand');
  const [toasts, setToasts] = useState<CartToast[]>([]);
  const [toastCounter, setToastCounter] = useState(0);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToCart = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevCart, { product, quantity }];
    });

    setToastCounter((c) => {
      const id = c + 1;
      const toast: CartToast = { id, productName: product.name };
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
      return id;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const getDiscount = () => {
    const totalItems = getTotalItems();
    if (totalItems >= 4) {
      return 20;
    } else if (totalItems >= 3) {
      return 10;
    } else if (totalItems >= 2) {
      return 5;
    }
    return 0;
  };

  const getFinalPrice = () => {
    return Math.max(0, getTotalPrice() - getDiscount() + getShippingCost());
  };

  const getShippingCost = () => {
    if (deliveryMethod !== 'shipping') return 0;
    return getTotalItems() >= FREE_SHIPPING_MIN_ITEMS ? 0 : SHIPPING_BASE_COST;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        deliveryMethod,
        setDeliveryMethod,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        getDiscount,
        getFinalPrice,
        getShippingCost,
        toasts,
        dismissToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
