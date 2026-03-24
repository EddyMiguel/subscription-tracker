'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Card, CardContent } from '@/components/ui/card'
import { Modal } from '@/components/ui/modal'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { SubscriptionForm } from '@/components/forms/subscription-form'
import { formatCurrency, formatDate, getMonthlyEquivalent } from '@/lib/utils'
import { CATEGORIES } from '@/types'
import { 
  Search, 
  Plus,
  Edit2,
  Trash2,
  CreditCard,
  Filter,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import toast from 'react-hot-toast'

interface Subscription {
  id: string
  name: string
  price: number
  paymentType: string
  paymentDate: string
  category: string
  notes?: string | null
  createdAt: string
}

export default function SubscriptionsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

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

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !categoryFilter || sub.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const totalMonthly = filteredSubscriptions.reduce((sum, sub) => {
    return sum + getMonthlyEquivalent(sub.price, sub.paymentType)
  }, 0)

  if (status === 'loading' || loading) {
    return (
      <div className="pl-64">
        <Header title="Suscripciones" />
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-3">
                    <div className="h-12 w-12 bg-surface-light rounded-lg" />
                    <div className="h-4 bg-surface-light rounded w-3/4" />
                    <div className="h-3 bg-surface-light rounded w-1/2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pl-64">
      <Header 
        title="Suscripciones" 
        action={{
          label: 'Nueva suscripción',
          onClick: () => setShowModal(true)
        }}
      />
      
      <div className="p-8 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar suscripciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-11 pl-10 pr-4 bg-surface border border-border rounded text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Select
              options={[
                { value: '', label: 'Todas las categorías' },
                ...CATEGORIES.map(cat => ({ value: cat.value, label: cat.label }))
              ]}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full sm:w-48"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-slate-400">Total mensual</p>
              <p className="text-2xl font-bold text-slate-50 font-mono">
                {formatCurrency(totalMonthly)}
              </p>
            </div>
          </div>
        </div>

        {filteredSubscriptions.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <CreditCard className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-50 mb-2">
                {searchTerm || categoryFilter
                  ? 'No se encontraron suscripciones'
                  : 'No tienes suscripciones'}
              </h3>
              <p className="text-slate-400 mb-6">
                {searchTerm || categoryFilter
                  ? 'Intenta con otros filtros de búsqueda'
                  : 'Empieza agregando tus primeras suscripciones'}
              </p>
              {!searchTerm && !categoryFilter && (
                <Button onClick={() => setShowModal(true)}>
                  <Plus className="w-4 h-4" />
                  Agregar suscripción
                </Button>
              )}
              {(searchTerm || categoryFilter) && (
                <Button variant="secondary" onClick={() => {
                  setSearchTerm('')
                  setCategoryFilter('')
                }}>
                  <X className="w-4 h-4" />
                  Limpiar filtros
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubscriptions.map((sub) => (
              <Card key={sub.id} className="group hover:shadow-xl transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-bold"
                      style={{ backgroundColor: getCategoryColor(sub.category) }}
                    >
                      {sub.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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

                  <h3 className="text-lg font-semibold text-slate-50 mb-1">
                    {sub.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <Badge
                      style={{ 
                        backgroundColor: `${getCategoryColor(sub.category)}20`,
                        color: getCategoryColor(sub.category)
                      }}
                    >
                      {getCategoryLabel(sub.category)}
                    </Badge>
                    <span className="text-xs text-slate-500">
                      {sub.paymentType === 'monthly' ? 'Mensual' : 'Anual'}
                    </span>
                  </div>

                  <div className="flex items-end justify-between pt-4 border-t border-border">
                    <div>
                      <p className="text-sm text-slate-400">Precio</p>
                      <p className="text-2xl font-bold text-slate-50 font-mono">
                        {formatCurrency(sub.price)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-400">Próximo pago</p>
                      <p className="text-sm text-slate-300">
                        {formatDate(sub.paymentDate)}
                      </p>
                    </div>
                  </div>

                  {sub.notes && (
                    <p className="mt-4 text-sm text-slate-400 line-clamp-2">
                      {sub.notes}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setEditingSubscription(null)
        }}
        title={editingSubscription ? 'Editar suscripción' : 'Nueva suscripción'}
        description="Completa los datos de tu suscripción"
        size="lg"
      >
        <SubscriptionForm
          initialData={editingSubscription || undefined}
          onSuccess={handleSuccess}
        />
      </Modal>
    </div>
  )
}

function getCategoryColor(category: string): string {
  const cat = CATEGORIES.find(c => c.value === category)
  return cat?.color || '#6366F1'
}

function getCategoryLabel(category: string): string {
  const cat = CATEGORIES.find(c => c.value === category)
  return cat?.label || category
}
