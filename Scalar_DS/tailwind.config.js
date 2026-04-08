/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./ui_components/**/*.{js,jsx,ts,tsx}",
    "./playground/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Map design tokens to Tailwind colors
        // These will be resolved at build time or via CSS variables
        brand: {
          100: '#CDE5FA',
          200: '#9ACBF6',
          300: '#68B1F1',
          400: '#3597ED',
          500: '#037DE8',
          600: '#0268C1',
          700: '#02539A',
          800: '#013E73',
          900: '#01294C',
        },
        neutral: {
          white: '#ffffff',
          100: '#E5E5E5',
          200: '#CCCCCC',
          300: '#B3B3B3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4C4C4C',
          800: '#333333',
          900: '#1A1A1A',
          black: '#000000',
        },
        positive: {
          400: '#00B04F',
          600: '#007E17',
          700: '#006012',
          800: '#00420F',
        },
        warning: {
          400: '#FFBB33',
          600: '#CC8800',
          700: '#996600',
          800: '#664400',
        },
        negative: {
          400: '#FF2F3D',
          600: '#CB0000',
          700: '#9C0000',
          800: '#6C0003',
        },
      },
      spacing: {
        'xs': '4px',
        's': '8px',
        'm': '16px',
        'l': '24px',
      },
      borderRadius: {
        's': '8px',
        'm': '12px',
      },
      fontSize: {
        'xs': ['10px', { lineHeight: '14px' }],
        's': ['12px', { lineHeight: '16px' }],
        'm': ['14px', { lineHeight: '20px' }],
        'l': ['16px', { lineHeight: '24px' }],
        '2xl': ['20px', { lineHeight: '28px' }],
      },
      fontFamily: {
        inter: ["Inter", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
    },
  },
  plugins: [],
}
