"use client";
import "./globals.css";
import { usePathname } from "next/navigation";

import CommunityNav from "@/components/common/community/CommunityNav";
import Header from "@/components/common/layout/Header";
import {
  MyPageMainNav,
  MyPagePostNav,
  MyPageProfileNav,
} from "@/components/common/mypage/MyPageNav";
import MSWProvider from "@/providers/MSWProvider";
import ReduxProvider from "@/store/ReduxProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="ko">
      <body className="bg-background text-gray-100">
        <ReduxProvider>
          <MSWProvider>
            <Header />
            {pathname.includes("community") && <CommunityNav />}
            {pathname.includes("mypage") && <MyPageMainNav />}
            {pathname.includes("mypage/profile") && <MyPageProfileNav />}
            {pathname.includes("mypage/posts") && <MyPagePostNav />}
            <main className="m-auto w-full max-w-layout">{children}</main>
          </MSWProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
