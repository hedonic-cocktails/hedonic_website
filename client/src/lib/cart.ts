import { useState, useEffect, useCallback } from "react";
import type { Product } from "@shared/schema";

export interface CartItem {
  product: Product;
  quantity: number;
}

const CART_KEY = "hedonic_cart";

function getStoredCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function setStoredCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(getStoredCart);

  useEffect(() => {
    setStoredCart(items);
    window.dispatchEvent(new CustomEvent("cart-update", { detail: items }));
  }, [items]);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setItems(detail);
    };
    window.addEventListener("cart-update", handler);
    return () => window.removeEventListener("cart-update", handler);
  }, []);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, quantity }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => i.product.id !== productId));
    } else {
      setItems(prev =>
        prev.map(i =>
          i.product.id === productId ? { ...i, quantity } : i
        )
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + Number(i.product.price) * i.quantity,
    0
  );

  return { items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice };
}
