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

export const mapStoresToListItems = (stores: Store[]): MappedStore[] =>
  stores.map((store) => ({
    id: store.id,
    name: store.name,
    category: store.category_name,
    phone: store.phone,
    address: `${store.province} ${store.district}${store.neighborhood ? ` ${store.neighborhood}` : ""}`,
    latitude: Number(store.latitude),
    longitude: Number(store.longitude),
  }));
