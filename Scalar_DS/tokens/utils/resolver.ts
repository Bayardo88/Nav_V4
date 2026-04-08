/**
 * Token Resolver
 * 
 * Resolves token references to actual values, handling mode-dependent resolution
 */

import { colorPrimitives } from '../color/primitives';
import { semanticColors } from '../color/semantic';
import { typographyPrimitives } from '../typography/primitives';
import type { ThemeMode, ColorReference, TypographyReference } from '../types';

/**
 * Resolves a color reference to its actual hex value
 * 
 * @param reference - Color reference string (e.g., "{Color/Neutral/900}")
 * @returns Resolved hex color value
 */
export function resolveColorReference(reference: ColorReference | string): string {
  // Remove curly braces if present
  const path = reference.replace(/[{}]/g, '');
  
  // Parse the reference: Color/[Family]/[Shade]
  const match = path.match(/^Color\/([^/]+)\/(.+)$/);
  
  if (!match) {
    throw new Error(`Invalid color reference format: ${reference}`);
  }

  const [, family, shade] = match;
  
  // Get the color family
  const colorFamily = colorPrimitives[family as keyof typeof colorPrimitives];
  
  if (!colorFamily) {
    throw new Error(`Color family not found: ${family}`);
  }

  // Get the shade (handle both string and number keys)
  const colorValue = colorFamily[shade as keyof typeof colorFamily];
  
  if (!colorValue) {
    throw new Error(`Color shade not found: ${family}/${shade}`);
  }

  return colorValue;
}

/**
 * Resolves a typography reference to its actual value
 * 
 * @param reference - Typography reference string (e.g., "{Typography/Size/XS}")
 * @returns Resolved typography value (string or number)
 */
export function resolveTypographyReference(reference: TypographyReference | string): string | number {
  // Remove curly braces if present
  const path = reference.replace(/[{}]/g, '');
  
  // Parse the reference: Typography/[Property]/[Value]
  const match = path.match(/^Typography\/([^/]+)\/(.+)$/);
  
  if (!match) {
    throw new Error(`Invalid typography reference format: ${reference}`);
  }

  const [, property, value] = match;
  
  // Map property names to typography primitive structure
  const propertyMap: Record<string, keyof typeof typographyPrimitives> = {
    'Family': 'family',
    'Size': 'size',
    'Weight': 'weight',
    'Line Height': 'lineHeight',
    'Letter Spacing': 'letterSpacing',
  };

  const mappedProperty = propertyMap[property];
  
  if (!mappedProperty) {
    throw new Error(`Typography property not found: ${property}`);
  }

  const typographyProperty = typographyPrimitives[mappedProperty];
  
  // Map value names (handle special cases)
  let mappedValue = value;
  if (mappedProperty === 'family') {
    mappedValue = 'inter';
  } else if (mappedProperty === 'size' || mappedProperty === 'lineHeight') {
    // Handle numeric keys like "2XL" -> "2xl"
    mappedValue = value.toLowerCase();
  } else if (mappedProperty === 'weight') {
    // Map weight names
    const weightMap: Record<string, string> = {
      'Regular': 'regular',
      'Medium': 'medium',
      'SemiBold': 'semiBold',
      'Bold': 'bold',
    };
    mappedValue = weightMap[value] || value.toLowerCase();
  } else if (mappedProperty === 'letterSpacing') {
    // Map letter spacing names
    const spacingMap: Record<string, string> = {
      'None': 'none',
      'Tight': 'tight',
      'Wide': 'wide',
    };
    mappedValue = spacingMap[value] || value.toLowerCase();
  }

  const typographyValue = typographyProperty[mappedValue as keyof typeof typographyProperty];
  
  if (typographyValue === undefined) {
    throw new Error(`Typography value not found: ${property}/${value}`);
  }

  return typographyValue;
}

/**
 * Resolves a semantic color token with mode support
 * 
 * @param category - Color category ('text', 'background', 'overlay')
 * @param token - Token name (e.g., 'primary', 'brand')
 * @param mode - Theme mode ('light' | 'dark')
 * @returns Resolved hex color value
 */
export function resolveSemanticColor(
  category: 'text' | 'background' | 'overlay',
  token: string,
  mode: ThemeMode = 'light'
): string {
  const semanticMode = semanticColors[mode];
  const categoryTokens = semanticMode[category];
  
  if (!categoryTokens) {
    throw new Error(`Semantic color category not found: ${category} for mode ${mode}`);
  }

  const reference = categoryTokens[token as keyof typeof categoryTokens];
  
  if (!reference) {
    throw new Error(`Semantic color token not found: ${category}.${token} for mode ${mode}`);
  }

  // Resolve the reference
  return resolveColorReference(reference as string);
}

/**
 * Converts hex color with opacity to rgba
 * 
 * @param color - Hex color string
 * @param opacity - Opacity percentage (0-100)
 * @returns RGBA color string
 */
export function hexToRgba(color: string, opacity: number): string {
  // Remove # if present
  const hex = color.replace('#', '');
  
  // Parse RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Convert opacity percentage to decimal (0-1)
  const opacityDecimal = opacity / 100;
  
  return `rgba(${r}, ${g}, ${b}, ${opacityDecimal})`;
}

/**
 * Resolves an overlay color with opacity
 * 
 * @param level - Overlay level ('30', '50', '70')
 * @param mode - Theme mode ('light' | 'dark')
 * @returns RGBA color string
 */
export function resolveOverlayColor(level: '30' | '50' | '70', mode: ThemeMode = 'light'): string {
  const semanticMode = semanticColors[mode];
  const overlayReference = semanticMode.overlay[level];
  
  if (!overlayReference) {
    throw new Error(`Overlay color not found: ${level} for mode ${mode}`);
  }

  // Resolve the base color
  const baseColor = resolveColorReference(overlayReference as string);
  
  // Convert to rgba with the appropriate opacity
  const opacity = parseInt(level, 10);
  return hexToRgba(baseColor, opacity);
}

