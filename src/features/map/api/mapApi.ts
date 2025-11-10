import { apiClient } from "@/shared/api/client";
import type {
  CategoryResponse,
  DistrictResponse,
  LocationParams,
  NeighborhoodResponse,
  ProvinceResponse,
  StoreFilters,
  StoreResponse,
} from "@/types/mapTypes";

/**
 * LocationParams 객체를 URL 쿼리스트링으로 변환합니다.
 *
 * 예:
 * ```ts
 * buildQuery({ province: "SEOUL", district: "GANGNAM" })
 * // => "?province=SEOUL&district=GANGNAM"
 * ```
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
 * 특정 도에 속한 시/군/구 목록을 조회합니다.
 *
 * @param params.province - 도/광역시 ID
 */
export const getDistricts = (params?: Pick<LocationParams, "province">) =>
  apiClient<DistrictResponse>(`/api/map/districts${buildQuery(params)}`);

/**
 * 시/군/구와 도 정보를 기반으로 읍/면/동 목록을 조회합니다.
 *
 * @param params - province와 district를 포함한 객체
 */
export const getNeighborhoods = (params?: LocationParams) =>
  apiClient<NeighborhoodResponse>(`/api/map/neighborhoods${buildQuery(params)}`);

/**
 * 지도에서 사용 가능한 카테고리 목록을 조회합니다.
 */
export const getCategories = () => apiClient<CategoryResponse>("/api/map/categories");

/**
 * 가게 목록을 조회합니다.
 *
 * @param filters - 지역, 카테고리, 좌표 정보를 담은 객체
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
