'use client';

import { useEffect, useState } from 'react';

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Withdrawal } from '@/services/user';
import { AlertContents } from '@/utils/alertContents';
import { PAGE_ROUTE } from '@/utils/route';
import { useRouter } from 'next/navigation';

import { Button } from '../ui/button';

type Props = {
  content: string;
};

const AlertModal = ({ content }: Props) => {
  const router = useRouter();
  const [cancelWord, setCancelWord] = useState('');
  const [actionWord, setActionWord] = useState('확인');

  useEffect(() => {
    switch (content) {
      case AlertContents.WITHDRAW:
        setCancelWord('취소');
        setActionWord('탈퇴');
        break;
      case AlertContents.PASSWORDWRONG:
        setCancelWord('비번 찾기');
        break;
      case AlertContents.DELETECHANNEL:
        setActionWord('삭제');
        break;
      case AlertContents.NOCHANNEL:
        setActionWord('로그인');
        break;
      default:
        setCancelWord('');
        setActionWord('확인');
    }
  }, [content]);

  const handleCancel = () => {
    if (content === AlertContents.PASSWORDWRONG) {
      router.push(`${PAGE_ROUTE.FINDPASSWORD}`);
    }
  };

  const handleClick = async () => {
    if (content === AlertContents.WITHDRAW) {
      await Withdrawal();
      router.push('/');
    }
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle className="hidden"></AlertDialogTitle>
        <AlertDialogDescription>{content}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        {cancelWord ? (
          <AlertDialogCancel asChild>
            <Button
              type="button"
              font="base"
              className="h-[42px] w-full bg-neutral-500 tablet:h-[48px] tablet:w-[100px]"
              onClick={handleCancel}
            >
              {cancelWord}
            </Button>
          </AlertDialogCancel>
        ) : (
          ''
        )}
        <AlertDialogAction asChild>
          <Button
            type="button"
            variant="active"
            font="base"
            className="h-[42px] w-full tablet:h-[48px] tablet:w-[100px]"
            onClick={handleClick}
          >
            {actionWord}
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default AlertModal;
