// src/app/(private)/mypage/layout.tsx
import CommonSubNav from "@/components/common/nav/CommonSubNav";

import type { Metadata } from "next";

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
  // 🔥 여기서는 로그인 체크 안 한다 (middleware / 상위 layout에서 처리)
  return (
    <>
      <CommonSubNav />
      <div className="flex items-center justify-center">{children}</div>
    </>
  );
}
