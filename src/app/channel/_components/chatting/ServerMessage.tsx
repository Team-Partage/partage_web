import { ReactNode, memo } from 'react';

interface ServerMessageProps {
  children: ReactNode;
}

const ServerMessage = ({ children }: ServerMessageProps) => {
  return (
    <div className="flex w-full justify-center py-3">
      <span className="rounded-full bg-neutral-400 px-4 py-1 text-neutral-100 micro-regular">
        {children}
      </span>
    </div>
  );
};

export default memo(ServerMessage);
