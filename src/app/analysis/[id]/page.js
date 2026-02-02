'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { COLOR_BLIND_TYPES, simulateColorBlindness, applyCanvasFilter, getColorBlindDescription } from '../../../lib/vision-sim';
import { getContrastRatio, isWCAGAA, isWCAGAAA, extractColors } from '../../../lib/color-utils';

// Artwork data (in a real app, this would come from an API or database)
const artworks = {
  'starry-night': {
    title: 'La Noche Estrellada',
    artist: 'Vincent van Gogh',
    year: 1889,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
    dominantColors: ['#0c1445', '#1a237e', '#ffeb3b', '#4caf50', '#795548'],
  },
  'girl-with-pearl-earring': {
    title: 'La Joven de la Perla',
    artist: 'Johannes Vermeer',
    year: 1665,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/640px-1665_Girl_with_a_Pearl_Earring.jpg',
    dominantColors: ['#2c1810', '#f5f5dc', '#daa520', '#8b4513', '#000000'],
  },
  'water-lilies': {
    title: 'Ninfeas',
    artist: 'Claude Monet',
    year: 1919,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Claude_Monet_-_Water_Lilies_-_1919%2C_Mus%C3%A9e_Marmottan_Monet%2C_Paris.jpg/640px-Claude_Monet_-_Water_Lilies_-_1919%2C_Mus%C3%A9e_Marmottan_Monet%2C_Paris.jpg',
    dominantColors: ['#006400', '#000080', '#ffff00', '#ffffff', '#add8e6'],
  },
};

export default function Analysis({ params }) {
  const { id } = params;
  const artwork = artworks[id];

  const [selectedFilter, setSelectedFilter] = useState(COLOR_BLIND_TYPES.NORMAL);
  const [dominantColors, setDominantColors] = useState(artwork?.dominantColors || []);
  const [contrastAnalysis, setContrastAnalysis] = useState([]);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!artwork) return;

    // Load image and extract colors
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.src = artwork.image;
    img.onload = () => {
      imgRef.current = img;
      // For now, use predefined colors. In production, extract from image
      setDominantColors(artwork.dominantColors);

      // Analyze contrasts
      analyzeContrasts(artwork.dominantColors);
    };
  }, [artwork]);

  useEffect(() => {
    if (!canvasRef.current || !imgRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imgRef.current;

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    if (selectedFilter !== COLOR_BLIND_TYPES.NORMAL) {
      applyCanvasFilter(canvas, selectedFilter);
    }
  }, [selectedFilter]);

  const analyzeContrasts = (colors) => {
    const analysis = [];
    for (let i = 0; i < colors.length; i++) {
      for (let j = i + 1; j < colors.length; j++) {
        const ratio = getContrastRatio(colors[i], colors[j]);
        analysis.push({
          color1: colors[i],
          color2: colors[j],
          ratio: ratio.toFixed(2),
          wcagAA: isWCAGAA(ratio),
          wcagAAA: isWCAGAAA(ratio),
        });
      }
    }
    setContrastAnalysis(analysis);
  };

  if (!artwork) {
    return <div className="min-h-screen flex items-center justify-center">Obra no encontrada</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{artwork.title}</h1>
          <p className="text-xl text-gray-600">{artwork.artist}, {artwork.year}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Canvas */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Simulador de Visión</h2>
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  className="w-full h-auto rounded-lg border"
                  style={{ maxHeight: '600px' }}
                />
                {selectedFilter !== COLOR_BLIND_TYPES.NORMAL && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-4 left-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded"
                  >
                    {getColorBlindDescription(selectedFilter)}
                  </motion.div>
                )}
              </div>

              {/* Filter Controls */}
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Filtros de Visión</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.values(COLOR_BLIND_TYPES).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedFilter(type)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        selectedFilter === type
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {type === COLOR_BLIND_TYPES.NORMAL ? 'Normal' :
                       type === COLOR_BLIND_TYPES.PROTANOPIA ? 'Protanopía' :
                       type === COLOR_BLIND_TYPES.DEUTERANOPIA ? 'Deuteranopía' :
                       type === COLOR_BLIND_TYPES.TRITANOPIA ? 'Tritanopía' :
                       'Acromatopsia'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Color Palette */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Paleta de Colores</h3>
              <div className="grid grid-cols-5 gap-2">
                {dominantColors.map((color, index) => (
                  <div key={index} className="text-center">
                    <div
                      className="w-12 h-12 rounded-md border-2 border-gray-300 mx-auto"
                      style={{ backgroundColor: color }}
                    />
                    <p className="text-xs mt-1 font-mono">{color}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contrast Analysis */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Análisis de Contraste (WCAG)</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {contrastAnalysis.map((item, index) => (
                  <div key={index} className="border rounded p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: item.color1 }}
                      />
                      <span className="text-sm font-mono">{item.color1}</span>
                      <span className="text-gray-500">vs</span>
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: item.color2 }}
                      />
                      <span className="text-sm font-mono">{item.color2}</span>
                    </div>
                    <p className="text-sm">
                      Ratio: <span className="font-semibold">{item.ratio}:1</span>
                    </p>
                    <div className="flex space-x-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded ${item.wcagAA ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        AA: {item.wcagAA ? '✓' : '✗'}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${item.wcagAAA ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        AAA: {item.wcagAAA ? '✓' : '✗'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Theme */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Generar Tema Accesible</h3>
              <button
                onClick={() => {
                  const theme = {
                    name: `${artwork.title} - Tema Accesible`,
                    colors: dominantColors.reduce((acc, color, index) => {
                      acc[`color${index + 1}`] = color;
                      return acc;
                    }, {}),
                  };
                  const dataStr = JSON.stringify(theme, null, 2);
                  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
                  const exportFileDefaultName = `${artwork.title.toLowerCase().replace(/\s+/g, '-')}-theme.json`;
                  const linkElement = document.createElement('a');
                  linkElement.setAttribute('href', dataUri);
                  linkElement.setAttribute('download', exportFileDefaultName);
                  linkElement.click();
                }}
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Descargar Tema JSON
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}