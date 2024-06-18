export const getChannelFontColor = (color: string) => {
  switch (color) {
    case '#00FFFF':
      return 'text-main-skyblue';
    case '#57F3A8':
      return 'text-sub-lightGreen';
    case '#FFE100':
      return 'text-sub-yellow';
    case '#FF7D84':
      return 'text-sub-peach';
    case '#9C78FF':
      return 'text-sub-violet';
    default:
      return 'text-main-skyblue';
  }
};

export const getChannelBgColor = (color: string) => {
  switch (color) {
    case '#00FFFF':
      return 'bg-main-skyblue';
    case '#57F3A8':
      return 'bg-sub-lightGreen';
    case '#FFE100':
      return 'bg-sub-yellow';
    case '#FF7D84':
      return 'bg-sub-peach';
    case '#9C78FF':
      return 'bg-sub-violet';
    default:
      return 'bg-main-skyblue';
  }
};

export const getChannelHoverBorderColor = (color: string) => {
  switch (color) {
    case '#00FFFF':
      return 'hover:border-main-skyblue';
    case '#57F3A8':
      return 'hover:border-sub-lightGreen';
    case '#FFE100':
      return 'hover:border-sub-yellow';
    case '#FF7D84':
      return 'hover:border-sub-peach';
    case '#9C78FF':
      return 'hover:border-sub-violet';
    default:
      return 'hover:border-main-skyblue';
  }
};
