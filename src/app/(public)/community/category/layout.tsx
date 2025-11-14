import CommonMainNav from "@/components/common/nav/CommonMainNav";

export default function CommunityCategoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CommonMainNav page="community" />
      {children}
    </>
  );
}
