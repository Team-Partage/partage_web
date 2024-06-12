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
      fontWeight: '400',
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
