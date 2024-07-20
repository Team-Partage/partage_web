'use client';

import { useEffect, useRef, useState } from 'react';

import { z } from 'zod';

import AlertModalRenderer from '@/components/AlertModalRenderer';
import ColorChips from '@/components/ColorChips';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DOMAIN } from '@/constants/domains';
import { fetcher } from '@/lib/fetcher';
import { MypageSchema } from '@/schemas/userSchema';
import { CheckNickname, EditProfile, EditProfileImage } from '@/services/user';
import { EditProfileColorRequest, GetUserResponse, NicknameRequest } from '@/services/user/type';
import { useUserStore } from '@/stores/User';
import { AlertContents } from '@/utils/alertContents';
import { hexToColorName } from '@/utils/hexToColorName';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImageUp } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useForm, useWatch } from 'react-hook-form';

const EditMyInfo = () => {
  const {
    email,
    nickname,
    profile_color,
    profile_image,
    setNickname,
    setProfileColor,
    setProfileImage,
  } = useUserStore();
  const { data: session } = useSession();
  const [selectedColor, setSelectedColor] = useState<string>(profile_color);
  const fileRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [fileData, setFileData] = useState<File>();
  const modalRef = useRef({ openModal: () => {} });

  const form = useForm<z.infer<typeof MypageSchema>>({
    resolver: zodResolver(MypageSchema),
    defaultValues: {
      email: email,
      nickname: nickname,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    form.reset({
      email,
      nickname,
    });
  }, [email, nickname, form]);

  useEffect(() => {
    if (profile_image) {
      setImagePreview(profile_image);
    }
  }, [profile_image]);

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
    }
    const requests = [EditProfile<NicknameRequest>({ nickname: data.nickname })];

    if (selectedColor) {
      requests.push(EditProfile<EditProfileColorRequest>({ profile_color: selectedColor }));
    }

    if (fileData) {
      const formData = new FormData();
      formData.append('profileImage', fileData);
      requests.push(EditProfileImage(formData));
    }

    try {
      await Promise.all(requests);
      modalRef.current?.openModal();
      try {
        const UserInfo = async () => {
          const accesstoken = session?.user.accessToken;
          const data = await fetcher.get<GetUserResponse>(
            `${DOMAIN.USER}/me`,
            {},
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accesstoken}`,
              },
            },
          );
          const { user } = data;
          if (user) {
            setNickname(user.nickname);
            setProfileColor(user.profile_color);
            setProfileImage(user.profile_image);
          }
        };
        UserInfo();
      } catch (err) {
        console.log(`Fetching getUsers: ${err}`);
      }
    } catch (err) {
      alert('에러');
    }
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
                    selected={hexToColorName(profile_color)}
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
              <AlertModalRenderer ref={modalRef} type="AlertModal" content={AlertContents.PROFILE}>
                <Button
                  type="submit"
                  disabled={
                    !form.formState.isValid ||
                    (watchedNickname === nickname && selectedColor === profile_color && !!fileData)
                  }
                  variant="active"
                  size="lg"
                  className="mt-[56px] w-full"
                >
                  저장
                </Button>
              </AlertModalRenderer>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default EditMyInfo;
