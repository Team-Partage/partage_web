'use client';

import { useState } from 'react';

import { z } from 'zod';

import FormModal from '@/components/FormModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CustomError } from '@/lib/customError';
import { EditProfile } from '@/services/user';
import { EditPasswordRequest } from '@/services/user/type';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';

const passwordValidation = z
  .string()
  .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
  .max(16, '비밀번호는 최대 16자까지 가능합니다.')
  .regex(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/,
    '비밀번호는 영문, 숫자, 특수문자가 포함된 8~16자여야 합니다.',
  );

const PasswordSchema = z
  .object({
    password: passwordValidation,
    newPassword: passwordValidation,
    newPasswordCheck: passwordValidation,
  })
  .superRefine(({ newPassword, newPasswordCheck }, ctx) => {
    if (newPassword !== newPasswordCheck) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '새 비밀번호가 일치하지 않아요.',
        path: ['newPasswordCheck'],
      });
    }
  });

const PasswordCheck = () => {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState({
    passwordShow: false,
    newPasswordShow: false,
    newPasswordCheckShow: false,
  });

  const form = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: '',
      newPassword: '',
      newPasswordCheck: '',
    },
    mode: 'onChange',
  });

  const togglePassword = (field: keyof typeof showPassword) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const onSubmit = async (data: z.infer<typeof PasswordSchema>) => {
    try {
      const dto = { current_password: data.password, new_password: data.newPassword };
      await EditProfile<EditPasswordRequest>('password', dto);
      setOpen(true);
    } catch (err) {
      if (err instanceof CustomError) {
        if (err.response && err.response.code === 400) {
          form.setError('password', {
            type: 'manual',
            message: '현재 비밀번호가 일치하지 않아요.',
          });
        } else {
          throw new Error(`${err}`);
        }
      }
    }
    form.reset();
  };

  const handleModal = () => {
    // router.push('/');
  };

  return (
    <>
      <Card className="border-0">
        <CardTitle>비밀번호 변경</CardTitle>
        <CardContent>
          <div className="w-full">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field, fieldState: { error } }) => (
                      <FormItem className="pt-4">
                        <FormLabel>현재 비밀번호</FormLabel>
                        <FormControl>
                          <Input
                            type={showPassword.passwordShow ? 'text' : 'password'}
                            placeholder="현재 비밀번호를 입력해주세요."
                            isError={!!error}
                            errorText={error?.message}
                            endAdornment={
                              <button type="button" onClick={() => togglePassword('passwordShow')}>
                                {showPassword.passwordShow ? (
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
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field, fieldState: { error } }) => (
                      <FormItem className="pt-4">
                        <FormLabel>새 비밀번호</FormLabel>
                        <FormControl>
                          <Input
                            type={showPassword.newPasswordShow ? 'text' : 'password'}
                            placeholder="새 비밀번호를 입력해주세요."
                            isError={!!error}
                            errorText={error?.message}
                            endAdornment={
                              <button
                                type="button"
                                onClick={() => togglePassword('newPasswordShow')}
                              >
                                {showPassword.newPasswordShow ? (
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
                  <FormField
                    control={form.control}
                    name="newPasswordCheck"
                    render={({ field, fieldState: { error } }) => (
                      <FormItem className="pt-4">
                        <FormLabel>새 비밀번호 확인</FormLabel>
                        <FormControl>
                          <Input
                            type={showPassword.newPasswordCheckShow ? 'text' : 'password'}
                            placeholder="새 비밀번호를 입력해주세요."
                            isError={!!error}
                            errorText={error?.message}
                            endAdornment={
                              <button
                                type="button"
                                onClick={() => togglePassword('newPasswordCheckShow')}
                              >
                                {showPassword.newPasswordCheckShow ? (
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
                  변경
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
      <FormModal
        content="비밀번호가 변경되었어요!"
        handleModal={handleModal}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default PasswordCheck;
