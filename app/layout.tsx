import type { Metadata } from "next";
import { ReactNode } from "react";
import { Inter, Roboto_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title:
    "SRCS Vercel | Smart Roll Cutting System | Roll Cutting Optimization Software",
  description:
    "SRCS Vercel - Smart Roll Cutting System for roll cutting optimization, material waste reduction, and manufacturing efficiency. Free roll cutting calculator and optimization tool.",
  keywords: [
    "SRCS",
    "SRCS Vercel",
    "Smart Roll Cutting System",
    "roll cutting optimization",
    "roll cutting software",
    "roll cutting calculator",
    "material waste reduction",
    "manufacturing efficiency",
    "cutting pattern optimization",
    "roll cutting problem solver",
    "textile cutting optimization",
    "paper roll cutting",
    "metal roll cutting",
    "plastic roll cutting",
    "fabric cutting optimization",
    "industrial cutting software",
    "cutting plan generator",
    "waste minimization tool",
    "production optimization",
    "cutting efficiency software",
    "roll cutting algorithm",
    "automated cutting solutions",
    "smart manufacturing tools",
    "cutting cost reduction",
    "roll optimization system",
  ],
  authors: [{ name: "SRCS Team" }],
  openGraph: {
    title:
      "SRCS Vercel | Smart Roll Cutting System – Roll Cutting Optimization",
    description:
      "SRCS Vercel - Smart Roll Cutting System. Reduce material waste by 30%, optimize cutting patterns, and boost manufacturing efficiency instantly.",
    url: "https://srcs.vercel.app",
    siteName: "Smart Roll Cutting System",
    images: [
      {
        url: "/final-logo.png",
        width: 1200,
        height: 630,
        alt: "Smart Roll Cutting System (SRCS) - Optimize Roll Cutting Patterns",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Roll Cutting System (SRCS)",
    description:
      "Intelligent roll cutting optimization for paper, textile, metal & plastic industries. Save costs & reduce waste.",
    images: ["/final-logo.png"],
  },
  icons: {
    icon: "/final-logo.png",
  },
};

const primarySans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const primaryMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-mono" });

export default function RootLayout({ children }: { children: ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Smart Roll Cutting System (SRCS)",
    url: "https://srcs.vercel.app/",
    image: "https://srcs.vercel.app/final-logo.png",
    description:
      "An advanced web application that optimizes roll cutting patterns to minimize waste and maximize efficiency in manufacturing processes.",
    applicationCategory: "ManufacturingSoftware",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Minimizes material waste up to 30%",
      "Dual optimization strategies",
      "Excel upload and manual input",
      "Real-time visual cutting plans",
      "Exportable performance analytics",
    ],
  } as const;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="xMhcXsBpLPfVWNXWG6hXQ8tFQ5DVfbtZreM05iAqvzc"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body
        className={`min-h-screen flex flex-col font-sans ${primarySans.variable} ${primaryMono.variable}`}
      >
        <Navbar />
        <main className="flex-1 pt-14 sm:pt-16">{children}</main>
        <Footer />
        <Toaster richColors position="top-right" closeButton />
      </body>
    </html>
  );
}
