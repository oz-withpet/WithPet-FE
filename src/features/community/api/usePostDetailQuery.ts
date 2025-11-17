"use client";

import { useQuery } from "@tanstack/react-query";

import { getPostDetail } from "./getPostDetail";
import { postKeys } from "./queryKeys";
import { GetPostDetailParams, GetPostDetailResponse } from "./type";

export function usePostDetailQuery(params: GetPostDetailParams) {
  return useQuery<GetPostDetailResponse>({
    queryKey: postKeys.detail(params.id),
    queryFn: () => getPostDetail(params),
    staleTime: 1000 * 10,
  });
}
