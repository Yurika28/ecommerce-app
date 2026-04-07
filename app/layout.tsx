import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/components/subComp/CartContext";
import { WishlistProvider } from "@/components/subComp/WishlistContext";
import ErrorBoundary from "@/components/subComp/ErrorBoundary";


export const metadata: Metadata = {
  title: {
    default: "Wholesale — Shop the Best Deals Online",
    template: "%s | Wholesale",
  },
  description:
    "Wholesale is your one-stop shop for furniture, skincare, fashion, groceries, and more — with exclusive deals and free shipping every day.",
  keywords: ["wholesale", "e-commerce", "deals", "fashion", "skincare", "furniture", "free shipping"],
  openGraph: {
    title: "Wholesale — Shop the Best Deals Online",
    description:
      "Exclusive deals on furniture, skincare, fashion, groceries and more. Free shipping available.",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Wholesale",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Wholesale logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wholesale — Shop the Best Deals Online",
    description: "Exclusive deals on furniture, skincare, fashion, groceries and more.",
    images: ["/logo.jpg"],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
          <ErrorBoundary>
            <CartProvider>
              <WishlistProvider>
                {children}
              </WishlistProvider>
            </CartProvider>
          </ErrorBoundary>
        </body>
      </html>
    </ClerkProvider>
  );
}
