export const PAGE_ROUTE = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FINDPASSWORD: '/auth/password-recovery',
  SEARCH: (searchQuery: string) => `/search?query=${searchQuery}`,
  CHANNEL: (channelId: string) => `/channel/${channelId}`,
  MYPAGE: '/mypage',
};
