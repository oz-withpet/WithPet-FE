"use client";

import { useEffect, useRef, useState } from "react";

import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { useDispatch, useSelector } from "react-redux";

import Button from "@/components/common/button/Button";
import { useViewportStores } from "@/features/map/stores/api/useViewportStores";
import useKakaoLoader from "@/shared/hooks/useKakaoLoader";
import type { AppDispatch, RootState } from "@/shared/store";
import {
  resetSelectedLocation,
  setActiveStoreId,
  setBlockNextIdle,
  setCenter,
  setSkipNextAutoFetch,
} from "@/shared/store/mapSlice";

export default function MapContainer() {
  useKakaoLoader();

  const dispatch = useDispatch<AppDispatch>();
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const center = useSelector((state: RootState) => state.map.center);
  const latestCenterRef = useRef(center);
  const storeMarkers = useSelector((state: RootState) => state.map.storeMarkers);
  const storeDetails = useSelector((state: RootState) => state.map.storeDetails);
  const selectedCategory = useSelector((state: RootState) => state.map.selectedCategory);
  const selectedLocation = useSelector((state: RootState) => state.map.selectedLocation);
  const centerReady = useSelector((state: RootState) => state.map.centerReady);
  const initialFetchDone = useSelector((state: RootState) => state.map.initialFetchDone);
  const blockNextIdle = useSelector((state: RootState) => state.map.blockNextIdle);
  const skipNextAutoFetch = useSelector((state: RootState) => state.map.skipNextAutoFetch);
  const activeStoreId = useSelector((state: RootState) => state.map.activeStoreId);
  const [pendingCenter, setPendingCenter] = useState(() => ({
    latitude: center.latitude,
    longitude: center.longitude,
  }));
  const [mapLevel, setMapLevel] = useState(3);
  const MIN_FETCH_LEVEL = 3;
  const fetchModeRef = useRef<"map" | "filters">("filters");
  const lastFetchRef = useRef<{ latitude: number; longitude: number; level: number } | null>(null);

  const { fetchStoresAsync } = useViewportStores();
  const hasRegionSelection = Boolean(
    selectedLocation.province_code ||
      selectedLocation.district_code ||
      selectedLocation.neighborhood_code,
  );

  const selectedStore = activeStoreId
    ? (storeDetails.find((store) => store.id === activeStoreId) ?? null)
    : null;

  useEffect(() => {
    const nextCenter = { latitude: center.latitude, longitude: center.longitude };
    latestCenterRef.current = nextCenter;
    if (mapRef.current) {
      mapRef.current.setCenter(new kakao.maps.LatLng(nextCenter.latitude, nextCenter.longitude));
    }
  }, [center.latitude, center.longitude]);

  useEffect(() => {
    const shouldUpdate =
      pendingCenter.latitude !== center.latitude || pendingCenter.longitude !== center.longitude;
    if (!shouldUpdate) return;
    const frame = requestAnimationFrame(() => {
      setPendingCenter({
        latitude: center.latitude,
        longitude: center.longitude,
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [center.latitude, center.longitude, pendingCenter.latitude, pendingCenter.longitude]);

  const hasMovedEnough = (
    prev: { latitude: number; longitude: number },
    next: { latitude: number; longitude: number },
  ) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(next.latitude - prev.latitude);
    const dLon = toRad(next.longitude - prev.longitude);
    const lat1 = toRad(prev.latitude);
    const lat2 = toRad(next.latitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance >= 3;
  };

  useEffect(() => {
    const mode = fetchModeRef.current;
    let cancelled = false;
    const delay = mode === "map" ? 300 : 0;
    if (!centerReady || !initialFetchDone) {
      return undefined;
    }
    if (skipNextAutoFetch) {
      return undefined;
    }
    const isCenterSynced =
      Math.abs(pendingCenter.latitude - center.latitude) < Number.EPSILON &&
      Math.abs(pendingCenter.longitude - center.longitude) < Number.EPSILON;
    if (!isCenterSynced) {
      return undefined;
    }
    if (hasRegionSelection) {
      return undefined;
    }
    if (mapLevel < MIN_FETCH_LEVEL) {
      return undefined;
    }
    if (
      mode === "map" &&
      lastFetchRef.current &&
      lastFetchRef.current.level === mapLevel &&
      !hasMovedEnough(lastFetchRef.current, pendingCenter)
    ) {
      return undefined;
    }
    const timer = setTimeout(() => {
      fetchStoresAsync({
        latitude: pendingCenter.latitude,
        longitude: pendingCenter.longitude,
        radius: Math.min(Math.max(mapLevel, 1), 6),
        filters: {
          category: selectedCategory ?? "",
        },
      })
        .then(() => {
          if (cancelled) return;
          lastFetchRef.current = {
            latitude: pendingCenter.latitude,
            longitude: pendingCenter.longitude,
            level: mapLevel,
          };
        })
        .catch(() => {});
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [
    dispatch,
    fetchStoresAsync,
    hasRegionSelection,
    centerReady,
    initialFetchDone,
    skipNextAutoFetch,
    mapLevel,
    pendingCenter,
    center.latitude,
    center.longitude,
    selectedCategory,
  ]);

  useEffect(() => {
    fetchModeRef.current = "filters";
    setPendingCenter({
      latitude: latestCenterRef.current.latitude,
      longitude: latestCenterRef.current.longitude,
    });
  }, [selectedCategory]);

  const handleMapIdle = (mapInstance: kakao.maps.Map) => {
    if (blockNextIdle) {
      dispatch(setBlockNextIdle(false));
      return;
    }
    if (skipNextAutoFetch) {
      dispatch(setSkipNextAutoFetch(false));
    }
    const latLng = mapInstance.getCenter();
    const nextCenter = {
      latitude: latLng.getLat(),
      longitude: latLng.getLng(),
    };
    const currentLevel = mapInstance.getLevel();
    const clampedLevel = Math.min(Math.max(currentLevel, 1), 6);
    if (clampedLevel !== currentLevel) {
      mapInstance.setLevel(clampedLevel);
    }
    setMapLevel(clampedLevel);

    if (hasRegionSelection) {
      dispatch(resetSelectedLocation());
    }
    dispatch(setCenter(nextCenter));

    fetchModeRef.current = "map";
    setPendingCenter(nextCenter);
  };

  return (
    <div className="relative flex h-full w-full flex-1 items-center justify-center bg-thumbnail-200">
      <Map
        ref={mapRef}
        center={{ lat: center.latitude, lng: center.longitude }}
        style={{ width: "100%", height: "100%" }}
        onIdle={handleMapIdle}
        onCreate={(mapInstance) => {
          mapInstance.setMaxLevel(6);
          mapInstance.setMinLevel(1);
        }}
      >
        {storeMarkers.map((marker) => (
          <MapMarker
            key={marker.id}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            title={marker.name}
            onClick={() => {
              dispatch(setActiveStoreId(marker.id));
            }}
          />
        ))}
        {selectedStore && (
          <CustomOverlayMap
            position={{ lat: selectedStore.latitude, lng: selectedStore.longitude }}
            yAnchor={1}
          >
            <div className="rounded-xl border-2 border-orange-200 bg-white p-3 text-sm shadow-md">
              <div className="mb-1 font-semibold text-gray-900">{selectedStore.name}</div>
              <p className="text-xs text-gray-600">{selectedStore.category}</p>
              {selectedStore.phone && (
                <p className="text-xs text-gray-500">{selectedStore.phone}</p>
              )}
              {selectedStore.address && (
                <p className="text-xs text-gray-500">{selectedStore.address}</p>
              )}
              <div className="mt-2">
                <Button
                  status="primary"
                  className="w-full rounded-[4px] px-3 py-1 text-xs"
                  onClick={() => {
                    dispatch(setActiveStoreId(null));
                  }}
                >
                  닫기
                </Button>
              </div>
            </div>
          </CustomOverlayMap>
        )}
      </Map>
    </div>
  );
}
