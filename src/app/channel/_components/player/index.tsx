'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import send from '@/services/websocket/send';
import { VideoMoveReq } from '@/services/websocket/type';
import { useUserStore } from '@/stores/User';
import { useSocketStore } from '@/stores/useSocketStore';
import ReactPlayer from 'react-player';
import { useShallow } from 'zustand/react/shallow';

import type { OnProgressProps } from 'react-player/base';

const YOUTUBE_BASE_URL = 'https://www.youtube.com/watch?v=';

interface Props {
  channelId: string;
  owner_id: string;
}

const Player = ({ channelId, owner_id }: Props) => {
  const { video } = useSocketStore(
    useShallow((state) => ({ video: state.video, setStore: state.setSocketStore })),
  );
  const user_id = useUserStore((state) => state.user_id);
  const hasPermission = owner_id === user_id;
  const videoPlayerRef = useRef<ReactPlayer>(null);
  const [flag, setFlag] = useState(false);

  useLayoutEffect(() => {
    setFlag(true);
  }, []);

  useEffect(() => {
    // 권한이 없는 기본 유저의 경우, 받아오는 video.playtime으로 동영상 재생시간을 설정
    if (!hasPermission && videoPlayerRef.current) {
      videoPlayerRef.current.seekTo(video.playtime);
    }
  }, [video.playtime, hasPermission]);

  const formatTime = (playedTime: number) => {
    const seconds = Math.floor(playedTime);
    return seconds;
  };

  const sendPlayedTime = (playtime: number) => {
    const dto: VideoMoveReq = { playlist_no: video.playlist_no, playtime };
    send('VIDEO_MOVE', dto);
  };

  const handleProgress = (e: OnProgressProps) => {
    // 권한이 있는 경우
    if (hasPermission) {
      const formatedSeconds = formatTime(e.playedSeconds);
      sendPlayedTime(formatedSeconds);
    }
  };

  const onEnded = () => {
    alert('영상끝!');
  };

  return (
    <div className="aspect-video overflow-hidden rounded-lg bg-neutral-500">
      {flag && (
        <ReactPlayer
          ref={videoPlayerRef}
          width="100%"
          height="100%"
          url={YOUTUBE_BASE_URL + video.url}
          config={{ youtube: {} }}
          controls={hasPermission ? true : false}
          onEnded={onEnded}
          onProgress={handleProgress}
          playing={true}
        />
      )}
    </div>
  );
};

export default Player;
