export type User = {
  user_id: string;
  email: string;
  username: string;
  nickname: string;
  profile_color: string;
  profile_image: string | null;
};

//** 회원 정보 조회 Req  */
export type GetUserResponse = {
  user: User;
};

//** 일반 회원 가입 Req */
export type SignUpRequest = {
  password: string;
} & Pick<User, 'email' | 'username' | 'nickname'>;

//** 닉네임 Req */
export type NicknameRequest = Pick<User, 'nickname'>;

//** 프로필 색상 수정 Req */
export type EditProfileColorRequest = Pick<User, 'profile_color'>;

//** 비밀번호 수정 Req */
export type ChangePasswordRequest = {
  current_password: string;
  new_password: string;
};

//** 프로필 수정 Params */
export type EditProfileParams = NicknameRequest | EditProfileColorRequest;

//** 이메일 Req */
export type EmailRequest = Pick<User, 'email'>;

//** 이메일 인증 번호 확인 Req */
export type CheckEmailNumberRequest = { auth_number: string } & EmailRequest;
