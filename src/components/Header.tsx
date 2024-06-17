import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import Link from 'next/link';

import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

function Header() {
  return (
    <header className="flex h-[64px] w-full items-center justify-between border-b-1 border-neutral-400 px-[20px] tablet:h-[72px] tablet:px-[40px] desktop:h-[88px]">
      <h1 className="text-main-skyblue max-bold">Partage</h1>
      <div className="flex items-center gap-12">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="active" className="px-4 base-bold">
              <Plus width={20} height={20} strokeWidth={2} />
              채널 생성
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>채널 생성</DialogTitle>
            </DialogHeader>
            <Input placeholder="채널명을 입력해 주세요." />
            <Input placeholder="태그를 입력해 주세요." />
            <div className="flex justify-center">
              <Button variant="active">생성</Button>
            </div>
          </DialogContent>
        </Dialog>
        <Link className="base-regular" href="">
          로그인
        </Link>
        <Link className="base-regular" href="">
          회원가입
        </Link>
      </div>
    </header>
  );
}

export default Header;
