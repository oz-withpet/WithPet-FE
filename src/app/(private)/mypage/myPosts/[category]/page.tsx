import { notFound } from "next/navigation";

import MyPageCategoryPageClient from "@/features/mypage/list/MyPageCategoryPageClient";
import { Category } from "@/types/category";

const CATEGORIES: Category[] = ["all", "free", "qna", "info"];

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c }));
}

export default async function MyPagePostsByCategoryPage({
  params,
}: {
  params: Promise<{ category: Category }>;
}) {
  const { category } = await params;

  if (!CATEGORIES.includes(category)) return notFound();

  return <MyPageCategoryPageClient category={category} />;
}
