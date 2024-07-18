'use client';

import { ChangeEvent, useEffect, useLayoutEffect, useRef, useState } from 'react';

import send from '@/services/websocket/send';
import { VideoMoveReq, VideoPlayReq } from '@/services/websocket/type';
import { useUserStore } from '@/stores/User';
import { useSocketStore } from '@/stores/useSocketStore';
import ReactPlayer from 'react-player';
import { useShallow } from 'zustand/react/shallow';

import './player.css';

const YOUTUBE_BASE_URL = 'https://www.youtube.com/watch?v=';

interface Props {
  channelId: string;
  owner_id: string;
}

const Player = ({ channelId, owner_id }: Props) => {
  const { video, setStore } = useSocketStore(
    useShallow((state) => ({ video: state.video, setStore: state.setSocketStore })),
  );

  const user_id = useUserStore((state) => state.user_id);
  const hasPermission = owner_id === user_id;
  const videoPlayerRef = useRef<ReactPlayer>(null);
  const [flag, setFlag] = useState(false);
  const [played, setPlayed] = useState(video.playtime);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    setFlag(true);
  }, []);

  useEffect(() => {
    // 권한이 없는 기본 유저의 경우, 받아오는 video.playtime으로 동영상 재생시간을 설정
    if (!hasPermission && videoPlayerRef.current) {
      videoPlayerRef.current.seekTo(video.playtime);
    }
  }, [video.playtime, video.playing, hasPermission]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    seconds = Math.floor(seconds % 60);
    return `${hours ? hours + ':' : ''}${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handlePlayPause = (playing: boolean) => {
    if (hasPermission) {
      setStore({ type: 'SET_VIDEO', payload: { ...video, playing } });
      const dto: VideoPlayReq = { playlist_no: video.playlist_no, playing };
      send('VIDEO_PLAY', dto);
    }
  };

  const onEnded = () => {
    alert('영상끝!');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value)); // 재생 포인트 위치 실시간 변경
    if (videoPlayerRef.current) {
      videoPlayerRef.current.seekTo(parseFloat(e.target.value)); // 실제 영상 재생 위치 실시간 변경
    }
  };

  const handleClick = () => {
    // 권한이 있는 경우 && 재생바 클릭시 웹소켓 send
    if (hasPermission) {
      const formatedSeconds = Math.floor(played * duration);
      const dto: VideoMoveReq = { playlist_no: video.playlist_no, playtime: formatedSeconds };
      send('VIDEO_MOVE', dto);
    }
  };

  return (
    <div className="relative aspect-video overflow-hidden rounded-lg bg-neutral-500">
      {flag && (
        <>
          <ReactPlayer
            ref={videoPlayerRef}
            width="100%"
            height="100%"
            url={YOUTUBE_BASE_URL + video.url}
            config={{ youtube: { playerVars: { disablekb: !hasPermission ? 1 : 0 } } }} // 접근 권한 없을 경우 키보드 조작 금지
            controls={false}
            onEnded={onEnded}
            onProgress={({ played }) => setPlayed(played)}
            playing={video.playing}
            onPause={() => handlePlayPause(false)}
            onPlay={() => handlePlayPause(true)}
            onDuration={setDuration}
            onReady={() => setReady(true)}
          />
          {hasPermission && (
            <div className="progressBar">
              <time dateTime="P1S">{formatTime(played * duration)} </time>
              <input
                type="range"
                min="0"
                max="0.999999"
                step="any"
                disabled={!ready}
                value={played}
                style={{ '--progress': `${video.playtime * 100}%` } as React.CSSProperties}
                onChange={handleChange}
                onClick={handleClick}
              />
              <time dateTime="P1S">{formatTime(duration)}</time>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Player;
