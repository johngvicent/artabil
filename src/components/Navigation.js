'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [accessibleMode, setAccessibleMode] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-900">ArtAbil</h1>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Inicio
              </Link>
              <Link
                href="/gallery"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Galería
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setAccessibleMode(!accessibleMode)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                accessibleMode
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              Modo Accesible: {accessibleMode ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}