"use client";

import { useQuery } from "@tanstack/react-query";

import { getPostsClient } from "./getPostsClient";
import { GetPostsParams, GetPostsResponse } from "./type";

export const postKeys = {
  all: ["posts"],
  list: (params: GetPostsParams) => [...postKeys.all, "list", params],
};

export function usePostsQuery(params: GetPostsParams) {
  return useQuery<GetPostsResponse>({
    queryKey: postKeys.list(params),
    queryFn: () => getPostsClient(params),
    staleTime: 1000 * 10,
  });
}
