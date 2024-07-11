'use client';

import { useState } from 'react';

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AlertContents } from '@/utils/alertContents';

import { Button } from '../ui/button';

type Props = {
  content: string;
};

const AlertModal = ({ content }: Props) => {
  const [cancelWord, setCancelWord] = useState('');
  if (content === AlertContents.WITHDRAW) {
    setCancelWord('취소');
  } else if (content === AlertContents.PASSWORDWRONG) {
    setCancelWord('비번 찾기');
  }

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
          >
            확인
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default AlertModal;
