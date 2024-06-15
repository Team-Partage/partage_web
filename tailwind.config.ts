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
    screens: {
      mobile: '375px',
      tablet: '744px',
      desktop: '1200px',
      largeDesktop: '1400px',
    },
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
        primary: {
          default: '#25E09A',
          hover: '#20C087',
          active: '#1A9C71',
        },
        main: {
          skyblue: '#00FFFF',
        },
        sub: {
          violet: '#9C78FF',
          pink: '#FD68B3',
          lightGreen: '#57F3A8',
          green: '#32BF99',
          yellow: '#FFE100',
          orange: '#FFA030',
          peach: '#FF7D84',
          red: '#F94B60',
          blue: '#43B0FF',
        },
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
        neutral: {
          100: '#FFFFFF',
          200: '#9FA6B2',
          300: '#6E6E82',
          400: '#353542',
          500: '#23282E',
          600: '#131418',
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
