// app/layout.tsx (Server Component)
import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import RootLayoutClient from "./RootLayoutClient";

export const metadata: Metadata = {
  title: "Convergent Car Dealership",
  description: "Buy used cars at the best prices!",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-tr from-indigo-100 via-white to-white flex flex-col text-gray-800">
        {/* Render the client-side sub-layout here */}
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
