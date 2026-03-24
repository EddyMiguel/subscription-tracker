'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { CATEGORIES } from '@/types'
import toast from 'react-hot-toast'

const subscriptionSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(100),
  price: z.string().min(0.01, 'El precio debe ser mayor a 0'),
  paymentType: z.enum(['monthly', 'annual']),
  paymentDate: z.string().min(1, 'La fecha de pago es requerida'),
  category: z.string().min(1, 'La categoría es requerida'),
  notes: z.string().max(500).optional(),
})

type SubscriptionFormData = z.infer<typeof subscriptionSchema>

interface SubscriptionFormProps {
  initialData?: {
    id: string
    name: string
    price: number
    paymentType: string
    paymentDate: string
    category: string
    notes?: string | null
  }
  onSuccess: () => void
}

export function SubscriptionForm({ initialData, onSuccess }: SubscriptionFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      name: initialData?.name || '',
      price: initialData?.price?.toString() || '',
      paymentType: (initialData?.paymentType as 'monthly' | 'annual') || 'monthly',
      paymentDate: initialData?.paymentDate 
        ? new Date(initialData.paymentDate).toISOString().split('T')[0]
        : '',
      category: initialData?.category || '',
      notes: initialData?.notes || '',
    },
  })

  const price = parseFloat(watch('price')) || 0
  const paymentType = watch('paymentType')
  const monthlyEquivalent = paymentType === 'annual' ? price / 12 : price

  const onSubmit = async (data: SubscriptionFormData) => {
    try {
      const url = initialData
        ? `/api/subscriptions/${initialData.id}`
        : '/api/subscriptions'
      
      const method = initialData ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Error al guardar')
      }

      toast.success(
        initialData 
          ? '¡Suscripción actualizada!' 
          : '¡Suscripción creada!'
      )
      onSuccess()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Algo salió mal')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Nombre del servicio"
        placeholder="Netflix, Spotify, etc."
        error={errors.name?.message}
        {...register('name')}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Precio"
          type="number"
          step="0.01"
          placeholder="9.99"
          error={errors.price?.message}
          {...register('price')}
        />
        
        <Select
          label="Tipo de pago"
          options={[
            { value: 'monthly', label: 'Mensual' },
            { value: 'annual', label: 'Anual' },
          ]}
          error={errors.paymentType?.message}
          {...register('paymentType')}
        />
      </div>

      {price > 0 && (
        <div className="bg-primary/10 border border-primary/20 rounded p-3">
          <p className="text-sm text-slate-300">
            Equivalente mensual:{' '}
            <span className="text-primary font-mono font-semibold">
              €{monthlyEquivalent.toFixed(2)}
            </span>
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Fecha de pago"
          type="date"
          error={errors.paymentDate?.message}
          {...register('paymentDate')}
        />
        
        <Select
          label="Categoría"
          options={[
            { value: '', label: 'Seleccionar...' },
            ...CATEGORIES.map(cat => ({ value: cat.value, label: cat.label }))
          ]}
          error={errors.category?.message}
          {...register('category')}
        />
      </div>

      <Textarea
        label="Notas (opcional)"
        placeholder="Agrega notas adicionales..."
        rows={3}
        {...register('notes')}
      />

      <div className="flex gap-3 pt-4">
        <Button type="submit" loading={isSubmitting} className="flex-1">
          {initialData ? 'Actualizar' : 'Crear'} suscripción
        </Button>
        <Button type="button" variant="secondary" onClick={onSuccess}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
