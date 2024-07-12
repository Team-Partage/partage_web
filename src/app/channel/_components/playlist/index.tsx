'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useSocket from '@/hooks/useSocket';
import { getPlaylist } from '@/services/playlist';
import { useSocketStore } from '@/stores/useSocketStore';
import { ListVideo, Menu, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useShallow } from 'zustand/react/shallow';

import PlaylistCard from './PlaylistCard';

interface Props {
  channelId: string;
}

const Playlist = ({ channelId }: Props) => {
  const [isFold, setIsFold] = useState(false);

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

  const handlePlaylistMove = () => {};

  const handlePlaylistRemove = () => {};

  return (
    <section
      className={`h-full py-5 desktop:order-1 desktop:px-8 ${isFold && 'desktop:px-[22px]'}`}
    >
      {/** 헤더 */}
      <header className={`flex h-[4.1875rem] items-center justify-between shadow-xl `}>
        <div className="flex items-center">
          {/** 플레이리스트 펼치기 버튼 */}
          <button
            className={`${isFold && 'rounded desktop:p-[10px] desktop:hover:bg-transparent-white-10'}`}
            onClick={() => setIsFold(!isFold)}
            disabled={!isFold}
          >
            <ListVideo />
          </button>
          <h2
            className={`ml-2 text-nowrap medium-bold desktop:large-bold ${isFold && 'desktop:hidden'}`}
          >
            플레이리스트
          </h2>
        </div>

        {/** 플레이리스트 접기 버튼 */}
        <button
          className={`relative size-[22px] desktop:size-[24px] ${isFold && 'desktop:hidden'}`}
          onClick={() => setIsFold(!isFold)}
        >
          <Image src="/Close.svg" alt="플레이리스트 접기" width={24} height={24} />
        </button>
      </header>

      {/** 플레이리스트 */}
      <div>
        <ol className={`flex flex-col gap-2 ${isFold && 'hidden'}`}>
          {playlist?.map((item) => (
            <li
              key={item.playlist_no}
              onClick={() => handleClick(item.playlist_no)}
              onMouseEnter={() => setHoveredItem(item.playlist_no)}
              onMouseLeave={() => setHoveredItem(null)}
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

        {/** URL INPUT */}
        <div className={`${isFold && 'hidden'}`}>
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
        </div>
      </div>
    </section>
  );
};

export default Playlist;
