/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Design System Colors
        primary: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#6385FF', // Primary accent
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
        },
        secondary: {
          400: '#36D6E8', // Secondary accent
          500: '#22D3EE',
          600: '#06B6D4',
        },
        dark: {
          50: '#F4F7FF',
          100: '#E8ECF8',
          200: '#D1D9F0',
          300: '#A4B1C8',
          400: '#7E8BA5',
          500: '#5A6785',
          600: '#3D4A66',
          700: '#131F35', // Elevated surface
          800: '#0E1629', // Secondary background
          900: '#080D1B', // Main background
        },
        success: '#36C995',
        warning: '#F2B95F',
        error: '#FF7185',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'elevation-1': '0 2px 8px rgba(0, 0, 0, 0.12)',
        'elevation-2': '0 4px 16px rgba(0, 0, 0, 0.16)',
        'elevation-3': '0 8px 24px rgba(0, 0, 0, 0.20)',
      },
    },
  },
  plugins: [],
}
