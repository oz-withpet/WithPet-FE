"use client";

import { clientFetcher, type ClientFetcherOptions } from "@/shared/api/clientFetcher";

import type { GetPostDetailParams, GetPostDetailResponse } from "./type";

type ClientFetcherFn = <T>(path: string, options?: ClientFetcherOptions) => Promise<T>;

// 브라우저에서 React Query가 사용할 함수
export async function getPostDetailClient(
  { post_id, include, comments_limit, comments_after }: GetPostDetailParams,
  fetcher: ClientFetcherFn = clientFetcher,
): Promise<GetPostDetailResponse> {
  return fetcher<GetPostDetailResponse>(`/posts/${post_id}`, {
    auth: "public",
    query: {
      include,
      comments_limit,
      comments_after,
    },
  });
}
