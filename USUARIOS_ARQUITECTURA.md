# Arquitectura de Usuarios - Server Components vs Client Components

## 📋 Estructura del Proyecto

```
src/
├── app/
│   ├── usuarios/
│   │   └── page.js          ✅ SERVER COMPONENT (async function)
│   └── api/
│       └── users/
│           └── route.js      ✅ API Route (SERVER)
└── components/
    ├── UserList.js           ❌ CLIENT COMPONENT ('use client')
    └── UserCard.js           ❌ CLIENT COMPONENT ('use client')
```

## 🎯 Arquitectura Implementada

### 1. SERVER COMPONENT: `app/usuarios/page.js`

**¿Por qué es Server Component?**
- ✅ NO tiene la directiva `'use client'`
- ✅ Es una función `async`
- ✅ Hace `fetch` de datos directamente
- ✅ Se renderiza en el servidor

**Responsabilidades:**
- Cargar datos desde la API
- Renderizar HTML inicial
- Optimizar SEO
- Reducir JavaScript enviado al navegador

**Ventajas:**
- 🚀 Más rápido (fetch en el servidor)
- 🔒 Más seguro (no expone claves al cliente)
- 🎯 Mejor SEO (HTML ya renderizado)
- 📦 Menos JavaScript al navegador

```javascript
// Server Component por defecto
export default async function UsuariosPage() {
  // Fetch en el servidor
  const res = await fetch('http://localhost:3000/api/users')
  const usuarios = await res.json()
  
  // Pasa datos al Client Component
  return <UserList users={usuarios} />
}
```

### 2. CLIENT COMPONENT: `components/UserList.js`

**¿Por qué es Client Component?**
- ❌ TIENE la directiva `'use client'`
- ❌ Usa `useState` (hooks de React)
- ❌ Maneja eventos (`onChange`, `onClick`)
- ❌ Se ejecuta en el navegador

**Responsabilidades:**
- Búsqueda interactiva
- Filtrado en tiempo real
- Eventos del usuario
- Estado local

**Ventajas:**
- 🖱️ Interactividad completa
- 🎨 Estado y efectos
- 🔄 Actualizaciones sin recargar

```javascript
'use client' // ← OBLIGATORIO

import { useState } from 'react'

export default function UserList({ users }) {
  const [searchTerm, setSearchTerm] = useState('')
  
  // Lógica de filtrado en el cliente
  const filteredUsers = users.filter(user => ...)
  
  return (
    <input onChange={(e) => setSearchTerm(e.target.value)} />
  )
}
```

### 3. CLIENT COMPONENT: `components/UserCard.js`

**Responsabilidades:**
- Botón de "Like" con contador
- Mostrar/Ocultar información de contacto
- Estado local por cada tarjeta

```javascript
'use client'

export default function UserCard({ user }) {
  const [likes, setLikes] = useState(0)
  const [showContact, setShowContact] = useState(false)
  
  return (
    <button onClick={() => setLikes(likes + 1)}>
      {likes} Likes
    </button>
  )
}
```

## 🔄 Flujo de Datos

```
1. Usuario solicita /usuarios
          ↓
2. Server Component ejecuta (servidor)
   - Hace fetch a /api/users
   - Obtiene lista de usuarios
          ↓
3. Server renderiza HTML inicial
   - Estructura de la página
   - Datos precargados
          ↓
4. Envía al navegador:
   - HTML completo
   - JS solo para componentes interactivos
          ↓
5. React "hidrata" los Client Components
   - UserList se vuelve interactivo
   - UserCard puede recibir clicks
          ↓
6. Usuario puede interactuar
   - Buscar usuarios
   - Dar likes
   - Ver contactos
```

## 📊 Comparación de Responsabilidades

| Característica | Server Component | Client Component |
|---------------|-----------------|------------------|
| **Fetch de datos** | ✅ Sí (directo) | ❌ No recomendado |
| **useState/useEffect** | ❌ No | ✅ Sí |
| **onClick/onChange** | ❌ No | ✅ Sí |
| **Acceso a BD** | ✅ Sí | ❌ No |
| **API Keys secretas** | ✅ Sí (seguro) | ❌ No (se exponen) |
| **SEO** | ✅ Excelente | ⚠️ Limitado |
| **JavaScript al navegador** | ✅ Cero | ❌ Sí envía |

## 🎨 Características Implementadas

### En el Server Component (page.js)
- ✅ Carga de datos asíncrona
- ✅ Revalidación cada hora (`revalidate: 3600`)
- ✅ Renderizado del header
- ✅ Badge con contador de usuarios
- ✅ Footer con timestamp

### En los Client Components

**UserList.js:**
- ✅ Búsqueda en tiempo real
- ✅ Filtrado por nombre y rol
- ✅ Contador de resultados
- ✅ Mensaje de "sin resultados"

**UserCard.js:**
- ✅ Sistema de likes con contador
- ✅ Toggle para mostrar/ocultar contacto
- ✅ Animaciones CSS
- ✅ Estados visuales (hover, active)

## 🚀 Ventajas de Esta Arquitectura

1. **Performance Óptima**
   - Solo se envía JavaScript para la interactividad necesaria
   - El contenido estático se renderiza en el servidor

2. **SEO Mejorado**
   - Los buscadores ven el HTML completo de inmediato
   - No necesitan ejecutar JavaScript para ver el contenido

3. **Seguridad**
   - Las claves de API permanecen en el servidor
   - El cliente solo recibe datos públicos

4. **Experiencia de Usuario**
   - Carga inicial ultra rápida
   - Interactividad inmediata después de la hidratación
   - Sin pantallas de carga innecesarias

## 🔍 Cómo Identificar Cada Tipo

### Es Server Component si:
- ❌ NO tiene `'use client'`
- ✅ Puede ser `async function`
- ✅ Puede hacer `fetch` directo
- ✅ Archivo en `app/` sin directivas

### Es Client Component si:
- ✅ TIENE `'use client'` en la primera línea
- ✅ Usa hooks (`useState`, `useEffect`)
- ✅ Maneja eventos (`onClick`, `onChange`)
- ✅ Accede a APIs del navegador

## 📝 Regla de Oro

> **"Usa Server Components siempre que puedas.  
> Usa Client Components solo cuando lo necesites."**

### Pregúntate:
- ¿Necesito interactividad? → Client Component
- ¿Solo muestro datos? → Server Component
- ¿Necesito SEO? → Server Component
- ¿Necesito eventos? → Client Component

## 🎯 Patrón Recomendado

```javascript
// ✅ BUENA PRÁCTICA: "Islas de Interactividad"

// Server Component (Padre)
export default async function Page() {
  const data = await fetchData() // En el servidor
  
  return (
    <main>
      <h1>Título</h1>              {/* Servidor */}
      <ClientComponent data={data} /> {/* Cliente (isla) */}
      <footer>Footer</footer>      {/* Servidor */}
    </main>
  )
}
```

La página es mayormente estática (servidor) con pequeñas "islas" de interactividad (cliente).

## 🛠️ Tecnologías Utilizadas

- **Next.js 15** (App Router)
- **React 19** (Server Components)
- **Tailwind CSS** (Estilos)
- **API Routes** (Backend)

## 📚 Recursos Adicionales

- [Next.js Documentation - Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [React Documentation - Server Components](https://react.dev/reference/rsc/server-components)
- [Vercel - Understanding Server Components](https://vercel.com/blog/understanding-react-server-components)
