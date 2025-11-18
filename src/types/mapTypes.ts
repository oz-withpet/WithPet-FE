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

export type StoreCategory = {
  id: string;
  name: string;
  code: string;
};

export type StoreAddress = {
  province: string;
  district: string;
  neighborhood: string;
  detail: string;
  full_address: string;
  postal_code: string;
};

export type Store = {
  id: number;
  name: string;
  category: StoreCategory;
  address: StoreAddress;
  phone: string;
  rating: number;
  review_count: number;
  tags: string[];
  distance: number;
  thumbnail_url: string;
  latitude: number;
  longitude: number;
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
  province?: string;
  district?: string;
  neighborhood?: string;
  categoryCodes?: string[];
  latitude?: number;
  longitude?: number;
  keyword?: string;
};

export type StoreResponse = {
  success: boolean;
  data: Store[];
};
