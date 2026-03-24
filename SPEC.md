# Subscription Tracker App - Especificación Técnica

## 1. Concepto & Visión

**Subscription Tracker** es una aplicación web moderna que permite a los usuarios gestionar todas sus suscripciones en un solo lugar. La experiencia se siente como un dashboard financiero premium: limpia, profesional y con micro-interacciones que hacen que el control de gastos sea satisfactorio en lugar de tedioso.

La personalidad es **minimalista pero cálida** - no es una app bancaria fría, sino una herramienta personal que se siente cercana y fácil de usar. Los datos importantes destacan visualmente mientras que los detalles secundarios se mantienen discretos.

## 2. Design Language

### Aesthetic Direction
Inspirado en dashboards fintech modernos como Linear, Vercel y Stripe. Clean, spacious, with subtle depth through shadows and micro-interactions.

### Color Palette
```
Primary:        #6366F1 (Indigo 500) - Acciones principales
Primary Dark:   #4F46E5 (Indigo 600) - Hover states
Secondary:      #8B5CF6 (Violet 500) - Acentos
Success:        #10B981 (Emerald 500) - Confirmaciones
Warning:        #F59E0B (Amber 500) - Alertas
Danger:         #EF4444 (Red 500) - Eliminar/Danger
Background:     #0F172A (Slate 900) - Fondo principal
Surface:        #1E293B (Slate 800) - Tarjetas
Surface Light:  #334155 (Slate 700) - Elementos elevados
Text Primary:   #F8FAFC (Slate 50) - Texto principal
Text Secondary: #94A3B8 (Slate 400) - Texto secundario
Border:         #475569 (Slate 600) - Bordes sutiles
```

### Typography
- **Headings**: Inter (700, 600) - Sans-serif, clean, modern
- **Body**: Inter (400, 500) - Excelente legibilidad
- **Monospace**: JetBrains Mono - Para precios y números
- **Fallbacks**: system-ui, -apple-system, sans-serif

### Spatial System
- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px
- Border radius: 8px (small), 12px (medium), 16px (large)
- Card padding: 24px

### Motion Philosophy
- **Page transitions**: Fade + slide, 200ms ease-out
- **Hover states**: Scale 1.02 + shadow lift, 150ms
- **Button clicks**: Scale 0.98, 100ms
- **Loading states**: Pulse animation, skeleton screens
- **Modal**: Fade backdrop + scale content, 200ms spring

### Visual Assets
- **Icons**: Lucide React (consistent stroke width, 24px default)
- **Images**: None needed (subscription logos via text/icons)
- **Decorative**: Subtle gradient overlays on hero sections, glassmorphism on modals

## 3. Layout & Structure

### Overall Architecture
```
┌─────────────────────────────────────────────────┐
│  Sidebar (Fixed)  │  Main Content Area           │
│  - Logo           │  ┌─────────────────────────┐ │
│  - Navigation     │  │ Header + User Menu       │ │
│  - User Profile   │  ├─────────────────────────┤ │
│                   │  │                         │ │
│                   │  │ Page Content            │ │
│                   │  │ (Dashboard/Settings)   │ │
│                   │  │                         │ │
│                   │  └─────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

### Mobile Layout (< 768px)
- Sidebar becomes bottom navigation bar
- Cards stack vertically
- Simplified header

### Pages Structure
1. **Landing/Auth** - Login/Register forms centered
2. **Dashboard** - Stats overview + Recent subscriptions
3. **Subscriptions** - Full list with filters/search
4. **Settings** - User profile, preferences

## 4. Features & Interactions

### Authentication Flow
- **Register**: Email, password (min 8 chars), confirm password
  - Real-time validation
  - Success: Auto-login + redirect to dashboard
  - Error: Inline field errors with specific messages
- **Login**: Email + password
  - "Remember me" checkbox
  - Success: Redirect to dashboard
  - Error: Generic "Invalid credentials" (security)
- **Logout**: Confirmation modal → Clear session → Redirect to login

### Dashboard Features
1. **Stats Cards** (4 cards in grid)
   - Total mensual: Suma de todas las suscripciones (convertidas a monthly)
   - Total anual: Total mensual × 12
   - Número de suscripciones: Count
   - Próximo pago: Fecha más cercana con nombre del servicio

2. **Recent Subscriptions** (Top 5)
   - Quick list con delete action
   - "Ver todas" link to subscriptions page

3. **Category Breakdown** (Pie chart)
   - Visual distribution por categoría
   - Interactive hover states

### Subscription Management
- **Create**:
  - Modal form with all fields
  - Dropdown for category (with icons)
  - Date picker for payment date
  - Real-time price preview (monthly equivalent)
  
- **Read**:
  - List view with cards
  - Each card shows: Name, price, category badge, next payment date
  - Click to expand details
  
- **Update**:
  - Same form as create, pre-filled
  - Optimistic UI update
  
- **Delete**:
  - Confirmation modal
  - "Delete anyway" type-to-confirm for safety

### Subscription Form Fields
- **Nombre**: Text input, required, max 100 chars
- **Precio**: Number input, required, min 0.01, max 99999
- **Tipo de pago**: Select (monthly/annual)
- **Fecha de pago**: Date picker, required
- **Categoría**: Select with predefined options
- **Notas**: Textarea, optional, max 500 chars

### Categories (with icons)
1. 🎬 Streaming (Netflix, Spotify, etc.)
2. 💻 Software (Adobe, Microsoft, etc.)
3. 📚 Educación (Coursera, Udemy, etc.)
4. 🎮 Gaming (Xbox Game Pass, etc.)
5. ☁️ Cloud (iCloud, Google One, etc.)
6. 💪 Fitness (Gym apps, etc.)
7. 📰 News (Newspapers, magazines)
8. 🔧 Tools (Productivity apps)
9. 🎵 Music (Streaming services)
10. 📦 Other

### Error Handling
- **Network errors**: Toast notification with retry option
- **Validation errors**: Inline under each field
- **404 pages**: Custom styled, helpful navigation
- **Empty states**: Friendly illustrations + CTAs

## 5. Component Inventory

### Button
- **Variants**: Primary, Secondary, Ghost, Danger
- **Sizes**: sm (32px), md (40px), lg (48px)
- **States**: Default, hover (scale + glow), active (scale down), disabled (opacity 50%), loading (spinner)

### Input
- **States**: Default, focus (ring), error (red border + message), disabled
- **Types**: Text, email, password (with toggle visibility), number, date
- **Features**: Label, placeholder, helper text, error message, icons

### Select/Dropdown
- Custom styled to match design
- Search/filter for long lists
- Keyboard navigation
- Clear button

### Card
- **Variants**: Default (subtle border), Elevated (shadow)
- **Structure**: Header (optional), Body, Footer (optional)
- **Hover**: Slight lift + shadow increase

### Modal
- **Backdrop**: Semi-transparent blur
- **Animation**: Fade backdrop, scale content
- **Structure**: Header with close button, Body, Footer with actions
- **Sizes**: sm (400px), md (500px), lg (700px)

### Badge/Tag
- Colored background based on category
- Subtle rounded corners
- Icon + text

### Toast/Notification
- **Variants**: Success (green), Error (red), Warning (yellow), Info (blue)
- **Position**: Top-right
- **Animation**: Slide in from right, auto-dismiss after 5s
- **Action**: Optional dismiss button

### Skeleton Loader
- Pulse animation
- Matches shape of actual content
- Used during data fetching

### Navigation
- **Sidebar**: Fixed left, logo at top, nav items, user info at bottom
- **Mobile Nav**: Fixed bottom, 4-5 main items with icons

## 6. Technical Approach

### Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite (development) / PostgreSQL (production)
- **ORM**: Prisma
- **Auth**: NextAuth.js v4 with Credentials provider
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod validation
- **Notifications**: React Hot Toast

### Project Structure
```
subscription-tracker/
├── prisma/
│   └── schema.prisma
├── public/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   ├── subscriptions/
│   │   │   └── settings/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   └── subscriptions/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/          (Base components)
│   │   ├── forms/       (Form components)
│   │   └── layout/      (Layout components)
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── auth.ts
│   │   └── utils.ts
│   └── types/
│       └── index.ts
├── .env.example
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

### Database Schema

**User**
```prisma
model User {
  id            String         @id @default(cuid())
  email         String         @unique
  password      String
  name          String?
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt
  subscriptions Subscription[]
}
```

**Subscription**
```prisma
model Subscription {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  name        String
  price       Decimal
  paymentType String   @default("monthly") // monthly | annual
  paymentDate DateTime
  category    String
  notes       String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### API Endpoints

**Auth**
- `POST /api/auth/register` - Create new user
- `POST /api/auth/[...nextauth]` - NextAuth handlers

**Subscriptions**
- `GET /api/subscriptions` - List user's subscriptions
- `POST /api/subscriptions` - Create subscription
- `GET /api/subscriptions/[id]` - Get single subscription
- `PUT /api/subscriptions/[id]` - Update subscription
- `DELETE /api/subscriptions/[id]` - Delete subscription

### Authentication Strategy
- Session-based auth with JWT
- Passwords hashed with bcrypt
- Protected routes via middleware
- User isolation (users can only access their own data)

### Security Measures
- CSRF protection (NextAuth built-in)
- Input sanitization
- SQL injection prevention (Prisma)
- Rate limiting on auth endpoints
- Secure HTTP headers

## 7. Responsive Breakpoints

- **Mobile**: < 640px (1 column, bottom nav)
- **Tablet**: 640px - 1024px (2 columns, collapsible sidebar)
- **Desktop**: > 1024px (full sidebar, 3-4 columns)

## 8. Performance Targets

- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **Bundle size**: < 200kb initial JS

## 9. Deployment

### Vercel (Recommended)
- Connect GitHub repo
- Environment variables:
  - `DATABASE_URL`
  - `NEXTAUTH_SECRET`
  - `NEXTAUTH_URL`
- Auto-deploy on push to main

### Local Development
```bash
npm install
npx prisma db push
npm run dev
```
