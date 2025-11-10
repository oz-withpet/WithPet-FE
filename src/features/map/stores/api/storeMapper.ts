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
 * API에서 내려온 Store 데이터를 UI에서 쓰기 편한 형태로 변환합니다.
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
