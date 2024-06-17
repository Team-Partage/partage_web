import { fetcher } from '@/lib/fetcher';
import { cookies } from 'next/headers';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { SignInResponse } from './services/auth/type';

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
    session({ session, newSession, user }) {
      console.log('auth.ts session', session, newSession, user);
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // 로그인 호출
        const authResponse = await fetcher.post<SignInResponse>('/api/v1/auth/login', {
          // next-auth에서 고정된 이름 credentials.~
          email: credentials.username,
          password: credentials.password,
        });
        console.log('authResponse: ', authResponse);

        const setCookie = authResponse['access_token'];
        // 쿠키에 저장
        console.log('set-cookie', setCookie);
        if (setCookie) {
          // 쿠키 객체로 만들기
          cookies().set('access_token', setCookie, {
            httpOnly: true,
          }); // 브라우저에 쿠키를 심어주는 것
        }
        if (!authResponse) {
          return null;
        }

        const myInfo = await fetcher.get('/api/v1/user/me', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${setCookie}`,
          },
        });
        console.log('myinfo', myInfo);
        const { user } = myInfo;

        return {
          email: user.email,
          name: user.nickname,
          image: user.profile_image,
          ...user,
          // id: user.user_id,
          // name: user.username,
          // profile_color: user.profile_color,
        };
      },
    }),
  ],
});
