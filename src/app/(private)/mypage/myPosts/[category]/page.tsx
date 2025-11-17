import { notFound } from "next/navigation";

import CommunityCategoryPageClient from "@/features/community/list/CommunityCategoryPageClient";
import { type Category } from "@/types/category";

const CATEGORIES = ["all", "free", "qna", "info"] as const;
type Param = (typeof CATEGORIES)[number];

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c }));
}

export default async function MyPagePostsByCategoryPage({
  params,
}: {
  params: Promise<{ category: Param }>;
}) {
  const { category } = await params;
  if (!CATEGORIES.includes(category)) return notFound();
  return <CommunityCategoryPageClient category={category as Category} />;
}
