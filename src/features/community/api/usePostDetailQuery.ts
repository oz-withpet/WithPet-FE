"use client";

import { useQuery } from "@tanstack/react-query";

import { getPostDetailClient } from "./getPostDetailClient";
import { postKeys } from "./queryKeys";
import { GetPostDetailParams, GetPostDetailResponse } from "./type";

// 데이터를 보게 하는 React Query 훅
export function usePostDetailQuery(params: GetPostDetailParams) {
  return useQuery<GetPostDetailResponse>({
    // 데이터가 있으면 그대로 사용,
    // queryKey.detail(params.id) 우리가 찾는 주소
    queryKey: postKeys.detail(params.id),
    // 없으면 getPostDetailClient로 서버에 물어본다.
    queryFn: () => getPostDetailClient(params),
    staleTime: 1000 * 10,
  });
}
