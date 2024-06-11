import { Button } from '@/components/ui/button';
import { getChannelList } from '@/services/channel';
import { Plus } from 'lucide-react';

const Home = async () => {
  const channels = await getChannelList();

  if (channels.page.total_count === 0) {
    return (
      <div className="border border-dashed">
        <p>생성된 채널이 없어서 조용하네요!</p>
        <Button variant="active" className="px-4 base-bold">
          <Plus width={20} height={20} strokeWidth={2} />
          채널 생성
        </Button>
      </div>
    );
  }
  return (
    <div className="flex h-[400px] min-h-[350px] min-w-[280px] max-w-[800px] flex-col items-center justify-center rounded-lg border border-dashed border-[#43B0FF] mobile:max-w-[280px] tablet:h-[350px] tablet:max-w-[532px]">
      <div className="flex flex-col items-center gap-12">
        <p>생성된 채널이 없어서 조용하네요!</p>
        <Button variant="active" className="w-full px-4 base-bold">
          <Plus width={20} height={20} strokeWidth={2} />
          채널 생성
        </Button>
      </div>
    </div>
  );
};

export default Home;
