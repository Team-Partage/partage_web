import { Card, CardContent } from '@/components/ui/card';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <Card className="border-0 base-regular w-[335px] tablet:w-[440px] tablet:small-regular desktop:h-[360px] desktop:w-[640px]">
        <CardContent>{children}</CardContent>
      </Card>
    </main>
  );
};

export default layout;
