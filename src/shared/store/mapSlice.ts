import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface MapLocationSelection {
  province_code: string;
  district_code: string;
  neighborhood_code: string;
}

export interface StoreMarker {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export interface StoreDetailInfo extends StoreMarker {
  category: string;
  phone?: string;
  address?: string;
}

interface MapState {
  selectedCategory: string | null;
  selectedLocation: MapLocationSelection;
  center: {
    latitude: number;
    longitude: number;
  };
  centerReady: boolean;
  initialFetchDone: boolean;
  blockNextIdle: boolean;
  skipNextAutoFetch: boolean;
  storeMarkers: StoreMarker[];
  storeDetails: StoreDetailInfo[];
  activeStoreId: number | null;
  userLocation: {
    latitude: number;
    longitude: number;
  } | null;
  storesStatus: "idle" | "loading" | "success" | "error";
  totalCount: number;
}

const initialState: MapState = {
  selectedCategory: null,
  selectedLocation: {
    province_code: "",
    district_code: "",
    neighborhood_code: "",
  },
  center: {
    latitude: 37.55319,
    longitude: 126.9726,
  },
  centerReady: false,
  initialFetchDone: false,
  blockNextIdle: false,
  skipNextAutoFetch: false,
  storeMarkers: [],
  storeDetails: [],
  activeStoreId: null,
  userLocation: null,
  storesStatus: "idle",
  totalCount: 0,
};

/**
 * 지도 화면에서 필요한 공통 상태를 관리하는 슬라이스
 */
const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    resetSelectedLocation(state) {
      state.selectedLocation = {
        province_code: "",
        district_code: "",
        neighborhood_code: "",
      };
    },
    setSelectedCategory(state, action: PayloadAction<string | null>) {
      state.selectedCategory = action.payload;
    },
    setSelectedLocation(state, action: PayloadAction<Partial<MapLocationSelection>>) {
      state.selectedLocation = { ...state.selectedLocation, ...action.payload };
    },
    setCenter(state, action: PayloadAction<MapState["center"]>) {
      state.center = action.payload;
    },
    setCenterReady(state, action: PayloadAction<boolean>) {
      state.centerReady = action.payload;
    },
    setInitialFetchDone(state, action: PayloadAction<boolean>) {
      state.initialFetchDone = action.payload;
    },
    setBlockNextIdle(state, action: PayloadAction<boolean>) {
      state.blockNextIdle = action.payload;
    },
    setSkipNextAutoFetch(state, action: PayloadAction<boolean>) {
      state.skipNextAutoFetch = action.payload;
    },
    setStoreMarkers(state, action: PayloadAction<StoreMarker[]>) {
      state.storeMarkers = action.payload;
    },
    setStoreDetails(state, action: PayloadAction<StoreDetailInfo[]>) {
      state.storeDetails = action.payload;
    },
    setUserLocation(state, action: PayloadAction<{ latitude: number; longitude: number }>) {
      state.userLocation = action.payload;
    },
    setStoresStatus(state, action: PayloadAction<MapState["storesStatus"]>) {
      state.storesStatus = action.payload;
    },
    setTotalCount(state, action: PayloadAction<number>) {
      state.totalCount = action.payload;
    },
    setActiveStoreId(state, action: PayloadAction<number | null>) {
      state.activeStoreId = action.payload;
    },
  },
});

export const {
  resetSelectedLocation,
  setCenter,
  setCenterReady,
  setInitialFetchDone,
  setBlockNextIdle,
  setSkipNextAutoFetch,
  setSelectedCategory,
  setSelectedLocation,
  setStoreMarkers,
  setStoreDetails,
  setUserLocation,
  setStoresStatus,
  setTotalCount,
  setActiveStoreId,
} = mapSlice.actions;
export default mapSlice.reducer;
