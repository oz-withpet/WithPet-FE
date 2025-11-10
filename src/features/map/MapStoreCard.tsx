"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

interface MapStoreCardProps {
  name: string;
  category: string;
  phone?: string;
  address?: string;
  isFavorite?: boolean;
}

/**
 * 지도 사이드바에 노출되는 가게 카드입니다.
 *
 * - 좋아요 버튼은 임시 상태만 관리하며, 추후 공용 컴포넌트로 대체할 예정입니다.
 * - "자세히" 버튼을 누르면 부드럽게 상세 정보가 펼쳐지고 텍스트가 "접기"로 변경됩니다.
 */
export default function MapStoreCard({
  name,
  category,
  phone,
  address,
  isFavorite = false,
}: MapStoreCardProps) {
  const [opened, setOpened] = useState(false);
  const [favorite, setFavorite] = useState(isFavorite);

  const toggleOpened = () => setOpened((prev) => !prev);
  const toggleFavorite = () => setFavorite((prev) => !prev);

  return (
    <div className="rounded-xl bg-thumbnail-200 p-4 shadow-sm">
      <div className="flex-between mb-2">
        <p className="font-semibold text-gray-900">{name}</p>
        <button
          type="button"
          className="font-semibold text-gray-600"
          onClick={toggleFavorite}
          aria-label={favorite ? "관심 목록에서 제거" : "관심 목록에 추가"}
        >
          {favorite ? "❤️" : "🩶"}
        </button>
      </div>

      <div className="flex-between">
        <p className="text-sm text-gray-600">{category}</p>
        <button
          type="button"
          className="flex items-center gap-1 text-sm font-semibold text-gray-600"
          onClick={toggleOpened}
        >
          <span>{opened ? "접기" : "자세히"}</span>
          <span aria-hidden="true" className={cn("transition-transform", opened ? "rotate-180" : "")}>
            ▼
          </span>
        </button>
      </div>

      <div
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-in-out",
          opened ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0">
          <div className="mt-4 space-y-1 text-sm text-gray-500">
            {phone && <p>전화번호 : {phone}</p>}
            {address && <p>주소 : {address}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
