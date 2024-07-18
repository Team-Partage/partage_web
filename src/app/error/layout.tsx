interface ErrorLayoutProps {
  children: React.ReactNode;
}

const ErrorLayout = ({ children }: ErrorLayoutProps) => {
  return <main className="flex size-full items-center justify-center">{children}</main>;
};

export default ErrorLayout;
