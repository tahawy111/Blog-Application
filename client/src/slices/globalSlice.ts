import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  loading: boolean;
}

const initialState: AuthState = {
  loading: false,
};

export const authSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    startLoading: (state) => {
      return { ...state, loading: true };
    },
    stopLoading: (state) => {
      return { ...state, loading: false };
    },
  },
});

// Action creators are generated for each case reducer function
export const { startLoading, stopLoading } = authSlice.actions;

export default authSlice.reducer;
