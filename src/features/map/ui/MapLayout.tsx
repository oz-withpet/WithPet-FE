import MapAside from "./MapAside";
import MapContainer from "./MapContainer";

/**
 * 지도 페이지 전체 레이아웃입니다.
 *
 * - 오른쪽엔 실제 지도를, 왼쪽엔 검색/목록 패널을 붙입니다.
 * - 상위(page.tsx 등)에서는 이 컴포넌트 하나만 불러 사용하면 됩니다.
 */
export default function MapLayout() {
  return (
    <section className="flex h-dvh max-h-[780px] w-full overflow-hidden rounded-2xl">
      <MapContainer />
      <MapAside />
    </section>
  );
}
