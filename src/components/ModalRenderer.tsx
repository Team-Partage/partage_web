'use client';

import { forwardRef, useImperativeHandle, useState } from 'react';

import { CreateChannelModal, ShareChannelModal, EditChannelModal } from './modal';
import { Dialog, DialogDescription, DialogTrigger } from './ui/dialog';

interface Props {
  children?: React.ReactElement;
  type: ModalType;
}

export interface ModalImperativeHandle {
  openModal: () => void;
  closeModal: () => void;
}

// 만든 모달을 추가해주세요.
const ModalComponents = {
  CreateChannelModal,
  ShareChannelModal,
  EditChannelModal,
} satisfies Record<string, () => JSX.Element>;

type ModalType = keyof typeof ModalComponents;

/**
 * @param children 모달을 렌더링 시키는 트리거로 사용됩니다.
 * @param ref ref.current로 접근하여 openModal과 closeModal을 통해 모달의 isOpen 상태를 변경시킬 수 있습니다.
 *
 * @example
 * const modalRef = useRef({ openModal: () => {} });
 * const modalRef2 = useRef<ModalImperativeHandle>();
 *
 * ref.current.openModal();
 *
 * <ModalRenderer ref={modalRef} type='#' />
 * <ModalRenderer ref={modalRef2} type='#' />
 */
const ModalRenderer = forwardRef(
  ({ children, type }: Props, modalRef: React.ForwardedRef<ModalImperativeHandle | undefined>) => {
    const [isOpen, setIsOpen] = useState<boolean | undefined>();

    const Modal = ModalComponents[type];

    useImperativeHandle(modalRef, () => ({
      openModal: () => {
        setIsOpen(true);
      },
      closeModal: () => {
        setIsOpen(false);
      },
    }));

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogDescription className="hidden">dialog</DialogDescription>
        {<Modal />}
      </Dialog>
    );
  },
);

ModalRenderer.displayName = 'ModalRenderer';

export default ModalRenderer;
