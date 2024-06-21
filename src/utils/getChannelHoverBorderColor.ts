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
