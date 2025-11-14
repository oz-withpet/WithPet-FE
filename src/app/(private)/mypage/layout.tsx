import { Metadata } from "next";

import CommonSubNav from "@/components/common/nav/CommonSubNav";

export const metadata: Metadata = {
  title: "마이페이지",
  description: "나의 프로필, 내가 쓴 글, 좋아요한 글, 관심 장소를 관리합니다.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MyPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 로그인 했는지 확인 코드 작성하기
  return (
    <>
      <CommonSubNav />
      <div className="flex items-center justify-center">{children}</div>
    </>
  );
}
