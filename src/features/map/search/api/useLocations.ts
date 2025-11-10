import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { getDistricts, getNeighborhoods, getProvinces } from "@/features/map/api/mapApi";
import type {
  DistrictResponse,
  LocationParams,
  NeighborhoodResponse,
  ProvinceResponse,
} from "@/types/mapTypes";

/**
 * React Query에서 사용할 지역 데이터 전용 key를 생성합니다.
 */
const getLocationsKey = (params?: LocationParams) => [
  "map",
  "locations",
  params?.province ?? null,
  params?.district ?? null,
];

type LocationResult = ProvinceResponse | DistrictResponse | NeighborhoodResponse;

/**
 * 요청 단계에 맞는 fetcher를 반환합니다.
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

export const useLocations = (
  params?: LocationParams,
  options?: Pick<UseQueryOptions<LocationResult, Error>, "enabled">,
) =>
  useQuery<LocationResult, Error>({
    queryKey: getLocationsKey(params),
    queryFn: resolveFetcher(params),
    enabled: options?.enabled ?? true,
  });
