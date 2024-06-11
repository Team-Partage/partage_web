'use client';

import { useState } from 'react';

import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SignUp } from '@/services/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import FormModal from '../../../components/FormModal';

const RegisterSchema = z.object({
  email: z.string().email('이메일 형식에 맞게 작성해주세요.'),
  username: z.string().min(1, '이름을 입력해주세요.'),
  nickname: z.string().min(1, '닉네임을 입력해주세요.'),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .max(16, '비밀번호는 최대 16자까지 가능합니다.')
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/,
      '비밀번호는 영문, 숫자, 특수문자가 포함된 8~16자여야 합니다.',
    ),
});

const RegisterPage = () => {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      username: '',
      nickname: '',
      password: '',
    },
    mode: 'onChange',
  });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    try {
      await SignUp(data);
      setOpen(true);
    } catch (err) {
      throw new Error(`${err}`);
    }
  };

  const handleModal = () => {
    router.push('/login');
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="h-[360px] w-[645px] border-0 base-regular mobile:w-[335px] tablet:w-[440px] tablet:small-regular ">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState: { error } }) => (
                    <FormItem>
                      <FormLabel>이메일</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="이메일을 입력해 주세요."
                          isError={!!error}
                          errorText={error?.message}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field, fieldState: { error } }) => (
                    <FormItem>
                      <FormLabel>이름</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="이름을 입력해 주세요."
                          isError={!!error}
                          errorText={error?.message}
                          {...field}
                        />
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
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, fieldState: { error } }) => (
                    <FormItem>
                      <FormLabel>비밀번호</FormLabel>
                      <FormControl>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="비밀번호를 영문, 숫자, 특수문자가 포함된 8~16자로 입력해 주세요."
                          isError={!!error}
                          errorText={error?.message}
                          endAdornment={
                            <button type="button" onClick={togglePassword}>
                              {showPassword ? (
                                <Eye className="mr-2 h-[20px] text-neutral-200 " />
                              ) : (
                                <EyeOff className="mr-2 h-[20px] text-neutral-200 " />
                              )}
                            </button>
                          }
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                disabled={!form.formState.isValid}
                variant="active"
                size="lg"
                className="mt-[44px] w-full"
              >
                회원가입
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <FormModal
        content="회원가입이 완료되었어요!"
        handleModal={handleModal}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default RegisterPage;
