import { clientFetcher } from "@/shared/api/clientFetcher";
import type {
  CategoryResponse,
  DistrictResponse,
  NeighborhoodResponse,
  ProvinceResponse,
  StoreFilters,
  StoreResponse,
  StoreViewportRequest,
} from "@/types/mapTypes";

export const getProvinces = () =>
  clientFetcher<ProvinceResponse>("/locations/", { auth: "public" });

export const getDistricts = (provinceCode: string) =>
  clientFetcher<DistrictResponse>(`/locations/${provinceCode}/`, { auth: "public" });

export const getNeighborhoods = (provinceCode: string, districtCode: string) =>
  clientFetcher<NeighborhoodResponse>(`/locations/${provinceCode}/${districtCode}/`, {
    auth: "public",
  });

export const getCategories = () =>
  clientFetcher<CategoryResponse>("/categories/", { auth: "public" });

const buildStorePayload = (filters?: StoreFilters) => {
  if (!filters) return {};

  const payload: Record<string, string> = {};

  if (filters.province_code) payload.province_code = filters.province_code;
  if (filters.district_code) payload.district_code = filters.district_code;
  if (filters.neighborhood_code) payload.neighborhood_code = filters.neighborhood_code;
  if (filters.category) payload.category = filters.category;

  return payload;
};

export const getStores = (filters?: StoreFilters) => {
  const params = new URLSearchParams(buildStorePayload(filters));
  const query = params.toString();
  const endpoint = query ? `/stores/?${query}` : "/stores";

  return clientFetcher<StoreResponse>(endpoint, {
    method: "GET",
    auth: "public",
  });
};

export const searchStoresByViewport = (payload: StoreViewportRequest) =>
  clientFetcher<StoreResponse>("/stores/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    auth: "public",
  });
