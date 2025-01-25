"use client";

import React from "react";
import { useCart } from "../providers";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  const hasItems = cartItems.length > 0;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-indigo-800">My Cart</h2>

      {!hasItems && (
        <p className="text-gray-700">
          Your cart is empty.{" "}
          <Link href="/" className="text-indigo-600 underline">
            Go back
          </Link>
        </p>
      )}

      {hasItems && (
        <>
          <ul className="space-y-4 mb-6">
            {cartItems.map((car) => (
              <li
                key={car.id}
                className="flex items-center bg-white p-4 rounded-md shadow"
              >
                <img
                  src={car.image}
                  alt={`${car.make} ${car.model}`}
                  className="w-32 h-20 object-cover rounded mr-4"
                />
                <div className="flex-grow">
                  <p className="font-semibold text-gray-800">
                    {car.year} {car.make} {car.model}
                  </p>
                  <p className="text-gray-600">Price: ${car.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(car.id)}
                  className="text-red-600 hover:text-red-800 ml-4"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          {/* Proceed to Payment */}
          <Link
            href="/payment"
            className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
          >
            Proceed to Payment
          </Link>
        </>
      )}
    </div>
  );
}
