'use client';

import { useEffect, useRef, useState } from 'react';

import { z } from 'zod';

import { Checkbox } from '@/components/ui/checkbox';
import { ChannelSchema } from '@/schemas/channelSchema';
import { editChannel, getChannelDetail } from '@/services/channel';
import { Channel } from '@/services/channel/type';
import { AlertContents } from '@/utils/alertContents';
import { hexToColorName } from '@/utils/hexToColorName';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import AlertModalRenderer from '../AlertModalRenderer';
import ColorChips from '../ColorChips';
import TagInput from '../TagInput';
import { Button } from '../ui/button';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '../ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';

const permissions = [
  {
    id: 'video_play',
    label: '재생 / 정지',
  },
  {
    id: 'playlist_move',
    label: '재생시간 이동',
  },
  {
    id: 'chat_delete',
    label: '채팅 삭제',
  },
  {
    id: 'playlist_add',
    label: '플레이리스트 추가',
  },
  {
    id: 'playlist_move',
    label: '플레이리스트 순서 이동',
  },
  {
    id: 'playlist_delete',
    label: '플레이리스트 제거',
  },
] as const;

const EditChannelModal = () => {
  const router = useRouter();
  const params = useParams() as { channel_id: string };
  const modalRef = useRef({ openModal: () => {} });
  const [channel, setChannel] = useState<Channel>();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const form = useForm<z.infer<typeof ChannelSchema>>({
    resolver: zodResolver(ChannelSchema),
    defaultValues: {
      privateType: false,
      channelName: '',
      channelTag: '',
      permission: ['video_play', 'playlist_move'],
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
    // TODO 모달만 닫히도록
    router.back();
  };

  const handleDeleteChannel = async () => {
    modalRef.current.openModal;
  };

  return (
    <DialogContent className="h-[578px] min-w-[335px] gap-7 overflow-hidden tablet:h-[688px] tablet:gap-8 desktop:h-[752px]">
      <DialogClose>
        <X className="absolute right-[16px] top-[16px] size-[25px] text-right tablet:right-[20px] tablet:top-[20px] tablet:size-[32px]" />
      </DialogClose>
      <DialogHeader>
        <DialogTitle>채널 설정</DialogTitle>
      </DialogHeader>
      {channel && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} onKeyDown={(e) => checkKeyDown(e)}>
            <div className="h-[400px] space-y-8 overflow-auto tablet:h-[468px] desktop:h-[532px]">
              {/* type */}
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
              {/* 채널 권한 */}
              <FormField
                control={form.control}
                name="permission"
                render={() => (
                  <FormItem>
                    <div className="mb-[10px] tablet:mb-4">
                      <FormLabel>관리자 권한</FormLabel>
                      <FormDescription>관리자에게 부여할 권한을 선택할 수 있어요</FormDescription>
                    </div>
                    <div className="flex flex-wrap">
                      {permissions.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="permission"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="w-full space-x-3 space-y-4 tablet:w-1/2"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, item.id])
                                        : field.onChange(
                                            field.value?.filter((value) => value !== item.id),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="small-regular desktop:base-regular">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>삭제</FormLabel>
                <FormDescription>‘채널 삭제’ 버튼을 누르면 즉시 채널이 삭제돼요.</FormDescription>
                <AlertModalRenderer type="AlertModal" content={AlertContents.DELETECHANNEL}>
                  <Button variant="withDraw" className="mt-4" onClick={handleDeleteChannel}>
                    채널 삭제
                  </Button>
                </AlertModalRenderer>
              </FormItem>
            </div>
            <DialogFooter className="h-[62px] items-center justify-center tablet:h-[104px]">
              <Button type="submit" className="w-full tablet:w-fit" variant="active">
                저장
              </Button>
            </DialogFooter>
          </form>
        </Form>
      )}
    </DialogContent>
  );
};

export default EditChannelModal;
