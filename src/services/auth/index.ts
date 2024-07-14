import { DOMAIN } from '@/constants/domains';
import { fetcher } from '@/lib/fetcher';

import { AuthRequest, SignInResponse } from './type';

/** 로그인 */
export const SignIn = async (params: AuthRequest) => {
  const data = await fetcher.post<SignInResponse>(`${DOMAIN.AUTH}login`, params);
  return data;
};
