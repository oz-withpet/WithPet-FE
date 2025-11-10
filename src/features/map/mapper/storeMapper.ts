import type { Store } from "@/types/mapTypes";

export interface MappedStore {
  id: number;
  name: string;
  category: string;
  phone?: string;
  address?: string;
  latitude: number;
  longitude: number;
}

/**
 * API에서 내려오는 Store 데이터를 화면에서 쓰기 쉬운 형태로 변환.
 */
export const mapStoresToListItems = (stores: Store[]): MappedStore[] =>
  stores.map((store) => ({
    id: store.id,
    name: store.name,
    category: store.category.name,
    phone: store.phone,
    address: store.address.full_address,
    latitude: store.latitude,
    longitude: store.longitude,
  }));
