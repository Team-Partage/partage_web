import { ChannelWithPlaylist } from '@/services/channel/type';
import { create } from 'zustand';

interface UseChannelStoreType {
  channels: ChannelWithPlaylist[];
  addChannels: (newChannels: ChannelWithPlaylist[]) => void;
  updateChannels: (newChannels: ChannelWithPlaylist[]) => void;
  cursor: number;
  incrementCursor: () => void;
}

export const ChannelStore = create<UseChannelStoreType>((set) => ({
  channels: [],
  addChannels: (newChannels) => set((state) => ({ channels: [...state.channels, ...newChannels] })),
  updateChannels: (newChannels) => set({ channels: newChannels }),
  cursor: 1,
  incrementCursor: () => set((state) => ({ cursor: state.cursor + 1 })),
}));
