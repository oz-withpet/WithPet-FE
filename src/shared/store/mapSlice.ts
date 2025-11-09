import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface MapState {
  selectedCategory: string | null;
  center: {
    lat: number;
    lng: number;
  };
}

const initialState: MapState = {
  selectedCategory: null,
  center: {
    lat: 37.55319,
    lng: 126.9726,
  },
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setSelectedCategory(state, action: PayloadAction<string | null>) {
      state.selectedCategory = action.payload;
    },
    setCenter(state, action: PayloadAction<MapState["center"]>) {
      state.center = action.payload;
    },
  },
});

export const { setCenter, setSelectedCategory } = mapSlice.actions;
export default mapSlice.reducer;
