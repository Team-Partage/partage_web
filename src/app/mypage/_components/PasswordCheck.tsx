'use client';

import { useRef } from 'react';

import { z } from 'zod';

import PasswordInput from '@/components/PasswordInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Form, FormField } from '@/components/ui/form';
import { CustomError } from '@/lib/customError';
import { PasswordSchema } from '@/schemas/userSchema';
import { EditProfile } from '@/services/user';
import { EditPasswordRequest } from '@/services/user/type';
import { AlertContents } from '@/utils/alertContents';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import AlertModalRenderer from './AlertModalRenderer';

const PasswordCheck = () => {
  const modalRef = useRef({ openModal: () => {} });

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
      modalRef.current?.openModal();
    } catch (err) {
      // TODO 쿠키 적용하고 에러처리 다시 1. 현재 비번 체크 2. 비밀번호 변경 완료 체크
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
                <AlertModalRenderer
                  ref={modalRef}
                  type="AlertModal"
                  content={
                    !form.formState.isValid
                      ? AlertContents.PASSWORDWRONG
                      : AlertContents.PASSWORDCHANGED
                  }
                >
                  <Button
                    type="submit"
                    disabled={!form.formState.isValid}
                    variant="active"
                    size="lg"
                    className="mt-[56px] w-full"
                  >
                    변경
                  </Button>
                </AlertModalRenderer>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default PasswordCheck;
