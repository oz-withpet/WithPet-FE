import { notFound } from "next/navigation";

import { Metadata } from "next";

import CommunityShell from "@/features/community/ui/CommunityShell";
import { type Category } from "@/types/category";

const CATEGORIES = ["all", "free", "qna", "info"] as const;
type CategoryParam = (typeof CATEGORIES)[number];

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c }));
}

const CATEGORY_LABELS: Record<CategoryParam, string> = {
  all: "전체",
  free: "자유게시판",
  qna: "질문게시판",
  info: "정보공유",
};

type Params = {
  category: keyof typeof CATEGORY_LABELS; // "all" | "free" | "qna" | "info"
};

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category } = await params;

  const label = CATEGORY_LABELS[category] ?? "커뮤니티";

  return {
    title: label,
    description: `${label} 게시글 목록을 확인할 수 있습니다.`,
  };
}

export default async function CommunityCategoryPage({
  params,
}: {
  params: Promise<{ category: Params["category"] }>;
}) {
  const { category } = await params;
  if (!CATEGORIES.includes(category)) return notFound();
  return <CommunityShell category={category as Category} />;
}
