import { fetcher } from '@/lib/fetcher';

import { GetChannelDetailResponse, GetChannelListResponse } from './type';

/** */
export const getChannelList = async (params?: { cursor?: number; perPage?: number }) => {
  const data = await fetcher.get<GetChannelListResponse>('/api/v1/channel/search', params || {});
  return data;
};

/** 채널 상세 정보 조회 */
export const getChannelDetail = async (params: {
  channelId: string;
  page?: number;
  pageSize?: number;
}) => {
  const { channelId, ...rest } = params;

  const data = await fetcher.get<GetChannelDetailResponse>(`/api/v1/channel/${channelId}`, rest);
  return data;
};
