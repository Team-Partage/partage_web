'use client';

import { useEffect, useState } from 'react';

import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoginSchema } from '@/schemas/userSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';

const LoginPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (session?.user) {
      router.replace('/');
      return;
    }
  }, [session]);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    try {
      const res = await signIn('credentials', {
        username: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        alert('아이디 혹은 비밀번호가 일치하지 않습니다.');
        router.refresh();
      } else {
        router.push('/');
      }
    } catch (err) {
      throw new Error(`${err}`);
    }
  };

  return (
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
            name="password"
            render={({ field, fieldState: { error } }) => (
              <FormItem className="pt-4">
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
          className="mt-[56px] w-full"
        >
          로그인
        </Button>
      </form>
    </Form>
  );
};

export default LoginPage;
