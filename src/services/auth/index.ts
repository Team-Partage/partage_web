import { DOMAIN } from '@/constants/domains';
import { fetcher } from '@/lib/fetcher';
import { cookies } from 'next/headers';

import { AuthRequest, SignInResponse } from './type';

/** 로그인 */
export const SignIn = async (params: AuthRequest) => {
  const data = await fetcher.post<SignInResponse>(`${DOMAIN.AUTH}login`, params);
  return data;
};

/** 접근 권한 필요 api 예시 */
export const Test = async () => {
  const cookieStore = cookies();
  const cookie = cookieStore.get('access_token');
  const data = await fetcher.get(`${DOMAIN.USER}me`, {
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });
  return data;
};
