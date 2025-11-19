"use client";

import { useQuery } from "@tanstack/react-query";

import { MyLikedPostsListResponse } from "@/types/mypage";

import { getMyLikedPosts, GetMyLikedPostsParams } from "../api/getMyLikedPosts";

export function useMyLikedPostsQuery(params: GetMyLikedPostsParams) {
  return useQuery<MyLikedPostsListResponse>({
    queryKey: ["mypage", "liked-posts", params],
    queryFn: () => getMyLikedPosts(params),
  });
}
