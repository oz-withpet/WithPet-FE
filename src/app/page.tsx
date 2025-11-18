import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";

import { getPostsServer } from "@/features/community/api/getPostsServer";
import { postKeys } from "@/features/community/api/queryKeys";
import { GetPostsParams } from "@/features/community/api/type";
import MainPageClient from "@/features/home/MainPageClient";

export const metadata: Metadata = {
  title: "WithPet Main",
  description: "강아지, 고양이 커뮤니티 최신 글을 확인하세요.",
};

const MAIN_LIST_PARAMS: GetPostsParams = {
  view: "main",
};

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: postKeys.list(MAIN_LIST_PARAMS),
    queryFn: () => getPostsServer(MAIN_LIST_PARAMS),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <MainPageClient />
    </HydrationBoundary>
  );
}
