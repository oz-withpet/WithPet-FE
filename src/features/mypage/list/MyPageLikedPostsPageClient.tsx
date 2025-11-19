"use client";

import LikeCard from "@/components/common/cards/LikeCard";

import { useMyLikedPostsQuery } from "../hooks/useMyLikedPostsQuery";

export default function MyPageLikedPostsPageClient() {
  const { data, isLoading, isError } = useMyLikedPostsQuery({});

  if (isLoading) {
    return <div className="mx-auto w-main py-8">좋아요한 게시글을 불러오는 중입니다…</div>;
  }

  if (isError || !data) {
    return (
      <div className="mx-auto w-main py-8 text-red-500">좋아요한 게시글을 불러오지 못했습니다.</div>
    );
  }

  const posts = data.posts; // MyPostSummary[]

  return (
    <div className="mx-wrapper flex h-[750px] w-wrapper flex-col items-center justify-center bg-orange-100">
      <div className="border-1 flex h-[700px] flex-wrap items-center justify-around border-gray-950 text-gray-900">
        {posts.map((el) => (
          <LikeCard key={el.id} {...el} />
        ))}
      </div>
    </div>
  );
}
