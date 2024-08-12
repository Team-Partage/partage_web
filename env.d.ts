declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SERVER_URL: string;
    NEXT_PUBLIC_WEBSOCKET_SERVER_URL: string;
    NEXT_PUBLIC_BASE_URL: string;
    NEXT_PUBLIC_KAKAO_API_KEY: string;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
  }
}
