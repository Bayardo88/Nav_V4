import React, { useState } from 'react';
import { getSemanticColor, getTypographyStyle } from '../../tokens';
import type { ThemeMode } from '../../tokens/types';

export type ButtonStyle = 'Primary' | 'Secondary' | 'Tertiary';
export type ButtonSize = 'S' | 'M' | 'L';
export type ButtonState = 'Default' | 'Hover' | 'Pressed' | 'Selected';
export type ButtonType = 'Main' | 'Positive' | 'Warning' | 'Negative' | 'Disable';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style' | 'type'> {
  /**
   * Button label text
   */
  label?: string;
  /**
   * Optional leading icon (left side)
   */
  leadingIcon?: React.ReactNode;
  /**
   * Optional trailing icon (right side)
   */
  trailingIcon?: React.ReactNode;
  /**
   * Button style variant
   * @default 'Primary'
   */
  style?: ButtonStyle;
  /**
   * Button size
   * @default 'M'
   */
  size?: ButtonSize;
  /**
   * Button state (for controlled state management)
   * If not provided, component manages state internally
   */
  state?: ButtonState;
  /**
   * Button type/color variant
   * @default 'Main'
   */
  type?: ButtonType;
  /**
   * Theme mode for color resolution
   * @default 'light'
   */
  themeMode?: ThemeMode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Button component following Scalar Design System specifications
 * 
 * Supports multiple variants:
 * - Styles: Primary, Secondary, Tertiary
 * - Sizes: S (24px), M (40px), L (60px)
 * - States: Default, Hover, Pressed, Selected
 * - Types: Main, Positive, Warning, Negative, Disable
 */
type SizeStyles = {
  height: string;
  paddingX: string;
  iconSize: string;
  gap: string;
  fontSize: string;
  lineHeight: string;
  borderRadius: string;
};

export const Button: React.FC<ButtonProps> = ({
  label = 'Button',
  leadingIcon,
  trailingIcon,
  style = 'Primary',
  size = 'M',
  state: controlledState,
  type = 'Main',
  themeMode = 'light',
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  // Internal state management for hover/pressed if not controlled
  const [internalState, setInternalState] = useState<ButtonState>('Default');
  const isControlled = controlledState !== undefined;
  const currentState = isControlled ? controlledState : internalState;
  
  // Ensure themeMode is always a valid ThemeMode
  const activeThemeMode: ThemeMode = themeMode || 'light';
  
  // Determine if button is disabled
  const isDisabled = disabled || type === 'Disable';
  
  // Get background color based on style, type, and state
  const getBackgroundColor = (stateOverride?: ButtonState): string => {
    const activeState = stateOverride || currentState;
    
    if (isDisabled) {
      return getSemanticColor('background', 'disabled', activeThemeMode);
    }

    // Determine the color token based on type
    let colorToken: string;
    if (type === 'Positive') {
      colorToken = activeState === 'Default' ? 'positive' : activeState === 'Hover' ? 'positiveHover' : activeState === 'Pressed' ? 'positivePressed' : 'positive';
    } else if (type === 'Warning') {
      colorToken = activeState === 'Default' ? 'warning' : activeState === 'Hover' ? 'warningHover' : activeState === 'Pressed' ? 'warningPressed' : 'warning';
    } else if (type === 'Negative') {
      colorToken = activeState === 'Default' ? 'negative' : activeState === 'Hover' ? 'negativeHover' : activeState === 'Pressed' ? 'negativePressed' : 'negative';
    } else {
      // Main type
      colorToken = activeState === 'Default' ? 'brand' : activeState === 'Hover' ? 'hover' : activeState === 'Pressed' ? 'pressed' : 'brand';
    }

    if (style === 'Primary') {
      return getSemanticColor('background', colorToken, activeThemeMode);
    } else if (style === 'Secondary') {
      // Secondary style uses transparent background with border
      return 'transparent';
    } else {
      // Tertiary style uses transparent background
      return 'transparent';
    }
  };

  // Get text color based on style, type, and state
  const getTextColor = (stateOverride?: ButtonState): string => {
    const activeState = stateOverride || currentState;
    
    if (isDisabled) {
      return getSemanticColor('text', 'disabled', activeThemeMode);
    }

    if (style === 'Primary') {
      // Primary buttons always have white text
      return '#ffffff';
    } else {
      // Secondary and Tertiary use semantic text colors
      if (type === 'Positive') {
        return getSemanticColor('text', activeState === 'Default' ? 'positive' : activeState === 'Hover' ? 'positiveHover' : activeState === 'Pressed' ? 'positivePressed' : 'positive', activeThemeMode);
      } else if (type === 'Warning') {
        return getSemanticColor('text', activeState === 'Default' ? 'warning' : activeState === 'Hover' ? 'warningHover' : activeState === 'Pressed' ? 'warningPressed' : 'warning', activeThemeMode);
      } else if (type === 'Negative') {
        return getSemanticColor('text', activeState === 'Default' ? 'negative' : activeState === 'Hover' ? 'negativeHover' : activeState === 'Pressed' ? 'negativePressed' : 'negative', activeThemeMode);
      } else {
        // Main type
        return getSemanticColor('text', 'primary', activeThemeMode);
      }
    }
  };

  // Get border color for Secondary style
  const getBorderColor = (stateOverride?: ButtonState): string => {
    const activeState = stateOverride || currentState;
    
    if (isDisabled) {
      return getSemanticColor('background', 'disabled', activeThemeMode);
    }

    if (style === 'Secondary') {
      if (type === 'Positive') {
        return getSemanticColor('background', activeState === 'Default' ? 'positive' : activeState === 'Hover' ? 'positiveHover' : activeState === 'Pressed' ? 'positivePressed' : 'positive', activeThemeMode);
      } else if (type === 'Warning') {
        return getSemanticColor('background', activeState === 'Default' ? 'warning' : activeState === 'Hover' ? 'warningHover' : activeState === 'Pressed' ? 'warningPressed' : 'warning', activeThemeMode);
      } else if (type === 'Negative') {
        return getSemanticColor('background', activeState === 'Default' ? 'negative' : activeState === 'Hover' ? 'negativeHover' : activeState === 'Pressed' ? 'negativePressed' : 'negative', activeThemeMode);
      } else {
        return getSemanticColor('background', activeState === 'Default' ? 'brand' : activeState === 'Hover' ? 'hover' : activeState === 'Pressed' ? 'pressed' : 'brand', activeThemeMode);
      }
    }
    return 'transparent';
  };

  // Get size-specific styles
  const getSizeStyles = (): SizeStyles => {
    const sizeConfig: Record<ButtonSize, SizeStyles> = {
      S: {
        height: 'h-6', // 24px
        paddingX: 'px-s', // 8px horizontal padding from tailwind config
        iconSize: 'w-4 h-4', // 16px
        gap: 'gap-s', // 8px gap from tailwind config
        fontSize: 'text-s',
        lineHeight: 'leading-4',
        borderRadius: 'rounded-s',
      },
      M: {
        height: 'h-10', // 40px
        paddingX: 'px-m', // 16px horizontal padding from tailwind config
        iconSize: 'w-6 h-6', // 24px
        gap: 'gap-m', // 16px gap from tailwind config
        fontSize: 'text-l',
        lineHeight: 'leading-6',
        borderRadius: 'rounded-s',
      },
      L: {
        height: 'h-[60px]', // 60px
        paddingX: 'px-l', // 24px horizontal padding from tailwind config
        iconSize: 'w-7 h-7', // 28px
        gap: 'gap-l', // 24px gap from tailwind config
        fontSize: 'text-2xl',
        lineHeight: 'leading-7',
        borderRadius: 'rounded-s',
      },
    };
    return sizeConfig[size];
  };

  const sizeStyles = getSizeStyles();
  const backgroundColor = getBackgroundColor();
  const textColor = getTextColor();
  const borderColor = getBorderColor();

  // Get typography style
  const typographyStyle = getTypographyStyle('desktopLarge', 'heading', size === 'S' ? 's' : size === 'M' ? 'l' : '2xl', 'semiBold');

  // Handle interaction states
  const handleMouseEnter = () => {
    if (!isDisabled && !isControlled) {
      setInternalState('Hover');
    }
  };

  const handleMouseLeave = () => {
    if (!isDisabled && !isControlled) {
      setInternalState('Default');
    }
  };

  const handleMouseDown = () => {
    if (!isDisabled && !isControlled) {
      setInternalState('Pressed');
    }
  };

  const handleMouseUp = () => {
    if (!isDisabled && !isControlled) {
      setInternalState('Hover');
    }
  };

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={`
        inline-flex
        items-center
        justify-center
        ${sizeStyles.height}
        ${sizeStyles.paddingX}
        ${sizeStyles.gap}
        ${sizeStyles.borderRadius}
        font-inter
        font-semibold
        ${sizeStyles.fontSize}
        ${sizeStyles.lineHeight}
        tracking-none
        whitespace-nowrap
        transition-colors
        duration-150
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        ${isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
        ${style === 'Secondary' ? 'border' : 'border-0'}
        ${className}
      `}
      style={{
        backgroundColor,
        color: textColor,
        borderColor: style === 'Secondary' ? borderColor : undefined,
        fontFamily: typographyStyle.family,
        fontWeight: typographyStyle.weight,
        letterSpacing: `${typographyStyle.letterSpacing}px`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...props}
    >
      {leadingIcon && (
        <span className={`${sizeStyles.iconSize} flex-shrink-0 flex items-center justify-center`}>
          {leadingIcon}
        </span>
      )}
      <span>{label}</span>
      {trailingIcon && (
        <span className={`${sizeStyles.iconSize} flex-shrink-0 flex items-center justify-center`}>
          {trailingIcon}
        </span>
      )}
    </button>
  );
};

export default Button;

