"use client";

import { useDispatch, useSelector } from "react-redux";

import Button from "@/components/common/button/Button";
import type { RootState } from "@/shared/store";
import { setSelectedCategory } from "@/shared/store/mapSlice";
import type { FilterCategory } from "@/types/mapTypes";

import { useCategories } from "../api/useCategories";

/**
 * 지도에서 사용할 카테고리 버튼을 렌더링합니다.
 *
 * - React Query로 카테고리 목록을 가져온 뒤 버튼으로 노출합니다.
 * - 선택 결과는 Redux `selectedCategory`에 저장되어 필터링에 활용됩니다.
 */
export default function MapButtonGroup() {
  const dispatch = useDispatch();
  const activeCategoryCode = useSelector((state: RootState) => state.map.selectedCategory);
  const { data, isLoading, isError } = useCategories();

  const categories: FilterCategory[] = data?.data ?? [];

  const handleCategoryClick = (code: string) => {
    dispatch(setSelectedCategory(activeCategoryCode === code ? null : code));
  };

  if (isLoading) {
    return <p className="text-sm text-gray-500">카테고리를 불러오는 중입니다.</p>;
  }

  if (isError) {
    return <p className="text-sm text-red-500">카테고리를 불러오지 못했습니다.</p>;
  }

  if (categories.length === 0) {
    return <p className="text-sm text-gray-500">표시할 카테고리가 없습니다.</p>;
  }

  return (
    <div className="flex gap-2 overflow-x-auto overflow-y-hidden pb-1">
      {categories.map((category) => (
        <Button
          key={category.id}
          status="primary"
          className="flex-none rounded-[4px]"
          isActive={activeCategoryCode === category.code}
          onClick={() => handleCategoryClick(category.code)}
        >
          <span>{category.name}</span>
        </Button>
      ))}
    </div>
  );
}
