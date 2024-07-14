'use client';

import { useRef } from 'react';

import AlertModalRenderer from '@/components/AlertModalRenderer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { AlertContents } from '@/utils/alertContents';

const WithDraw = () => {
  const modalRef = useRef({ openModal: () => {} });

  const handleClick = async () => {
    modalRef.current?.openModal();
  };

  return (
    <>
      <Card className="mb-[140px] border-0">
        <CardTitle>회원 탈퇴</CardTitle>
        <CardContent>
          <AlertModalRenderer ref={modalRef} type="AlertModal" content={AlertContents.WITHDRAW}>
            <Button variant="withDraw" size="lg" className="w-full" onClick={handleClick}>
              회원 탈퇴
            </Button>
          </AlertModalRenderer>
        </CardContent>
      </Card>
    </>
  );
};

export default WithDraw;
