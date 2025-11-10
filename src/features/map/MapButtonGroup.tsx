"use client";

import { useState } from "react";

import Button from "@/components/common/button/Button";
import { useCategories } from "@/shared/hooks/useCategories";
import type { FilterCategory } from "@/types/mapTypes";

export default function MapButtonGroup() {
  const [activeCategoryCode, setActiveCategoryCode] = useState<string | null>(null);
  const { data, isLoading, isError } = useCategories();

  const categories: FilterCategory[] = data?.data ?? [];

  const handleCategoryClick = (code: string) => {
    setActiveCategoryCode((previousCode) => (previousCode === code ? null : code));
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
    <div className="mb-4 flex gap-2 overflow-x-auto overflow-y-hidden pb-1">
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
