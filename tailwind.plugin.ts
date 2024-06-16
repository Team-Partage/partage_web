import plugin from 'tailwindcss/plugin';

export const fonts = plugin(({ addUtilities }) => {
  addUtilities({
    '.max-bold': {
      fontSize: '24px',
      lineHeight: '36px',
      fontWeight: '700',
    },
    '.max-regular': {
      fontSize: '24px',
      lineHeight: '36px',
      fontWeight: '400',
    },
    '.big-bold': {
      fontSize: '22px',
      lineHeight: '33px',
      fontWeight: '700',
    },
    '.big-regular': {
      fontSize: '22px',
      lineHeight: '33px',
      fontWeight: '400',
    },
    '.large-bold': {
      fontSize: '20px',
      lineHeight: '30px',
      fontWeight: '700',
    },
    '.large-regular': {
      fontSize: '20px',
      lineHeight: '30px',
      fontWeight: '400',
    },
    '.medium-bold': {
      fontSize: '18px',
      lineHeight: '27px',
      fontWeight: '700',
    },
    '.medium-regular': {
      fontSize: '18px',
      lineHeight: '27px',
      fontWeight: '400',
    },
    '.base-bold': {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: '700',
    },
    '.base-medium': {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: '500',
    },
    '.base-regular': {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: '400',
    },
    '.small-bold': {
      fontSize: '14px',
      lineHeight: '21px',
      fontWeight: '700',
    },
    '.small-medium': {
      fontSize: '14px',
      lineHeight: '21px',
      fontWeight: '500',
    },
    '.small-regular': {
      fontSize: '14px',
      lineHeight: '21px',
      fontWeight: '400',
    },
    '.tiny-regular': {
      fontSize: '13px',
      lineHeight: '19.5px',
      fontWeight: '400',
    },
    '.micro-medium': {
      fontSize: '12px',
      lineHeight: '18px',
      fontWeight: '500',
    },
    '.micro-regular': {
      fontSize: '12px',
      lineHeight: '18px',
      fontWeight: '400',
    },
  });
});
