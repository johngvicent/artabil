'use client'

import { useState } from 'react'

export default function UserCard({ user }) {
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [showContact, setShowContact] = useState(false)

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1)
      setIsLiked(false)
    } else {
      setLikes(likes + 1)
      setIsLiked(true)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      {/* Avatar */}
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
          {user.avatar}
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.role}</p>
        </div>
      </div>

      {/* Botón de contacto - INTERACTIVIDAD */}
      <button
        onClick={() => setShowContact(!showContact)}
        className="w-full mb-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        {showContact ? 'Ocultar Contacto' : 'Ver Contacto'}
      </button>

      {/* Email (solo se muestra si el usuario hace clic) */}
      {showContact && (
        <div className="mb-4 p-3 bg-gray-50 rounded-md animate-fadeIn">
          <p className="text-sm text-gray-600">
            📧 <a href={`mailto:${user.email}`} className="text-blue-600 hover:underline">
              {user.email}
            </a>
          </p>
        </div>
      )}

      {/* Botón de Like - INTERACTIVIDAD */}
      <div className="flex items-center justify-between border-t pt-4">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
            isLiked 
              ? 'bg-red-100 text-red-600' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <span className="text-xl">{isLiked ? '❤️' : '🤍'}</span>
          <span className="font-medium">{likes} Likes</span>
        </button>

        <span className="text-xs text-gray-400">
          {isLiked ? '¡Te gusta este perfil!' : 'Dale like'}
        </span>
      </div>
    </div>
  )
}
