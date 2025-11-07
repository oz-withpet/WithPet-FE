"use client";

import { Map } from "react-kakao-maps-sdk";

import useKakaoLoader from "../../hooks/useKakaoLoader";

export default function MapContainer() {
  // Kakao SDK 로드
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
