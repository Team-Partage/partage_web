import { useEffect, useState, useRef, useCallback } from 'react';

import { getChannelUsers, getSearchChannelUser } from '@/services/channel';
import { ChannelUserType } from '@/services/channel/type';
import { usePermissionStore } from '@/stores/usePermissionStore';
import { useUserStore } from '@/stores/User';
import { PLACEHOLDER } from '@/utils/constants';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { useInView } from 'react-intersection-observer';
import { useShallow } from 'zustand/react/shallow';

import UserSettingModal from './UserSettingModal';
import SearchBar from '../../../../components/SearchBar';

interface ChannelUsersModalProps {
  channelId: string;
  onClose: () => void;
}

export default function ChannelUsersModal({ channelId, onClose }: ChannelUsersModalProps) {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [userList, setUserList] = useState<ChannelUserType[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [cursor, setCursor] = useState<number>(1);
  const [openUserId, setOpenUserId] = useState<string | null>(null);

  const [ref, inView] = useInView();
  const usersRef = useRef<HTMLDivElement>(null);
  const noNextUser = userList.length >= totalCount;

  const { roleId, permission } = usePermissionStore(
    useShallow((state) => ({ roleId: state.roleId, permission: state.permission })),
  );

  const { user_id } = useUserStore((state) => ({
    user_id: state.user_id,
  }));

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSearch = async (searchQuery: string) => {
    setLoading(true);
    setIsSearching(true);

    try {
      const res = await getSearchChannelUser(channelId, searchQuery);
      const userData = await res.users;

      setUserList(userData);
      setCursor(1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchUsers = useCallback(async () => {
    if (loading) return;

    setLoading(true);

    try {
      const res = await getChannelUsers(channelId, cursor);
      const userData = await res.users;
      const pageData = await res.page;

      setUserList((prev) => [...prev, ...userData]);
      setTotalCount(pageData.total_count);
      setCursor((prev) => prev + 1);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }, [channelId, loading, cursor]);

  useEffect(() => {
    if (inView && !noNextUser && !isSearching) {
      handleFetchUsers();
    }
  }, [inView, handleFetchUsers, noNextUser, isSearching]);

  useEffect(() => {
    setPortalRoot(document.body);
    handleFetchUsers();
  }, []);

  return (
    portalRoot &&
    createPortal(
      <div
        onClick={handleClose}
        className="fixed inset-0 z-40 flex size-full items-center justify-center bg-overlay"
      >
        <section
          className="relative flex h-[554px] w-[335px] flex-col items-center justify-center gap-7 rounded-lg border-1 border-neutral-400 bg-gradient-to-bottom px-5 pb-5 pt-[40px] shadow-2xl backdrop-blur-[32] tablet:h-[640px] tablet:w-[500px] tablet:px-[40px]"
          onClick={() => {
            if (openUserId) setOpenUserId(null);
          }}
        >
          <h2 className="text-center large-bold tablet:max-bold">채널 유저</h2>
          <div className="flex items-center gap-1 small-regular tablet:base-regular">
            <div className="relative size-[22px] tablet:size-[24px]">
              <Image src="/member.svg" alt="로그인한 회원 수" fill />
            </div>
            {totalCount}

            {/** 채널 접속 유저 목록 조회에 현재 비로그인 회원 수 데이터 없음 추후 추가예정 */}
            {/* <div className="relative ml-4 size-[22px] tablet:size-[24px]">
              <Image src="/non-member.svg" alt="로그인하지 않은 시청자 수" fill />
            </div>
            21 */}
          </div>
          <SearchBar
            type="modal"
            placeholder={PLACEHOLDER.CHANNEL_USERS_SEARCHBAR}
            handleSearch={handleSearch}
            resetSearch={() => {
              setUserList([]);
              setIsSearching(false);
              handleFetchUsers();
            }}
          />
          <section
            ref={usersRef}
            className="flex h-[322px] w-full flex-col gap-5 overflow-auto tablet:h-[348px]"
          >
            {userList.map((user) => {
              // const isModalOpen = roleId === 'C0000' || permission.ban || user_id === user.user_id; 내보내기 api 없음
              const isModalOpen = roleId === 'C0000' || user_id === user.user_id;

              return (
                <div
                  key={user.user_id}
                  className="flex h-9 items-center justify-between gap-2.5 tablet:h-[40px]"
                >
                  <div className="relative size-9 overflow-hidden rounded-full tablet:size-[40px]">
                    <Image
                      fill
                      src={user.profile_image || '/default-profile-image.png'}
                      alt="유저 프로필 이미지"
                    />
                  </div>
                  <span
                    className="grow small-bold tablet:base-bold"
                    style={{ color: user.profile_color || '#00FFFF' }}
                  >
                    {user.nickname}
                  </span>
                  {isModalOpen && (
                    <div className="flex size-8 cursor-pointer items-center justify-center rounded-md hover:bg-neutral-500 tablet:size-9">
                      <div className="relative size-5 tablet:size-6">
                        <Image
                          fill
                          src="/kebab-menu.svg"
                          alt={`${user.nickname}의 메뉴 버튼`}
                          sizes="30vw"
                          onClick={() => setOpenUserId(user.user_id)}
                        />
                        {openUserId === user.user_id && (
                          <UserSettingModal
                            userId={user.user_id}
                            userRole={user.role_id}
                            channelId={channelId}
                            onClose={onClose}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            {!noNextUser && <div ref={ref} onClick={() => handleFetchUsers()} />}
          </section>
          <div
            className="absolute right-4 top-4 size-6 tablet:right-5 tablet:top-5 tablet:size-8"
            onClick={onClose}
          >
            <Image fill src="/Close.svg" alt="닫힘 버튼" />
          </div>
        </section>
      </div>,
      document.body,
    )
  );
}
