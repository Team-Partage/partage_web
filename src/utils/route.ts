export const PAGE_ROUTE = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  SEARCH: (searchQuery: string) => `/search?query=${searchQuery}`,
  CHANNEL: (channelId: string) => `/channel/${channelId}`,
  MYPAGE: '/mypage',
};
