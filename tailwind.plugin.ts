import plugin from 'tailwindcss/plugin';

export const fonts = plugin(({ addUtilities }) => {
  addUtilities({
    '.display-1': { fontSize: '54px', lineHeight: '135%', fontWeight: '700' },
    '.heading-1': {
      fontSize: '32px',
      fontWeight: '700',
      lineHeight: '140%',
      letterSpacing: '0',
    },
    '.heading-2': {
      fontSize: '24px',
      fontWeight: '700',
      lineHeight: '145%',
      letterSpacing: '-1%',
    },
    '.sub-heading-1': {
      fontSize: '24px',
      fontWeight: '600',
      lineHeight: '130%',
      letterSpacing: '-1%',
    },
    '.sub-heading-2': {
      fontSize: '20px',
      fontWeight: '700',
      lineHeight: '130%',
    },
    '.sub-heading-3': {
      fontSize: '18px',
      fontWeight: '600',
      lineHeight: '140%',
      letterSpacing: '-1%',
    },
    '.body-large-1': {
      fontSize: '16px',
      fontWeight: '600',
      lineHeight: '150%',
      letterSpacing: '-1%',
    },
    '.body-large-2': {
      fontSize: '16px',
      fontWeight: '500',
      lineHeight: '160%',
      letterSpacing: '-1%',
    },
    '.body-large-3': {
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '150%',
      letterSpacing: '-1%',
    },
    '.body-normal-1': {
      fontSize: '14px',
      fontWeight: '600',
      lineHeight: '150%',
      letterSpacing: '-1%',
    },
    '.body-normal-2': {
      fontSize: '14px',
      fontWeight: '500',
      lineHeight: '150%',
      letterSpacing: '-1%',
    },
    '.body-normal-3': {
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '150%',
      letterSpacing: '-1%',
    },
    '.label-1': {
      fontSize: '13px',
      fontWeight: '500',
      lineHeight: '145%',
      letterSpacing: '-1%',
    },
  });
});
