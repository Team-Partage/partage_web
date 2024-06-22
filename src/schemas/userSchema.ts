import { z } from 'zod';

const passwordValidation = z
  .string()
  .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
  .max(16, '비밀번호는 최대 16자까지 가능합니다.')
  .regex(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/,
    '비밀번호는 영문, 숫자, 특수문자가 포함된 8~16자여야 합니다.',
  );

//** 회원가입 스키마 */
export const RegisterSchema = z
  .object({
    email: z.string().email('이메일 형식에 맞게 작성해주세요.'),
    username: z.string().min(1, '이름을 입력해주세요.'),
    nickname: z.string().min(1, '닉네임을 입력해주세요.'),
    password: passwordValidation,
    passwordCheck: passwordValidation,
  })
  .superRefine(({ password, passwordCheck }, ctx) => {
    if (password !== passwordCheck) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '비밀번호가 일치하지 않아요.',
        path: ['passwordCheck'],
      });
    }
  });

//** 마이페이지 스키마 */
export const MypageSchema = z.object({
  email: z.string().email(),
  nickname: z.string().min(1, '닉네임을 입력해주세요.'),
});

//** 비밀번호 확인 스키마 */
export const PasswordSchema = z
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

//** 로그인 스키마 */
export const LoginSchema = z.object({
  email: z.string().email('이메일 형식에 맞게 작성해주세요.'),
  password: passwordValidation,
});
