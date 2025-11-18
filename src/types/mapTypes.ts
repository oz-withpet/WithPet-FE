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

export type Store = {
  id: number;
  name: string;
  category_name: string;
  province: string;
  district: string;
  neighborhood?: string;
  phone?: string;
  latitude: string;
  longitude: string;
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
  results: Store[];
};
