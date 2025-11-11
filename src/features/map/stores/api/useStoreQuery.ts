"use client";

import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { getStores } from "@/features/map/api/mapApi";
import { setStoreDetails, setStoreMarkers, type StoreDetailInfo } from "@/shared/store/mapSlice";
import type { StoreFilters, StoreResponse } from "@/types/mapTypes";

import { mapStoresToListItems } from "./storeMapper";

// @기능
// - 주어진 지역/카테고리/좌표 필터로 가게 목록을 요청하고 화면에서 쓰기 좋은 형태로 리턴
// @구현
// - district 없으면 바로 return해서 불필요한 API 요청 막고
// - select 옵션으로 응답 데이터를 mapper 한 번만 돌린 다음
// - useEffect에서 지도 마커랑 상세정보를 Redux에 저장해 MapContainer쪽에서 그대로 씀
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
      const markers = query.data.map((store) => ({
        id: store.id,
        name: store.name,
        latitude: store.latitude,
        longitude: store.longitude,
      }));

      const details: StoreDetailInfo[] = query.data.map((store) => ({
        id: store.id,
        name: store.name,
        latitude: store.latitude,
        longitude: store.longitude,
        category: store.category,
        phone: store.phone,
        address: store.address,
      }));

      dispatch(setStoreMarkers(markers));
      dispatch(setStoreDetails(details));
    }
  }, [dispatch, query.data]);

  return query;
}
