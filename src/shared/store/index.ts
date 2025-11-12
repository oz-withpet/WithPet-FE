import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/shared/store/authSlice";
import mapReducer from "@/shared/store/mapSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    map: mapReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
