export const PAGE_ROUTE = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/signup',
  SEARCH: (searchQuery: string) => `/search?query=${searchQuery}`,
  CHANNEL: (channelId: string) => `/channel/${channelId}`,
  MYPAGE: '/mypage',
};
