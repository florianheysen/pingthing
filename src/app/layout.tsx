import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Providers } from "../components/providers"
import { EB_Garamond } from "next/font/google"
import { cn } from "@/utils"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const eb_garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
})

export const metadata: Metadata = {
  title: "Ping Thing",
  description: "Created using jStack",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(inter.variable, eb_garamond.variable, "h-screen")}
    >
      <body className="font-sans antialiased h-full">
        <ThemeProvider attribute="class" defaultTheme="system">
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
