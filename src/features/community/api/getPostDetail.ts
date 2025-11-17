import { serverFetcher, type ServerFetcherOptions } from "@/shared/api/serverFetcher";

import type { GetPostDetailParams, GetPostDetailResponse } from "./type";

type Fetcher = <T>(path: string, options?: ServerFetcherOptions) => Promise<T>;

export async function getPostDetail(
  { id, comments_limit, comments_after }: GetPostDetailParams,
  fetcher: Fetcher = serverFetcher,
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
