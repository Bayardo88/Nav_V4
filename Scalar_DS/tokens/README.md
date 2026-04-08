# Scalar Design System - Design Tokens

This directory contains the design tokens for the Scalar Design System, structured to match the exact Figma variable architecture.

## Structure

```
tokens/
├── color/
│   ├── primitives.ts    # Color primitive tokens (9 families)
│   └── semantic.ts      # Semantic color tokens (mode-dependent)
├── typography/
│   ├── primitives.ts    # Typography primitive tokens
│   └── composite.ts     # Composite typography styles
├── utils/
│   ├── resolver.ts      # Token reference resolution
│   └── composite-resolver.ts  # Composite typography resolution
├── types.ts             # TypeScript type definitions
└── index.ts             # Main entry point
```

## Usage

### Import Tokens

```typescript
import {
  getColorPrimitive,
  getSemanticColor,
  getTypographyStyle,
  getOverlayColor,
  colorPrimitives,
  typographyPrimitives,
} from './tokens';
```

### Access Primitive Colors

```typescript
// Get a primitive color
const brandPrimary = getColorPrimitive('brand', '500'); // '#037DE8'
const neutralWhite = getColorPrimitive('neutral', 'white'); // '#ffffff'
const neutral900 = getColorPrimitive('neutral', '900'); // '#1A1A1A'
```

### Access Semantic Colors (Mode-Aware)

```typescript
// Get semantic colors with mode support
const textPrimary = getSemanticColor('text', 'primary', 'light'); // '#1A1A1A'
const textPrimaryDark = getSemanticColor('text', 'primary', 'dark'); // '#E5E5E5'

const backgroundBrand = getSemanticColor('background', 'brand', 'light'); // '#037DE8'
const backgroundBrandDark = getSemanticColor('background', 'brand', 'dark'); // '#3597ED'
```

### Access Overlay Colors

```typescript
// Get overlay colors with opacity
const overlay50 = getOverlayColor('50', 'light'); // 'rgba(0, 0, 0, 0.5)'
const overlay50Dark = getOverlayColor('50', 'dark'); // 'rgba(255, 255, 255, 0.5)'
```

### Access Typography Styles

```typescript
// Get composite typography styles
const headingStyle = getTypographyStyle('desktopLarge', 'heading', 'm', 'bold');
// Returns: {
//   family: "Inter, -apple-system, ...",
//   size: 14,
//   weight: 700,
//   lineHeight: 20,
//   letterSpacing: 0
// }
```

### Direct Access to Primitives

```typescript
import { colorPrimitives, typographyPrimitives } from './tokens';

// Direct access to primitives
const brand500 = colorPrimitives.brand['500'];
const fontSizeXS = typographyPrimitives.size.xs;
const fontWeightBold = typographyPrimitives.weight.bold;
```

## Token Structure

### Color Primitives

9 color families with scales:
- **Neutral**: white, 100-900, black (11 values)
- **Brand**: 100-900 (9 values)
- **Accent**: 100-900 (9 values)
- **Purple**: 100-900 (9 values)
- **Blue**: 100-900 (9 values)
- **Green**: 100-900 (9 values)
- **Orange**: 100-900 (9 values)
- **Red**: 100-900 (9 values)
- **Yellow**: 100-900 (9 values)

### Semantic Colors

Mode-dependent semantic tokens:
- **Text**: 19 tokens per mode (primary, secondary, tertiary, disabled, link, warning, positive, negative, readable, sourced, editable)
- **Background**: 14 tokens per mode (brand, hover, pressed, disabled, positive, warning, negative, page)
- **Overlay**: 3 tokens per mode (30, 50, 70)

### Typography Primitives

- **Family**: Inter
- **Size**: XS, S, M, L, XL, 2XL, 3XL, 4XL, 5XL (9 sizes)
- **Weight**: Regular, Medium, SemiBold, Bold (4 weights)
- **Line Height**: Matching sizes (9 values)
- **Letter Spacing**: None, Tight, Wide (3 values)

### Composite Typography

- **Breakpoint**: Desktop Large
- **Category**: Heading
- **Sizes**: XS, S, M, L, XL, 2XL, 3XL, 4XL, 5XL
- **Weights**: Regular, SemiBold, Bold
- **Total**: 27 composite styles (9 sizes × 3 weights)

## Reference Format

Tokens use reference strings that match Figma's variable structure:

- **Color References**: `{Color/[Family]/[Shade]}` (e.g., `{Color/Neutral/900}`)
- **Typography References**: `{Typography/[Property]/[Value]}` (e.g., `{Typography/Size/XS}`)

## Mode Support

The design system supports two modes:
- **Light Mode**: Optimized for light interfaces
- **Dark Mode**: Optimized for dark interfaces

Semantic colors automatically resolve to different primitives based on the active mode, enabling seamless theme switching.

## Type Safety

All tokens are fully typed with TypeScript, providing:
- Autocomplete for token names
- Type checking for mode values
- Compile-time error detection

## Integration with Figma

This token structure exactly matches the Figma variable architecture:
- Same naming conventions
- Same reference format
- Same mode-dependent mappings
- Same collection structure

When importing React components from Figma, the tokens will align perfectly with the Figma variable references.

