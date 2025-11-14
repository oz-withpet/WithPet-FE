import CommonSubNav from "@/components/common/nav/CommonSubNav";

export default function MyPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 로그인 했는지 확인 코드 작성하기
  return (
    <>
      <CommonSubNav />
      {children}
    </>
  );
}
