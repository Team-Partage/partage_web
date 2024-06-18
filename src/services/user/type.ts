export type User = {
  user_id: string;
  email: string;
  username: string;
  nickname: string;
  profile_color: string | null;
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

//** 프로필 색상 수정 Req */
export type EditProfileColorRequest = {
  profile_color: string;
};

//** 닉네임 수정 Req */
export type NicknameRequest = {
  nickname: string;
};

//** 비밀번호 수정 Req */
export type EditPasswordRequest = {
  current_password: string;
  new_password: string;
};

//** 프로필 수정 Params */
export type EditProfileParams = EditProfileColorRequest | NicknameRequest | EditPasswordRequest;
