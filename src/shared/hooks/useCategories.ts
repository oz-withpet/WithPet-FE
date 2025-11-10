"use client";

import { useQuery } from "@tanstack/react-query";

import { getCategories } from "@/shared/api/mapApi";
import type { CategoryResponse } from "@/types/mapTypes";

/**
 * 지도 카테고리 목록 가져오는 훅
 *
 * - 성공 시 API에서 받은 data 배열을 가져옵니다.
 */
export function useCategories() {
  return useQuery<CategoryResponse, Error>({
    queryKey: ["map", "categories"],
    queryFn: getCategories,
  });
}
