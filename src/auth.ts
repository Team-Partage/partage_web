import { fetcher } from '@/lib/fetcher';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { DOMAIN } from './constants/domains';
import { SignInResponse } from './services/auth/type';
import { GetUserResponse } from './services/user/type';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  trustHost: true,
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },
  session: {
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    jwt({ token, user }) {
      return { ...token, ...user };
    },
    session({ session, token }) {
      return { ...session, user: { ...token } };
    },
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // 로그인 호출
        const authResponse = await fetcher.post<SignInResponse>(`${DOMAIN.AUTH}/login`, {
          // next-auth에서 고정된 이름 credentials.~
          email: credentials.username,
          password: credentials.password,
        });

        if (!authResponse.user_id) {
          throw new Error('Wrong Email or Password');
        }

        const accessToken = authResponse['access_token'];
        const myInfo = await fetcher.get<GetUserResponse>(
          `${DOMAIN.USER}/me`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        const userData = myInfo['user'];
        const user = { ...userData, accessToken };
        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
