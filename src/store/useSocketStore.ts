import { create } from 'zustand';

import type { Client } from '@stomp/stompjs';

interface SocketStore {
  stomp: Client | null;
  setStomp: (newClient: Client) => void;
}

export const useSocketStore = create<SocketStore>((set) => {
  return {
    stomp: null,
    setStomp: (newStomp) => {
      set({ stomp: newStomp });
    },
  };
});
