function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="flex flex-col items-center gap-[40px] p-[40px]">{children}</main>;
}

export default SearchLayout;
