"use client";

import { Map } from "react-kakao-maps-sdk";

import useKakaoLoader from "@/shared/hooks/useKakaoLoader";

/**
 * 실제 카카오 지도를 렌더링하는 컨테이너입니다.
 *
 * - `useKakaoLoader` 훅이 SDK 로딩을 담당합니다.
 * - 중심 좌표나 레벨 값은 나중에 Redux/쿼리 상태와 연동해 갱신할 수 있습니다.
 */
export default function MapContainer() {
  useKakaoLoader();

  return (
    <div className="relative flex h-full w-full flex-1 items-center justify-center bg-thumbnail-200">
      <Map
        center={{ lat: 37.55319, lng: 126.9726 }}
        level={3}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
