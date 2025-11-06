"use client";
import "./globals.css";
import { usePathname } from "next/navigation";

import Header from "@/components/common/layout/Header";
import MainNav from "@/components/common/layout/MainNav";
import SubNav from "@/components/common/layout/SubNav";
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
            {pathname.includes("community") && <MainNav />}
            {pathname.includes("mypage") && <SubNav />}
            <main className="m-auto w-full max-w-wrapper">{children}</main>
          </MSWProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
