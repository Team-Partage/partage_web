import { fetcher } from '@/lib/fetcher';

import { EditProfileParams, NicknameRequest, SignUpRequest } from './type';

const baseUrl = '/api/v1/user';

//** 일반 회원가입 */ 
export const SignUp = async (params: SignUpRequest) => {
  const data = await fetcher.post(`${baseUrl}/join`, params);
  return data;
};

//** 회원 탈퇴 */ 
export const Withdrawal = async () => {
  const data = await fetcher.delete(`${baseUrl}/me`);
  return data;
};

//** 닉네임 수정 */ 
export const CheckNickname = async (params: NicknameRequest) => {
  const data = await fetcher.post(`${baseUrl}/check-nickname`, params);
  return data;
};

//** 프로필 수정 (닉네임, 색상, 비밀번호) */ 
export const EditProfile = async <T extends EditProfileParams>(endpoint: string, params: T) => {
  const data = await fetcher.patch(`${baseUrl}/me/${endpoint}`, params);
  return data;
};

//** 프로필 이미지 수정 */ 
export const EditProfileImage = async (params: FormData) => {
  const data = await fetcher.post(`${baseUrl}/me/profile-image`, params);
  return data;
};