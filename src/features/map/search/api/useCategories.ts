"use client";

import { useQuery } from "@tanstack/react-query";

import { getCategories } from "@/features/map/api/mapApi";
import type { CategoryResponse } from "@/types/mapTypes";

/**
 * 지도에서 사용할 카테고리 목록을 조회하는 훅입니다.
 */
export function useCategories() {
  return useQuery<CategoryResponse, Error>({
    queryKey: ["map", "categories"],
    queryFn: getCategories,
  });
}
