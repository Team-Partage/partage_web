// next에서 제공하는 기능 (ex) 페이지 접근권한)

import { NextResponse } from 'next/server';

import { auth } from './auth';

export async function middleware() {
  const session = await auth();
  if (!session) {
    return NextResponse.redirect('http://localhost:3000/auth/login');
  }
}

// 미들웨어를 적용할 라우터 -> 로그인을 해야만 접근할 수 있는 곳
export const config = {
  matcher: ['/mypage'],
};
