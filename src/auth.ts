import { fetcher } from '@/lib/fetcher';
import { cookies } from 'next/headers';
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
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
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

        const accessToken = authResponse['access_token'];

        // if (accessToken) {
        //   // 브라우저에 쿠키를 심어주기
        //   cookies().set('access_token', accessToken, {
        //     httpOnly: true,
        //   });
        // }

        if (!authResponse) {
          return null;
        }

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
});
