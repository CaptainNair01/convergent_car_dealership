"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  image: string;
}

interface CartContextValue {
  cartItems: Car[];
  addToCart: (car: Car) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Car[]>([]);

  function addToCart(car: Car) {
    setCartItems((prev) => {
      // only add if it's not already in the cart
      const exists = prev.some((item) => item.id === car.id);
      return exists ? prev : [...prev, car];
    });
  }

  function removeFromCart(id: number) {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  function clearCart() {
    setCartItems([]);
  }

  const value: CartContextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
