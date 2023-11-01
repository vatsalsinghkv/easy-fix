import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  globalCss: {
    body: {
      bg: 'bg',
      color: 'text',
      fontSize: 'sm',
      minHeight: '100vh',
    },
    '*:focus-visible': {
      outlineColor: 'teal.500',
    },
  },
  conditions: {
    light: '[data-theme-mode=light] &',
    dark: '[data-theme-mode=dark] &',
  },
  jsxFramework: 'react',
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    './src/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './stories/**/*.{js,jsx,ts,tsx}',
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      breakpoints: {
        sm: '200px',
        // => @media (min-width: 200px) { ... }
        md: '768px',
        // => @media (min-width: 768px) { ... }
        lg: '1024px',
        // => @media (min-width: 1024px) { ... }
        xl: '1280px',
        // => @media (min-width: 1280px) { ... }
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
      semanticTokens: {
        colors: {
          bg: {
            value: { base: '#fcfaf8', _dark: '{colors.slate.900}' },
          },
          'bg-secondary': {
            value: {
              base: 'rgba(228, 228, 231, 0.6)',
              _dark: 'rgba(30, 41, 59, 0.6)',
            },
          },
          accent: {
            value: { base: '{colors.teal.500}', _dark: '#00ffd5' },
          },
          'accent-light': {
            value: {
              base: 'rgba(45, 212, 191, 0.2)',
              _dark: 'rgba(0, 255, 213, 0.2)',
            },
          },
          text: {
            value: { base: '{colors.slate.500}', _dark: '{colors.slate.300}' },
          },
          'dark-1': {
            value: { base: '{colors.slate.500}', _dark: '{colors.slate.200}' },
          },
          'dark-2': {
            value: { base: '{colors.slate.400}', _dark: '{colors.slate.400}' },
          },
          'dark-3': {
            value: { base: '#a2a2a2', _dark: '{colors.slate.700}' },
          },
        },
      },
      tokens: {
        fonts: {
          sans: { value: 'Inter, sans-serif' },
          mono: { value: 'Roboto Mono, monospace' },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',
});
