import { fetcher } from '@/lib/fetcher';

import { GetChannelListResponse } from './type';

/** */
export const getChannelList = async (params: {
  cursor?: number;
  perPage?: number;
  keyword?: string;
}) => {
  const data = await fetcher.get<GetChannelListResponse>('/api/v1/channel/search', params || {});
  return data;
};
