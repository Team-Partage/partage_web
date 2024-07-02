interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  return <main className="h-full min-w-[375px] px-5 tablet:px-10">{children}</main>;
};

export default layout;
