import type { Metadata, Viewport } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/navigation/header/index'
import { CartListProvider, SearchValueProvider } from '@/components/context'
import MainContent from '@/components/navigation/MainContent'
import { Toaster } from '@/components/ui/toaster'
import Footer from '@/components/footer'
import { Suspense } from 'react'
import { Spinner } from '@/components/ui/spinner'
import ClientProvider from '@/components/ClientProvider'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

const title = 'PCMania'
const description = 'Tienda de computación y tecnología'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description
  },
  icons: {
    icon: '/favicon.ico'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={cn('font-sans antialiased h-screen', fontSans.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense
            fallback={
              <div className="h-full flex justify-center items-center">
                <Spinner />
              </div>
            }
          >
            <ClientProvider>
              <SearchValueProvider>
                <CartListProvider>
                  <Header />
                  <MainContent>{children}</MainContent>
                  <Footer />
                  <Toaster />
                </CartListProvider>
              </SearchValueProvider>
            </ClientProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
