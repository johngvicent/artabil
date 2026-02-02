import ColorBlind from 'color-blind';

/**
 * Types of color blindness
 */
export const COLOR_BLIND_TYPES = {
  NORMAL: 'normal',
  PROTANOPIA: 'protanopia',
  DEUTERANOPIA: 'deuteranopia',
  TRITANOPIA: 'tritanopia',
  ACHROMATOPSIA: 'achromatopsia',
};

/**
 * Apply color blindness simulation to a color
 * @param {string} color - Hex color
 * @param {string} type - Type of color blindness
 * @returns {string} Transformed hex color
 */
export function simulateColorBlindness(color, type) {
  if (type === COLOR_BLIND_TYPES.NORMAL) return color;

  // Convert hex to RGB array
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Apply transformation matrix
  const transformed = ColorBlind[type]([r, g, b]);

  // Convert back to hex
  const toHex = (c) => Math.round(Math.max(0, Math.min(255, c))).toString(16).padStart(2, '0');
  return `#${toHex(transformed[0])}${toHex(transformed[1])}${toHex(transformed[2])}`;
}

/**
 * Apply color blindness filter to an entire image using canvas
 * @param {HTMLCanvasElement} canvas - Canvas with the image
 * @param {string} type - Type of color blindness
 */
export function applyCanvasFilter(canvas, type) {
  if (type === COLOR_BLIND_TYPES.NORMAL) return;

  const ctx = canvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const transformed = ColorBlind[type]([r, g, b]);

    data[i] = Math.max(0, Math.min(255, transformed[0]));
    data[i + 1] = Math.max(0, Math.min(255, transformed[1]));
    data[i + 2] = Math.max(0, Math.min(255, transformed[2]));
  }

  ctx.putImageData(imageData, 0, 0);
}

/**
 * Get description of color blindness type
 * @param {string} type - Type of color blindness
 * @returns {string} Description
 */
export function getColorBlindDescription(type) {
  const descriptions = {
    [COLOR_BLIND_TYPES.PROTANOPIA]: 'Dificultad para distinguir rojos y verdes (falta de conos rojos)',
    [COLOR_BLIND_TYPES.DEUTERANOPIA]: 'Dificultad para distinguir rojos y verdes (falta de conos verdes)',
    [COLOR_BLIND_TYPES.TRITANOPIA]: 'Dificultad para distinguir azules y amarillos (falta de conos azules)',
    [COLOR_BLIND_TYPES.ACHROMATOPSIA]: 'Visión en blanco y negro (falta total de color)',
  };
  return descriptions[type] || 'Visión normal';
}