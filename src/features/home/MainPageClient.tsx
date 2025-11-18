"use client";

import RecommendedContentCard from "@/components/common/cards/RecommendedContentCard";
import EmptyState from "@/components/common/empty/EmptyState";

import { GetPostsParams } from "../community/api/type";
import { usePostsQuery } from "../community/api/usePostsQuery";

const MAIN_LIST_PARAMS: GetPostsParams = {
  view: "main",
};

export default function MainPageClient() {
  const { data, isLoading, isError } = usePostsQuery(MAIN_LIST_PARAMS);

  if (isLoading) {
    return <div className="mx-auto w-main py-8">메인 게시글을 불러오는 중입니다...</div>;
  }

  if (isError || !data) {
    return (
      <div className="mx-auto w-main py-8">
        <EmptyState title="게시글을 불러오지 못했어요." description="잠시 후 다시 시도해주세요." />
      </div>
    );
  }

  if (!data.posts.length) {
    return (
      <div className="mx-auto w-main py-8">
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
    <div className="m-auto flex w-main flex-col items-center pt-12 text-gray-900">
      <div className="text-2xl font-semibold">추천 콘텐츠</div>
      <div className="flex flex-wrap justify-between">
        {data?.posts?.map((el) => (
          <RecommendedContentCard key={el.id} {...el} />
        ))}
      </div>
    </div>
  );
}
