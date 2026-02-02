# ArtAbil: Accesibilidad en el Arte

Un proyecto con enfoque social y educativo que analiza la accesibilidad en las obras maestras. Una galería que aplica filtros en tiempo real para simular cómo ven una obra de Van Gogh o Monet personas con diferentes tipos de daltonismo (Protanopía, Deuteranopía, etc.). Incluye un panel de "Puntaje de Contraste" (WCAG) aplicado a composiciones clásicas y un generador de temas para VS Code o Figma basados directamente en cuadros analizados.

## Concepto

La idea central es analizar si las grandes obras maestras de la historia sobrevivirían a un test de accesibilidad moderno. ¿Es el arte "legible"?

### Secciones Clave
- **Vision Simulator**: Visualizador donde el usuario puede alternar entre la visión normal y simulaciones de daltonismo (Deuteranopía, Tritanopía, etc.) o visión de baja agudeza.
- **Contrast Breakdown**: Panel lateral que analiza la relación de contraste (Contrast Ratio) entre los elementos clave de la obra.
- **Masterpiece Themes**: Generador que convierte la paleta de la obra en un Design System accesible, ajustando los colores originales para que cumplan con el estándar WCAG AA o AAA.

## Arquitectura del Proyecto

Utiliza Next.js (App Router) con las siguientes librerías:
- **Culori**: Para conversiones de color entre espacios (RGB a LCH) y cálculo de contraste real.
- **Color-blind**: Para algoritmos de simulación de deficiencias de visión.
- **Framer Motion**: Para animaciones suaves en los cambios de filtros.
- **Tailwind CSS**: Para estilos con variables de color dinámicas.

### Estructura de Carpetas
```
src/
 ├── app/
 │    ├── gallery/          # Listado de obras analizadas
 │    ├── analysis/[id]/    # Página dinámica de análisis por obra
 │    └── layout.js         # Navigation con toggle de "Modo Accesible"
 ├── components/
 │    ├── Canvas/           # El lienzo interactivo (usando <canvas> o SVG)
 │    ├── Filters/          # Controles de simulación de visión
 │    └── Metrics/          # Gráficos de contraste y histogramas
 ├── lib/
 │    ├── color-utils.js    # Lógica para calcular WCAG y conversiones LAB/LCH
 │    └── vision-sim.js     # Algoritmos de transformación de color
```

## Tecnologías Modernas Utilizadas

- **Next.js 16+** con App Router para rutas optimizadas y manejo de imágenes.
- **React Server Components** para mejor rendimiento.
- **Tailwind CSS v4** con configuración personalizada para temas dinámicos.
- **Culori**: Librería para conversiones de color y cálculo de contraste WCAG.
- **Color-blind**: Algoritmos de simulación de deficiencias de visión.
- **Framer Motion**: Animaciones suaves para transiciones de filtros.
- **ESLint** y **Prettier** para código limpio.
- **Git** para control de versiones con commits descriptivos.

## Pasos de Desarrollo Implementados

### 1. Configuración Inicial ✅
- Proyecto Next.js creado con `create-next-app`.
- Dependencias instaladas: `culori`, `color-blind`, `framer-motion`.
- Configuración de imágenes externas en `next.config.mjs`.

### 2. Elección del "Hero" ✅
- Obra seleccionada: "La Noche Estrellada" de Vincent van Gogh.
- Paleta de colores predefinida basada en análisis de la obra.

### 3. Creación de Componentes ✅
- `<Navigation />`: Barra de navegación con toggle de modo accesible.
- Página de galería con listado de obras.
- Página de análisis interactivo con simulador de visión.
- Librerías de utilidades: `color-utils.js` y `vision-sim.js`.

### 4. Implementación del Flujo de Usuario ✅
- Página principal: Hero con introducción al proyecto.
- Galería: Listado de obras con enlaces a análisis.
- Análisis: Simulador con filtros de daltonismo, métricas WCAG y exportación de temas.

### 5. Funcionalidades Clave Implementadas ✅
- Simulación de visión normal vs. diferentes tipos de daltonismo.
- Cálculo de ratios de contraste WCAG entre colores dominantes.
- Exportación de temas accesibles en formato JSON.
- Interfaz responsive y accesible.

## Cómo Ejecutar el Proyecto

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Ejecutar servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

4. Navegar a la galería y seleccionar una obra para analizar.

## Próximos Pasos y Mejoras

- Implementar extracción automática de colores desde imágenes usando Canvas API.
- Añadir más obras maestras a la galería.
- Mejorar algoritmos de simulación con matrices más precisas.
- Añadir tests unitarios para las funciones de color.
- Implementar PWA para uso offline.
- Integrar con APIs de museos para datos reales de obras.

## Contribución

Este proyecto une empatía en diseño UI/UX con análisis técnico del arte. Contribuciones son bienvenidas para expandir la galería de obras, mejorar algoritmos de simulación, o añadir más métricas de accesibilidad.

## Licencia

MIT License - Libre para uso educativo y social.
