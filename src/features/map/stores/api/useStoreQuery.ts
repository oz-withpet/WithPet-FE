"use client";

import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { getStores } from "@/features/map/api/mapApi";
import { setStoreMarkers } from "@/shared/store/mapSlice";
import type { StoreFilters, StoreResponse } from "@/types/mapTypes";

import { mapStoresToListItems } from "./storeMapper";

/**
 * 가게 목록을 조회하고, 화면에서 쓰기 좋은 형태로 가공한 뒤 반환합니다.
 *
 * - district 값이 없으면 요청을 보내지 않습니다.
 * - 응답으로 받은 좌표는 Redux `storeMarkers`에 저장해 지도에서도 재사용합니다.
 */
export function useStoreQuery(filters: StoreFilters) {
  const dispatch = useDispatch();
  const enabled = Boolean(filters.district);

  const query = useQuery<StoreResponse, Error, ReturnType<typeof mapStoresToListItems>>({
    queryKey: ["map", "stores", filters],
    queryFn: () => getStores(filters),
    enabled,
    select: (response) => mapStoresToListItems(response.data),
  });

  useEffect(() => {
    if (query.data) {
      dispatch(
        setStoreMarkers(
          query.data.map((store) => ({
            id: store.id,
            name: store.name,
            latitude: store.latitude,
            longitude: store.longitude,
          })),
        ),
      );
    }
  }, [dispatch, query.data]);

  return query;
}
