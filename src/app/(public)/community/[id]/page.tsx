import PostDetailShell from "@/features/community/detail/PostDetailShell";
import { DUMMY_POST_DETAILS } from "@/mocks/data/postDetails";

import type { Metadata } from "next";

// 1) metadata
type Params = { id: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;
  const postId = Number(id);
  const post = DUMMY_POST_DETAILS.find((p) => p.id === postId);

  if (!post) return { title: "게시글을 찾을 수 없습니다" };

  const snippet = post.content.slice(0, 50);

  return {
    title: post.title,
    description: snippet,
    openGraph: {
      title: post.title,
      description: snippet,
      images: post.images,
    },
  };
}

export default function CommunityPostDetailPage() {
  return <PostDetailShell />;
}
