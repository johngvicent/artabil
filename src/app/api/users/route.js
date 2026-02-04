import { NextResponse } from "next/server";

// Simulamos una base de datos de usuarios
const users = [
  { 
    id: 1, 
    name: "Juan Pérez", 
    email: "juan@example.com",
    role: "Diseñador UX",
    avatar: "JP"
  },
  { 
    id: 2, 
    name: "María García", 
    email: "maria@example.com",
    role: "Desarrolladora Frontend",
    avatar: "MG"
  },
  { 
    id: 3, 
    name: "Carlos López", 
    email: "carlos@example.com",
    role: "Analista de Accesibilidad",
    avatar: "CL"
  },
  { 
    id: 4, 
    name: "Ana Martínez", 
    email: "ana@example.com",
    role: "Especialista en Daltonismo",
    avatar: "AM"
  },
  { 
    id: 5, 
    name: "Pedro Rodríguez", 
    email: "pedro@example.com",
    role: "Investigador Visual",
    avatar: "PR"
  }
];

export async function GET() {
  // Simulamos un pequeño retardo de red/base de datos
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return NextResponse.json(users);
}
