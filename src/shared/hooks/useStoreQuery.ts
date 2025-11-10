"use client";

import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { mapStoresToListItems } from "@/features/map/mapper/storeMapper";
import { getStores } from "@/shared/api/mapApi";
import { setStoreMarkers } from "@/shared/store/mapSlice";
import type { StoreFilters, StoreResponse } from "@/types/mapTypes";

/**
 * 가게 목록을 가져오고, mapper를 통해 가공한 후 사용.
 * - district 값이 없으면 요청을 보내지 않습니다.
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
