'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useSocket from '@/hooks/useSocket';
import { getPlaylist } from '@/services/playlist';
import { useSocketStore } from '@/stores/useSocketStore';
import { Menu, Plus, Trash2 } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

import PlaylistCard from './PlaylistCard';

interface Props {
  channelId: string;
}

const Playlist = ({ channelId }: Props) => {
  const { send } = useSocket(channelId);
  const { playlist, setStore } = useSocketStore(
    useShallow((state) => ({ playlist: state.playlist, setStore: state.setSocketStore })),
  );

  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const [url, setUrl] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const res = await getPlaylist({ channelId });
      setStore({ type: 'SET_PLAYLIST', payload: res.playlists });

      res.playlists[0] &&
        setStore({
          type: 'SET_VIDEO',
          payload: {
            playlist_no: res.playlists[0].playlist_no,
            playing: false,
            playtime: 0,
            url: res.playlists[0].url,
          },
        });
    };
    fetch();
  }, [channelId]);

  const handleClick = (id: number) => {
    send('VIDEO_PLAY', { playlist_no: id, playing: true });
  };

  const handleAddPlaylist = () => {
    if (url.trim() === '') return;
    send('PLAYLIST_ADD', { url });
    setUrl('');
  };

  const handleMouseEnter = (id: number) => {
    setHoveredItem(id);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <>
      <ol className="flex flex-col gap-2">
        {playlist?.map((item) => (
          <li
            key={item.playlist_no}
            onClick={() => handleClick(item.playlist_no)}
            onMouseEnter={() => handleMouseEnter(item.playlist_no)}
            onMouseLeave={handleMouseLeave}
            className="relative h-[66px] rounded-lg border border-transparent p-3 transition-colors hover:border-main-skyblue hover:bg-main-skyblue/20 desktop:w-[320px]"
          >
            <PlaylistCard {...item} />
            {hoveredItem === item.playlist_no && (
              <div className="absolute">
                <Button
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 hover:backdrop-blur"
                >
                  <Menu className="text-main-skyblue" />
                </Button>
                <Button
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 hover:backdrop-blur"
                >
                  <Trash2 className="text-main-skyblue" />
                </Button>
              </div>
            )}
          </li>
        ))}
      </ol>
      <Input
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
        }}
        endAdornment={
          <Button size="icon" onClick={handleAddPlaylist}>
            <Plus />
          </Button>
        }
      />
    </>
  );
};

export default Playlist;
