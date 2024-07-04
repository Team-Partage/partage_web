'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useSocket from '@/hooks/useSocket';
import { getPlaylist } from '@/services/playlist';
import { useSocketStore } from '@/stores/useSocketStore';
import { ListVideo, Menu, Plus, Trash2 } from 'lucide-react';
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

  const handlePlaylistMove = () => {};

  const handlePlaylistRemove = () => {};

  return (
    <section className="h-full py-5 desktop:order-1 desktop:w-[384px] desktop:pr-8">
      {/** 헤더 */}
      <header className="flex h-[4.1875rem] items-center shadow-xl">
        <ListVideo />
        <h2 className="ml-2 text-nowrap medium-bold desktop:large-bold">플레이리스트</h2>
      </header>

      {/** 플레이리스트 */}
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
              <div className="absolute right-2 top-1/2 flex -translate-y-1/2 gap-4">
                {/** 플레이리스트 이동 */}
                <Button
                  size="icon"
                  className="size-5 p-0 tablet:size-6"
                  onClick={() => handlePlaylistMove}
                >
                  <Menu className="text-main-skyblue" />

                  {/** 플레이리스트 삭제 */}
                </Button>
                <Button
                  size="icon"
                  className="size-5 p-0 tablet:size-6"
                  onClick={() => handlePlaylistRemove}
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
    </section>
  );
};

export default Playlist;
