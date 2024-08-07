'use server';

import { DOMAIN } from '@/constants/domains';
import { fetcher } from '@/lib/fetcher';

import { auth } from '@/auth';

import {
  ChangePasswordRequest,
  CheckEmailNumberRequest,
  EmailRequest,
  GetUserResponse,
  SignUpRequest,
} from './type';
import revalidate from '../revalidate';

/** 회원 정보 조회 */
export const UserInfo = async () => {
  const session = await auth();
  const accesstoken = session?.user.accessToken;
  const data = await fetcher.get<GetUserResponse>(
    `${DOMAIN.USER}/me`,
    {},
    {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accesstoken}`,
      },
    },
  );
  const { user } = data;
  return user;
};

//** 일반 회원가입 */
export const SignUp = async (params: SignUpRequest) => {
  const data = await fetcher.post(`${DOMAIN.USER}/join`, params);
  return data;
};

//** 회원 탈퇴 */
export const Withdrawal = async () => {
  const session = await auth();
  const accesstoken = session?.user.accessToken;
  const data = await fetcher.delete(`${DOMAIN.USER}/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accesstoken}`,
    },
  });
  await revalidate('channel');
  return data;
};

//** 비밀번호 수정 */
export const ChangePassword = async (params: ChangePasswordRequest) => {
  const session = await auth();
  const accesstoken = session?.user.accessToken;
  const data = await fetcher.patch(`${DOMAIN.USER}/me/password`, params, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accesstoken}`,
    },
  });
  return data;
};

//** 이메일 중복 확인 */
export const CheckEmail = async (params: EmailRequest) => {
  const data = await fetcher.get(`${DOMAIN.USER}/check-email`, params);
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
