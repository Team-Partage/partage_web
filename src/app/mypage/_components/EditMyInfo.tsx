'use client';

import { useRef, useState } from 'react';

import { z } from 'zod';

import ColorChips from '@/components/ColorChips';
import FormModal from '@/components/FormModal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MypageSchema } from '@/schemas/userSchema';
import { CheckNickname, EditProfile, EditProfileImage } from '@/services/user';
import { EditProfileColorRequest, NicknameRequest } from '@/services/user/type';
import { hexToColorName } from '@/utils/hexToColorName';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImageUp } from 'lucide-react';
import { useForm, useWatch } from 'react-hook-form';

const EditMyInfo = () => {
  const [open, setOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const fileRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [fileData, setFileData] = useState<File>();
  // TODO zustand 유저정보 가져오기
  const mynickname = '테스트';

  const form = useForm<z.infer<typeof MypageSchema>>({
    resolver: zodResolver(MypageSchema),
    defaultValues: {
      //  TODO zustand의 유저정보 가져오기
      email: 't2@gmail.com',
      nickname: mynickname,
    },
    mode: 'onChange',
  });

  const watchedNickname = useWatch({ control: form.control, name: 'nickname' });

  const addPreviewImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      if (file) {
        setFileData(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        await new Promise((resolve) => {
          reader.onload = () => {
            setImagePreview(reader.result as string);
            resolve(null);
          };
        });
      }
    }
  };

  const handleImageClick = () => {
    fileRef?.current?.click();
  };

  const onSubmit = async (data: z.infer<typeof MypageSchema>) => {
    const isNicknameAvailable = await CheckNickname({ nickname: data.nickname });
    if (!isNicknameAvailable) {
      form.setError('nickname', {
        type: 'manual',
        message: '이미 사용 중인 닉네임이에요.',
      });
      return;
    } else {
      await EditProfile<NicknameRequest>('nickname', { nickname: data.nickname });
    }

    if (selectedColor) {
      await EditProfile<EditProfileColorRequest>('profile-color', { profile_color: selectedColor });
    }

    if (fileData) {
      const formData = new FormData();
      formData.append('file', fileData);
      await EditProfileImage(formData);
    }

    setOpen(true);
  };

  const handleModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Card className="border-0">
        <CardTitle>프로필</CardTitle>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex h-[240px] gap-[28px]">
                <Avatar className="group size-[240px]">
                  <AvatarImage
                    className="object-cover"
                    src={imagePreview || '/default-profile-image.png'}
                  />
                  <AvatarFallback>profile-image</AvatarFallback>
                  <label
                    htmlFor="image"
                    className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-transparent transition-all group-hover:bg-gray-200/30"
                    onClick={handleImageClick}
                  >
                    <ImageUp className="z-10 hidden size-[40px] text-main-skyblue transition-opacity duration-300 group-hover:block" />
                  </label>
                  <input
                    style={{ display: 'none' }}
                    id="image"
                    name="image"
                    type="file"
                    accept=".png, .jpeg, .jpg"
                    onChange={(e) => addPreviewImage(e)}
                  />
                </Avatar>
                <div className="w-full space-y-8">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>이메일</FormLabel>
                        <FormControl>
                          <Input type="text" disabled {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nickname"
                    render={({ field, fieldState: { error } }) => (
                      <FormItem>
                        <FormLabel>닉네임</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="닉네임을 입력해 주세요."
                            isError={!!error}
                            errorText={error?.message}
                            {...field}
                            style={{ color: selectedColor }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div>
                <Label>닉네임 컬러</Label>
                <div className="flex flex-wrap gap-3">
                  <ColorChips
                    selected={hexToColorName('#FFE100')}
                    size="user"
                    colors={[
                      'skyblue',
                      'lightGreen',
                      'green',
                      'blue',
                      'violet',
                      'pink',
                      'yellow',
                      'orange',
                      'peach',
                    ]}
                    onChange={(color) => setSelectedColor(color)}
                  />
                </div>
              </div>
              <Button
                type="submit"
                disabled={!form.formState.isValid || watchedNickname === mynickname}
                variant="active"
                size="lg"
                className="mt-[56px] w-full"
              >
                저장
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <FormModal
        content="프로필 정보가 변경되었어요!"
        handleModal={handleModal}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default EditMyInfo;
