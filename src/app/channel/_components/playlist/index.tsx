'use client';

import { Playlist } from '@/services/playlist/type';

import PlaylistCard from './PlaylistCard';

interface Props {
  playlists: Playlist[];
}

const Playlist = ({ playlists }: Props) => {
  return (
    <ol className="flex flex-col gap-2">
      {playlists?.map((item) => {
        return (
          <li key={item?.playlist_no}>
            <PlaylistCard {...item} />
          </li>
        );
      })}
    </ol>
  );
};

export default Playlist;
