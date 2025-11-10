import MapButtonGroup from "./MapButtonGroup";
import MapHeaderGroup from "./MapHeaderGroup";
import MapSelectGroup from "./MapSelectGroup";

/**
 * 지도 검색 영역을 묶는 래퍼 컴포넌트입니다.
 */
export default function MapSearchWrapper() {
  return (
    <section>
      <MapHeaderGroup />
      <MapSelectGroup />
      <MapButtonGroup />
    </section>
  );
}
