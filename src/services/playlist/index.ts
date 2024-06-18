import { fetcher } from '@/lib/fetcher';

import { GetPlaylistResponse } from './type';

/** 플레이리스트 조회 */
export const getPlaylist = async (params: {
  channelId: string;
  page?: number;
  pageSize?: number;
}) => {
  const { channelId, ...rest } = params;

  const data = await fetcher.get<GetPlaylistResponse>(`/api/v1/playlist/${channelId}`, rest);
  return data;
};
