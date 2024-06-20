'use client';

import { useState } from 'react';

import { z } from 'zod';

import FormModal from '@/components/FormModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Form, FormField } from '@/components/ui/form';
import { CustomError } from '@/lib/customError';
import { EditProfile } from '@/services/user';
import { EditPasswordRequest } from '@/services/user/type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import PasswordInput from '../../../components/PasswordInput';

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

  const form = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: '',
      newPassword: '',
      newPasswordCheck: '',
    },
    mode: 'onChange',
  });

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
  };

  const handleModal = () => {
    setOpen(false);
    form.reset();
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
                      <PasswordInput
                        field={field}
                        error={error}
                        label="현재 비밀번호"
                        placeholder="현재 비밀번호를 입력해 주세요."
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field, fieldState: { error } }) => (
                      <PasswordInput
                        field={field}
                        error={error}
                        label="새 비밀번호"
                        placeholder="새 비밀번호를 입력해 주세요."
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newPasswordCheck"
                    render={({ field, fieldState: { error } }) => (
                      <PasswordInput
                        field={field}
                        error={error}
                        label="새 비밀번호 확인"
                        placeholder="새 비밀번호를 입력해 주세요."
                      />
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
