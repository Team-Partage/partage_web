import { DOMAIN } from '@/constants/domains';
import { fetcher } from '@/lib/fetcher';

import {
  CheckEmailNumberRequest,
  EditProfileParams,
  EmailRequest,
  GetUserResponse,
  NicknameRequest,
  SignUpRequest,
} from './type';
// import { cookies } from 'next/headers';

/** 회원 정보 조회 */
// export const UserInfo = async () => {
//   const cookieStore = cookies();
//   const cookie = cookieStore.get('access_token');
//   const data = await fetcher.get<GetUserResponse>('/api/v1/user/me', {
//     headers: {
//       Authorization: `Bearer ${cookie}`,
//     },
//   });
//   const { user } = data;
//   return user;
// };

//** 일반 회원가입 */
export const SignUp = async (params: SignUpRequest) => {
  const data = await fetcher.post(`${DOMAIN.USER}/join`, params);
  return data;
};

//** 회원 탈퇴 */
export const Withdrawal = async () => {
  const data = await fetcher.delete(`${DOMAIN.USER}/me`);
  return data;
};

//** 닉네임 중복 확인 */
export const CheckNickname = async (params: NicknameRequest) => {
  const data = await fetcher.post(`${DOMAIN.USER}/check-nickname`, params);
  return data;
};

//** 프로필 수정 (닉네임, 색상, 비밀번호) */
export const EditProfile = async <T extends EditProfileParams>(endpoint: string, params: T) => {
  const data = await fetcher.patch(`${DOMAIN.USER}/me/${endpoint}`, params);
  return data;
};

//** 프로필 이미지 수정 */
export const EditProfileImage = async (params: FormData) => {
  const data = await fetcher.post(`${DOMAIN.USER}/me/profile-image`, params);
  return data;
};

//** 이메일 중복 확인 */
export const CheckEmail = async (params: EmailRequest) => {
  const data = await fetcher.post(`${DOMAIN.USER}/check-email`, params);
  return data;
};

//** 이메일 인증 메일 전송 */
export const SendEmail = async (params: EmailRequest) => {
  const data = await fetcher.post(`${DOMAIN.USER}/auth-email`, params);
  return data;
};

//** 이메일 인증 번호 확인 */
export const CheckEmailNumber = async (params: CheckEmailNumberRequest) => {
  const data = await fetcher.post(`${DOMAIN.USER}/auth-number`, params);
  return data;
};

//** 비밀번호 찾기 */
export const FindPassword = async (params: EmailRequest) => {
  const data = await fetcher.post(`${DOMAIN.USER}/password`, params);
  return data;
};
