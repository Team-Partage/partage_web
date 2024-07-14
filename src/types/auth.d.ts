import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      user_id: string;
      email: string;
      username: string;
      nickname: string;
      profile_color: string;
      profile_image: string | null;
      accessToken: string;
    };
  }
}
