// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Convergent Car Dealership",
  description: "Buy used cars at the best prices!",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      {/* 
        Tailwind classes:
          - min-h-screen ensures full height
          - bg-gradient-to-tr creates a 2-color diagonal gradient
          - from-indigo-100 via-white to-white sets the gradient stops
      */}
      <body className="min-h-screen bg-gradient-to-tr from-indigo-100 via-white to-white flex flex-col text-gray-800">
        {/* Header */}
        <header className="bg-indigo-700 text-white shadow">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              <a href="/">Convergent Car Dealership</a>
            </h1>
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
      </body>
    </html>
  );
}
