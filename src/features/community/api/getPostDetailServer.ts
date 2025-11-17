import { serverFetcher, type ServerFetcherOptions } from "@/shared/api/serverFetcher";

import type { GetPostDetailParams, GetPostDetailResponse } from "./type";

type ServerFetcherFn = <T>(path: string, options?: ServerFetcherOptions) => Promise<T>;

// 서버에서 상세 정보를 직접 가져올 때 사용
export async function getPostDetailServer(
  { id, comments_limit, comments_after }: GetPostDetailParams,
  fetcher: ServerFetcherFn = serverFetcher,
): Promise<GetPostDetailResponse> {
  return fetcher<GetPostDetailResponse>(`/posts/${id}`, {
    auth: "public",
    query: {
      include: "comments",
      comments_limit,
      comments_after,
    },
  });
}
