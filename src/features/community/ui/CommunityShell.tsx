"use client";

import PostItem from "@/components/common/cards/PostItem";
import { DUMMY_POST_DETAILS } from "@/mocks/data/postDetails";
import type { Category } from "@/types/category";

import EmptyState from "../EmptyState";

function selectPostsByCategory(category: Category) {
  return category === "all"
    ? DUMMY_POST_DETAILS
    : DUMMY_POST_DETAILS.filter((p) => p.category === category);
}

export default function CommunityShell({ category }: { category: Category }) {
  const posts = selectPostsByCategory(category);

  if (posts.length === 0) {
    return (
      <div className="mx-auto w-main">
        <EmptyState content="게시글 없습니다." />
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
