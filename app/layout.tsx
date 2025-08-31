import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ReduxProvider } from "@/providers/redux-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import MobileBottomNav from "@/components/mobile-bottom-nav"

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://the-d-gift-hub.example.com"),
  title: {
    default: "The D Gift Hub — Thoughtful Corporate & Personal Gifts",
    template: "%s | The D Gift Hub",
  },
  description:
    "Discover premium corporate gifts and personal surprises. Phone stands, diaries, books, key stands and more. Seamless checkout with Stripe.",
  keywords: ["gifts", "corporate gifts", "phone stand", "diary", "books", "key stand", "ecommerce"],
  openGraph: {
    title: "The D Gift Hub",
    description: "Discover premium corporate gifts and personal surprises. Seamless Stripe checkout.",
    url: "https://the-d-gift-hub.example.com",
    siteName: "The D Gift Hub",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "The D Gift Hub" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The D Gift Hub",
    description: "Discover premium corporate gifts and personal surprises. Seamless Stripe checkout.",
    images: ["/og.png"],
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
    generator: 'v0.app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
      <body className="font-sans bg-background text-foreground">
        <ReduxProvider>
          <SiteHeader />
          <main className="min-h-[70vh] pb-16 md:pb-0">{children}</main>
          <MobileBottomNav />
          <SiteFooter />
        </ReduxProvider>
      </body>
    </html>
  )
}
