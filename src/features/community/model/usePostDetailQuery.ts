"use client";

import { useQuery } from "@tanstack/react-query";

import { getPostDetailClient } from "../api/getPostDetailClient";
import { GetPostDetailResponse } from "../api/type";

export function usePostDetailQuery(id: string) {
  return useQuery<GetPostDetailResponse>({
    queryKey: ["posts", id],
    queryFn: () => getPostDetailClient({ id: "MTIzNDU2Nzg5MDEyMw%3D%3D" }),
    enabled: !!id, // id가 있을 때만 쿼리 실행
  });
}
