import { SignUpRequest } from '@/services/user/type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStoreType {
  user_id: string;
  email: string;
  username: string;
  nickname: string;
  profile_color: string | null;
  profile_image: string | null;
  password: string;

  setUserId: (newUserId: string) => void;
  setEmail: (newEmail: string) => void;
  setUsername: (newUsername: string) => void;
  setNickname: (newNickname: string) => void;
  setProfileColor: (newProfileColor: string | null) => void;
  setProfileImage: (newProfileImage: string | null) => void;
  setPassword: (newPassword: string) => void;
  registerUser: (user: SignUpRequest) => void;
  clearUser: () => void;
}

export const useUserStore = create(
  persist<UserStoreType>(
    (set) => ({
      user_id: '',
      email: '',
      username: '',
      nickname: '',
      profile_color: '#00FFFF',
      profile_image: null,
      password: '',

      setUserId: (newUserId) => set({ user_id: newUserId }),
      setEmail: (newEmail) => set({ email: newEmail }),
      setUsername: (newUsername) => set({ username: newUsername }),
      setNickname: (newNickname) => set({ nickname: newNickname }),
      setProfileColor: (newProfileColor) => set({ profile_color: newProfileColor }),
      setProfileImage: (newProfileImage) => set({ profile_image: newProfileImage }),
      setPassword: (newPassword) => set({ password: newPassword }),
      registerUser: (user) =>
        set({
          email: user.email,
          username: user.username,
          nickname: user.nickname,
          password: user.password,
        }),
      clearUser: () =>
        set({
          user_id: '',
          email: '',
          username: '',
          nickname: '',
          profile_color: '#00FFFF',
          profile_image: null,
          password: '',
        }),
    }),
    { name: 'user' },
  ),
);
