"use client";

import { useEffect, useMemo, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getStores } from "@/features/map/api/mapApi";
import { mapStoresToListItems } from "@/features/map/stores/api/storeMapper";
import { cn } from "@/lib/utils";
import type { RootState } from "@/shared/store";
import {
  setActiveStoreId,
  setBlockNextIdle,
  setCenter,
  setSkipNextAutoFetch,
  setStoreDetails,
  setStoreMarkers,
  setStoresStatus,
  setTotalCount,
} from "@/shared/store/mapSlice";
import type { StoreFilters } from "@/types/mapTypes";

import MapStoreCard from "./MapStoreCard";

interface MapStoreListProps {
  className?: string;
}

/**
 * 선택한 지역/카테고리에 맞는 가게 목록을 출력합니다.
 *
 * - Redux에 저장된 `storeDetails`, `storesStatus`를 기반으로 현재 조회된 가게 목록을 표시합니다.
 * - 시/군/구를 선택한 경우엔 GET /stores? 필터로 조회해서 Redux 상태를 갱신합니다.
 */
export default function MapStoreList({ className }: MapStoreListProps) {
  const dispatch = useDispatch();
  const storeDetails = useSelector((state: RootState) => state.map.storeDetails);
  const totalCount = useSelector((state: RootState) => state.map.totalCount);
  const storesStatus = useSelector((state: RootState) => state.map.storesStatus);
  const { province_code, district_code, neighborhood_code } = useSelector(
    (state: RootState) => state.map.selectedLocation,
  );
  const selectedCategory = useSelector((state: RootState) => state.map.selectedCategory);
  const activeStoreId = useSelector((state: RootState) => state.map.activeStoreId);
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const filters = useMemo<StoreFilters>(
    () => ({
      province_code: province_code || undefined,
      district_code: district_code || undefined,
      neighborhood_code: neighborhood_code || undefined,
      category: selectedCategory || undefined,
    }),
    [province_code, district_code, neighborhood_code, selectedCategory],
  );

  useEffect(() => {
    if (!filters.district_code) return;

    let cancelled = false;
    dispatch(setStoresStatus("loading"));

    getStores(filters)
      .then((response) => {
        if (cancelled) return;
        const mapped = mapStoresToListItems(response.results ?? []);
        dispatch(setStoreDetails(mapped));
        dispatch(
          setStoreMarkers(
            mapped.map(({ id, name, latitude, longitude }) => ({
              id,
              name,
              latitude,
              longitude,
            })),
          ),
        );
        dispatch(setStoresStatus("success"));
        dispatch(setTotalCount(response.count ?? 0));
      })
      .catch(() => {
        if (cancelled) return;
        dispatch(setStoresStatus("error"));
        dispatch(setStoreMarkers([]));
        dispatch(setStoreDetails([]));
        dispatch(setTotalCount(0));
      });

    return () => {
      cancelled = true;
    };
  }, [dispatch, filters]);

  useEffect(() => {
    if (!activeStoreId) return;
    const target = cardRefs.current[activeStoreId];
    if (target) {
      const container = target.closest("section");
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const header = container.querySelector<HTMLDivElement>("[data-role='store-list-header']");
        const headerHeight = header ? header.getBoundingClientRect().height : 0;
        const offset = targetRect.top - containerRect.top - headerHeight - 24;
        container.scrollTo({ top: container.scrollTop + offset, behavior: "smooth" });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [activeStoreId, storeDetails]);

  if (!district_code && storeDetails.length === 0) {
    return <p className="text-sm text-gray-500">시군구를 선택하면 가게 목록이 표시됩니다.</p>;
  }

  if (storesStatus === "loading") {
    return <p className="text-sm text-gray-500">가게 목록을 불러오는 중입니다.</p>;
  }

  if (storesStatus === "error") {
    return <p className="text-sm text-red-500">가게 목록을 불러오지 못했습니다.</p>;
  }

  if (storeDetails.length === 0) {
    return <p className="text-sm text-gray-500">지도를 움직여 주변 가게를 확인해 보세요.</p>;
  }

  return (
    <section className={cn("flex flex-col gap-3 overflow-y-auto pr-1", className)}>
      <div
        className="sticky top-0 z-10 bg-white py-2 text-sm font-semibold text-gray-600"
        data-role="store-list-header"
      >
        총 {totalCount}개 매장
      </div>
      {storeDetails.map((store) => (
        <MapStoreCard
          key={store.id}
          name={store.name}
          category={store.category}
          phone={store.phone}
          address={store.address}
          isActive={activeStoreId === store.id}
          ref={(element) => {
            cardRefs.current[store.id] = element;
          }}
          onSelect={() => {
            if (store.latitude == null || store.longitude == null) return;
            const nextActiveId = activeStoreId === store.id ? null : store.id;
            dispatch(setActiveStoreId(nextActiveId));
            dispatch(setBlockNextIdle(true));
            dispatch(setSkipNextAutoFetch(true));
            dispatch(
              setCenter({
                latitude: store.latitude,
                longitude: store.longitude,
              }),
            );
          }}
        />
      ))}
    </section>
  );
}
