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
      largeTablet: '1088px',
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
        background: '#131418',
        main: {
          skyblue: '#00FFFF',
          hover: '#8FFFFF',
          click: '#00E8F7',
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
      borderWidth: { '1': '1px' },
    },
  },
  plugins: [fonts],
} satisfies Config;

export default config;
