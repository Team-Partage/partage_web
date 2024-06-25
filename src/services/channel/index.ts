import { fetcher } from '@/lib/fetcher';

import { CreateChannelReq, GetChannelDetailResponse, GetChannelListResponse } from './type';

/** 채널 생성 */
export const createChannel = async (params: CreateChannelReq) => {
  const data = await fetcher.post<GetChannelListResponse>('/api/v1/channel', params);

  return data;
};

/** 채널 검색 */
export const getChannelList = async (params: {
  cursor?: number;
  perPage?: number;
  keyword?: string;
}) => {
  const { cursor = 1, perPage = 12, keyword } = params;

  const data = await fetcher.get<GetChannelListResponse>('/api/v1/channel/search', {
    cursor,
    perPage,
    keyword,
  });

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
