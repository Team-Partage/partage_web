import { fetcher } from '@/lib/fetcher';

import { SignUpRequest } from './type';

// 일반 회원가입
export const SignUp = async (params: SignUpRequest) => {
  const data = await fetcher.post('/api/v1/user/join', params);
  return data;
};
