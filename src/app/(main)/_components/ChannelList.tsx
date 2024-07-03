'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

import { getSearchChannelList } from '@/services/channel';
import { GetChannelSearchResponse } from '@/services/channel/type';
import { ChannelStore } from '@/stores/Channel';
import { useInView } from 'react-intersection-observer';

import ChannelItem from './ChannelItem';

interface ChannelListProps {
  query?: string | null;
  channelsData: GetChannelSearchResponse;
}

const ChannelList = ({ query, channelsData }: ChannelListProps) => {
  const { channels, setChannels, cursor, incrementCursor } = ChannelStore();
  const [loading, setLoading] = useState(false);

  const [ref, inView] = useInView();
  const channelsRef = useRef<HTMLDivElement>(null);
  const noNextChannel = channelsData.page.total_count < cursor * 12;

  const handleLoadMoreChannels = useCallback(async () => {
    if (loading) return;

    setLoading(true);

    const nextChannelsData = await getSearchChannelList({
      cursor: cursor + 1,
      keyword: `${query ? query : ''}`,
    });
    setChannels(nextChannelsData.channels);
    incrementCursor();

    setLoading(false);
  }, [cursor, incrementCursor, loading, query, setChannels]);

  useEffect(() => {
    if (channelsData && channelsData.channels) {
      setChannels(channelsData.channels);
    } else {
      setChannels([]);
    }
  }, [channelsData, setChannels]);

  useEffect(() => {
    if (inView && !noNextChannel) {
      handleLoadMoreChannels();
    }
  }, [inView, handleLoadMoreChannels, noNextChannel]);

  return (
    <section className="flex flex-col gap-[20px] tablet:w-[664px] largeTablet:w-[1008px] desktop:w-[1100px] desktop:gap-[24px]">
      <h2 className="large-bold tablet:big-bold desktop:max-bold">당신을 기다리는 채널</h2>
      <div
        ref={channelsRef}
        className="flex flex-wrap gap-x-[24px] gap-y-[32px] desktop:gap-x-[20px]"
      >
        {channels.map((channel) => {
          return <ChannelItem key={channel.channel.channel_id} channelData={channel} />;
        })}
        {!noNextChannel && <div ref={ref} onClick={() => handleLoadMoreChannels()} />}
      </div>
    </section>
  );
};

export default ChannelList;
