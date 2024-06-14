import { getChannelList } from '@/services/channel';
import { GetChannelListResponse } from '@/services/channel/type';
import { create } from 'zustand';

interface UseChannelStoreType {
  channels: GetChannelListResponse | null;
  loading: boolean;
  error: string | null;
  fetchChannels: (params?: {
    cursor?: number;
    perPage?: number;
    keyword?: string;
  }) => Promise<void>;
}

export const useChannelStore = create<UseChannelStoreType>((set) => ({
  channels: null,
  loading: false,
  error: null,
  fetchChannels: async (params = { cursor: 1, perPage: 12, keyword: '' }) => {
    set({ loading: true, error: null });
    try {
      const data = await getChannelList(params);
      set({ channels: data, loading: false });
    } catch (error) {
      set({ error: '채널 목록을 불러오는 데 실패했어요', loading: false });
    }
  },
}));
