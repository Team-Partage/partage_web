import ColorChips from '../ColorChips';
import { Button } from '../ui/button';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const CreateChannelModal = () => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>채널 생성</DialogTitle>
      </DialogHeader>
      <div>
        <Label htmlFor="channelName">채널명</Label>
        <Input id="channelName" placeholder="채널명을 입력해 주세요." />
      </div>
      <div>
        <Label htmlFor="channelTag">태그</Label>
        <Input id="channelTag" placeholder="태그명을 입력해 주세요." />
      </div>
      <div>
        <Label htmlFor="channelTag">채널 컬러</Label>
        <ColorChips
          size={'size-[60px]'}
          selectedSize={'size-[70px]'}
          count={3}
          onColorSelect={() => {}}
        >
          닉네임 컬러
        </ColorChips>
      </div>
      <DialogFooter>
        <Button variant="active" disabled={true}>
          생성
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default CreateChannelModal;
