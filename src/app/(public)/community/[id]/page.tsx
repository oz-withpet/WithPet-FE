import { notFound } from "next/navigation";

import { getPostDetail } from "@/features/community/api/getPostDetail";
import PostDetailShell from "@/features/community/detail/PostDetailShell";
import type { ServerFetcherError } from "@/shared/api/serverFetcher";

import type { Metadata } from "next";

type Params = { id: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    return { title: "게시글을 찾을 수 없습니다" };
  }
  try {
    const { post } = await getPostDetail({
      id,
      comments_limit: 0,
    });
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

  if (!/^\d+$/.test(id)) {
    return notFound();
  }

  let post;
  try {
    const result = await getPostDetail({
      id,
      comments_limit: 0,
      // comments_after: 'cmt_cursor_20251021_030600',
    });
    post = result.post;
  } catch (error) {
    const err = error as ServerFetcherError;
    if (err.status === 404) {
      return notFound();
    }
    throw error;
  }
  return <PostDetailShell {...post} />;
}
