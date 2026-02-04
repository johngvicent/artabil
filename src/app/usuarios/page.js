import UserList from '@/components/UserList'

// ✅ SERVER COMPONENT (Por defecto)
// - Se ejecuta en el servidor
// - Puede hacer fetch de datos de forma segura
// - Optimiza el SEO
// - Reduce el JavaScript enviado al navegador
export default async function UsuariosPage() {
  // 1. Fetch de datos en el SERVIDOR (Rápido y seguro)
  // Esto se ejecuta en el servidor, no en el navegador
  const res = await fetch('http://localhost:3000/api/users', {
    // Revalidar cada hora (3600 segundos)
    next: { revalidate: 3600 }
  })
  
  const usuarios = await res.json()

  // Este console.log aparece en la TERMINAL del servidor, no en el navegador
  console.log('✅ Datos cargados en el servidor:', usuarios.length, 'usuarios')

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado - Renderizado en el SERVIDOR */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Nuestro Equipo de Expertos
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Profesionales dedicados a hacer la web más accesible para todos. 
            Cada miembro aporta su experiencia única en diseño inclusivo.
          </p>
          
          {/* Badge informativo - SERVER COMPONENT */}
          <div className="mt-6 inline-block">
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              ✅ {usuarios.length} usuarios cargados desde el servidor
            </span>
          </div>
        </div>

        {/* 
          2. PASAMOS LOS DATOS AL CLIENT COMPONENT
          UserList es un Client Component que maneja:
          - Búsqueda interactiva (useState)
          - Filtrado en tiempo real
          - Eventos del usuario
        */}
        <UserList users={usuarios} />

        {/* Footer informativo - Renderizado en el SERVIDOR */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            💡 Esta página usa Server Components para cargar datos 
            y Client Components para la interactividad
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Renderizado en el servidor: {new Date().toLocaleString('es-ES')}
          </p>
        </div>
      </div>
    </main>
  )
}
