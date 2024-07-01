'use server';

import { fetcher } from '@/lib/fetcher';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

import {
  CreateChannelReq,
  CreateChannelResponse,
  GetChannelDetailResponse,
  GetChannelListResponse,
} from './type';

/** 채널 생성 */
export const createChannel = async (params: CreateChannelReq) => {
  const accessToken = cookies().get('access_token')?.value;
  const data = await fetcher.post<CreateChannelResponse>('/api/v1/channel', params, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  await revalidateTag('channel');

  return data;
};

/** 채널 검색 */
export const getChannelList = async (params: {
  cursor?: number;
  perPage?: number;
  keyword?: string;
}) => {
  const { cursor = 1, perPage = 12, keyword } = params;

  const data = await fetcher.get<GetChannelListResponse>(
    '/api/v1/channel/search',
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
  const data = await fetcher.get<GetChannelDetailResponse>(`api/v1/channel/${channelId}`);
  return data;
};
