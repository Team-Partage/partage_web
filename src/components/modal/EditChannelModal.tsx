'use client';

import { useEffect, useRef, useState } from 'react';

import { z } from 'zod';

import { Checkbox } from '@/components/ui/checkbox';
import { PERMISSIONLIST } from '@/constants/permission';
import { ChannelSchema } from '@/schemas/channelSchema';
import { editChannel, editChannelPermission, getChannelDetail } from '@/services/channel';
import { Channel, ChannelPermission } from '@/services/channel/type';
import { usePermissionStore } from '@/stores/usePermissionStore';
import { AlertContents } from '@/utils/alertContents';
import { hexToColorName } from '@/utils/hexToColorName';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';

import AlertModalRenderer from '../AlertModalRenderer';
import ColorChips from '../ColorChips';
import TagInput from '../TagInput';
import { Button } from '../ui/button';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '../ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';

const EditChannelModal = () => {
  const params = useParams() as { channel_id: string };
  const modalRef = useRef({ openModal: () => {} });
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const { channelPermission } = usePermissionStore(
    useShallow((state) => ({ channelPermission: state.channelPermission })),
  );

  const [channel, setChannel] = useState<Channel>();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const form = useForm<z.infer<typeof ChannelSchema>>({
    resolver: zodResolver(ChannelSchema),
    defaultValues: {
      privateType: false,
      channelName: '',
      channelTag: '',
      permission: [],
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
      console.log('channelPermission: ', channelPermission);
      const keys = Object.keys(channelPermission) as Array<keyof ChannelPermission>;
      console.log('keys: ', keys);

      // 'C0100' 값을 가진 권한(관리자)을 찾아 permission 배열에 추가
      const permissionsArray = (
        Object.keys(channelPermission) as Array<keyof ChannelPermission>
      ).filter((key) => channelPermission[key] === 'C0100');
      console.log('perA:', permissionsArray);

      form.reset({
        channelName: data.channel.name,
        channelTag: data.channel.hashtag,
        privateType,
        permission: permissionsArray,
      });
    };
    getData();
  }, [params.channel_id, channelPermission]);

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

    /** C0100: 관리자 / C0200: 일반 사용자 */
    const permissionDto: ChannelPermission = {
      playlist_add: 'C0000',
      playlist_remove: 'C0000',
      playlist_move: 'C0000',
      video_play: 'C0000',
      video_seek: 'C0000',
      chat_delete: 'C0000',
      ban: 'C0000',
      chat_send: 'C0200',
      video_skip: 'C0000',
    };
    // data.permission 배열에 있는 키 값을 'C0100'으로 변경
    data.permission.forEach((permission) => {
      if (permission in permissionDto) {
        permissionDto[permission as keyof typeof permissionDto] = 'C0100';
      }
    });
    await editChannelPermission(params.channel_id, permissionDto);

    if (dialogCloseRef.current) {
      dialogCloseRef.current.click();
    }
  };

  const handleDeleteChannel = async () => {
    modalRef.current.openModal;
  };

  return (
    <DialogContent className="h-[578px] min-w-[335px] gap-7 overflow-hidden tablet:h-[688px] tablet:gap-8 desktop:h-[752px]">
      <DialogClose ref={dialogCloseRef}>
        <X className="absolute right-[16px] top-[16px] size-[25px] text-right tablet:right-[20px] tablet:top-[20px] tablet:size-[32px]" />
      </DialogClose>
      <DialogHeader>
        <DialogTitle>채널 설정</DialogTitle>
      </DialogHeader>
      {!channel ? (
        <p>채널 정보를 불러오는데 실패했습니다. 다시 시도해주세요!</p>
      ) : (
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
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-[10px] tablet:mb-4">
                      <FormLabel>관리자 권한</FormLabel>
                      <FormDescription>관리자에게 부여할 권한을 선택할 수 있어요</FormDescription>
                    </div>
                    <div className="flex flex-wrap">
                      {PERMISSIONLIST.map((item) => (
                        <div key={item.id} className="w-full space-x-3 space-y-4 tablet:w-1/2">
                          <Checkbox
                            checked={(field.value || []).includes(item.id)}
                            onCheckedChange={(checked) => {
                              console.log('checked', checked);

                              console.log('field.value: ', field.value); // 여기가 왜 undefined로 떠?
                              const updatedValues = checked
                                ? [...(field.value || []), item.id] // `field.value`가 없을 경우 빈 배열로 처리
                                : (field.value || []).filter((value) => value !== item.id);

                              field.onChange(updatedValues);
                            }}
                          />
                          <FormLabel className="small-regular desktop:base-regular">
                            {item.label}
                          </FormLabel>
                        </div>
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
