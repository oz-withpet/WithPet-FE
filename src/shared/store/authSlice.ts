import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthTokens {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  userEmail?: string;
}

interface AuthState {
  tokens: AuthTokens | null;
}

const initialState: AuthState = {
  tokens: null,
};

/**
 * 토큰
 * 로그인 성공 시 발급된 액세스 토큰과 사용자 메타 정보만 Redux에 보관
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens(state, action: PayloadAction<AuthTokens>) {
      state.tokens = action.payload;
    },
    clearTokens(state) {
      state.tokens = null;
    },
  },
});

export const { setTokens, clearTokens } = authSlice.actions;
export default authSlice.reducer;
