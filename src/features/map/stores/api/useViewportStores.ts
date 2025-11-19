"use client";

import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { searchStoresByViewport } from "@/features/map/api/mapApi";
import {
  setStoreDetails,
  setStoreMarkers,
  setStoresStatus,
  setTotalCount,
} from "@/shared/store/mapSlice";
import type { StoreViewportRequest } from "@/types/mapTypes";

import { mapStoresToListItems } from "./storeMapper";

export function useViewportStores() {
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: (payload: StoreViewportRequest) => searchStoresByViewport(payload),
    onMutate: () => {
      dispatch(setStoresStatus("loading"));
    },
    onError: () => {
      dispatch(setStoreMarkers([]));
      dispatch(setStoreDetails([]));
      dispatch(setStoresStatus("error"));
    },
    onSuccess: (response) => {
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
      dispatch(setTotalCount(response.count ?? mapped.length));
      dispatch(setStoresStatus("success"));
    },
  });

  return {
    fetchStores: mutation.mutate,
    fetchStoresAsync: mutation.mutateAsync,
  };
}
