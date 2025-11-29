import type React from "react"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
})

export const metadata: Metadata = {
  title: "GrowUp Academy | Premium Learning Platform",
  description:
    "Master new skills with our premium courses in editing, coding, and tech. Join thousands of elite learners today.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${outfit.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Toaster position="bottom-right" />
        <Analytics />
      </body>
    </html>
  )
}
