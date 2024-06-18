import config from '../../tailwind.config';

type Colors = {
  [key: string]: string;
  skyblue: string;
  lightGreen: string;
  green: string;
  blue: string;
  violet: string;
  pink: string;
  yellow: string;
  orange: string;
  peach: string;
};

type MainColor = Partial<Colors>;

type SubColors = Omit<Colors, 'skyblue'>;

export const customColors: { main: MainColor; sub: SubColors } = config.theme.extend.colors;

export const colors: Colors = {
  skyblue: 'bg-main-skyblue',
  lightGreen: 'bg-sub-lightGreen',
  green: 'bg-sub-green',
  blue: 'bg-sub-blue',
  violet: 'bg-sub-violet',
  pink: 'bg-sub-pink',
  yellow: 'bg-sub-yellow',
  orange: 'bg-sub-orange',
  peach: 'bg-sub-peach',
};
