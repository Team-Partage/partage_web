'use client';

import { useEffect } from 'react';

import { UserInfo } from '@/services/user';
import { useUserStore } from '@/stores/User';
import { useSession } from 'next-auth/react';
import { useShallow } from 'zustand/react/shallow';

const GetUserInfo = () => {
  const { data: session } = useSession();
  const { setUserId, setEmail, setNickname, setUsername, setProfileColor, setProfileImage } =
    useUserStore(
      useShallow((state) => ({
        setUserId: state.setUserId,
        setNickname: state.setNickname,
        setEmail: state.setEmail,
        setUsername: state.setUsername,
        setProfileColor: state.setProfileColor,
        setProfileImage: state.setProfileImage,
      })),
    );

  useEffect(() => {
    if (!session?.user.user_id) {
      return;
    }

    const fetch = async () => {
      const user = await UserInfo();
      if (user) {
        setUserId(user.user_id);
        setEmail(user.email);
        setNickname(user.nickname);
        setUsername(user.username);
        setProfileColor(user.profile_color);
        setProfileImage(user.profile_image);
      }
    };
    fetch();
  }, [session?.user.user_id]);

  return <></>;
};

export default GetUserInfo;
