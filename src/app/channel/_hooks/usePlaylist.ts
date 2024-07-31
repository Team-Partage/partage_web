import send from '@/services/websocket/send';
import { useSocketStore } from '@/stores/useSocketStore';

const usePlaylist = () => {
  const next = () => {
    const { playlist, video } = useSocketStore.getState();

    let nextIndex = playlist.findIndex((item) => item.playlist_no === video.playlist_no) + 1;
    if (playlist.length <= nextIndex) {
      nextIndex = 0;
    }

    const { playlist_no } = playlist[nextIndex];

    send('VIDEO_PLAY', { playlist_no, playing: true });
    send('VIDEO_MOVE', { playlist_no, playtime: 0 });
  };

  return { next };
};

export default usePlaylist;
