import { notFound } from "next/navigation";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";

import { getPostsServer } from "@/features/community/api/getPostsServer";
import { postKeys } from "@/features/community/api/queryKeys";
import { GetPostsParams } from "@/features/community/api/type";
import CommunityCategoryPageClient from "@/features/community/list/CommunityCategoryPageClient";
import { type ServerFetcherError } from "@/shared/api/serverFetcher";
import { CATEGORY_LABEL_BY_SLUG } from "@/types/category";

const CATEGORIES = ["all", "free", "qna", "info"] as const;

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c }));
}

type Params = {
  category: keyof typeof CATEGORY_LABEL_BY_SLUG; // "all" | "free" | "qna" | "info"
};

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category } = await params;

  const label = CATEGORY_LABEL_BY_SLUG[category] ?? "커뮤니티";

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

  const listParams: GetPostsParams = {
    view: "main",
    limit: 12,
  };

  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: postKeys.list(listParams),
      queryFn: () => getPostsServer(listParams),
    });
  } catch (error) {
    const err = error as ServerFetcherError;

    if (err.status === 404) {
      return notFound();
    }
    throw error;
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    // “이 페이지에서 어떤 데이터를 어떻게 가져올지” 책임 → 데이터/로딩/에러 담당
    <HydrationBoundary state={dehydratedState}>
      <CommunityCategoryPageClient category={category} />
    </HydrationBoundary>
  );
}
