import "./globals.css";

import Header from "@/components/layout/Header";
import ConfirmProvider from "@/providers/ConfirmProvider";
import MSWProvider from "@/providers/MSWProvider";
import QueryProvider from "@/providers/QueryProvider";
import ReduxProvider from "@/shared/store/ReduxProvider";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "WithPet | 반려동물 커뮤니티",
    template: "%s | WithPet",
  },
  description: "반려견·반려묘 집사들을 위한 산책 코스, 정보 공유 커뮤니티 서비스.",
  metadataBase: new URL("https://withpet.example.com"), // 나중에 실제 도메인으로 교체
  openGraph: {
    title: "WithPet | 반려동물 커뮤니티",
    description: "강아지·고양이 집사들을 위한 커뮤니티와 정보 공유 공간.",
    type: "website",
    url: "/",
  },
  icons: {
    icon: "/favicon.ico", // 나중에 실제 아이콘 경로로 교체
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex min-h-screen flex-col bg-background text-gray-100">
        <QueryProvider>
          <ConfirmProvider>
            <ReduxProvider>
              <MSWProvider>
                <Header />
                <main className="mx-auto w-full max-w-layout flex-1">{children}</main>
              </MSWProvider>
            </ReduxProvider>
          </ConfirmProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
