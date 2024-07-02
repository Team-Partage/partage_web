'use client';

import { memo } from 'react';

import { Playlist } from '@/services/playlist/type';
import Image from 'next/image';

interface Props extends Playlist {}

const PlaylistCard = ({ thumbnail, title }: Props) => {
  return (
    <div className="flex items-center">
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

export default memo(PlaylistCard);
