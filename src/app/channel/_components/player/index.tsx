'use client';
import { useLayoutEffect, useState } from 'react';

import ReactPlayer from 'react-player';

interface Props {
  src?: string;
}

const Player = ({ src }: Props) => {
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
