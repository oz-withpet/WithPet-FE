"use client";

import MapAside from "./MapAside";
import MapContainer from "./MapContainer";

export default function MapLayout() {
  return (
    <section className="flex h-dvh max-h-[780px] w-full overflow-hidden rounded-2xl">
      <MapContainer />
      <MapAside />
    </section>
  );
}
