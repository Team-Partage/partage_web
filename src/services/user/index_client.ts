import { DOMAIN } from '@/constants/domains';
import { CustomError } from '@/lib/customError';
import { fetcher } from '@/lib/fetcher';
import { getSession } from 'next-auth/react';

import { EditProfileParams, GetUserResponse, NicknameRequest } from './type';
import revalidate from '../revalidate';

//** 닉네임 중복 확인 */
export const CheckNickname = async (params: NicknameRequest) => {
  const data = await fetcher.get(`${DOMAIN.USER}/check-nickname`, params);
  return data;
};

//** 프로필 수정 (닉네임, 프로필 색상) */
export const EditProfile = async <T extends EditProfileParams>(params: T) => {
  const session = await getSession();
  const accesstoken = session?.user.accessToken;
  const data = await fetcher.patch(`${DOMAIN.USER}/me/profile`, params, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accesstoken}`,
    },
  });
  await revalidate('channel');
  return data;
};

//** 프로필 이미지 수정 */
export const EditProfileImage = async (params: FormData) => {
  const session = await getSession();
  const accesstoken = session?.user.accessToken;

  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}${DOMAIN.USER}/me/profile-image`,
      {
        method: 'POST',
        body: params,
        headers: { Authorization: `Bearer ${accesstoken}` },
      },
    );

    if (!data.ok) {
      const error = new CustomError(`${data.status} ${data.statusText}`);
      error.stack = `${error.stack}`;
      error.response = { code: data.status, status: data.statusText, message: data.statusText };
      throw error;
    }

    await revalidate('channel');
    return data;
  } catch (error) {
    return Promise.reject(error as CustomError);
  }
};

//** 유저정보 */
export const UserInfo = async () => {
  const session = await getSession();
  const accesstoken = session?.user.accessToken;
  const data = await fetcher.get<GetUserResponse>(
    `${DOMAIN.USER}/me`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accesstoken}`,
      },
    },
  );
  return data;
};
