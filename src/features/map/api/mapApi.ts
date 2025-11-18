import { clientFetcher } from "@/shared/api/clientFetcher";
import type {
  CategoryResponse,
  DistrictResponse,
  NeighborhoodResponse,
  ProvinceResponse,
  StoreFilters,
  StoreResponse,
} from "@/types/mapTypes";

/**
 * 도/광역시 목록을 조회합니다.
 */
export const getProvinces = () => clientFetcher<ProvinceResponse>("/locations", { auth: "public" });

/**
 * 특정 도에 속한 시/군/구 목록을 조회합니다.
 */
export const getDistricts = (provinceCode: string) =>
  clientFetcher<DistrictResponse>(`/locations/${provinceCode}`, { auth: "public" });

/**
 * 시/군/구와 도 정보를 기반으로 읍/면/동 목록을 조회합니다.
 */
export const getNeighborhoods = (provinceCode: string, districtCode: string) =>
  clientFetcher<NeighborhoodResponse>(`/locations/${provinceCode}/${districtCode}`, {
    auth: "public",
  });

/**
 * 지도에서 사용 가능한 카테고리 목록을 조회합니다.
 */
export const getCategories = () =>
  clientFetcher<CategoryResponse>("/stores/categories", { auth: "public" });

const buildStorePayload = (filters?: StoreFilters) => {
  if (!filters) return {};

  const payload: Record<string, string> = {};

  if (filters.province_code) payload.province_code = filters.province_code;
  if (filters.district_code) payload.district_code = filters.district_code;
  if (filters.neighborhood_code) payload.neighborhood_code = filters.neighborhood_code;
  if (filters.category) payload.category = filters.category;

  return payload;
};

/**
 * 가게 목록을 조회합니다.
 */
export const getStores = (filters?: StoreFilters) => {
  const params = new URLSearchParams(buildStorePayload(filters));
  const query = params.toString();
  const endpoint = query ? `/stores?${query}` : "/stores";

  return clientFetcher<StoreResponse>(endpoint, {
    method: "GET",
    auth: "public",
  });
};
