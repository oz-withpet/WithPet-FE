"use client";

import { useQuery } from "@tanstack/react-query";

import { getPosts, GetPostsParams } from "../api/getPostList";
import { GetPostsResponse } from "../api/getPostList";

export function usePostsQuery(params: GetPostsParams) {
  return useQuery<GetPostsResponse>({
    queryKey: ["posts", params],
    queryFn: () => getPosts(params),
  });
}
