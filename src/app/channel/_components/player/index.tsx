'use client';

import {
  ChangeEvent,
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { Button } from '@/components/ui/button';
import { nextVideo, send } from '@/services/websocket';
import { usePermissionStore } from '@/stores/usePermissionStore';
import { useSocketStore } from '@/stores/useSocketStore';
import { Pause, Play, SkipForward, Volume2, VolumeX } from 'lucide-react';
import ReactPlayer from 'react-player';
import { useShallow } from 'zustand/react/shallow';

const YOUTUBE_BASE_URL = 'https://www.youtube.com/watch?v=';

const Player = () => {
  /** REF */
  const videoPlayerRef = useRef<ReactPlayer>(null);

  /** STORE */
  const { video, setStore } = useSocketStore(
    useShallow((state) => ({ video: state.video, setStore: state.setSocketStore })),
  );
  const { roleId, permission } = usePermissionStore(
    useShallow((state) => ({ roleId: state.roleId, permission: state.permission })),
  );

  /** STATE */
  const [hydrateFlag, setHydrateFlag] = useState(false);

  // 재생
  const [ready, setReady] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);

  // 볼륨
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isVolumeHover, setIsVolumeHover] = useState(false);

  useLayoutEffect(() => {
    setHydrateFlag(true);
  }, []);

  useEffect(() => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.seekTo(video.playtime);
    }
  }, [video.playtime]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    seconds = Math.floor(seconds % 60);

    return `${hours ? hours + ':' : ''}${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handlePlayPause = (playing: boolean) => {
    if (roleId && video.playing !== playing) {
      const formatedSeconds = Math.floor(played * duration);
      setStore({ type: 'SET_VIDEO', payload: { ...video, playing } });
      send('VIDEO_PLAY', { playlist_no: video.playlist_no, playing, playtime: formatedSeconds });
    }
  };

  const handleEnded = () => {
    nextVideo();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value)); // 재생 포인트 위치 실시간 변경
    if (videoPlayerRef.current) {
      videoPlayerRef.current.seekTo(parseFloat(e.target.value)); // 실제 영상 재생 위치 실시간 변경
    }
  };

  const handleClick = () => {
    // 권한이 있는 경우 && 재생바 클릭시 웹소켓 send
    if (permission.video_play) {
      const formatedSeconds = Math.floor(played * duration);
      setStore({ type: 'SET_VIDEO', payload: { ...video, playtime: formatedSeconds } });
      send('VIDEO_MOVE', { playlist_no: video.playlist_no, playtime: formatedSeconds });

      if (videoPlayerRef.current) {
        videoPlayerRef.current.seekTo(played); // 실제 영상 재생 위치 실시간 변경
      }
    }
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (isMuted && newVolume > 0) {
      setIsMuted(false);
    } else if (newVolume === 0) {
      setIsMuted(true);
    }
  };

  return (
    <>
      <div className="relative aspect-video overflow-hidden rounded-lg bg-neutral-500">
        {hydrateFlag && (
          <ReactPlayer
            ref={videoPlayerRef}
            width="100%"
            height="100%"
            url={YOUTUBE_BASE_URL + video.url}
            config={{ youtube: { playerVars: { disablekb: !roleId ? 1 : 0 } } }} // 접근 권한 없을 경우 키보드 조작 금지
            controls={false}
            volume={isMuted ? 0 : volume}
            onEnded={handleEnded}
            onProgress={({ played }) => setPlayed(played)}
            playing={video.playing}
            onPause={() => handlePlayPause(false)}
            onPlay={() => handlePlayPause(true)}
            onDuration={setDuration}
            onReady={() => setReady(true)}
          />
        )}
      </div>
      {ready && (
        <div className="mt-2 flex w-full flex-col items-center gap-2 p-2">
          {/** 재생바 */}
          <input
            className="h-[3px] w-full rounded"
            type="range"
            min="0"
            max="1"
            step="any"
            disabled={!permission.video_play}
            value={played}
            onChange={handleChange}
            onClick={handleClick}
            onKeyUp={handleClick}
          />
          <div className="flex w-full items-center gap-2">
            {/** 재생/일시정지 */}
            <Button size="icon" onClick={() => handlePlayPause(!video.playing)}>
              {video.playing ? <Play /> : <Pause />}
            </Button>

            {/** 다음 영상 */}
            {permission.video_play && (
              <Button size="icon" onClick={() => nextVideo()}>
                <SkipForward />
              </Button>
            )}

            {/** 볼륨 조절 */}
            <div
              className="flex items-center"
              onMouseEnter={() => setIsVolumeHover(true)}
              onMouseLeave={() => setIsVolumeHover(false)}
            >
              <Button size="icon" onClick={handleMute}>
                {isMuted ? <VolumeX /> : <Volume2 />}
              </Button>
              {isVolumeHover && (
                <input
                  className="h-[3px] w-24"
                  type="range"
                  min="0"
                  max="1"
                  step="any"
                  value={volume}
                  onChange={handleVolumeChange}
                />
              )}
            </div>

            {/** 재생시간 */}
            <div className="small-regular">
              <time dateTime="P1S">{formatTime(played * duration)}</time>
              <span> / </span>
              <time dateTime="P1S">{formatTime(duration)}</time>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Player;
