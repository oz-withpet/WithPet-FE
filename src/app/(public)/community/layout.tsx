import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "커뮤니티",
  description: "반려견·반려묘 집사들이 자유게시판, 질문게시판, 정보공유에서 소통하는 공간입니다.",
};

export default function CommunityLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
