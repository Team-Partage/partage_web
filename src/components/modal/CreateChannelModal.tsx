'use client';

import { useReducer } from 'react';

import { createChannel } from '@/services/channel';
import { CreateChannelReq } from '@/services/channel/type';

import ColorChips from '../ColorChips';
import TagInput from '../TagInput';
import { Button } from '../ui/button';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const initialState: CreateChannelReq = {
  type: 'PUBLIC',
  channel_color: '',
  hashtag: '',
  name: '',
};

type ActionType<T> = {
  [K in keyof T]: { type: K; payload: T[K] };
}[keyof T];

const reducer = (
  state: CreateChannelReq,
  action: ActionType<CreateChannelReq>,
): CreateChannelReq => {
  switch (action.type) {
    case 'name':
      return { ...state, name: action.payload };
    case 'hashtag':
      return { ...state, hashtag: action.payload };
    case 'channel_color':
      return { ...state, channel_color: action.payload };
    case 'type':
      return { ...state, type: action.payload };
    default:
      return state;
  }
};

const CreateChannelModal = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = () => {
    /**
     * TODO: accessToken 처리 필요
     * TODO: 요청 성공 시 채널 페이지로 이동
     */
    createChannel(state);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>채널 생성</DialogTitle>
      </DialogHeader>
      <div>
        <Label htmlFor="channelName">채널명</Label>
        <Input
          id="channelName"
          placeholder="채널명을 입력해 주세요."
          onChange={(e) => dispatch({ type: 'name', payload: e.target.value })}
        />
      </div>
      <div className="min-w-0">
        <Label htmlFor="channelTag">태그</Label>
        <TagInput
          id="channelTag"
          placeholder="태그명을 입력해 주세요."
          color={state.channel_color}
          onChange={(tags) => dispatch({ type: 'hashtag', payload: tags })}
        />
      </div>
      <div>
        <Label>채널 컬러</Label>
        <div className="flex w-full flex-wrap gap-5">
          <ColorChips
            colors={['skyblue', 'lightGreen', 'yellow', 'peach', 'violet', 'blue']}
            onChange={(color) => dispatch({ type: 'channel_color', payload: color })}
          />
        </div>
      </div>
      <DialogFooter>
        <Button
          variant="active"
          disabled={state.name === '' || state.hashtag.length === 0}
          onClick={handleSubmit}
        >
          생성
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default CreateChannelModal;
