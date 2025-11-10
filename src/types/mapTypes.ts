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

export type FilterCategory = {
  id: string;
  name: string;
  code: string;
  icon: string;
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

export type ProvinceResponse = {
  success: boolean;
  data: Province[];
};

export type DistrictResponse = {
  success: boolean;
  data: District[];
};

export type NeighborhoodResponse = {
  success: boolean;
  data: Neighborhood[];
};

export type CategoryResponse = {
  success: boolean;
  data: FilterCategory[];
};

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
