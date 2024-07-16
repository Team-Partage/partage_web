interface ErrorLayoutProps {
  children: React.ReactNode;
}

const ErrorLayout = ({ children }: ErrorLayoutProps) => {
  return <main className="flex w-full h-full items-center justify-center">{children}</main>;
};

export default ErrorLayout;
