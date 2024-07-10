import Image from 'next/image';
import Link from 'next/link';

import { SearchedChannel } from '@/services/channel/type';
import { getChannelHoverBorderColor } from '@/utils/getChannelHoverBorderColor';
import { PAGE_ROUTE } from '@/utils/route';

import Hashtags from './Hashtags';

interface ChannelItemProps {
  channelData: SearchedChannel;
}

const ChannelItem = ({ channelData }: ChannelItemProps) => {
  const { channel, playlist = null, owner, user_count } = channelData;
  const thumbnail = playlist ? playlist.thumbnail : '/default-thumbnail.png';
  const ownerProfile = owner?.profile_image ? owner.profile_image : '/default-profile-image.png'; // TODO 채널장 프로필 이미지 서버 해결되면 다시 실행

  const noHashtags = channel.hashtag === null;

  const channelColor = channel.channel_color ? channel.channel_color : '#75FBFD';
  const hoverColor = getChannelHoverBorderColor(channelColor);

  return (
    <div className="flex w-[335px] flex-col gap-[12px] tablet:w-[320px] desktop:w-[260px]">
      <Link href={PAGE_ROUTE.CHANNEL(channel.channel_id)}>
        <div
          className={`relative overflow-hidden rounded-lg hover:border-2 ${hoverColor} h-[188px] w-full tablet:h-[180px] desktop:h-[146px]`}
        >
          <Image
            fill
            src={thumbnail}
            alt={`${channel.name} 채널의 썸네일`}
            sizes="(min-width: 1199px) 33vw, (min-width: 743px) 50vw, (min-width: 375px) 100vw, 100vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      </Link>
      <div className="flex gap-[12px]">
        <div className="relative mt-[5px] overflow-hidden rounded-full tablet:size-[36px]">
          <Image
            fill
            src={ownerProfile}
            alt={`${channel.name} 채널을 만든 유저의 프로필 사진`}
            sizes="36px"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="flex w-[283px] flex-col gap-[4px] tablet:w-[240px] desktop:w-[180px]">
          <h3 className="text-neutral-100 base-medium">{channel.name}</h3>
          {!noHashtags && <Hashtags hashtage={channel.hashtag} color={channelColor} />}
          <span className="text-neutral-200 small-regular">{user_count}명 시청중</span>
        </div>
      </div>
    </div>
  );
};

export default ChannelItem;
