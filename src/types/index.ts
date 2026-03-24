export interface User {
  id: string
  email: string
  name?: string | null
  createdAt: Date
}

export interface Subscription {
  id: string
  userId: string
  name: string
  price: number
  paymentType: 'monthly' | 'annual'
  paymentDate: Date
  category: Category
  notes?: string | null
  createdAt: Date
  updatedAt: Date
}

export type Category =
  | 'streaming'
  | 'software'
  | 'education'
  | 'gaming'
  | 'cloud'
  | 'fitness'
  | 'news'
  | 'tools'
  | 'music'
  | 'other'

export interface CategoryInfo {
  value: Category
  label: string
  icon: string
  color: string
}

export const CATEGORIES: CategoryInfo[] = [
  { value: 'streaming', label: 'Streaming', icon: 'Tv', color: '#EF4444' },
  { value: 'software', label: 'Software', icon: 'Monitor', color: '#6366F1' },
  { value: 'education', label: 'Educación', icon: 'GraduationCap', color: '#10B981' },
  { value: 'gaming', label: 'Gaming', icon: 'Gamepad2', color: '#8B5CF6' },
  { value: 'cloud', label: 'Cloud', icon: 'Cloud', color: '#06B6D4' },
  { value: 'fitness', label: 'Fitness', icon: 'Dumbbell', color: '#F59E0B' },
  { value: 'news', label: 'Noticias', icon: 'Newspaper', color: '#EC4899' },
  { value: 'tools', label: 'Herramientas', icon: 'Wrench', color: '#64748B' },
  { value: 'music', label: 'Música', icon: 'Music', color: '#22C55E' },
  { value: 'other', label: 'Otro', icon: 'Package', color: '#94A3B8' },
]

export interface DashboardStats {
  monthlyTotal: number
  annualTotal: number
  totalSubscriptions: number
  nextPayment: {
    name: string
    date: Date
    amount: number
  } | null
  categoryBreakdown: {
    category: string
    amount: number
    percentage: number
  }[]
}
