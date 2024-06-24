'use client';

import { useState } from 'react';

import { z } from 'zod';

import PasswordInput from '@/components/PasswordInput';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RegisterSchema } from '@/schemas/userSchema';
import { CheckEmail, SendEmail } from '@/services/user';
import { useUserStore } from '@/stores/User';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const RegisterPage = () => {
  const { registerUser } = useUserStore();
  const [emailCheck, setEmailCheck] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      username: '',
      nickname: '',
      password: '',
      passwordCheck: '',
    },
    mode: 'onChange',
  });

  const handleEmailCheck = async (email: string) => {
    const isEmailAvailable = await CheckEmail({ email });
    if (!isEmailAvailable) {
      form.setError('email', {
        type: 'manual',
        message: '비밀번호 찾기',
      });
      return;
    }
    setEmailCheck(true);
  };

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    await SendEmail({ email: data.email });
    registerUser({
      email: data.email,
      username: data.username,
      nickname: data.nickname,
      password: data.password,
    });
    router.push('/auth/register/email-validation');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-8">
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
            name="email"
            render={({ field, fieldState: { error } }) => (
              <div className="flex items-end justify-between gap-3">
                <FormItem className="w-full">
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="이메일을 입력해 주세요."
                      disabled={emailCheck}
                      isError={!!error}
                      errorText={error?.message}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
                <div>
                  <Button
                    disabled={!!error || !field.value}
                    variant="active"
                    font="medium"
                    className="h-[56px] w-[96px] desktop:h-[70px] desktop:w-[140px]"
                    onClick={() => handleEmailCheck(field.value)}
                  >
                    {emailCheck ? <CircleCheck size={26.6} /> : '중복 확인'}
                  </Button>
                  {error?.message && (
                    <p className="h-[45px] tablet:h-[49.5px] desktop:h-[28.5px]"></p>
                  )}
                </div>
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState: { error } }) => (
              <PasswordInput
                field={field}
                error={error}
                label="비밀번호"
                placeholder="비밀번호를 입력해 주세요"
              />
            )}
          />
          <FormField
            control={form.control}
            name="passwordCheck"
            render={({ field, fieldState: { error } }) => (
              <PasswordInput
                field={field}
                error={error}
                label="비밀번호 확인"
                placeholder="비밀번호를 입력해 주세요."
              />
            )}
          />
        </div>
        <Button
          type="submit"
          disabled={!emailCheck || !form.formState.isValid}
          variant="active"
          size="lg"
          className="mt-[45px] w-full tablet:mt-[56px]"
        >
          회원가입
        </Button>
      </form>
    </Form>
  );
};

export default RegisterPage;
