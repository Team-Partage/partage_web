'use client';

import ReactPlayer from 'react-player';

const Player = () => {
  return (
    <div className="overflow-hidden rounded-lg">
      <ReactPlayer url="https://www.youtube.com/watch?v=2pvzR9iDwoE" config={{ youtube: {} }} />
    </div>
  );
};

export default Player;
