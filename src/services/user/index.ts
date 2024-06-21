import { fetcher } from '@/lib/fetcher';

import {
  CheckEmailNumberRequest,
  EditProfileParams,
  EmailRequest,
  NicknameRequest,
  SignUpRequest,
} from './type';

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

//** 닉네임 중복 확인 */
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

//** 이메일 중복 확인 */
export const CheckEmail = async (params: EmailRequest) => {
  const data = await fetcher.post(`${baseUrl}/check-email`, params);
  return data;
};

//** 이메일 인증 메일 전송 */
export const SendEmail = async (params: EmailRequest) => {
  const data = await fetcher.post(`${baseUrl}/auth-email`, params);
  return data;
};

//** 이메일 인증 번호 확인 */
export const CheckEmailNumber = async (params: CheckEmailNumberRequest) => {
  const data = await fetcher.post(`${baseUrl}/auth-number`, params);
  return data;
};

//** 비밀번호 찾기 */
export const FindPassword = async (params: EmailRequest) => {
  const data = await fetcher.post(`${baseUrl}/password`, params);
  return data;
};
