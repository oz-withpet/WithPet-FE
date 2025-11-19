import type { StoreDetailInfo } from "@/shared/store/mapSlice";
import type { Store, StoreSummary } from "@/types/mapTypes";

const toNumber = (value?: string | number | null) => {
  if (value == null) return undefined;
  if (typeof value === "number") return Number.isFinite(value) ? value : undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const buildAddress = (store: StoreSummary) => {
  if (store.address) return store.address;
  const parts = [store.province, store.district, store.neighborhood].filter(Boolean);
  return parts.length > 0 ? parts.join(" ") : undefined;
};

const isStructuredStore = (store: Store | StoreSummary): store is Store => "category" in store;

export const mapStoresToListItems = (stores: Array<Store | StoreSummary>): StoreDetailInfo[] => {
  const mapped: StoreDetailInfo[] = [];

  for (const store of stores) {
    if (isStructuredStore(store)) {
      mapped.push({
        id: store.id,
        name: store.name,
        category: store.category.name,
        phone: store.phone ?? undefined,
        address: store.address.full_address,
        latitude: store.address.latitude,
        longitude: store.address.longitude,
      });
      continue;
    }

    const latitude = toNumber(store.latitude);
    const longitude = toNumber(store.longitude);
    if (latitude == null || longitude == null) continue;

    mapped.push({
      id: store.id,
      name: store.name,
      category: store.category_name ?? "카테고리 정보 없음",
      phone: store.phone ?? undefined,
      address: buildAddress(store),
      latitude,
      longitude,
    });
  }

  return mapped;
};
