/**
 * Design Tokens - Main Entry Point
 * 
 * Provides access to all design tokens with proper resolution and type safety
 */

import { colorPrimitives } from './color/primitives';
import { semanticColors } from './color/semantic';
import { typographyPrimitives } from './typography/primitives';
import { compositeTypography } from './typography/composite';
import {
  resolveColorReference,
  resolveSemanticColor,
  resolveOverlayColor,
  hexToRgba,
} from './utils/resolver';
import { resolveCompositeTypography } from './utils/composite-resolver';
import type { ThemeMode, ColorFamily, TypographySize, TypographyWeight } from './types';

/**
 * Get a primitive color value
 * 
 * @param family - Color family (e.g., 'neutral', 'brand')
 * @param shade - Shade value (e.g., '100', '500', 'white', 'black')
 * @returns Color hex value
 */
export function getColorPrimitive<T extends ColorFamily>(
  family: T,
  shade: keyof typeof colorPrimitives[T]
): string {
  const colorFamily = colorPrimitives[family];
  if (!colorFamily) {
    throw new Error(`Color family not found: ${family}`);
  }
  const color = colorFamily[shade as keyof typeof colorFamily];
  if (!color || typeof color !== 'string') {
    throw new Error(`Color shade not found: ${family}/${String(shade)}`);
  }
  return color as string;
}

/**
 * Get a semantic color value (mode-aware)
 * 
 * @param category - Color category ('text', 'background', 'overlay')
 * @param token - Token name (e.g., 'primary', 'brand')
 * @param mode - Theme mode (default: 'light')
 * @returns Resolved color value
 */
export function getSemanticColor(
  category: 'text' | 'background' | 'overlay',
  token: string,
  mode: ThemeMode = 'light'
): string {
  return resolveSemanticColor(category, token, mode);
}

/**
 * Get an overlay color with opacity
 * 
 * @param level - Overlay level ('30', '50', '70')
 * @param mode - Theme mode (default: 'light')
 * @returns RGBA color string
 */
export function getOverlayColor(level: '30' | '50' | '70', mode: ThemeMode = 'light'): string {
  return resolveOverlayColor(level, mode);
}

/**
 * Get a composite typography style
 * 
 * @param breakpoint - Breakpoint (e.g., 'desktopLarge')
 * @param category - Typography category (e.g., 'heading')
 * @param scale - Typography scale (e.g., 'xs', 'm')
 * @param weight - Typography weight (e.g., 'regular', 'medium', 'semiBold', 'bold')
 * @returns Resolved typography style object
 */
export function getTypographyStyle(
  breakpoint: 'desktopLarge',
  category: 'heading',
  scale: TypographySize,
  weight: TypographyWeight
) {
  // Map 'medium' to 'regular' if provided (composite typography doesn't support 'medium')
  const mappedWeight: 'regular' | 'semiBold' | 'bold' = weight === 'medium' ? 'regular' : weight as 'regular' | 'semiBold' | 'bold';
  return resolveCompositeTypography(breakpoint, category, scale, mappedWeight);
}

/**
 * Get a typography primitive value
 * 
 * @param property - Typography property ('family', 'size', 'weight', 'lineHeight', 'letterSpacing')
 * @param value - Value key
 * @returns Typography value
 */
export function getTypographyPrimitive(
  property: keyof typeof typographyPrimitives,
  value: string
): string | number {
  const prop = typographyPrimitives[property];
  if (!prop) {
    throw new Error(`Typography property not found: ${property}`);
  }
  const val = prop[value as keyof typeof prop];
  if (val === undefined) {
    throw new Error(`Typography value not found: ${property}/${value}`);
  }
  return val;
}

// Re-export all tokens
export { colorPrimitives, semanticColors, typographyPrimitives, compositeTypography };

// Re-export types
export type {
  ThemeMode,
  ColorFamily,
  TypographySize,
  TypographyWeight,
  CompositeTypographyStyle,
} from './types';

// Re-export utilities
export { hexToRgba } from './utils/resolver';

// Default export
export default {
  color: {
    primitive: colorPrimitives,
    semantic: semanticColors,
  },
  typography: {
    primitive: typographyPrimitives,
    composite: compositeTypography,
  },
};

