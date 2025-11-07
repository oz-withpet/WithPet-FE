import { http, HttpResponse } from "msw";

import { provinces, districts, neighborhoods, categories, stores } from "../data/mapData";

export const mapHandlers = [
  http.get("/api/map/provinces", () => HttpResponse.json({ success: true, data: provinces })),

  http.get("/api/map/districts", () => HttpResponse.json({ data: districts })),

  http.get("/api/map/neighborhoods", () => HttpResponse.json({ data: neighborhoods })),

  http.get("/api/map/categories", () => HttpResponse.json({ data: categories })),

  http.get("/api/map/stores", () =>
    HttpResponse.json({
      data: {
        items: stores,
        filters: {
          province: "서울특별시",
          district: "강남구",
          neighborhood: null,
          categories: [],
          keyword: null,
        },
      },
    }),
  ),

  http.get("/api/map/stores/:id", ({ params }) => {
    const { id } = params;
    const store = stores.find((s) => s.id === id);
    if (!store) return HttpResponse.json({ message: "Not Found" }, { status: 404 });
    return HttpResponse.json({ data: store });
  }),
];
