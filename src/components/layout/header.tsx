'use client'

import { useSession } from 'next-auth/react'
import { User, Bell, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  title: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function Header({ title, action }: HeaderProps) {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border">
      <div className="flex items-center justify-between px-8 py-4">
        <h1 className="text-2xl font-bold text-slate-50">{title}</h1>
        
        <div className="flex items-center gap-4">
          {action && (
            <Button onClick={action.onClick}>
              <Plus className="w-4 h-4" />
              {action.label}
            </Button>
          )}
          
          <div className="flex items-center gap-3 pl-4 border-l border-border">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-50">
                {session?.user?.name || session?.user?.email}
              </p>
              <p className="text-xs text-slate-400">Usuario</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
