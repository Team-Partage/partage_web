import { DOMAIN } from '@/constants/domains';
import { fetcher } from '@/lib/fetcher';
import { getSession } from 'next-auth/react';

import { auth } from '@/auth';

import {
  ChannelPermission,
  CreateChannelReq,
  CreateChannelResponse,
  GetChannelDetailResponse,
  GetChannelSearchResponse,
  GetChannelUsersResponse,
  GetSearchChannelUserResponse,
  RoleIdType,
} from './type';
import revalidate from '../revalidate';

/** 채널 생성 */
export const createChannel = async (params: CreateChannelReq) => {
  const session = await getSession();
  const data = await fetcher.post<CreateChannelResponse>(`${DOMAIN.CHANNEL}`, params, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });
  await revalidate('channel');

  return data;
};

/** 채널 검색 - 채널명, 해시태그 */
export const getSearchChannelList = async (params: {
  cursor?: number;
  perPage?: number;
  keyword?: string;
}) => {
  const { cursor = 1, perPage = 12, keyword } = params;

  const data = await fetcher.get<GetChannelSearchResponse>(
    `${DOMAIN.CHANNEL}/search`,
    {
      cursor,
      perPage,
      keyword,
    },
    { next: { tags: ['channel'] } },
  );

  return data;
};

/** 채널 상세 정보 조회 */
export const getChannelDetail = async (channelId: string) => {
  let session = null;
  if (typeof window === 'undefined') {
    session = await auth();
  } else session = await getSession();

  const data = await fetcher.get<GetChannelDetailResponse>(
    `${DOMAIN.CHANNEL}/${channelId}`,
    {},
    {
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    },
  );
  return data;
};

/** 채널 접속 유저 검색 */
export const getSearchChannelUser = async (channelId: string, nickname: string) => {
  const session = await getSession();
  const data = await fetcher.get<GetSearchChannelUserResponse>(
    `api/v1/channel/${channelId}/search-user`,
    { keyword: nickname },
    {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    },
  );

  return data;
};

/** 채널 접속 유저 목록 조회 */
export const getChannelUsers = async (channelId: string, cursor: number = 1) => {
  const session = await getSession();
  const data = await fetcher.get<GetChannelUsersResponse>(
    `api/v1/channel/${channelId}/user`,
    {
      cursor,
      perPage: 6,
    },
    {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
      next: { tags: ['channelUsers'] },
    },
  );

  return data;
};

/** 채널 수정 */
export const editChannel = async (channelId: string, params: CreateChannelReq) => {
  const session = await getSession();
  const data = await fetcher.put(`${DOMAIN.CHANNEL}/${channelId}`, params, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });
  await revalidate('channel');
  return data;
};

/** 채널 삭제 */
export const deleteChannel = async (channelId: string) => {
  const session = await getSession();
  const data = await fetcher.delete(`${DOMAIN.CHANNEL}/${channelId}`, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });
  await revalidate('channel');
  return data;
};

/** 채널 사용자 권한 수정 */
export const patchChannelRole = async (
  channelId: string,
  params: { role_id: RoleIdType; user_id: string },
) => {
  const session = await getSession();
  const data = await fetcher.patch(`${DOMAIN.CHANNEL}/${channelId}/role`, params, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });
  await revalidate('channelUsers');
  return data;
};

/** 채널 Permission 권한 수정 */
export const editChannelPermission = async (channelId: string, params: ChannelPermission) => {
  const session = await getSession();
  const data = await fetcher.put(
    `${DOMAIN.CHANNEL}/${channelId}/permission`,
    { channel_permissions: params },
    {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    },
  );
  await revalidate('channel');
  return data;
};
