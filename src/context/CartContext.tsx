import { createContext, useContext, useState, useEffect } from 'react';
import api from '@/lib/api';
import { AuthContext } from './AuthContext';

interface CartItem {
  product_id: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  cartCount: number;
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const auth = useContext(AuthContext);
  const token = auth?.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

  // Initialize cart on mount: prefer server-side cart when authenticated
  useEffect(() => {
    const initialize = async () => {
      if (token) {
        try {
          const res = await api.get('/cart');
          const cart = res.data;
          if (cart && Array.isArray(cart.items)) {
            const normalized: CartItem[] = cart.items.map((it: any) => ({
              product_id: it.product_id && it.product_id._id ? it.product_id._id : String(it.product_id),
              quantity: it.quantity,
            }));
            setItems(normalized);
            return;
          }
        } catch (err) {
          console.warn('Failed to load server cart, falling back to localStorage', err);
        }
      }

      const saved = localStorage.getItem('cart');
      if (saved) {
        try {
          setItems(JSON.parse(saved));
        } catch {
          setItems([]);
        }
      }
    };

    initialize();
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = async (productId: string, quantity: number) => {
    if (token) {
      try {
        const res = await api.post('/cart/add', { product_id: productId, quantity });
        const cart = res.data.cart;
        if (cart && Array.isArray(cart.items)) {
          const normalized: CartItem[] = cart.items.map((it: any) => ({
            product_id: it.product_id && it.product_id._id ? it.product_id._id : String(it.product_id),
            quantity: it.quantity,
          }));
          setItems(normalized);
          return;
        }
      } catch (err) {
        console.warn('Add to cart API failed, falling back to local update', err);
      }
    }

    setItems((prev) => {
      const existing = prev.find((item) => item.product_id === productId);
      if (existing) {
        return prev.map((item) =>
          item.product_id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product_id: productId, quantity }];
    });
  };

  const removeFromCart = async (productId: string) => {
    if (token) {
      try {
        const res = await api.delete(`/cart/${productId}`);
        const cart = res.data.cart;
        if (cart && Array.isArray(cart.items)) {
          const normalized: CartItem[] = cart.items.map((it: any) => ({
            product_id: it.product_id && it.product_id._id ? it.product_id._id : String(it.product_id),
            quantity: it.quantity,
          }));
          setItems(normalized);
          return;
        }
      } catch (err) {
        console.warn('Remove from cart API failed, falling back to local update', err);
      }
    }

    setItems((prev) => prev.filter((item) => item.product_id !== productId));
  };

  const clearCart = async () => {
    if (token) {
      try {
        await api.delete('/cart');
        setItems([]);
        return;
      } catch (err) {
        console.warn('Clear cart API failed, falling back to local clear', err);
      }
    }

    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, cartCount, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
