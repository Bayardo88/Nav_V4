/**
 * Color Primitives
 * 
 * Foundational color tokens organized by color families.
 * These are the raw color values that serve as the single source of truth.
 */

export const colorPrimitives = {
  neutral: {
    white: '#ffffff',
    '100': '#E5E5E5',
    '200': '#CCCCCC',
    '300': '#B3B3B3',
    '400': '#999999',
    '500': '#808080',
    '600': '#666666',
    '700': '#4C4C4C',
    '800': '#333333',
    '900': '#1A1A1A',
    black: '#000000',
  },
  brand: {
    '100': '#CDE5FA',
    '200': '#9ACBF6',
    '300': '#68B1F1',
    '400': '#3597ED',
    '500': '#037DE8',
    '600': '#0268C1',
    '700': '#02539A',
    '800': '#013E73',
    '900': '#01294C',
  },
  accent: {
    '100': '#CEF3E6',
    '200': '#9CE8CD',
    '300': '#6BDCB3',
    '400': '#39D19A',
    '500': '#08C581',
    '600': '#07A46B',
    '700': '#058355',
    '800': '#046140',
    '900': '#03402A',
  },
  purple: {
    '100': '#DFCFFF',
    '200': '#C2A8FF',
    '300': '#A77FFF',
    '400': '#8A58FF',
    '500': '#6E2FFF',
    '600': '#5826D6',
    '700': '#441DA3',
    '800': '#2E1571',
    '900': '#1A0B3E',
  },
  blue: {
    '100': '#CED3FD',
    '200': '#9EA7FA',
    '300': '#6D7BF8',
    '400': '#3D4FF5',
    '500': '#2A3EF4',
    '600': '#0A1CC2',
    '700': '#071592',
    '800': '#050E61',
    '900': '#020731',
  },
  green: {
    '100': '#BBE8CE',
    '200': '#7ED6A5',
    '300': '#31C37B',
    '400': '#00B04F',
    '500': '#009C1C',
    '600': '#007E17',
    '700': '#006012',
    '800': '#00420F',
    '900': '#002409',
  },
  orange: {
    '100': '#FFE0C4',
    '200': '#FFC790',
    '300': '#FFAC5C',
    '400': '#FF9211',
    '500': '#FF7700',
    '600': '#D26000',
    '700': '#A04900',
    '800': '#6F3300',
    '900': '#3C1B00',
  },
  red: {
    '100': '#FFC8C9',
    '200': '#FF999C',
    '300': '#FF686E',
    '400': '#FF2F3D',
    '500': '#FB0000',
    '600': '#CB0000',
    '700': '#9C0000',
    '800': '#6C0003',
    '900': '#3B0104',
  },
  yellow: {
    '100': '#FFEECC',
    '200': '#FFDD99',
    '300': '#FFCC66',
    '400': '#FFBB33',
    '500': '#FFAA00',
    '600': '#CC8800',
    '700': '#996600',
    '800': '#664400',
    '900': '#332200',
  },
} as const;

export type ColorPrimitive = typeof colorPrimitives;
export type ColorFamily = keyof ColorPrimitive;
export type ColorShade<T extends ColorFamily> = keyof ColorPrimitive[T];

