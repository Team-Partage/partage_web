import config from '../../tailwind.config';

const colorCode = { ...config.theme.extend.colors.main, ...config.theme.extend.colors.sub };

type ColorName = keyof typeof colorCode;

export const hexToColorName = (hex: string) => {
  const colorName = Object.keys(colorCode).find((key) => colorCode[key as ColorName] === hex);
  return colorName as ColorName;
};
