/**
 * Semantic Color Tokens
 * 
 * Context-specific color tokens that map to primitives with mode-dependent values.
 * Each semantic variable references a primitive color using the format: {Color/[ColorFamily]/[Shade]}
 */

import type { ThemeMode } from '../types';

/**
 * Semantic color references for Light and Dark modes
 */
export const semanticColors = {
  light: {
    text: {
      primary: '{Color/Neutral/900}',
      secondary: '{Color/Neutral/800}',
      tertiary: '{Color/Neutral/600}',
      disabled: '{Color/Neutral/300}',
      link: '{Color/Blue/500}',
      linkHover: '{Color/Blue/600}',
      linkPressed: '{Color/Blue/700}',
      warning: '{Color/Yellow/600}',
      warningHover: '{Color/Yellow/700}',
      warningPressed: '{Color/Yellow/800}',
      positive: '{Color/Green/600}',
      positiveHover: '{Color/Green/700}',
      positivePressed: '{Color/Green/800}',
      negative: '{Color/Red/600}',
      negativeHover: '{Color/Red/700}',
      negativePressed: '{Color/Red/800}',
      readable: '{Color/Neutral/800}',
      sourced: '{Color/Green/600}',
      editable: '{Color/Brand/500}',
    },
    background: {
      brand: '{Color/Brand/500}',
      hover: '{Color/Brand/600}',
      pressed: '{Color/Brand/700}',
      disabled: '{Color/Neutral/300}',
      positive: '{Color/Green/600}',
      positiveHover: '{Color/Green/700}',
      positivePressed: '{Color/Green/800}',
      warning: '{Color/Yellow/600}',
      warningHover: '{Color/Yellow/700}',
      warningPressed: '{Color/Yellow/800}',
      negative: '{Color/Red/600}',
      negativeHover: '{Color/Red/700}',
      negativePressed: '{Color/Red/800}',
      page: '{Color/Neutral/100}',
    },
    overlay: {
      '30': '{Color/Neutral/black}',
      '50': '{Color/Neutral/black}',
      '70': '{Color/Neutral/black}',
    },
  },
  dark: {
    text: {
      primary: '{Color/Neutral/100}',
      secondary: '{Color/Neutral/200}',
      tertiary: '{Color/Neutral/400}',
      disabled: '{Color/Neutral/700}',
      link: '{Color/Blue/400}',
      linkHover: '{Color/Blue/300}',
      linkPressed: '{Color/Blue/200}',
      warning: '{Color/Yellow/400}',
      warningHover: '{Color/Yellow/300}',
      warningPressed: '{Color/Yellow/200}',
      positive: '{Color/Green/400}',
      positiveHover: '{Color/Green/300}',
      positivePressed: '{Color/Green/200}',
      negative: '{Color/Red/400}',
      negativeHover: '{Color/Red/300}',
      negativePressed: '{Color/Red/200}',
      readable: '{Color/Neutral/200}',
      sourced: '{Color/Green/400}',
      editable: '{Color/Brand/400}',
    },
    background: {
      brand: '{Color/Brand/400}',
      hover: '{Color/Brand/300}',
      pressed: '{Color/Brand/200}',
      disabled: '{Color/Neutral/700}',
      positive: '{Color/Green/400}',
      positiveHover: '{Color/Green/300}',
      positivePressed: '{Color/Green/200}',
      warning: '{Color/Yellow/400}',
      warningHover: '{Color/Yellow/300}',
      warningPressed: '{Color/Yellow/200}',
      negative: '{Color/Red/400}',
      negativeHover: '{Color/Red/300}',
      negativePressed: '{Color/Red/200}',
      page: '{Color/Neutral/900}',
    },
    overlay: {
      '30': '{Color/Neutral/white}',
      '50': '{Color/Neutral/white}',
      '70': '{Color/Neutral/white}',
    },
  },
} as const;

export type SemanticColors = typeof semanticColors;
export type SemanticColorCategory = keyof typeof semanticColors.light;
export type SemanticTextColor = keyof typeof semanticColors.light.text;
export type SemanticBackgroundColor = keyof typeof semanticColors.light.background;
export type SemanticOverlayColor = keyof typeof semanticColors.light.overlay;

