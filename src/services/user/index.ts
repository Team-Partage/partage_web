import { fetcher } from '@/lib/fetcher';

import { EditProfileParams, NicknameRequest, SignUpRequest } from './type';

const baseUrl = '/api/v1/user';

// 일반 회원가입
export const SignUp = async (params: SignUpRequest) => {
  const data = await fetcher.post(`${baseUrl}/join`, params);
  return data;
};

export const Withdrawal = async () => {
  const data = await fetcher.delete(`${baseUrl}/me`);
  return data;
};

export const CheckNickname = async (params: NicknameRequest) => {
  const data = await fetcher.post(`${baseUrl}/check-nickname`, params);
  return data;
};

export const EditProfile = async <T extends EditProfileParams>(endpoint: string, params: T) => {
  const data = await fetcher.patch(`${baseUrl}/me/${endpoint}`, params);
  return data;
};
