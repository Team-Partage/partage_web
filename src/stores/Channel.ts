import { SearchedChannel } from '@/services/channel/type';
import { create } from 'zustand';

interface UseChannelStoreType {
  channels: SearchedChannel[];
  setChannels: (data: SearchedChannel | SearchedChannel[]) => void;
  cursor: number;
  incrementCursor: () => void;
}

export const ChannelStore = create<UseChannelStoreType>((set) => ({
  channels: [],
  setChannels: (data) => {
    if (Array.isArray(data)) {
      set({ channels: data });
    } else {
      set((state) => ({ channels: [...state.channels, data] }));
    }
  },
  cursor: 1,
  incrementCursor: () => set((state) => ({ cursor: state.cursor + 1 })),
}));
