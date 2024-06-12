import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

const WithDraw = () => {
  return (
    <Card className='mb-[140px] border-0'>
      <CardTitle>회원 탈퇴</CardTitle>
      <CardContent>
        <Button variant="withDraw" size="lg" className="w-full">
          회원 탈퇴
        </Button>
      </CardContent>
    </Card>
  );
};

export default WithDraw;
