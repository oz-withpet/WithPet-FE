"use client";

import CommunityShell from "@/features/community/list/CommunityShell";
import { Category } from "@/types/category";

import { useMyPostsQuery } from "../hooks/useMyPostsQuery";

type Props = {
  category: Category;
};

export default function MyPageCategoryPageClient({ category }: Props) {
  const { data, isLoading, isError } = useMyPostsQuery({});

  if (isLoading) {
    return <div className="mx-auto w-main py-8">내가 작성한 게시글을 불러오는 중입니다…</div>;
  }

  if (isError || !data) {
    return <div className="mx-auto w-main py-8 text-red-500">게시글을 불러오지 못했습니다.</div>;
  }

  const posts = data.posts; // 타입에 맞게 조정

  return <CommunityShell category={category} posts={posts} />;
}
