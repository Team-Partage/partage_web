export type User = {
  user_id: string;
  email: string;
  username: string;
  nickname: string;
  profile_color: string | null;
  profile_image: string | null;
};

/** 일반 회원 가입  */
export type SignUpRequest = {
  password: string;
} & Pick<User, 'email' | 'username' | 'nickname'>;
