/**
 * Typography Primitives
 * 
 * Foundational typography tokens for font properties.
 */

export const typographyPrimitives = {
  family: {
    inter: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  size: {
    xs: 10,
    s: 12,
    m: 14,
    l: 16,
    xl: 18,
    '2xl': 20,
    '3xl': 24,
    '4xl': 28,
    '5xl': 32,
  },
  weight: {
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },
  lineHeight: {
    xs: 14,
    s: 16,
    m: 20,
    l: 24,
    xl: 26,
    '2xl': 28,
    '3xl': 32,
    '4xl': 36,
    '5xl': 40,
  },
  letterSpacing: {
    none: 0,
    tight: -0.5,
    wide: 0.5,
  },
} as const;

export type TypographyPrimitive = typeof typographyPrimitives;
export type TypographySize = keyof typeof typographyPrimitives.size;
export type TypographyWeight = keyof typeof typographyPrimitives.weight;
export type TypographyLetterSpacing = keyof typeof typographyPrimitives.letterSpacing;

