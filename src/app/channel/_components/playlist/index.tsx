'use client';

import useSocket from '@/hooks/useSocket';
import { Playlist } from '@/services/playlist/type';

import PlaylistCard from './PlaylistCard';

interface Props {
  playlists: Playlist[];
  channelId: string;
}

const Playlist = ({ channelId, playlists }: Props) => {
  useSocket(channelId);

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
