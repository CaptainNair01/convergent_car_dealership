// app/RootLayoutClient.tsx
"use client";

import { ReactNode } from "react";
import { CartProvider, useCart } from "./providers";
import Link from "next/link";

// A small subcomponent that shows the icon + text + in-line badge
function CartIcon() {
  const { cartItems } = useCart();
  const count = cartItems.length;

  return (
    <Link href="/cart" className="flex items-center hover:opacity-80">
      {/* Cart icon */}
      <svg
        className="w-6 h-6 mr-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.98-1.67l1.22-7.33H6" />
      </svg>

      <span>Cart</span>

      {/* If the cart has items, show a small circle badge next to it */}
      {count > 0 && (
        <span
          className="ml-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
          title={`${count} item(s) in cart`}
        >
          {count}
        </span>
      )}
    </Link>
  );
}

export default function RootLayoutClient({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {/* Header */}
      <header className="bg-indigo-700 text-white shadow">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            <Link href="/">Convergent Car Dealership</Link>
          </h1>
          {/* Cart icon with badge */}
          <CartIcon />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-indigo-700 text-white">
        <div className="max-w-5xl mx-auto px-4 py-4 text-center text-sm">
          &copy; {new Date().getFullYear()} Convergent Car Dealership
        </div>
      </footer>
    </CartProvider>
  );
}
