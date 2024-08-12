'use client';

import Script from 'next/script';

function KakaoScript() {
  const onLoad = () => {
    if (window.kakao) {
      window.kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }
  };

  return <Script src="https://developers.kakao.com/sdk/js/kakao.js" async onLoad={onLoad} />;
}

export default KakaoScript;
