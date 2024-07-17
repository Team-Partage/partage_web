import { useSocketStore } from '@/stores/useSocketStore';

const usePlaylist = () => {
  const setStore = useSocketStore((state) => state.setSocketStore);

  const next = (cursor?: number) => {
    const { playlist } = useSocketStore.getState();

    const calc = () => {
      let newCursor = 0;
      if (cursor) {
        newCursor = cursor;
      } else {
        newCursor = playlist.cursor + 1;
      }

      if (playlist.length <= newCursor) newCursor = 0;

      return newCursor;
    };

    const nextCursor = calc();

    const { playlist_no, url } = playlist.data[nextCursor];

    setStore({ type: 'SET_VIDEO', payload: { playlist_no, url } });
    setStore({ type: 'SET_PLAYLIST_CURSOR', payload: nextCursor });
  };

  return { next };
};

export default usePlaylist;
