import MapButtonGroup from "./MapButtonGroup";
import MapHeaderGroup from "./MapHeaderGroup";
import MapSelectGroup from "./MapSelectGroup";

export default function MapSearchWrapper() {
  return (
    <section>
      <MapHeaderGroup />
      <MapSelectGroup />
      <MapButtonGroup />
    </section>
  );
}
