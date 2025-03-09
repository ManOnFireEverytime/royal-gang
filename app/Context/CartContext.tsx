"use client";

import React, { createContext, useState, useContext } from "react";

export type CartItems = {
  id: string;
  size: string;
  name: string;
  image: string;
  price: string;
  color: string | null;
  quantity: number;
};

export type ProductDetails = {
  id: string;
  size: string;
  name: string;
  image: string;
  price: string;
  color: string | null;
};

// Create Context
const CartContext = createContext<{
  cartItems: CartItems[];
  removeFromCart: (productId: string) => void;
  addToCart: (product: ProductDetails, quantity: number) => void;
  clearCart: () => void;
}>({
  cartItems: [],
  removeFromCart() {},
  addToCart() {},
  clearCart() {},
});

// Custom Hook to use CartContext
export const useCart = () => useContext(CartContext);

// Cart Provider Component
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);

  const addToCart = (product: ProductDetails, quantity: number) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find(
        (item) =>
          item.id === product.id &&
          item.color === product.color &&
          item.size === product.size,
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id &&
          item.color === product.color &&
          item.size === product.size
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevCart) =>
      prevCart.filter((item) => item.id !== productId),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
