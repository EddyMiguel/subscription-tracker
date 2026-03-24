# Subscription Tracker App

Una aplicación web moderna para gestionar y controlar todas tus suscripciones mensuales.

## 🚀 Características

- ✅ **Autenticación completa** - Registro, inicio de sesión y cierre de sesión
- ✅ **CRUD de suscripciones** - Crear, leer, actualizar y eliminar suscripciones
- ✅ **Dashboard inteligente** - Estadísticas de gastos mensuales y anuales
- ✅ **Diseño moderno** - Interfaz tipo dashboard con Tailwind CSS
- ✅ **Responsive** - Funciona perfectamente en móvil, tablet y desktop
- ✅ **Base de datos** - SQLite (fácil de cambiar a PostgreSQL)
- ✅ **TypeScript** - Código completamente tipado
- ✅ **Portfolio-ready** - Diseñado para ser mostrado en tu portfolio

## 🛠️ Tecnologías

- **Frontend**: Next.js 14, React 18, TypeScript
- **Estilos**: Tailwind CSS
- **Base de datos**: SQLite con Prisma ORM
- **Autenticación**: NextAuth.js
- **Validación**: Zod + React Hook Form
- **Iconos**: Lucide React
- **Notificaciones**: React Hot Toast

## 📦 Instalación

1. **Clonar el repositorio**
```bash
git clone <tu-repo-url>
cd subscription-tracker
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

4. **Inicializar la base de datos**
```bash
npx prisma db push
```

5. **Ejecutar el servidor de desarrollo**
```bash
npm run dev
```

6. **Abrir en el navegador**
```
http://localhost:3000
```

## 🔧 Scripts disponibles

- `npm run dev` - Iniciar servidor de desarrollo
- `npm run build` - Construir aplicación para producción
- `npm run start` - Iniciar servidor de producción
- `npm run lint` - Verificar errores de código
- `npx prisma db push` - Sincronizar base de datos
- `npx prisma studio` - Abrir administrador de base de datos

## 📁 Estructura del proyecto

```
subscription-tracker/
├── prisma/
│   └── schema.prisma          # Esquema de la base de datos
├── src/
│   ├── app/
│   │   ├── (auth)/           # Páginas de autenticación
│   │   ├── (dashboard)/      # Páginas del dashboard
│   │   ├── api/              # API routes
│   │   ├── layout.tsx         # Layout principal
│   │   └── page.tsx          # Página principal
│   ├── components/
│   │   ├── ui/               # Componentes UI básicos
│   │   ├── forms/            # Formularios
│   │   └── layout/           # Componentes de layout
│   ├── lib/
│   │   ├── auth.ts           # Configuración de NextAuth
│   │   ├── prisma.ts         # Cliente de Prisma
│   │   └── utils.ts          # Utilidades
│   └── types/
│       └── index.ts          # Tipos TypeScript
├── .env                      # Variables de entorno
├── tailwind.config.ts        # Configuración de Tailwind
└── package.json
```

## 🎨 Diseño

### Colores
- **Primary**: Indigo (#6366F1)
- **Background**: Slate 900 (#0F172A)
- **Surface**: Slate 800 (#1E293B)
- **Text**: Slate 50 (#F8FAFC)

### Categorías de suscripción
- 🎬 Streaming
- 💻 Software
- 📚 Educación
- 🎮 Gaming
- ☁️ Cloud
- 💪 Fitness
- 📰 Noticias
- 🔧 Herramientas
- 🎵 Música
- 📦 Otros

## 🔐 Seguridad

- Contraseñas hasheadas con bcrypt
- Tokens JWT para sesiones
- Protección de rutas via middleware
- Aislamiento de datos por usuario
- Validación de inputs con Zod

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio de GitHub a Vercel
2. Configura las variables de entorno:
   - `DATABASE_URL` - URL de tu base de datos PostgreSQL
   - `NEXTAUTH_SECRET` - Genera una clave secreta
   - `NEXTAUTH_URL` - URL de tu aplicación
3. Despliega automáticamente en cada push

### Base de datos

El proyecto usa SQLite por defecto para desarrollo local. Para producción, cambia a PostgreSQL:

1. Actualiza `schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. Actualiza `DATABASE_URL` en `.env`:
```
DATABASE_URL="postgresql://user:password@host:5432/database"
```

3. Ejecuta migración:
```bash
npx prisma migrate deploy
```

## 📝 Licencia

MIT License - Libre para uso personal y comercial.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.

---

Hecho con ❤️ para tu portfolio 🚀
