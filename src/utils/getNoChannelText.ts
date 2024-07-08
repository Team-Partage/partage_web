export const getNoChannelText = (query: string | undefined, username: string | undefined) => {
  switch (username) {
    case undefined:
      return (
        (query && {
          text1: `${query}로 검색된 채널이 없어요.`,
          text2: `로그인하면 직접 만들 수 있어요!`,
        }) ?? { text1: '생성된 채널이 없어서 조용하네요!', text2: '로그인해서 먼저 만들어주세요!' }
      );
    default:
      return (
        (query && {
          text1: `${query}로 검색된 채널이 없어요.`,
          text2: `${username}님의 채널을 기다릴지도!`,
        }) ?? {
          text1: '생성된 채널이 없어서 조용하네요!',
          text2: `${username}님이 먼저 만들어보는 건 어떠세요?`,
        }
      );
  }
};
