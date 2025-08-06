import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "@/styles/global.scss"
import NavMenu from "@/components/general/NavMenu"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Stanislav portfolio",
  description: "Stanislav's website portfolio",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NavMenu />
        {children}
      </body>
    </html>
  )
}
