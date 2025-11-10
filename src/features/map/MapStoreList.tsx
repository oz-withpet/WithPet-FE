"use client";

import { cn } from "@/lib/utils";

import MapStoreCard from "./MapStoreCard";

const mockStores = [
  {
    id: 1,
    name: "행복동물병원",
    category: "동물병원",
    phone: "02-1234-5678",
    address: "서울특별시 강남구 역삼동 123-45",
  },
  {
    id: 2,
    name: "멍멍카페 강남점",
    category: "애견카페",
    phone: "02-4321-8765",
    address: "서울특별시 마포구 합정동 11-2",
  },
  {
    id: 3,
    name: "펫살롱 논현",
    category: "애견미용",
    phone: "02-2468-1357",
    address: "서울특별시 강남구 논현동 45-1",
  },
  {
    id: 4,
    name: "펫살롱 논현",
    category: "애견미용",
    phone: "02-2468-1357",
    address: "서울특별시 강남구 논현동 45-1",
  },
];

interface MapStoreListProps {
  className?: string;
}

/**
 * 지도 사이드바에서 가게 카드를 모아 보여주는 리스트입니다.
 */
export default function MapStoreList({ className }: MapStoreListProps) {
  return (
    <section className={cn("flex flex-col gap-3 overflow-y-auto pr-1", className)}>
      {mockStores.map((store) => (
        <MapStoreCard key={store.id} {...store} />
      ))}
    </section>
  );
}
