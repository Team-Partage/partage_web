import { Playlist } from '@/services/playlist/type';
import Image from 'next/image';

interface Props extends Pick<Playlist, 'thumbnail' | 'title'> {}

const PlaylistCard = ({ thumbnail, title }: Props) => {
  return (
    <div className="flex w-[320px] items-center rounded-lg border border-transparent p-3 transition-colors hover:border-main-skyblue hover:bg-main-skyblue/20">
      <Image
        className="aspect-square rounded object-cover"
        src={thumbnail}
        width={42}
        height={42}
        alt="thumbnail"
      />
      <p className="ml-4 text-neutral-100 small-regular">{title}</p>
    </div>
  );
};

export default PlaylistCard;
