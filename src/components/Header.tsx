'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUserStore } from '@/stores/User';
import { PAGE_ROUTE } from '@/utils/route';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

import ModalRenderer from './ModalRenderer';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

function Header() {
  const router = useRouter();
  const { data: session } = useSession();

  const profileImage = useUserStore((state) => state.profile_image);
  const clearUser = useUserStore((state) => state.clearUser);

  const handleLogout = () => {
    signOut();
    clearUser();
  };

  return (
    <header className="flex min-h-[68px] w-full min-w-[375px] items-center justify-between border-b-1 border-neutral-400 px-5 tablet:min-h-[76px] tablet:px-10 desktop:min-h-[84px]">
      <Link
        href={PAGE_ROUTE.HOME}
        className="relative h-[28px] w-[92px] tablet:h-[32px] tablet:w-[105px] desktop:h-[36px] desktop:w-[120px]"
      >
        <Image src="/logo.svg" alt="partage 로고" fill style={{ objectFit: 'cover' }} />
      </Link>
      <div className="flex items-center gap-[20px] tablet:gap-[40px] desktop:gap-[44px]">
        <ModalRenderer type="CreateChannelModal">
          <Button
            variant="active"
            className="size-[40px] gap-[4px] px-0 tablet:h-[48px] tablet:w-[112px] desktop:h-[54px] desktop:w-[131px]"
          >
            <div className="relative size-[24px] shrink-0 desktop:size-[28px]">
              <Image src="/plus_bk.svg" alt="채널을 생성하는 플러스 모양의 버튼" fill />
            </div>
            <span className="hidden small-bold tablet:inline-block desktop:base-bold">
              채널 생성
            </span>
          </Button>
        </ModalRenderer>
        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="group size-[40px] cursor-pointer tablet:size-[48px] desktop:size-[54px]">
                <AvatarImage
                  className="object-cover"
                  src={profileImage || '/default-profile-image.png'}
                />
                <AvatarFallback>profile_image</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-[20px] tablet:mr-[40px]">
              <DropdownMenuItem onClick={() => router.push('/mypage')}>
                사용자 설정
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>로그아웃</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Link className="tablet:small-regular desktop:base-regular" href={PAGE_ROUTE.LOGIN}>
              로그인
            </Link>
            <Link className="tablet:small-regular desktop:base-regular" href={PAGE_ROUTE.REGISTER}>
              회원가입
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
