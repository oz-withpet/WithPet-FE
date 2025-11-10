import MapSearchWrapper from "@/features/map/search/ui/MapSearchWrapper";
import MapStoreList from "@/features/map/stores/ui/MapStoreList";

/**
 * 지도 왼쪽에 표시되는 검색/목록 패널입니다.
 */
export default function MapAside() {
  return (
    <aside className="flex-col-between absolute left-[20px] top-[20px] z-[9999] h-full max-h-[calc(100%-40px)] w-full max-w-[450px] rounded-2xl border-4 border-line-light bg-white">
      <div className="flex h-full flex-col gap-4 p-4">
        <MapSearchWrapper />
        <MapStoreList className="min-h-0 flex-1" />
      </div>
    </aside>
  );
}
