/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-primary)',
        'background-secondary': 'var(--bg-secondary)',
        'background-tertiary': 'var(--bg-tertiary)',
        surface: 'var(--surface)',
        'surface-border': 'var(--surface-border)',
        foreground: 'var(--text-primary)',
        'foreground-muted': 'var(--text-secondary)',
        accent: {
          DEFAULT: 'var(--accent-primary)',
          glow: 'var(--accent-glow)',
          light: 'var(--accent-light)',
          dark: 'var(--accent-dark)',
          subtle: 'var(--accent-subtle)',
        },
        // Dedicated Domain Color tokens
        aiml: {
          primary: '#06b6d4',
          secondary: '#8b5cf6',
          accent: '#10b981',
          glow: 'rgba(6, 182, 212, 0.25)',
          bg: '#040d1a',
        },
        de: {
          primary: '#f59e0b',
          secondary: '#3b82f6',
          accent: '#0ea5e9',
          glow: 'rgba(245, 158, 11, 0.25)',
          bg: '#0f1016',
        },
        da: {
          primary: '#10b981',
          secondary: '#14b8a6',
          accent: '#06b6d4',
          glow: 'rgba(16, 185, 129, 0.25)',
          bg: '#061311',
        },
        se: {
          primary: '#8b5cf6',
          secondary: '#ec4899',
          accent: '#3b82f6',
          glow: 'rgba(139, 92, 246, 0.25)',
          bg: '#0a0a14',
        }
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
