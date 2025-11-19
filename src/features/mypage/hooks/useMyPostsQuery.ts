"use client";

import { useQuery } from "@tanstack/react-query";

import { MyPostsListResponse } from "@/types/mypage";

import { getMyPosts, MyPageListParams } from "../api/getMyPosts";

export function useMyPostsQuery(params: MyPageListParams = {}) {
  return useQuery<MyPostsListResponse>({
    queryKey: ["mypage", "posts", params],
    queryFn: () => getMyPosts(params),
  });
}
