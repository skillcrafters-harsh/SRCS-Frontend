import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Smart Roll Cutting System (SRCS) – Advanced Solution for Optimized Roll Cutting',
  description: 'Discover the Smart Roll Cutting System (SRCS), the most efficient solution for solving roll cutting problems. Maximize material usage and reduce waste with SRCS technology.',
  generator: 'v0.app',
  keywords: ['Smart Roll Cutting System', 'SRCS', 'roll cutting problem', 'roll cutting', 'SRCS roll cutting', 'optimized roll cutting solution', 'material optimization', 'waste reduction', 'manufacturing efficiency'],
  authors: [{ name: 'SRCS Team' }],
  openGraph: {
    title: 'Smart Roll Cutting System (SRCS) – Advanced Solution for Optimized Roll Cutting',
    description: 'Discover the Smart Roll Cutting System (SRCS), the most efficient solution for solving roll cutting problems. Maximize material usage and reduce waste with SRCS technology.',
    url: 'https://srcs.vercel.app',
    siteName: 'Smart Roll Cutting System',
    images: [
      {
        url: '/final-logo.png',
        width: 1200,
        height: 630,
        alt: 'Smart Roll Cutting System (SRCS)',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Roll Cutting System (SRCS)',
    description: 'Advanced Solution for Optimized Roll Cutting',
    images: ['/main-logo.png'],
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <meta name="" content="xMhcXsBpLPfVWNXWG6hXQ8tFQ5DVfbtZreM05iAqvzc" />
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Toaster richColors closeButton position="top-right" />
        <Analytics />
      </body>
    </html>
  );
}
