import { User } from '../user/type';

/** 로그인 Req */
export type AuthRequest = {
  email: string;
  password: string;
};

/** 로그인 Res */
export type SignInResponse = {
  user_id: string;
  access_token: string;
  refresh_token: string;
};

/** 회원 정보 조회 Res */
export type UserResponse = {
  user: User;
};
