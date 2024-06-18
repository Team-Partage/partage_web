import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <main className="mt-[40px] flex w-full flex-col items-center justify-center">{children}</main>
  );
};

export default layout;
