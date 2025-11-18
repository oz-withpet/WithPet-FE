"use client";

import { useQuery } from "@tanstack/react-query";

import { getPostsClient } from "./getPostsClient";
import { postKeys } from "./queryKeys";
import { GetPostsParams, GetPostsResponse } from "./type";

export function usePostsQuery(params: GetPostsParams) {
  return useQuery<GetPostsResponse>({
    queryKey: postKeys.list(params),
    queryFn: () => getPostsClient(params),
    staleTime: 1000 * 10,
  });
}
