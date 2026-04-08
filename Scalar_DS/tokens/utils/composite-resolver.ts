/**
 * Composite Typography Resolver
 * 
 * Resolves composite typography tokens to actual style objects
 */

import { typographyPrimitives } from '../typography/primitives';
import { compositeTypography } from '../typography/composite';
import { resolveTypographyReference } from './resolver';
import type { CompositeTypographyStyle } from '../types';

/**
 * Resolves a composite typography style
 * 
 * @param breakpoint - Breakpoint name (e.g., 'desktopLarge')
 * @param category - Typography category (e.g., 'heading')
 * @param scale - Typography scale (e.g., 'xs', 'm')
 * @param weight - Typography weight (e.g., 'regular', 'bold')
 * @returns Resolved typography style object
 */
export function resolveCompositeTypography(
  breakpoint: 'desktopLarge',
  category: 'heading',
  scale: 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl',
  weight: 'regular' | 'semiBold' | 'bold'
): CompositeTypographyStyle {
  const composite = compositeTypography[breakpoint];
  
  if (!composite) {
    throw new Error(`Breakpoint not found: ${breakpoint}`);
  }

  const categoryStyles = composite[category];
  
  if (!categoryStyles) {
    throw new Error(`Typography category not found: ${category} for breakpoint ${breakpoint}`);
  }

  const scaleStyles = categoryStyles[scale];
  
  if (!scaleStyles) {
    throw new Error(`Typography scale not found: ${scale} for ${breakpoint}.${category}`);
  }

  const weightStyle = scaleStyles[weight];
  
  if (!weightStyle) {
    throw new Error(`Typography weight not found: ${weight} for ${breakpoint}.${category}.${scale}`);
  }

  // Resolve all references
  return {
    family: resolveTypographyReference(weightStyle.family) as string,
    size: resolveTypographyReference(weightStyle.size) as number,
    weight: resolveTypographyReference(weightStyle.weight) as number,
    lineHeight: resolveTypographyReference(weightStyle.lineHeight) as number,
    letterSpacing: resolveTypographyReference(weightStyle.letterSpacing) as number,
  };
}

