import { fetcher } from '@/lib/fetcher';
import { getSession } from 'next-auth/react';

import {
  CreateChannelReq,
  CreateChannelResponse,
  GetChannelDetailResponse,
  GetChannelSearchResponse,
  GetChannelUserResponse,
} from './type';
import revalidate from '../revalidate';

/** 채널 생성 */
export const createChannel = async (params: CreateChannelReq) => {
  const session = await getSession();
  const data = await fetcher.post<CreateChannelResponse>('/api/v1/channel', params, {
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
    '/api/v1/channel/search',
    {
      cursor,
      perPage,
      keyword,
    },
    { cache: 'no-store', next: { tags: ['channel'] } },
  );

  return data;
};

/** 채널 상세 정보 조회 */
export const getChannelDetail = async (channelId: string) => {
  const data = await fetcher.get<GetChannelDetailResponse>(
    `api/v1/channel/${channelId}`,
    {},
    { cache: 'no-store' },
  );
  return data;
};

/** 채널 접속 유저 검색 */
export const getChannelUser = async (channelId: string, nickname: string) => {
  const session = await getSession();
  const data = await fetcher.get<GetChannelUserResponse>(
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
