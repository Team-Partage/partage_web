'use client';
/* eslint-disable import/named */
// DropResult 인식 못 함

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GetChannelDetailResponse } from '@/services/channel/type';
import { getPlaylist } from '@/services/playlist';
import send from '@/services/websocket/send';
import { useUserStore } from '@/stores/User';
import { useSocketStore } from '@/stores/useSocketStore';
import { ListVideo, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { useShallow } from 'zustand/react/shallow';

import PlaylistCard from './PlaylistCard';

interface Props extends GetChannelDetailResponse {}

const Playlist = ({ channel, owner }: Props) => {
  /** PROPS */
  const { channel_id } = channel;
  const { user_id: owner_id } = owner;

  /** STORE */
  const user_id = useUserStore((state) => state.user_id);
  const { playlist, setStore } = useSocketStore(
    useShallow((state) => ({ playlist: state.playlist, setStore: state.setSocketStore })),
  );

  /** STATE */
  const [isFold, setIsFold] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [url, setUrl] = useState('');

  //! 임시 권한 처리
  const isOwner = owner_id === user_id;

  useEffect(() => {
    const fetch = async () => {
      const res = await getPlaylist({ channelId: channel_id });
      setStore({ type: 'SET_PLAYLIST', payload: res.playlists });
    };

    fetch();
  }, [channel_id]);

  /** 비디오 재생 */
  const handlePlay = (index: number) => {
    if (!isOwner) return;
    // send('VIDEO_PLAY', { playlist_no: id, playing: true });
    setStore({
      type: 'SET_VIDEO',
      payload: { playlist_no: playlist.data[index].playlist_no, url: playlist.data[index].url },
    });
    setStore({ type: 'SET_PLAYLIST_CURSOR', payload: index });
  };

  /** 비디오 삭제 */
  const handleDelete = (id: number) => {
    if (!isOwner) return;
    send('PLAYLIST_REMOVE', { playlist_no: id });
  };

  /** 비디오 추가 */
  const handleAddPlaylist = () => {
    if (url.trim() === '') return;
    send('PLAYLIST_ADD', { url });
    setUrl('');
  };

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!isOwner || !destination) return;

    // swap
    const newPlaylist = playlist.data;
    const temp = newPlaylist[source.index];
    newPlaylist[source.index] = newPlaylist[destination.index];
    newPlaylist[destination.index] = temp;

    setStore({ type: 'SET_PLAYLIST', payload: newPlaylist });
    if (source.index === playlist.cursor) {
      setStore({ type: 'SET_PLAYLIST_CURSOR', payload: destination.index });
    } else {
      setStore({ type: 'SET_PLAYLIST_CURSOR', payload: source.index });
    }
  };

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
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="playlist">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <ol className={`flex flex-col ${isFold && 'hidden'}`}>
                {playlist?.data.map((item, index) => (
                  <Draggable
                    key={item.playlist_no}
                    draggableId={item.playlist_no.toString()}
                    index={index}
                    isDragDisabled={!isOwner}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={(e) => {
                          e.preventDefault();
                          handlePlay(index);
                        }}
                        onMouseEnter={() => setHoveredItem(item.playlist_no)}
                        onMouseLeave={() => setHoveredItem(null)}
                        className={`relative h-[66px] rounded-lg border p-3 transition-colors desktop:w-[320px] ${isOwner && 'hover:border-main-skyblue hover:bg-main-skyblue/20'} ${playlist.cursor === index ? 'border-main-skyblue bg-main-skyblue/20' : 'border-transparent'}`}
                      >
                        <PlaylistCard {...item} />
                        {isOwner && hoveredItem === item.playlist_no && (
                          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 gap-4">
                            <Button
                              size="icon"
                              className="size-5 p-0 tablet:size-6"
                              onClick={(e) => {
                                e.preventDefault();
                                handleDelete(item.playlist_no);
                              }}
                            >
                              <Trash2 className="text-main-skyblue" />
                            </Button>
                          </div>
                        )}
                      </li>
                    )}
                  </Draggable>
                ))}
              </ol>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/** URL INPUT */}
      {isOwner && (
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
      )}
    </section>
  );
};

export default Playlist;
