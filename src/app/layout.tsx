"use client";
import "./globals.css";
import { usePathname } from "next/navigation";

import Header from "@/components/layout/header";
import MainNav from "@/components/layout/mainNav";
import SubNav from "@/components/layout/subNav";
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
