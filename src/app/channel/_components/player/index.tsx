'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { nextVideo, send } from '@/services/websocket';
import { usePermissionStore } from '@/stores/usePermissionStore';
import { useSocketStore } from '@/stores/useSocketStore';
import ReactPlayer from 'react-player';
import { OnProgressProps } from 'react-player/base';
import { useShallow } from 'zustand/react/shallow';

const YOUTUBE_BASE_URL = 'https://www.youtube.com/watch?v=';

const Player = () => {
  const permission = usePermissionStore((state) => state.permission);
  const { video, setStore } = useSocketStore(
    useShallow((state) => ({ video: state.video, setStore: state.setSocketStore })),
  );

  const videoPlayerRef = useRef<ReactPlayer>(null);
  const [flag, setFlag] = useState(false);
  const [playingState, setPlayingState] = useState(false);

  useLayoutEffect(() => {
    setFlag(true);
  }, []);

  // 권한이 없는 기본 유저의 경우, 받아오는 video.playtime으로 동영상 재생시간을 자동 설정
  useEffect(() => {
    if (!permission.video_play && !permission.video_seek && videoPlayerRef.current) {
      videoPlayerRef.current.seekTo(video.playtime);
    }
  }, [video.playtime, video.playing, permission, playingState]);

  // 재생 시작, 일시정지 시
  const handlePlayPause = (playing: boolean) => {
    setPlayingState(playing);
    if (!permission.video_play) return; // 권한 없을 경우 return
    // TODO 플레이 리스트에서 next() 함수 사용할 경우에도 VIDEO_PLAY 보내짐
    setStore({ type: 'SET_VIDEO', payload: { ...video, playing } });
    send('VIDEO_PLAY', { playlist_no: video.playlist_no, playing });
  };

  const onEnded = () => {
    if (!permission.video_play) return;
    nextVideo();
  };

  const handleProgress = (e: OnProgressProps) => {
    const formatedSeconds = Math.floor(e.playedSeconds);
    // 시간 차이 계산 후 전송 조건 추가
    if (permission.video_seek) {
      //** 권한이 있는 경우 && 재생바 클릭시 웹소켓 send */
      send('VIDEO_MOVE', { playlist_no: video.playlist_no, playtime: formatedSeconds });
    }
  };

  // const onPlayerStateChange = (e: any) => {
  //   console.log('e: ', e);
  // };
  // const onPlayerReady = (e: any) => {
  //   console.log('ready: ', e);
  // };

  return (
    <div className="relative aspect-video overflow-hidden rounded-lg bg-neutral-500">
      {flag && (
        <>
          <ReactPlayer
            ref={videoPlayerRef}
            width="100%"
            height="100%"
            url={YOUTUBE_BASE_URL + video.url}
            controls={true}
            // config={{
            //   youtube: {
            //     playerVars: { showinfo: 1 },
            //     embedOptions: {
            //       events: {
            //         onReady: onPlayerReady,
            //         onStateChange: onPlayerStateChange,
            //       },
            //     },
            //   },
            // }}
            onEnded={onEnded}
            onProgress={handleProgress}
            playing={video.playing}
            onPause={() => handlePlayPause(false)}
            onPlay={() => handlePlayPause(true)}
          />
        </>
      )}
    </div>
  );
};

export default Player;
