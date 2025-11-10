import { http, HttpResponse } from "msw";

import { districts, mapCategories, neighborhoods, provinces, storeFixtures } from "../data/mapData";

export const mapHandlers = [
  http.get("/api/map/provinces", () => HttpResponse.json({ success: true, data: provinces })),

  http.get("/api/map/districts", ({ request }) => {
    const url = new URL(request.url);
    const provinceId = url.searchParams.get("province");
    const data = provinceId
      ? districts.filter((district) => district.province_id === provinceId)
      : districts;
    return HttpResponse.json({ success: true, data });
  }),

  http.get("/api/map/neighborhoods", ({ request }) => {
    const url = new URL(request.url);
    const districtId = url.searchParams.get("district");
    const data = districtId
      ? neighborhoods.filter((item) => item.district_id === districtId)
      : neighborhoods;
    return HttpResponse.json({ success: true, data });
  }),

  http.get("/api/map/categories", () => HttpResponse.json({ success: true, data: mapCategories })),

  http.get("/api/map/stores", () => HttpResponse.json({ success: true, data: storeFixtures })),
];
