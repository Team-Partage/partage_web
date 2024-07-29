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
import { MypageSchema } from '@/schemas/userSchema';
import {
  CheckNickname,
  EditProfile,
  EditProfileImage,
  UserInfo,
} from '@/services/user/index_client';
import { EditProfileColorRequest, NicknameRequest } from '@/services/user/type';
import { useUserStore } from '@/stores/User';
import { AlertContents } from '@/utils/alertContents';
import { hexToColorName } from '@/utils/hexToColorName';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImageUp } from 'lucide-react';
import { useForm, useWatch } from 'react-hook-form';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MIN_IMAGE_WIDTH = 240;
const MIN_IMAGE_HEIGHT = 240;
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/jpg'];

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

  const [selectedColor, setSelectedColor] = useState<string>(profile_color);
  const fileRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [fileData, setFileData] = useState<File>();
  const modalRef = useRef({ openModal: () => {}, closeModal: () => {} });

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
    if (profile_color) {
      setSelectedColor(profile_color);
    }
  }, [profile_image, profile_color]);

  const watchedNickname = useWatch({ control: form.control, name: 'nickname' });

  // 파일 유효성 검증 함수
  const validateImageFile = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const fileReader = new FileReader();
      const image = new Image();

      // 파일 포맷 및 크기 확인
      if (!SUPPORTED_FORMATS.includes(file.type)) {
        alert('지원되지 않는 이미지 형식입니다. .jpg, .jpeg, .png 파일만 가능합니다.');
        return resolve(false);
      }

      if (file.size > MAX_FILE_SIZE) {
        alert('이미지 파일 크기가 5MB를 초과합니다.');
        return resolve(false);
      }

      fileReader.onload = (e) => {
        if (e.target?.result) {
          image.src = e.target.result as string;

          image.onload = () => {
            // 이미지 너비 및 높이 확인
            if (image.width < MIN_IMAGE_WIDTH || image.height < MIN_IMAGE_HEIGHT) {
              alert('이미지의 최소 크기는 240x240 픽셀입니다.');
              return resolve(false);
            }

            resolve(true);
          };

          image.onerror = () => {
            alert('이미지 파일을 읽을 수 없습니다.');
            resolve(false);
          };
        }
      };

      fileReader.onerror = () => {
        alert('이미지 파일을 읽을 수 없습니다.');
        resolve(false);
      };

      fileReader.readAsDataURL(file);
    });
  };

  const addPreviewImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      if (file) {
        // 이미지 파일 유효성 검사
        const isValid = await validateImageFile(file);
        if (!isValid) {
          return;
        }

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
    modalRef.current?.closeModal();
    await UserInfo();
    const requests = [];
    if (watchedNickname !== nickname) {
      try {
        await CheckNickname({ nickname: data.nickname });
      } catch (err) {
        form.setError('nickname', {
          type: 'manual',
          message: '이미 사용 중인 닉네임이에요.',
        });
        return;
      }
      requests.push(EditProfile<NicknameRequest>({ nickname: data.nickname }));
    }

    if (selectedColor !== profile_color) {
      requests.push(EditProfile<EditProfileColorRequest>({ profile_color: selectedColor }));
    }

    if (fileData) {
      const formData = new FormData();
      formData.append('profileImage', fileData);
      console.log(typeof formData);

      requests.push(EditProfileImage(formData));
    }
    if (!requests.length) return;

    try {
      await Promise.all(requests);
      modalRef.current?.openModal();

      const data = await UserInfo();
      const { user } = data;
      if (user) {
        setNickname(user.nickname);
        setProfileColor(user.profile_color);
        setProfileImage(user.profile_image);
      }
    } catch (err) {
      console.log(err);
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
                    (watchedNickname === nickname && selectedColor === profile_color && !fileData)
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
