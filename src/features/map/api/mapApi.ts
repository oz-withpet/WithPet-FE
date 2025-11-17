import { apiClient } from "@/shared/api/client";
import { clientFetcher } from "@/shared/api/clientFetcher";
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
 * 지도 도메인 전용 API 모듈
 *
 * - 사용 흐름은 `shared/api/client.ts → features/map/api/mapApi.ts → 도메인 훅(useLocations/useStoreQuery 등) → 컴포넌트`
 * - client.ts 에서는 base URL, 공통 헤더만 정의하고 여기서는 실제 엔드포인트만 선언
 * - 다른 도메인에서도 `features/{domain}/api/{domain}Api.ts` 식으로 두면, 호출 구조가 한눈에 들어옴
 *
 * 예시)
 * ```ts
 * // 1) 공용 apiClient 가져오기
 * import { apiClient } from "@/shared/api/client";
 *
 * // 2) 도메인 API 파일에서 함수 작성
 * export const getFoo = () => apiClient("/api/foo");
 *
 * // 3) 해당 도메인 훅에서 호출
 * export function useFoo() {
 *   return useQuery({ queryKey: ["foo"], queryFn: getFoo });
 * }
 *
 * // 4) 컴포넌트에서 훅 사용
 * const { data } = useFoo();
 * ```
 */

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
export const getProvinces = () =>
  clientFetcher<ProvinceResponse>("/map/locations", { auth: "public" });

/**
 * 특정 도에 속한 시/군/구 목록을 조회합니다.
 *
 * @param params.province - 도/광역시 ID
 */
export const getDistricts = (params?: Pick<LocationParams, "province">) =>
  clientFetcher<DistrictResponse>(`/map/locations${buildQuery(params)}`);

/**
 * 시/군/구와 도 정보를 기반으로 읍/면/동 목록을 조회합니다.
 *
 * @param params - province와 district를 포함한 객체
 */
export const getNeighborhoods = (params?: LocationParams) =>
  clientFetcher<NeighborhoodResponse>(`/map/locations${buildQuery(params)}`);

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
