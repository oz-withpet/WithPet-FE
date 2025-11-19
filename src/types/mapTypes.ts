export type Neighborhood = {
  id: string;
  name: string;
  code: string;
  district_id: string;
};

export type District = {
  id: string;
  name: string;
  code: string;
  province_id: string;
};

export type Province = {
  id: string;
  name: string;
  code: string;
};

export type StoreCategoryInfo = {
  code: string;
  name: string;
};

export type StoreLocation = {
  full_address: string;
  latitude: number;
  longitude: number;
};

export type Store = {
  id: number;
  name: string;
  category: StoreCategoryInfo;
  address: StoreLocation;
  phone?: string | null;
  distance?: number;
  distance_text?: string;
};

/**
 * GET /stores 응답에서 내려오는 단순 정보 형태
 */
export type StoreSummary = {
  id: number;
  name: string;
  category_name?: string;
  province?: string;
  district?: string;
  neighborhood?: string;
  address?: string;
  phone?: string | null;
  latitude?: number | string | null;
  longitude?: number | string | null;
};

export type LocationParams = {
  province?: string;
  district?: string;
};

export type ProvinceLocation = {
  province_code: number;
  province_name: string;
};

export type DistrictLocation = {
  province_code: number;
  district_code: number;
  province_name: string;
  district_name: string;
};

export type NeighborhoodLocation = {
  province_code: number;
  district_code: number;
  neighborhood_code: number;
  province_name: string;
  district_name: string;
  neighborhood_name: string;
};

export type ProvinceResponse = ProvinceLocation[];
export type DistrictResponse = DistrictLocation[];
export type NeighborhoodResponse = NeighborhoodLocation[];

export type MapCategory = {
  code: string;
  name: string;
  count: number;
};

export type CategoryResponse = MapCategory[];

export type StoreFilters = {
  province_code?: string;
  district_code?: string;
  neighborhood_code?: string;
  category?: string;
};

export type StoreResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<Store | StoreSummary>;
  user_location?: {
    latitude: number;
    longitude: number;
  };
  radius_km?: number;
  filters_applied?: {
    category?: string;
    province_code?: number;
    district_code?: number;
  };
};

export type StoreViewportRequest = {
  latitude: number;
  longitude: number;
  radius: number;
  filters: {
    category?: string;
    province_code?: number | string;
    district_code?: number | string;
  };
};
