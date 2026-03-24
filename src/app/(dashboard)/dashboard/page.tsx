'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Card, CardContent } from '@/components/ui/card'
import { Modal } from '@/components/ui/modal'
import { Skeleton } from '@/components/ui/skeleton'
import { SubscriptionForm } from '@/components/forms/subscription-form'
import { formatCurrency, formatDate, getMonthlyEquivalent } from '@/lib/utils'
import { CATEGORIES } from '@/types'
import { 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  Calendar,
  Plus,
  Edit2,
  Trash2,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'

interface Subscription {
  id: string
  name: string
  price: number
  paymentType: string
  paymentDate: string
  category: string
  notes?: string | null
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchSubscriptions()
    }
  }, [session])

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch('/api/subscriptions')
      if (response.ok) {
        const data = await response.json()
        setSubscriptions(data)
      }
    } catch (error) {
      toast.error('Error al cargar suscripciones')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta suscripción?')) return

    try {
      const response = await fetch(`/api/subscriptions/${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        toast.success('Suscripción eliminada')
        fetchSubscriptions()
      }
    } catch (error) {
      toast.error('Error al eliminar')
    }
  }

  const handleSuccess = () => {
    setShowModal(false)
    setEditingSubscription(null)
    fetchSubscriptions()
  }

  if (status === 'loading' || loading) {
    return (
      <div className="pl-64">
        <Header title="Dashboard" />
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-8 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardContent>
                <Skeleton className="h-6 w-40 mb-4" />
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Skeleton className="h-6 w-40 mb-4" />
                <Skeleton className="h-64 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  const stats = calculateStats(subscriptions)

  return (
    <div className="pl-64">
      <Header 
        title="Dashboard" 
        action={{
          label: 'Nueva suscripción',
          onClick: () => setShowModal(true)
        }}
      />
      
      <div className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Gasto mensual"
            value={formatCurrency(stats.monthlyTotal)}
            icon={<TrendingUp className="w-6 h-6" />}
            trend="+12%"
            trendUp
          />
          <StatCard
            title="Gasto anual"
            value={formatCurrency(stats.annualTotal)}
            icon={<TrendingDown className="w-6 h-6" />}
            subtitle="Proyectado"
          />
          <StatCard
            title="Total suscripciones"
            value={stats.totalSubscriptions.toString()}
            icon={<CreditCard className="w-6 h-6" />}
          />
          <StatCard
            title="Próximo pago"
            value={stats.nextPayment?.name || 'Ninguno'}
            icon={<Calendar className="w-6 h-6" />}
            subtitle={stats.nextPayment ? formatDate(stats.nextPayment.date) : undefined}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-50">Suscripciones recientes</h2>
              <Button variant="ghost" size="sm" onClick={() => router.push('/subscriptions')}>
                Ver todas
              </Button>
            </div>
            {subscriptions.length === 0 ? (
              <div className="text-center py-12">
                <CreditCard className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">No tienes suscripciones aún</p>
                <Button onClick={() => setShowModal(true)} className="mt-4">
                  <Plus className="w-4 h-4" />
                  Agregar primera suscripción
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {subscriptions.slice(0, 5).map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between p-4 bg-surface-light/50 rounded-lg hover:bg-surface-light transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold"
                        style={{ backgroundColor: getCategoryColor(sub.category) }}
                      >
                        {sub.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-slate-50">{sub.name}</p>
                        <p className="text-xs text-slate-400">
                          {formatDate(sub.paymentDate)} • {sub.paymentType === 'monthly' ? 'Mensual' : 'Anual'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="font-mono font-semibold text-slate-50">
                        {formatCurrency(sub.price)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingSubscription(sub)
                          setShowModal(true)
                        }}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(sub.id)}
                        className="text-danger hover:text-danger"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card>
            <h2 className="text-lg font-semibold text-slate-50 mb-4">Distribución por categoría</h2>
            {subscriptions.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">Agrega suscripciones para ver la distribución</p>
              </div>
            ) : (
              <div className="space-y-3">
                {stats.categoryBreakdown.map((cat) => (
                  <div key={cat.category} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded"
                          style={{ backgroundColor: getCategoryColor(cat.category) }}
                        />
                        <span className="text-slate-300">{cat.category}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-slate-50">
                          {formatCurrency(cat.amount)}
                        </span>
                        <span className="text-xs text-slate-500 w-12 text-right">
                          {cat.percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="h-2 bg-surface-light rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${cat.percentage}%`,
                          backgroundColor: getCategoryColor(cat.category),
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setEditingSubscription(null)
        }}
        title={editingSubscription ? 'Editar suscripción' : 'Nueva suscripción'}
        description="Completa los datos de tu suscripción"
      >
        <SubscriptionForm
          initialData={editingSubscription || undefined}
          onSuccess={handleSuccess}
        />
      </Modal>
    </div>
  )
}

function StatCard({ 
  title, 
  value, 
  icon, 
  trend, 
  trendUp, 
  subtitle 
}: { 
  title: string
  value: string
  icon: React.ReactNode
  trend?: string
  trendUp?: boolean
  subtitle?: string
}) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-slate-400">{title}</p>
          <div className="text-primary">{icon}</div>
        </div>
        <p className="text-2xl font-bold text-slate-50 font-mono">{value}</p>
        {(trend || subtitle) && (
          <div className="mt-2 flex items-center gap-2">
            {trend && (
              <span className={`text-xs font-medium ${trendUp ? 'text-success' : 'text-danger'}`}>
                {trend}
              </span>
            )}
            {subtitle && (
              <span className="text-xs text-slate-500">{subtitle}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function calculateStats(subscriptions: Subscription[]) {
  const monthlyTotal = subscriptions.reduce((sum, sub) => {
    return sum + getMonthlyEquivalent(sub.price, sub.paymentType)
  }, 0)

  const annualTotal = monthlyTotal * 12

  const categoryTotals: Record<string, number> = {}
  subscriptions.forEach((sub) => {
    const monthly = getMonthlyEquivalent(sub.price, sub.paymentType)
    categoryTotals[sub.category] = (categoryTotals[sub.category] || 0) + monthly
  })

  const categoryBreakdown = Object.entries(categoryTotals)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: monthlyTotal > 0 ? (amount / monthlyTotal) * 100 : 0,
    }))
    .sort((a, b) => b.amount - a.amount)

  const sortedByDate = [...subscriptions].sort((a, b) => {
    const dateA = new Date(a.paymentDate)
    const dateB = new Date(b.paymentDate)
    const now = new Date()
    
    const thisYearA = new Date(dateA)
    thisYearA.setFullYear(now.getFullYear())
    if (thisYearA < now) thisYearA.setFullYear(now.getFullYear() + 1)
    
    const thisYearB = new Date(dateB)
    thisYearB.setFullYear(now.getFullYear())
    if (thisYearB < now) thisYearB.setFullYear(now.getFullYear() + 1)
    
    return thisYearA.getTime() - thisYearB.getTime()
  })

  const nextPayment = sortedByDate[0]

  return {
    monthlyTotal,
    annualTotal,
    totalSubscriptions: subscriptions.length,
    nextPayment: nextPayment ? {
      name: nextPayment.name,
      date: new Date(nextPayment.paymentDate),
      amount: nextPayment.price,
    } : null,
    categoryBreakdown,
  }
}

function getCategoryColor(category: string): string {
  const cat = CATEGORIES.find(c => c.value === category)
  return cat?.color || '#6366F1'
}
