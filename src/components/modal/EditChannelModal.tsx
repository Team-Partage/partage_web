'use client';

import { useEffect, useRef, useState } from 'react';

import { z } from 'zod';

import { ChannelSchema } from '@/schemas/channelSchema';
import { editChannel, getChannelDetail } from '@/services/channel';
import { Channel } from '@/services/channel/type';
import { AlertContents } from '@/utils/alertContents';
import { hexToColorName } from '@/utils/hexToColorName';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

import AlertModalRenderer, { AlertModalImperativeHandle } from '../AlertModalRenderer';
import ColorChips from '../ColorChips';
import TagInput from '../TagInput';
import { Button } from '../ui/button';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '../ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Switch } from '../ui/switch';

const EditChannelModal = () => {
  const params = useParams() as { channel_id: string };
  const modalRef = useRef<AlertModalImperativeHandle>({
    openModal: () => {},
    closeModal: () => {},
  });
  const [channel, setChannel] = useState<Channel>();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const form = useForm<z.infer<typeof ChannelSchema>>({
    resolver: zodResolver(ChannelSchema),
    defaultValues: {
      privateType: false,
      channelName: '',
      channelTag: '',
    },
  });

  useEffect(() => {
    const getData = async () => {
      const data = await getChannelDetail(params.channel_id);
      setChannel(data?.channel);
      let privateType = false;
      if (data.channel.type === 'PRIVATE') {
        privateType = true;
      }
      form.reset({
        channelName: data.channel.name,
        channelTag: data.channel.hashtag,
        privateType,
      });
    };
    getData();
  }, [params.channel_id]);

  const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  const onSubmit = async (data: z.infer<typeof ChannelSchema>) => {
    let type: 'PUBLIC' | 'PRIVATE';
    if (data.privateType === false) {
      type = 'PUBLIC';
    } else {
      type = 'PRIVATE';
    }
    const dto = {
      type,
      channel_color: selectedColor ? selectedColor : '',
      hashtag: data.channelTag,
      name: data.channelName,
    }; // type 제외 다 빈값 가능
    await editChannel(params.channel_id, dto);
  };

  const handleDeleteChannel = async () => {
    modalRef.current.openModal;
  };

  return (
    <DialogContent className="min-w-[335px] gap-7 tablet:gap-8">
      <DialogClose>
        <X className="absolute right-[16px] top-[16px] size-[25px] text-right tablet:right-[20px] tablet:top-[20px] tablet:size-[32px]" />
      </DialogClose>
      <DialogHeader>
        <DialogTitle>채널 설정</DialogTitle>
      </DialogHeader>
      {channel && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} onKeyDown={(e) => checkKeyDown(e)}>
            {/* type */}
            <div className="space-y-8">
              <FormField
                control={form.control}
                name="privateType"
                render={({ field }) => (
                  <FormItem className="flex w-full justify-center">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-readonly
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* name */}
              <FormField
                control={form.control}
                name="channelName"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel>채널명</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="채널명을 입력해 주세요."
                        isError={!!error}
                        errorText={error?.message}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* hashtag */}
              <FormField
                control={form.control}
                name="channelTag"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>태그</FormLabel>
                    <FormControl>
                      <TagInput
                        placeholder="태그명을 입력해 주세요."
                        color={selectedColor ? selectedColor : 'skyblue'}
                        value={field.value}
                        onChange={(tags) => field.onChange(tags)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* channel_color */}
              <div>
                <Label>채널 컬러</Label>
                <div className="flex justify-between">
                  <ColorChips
                    selected={
                      channel.channel_color ? hexToColorName(channel.channel_color) : 'skyblue'
                    }
                    colors={['skyblue', 'lightGreen', 'yellow', 'peach', 'violet']}
                    onChange={(color) => setSelectedColor(color)}
                  />
                </div>
              </div>
              {/* TODO 라디오 value값 수정필요 */}
              {/* <FormField
                control={form.control}
                name="channelTag"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel>관리자 권한</FormLabel>
                    <FormDescription>관리자에게 부여할 권한을 선택할 수 있어요</FormDescription>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="mt-[10px] tablet:mb-[24px] tablet:mt-[16px]"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="video_play" />
                          </FormControl>
                          <FormLabel className="font-normal">재생 / 정지</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="playlist_move" />
                          </FormControl>
                          <FormLabel className="font-normal">재생시간 이동</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="chat_delete" />
                          </FormControl>
                          <FormLabel className="font-normal">채팅 삭제</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="playlist_add" />
                          </FormControl>
                          <FormLabel className="font-normal">플레이리스트 추가</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="playlist_move" />
                          </FormControl>
                          <FormLabel className="font-normal">플레이리스트 순서 이동</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="none" />
                          </FormControl>
                          <FormLabel className="font-normal">플레이리스트 제거</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              /> */}
              <FormItem>
                <FormLabel>삭제</FormLabel>
                <FormDescription>‘채널 삭제’ 버튼을 누르면 즉시 채널이 삭제돼요.</FormDescription>
                <AlertModalRenderer type="AlertModal" content={AlertContents.DELETECHANNEL}>
                  <Button variant="withDraw" className="mt-4" onClick={handleDeleteChannel}>
                    채널 삭제
                  </Button>
                </AlertModalRenderer>
              </FormItem>
              <DialogFooter className="items-center">
                <Button type="submit" className="w-full tablet:w-fit" variant="active">
                  저장
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      )}
    </DialogContent>
  );
};

export default EditChannelModal;
