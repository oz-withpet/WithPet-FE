import { notFound } from "next/navigation";

import { CommunityList, type CommunityCategory } from "@/components/communityList";

const CATEGORIES = ["free", "qna", "info"] as const;
type Param = (typeof CATEGORIES)[number];

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c }));
}

export default async function Page({ params }: { params: Promise<{ category: Param }> }) {
  const { category } = await params;
  if (!CATEGORIES.includes(category)) return notFound();
  return <CommunityList category={category as CommunityCategory} />;
}
