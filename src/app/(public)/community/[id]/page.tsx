import { notFound } from "next/navigation";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { getPostDetailServer } from "@/features/community/api/getPostDetailServer";
import { postKeys } from "@/features/community/api/queryKeys";
import PostDetailPageClient from "@/features/community/detail/PostDetailPageClient";
import type { ServerFetcherError } from "@/shared/api/serverFetcher";

import type { Metadata } from "next";

type Params = { id: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    return { title: "게시글을 찾을 수 없습니다" };
  }

  try {
    const { post } = await getPostDetailServer({ post_id: id });
    const snippet = post.content.slice(0, 50);

    return {
      title: post.title,
      description: snippet,
      openGraph: {
        title: post.title,
        description: snippet,
        images: post.image_url ? [post.image_url] : [],
      },
    };
  } catch {
    return { title: "게시글을 찾을 수 없습니다" };
  }
}

export default async function CommunityPostDetailPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;

  // id가 숫자가 아닌 경우 notFound()리턴
  if (!/^\d+$/.test(id)) {
    return notFound();
  }

  const queryClient = new QueryClient();

  try {
    // 서버에 미리 가지고 있기 = prefetch
    await queryClient.prefetchQuery({
      queryKey: postKeys.detail(id),
      queryFn: () => getPostDetailServer({ post_id: id, include: "comments" }),
    });
  } catch (error) {
    const err = error as ServerFetcherError;
    if (err.status === 404) {
      return notFound();
    }
    throw error;
  }

  // 완성된 상태(dehydratedState) 만들어서 클라이언트에 보냄
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PostDetailPageClient id={id} />
    </HydrationBoundary>
  );
}
