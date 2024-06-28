'use client';
import { useLayoutEffect, useState } from 'react';

import useSocket from '@/hooks/useSocket';
import ReactPlayer from 'react-player';

interface Props {
  src?: string;
  channelId: string;
}

const Player = ({ src, channelId }: Props) => {
  useSocket(channelId);
  const [flag, setFlag] = useState(false);

  useLayoutEffect(() => {
    setFlag(true);
  }, []);

  return (
    <div className="aspect-video overflow-hidden rounded-lg bg-neutral-500">
      {flag && <ReactPlayer width="100%" height="100%" url={src} config={{ youtube: {} }} />}
    </div>
  );
};

export default Player;
