"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { useDispatch, useSelector } from "react-redux";

import Button from "@/components/common/button/Button";
import useKakaoLoader from "@/shared/hooks/useKakaoLoader";
import type { AppDispatch, RootState } from "@/shared/store";
import { setCenter } from "@/shared/store/mapSlice";
import type { StoreDetailInfo, StoreMarker } from "@/shared/store/mapSlice";

/**
 * 실제 카카오 지도를 렌더링하는 컨테이너
 *
 * - Redux에 저장된 `storeMarkers`를 읽어서 지도에 마커로 표시
 * - 아직 조회한 데이터가 없다면, 임시 더미 데이터를 사용해 기본 마커를 노출
 */
export default function MapContainer() {
  useKakaoLoader();

  const dispatch = useDispatch<AppDispatch>();
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const center = useSelector((state: RootState) => state.map.center);
  const storeMarkers = useSelector((state: RootState) => state.map.storeMarkers);
  const storeDetails = useSelector((state: RootState) => state.map.storeDetails);
  const [activeStoreId, setActiveStoreId] = useState<number | null>(null);
  // 검색 전 지도 표시용 mock 데이터
  const mockStoreDetails: StoreDetailInfo[] = useMemo(
    () => [
      {
        id: 1,
        name: "행복동물병원",
        category: "동물병원",
        latitude: 37.4979,
        longitude: 127.0276,
        phone: "02-1234-5678",
        address: "서울특별시 강남구 역삼동 123-45",
      },
      {
        id: 2,
        name: "멍멍카페 강남점",
        category: "애견카페",
        latitude: 37.5502,
        longitude: 126.9121,
        phone: "02-4321-8765",
        address: "서울특별시 마포구 합정동 11-2",
      },
      {
        id: 3,
        name: "펫살롱 논현",
        category: "애견미용",
        latitude: 37.5112,
        longitude: 127.0217,
        phone: "02-2468-1357",
        address: "서울특별시 강남구 논현동 45-1",
      },
    ],
    [],
  );

  const details = storeDetails.length > 0 ? storeDetails : mockStoreDetails;
  const markers: StoreMarker[] =
    storeMarkers.length > 0
      ? storeMarkers
      : mockStoreDetails.map(({ id, name, latitude, longitude }) => ({
          id,
          name,
          latitude,
          longitude,
        }));

  const selectedStore = activeStoreId
    ? (details.find((store) => store.id === activeStoreId) ?? null)
    : null;

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setCenter(new kakao.maps.LatLng(center.latitude, center.longitude));
    }
  }, [center.latitude, center.longitude]);

  const handleCenterChanged = (mapInstance: kakao.maps.Map) => {
    const latLng = mapInstance.getCenter();
    dispatch(
      setCenter({
        latitude: latLng.getLat(),
        longitude: latLng.getLng(),
      }),
    );
  };

  return (
    <div className="relative flex h-full w-full flex-1 items-center justify-center bg-thumbnail-200">
      <Map
        ref={mapRef}
        center={{ lat: center.latitude, lng: center.longitude }}
        level={3}
        style={{ width: "100%", height: "100%" }}
        onCenterChanged={handleCenterChanged}
      >
        {markers.map((marker) => (
          <MapMarker
            key={marker.id}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            title={marker.name}
            onClick={() => setActiveStoreId(marker.id)}
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
                  onClick={() => setActiveStoreId(null)}
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
