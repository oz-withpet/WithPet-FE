"use client";

import { CategorySlug } from "@/types/category";

import CommunityShell from "./CommunityShell";
import { usePostsQuery } from "../api/usePostsQuery";

type Props = {
  category: CategorySlug;
};

export default function CommunityCategoryPageClient({ category }: Props) {
  const { data, isLoading, isError } = usePostsQuery({ view: "main", limit: 12 });

  if (isLoading) {
    return <div className="mx-auto w-main py-8">게시글을 불러오는 중입니다...</div>;
  }

  if (isError || !data) {
    return <div className="mx-auto w-main py-8">게시글을 불러오지 못했습니다.</div>;
  }

  return <CommunityShell category={category} posts={data.posts} />;
}
