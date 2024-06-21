'use client';

import { useState } from 'react';

import { z } from 'zod';

import PasswordInput from '@/components/PasswordInput';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RegisterSchema } from '@/schemas/userSchema';
import { SignUp } from '@/services/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import FormModal from '../../../components/FormModal';

const RegisterPage = () => {
  const [open, setOpen] = useState(false);
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
                    className="desktop:h-[70px] desktop:w-[140px]"
                  ></Button>
                  {error?.message && <p className="desktop:h-[28px]"></p>}
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
          disabled={!form.formState.isValid}
          variant="active"
          size="lg"
          className="mt-[44px] w-full"
        >
          회원가입
        </Button>
        <FormModal
          content="회원가입이 완료되었어요!"
          handleModal={handleModal}
          open={open}
          setOpen={setOpen}
        />
      </form>
    </Form>
  );
};

export default RegisterPage;
