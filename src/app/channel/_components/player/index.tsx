'use client';

import { useLayoutEffect, useState } from 'react';

import { useSocketStore } from '@/stores/useSocketStore';
import ReactPlayer from 'react-player';
import { useShallow } from 'zustand/react/shallow';

const YOUTUBE_BASE_URL = 'https://www.youtube.com/watch?v=';

interface Props {
  channelId: string;
}

const Player = ({ channelId }: Props) => {
  const { video } = useSocketStore(
    useShallow((state) => ({ video: state.video, setStore: state.setSocketStore })),
  );

  const [flag, setFlag] = useState(false);

  useLayoutEffect(() => {
    setFlag(true);
  }, []);

  return (
    <div className="aspect-video overflow-hidden rounded-lg bg-neutral-500">
      {flag && (
        <ReactPlayer
          width="100%"
          height="100%"
          url={YOUTUBE_BASE_URL + video.url}
          config={{ youtube: {} }}
        />
      )}
    </div>
  );
};

export default Player;
