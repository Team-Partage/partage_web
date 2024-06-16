'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Withdrawal } from '@/services/user';

const WithDraw = () => {
  const handleWithDraw = async () => {
    await Withdrawal();
  };

  return (
    <Card className="mb-[140px] border-0">
      <CardTitle>회원 탈퇴</CardTitle>
      <CardContent>
        <Button variant="withDraw" size="lg" className="w-full" onClick={handleWithDraw}>
          회원 탈퇴
        </Button>
      </CardContent>
    </Card>
  );
};

export default WithDraw;
