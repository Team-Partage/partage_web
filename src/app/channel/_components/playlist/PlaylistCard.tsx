import Image from 'next/image';

const PlaylistCard = () => {
  return (
    <div className="flex w-[320px] items-center rounded-lg border border-transparent p-3 transition-colors hover:border-main-skyblue hover:bg-main-skyblue/20">
      <Image
        className="h-[42px] rounded object-cover"
        src="https://cdn.pet-news.or.kr/news/photo/202304/2903_4444_3536.jpg"
        width={42}
        height={42}
        alt="thumbnail"
      />
      <p className="ml-4 text-foreground-high small-regular">Lorem Ipsum</p>
    </div>
  );
};

export default PlaylistCard;
