'use client';

import PlaylistCard from './PlaylistCard';

const Playlist = () => {
  return (
    <section className="h-full px-8">
      <header className=""></header>
      <ol className="flex flex-col gap-2">
        <li>
          <PlaylistCard />
        </li>
        <li>
          <PlaylistCard />
        </li>
      </ol>
    </section>
  );
};

export default Playlist;
