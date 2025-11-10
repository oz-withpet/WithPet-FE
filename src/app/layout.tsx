"use client";
import "./globals.css";
import { usePathname } from "next/navigation";

import CommonMainNav from "@/components/common/nav/CommonMainNav";
import CommonSubNav from "@/components/common/nav/CommonSubNav";
import Header from "@/components/layout/Header";
import MyPageProfileNav from "@/features/mypage/ProfileNav";
import MSWProvider from "@/providers/MSWProvider";
import QueryProvider from "@/providers/QueryProvider";
import ReduxProvider from "@/shared/store/ReduxProvider";

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
          <QueryProvider>
            <MSWProvider>
              <Header />
              {pathname.includes("community") && <CommonMainNav page="community" />}
              {pathname.includes("mypage") && <CommonSubNav />}
              {pathname.includes("mypage/profile/") && <MyPageProfileNav />}
              {pathname.includes("mypage/posts") && <CommonMainNav page="mypage" />}
              <main className="m-auto w-full max-w-layout">{children}</main>
            </MSWProvider>
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
