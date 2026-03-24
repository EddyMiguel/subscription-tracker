import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SubTracker - Gestiona tus suscripciones',
  description: 'Aplicación para gestionar y controlar todas tus suscripciones mensuales de forma inteligente.',
  keywords: ['subscriptions', 'tracker', 'Netflix', 'Spotify', 'gestión', 'finanzas'],
  authors: [{ name: 'SubTracker' }],
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
