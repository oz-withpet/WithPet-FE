import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { getDistricts, getNeighborhoods, getProvinces } from "@/shared/api/mapApi";
import type {
  DistrictResponse,
  LocationParams,
  NeighborhoodResponse,
  ProvinceResponse,
} from "@/types/mapTypes";

/**
 * Query Key 생성 함수
 *
 * - 지역 단계(province, district)에 따라 React Query의 queryKey를 동적으로 구성한다.
 *
 * @param params - 지역 요청에 필요한 province, district 정보
 * @returns React Query에서 사용할 queryKey 배열
 */
const getLocationsKey = (params?: LocationParams) => [
  "map",
  "locations",
  params?.province ?? null,
  params?.district ?? null,
];

/**
 * 지역 API 응답 통합 타입
 *
 * - 시도(Province), 시군구(District), 읍면동(Neighborhood)응답 타입을 하나로 묶음
 */
type LocationResult = ProvinceResponse | DistrictResponse | NeighborhoodResponse;

/**
 * 요청 단계에 따라 fetcher 함수를 결정하는 유틸
 *
 * - province가 없으면 → 전체 시도 목록 요청
 * - province만 있으면 → 해당 시도의 시군구 목록 요청
 * - province + district가 모두 있으면 → 해당 시군구의 읍면동 목록 요청
 *
 * @param params - 지역 요청에 필요한 province, district 정보
 * @returns 요청에 맞는 fetch 함수
 */
const resolveFetcher = (params?: LocationParams) => {
  if (!params?.province) {
    return getProvinces;
  }
  if (params.province && !params.district) {
    return () => getDistricts({ province: params.province });
  }
  return () => getNeighborhoods({ province: params.province, district: params.district });
};

/**
 * useLocations 훅
 * -----------------------------------------------------
 * 지역(시도 → 시군구 → 읍면동) 데이터를 단계적으로 가져오는 커스텀 훅
 *
 * - `params` 값(province, district)에 따라 API 요청 단계를 자동으로 결정합니다.
 * - `enabled` 옵션을 통해 fetch 시점을 제어할 수 있습니다.
 *
 * @param params - 지역 요청에 필요한 province, district 정보
 * @param options - React Query의 추가 옵션 (`enabled` 등)
 */
export const useLocations = (
  params?: LocationParams,
  options?: Pick<UseQueryOptions<LocationResult, Error>, "enabled">,
) =>
  useQuery<LocationResult, Error>({
    queryKey: getLocationsKey(params),
    queryFn: resolveFetcher(params),
    enabled: options?.enabled ?? true,
  });
