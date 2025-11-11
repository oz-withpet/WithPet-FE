"use client";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "@/shared/store";
import { setCenter, setUserLocation } from "@/shared/store/mapSlice";

const USER_LOCATION_STORAGE_KEY = "withpet:userLocation";

/**
 * 지도 검색 영역 상단 헤더 + 현 위치 찾기 버튼
 */
export default function MapHeaderGroup() {
  const dispatch = useDispatch<AppDispatch>();
  const userLocation = useSelector((state: RootState) => state.map.userLocation);
  const [isLocating, setIsLocating] = useState(false);

  // 저장해 둔 위치 정보가 있으면 초기 렌더 시 바로 center/userLocation에 반영해서
  // 사용자가 새로고침해도 “현 위치” 버튼 누르자마자 빠르게 되돌아갈 수 있게 함
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem(USER_LOCATION_STORAGE_KEY);
      if (!saved) return;
      const parsed = JSON.parse(saved) as { latitude: number; longitude: number };
      dispatch(setUserLocation(parsed));
      dispatch(setCenter(parsed));
    } catch (error) {
      console.warn("사용자 위치 정보를 불러오지 못했습니다.", error);
    }
  }, [dispatch]);

  // 현 위치 버튼 로직
  // 1. 이전에 위치를 저장해 둔 경우 → 즉시 center 갱신 (빠른 UX)
  // 2. 위치가 없다면 geolocation 호출 → 성공 시 Redux + localStorage에 저장
  // 3. 지오로케이션이 오래 걸리면 timeout으로 사용자에게 실패 안내
  const handleCurrentLocation = () => {
    if (userLocation) {
      dispatch(setCenter(userLocation));
      return;
    }

    if (!navigator.geolocation) {
      alert("브라우저에서 위치 정보를 지원하지 않습니다.");
      return;
    }

    setIsLocating(true);
    let timeoutId: number | null = window.setTimeout(() => {
      alert("현 위치를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
      setIsLocating(false);
    }, 3000);

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        const payload = { latitude: coords.latitude, longitude: coords.longitude };
        dispatch(setCenter(payload)); // 1,2. 위치 저장 후 지도 리렌더
        dispatch(setUserLocation(payload));
        if (typeof window !== "undefined") {
          localStorage.setItem(USER_LOCATION_STORAGE_KEY, JSON.stringify(payload));
        }
        setIsLocating(false);
      },
      () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        alert("현 위치를 불러오지 못했습니다.");
        setIsLocating(false);
      },
    );
  };

  return (
    <>
      <div className="mb-2 flex items-center justify-between font-semibold text-gray-900">
        <h2 className="text-xl">위치 찾기</h2>
        <button
          type="button"
          className="text-primary-500 text-base disabled:text-gray-400"
          onClick={handleCurrentLocation}
          disabled={isLocating}
        >
          {isLocating ? "현 위치 찾는 중..." : "현 위치"}
        </button>
      </div>
      <p className="mb-1 text-sm text-gray-400">시도/시군구 까지 입력이 필요합니다.</p>
    </>
  );
}
