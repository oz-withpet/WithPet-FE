"use client";

import { forwardRef, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface MapStoreCardProps {
  name: string;
  category: string;
  phone?: string;
  address?: string;
  isFavorite?: boolean;
  isActive?: boolean;
  onSelect?: () => void;
}

/**
 * 지도 사이드바에 노출되는 가게 카드입니다.
 */
const MapStoreCard = forwardRef<HTMLDivElement, MapStoreCardProps>(
  ({ name, category, phone, address, isFavorite = false, isActive = false, onSelect }, ref) => {
    const [opened, setOpened] = useState(false);
    const [favorite, setFavorite] = useState(isFavorite);

    useEffect(() => {
      setOpened(isActive);
    }, [isActive]);

    const toggleOpened = () => setOpened((prev) => !prev);
    const toggleFavorite = () => setFavorite((prev) => !prev);

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl p-4 shadow-sm transition-colors",
          isActive
            ? "border-2 border-orange-200 bg-white text-gray-900"
            : "border border-transparent bg-thumbnail-200 text-gray-900",
          onSelect ? "cursor-pointer" : "cursor-default",
        )}
        role={onSelect ? "button" : undefined}
        tabIndex={onSelect ? 0 : undefined}
        onClick={onSelect}
        onKeyDown={(event) => {
          if (!onSelect) return;
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onSelect();
          }
        }}
      >
        <div className="flex-between mb-2">
          <p className="font-semibold text-gray-900">{name}</p>
          <button
            type="button"
            className="font-semibold text-gray-600"
            onClick={(event) => {
              event.stopPropagation();
              toggleFavorite();
            }}
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
            onClick={(event) => {
              event.stopPropagation();
              toggleOpened();
            }}
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
  },
);
MapStoreCard.displayName = "MapStoreCard";

export default MapStoreCard;
