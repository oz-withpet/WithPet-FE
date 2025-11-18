"use client";

import PostItem from "@/components/common/cards/PostItem";
import EmptyState from "@/components/common/empty/EmptyState";
import { CATEGORY_LABEL_BY_SLUG, CategorySlug } from "@/types/category";

import { PostSummary } from "../api/type";

type CommunityShellProps = {
  category: CategorySlug;
  posts: PostSummary[];
};

export default function CommunityShell({ category, posts }: CommunityShellProps) {
  const filtered =
    category === "all"
      ? posts
      : posts?.filter((post) => post.category === CATEGORY_LABEL_BY_SLUG[category]);

  if (posts?.length === 0) {
    return (
      <div className="mx-auto w-main">
        <EmptyState
          title="아직 게시글이 없어요."
          description="첫 번째 글을 작성해보세요!"
          actionLabel="글 작성하기"
          routerPush="/community/write"
        />
      </div>
    );
  }

  return (
    // “받은 데이터로 화면을 어떻게 그릴지” 책임 → UI 담당
    <div className="mx-auto w-main">
      <ul className="flex flex-col gap-3">
        {filtered?.map((post) => (
          <li key={post.id}>
            <PostItem {...post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
