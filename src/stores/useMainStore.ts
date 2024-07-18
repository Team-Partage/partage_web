import { SearchedChannel } from '@/services/channel/type';
import { createStore } from 'zustand';

export type MainStateType = {
  channels: SearchedChannel[];
  cursor: number;
};

export type MainActionType = {
  setChannels: (newChannels: SearchedChannel[]) => void;
  addChannels: (newChannels: SearchedChannel[]) => void;
  incrementCursor: () => void;
};

export type CreateMainStoreType = MainStateType & MainActionType;

export const defaultData: MainStateType = {
  channels: [],
  cursor: 1,
};

export const createMainStore = (initState: MainStateType = defaultData) => {
  return createStore<CreateMainStoreType>()((set, get) => ({
    ...initState,
    addChannels: (newChannels: SearchedChannel[]) => {
      const { channels, cursor } = get();
      set({ channels: [...channels, ...newChannels], cursor: cursor + 1 });
    },
    setChannels: (newChannels: SearchedChannel[]) => set({ channels: newChannels }),
    incrementCursor: () => set((state) => ({ cursor: state.cursor + 1 })),
  }));
};
