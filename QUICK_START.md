# 🚀 Quick Start Guide

## Subscription Tracker App

Una aplicación fullstack moderna para gestionar suscripciones, perfecta para tu portfolio.

## ⚡ Inicio Rápido

### 1. Instalar dependencias
```bash
cd subscription-tracker
npm install
```

### 2. Configurar base de datos
```bash
npx prisma db push
```

### 3. Iniciar servidor de desarrollo
```bash
npm run dev
```

### 4. Abrir en navegador
```
http://localhost:3000
```

## 📝 Primeros Pasos

1. **Regístrate** en la página de registro
2. **Agrega** tus primeras suscripciones (Netflix, Spotify, etc.)
3. **Observa** tu dashboard con estadísticas automáticas
4. **Gestiona** todas tus suscripciones desde el panel

## ✨ Características

- 🔐 **Autenticación completa** con NextAuth.js
- 📊 **Dashboard inteligente** con métricas de gastos
- 🎨 **Diseño moderno** tipo fintech con Tailwind CSS
- 📱 **Responsive** - funciona en móvil, tablet y desktop
- ⚡ **CRUD completo** de suscripciones
- 🎯 **Categorización** con iconos y colores
- 🔒 **Seguro** - aislamiento de datos por usuario

## 🎯 Tecnologías Aprendidas

### Frontend
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Lucide Icons
- React Hook Form + Zod

### Backend
- API Routes de Next.js
- Prisma ORM
- NextAuth.js (JWT)
- bcrypt (password hashing)

### Base de Datos
- SQLite (desarrollo)
- PostgreSQL (producción)
- Schema bien diseñado

## 📂 Estructura del Proyecto

```
subscription-tracker/
├── src/
│   ├── app/
│   │   ├── (auth)/          # Login, Register
│   │   ├── (dashboard)/      # Dashboard, Subscriptions, Settings
│   │   └── api/              # API routes
│   ├── components/           # Componentes reutilizables
│   ├── lib/                  # Utilidades y configuración
│   └── types/                # Tipos TypeScript
├── prisma/
│   └── schema.prisma         # Schema de la BD
└── SPEC.md                   # Especificación completa
```

## 🎨 Categorías Disponibles

- 🎬 Streaming (Netflix, Disney+, etc.)
- 💻 Software (Adobe, Microsoft 365)
- 📚 Educación (Coursera, Udemy)
- 🎮 Gaming (Xbox, PlayStation)
- ☁️ Cloud (iCloud, Google One)
- 💪 Fitness (Gym apps)
- 📰 News (Periódicos)
- 🔧 Tools (Productividad)
- 🎵 Music (Spotify, Apple Music)
- 📦 Other (Otros)

## 🚀 Despliegue en Vercel

1. Sube el código a GitHub
2. Conecta el repo a Vercel
3. Configura variables de entorno:
   - `DATABASE_URL` (PostgreSQL)
   - `NEXTAUTH_SECRET` (genera uno nuevo)
   - `NEXTAUTH_URL` (tu URL de producción)
4. Despliega automáticamente

## 💡 Tips para Portfolio

Esta aplicación demuestra:

✅ **Fullstack Skills**
- Frontend + Backend + Database
- API REST design
- Authentication & Authorization

✅ **Modern Best Practices**
- TypeScript throughout
- Clean Architecture
- Responsive Design
- Form Validation

✅ **Professional Features**
- User authentication
- CRUD operations
- Real-time UI updates
- Error handling
- Security (JWT, bcrypt)

## 📞 Soporte

Si tienes problemas:
1. Verifica que todos los pasos de instalación estén completos
2. Asegúrate de que la base de datos esté creada (`prisma db push`)
3. Revisa los logs del servidor

## 🎉 ¡Listo para usar!

Esta aplicación está lista para:
- ✅ Usarse en tu día a día
- ✅ Mostrarse en tu portfolio
- ✅ Desplegarse en producción
- ✅ Extender con más features

---

**¡Buena suerte con tu app! 🚀**
