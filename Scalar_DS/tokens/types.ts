/**
 * Design Token Type Definitions
 */

import type { colorPrimitives } from './color/primitives';
import type { typographyPrimitives } from './typography/primitives';

export type ThemeMode = 'light' | 'dark';

export type ColorPrimitive = typeof colorPrimitives;
export type ColorFamily = keyof ColorPrimitive;
export type ColorShade<T extends ColorFamily> = keyof ColorPrimitive[T] & (string | number);

export type TypographyPrimitive = typeof typographyPrimitives;
export type TypographySize = keyof typeof typographyPrimitives.size;
export type TypographyWeight = keyof typeof typographyPrimitives.weight;
export type TypographyLetterSpacing = keyof typeof typographyPrimitives.letterSpacing;

/**
 * Semantic Color Token Reference
 * Format: {Color/[ColorFamily]/[Shade]}
 */
export type ColorReference = `{Color/${string}/${string}}`;

/**
 * Typography Reference
 * Format: {Typography/[Property]/[Value]}
 */
export type TypographyReference = `{Typography/${string}/${string}}`;

/**
 * Composite Typography Style
 */
export interface CompositeTypographyStyle {
  family: string;
  size: number;
  weight: number;
  lineHeight: number;
  letterSpacing: number;
}

