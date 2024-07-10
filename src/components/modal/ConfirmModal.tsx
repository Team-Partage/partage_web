import { ReactNode, useEffect, useState } from 'react';

import { createPortal } from 'react-dom';

import { Button } from '../ui/button';

interface ConfirmModalProps {
  leftButtonText?: string;
  defaultButtonText?: string /** 버튼 하나일때 또는 두개일때 오른쪽 버튼*/;
  leftClick?: () => void;
  defaultClick?: () => void /** 버튼 하나일때 또는 두개일때 오른쪽 버튼 클릭시 동작*/;
  children: ReactNode;
  onClose: () => void;
}

const ConfirmModal = ({
  leftButtonText,
  defaultButtonText = '확인',
  leftClick,
  defaultClick,
  children,
  onClose,
}: ConfirmModalProps) => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    setPortalRoot(document.body);
  }, []);

  return (
    portalRoot &&
    createPortal(
      <div
        onClick={handleClose}
        className="fixed inset-0 z-40 flex size-full items-center justify-center bg-overlay"
      >
        <section className="relative flex h-[198px] w-[335px] flex-col items-center justify-center gap-9 rounded-lg border-1 border-neutral-400 bg-gradient-to-bottom pb-8 pt-[66px] shadow-2xl backdrop-blur-[32] tablet:h-[237px] tablet:w-[400px]">
          <p className="flex h-[54px] items-center text-center text-neutral-100 medium-regular">
            {children}
          </p>
          <div className="flex gap-4">
            {leftButtonText && (
              <Button className="w-[100px] bg-neutral-500" onClick={leftClick || onClose}>
                {leftButtonText}
              </Button>
            )}
            <Button variant="active" className="w-[100px]" onClick={defaultClick || onClose}>
              {defaultButtonText}
            </Button>
          </div>
        </section>
      </div>,
      document.body,
    )
  );
};

export default ConfirmModal;
