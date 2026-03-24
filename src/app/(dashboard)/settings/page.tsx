'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Header } from '@/components/layout/header'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { User, Mail, Calendar } from 'lucide-react'

export default function SettingsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="pl-64">
        <Header title="Configuración" />
        <div className="p-8">
          <Card>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-20 bg-surface-light rounded" />
                <div className="h-20 bg-surface-light rounded" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="pl-64">
      <Header title="Configuración" />
      
      <div className="p-8 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Perfil de usuario</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-surface-light/50 rounded-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-xl font-semibold text-slate-50">
                  {session?.user?.name || 'Usuario'}
                </p>
                <p className="text-sm text-slate-400">
                  {session?.user?.email}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-surface-light/50 rounded-lg">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-slate-400">Email</p>
                  <p className="text-slate-50">{session?.user?.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-surface-light/50 rounded-lg">
                <User className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-slate-400">Nombre</p>
                  <p className="text-slate-50">{session?.user?.name || 'No configurado'}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <h3 className="text-lg font-semibold text-slate-50 mb-4">Acerca de SubTracker</h3>
              <p className="text-slate-400 mb-4">
                SubTracker es una aplicación para gestionar tus suscripciones de forma inteligente. 
                Mantén un control de tus gastos mensuales y anula suscripciones que ya no uses.
              </p>
              <div className="flex gap-4 text-sm">
                <span className="text-slate-500">Versión 1.0.0</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-500">Next.js 14 + Prisma</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
