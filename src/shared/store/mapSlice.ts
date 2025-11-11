import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface MapLocationSelection {
  province: string;
  district: string;
  neighborhood: string;
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
  storeMarkers: StoreMarker[];
  storeDetails: StoreDetailInfo[];
  userLocation: {
    latitude: number;
    longitude: number;
  } | null;
}

const initialState: MapState = {
  selectedCategory: null,
  selectedLocation: {
    province: "",
    district: "",
    neighborhood: "",
  },
  center: {
    latitude: 37.55319,
    longitude: 126.9726,
  },
  storeMarkers: [],
  storeDetails: [],
  userLocation: null,
};

/**
 * 지도 화면에서 필요한 공통 상태를 관리하는 슬라이스
 */
const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setSelectedCategory(state, action: PayloadAction<string | null>) {
      state.selectedCategory = action.payload;
    },
    setSelectedLocation(state, action: PayloadAction<Partial<MapLocationSelection>>) {
      state.selectedLocation = { ...state.selectedLocation, ...action.payload };
    },
    setCenter(state, action: PayloadAction<MapState["center"]>) {
      state.center = action.payload;
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
  },
});

export const {
  setCenter,
  setSelectedCategory,
  setSelectedLocation,
  setStoreMarkers,
  setStoreDetails,
  setUserLocation,
} = mapSlice.actions;
export default mapSlice.reducer;
