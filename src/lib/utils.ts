import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(d)
}

export function getMonthlyEquivalent(price: number, paymentType: string): number {
  return paymentType === 'annual' ? price / 12 : price
}

export function getNextPaymentDate(paymentDate: Date | string): Date {
  const date = typeof paymentDate === 'string' ? new Date(paymentDate) : paymentDate
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const next = new Date(date)
  next.setFullYear(today.getFullYear())
  
  if (next < today) {
    next.setFullYear(today.getFullYear() + 1)
  }
  
  return next
}
