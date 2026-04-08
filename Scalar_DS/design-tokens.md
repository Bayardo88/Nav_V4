# Scalar Design System v1.0 - Design Token Architecture

## Overview

This document provides a comprehensive overview of the design token architecture for the Scalar Design System v1.0, documenting the exact variable structure, naming conventions, values, and interconnections as defined in Figma.

The design system employs a **three-tier variable architecture**:
1. **Primitive Variables** - Foundational tokens with raw values
2. **Semantic Variables** - Context-specific tokens mapped to primitives
3. **Composite Variables** - Combined primitive tokens forming reusable styles

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    PRIMITIVE VARIABLES                       │
│  ┌──────────────────┐  ┌──────────────────┐                 │
│  │ Color Primitives │  │ Typography       │                 │
│  │ (Raw Hex Values) │  │ Primitives       │                 │
│  │                  │  │ (Raw Values)    │                 │
│  │ • Neutral        │  │ • Family         │                 │
│  │ • Brand          │  │ • Size           │                 │
│  │ • Purple         │  │ • Weight         │                 │
│  │ • Blue           │  │ • Line Height    │                 │
│  │ • Green          │  │ • Letter Spacing │                 │
│  │ • Orange         │  │                  │                 │
│  │ • Red            │  │                  │                 │
│  │ • Yellow         │  │                  │                 │
│  └──────────────────┘  └──────────────────┘                 │
└─────────────────────────────────────────────────────────────┘
                        │              │
                        │              │
                        ▼              ▼
┌─────────────────────────────────────────────────────────────┐
│                  SEMANTIC VARIABLES                          │
│              (Mode-Dependent Mappings)                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   Text   │  │Background│  │   Icon   │  │  Border  │   │
│  │  Colors  │  │  Colors  │  │  Colors  │  │  Colors  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│  ┌──────────┐  ┌──────────┐                                │
│  │ Outline │  │ Overlay  │                                │
│  │  Colors │  │  Colors  │                                │
│  └──────────┘  └──────────┘                                │
│                                                              │
│  Mode: Light ──────────────── Dark                          │
└─────────────────────────────────────────────────────────────┘
                        │
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                  COMPOSITE VARIABLES                         │
│         (Multiple Primitive References)                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Typography Styles                                    │   │
│  │ • Breakpoint: Desktop Large                          │   │
│  │ • Category: Heading                                  │   │
│  │ • Sizes: XS, S, M, L, XL, 2XL, 3XL, 4XL, 5XL        │   │
│  │ • Weights: Regular, SemiBold, Bold                   │   │
│  │ • References: Family + Size + Weight + LineHeight + │   │
│  │              LetterSpacing                           │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 1. Variable Collections

### 1.1 Color Primitives Collection

**Collection Name:** `Color Primitives`  
**Type:** Primitive Variables  
**Purpose:** Foundational color values organized by color families

#### Structure

Color primitives follow the naming pattern: `[ColorFamily]/[Shade]`

#### Color Families

##### Neutral
- **Scale:** 100-900 (21 shades)
- **Values:**
  - `Neutral/white`: `#ffffff` (White)
  - `Neutral/100`: `#E5E5E5`
  - `Neutral/200`: `#CCCCCC`
  - `Neutral/300`: `#B3B3B3`
  - `Neutral/400`: `#999999`
  - `Neutral/500`: `#808080`
  - `Neutral/600`: `#666666`
  - `Neutral/700`: `#4C4C4C`
  - `Neutral/800`: `#333333`
  - `Neutral/900`: `#1A1A1A`
  - `Neutral/black`: `#000000` (Black)


##### Brand
- **Scale:** 100-900 (9 shades)
- **Values:**
  - `Brand/100`: `#CDE5FA`
  - `Brand/200`: `#9ACBF6`
  - `Brand/300`: `#68B1F1`
  - `Brand/400`: `#3597ED`
  - `Brand/500`: `#037DE8` (Primary brand color)
  - `Brand/600`: `#0268C1`
  - `Brand/700`: `#02539A`
  - `Brand/800`: `#013E73`
  - `Brand/900`: `#01294C`

  ##### Accent
- **Scale:** 100-900 (9 shades)
- **Values:**
  - `Accent/100`: `#CEF3E6`
  - `Accent/200`: `#9CE8CD`
  - `Accent/300`: `#6BDCB3`
  - `Accent/400`: `#39D19A`
  - `Accent/500`: `#08C581` 
  - `Accent/600`: `#07A46B`
  - `Accent/700`: `#058355`
  - `Accent/800`: `#046140`
  - `Accent/900`: `#03402A`

##### Purple
- **Scale:** 100-900 (9 shades)
- **Values:**
  - `Purple/100`: `#DFCFFF`
  - `Purple/200`: `#C2A8FF`
  - `Purple/300`: `#A77FFF`
  - `Purple/400`: `#8A58FF`
  - `Purple/500`: `#6E2FFF`
  - `Purple/600`: `#5826D6`
  - `Purple/700`: `#441DA3`
  - `Purple/800`: `#2E1571`
  - `Purple/900`: `#1A0B3E`

##### Blue
- **Scale:** 100-900 (9 shades)
- **Values:**
  - `Blue/100`: `#CED3FD`
  - `Blue/200`: `#9EA7FA`
  - `Blue/300`: `#6D7BF8`
  - `Blue/400`: `#3D4FF5`
  - `Blue/500`: `#2A3EF4`
  - `Blue/600`: `#0A1CC2`
  - `Blue/700`: `#071592`
  - `Blue/800`: `#050E61`
  - `Blue/900`: `#020731`

##### Green
- **Scale:** 100-900 (9 shades)
- **Values:**
  - `Green/100`: `#BBE8CE`
  - `Green/200`: `#7ED6A5`
  - `Green/300`: `#31C37B`
  - `Green/400`: `#00B04F`
  - `Green/500`: `#009C1C`
  - `Green/600`: `#007E17`
  - `Green/700`: `#006012`
  - `Green/800`: `#00420F`
  - `Green/900`: `#002409`

##### Orange
- **Scale:** 100-900 (9 shades)
- **Values:**
  - `Orange/100`: `#FFE0C4`
  - `Orange/200`: `#FFC790`
  - `Orange/300`: `#FFAC5C`
  - `Orange/400`: `#FF9211`
  - `Orange/500`: `#FF7700`
  - `Orange/600`: `#D26000`
  - `Orange/700`: `#A04900`
  - `Orange/800`: `#6F3300`
  - `Orange/900`: `#3C1B00`

##### Red
- **Scale:** 100-900 (9 shades)
- **Values:**
  - `Red/100`: `#FFC8C9`
  - `Red/200`: `#FF999C`
  - `Red/300`: `#FF686E`
  - `Red/400`: `#FF2F3D`
  - `Red/500`: `#FB0000`
  - `Red/600`: `#CB0000`
  - `Red/700`: `#9C0000`
  - `Red/800`: `#6C0003`
  - `Red/900`: `#3B0104`

##### Yellow
- **Scale:** 100-900 (9 shades)
- **Values:**
  - `Yellow/100`: `#FFEECC`
  - `Yellow/200`: `#FFDD99`
  - `Yellow/300`: `#FFCC66`
  - `Yellow/400`: `#FFBB33`
  - `Yellow/500`: `#FFAA00`
  - `Yellow/600`: `#CC8800`
  - `Yellow/700`: `#996600`
  - `Yellow/800`: `#664400`
  - `Yellow/900`: `#332200`

**Total Color Primitives:** 8 families × average 9-21 shades = **~100 primitive color variables**

---

### 1.2 Typography Primitives Collection

**Collection Name:** `Typography Primitives`  
**Type:** Primitive Variables  
**Purpose:** Foundational typographic properties

#### Structure

Typography primitives follow the naming pattern: `[Property]/[Value]`

#### Font Family

- **Variable:** `Family/Inter`
- **Value:** `Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`

#### Font Sizes

- **Variable Pattern:** `Size/[Scale]`
- **Values:**
  - `Size/XS`: `10`
  - `Size/S`: `12`
  - `Size/M`: `14`
  - `Size/L`: `16`
  - `Size/XL`: `18`
  - `Size/2XL`: `20`
  - `Size/3XL`: `24`
  - `Size/4XL`: `28`
  - `Size/5XL`: `32`

#### Font Weights

- **Variable Pattern:** `Weight/[Weight]`
- **Values:**
  - `Weight/Regular`: `400`
  - `Weight/Medium`: `500`
  - `Weight/SemiBold`: `600`
  - `Weight/Bold`: `700`

**Note:** The `Weight/Light` (300) variable has been removed from the primitive collection but may still be referenced in composite variables.

#### Line Heights

- **Variable Pattern:** `Line Height/[Scale]`
- **Values:**
  - `Line Height/XS`: `14`
  - `Line Height/S`: `16`
  - `Line Height/M`: `20`
  - `Line Height/L`: `24`
  - `Line Height/XL`: `26`
  - `Line Height/2XL`: `28`
  - `Line Height/3XL`: `32`
  - `Line Height/4XL`: `36`
  - `Line Height/5XL`: `40`

#### Letter Spacing

- **Variable Pattern:** `Letter Spacing/[Value]`
- **Values:**
  - `Letter Spacing/None`: `0`
  - `Letter Spacing/Tight`: `-0.5`
  - `Letter Spacing/Wide`: `0.5`

**Total Typography Primitives:** 1 family + 9 sizes + 4 weights + 9 line heights + 3 letter spacing = **27 primitive typography variables**

---

### 1.3 Semantic Color Variables Collection

**Collection Name:** `Semantic Colors`  
**Type:** Semantic Variables (Mapped)  
**Purpose:** Context-specific color tokens that reference primitive colors with mode-dependent mappings

#### Structure

Semantic colors follow the naming pattern: `[Category]/[Purpose]`  
**Modes:** `Light` and `Dark`  
**Mapping:** Each semantic variable references a primitive color variable using the format: `{Color/[ColorFamily]/[Shade]}`

#### Categories

##### Text Colors

**Light Mode Mappings:**
- `Text/Primary`: `{Color/Neutral/900}` → `#1A1A1A`
- `Text/Secondary`: `{Color/Neutral/800}` → `#333333`
- `Text/Tertiary`: `{Color/Neutral/600}` → `#666666`
- `Text/Disabled`: `{Color/Neutral/300}` → `#B3B3B3`
- `Text/Link`: `{Color/Blue/500}` → `#2A3EF4`
- `Text/Link Hover`: `{Color/Blue/600}` → `#0A1CC2`
- `Text/Link Pressed`: `{Color/Blue/700}` → `#071592`
- `Text/Warning`: `{Color/Yellow/600}` → `#CC8800`
- `Text/Warning Hover`: `{Color/Yellow/700}` → `#996600`
- `Text/Warning Pressed`: `{Color/Yellow/800}` → `#664400`
- `Text/Positive`: `{Color/Green/600}` → `#007E17`
- `Text/Positive Hover`: `{Color/Green/700}` → `#006012`
- `Text/Positive Pressed`: `{Color/Green/800}` → `#00420F`
- `Text/Negative`: `{Color/Red/600}` → `#CB0000`
- `Text/Negative Hover`: `{Color/Red/700}` → `#9C0000`
- `Text/Negative Pressed`: `{Color/Red/800}` → `#6C0003`
- `Text/Readable`: `{Color/Neutral/800}` → `#333333`
- `Text/Sourced`: `{Color/Green/600}` → `#007E17`
- `Text/Editable`: `{Color/Brand/500}` → `#037DE8`



**Dark Mode Mappings:**
- `Text/Primary`: `{Color/Neutral/100}` → `#E5E5E5`
- `Text/Secondary`: `{Color/Neutral/200}` → `#CCCCCC`
- `Text/Tertiary`: `{Color/Neutral/400}` → `#999999`
- `Text/Disabled`: `{Color/Neutral/700}` → `#4C4C4C`
- `Text/Link`: `{Color/Blue/400}` → `#3D4FF5`
- `Text/Link Hover`: `{Color/Blue/300}` → `#6D7BF8`
- `Text/Link Pressed`: `{Color/Blue/200}` → `#9EA7FA`
- `Text/Warning`: `{Color/Yellow/400}` → `#FFBB33`
- `Text/Warning Hover`: `{Color/Yellow/300}` → `#FFCC66`
- `Text/Warning Pressed`: `{Color/Yellow/200}` → `#FFDD99`
- `Text/Positive`: `{Color/Green/400}` → `#00B04F`
- `Text/Positive Hover`: `{Color/Green/300}` → `#31C37B`
- `Text/Positive Pressed`: `{Color/Green/200}` → `#7ED6A5`
- `Text/Negative`: `{Color/Red/400}` → `#FF2F3D`
- `Text/Negative Hover`: `{Color/Red/300}` → `#FF686E`
- `Text/Negative Pressed`: `{Color/Red/200}` → `#FF999C`
- `Text/Readable`: `{Color/Neutral/200}` → `#CCCCCC`
- `Text/Sourced`: `{Color/Green/400}` → `#00B04F`
- `Text/Editable`: `{Color/Brand/400}` → `#3597ED`

**Total Text Variables:** 19 per mode = **38 total text semantic variables**

##### Background Colors

**Light Mode Mappings:**
- `Background/Brand`: `{Color/Brand/500}` → `#037DE8`
- `Background/Hover`: `{Color/Brand/600}` → `#0268C1`
- `Background/Pressed`: `{Color/Brand/700}` → `#02539A`
- `Background/Disabled`: `{Color/Neutral/300}` → `#B3B3B3`
- `Background/Positive`: `{Color/Green/600}` → `#007E17`
- `Background/Positive Hover`: `{Color/Green/700}` → `#006012`
- `Background/Positive Pressed`: `{Color/Green/800}` → `#00420F`
- `Background/Warning`: `{Color/Yellow/600}` → `#CC8800`
- `Background/Warning Hover`: `{Color/Yellow/700}` → `#996600`
- `Background/Warning Pressed`: `{Color/Yellow/800}` → `#664400`
- `Background/Negative`: `{Color/Red/600}` → `#CB0000`
- `Background/Negative Hover`: `{Color/Red/700}` → `#9C`
- `Background/Negative Pressed`: `{Color/Red/800}` → `#6C000`
- `Background/Page`: `{Color/Neutral/100}` → `#E5E5E5`

**Dark Mode Mappings:**
- `Background/Brand`: `{Color/Brand/400}` → `#3597ED`
- `Background/Hover`: `{Color/Brand/300}` → `#68B1F1`
- `Background/Pressed`: `{Color/Brand/200}` → `#9ACBF6`
- `Background/Disabled`: `{Color/Neutral/700}` → `#4C4C4C`
- `Background/Positive`: `{Color/Green/400}` → `#00B04F`
- `Background/Positive Hover`: `{Color/Green/300}` → `#31C37B`
- `Background/Positive Pressed`: `{Color/Green/200}` → `#7ED6A5`
- `Background/Warning`: `{Color/Yellow/400}` → `#FFBB33`
- `Background/Warning Hover`: `{Color/Yellow/300}` → `#FFCC66`
- `Background/Warning Pressed`: `{Color/Yellow/200}` → `#FFDD9`
- `Background/Negative`: `{Color/Red/400}` → `#FF2F3D`
- `Background/Negative Hover`: `{Color/Red/300}` → `#FF686E`
- `Background/Negative Pressed`: `{Color/Red/200}` → `#FF999C`
- `Background/Page`: `{Color/Neutral/900}` → `#1A1A1A`


**Total Background Variables:** 14 per mode = **28 total background semantic variables**


##### Overlay Colors

**Light Mode Mappings:**
- `Overlay/30`: `{Color/Neutral/black}` → (black with 30% opacity)
- `Overlay/50`: `{Color/Neutral/black}` → (black with 50% opacity)
- `Overlay/70`: `{Color/Neutral/black}` → (black with 70% opacity)

**Dark Mode Mappings:**
- `Overlay/30`: `{Color/Neutral/white}` → (white with 30% opacity)
- `Overlay/50`: `{Color/Neutral/white}` → (white with 50% opacity)
- `Overlay/70`: `{Color/Neutral/white}` → (white with 70% opacity)

**Total Overlay Variables:** 3 per mode = **6 total overlay semantic variables**

**Total Semantic Color Variables:** ~72 variables (36 per mode × 2 modes)

---

### 1.4 Composite Typography Variables Collection

**Collection Name:** `Composite Typography`  
**Type:** Composite Variables (Mapped)  
**Purpose:** Typography styles combining multiple primitive typography properties

#### Structure

Composite typography follows the naming pattern: `[Breakpoint]/[Category]/[Scale]/[Weight]`

#### Breakpoint

- **Breakpoint:** `Desktop Large`

#### Category

- **Category:** `Heading`

#### Scales

- XS, S, M, L, XL, 2XL, 3XL, 4XL, 5XL

#### Weights

- Regular, SemiBold, Bold
- **Note:** Some composite variables reference `Weight/Light`, but this weight has been removed from primitives

#### Composite Structure

Each composite variable references multiple primitive variables:

**Example:** `Desktop Large/Heading/XS/Regular`

```json
{
  "family": "{typography.primitive.family.inter}",
  "size": "{typography.primitive.size.xs}",
  "weight": "{typography.primitive.weight.regular}",
  "lineHeight": "{typography.primitive.lineHeight.xs}",
  "letterSpacing": "{typography.primitive.letterSpacing.none}"
}
```

**Resolved Values:**
- `family`: `Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- `size`: `10`
- `weight`: `400`
- `lineHeight`: `14`
- `letterSpacing`: `0`

#### Complete Composite Typography Matrix

| Size | Regular | SemiBold | Bold | 
|------|---------|----------|------|
| XS   | ✓       | ✓        | ✓    | 
| S    | ✓       | ✓        | ✓    | 
| M    | ✓       | ✓        | ✓    | 
| L    | ✓       | ✓        | ✓    | 
| XL   | ✓       | ✓        | ✓    | 
| 2XL  | ✓       | ✓        | ✓    | 
| 3XL  | ✓       | ✓        | ✓    | 
| 4XL  | ✓       | ✓        | ✓    | 
| 5XL  | ✓       | ✓        | ✓    | 


**Total Composite Typography Variables:** 9 sizes × 3 weights = **27 composite typography variables**

---

## 2. Collection Mapping and Connections

### 2.1 Mapping Mechanism

Collections are connected through **variable aliases** (mapped collections in Figma). Semantic and composite variables reference primitive variables using the reference format: `{collection.primitive.[path]}`

### 2.2 Reference Format

**Pattern:** `{Color/[ColorFamily]/[Shade]}` for color primitives

**Examples:**
- `{Color/Neutral/100}` - References Neutral/100 color
- `{Color/Brand/500}` - References Brand/500 color
- `{Color/Neutral/500}` - References Neutral/500 color

### 2.3 Mapping Patterns

#### Pattern 1: Direct Primitive → Semantic Mapping

```
Primitive Variable → Semantic Variable
─────────────────────────────────────
Neutral/900 → Text/Primary (Light Mode)
Neutral/100 → Text/Primary (Dark Mode)
```

**Connection Type:** One-to-one mapping with mode-dependent resolution

#### Pattern 2: Primitive → Semantic with Opacity

```
Primitive Variable + Opacity Suffix → Semantic Variable
─────────────────────────────────────────────────────────
Neutral/100 + 50 → Overlay/50 Inverse (Light Mode)
Neutral/900 + 50 → Overlay/50 Inverse (Dark Mode)
```

**Connection Type:** One-to-one mapping with opacity modifier

#### Pattern 3: Multiple Primitives → Composite

```
Multiple Primitive Variables → Composite Variable
──────────────────────────────────────────────────
Family/Inter + Size/XS + Weight/Regular + 
Line Height/XS + Letter Spacing/None 
→ Desktop Large/Heading/XS/Regular
```

**Connection Type:** Many-to-one mapping combining multiple primitives

### 2.4 Mode-Dependent Mapping

The same semantic variable can map to different primitives based on the active mode:

**Example: Text/Primary**

| Mode | Semantic Variable | Primitive Reference | Resolved Value |
|------|------------------|---------------------|----------------|
| Light | `Text/Primary` | `{Color/Neutral/900}` | `#1A1A1A` |
| Dark  | `Text/Primary` | `{Color/Neutral/100}` | `#E5E5E5` |

**Key Characteristics:**
- Same semantic name, different primitive references
- Consistent semantic meaning across modes


**Pattern:**
- Base variable: Uses standard mapping

---

## 3. Naming Conventions

### 3.1 Primitive Variables

#### Color Primitives
- **Pattern:** `[ColorFamily]/[Shade]`
- **Examples:**
  - `Neutral/100`
  - `Brand/500`
  - `Red/900`

#### Typography Primitives
- **Pattern:** `[Property]/[Value]`
- **Examples:**
  - `Family/Inter`
  - `Size/XS`
  - `Weight/Regular`
  - `Line Height/M`
  - `Letter Spacing/None`

### 3.2 Semantic Variables

- **Pattern:** `[Category]/[Purpose]`
- **Examples:**
  - `Text/Primary`
  - `Background/Accent Hover`
  - `Icon/Success`
  - `Border/Primary`
  - `Overlay/50 Inverse`

**CamelCase Convention:** Multi-word purposes use camelCase (e.g., `Primary Inverse`, `Link Hover`)

### 3.3 Composite Variables

- **Pattern:** `[Breakpoint]/[Category]/[Scale]/[Weight]`
- **Examples:**
  - `Desktop Large/Heading/XS/Regular`
  - `Desktop Large/Heading/M/Bold`

**Hierarchy:** Breakpoint → Category → Scale → Weight

---

## 4. Value Consistency

### 4.1 Color Value Format

- **Format:** Hexadecimal (`#RRGGBB`)
- **Examples:**
  - `#000000` (Black)
  - `#ffffff` (White)
  - `#037DE8` (Brand primary)

### 4.2 Typography Value Format

- **Sizes:** Integer (pixels)
- **Weights:** Integer (font-weight values: 400, 500, 600, 700)
- **Line Heights:** Integer (pixels)
- **Letter Spacing:** Number (pixels, can be negative)

### 4.3 Opacity Suffix Format

- **Format:** `{reference}[opacity]`
- **Examples:**
  - `{Color/Neutral/900}50` (50% opacity)
  - `{Color/Neutral/100}80` (80% opacity, hex 80 = 128/255 ≈ 50%)

**Note:** Opacity values are appended as hexadecimal digits representing 0-255 range

---

## 5. Collection Hierarchy Summary

### 5.1 Primitive Layer

**Collections:** 2
- Color Primitives (~89 variables)
- Typography Primitives (26 variables)

**Total Primitives:** ~115 variables

### 5.2 Semantic Layer

**Collections:** 1
- Semantic Colors (~72 variables across 2 modes)

**Total Semantics:** ~72 variables

### 5.3 Composite Layer

**Collections:** 1
- Composite Typography (26 variables)

**Total Composites:** 26 variables

### 5.4 Grand Total

**Total Design Tokens:** ~213 variables

---

## 6. Key Architectural Principles

### 6.1 Single Source of Truth

Primitive variables serve as the single source of truth. All semantic and composite variables reference primitives, ensuring consistency and enabling global updates.

### 6.2 Separation of Concerns

- **Primitives:** Raw values without semantic meaning
- **Semantics:** Context-specific tokens with meaning
- **Composites:** Reusable style combinations

### 6.3 Mode Independence

Semantic variables maintain consistent meaning across modes while resolving to different primitives, enabling automatic theme switching.

### 6.4 Cascading Updates

Changes to primitive variables automatically propagate to all referencing semantic and composite variables.

### 6.5 Reference Integrity

All references use a consistent format (`{collection.primitive.[path]}`) ensuring reliable resolution and preventing broken links.

---

## 7. Implementation Notes

### 7.1 Reference Resolution

When resolving a semantic variable:
1. Check active mode (Light/Dark)
2. Locate semantic variable in appropriate mode collection
3. Extract primitive reference
4. Resolve primitive reference to actual value
5. Apply any modifiers (opacity, etc.)

### 7.2 Opacity Handling

Opacity suffixes are handled as hexadecimal values:
- `80` (hex) = 128 (decimal) = ~50% opacity
- `20` (hex) = 32 (decimal) = ~12.5% opacity

### 7.3 Composite Resolution

When resolving a composite variable:
1. Locate composite variable by path
2. Extract all primitive references
3. Resolve each primitive reference independently
4. Combine into final style object

---

## 8. Summary

The Scalar Design System v1.0 design token architecture consists of:

- **3 Variable Tiers:** Primitives → Semantics → Composites
- **2 Primitive Collections:** Colors (~89) + Typography (26)
- **1 Semantic Collection:** Colors (~72 across 2 modes)
- **1 Composite Collection:** Typography (26)
- **2 Modes:** Light + Dark
- **~213 Total Variables**

The architecture enables:
- ✅ Consistent design values
- ✅ Automatic theme switching
- ✅ Global updates through primitives
- ✅ Type-safe token access
- ✅ Seamless Figma integration

All variables follow consistent naming conventions and reference patterns, ensuring reliable resolution and maintainability across the design system.

