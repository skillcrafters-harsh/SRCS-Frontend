import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: 'SRCS Vercel | Smart Roll Cutting System | Roll Cutting Optimization Software',
  description: 'SRCS Vercel - Smart Roll Cutting System for roll cutting optimization, material waste reduction, and manufacturing efficiency. Free roll cutting calculator and optimization tool.',
  keywords: ['SRCS', 'SRCS Vercel', 'Smart Roll Cutting System', 'roll cutting optimization', 'roll cutting software', 'roll cutting calculator', 'material waste reduction', 'manufacturing efficiency', 'cutting pattern optimization', 'roll cutting problem solver', 'textile cutting optimization', 'paper roll cutting', 'metal roll cutting', 'plastic roll cutting', 'fabric cutting optimization', 'industrial cutting software', 'cutting plan generator', 'waste minimization tool', 'production optimization', 'cutting efficiency software', 'roll cutting algorithm', 'automated cutting solutions', 'smart manufacturing tools', 'cutting cost reduction', 'roll optimization system'],
  authors: [{ name: 'SRCS Team' }],
  openGraph: {
    title: 'SRCS Vercel | Smart Roll Cutting System – Roll Cutting Optimization',
    description: 'SRCS Vercel - Smart Roll Cutting System. Reduce material waste by 30%, optimize cutting patterns, and boost manufacturing efficiency instantly.',
    url: 'https://srcs.vercel.app',
    siteName: 'Smart Roll Cutting System',
    images: [
      {
        url: '/final-logo.png',
        width: 1200,
        height: 630,
        alt: 'Smart Roll Cutting System (SRCS) - Optimize Roll Cutting Patterns',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Roll Cutting System (SRCS)',
    description: 'Intelligent roll cutting optimization for paper, textile, metal & plastic industries. Save costs & reduce waste.',
    images: ['/final-logo.png'],
  },
  icons: {
    icon: '/final-logo.png',
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="xMhcXsBpLPfVWNXWG6hXQ8tFQ5DVfbtZreM05iAqvzc" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Smart Roll Cutting System (SRCS)",
              "url": "https://srcs.vercel.app/",
              "image": "https://srcs.vercel.app/final-logo.png",
              "description": "An advanced web application that optimizes roll cutting patterns to minimize waste and maximize efficiency in manufacturing processes.",
              "applicationCategory": "ManufacturingSoftware",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "Minimizes material waste up to 30%",
                "Dual optimization strategies",
                "Excel upload and manual input",
                "Real-time visual cutting plans",
                "Exportable performance analytics"
              ]
            })
          }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <div className="min-h-screen bg-white animate-fade-in">
          {children}
        </div>
        <Toaster richColors closeButton position="top-right" />
        <Analytics />
      </body>
    </html>
  );
}
