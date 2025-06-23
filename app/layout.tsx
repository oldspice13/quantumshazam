import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"
import { ToastContextProvider } from "@/contexts/ToastContext"
import { AccessibilityProvider } from "@/contexts/AccessibilityContext"
import { HelpSystem } from "@/components/HelpSystem"
import { AuthProvider } from "@/contexts/AuthContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Godself Debate Chamber",
  description: "Engage in transformative dialogue with your higher self",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ToastContextProvider>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <AccessibilityProvider>
                {children}
                <HelpSystem />
              </AccessibilityProvider>
            </ThemeProvider>
          </AuthProvider>
        </ToastContextProvider>
      </body>
    </html>
  )
} 