import { useState } from 'react';

import ColorChips from '../ColorChips';
import TagInput from '../TagInput';
import { Button } from '../ui/button';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const CreateChannelModal = () => {
  const [color, setColor] = useState('');

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>채널 생성</DialogTitle>
      </DialogHeader>
      <div>
        <Label htmlFor="channelName">채널명</Label>
        <Input id="channelName" placeholder="채널명을 입력해 주세요." />
      </div>
      <div className="min-w-0">
        <Label htmlFor="channelTag">태그</Label>
        <TagInput id="channelTag" placeholder="태그명을 입력해 주세요." color={color} />
      </div>
      <div>
        <Label>채널 컬러</Label>
        <ColorChips colors={['orange', 'green']} />
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
