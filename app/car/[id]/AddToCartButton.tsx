"use client";

import React from "react";
import { useCart } from "@/app/providers";

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  image: string;
}

export default function AddToCartButton({ car }: { car: Car }) {
  const { addToCart } = useCart();

  function handleClick() {
    addToCart(car);
    alert(`${car.make} ${car.model} added to cart!`);
  }

  return (
    <button
      onClick={handleClick}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
    >
      Add to Cart
    </button>
  );
}
