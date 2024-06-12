import { fetcher } from '@/lib/fetcher';

import { AuthRequest, SignInResponse } from './type';

// 로그인
export const SignIn = async (params: AuthRequest) => {
  const data = await fetcher.post<SignInResponse>('/api/v1/auth/login', params);
  return data;
};
