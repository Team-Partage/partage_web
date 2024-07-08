'use client';

import { ReactNode, createContext, useContext, useRef } from 'react';

import { CreateMainStoreType, createMainStore } from '@/stores/useMainStore';
import { useStore } from 'zustand';

export type MainStoreApi = ReturnType<typeof createMainStore>;

export const MainStoreContext = createContext<MainStoreApi | undefined>(undefined);

export interface MainStoreProviderProps {
  children: ReactNode;
}

export const MainStoreProvider = ({ children }: MainStoreProviderProps) => {
  const storeRef = useRef<MainStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createMainStore();
  }

  return <MainStoreContext.Provider value={storeRef.current}>{children}</MainStoreContext.Provider>;
};

export const useMainStore = <T,>(selector: (store: CreateMainStoreType) => T): T => {
  const mainStoreContext = useContext(MainStoreContext);

  if (!mainStoreContext) {
    throw new Error('useMainStore은 반드시 MainStoreProvider 안에서 사용해야 합니다.');
  }

  return useStore(mainStoreContext, selector);
};
