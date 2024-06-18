import { fetcher } from '@/lib/fetcher';
import { cookies } from 'next/headers';

import { AuthRequest, SignInResponse } from './type';

/** 로그인 */
export const SignIn = async (params: AuthRequest) => {
  const data = await fetcher.post<SignInResponse>('/api/v1/auth/login', params);
  return data;
};

/** 접근 권한 필요 api 예시 */
export const Test = async () => {
  const cookieStore = cookies();
  const cookie = cookieStore.get('access_token');
  const data = await fetcher.get('/api/v1/user/me', {
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });
  return data;
};
