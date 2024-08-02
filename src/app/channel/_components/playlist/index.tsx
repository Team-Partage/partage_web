'use client';
/* eslint-disable import/named */
// DropResult 인식 못 함

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GetChannelDetailResponse } from '@/services/channel/type';
import { getPlaylist } from '@/services/playlist';
import { nextVideo, send } from '@/services/websocket';
import { useUserStore } from '@/stores/User';
import { usePermissionStore } from '@/stores/usePermissionStore';
import { useSocketStore } from '@/stores/useSocketStore';
import { ListVideo, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { useShallow } from 'zustand/react/shallow';

import PlaylistCard from './PlaylistCard';

interface Props extends GetChannelDetailResponse {}

const Playlist = ({ channel }: Props) => {
  /** PROPS */
  const { channel_id } = channel;

  /** STORE */
  const permission = usePermissionStore((state) => state.permission);
  const playlist_no = useSocketStore((state) => state.video.playlist_no);
  const { playlist, setStore } = useSocketStore(
    useShallow((state) => ({ playlist: state.playlist, setStore: state.setSocketStore })),
  );

  /** STATE */
  const [isFold, setIsFold] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [url, setUrl] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const res = await getPlaylist({ channelId: channel_id, pageSize: 50 });
      setStore({ type: 'ADD_PLAYLIST', payload: res.playlists });
    };

    fetch();
  }, [channel_id]);

  /** 비디오 재생 */
  const handlePlay = (index: number) => {
    
    if (!permission.video_play) return;
    nextVideo(index);
  };

  /** 플레이리스트 삭제 */
  const handleDelete = (id: number) => {
    if (!permission.playlist_remove) return;
    send('PLAYLIST_REMOVE', { playlist_no: id });
  };

  /** 플레이리스트 추가 */
  const handleAddPlaylist = () => {
    if (!permission.playlist_add && url.trim() === '') return;
    send('PLAYLIST_ADD', { url });
    setUrl('');
  };

  /** 드래그앤드랍 */
  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!permission.playlist_move || !destination) return;

    setStore({
      type: 'PLAYLIST_MOVE',
      payload: {
        playlist_no: playlist[source.index].playlist_no,
        sequence: destination.index,
      },
    });

    send('PLAYLIST_MOVE', {
      playlist_no: playlist[source.index].playlist_no,
      sequence: destination.index,
    });
  };

  return (
    <section
      className={`flex flex-col desktop:order-1 desktop:max-h-screen desktop:max-w-[384px] desktop:px-8 ${isFold ? 'desktop:px-[22px]' : 'w-full'}`}
    >
      {/** 헤더 */}
      <header className={`flex h-[67px] items-center justify-between shadow-xl desktop:h-[90px]`}>
        <div className="flex items-center">
          {/** 플레이리스트 펼치기 버튼 */}
          <button
            className={`${isFold ? 'rounded desktop:p-[10px] desktop:hover:bg-transparent-white-10' : ''}`}
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
            <ol
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`h-[320px] overflow-y-auto no-scrollbar desktop:h-screen-playList ${isFold ? 'hidden' : ''}`}
            >
              {playlist?.map((item, index) => (
                <Draggable
                  key={item.playlist_no}
                  draggableId={item.playlist_no.toString()}
                  index={index}
                  isDragDisabled={!permission.playlist_move}
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
                      className={`relative h-[66px] rounded-lg border p-3 transition-colors desktop:w-[320px] ${permission.playlist_move && 'hover:border-main-skyblue hover:bg-main-skyblue/20'} ${playlist_no === item.playlist_no ? 'border-main-skyblue bg-main-skyblue/20' : 'border-transparent'}`}
                    >
                      <PlaylistCard {...item} />
                      {permission.playlist_move && hoveredItem === item.playlist_no && (
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
              {provided.placeholder}
            </ol>
          )}
        </Droppable>
      </DragDropContext>

      {/** URL INPUT */}
      {permission.playlist_add && (
        <div
          className={`pb-3 desktop:fixed desktop:bottom-0 desktop:w-[320px] ${isFold ? 'hidden' : ''}`}
        >
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
