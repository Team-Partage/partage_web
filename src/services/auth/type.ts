export type AuthRequest = {
  email: string;
  password: string;
};

export type SignInResponse = {
  user_id: string;
  access_token: string;
  refresh_token: string;
};
