import { wcagContrast, lch, rgb } from 'culori';

/**
 * Calculate WCAG contrast ratio between two colors
 * @param {string} color1 - First color in hex or named
 * @param {string} color2 - Second color in hex or named
 * @returns {number} Contrast ratio
 */
export function getContrastRatio(color1, color2) {
  return wcagContrast(color1, color2);
}

/**
 * Check if contrast ratio meets WCAG AA standard for normal text
 * @param {number} ratio - Contrast ratio
 * @returns {boolean}
 */
export function isWCAGAA(ratio) {
  return ratio >= 4.5;
}

/**
 * Check if contrast ratio meets WCAG AAA standard for normal text
 * @param {number} ratio - Contrast ratio
 * @returns {boolean}
 */
export function isWCAGAAA(ratio) {
  return ratio >= 7;
}

/**
 * Convert color to LCH space for better perceptual uniformity
 * @param {string} color - Color in hex or named
 * @returns {object} LCH color object
 */
export function toLCH(color) {
  return lch(color);
}

/**
 * Convert LCH back to RGB
 * @param {object} lchColor - LCH color object
 * @returns {object} RGB color object
 */
export function fromLCH(lchColor) {
  return rgb(lchColor);
}

/**
 * Extract dominant colors from an image using canvas
 * This is a simplified version; for production, consider using a library like colorthief
 * @param {HTMLImageElement} img - Image element
 * @param {number} numColors - Number of colors to extract
 * @returns {Promise<string[]>} Array of hex colors
 */
export async function extractColors(img, numColors = 5) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Simple color quantization (k-means would be better)
  const colorMap = new Map();

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const key = `${r},${g},${b}`;
    colorMap.set(key, (colorMap.get(key) || 0) + 1);
  }

  const sortedColors = Array.from(colorMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, numColors)
    .map(([key]) => {
      const [r, g, b] = key.split(',').map(Number);
      return `rgb(${r}, ${g}, ${b})`;
    });

  return sortedColors;
}