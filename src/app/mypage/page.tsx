'use client';

import { z } from 'zod';

import ColorChips from '@/components/ColorChips';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import PasswordCheck from './_components/PasswordCheck';
import WithDraw from './_components/WithDraw';

const MypageSchema = z.object({
  email: z.string().email('이메일 형식에 맞게 작성해주세요.'),
  nickname: z.string().min(1, '닉네임을 입력해주세요.'),
});

const Mypage = () => {
  const form = useForm<z.infer<typeof MypageSchema>>({
    resolver: zodResolver(MypageSchema),
    defaultValues: {
      email: '',
      nickname: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: z.infer<typeof MypageSchema>) => {
    console.log(data);
  };

  return (
    <div className="mt-[40px] flex w-full flex-col items-center justify-center ">
      <div className="flex w-[640px] flex-col gap-[100px]">
        <Card className="border-0">
          <CardTitle>프로필</CardTitle>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex h-[240px] gap-[28px]">
                  <Avatar className="size-[240px]">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>profile-image</AvatarFallback>
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
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <ColorChips size={'h-[60px] w-[60px]'} selectedSize={'h-[70px] w-[70px]'} count={9}>
                  닉네임 컬러
                </ColorChips>
                <Button
                  type="submit"
                  disabled={!form.formState.isValid}
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
        <PasswordCheck />
        <WithDraw />
      </div>
    </div>
  );
};

export default Mypage;
