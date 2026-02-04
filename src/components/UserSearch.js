'use client'

import { useState } from 'react'

export default function UserSearch({ users }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="mb-8">
      {/* Input de búsqueda - INTERACTIVIDAD */}
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar por nombre o rol..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 pl-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-gray-800"
        />
        <span className="absolute left-4 top-3.5 text-gray-400 text-xl">
          🔍
        </span>
      </div>

      {/* Contador de resultados */}
      {searchTerm && (
        <p className="mt-2 text-sm text-gray-600">
          {filteredUsers.length} {filteredUsers.length === 1 ? 'resultado' : 'resultados'} encontrados
        </p>
      )}

      {/* Mensaje si no hay resultados */}
      {searchTerm && filteredUsers.length === 0 && (
        <div className="mt-8 text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">
            No se encontraron usuarios con "{searchTerm}"
          </p>
        </div>
      )}
    </div>
  )
}
