"use client";

import { useMemo } from "react";

import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useSelector } from "react-redux";

import useKakaoLoader from "@/shared/hooks/useKakaoLoader";
import type { RootState } from "@/shared/store";
import type { StoreMarker } from "@/shared/store/mapSlice";

/**
 * 실제 카카오 지도를 렌더링하는 컨테이너
 *
 * - Redux에 저장된 `storeMarkers`를 읽어서 지도에 마커로 표시
 * - 아직 조회한 데이터가 없다면, 임시 더미 데이터를 사용해 기본 마커를 노출
 */
export default function MapContainer() {
  useKakaoLoader();

  const center = useSelector((state: RootState) => state.map.center);
  const storeMarkers = useSelector((state: RootState) => state.map.storeMarkers);

  const mockStoreMarkers: StoreMarker[] = useMemo(
    () => [
      { id: 1, name: "행복동물병원", latitude: 37.4979, longitude: 127.0276 },
      { id: 2, name: "멍멍카페 강남점", latitude: 37.5502, longitude: 126.9121 },
      { id: 3, name: "펫살롱 논현", latitude: 37.5112, longitude: 127.0217 },
    ],
    [],
  );

  const markers = storeMarkers.length > 0 ? storeMarkers : mockStoreMarkers;

  return (
    <div className="relative flex h-full w-full flex-1 items-center justify-center bg-thumbnail-200">
      <Map center={center} level={3} style={{ width: "100%", height: "100%" }}>
        {markers.map((marker) => (
          <MapMarker
            key={marker.id}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            title={marker.name}
          />
        ))}
      </Map>
    </div>
  );
}
