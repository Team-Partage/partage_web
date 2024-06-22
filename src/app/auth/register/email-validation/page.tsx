'use client';

import { useState } from 'react';

import FormModal from '@/components/FormModal';
import { Button } from '@/components/ui/button';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { CheckEmailNumber, SendEmail } from '@/services/user';
import { useRouter } from 'next/navigation';

const EmailValidationPage = () => {
  const [validationNumber, setValidationNumber] = useState('');
  const [isError, setIsError] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const myEmail = 'newjeanse@partage.com';

  const onchange = (value: string) => {
    console.log(value);
    setValidationNumber(value);
  };

  const handleResend = async () => {
    setIsError(false);
    setValidationNumber('');
    try {
      await SendEmail({ email: myEmail });
    } catch (err) {
      alert('다시 인증메일 재발송 해주세요.');
    }
  };

  const handleGoBack = () => {
    history.back();
  };

  const onSubmit = async () => {
    if (validationNumber) {
      try {
        await CheckEmailNumber({ email: myEmail, auth_number: validationNumber });
        setOpen(true);
      } catch (err) {
        console.log(err);
        setIsError(true);
        setValidationNumber('');
      }
    }
  };

  const handleModal = () => {
    router.push('/auth/login');
  };

  return (
    <div className="flex flex-col justify-between border-none text-neutral-100 desktop:h-[562px]">
      <div>
        <CardTitle className="max-bold">이메일 인증번호 확인</CardTitle>
        <CardDescription className="text-neutral-100 base-regular">
          인증메일이 {myEmail}(으)로 발송되었어요! <br />
          이메일을 확인 후 인증번호를 입력해주세요!
        </CardDescription>
      </div>
      <div>
        <InputOTP maxLength={6} onChange={onchange}>
          <InputOTPGroup>
            <InputOTPSlot index={0} isError={isError} />
            <InputOTPSlot index={1} isError={isError} />
            <InputOTPSlot index={2} isError={isError} />
            <InputOTPSlot index={3} isError={isError} />
            <InputOTPSlot index={4} isError={isError} />
            <InputOTPSlot index={5} isError={isError} />
          </InputOTPGroup>
        </InputOTP>
        {isError && <p className="mt-3 text-sub-red small-regular">인증번호가 틀렸어요.</p>}
      </div>
      <div>
        <Button
          className="w-full"
          size="lg"
          variant="active"
          type="submit"
          disabled={isError || validationNumber.length < 6}
          onClick={onSubmit}
        >
          인증 확인
        </Button>
        <Button className="mt-4 w-full hover:bg-neutral-500" size="lg" onClick={handleGoBack}>
          회원 가입 페이지로 돌아가기
        </Button>
      </div>
      <div className="text-neutral-200 small-regular">
        이메일을 확인할 수 없나요?{' '}
        <button className="underline" onClick={handleResend}>
          인증메일 재발송하기
        </button>
      </div>
      <FormModal
        content="회원가입이 완료되었어요!"
        handleModal={handleModal}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default EmailValidationPage;
