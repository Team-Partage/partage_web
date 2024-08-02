'use client';

import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

import AlertModal from '@/components/modal/AlertModal';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface Props {
  children?: React.ReactElement;
  type: ModalType;
  content: string;
}

export interface AlertModalImperativeHandle {
  openModal: (content?: string) => void;
  closeModal: () => void;
}

// 만든 모달을 추가해주세요.
const ModalComponents = {
  AlertModal,
} satisfies Record<string, ({ content }: Props) => JSX.Element>;

type ModalType = keyof typeof ModalComponents;

/**
 * @param children 모달을 렌더링 시키는 트리거로 사용됩니다.
 * @param ref ref.current로 접근하여 openModal과 closeModal을 통해 모달의 isOpen 상태를 변경시킬 수 있습니다.
 *
 * @example // AlertModalRenderer 사용하는 컴포넌트
 *
 * const modalRef = useRef({ openModal: () => {} });
 *
 * (...)
 * modalRef.current?.openModal(); // 모달 오픈하는 코드
 *
 * (...)
 * <ModalRenderer ref={modalRef} type='AlertModal' content={AlertContents.PROFILE} />
 *
 */
const AlertModalRenderer = forwardRef(
  (
    { children, type, content }: Props,
    modalRef: React.ForwardedRef<AlertModalImperativeHandle | undefined>,
  ) => {
    const [isOpen, setIsOpen] = useState<boolean | undefined>();

    const message = useRef<string>(content);

    const Modal = ModalComponents[type];

    useImperativeHandle(modalRef, () => ({
      openModal: (content?: string) => {
        if (content) {
          message.current = content;
        }

        setIsOpen(true);
      },
      closeModal: () => {
        setIsOpen(false);
      },
    }));

    return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        {<Modal content={message.current} />}
      </AlertDialog>
    );
  },
);

AlertModalRenderer.displayName = 'AlertModalRenderer';

export default AlertModalRenderer;
