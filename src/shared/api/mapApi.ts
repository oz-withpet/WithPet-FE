import type {
  CategoryResponse,
  DistrictResponse,
  LocationParams,
  NeighborhoodResponse,
  ProvinceResponse,
  StoreFilters,
  StoreResponse,
} from "@/types/mapTypes";

import { apiClient } from "./client";

/**
 * LocationParams 객체를 URL 쿼리스트링 형태로 변환합니다.
 *
 * 예: { province: "SEOUL", district: "GANGNAM" }
 *  → "?province=SEOUL&district=GANGNAM"
 *
 * @param params - 도/시군구 정보를 담은 객체 (없으면 빈 문자열 반환)
 * @returns 쿼리스트링이 포함된 문자열 (예: "?province=SEOUL&district=GANGNAM")
 */
const buildQuery = (params?: LocationParams) => {
  if (!params) return "";

  const searchParams = new URLSearchParams();

  if (params.province) {
    searchParams.set("province", params.province);
  }

  if (params.district) {
    searchParams.set("district", params.district);
  }

  const queryString = searchParams.toString();

  return queryString ? `?${queryString}` : "";
};

/**
 * 도/광역시 목록을 조회합니다.
 */
export const getProvinces = () => apiClient<ProvinceResponse>("/api/map/provinces");

/**
 * province 값을 전달하면 해당 도의 시/구/군 목록만 반환합니다.
 */
export const getDistricts = (params?: Pick<LocationParams, "province">) =>
  apiClient<DistrictResponse>(`/api/map/districts${buildQuery(params)}`);

/**
 * 시/군/구와 도 정보를 전달하면 해당 읍/면/동 목록을 반환합니다.
 */
export const getNeighborhoods = (params?: LocationParams) =>
  apiClient<NeighborhoodResponse>(`/api/map/neighborhoods${buildQuery(params)}`);

/**
 * 지도에서 사용할 카테고리 목록을 조회합니다.
 */
export const getCategories = () => apiClient<CategoryResponse>("/api/map/categories");

/**
 * 가게 목록을 조회합니다.
 *
 * @param filters - 지역/카테고리/좌표 정보를 담은 객체
 */
export const getStores = (filters?: StoreFilters) => {
  const params = new URLSearchParams();

  if (filters?.province) params.set("province", filters.province);
  if (filters?.district) params.set("district", filters.district);
  if (filters?.neighborhood) params.set("neighborhood", filters.neighborhood);
  if (filters?.categoryCodes?.length) params.set("categories", filters.categoryCodes.join(","));
  if (typeof filters?.latitude === "number") params.set("latitude", String(filters.latitude));
  if (typeof filters?.longitude === "number") params.set("longitude", String(filters.longitude));

  const query = params.toString();
  const endpoint = query ? `/api/map/stores?${query}` : "/api/map/stores";

  return apiClient<StoreResponse>(endpoint);
};
