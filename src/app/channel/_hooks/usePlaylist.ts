import send from '@/services/websocket/send';
import { useSocketStore } from '@/stores/useSocketStore';

const usePlaylist = () => {
  const next = () => {
    const { playlist, video } = useSocketStore.getState();

    let nextIndex = playlist.findIndex((item) => item.playlist_no === video.playlist_no) + 1;
    if (playlist.length <= nextIndex) {
      nextIndex = 0;
    }

    const { playlist_no, url } = playlist[nextIndex];

    send('VIDEO_PLAY', { playlist_no, url, playing: true });
  };

  return { next };
};

export default usePlaylist;
