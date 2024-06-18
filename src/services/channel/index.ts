import { fetcher } from '@/lib/fetcher';

import { GetChannelListResponse } from './type';

/** */
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
