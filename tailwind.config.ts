import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Anchored to the DEF Tanzania logo: navy #2c2e8f, orange #fda731
        brand: {
          50: '#eff0fa',
          100: '#dcdcf4',
          200: '#b9bae9',
          300: '#8688da',
          400: '#4649d2',
          500: '#2b2eb0',
          600: '#2c2e8f',
          700: '#1f217f',
          800: '#191a67',
          900: '#13144e',
          950: '#0c0d31',
        },
        sun: {
          50: '#fff6eb',
          100: '#ffe9cc',
          200: '#fed49a',
          300: '#febe67',
          400: '#fdb149',
          500: '#fda731',
          600: '#fd9302',
          700: '#cf7902',
          800: '#a76102',
          900: '#884f01',
          950: '#5b3501',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'gradient-shift': 'gradient-shift 12s ease infinite',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
        marquee: 'marquee 26s linear infinite',
        'marquee-reverse': 'marquee-reverse 32s linear infinite',
        'marquee-fast': 'marquee 40s linear infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
