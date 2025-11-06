import { notFound } from "next/navigation";

import {
  CommunityShell,
  type CommunityCategory,
} from "@/app/(community)/community/components/shell/communityShell";

const CATEGORIES = ["free", "qna", "info"] as const;
type Param = (typeof CATEGORIES)[number];

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c }));
}

export default async function Page({ params }: { params: Promise<{ category: Param }> }) {
  const { category } = await params;
  if (!CATEGORIES.includes(category)) return notFound();
  return <CommunityShell category={category as CommunityCategory} />;
}
