'use client';

import { useState } from 'react';

import FormModal from '@/components/FormModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Withdrawal } from '@/services/user';
import { useRouter } from 'next/navigation';

const WithDraw = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleWithDraw = async () => {
    await Withdrawal();
    setOpen(true);
  };

  const handleModal = () => {
    router.push('/login');
  };

  return (
    <>
      <Card className="mb-[140px] border-0">
        <CardTitle>회원 탈퇴</CardTitle>
        <CardContent>
          <Button variant="withDraw" size="lg" className="w-full" onClick={handleWithDraw}>
            회원 탈퇴
          </Button>
        </CardContent>
      </Card>
      <FormModal
        content="정말 탈퇴하실건가요? (가지마요!)"
        open={open}
        setOpen={setOpen}
        handleModal={handleModal}
      />
    </>
  );
};

export default WithDraw;
