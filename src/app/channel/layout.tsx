interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  return <main className="size-full px-10">{children}</main>;
};

export default layout;
