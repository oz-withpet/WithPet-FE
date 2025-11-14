"use client";

import { useRouter } from "next/navigation";

import PostItem from "@/components/common/cards/PostItem";
import EmptyState from "@/components/common/empty/EmptyState";
import { DUMMY_POST_DETAILS } from "@/mocks/data/postDetails";
import type { Category } from "@/types/category";

function selectPostsByCategory(category: Category) {
  return category === "all"
    ? DUMMY_POST_DETAILS
    : DUMMY_POST_DETAILS.filter((p) => p.category === category);
}

export default function CommunityShell({ category }: { category: Category }) {
  const router = useRouter();
  const posts = selectPostsByCategory(category);

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
