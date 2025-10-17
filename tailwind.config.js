/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      colors: {
        bg: 'var(--color-bg)',
        'bg-secondary': 'var(--color-bg-secondary)',
        accent: 'var(--color-accent)',
        'accent-secondary': 'var(--color-accent-secondary)',
        'accent-tertiary': 'var(--color-accent-tertiary)',
        'accent-light': 'var(--color-accent-light)',
        text: 'var(--color-text)',
        'dark-1': 'var(--color-dark-1)',
        'dark-2': 'var(--color-dark-2)',
        'dark-3': 'var(--color-dark-3)',
        'gradient-start': 'var(--gradient-start)',
        'gradient-end': 'var(--gradient-end)',
        hacktober: {
          purple: '#6B21A8',
          blue: '#1E3A8A',
          cyan: '#00FFD5',
          pink: '#FF6B9D',
          yellow: '#FFB800',
        },
      },
      backgroundImage: {
        'gradient-hacktober':
          'linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-end) 100%)',
        'gradient-accent':
          'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-secondary) 50%, var(--color-accent-tertiary) 100%)',
      },
      boxShadow: {
        glow: '0 0 20px rgba(0, 255, 213, 0.3)',
        'glow-lg': '0 0 30px rgba(0, 255, 213, 0.5)',
        'glow-pink': '0 0 20px rgba(255, 107, 157, 0.3)',
      },
      screens: {
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
    },
  },
  plugins: [],
};
