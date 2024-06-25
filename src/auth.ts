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
    signIn: '/login',
    newUser: '/register',
  },
  callbacks: {
    jwt({ token }) {
      console.log('auth.ts jwt', token);
      return token;
    },
    session({ session }) {
      console.log('auth.ts session', session);
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // 로그인 호출
        const authResponse = await fetcher.post<SignInResponse>(`${DOMAIN.AUTH}login`, {
          // next-auth에서 고정된 이름 credentials.~
          email: credentials.username,
          password: credentials.password,
        });

        const setCookie = authResponse['access_token'];
        if (setCookie) {
          // 브라우저에 쿠키를 심어주기
          cookies().set('access_token', setCookie, {
            httpOnly: true,
          });
        }
        if (!authResponse) {
          return null;
        }

        const myInfo = await fetcher.get<GetUserResponse>(
          `${DOMAIN.USER}/me`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${setCookie}`,
            },
          },
        );
        const { user } = myInfo;

        return {
          // next-auth에서는 아래의 세개 이름만 지원
          email: user.email,
          name: user.nickname,
          image: user.profile_image,
        };
      },
    }),
  ],
});
