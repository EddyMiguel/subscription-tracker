'use client'

import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
import { Sidebar } from '@/components/layout/sidebar'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1E293B',
            color: '#F8FAFC',
            border: '1px solid #475569',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#F8FAFC',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#F8FAFC',
            },
          },
        }}
      />
      {children}
    </SessionProvider>
  )
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const pathname = usePathname()
  
  const isAuthPage = pathname === '/login' || pathname === '/register'
  
  if (!session && !isAuthPage) {
    return null
  }

  if (isAuthPage) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="min-h-screen">
        {children}
      </main>
    </div>
  )
}
