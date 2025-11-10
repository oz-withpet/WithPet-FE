"use client";

import { useMemo } from "react";
import { useSelector } from "react-redux";

import { cn } from "@/lib/utils";
import type { RootState } from "@/shared/store";
import type { StoreFilters } from "@/types/mapTypes";

import { useStoreQuery } from "../api/useStoreQuery";
import MapStoreCard from "./MapStoreCard";

interface MapStoreListProps {
  className?: string;
}

/**
 * 선택한 지역/카테고리에 맞는 가게 목록을 출력합니다.
 *
 * - Redux에 저장된 `selectedLocation`, `selectedCategory`, `center`를 기반으로 필터를 구성합니다.
 * - `useStoreQuery`가 API를 호출하고, 반환된 목록을 카드 형태로 보여줍니다.
 */
export default function MapStoreList({ className }: MapStoreListProps) {
  const { province, district, neighborhood } = useSelector(
    (state: RootState) => state.map.selectedLocation,
  );
  const selectedCategory = useSelector((state: RootState) => state.map.selectedCategory);
  const center = useSelector((state: RootState) => state.map.center);

  const filters = useMemo<StoreFilters>(
    () => ({
      province: province || undefined,
      district: district || undefined,
      neighborhood: neighborhood || undefined,
      categoryCodes: selectedCategory ? [selectedCategory] : undefined,
      latitude: center.lat,
      longitude: center.lng,
    }),
    [province, district, neighborhood, selectedCategory, center.lat, center.lng],
  );

  const { data, isLoading, isError } = useStoreQuery(filters);

  if (!district) {
    return <p className="text-sm text-gray-500">시군구를 선택하면 가게 목록이 표시됩니다.</p>;
  }

  if (isLoading) {
    return <p className="text-sm text-gray-500">가게 목록을 불러오는 중입니다.</p>;
  }

  if (isError) {
    return <p className="text-sm text-red-500">가게 목록을 불러오지 못했습니다.</p>;
  }

  if (!data || data.length === 0) {
    return <p className="text-sm text-gray-500">표시할 가게가 없습니다.</p>;
  }

  return (
    <section className={cn("flex flex-col gap-3 overflow-y-auto pr-1", className)}>
      {data.map((store) => (
        <MapStoreCard
          key={store.id}
          name={store.name}
          category={store.category}
          phone={store.phone}
          address={store.address}
        />
      ))}
    </section>
  );
}
