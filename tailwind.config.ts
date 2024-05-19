import { fonts } from './tailwind.plugin';

import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        background: '#191919',
        foreground: {
          high: 'hsl(0, 0%, 87%)',
          medium: 'hsl(0, 0%, 60%)',
          muted: 'hsl(0, 0%, 38%)',
        },
        primary: '#25E09A',
        gray: {
          100: '#B4B4B4',
          200: '#6E6E6E',
          300: '#606060',
          400: '#484848',
          500: '#484848',
          600: '#313131',
          700: '#2A2A2A',
          800: '#222222',
          900: '#191919',
        },
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
    },
  },
  plugins: [fonts],
} satisfies Config;

export default config;
