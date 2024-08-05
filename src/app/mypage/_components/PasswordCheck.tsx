'use client';

import { useRef, useState } from 'react';

import { z } from 'zod';

import AlertModalRenderer from '@/components/AlertModalRenderer';
import PasswordInput from '@/components/PasswordInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Form, FormField } from '@/components/ui/form';
import { PasswordSchema } from '@/schemas/userSchema';
import { ChangePassword } from '@/services/user';
import { AlertContents } from '@/utils/alertContents';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const PasswordCheck = () => {
  const modalRef = useRef({ openModal: () => {}, closeModal: () => {} });
  const [modalContent, setModalContent] = useState('');

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
    modalRef.current?.closeModal();

    if (data.password === data.newPassword) {
      form.setError('newPassword', {
        type: 'manual',
        message: '현재 비밀번호와 새 비밀번호가 같아요.',
      });
      return;
    }

    try {
      const dto = { current_password: data.password, new_password: data.newPassword };
      await ChangePassword(dto);
      setModalContent(AlertContents.PASSWORDCHANGED);
    } catch (error) {
      setModalContent(AlertContents.PASSWORDWRONG);
    }
    modalRef.current?.openModal();
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
                <AlertModalRenderer ref={modalRef} type="AlertModal" content={modalContent}>
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
