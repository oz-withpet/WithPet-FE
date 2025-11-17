"use client";

import { useRouter } from "next/navigation";

import PostItem from "@/components/common/cards/PostItem";
import EmptyState from "@/components/common/empty/EmptyState";
import type { Category } from "@/types/category";

import { PostSummary } from "../api/type";

type CommunityShellProps = {
  category: Category;
  posts: PostSummary[];
};

export default function CommunityShell({ category, posts }: CommunityShellProps) {
  const router = useRouter();

  if (posts.length === 0) {
    return (
      <div className="mx-auto w-main">
        <EmptyState
          title="아직 게시글이 없어요."
          description="첫 번째 글을 작성해보세요!"
          actionLabel="글 작성하기"
          onAction={() => router.push("/community/write")}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto w-main">
      <ul className="flex flex-col gap-3">
        {posts.map((post) => (
          <li key={post.id}>
            <PostItem {...post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
