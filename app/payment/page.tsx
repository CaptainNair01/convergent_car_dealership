"use client";

import React, { useState } from "react";
import { useCart } from "../providers";
import Link from "next/link";

export default function PaymentPage() {
  const { cartItems, clearCart } = useCart();

  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Payment logic needs to be implemented
    alert("Payment submitted! Thanks for your purchase.");
    clearCart();
  };

  if (cartItems.length === 0) {
    return (
      <div>
        <h2 className="text-3xl font-bold mb-6 text-indigo-800">
          Payment Details
        </h2>
        <p className="text-gray-700">
          Your cart is empty.{" "}
          <Link href="/" className="text-indigo-600 underline">
            Go back
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-indigo-800">Payment Details</h2>
      <form onSubmit={handleSubmit} className="max-w-md bg-white p-6 rounded shadow space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Name on Card</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Card Number</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block mb-1 font-semibold">Expiry Date</label>
            <input
              type="text"
              placeholder="MM/YY"
              className="w-full border rounded px-3 py-2"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              required
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-semibold">CVV</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
        >
          Submit Payment
        </button>
      </form>
    </div>
  );
}
