import { useSocketStore } from '@/stores/useSocketStore';

import send from './send';

const nextVideo = (index?: number) => {
  const { playlist, video, setSocketStore } = useSocketStore.getState();

  let nextIndex;

  if (index !== undefined) {
    nextIndex = index;
  } else {
    nextIndex = playlist.findIndex((item) => item.playlist_no === video.playlist_no) + 1;
    if (playlist.length <= nextIndex) {
      nextIndex = 0;
    }
  }

  const { playlist_no } = playlist[nextIndex];

  setSocketStore({
    type: 'SET_VIDEO',
    payload: { playlist_no, playing: false, playtime: 0, url: playlist[nextIndex].url },
  });
  send('VIDEO_PLAY', { playlist_no, playing: true, playtime: 0 });
};

export default nextVideo;
