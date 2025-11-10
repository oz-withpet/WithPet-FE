import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface MapLocationSelection {
  province: string;
  district: string;
  neighborhood: string;
}

interface StoreMarker {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

interface MapState {
  selectedCategory: string | null;
  selectedLocation: MapLocationSelection;
  center: {
    lat: number;
    lng: number;
  };
  storeMarkers: StoreMarker[];
}

const initialState: MapState = {
  selectedCategory: null,
  selectedLocation: {
    province: "",
    district: "",
    neighborhood: "",
  },
  center: {
    lat: 37.55319,
    lng: 126.9726,
  },
  storeMarkers: [],
};

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
  },
});

export const { setCenter, setSelectedCategory, setSelectedLocation, setStoreMarkers } = mapSlice.actions;
export default mapSlice.reducer;
