import PostDetailShell from "@/features/community/detail/PostDetailShell";
import { DUMMY_POST_DETAILS } from "@/mocks/data/postDetails";

import type { Metadata } from "next";

// 1) metadata
type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = Number(params.id);
  const post = DUMMY_POST_DETAILS.find((p) => p.id === id);

  if (!post) return { title: "게시글을 찾을 수 없습니다" };

  const snippet = post.content.slice(0, 50);

  const labelByCategory: Record<string, string> = {
    free: "자유게시판",
    qna: "질문게시판",
    info: "정보공유",
  };

  const categoryLabel = labelByCategory[post.category] ?? "커뮤니티";

  return {
    title: `${post.title}`,
    description: `${categoryLabel} · ${snippet}`,
    openGraph: {
      title: post.title,
      description: snippet,
      images: post.images?.length ? post.images : undefined,
    },
  };
}

export default function CommunityPostDetailPage() {
  return <PostDetailShell />;
}
