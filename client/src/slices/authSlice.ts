import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import axiosIntance from "./../utils/axios";

export interface CounterState {
  loading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isMessage: string;
}

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await axiosIntance.post("/login", user);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

const initialState: CounterState = {
  loading: false,
  isSuccess: false,
  isError: false,
  isMessage: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isError: false,
        isMessage: "",
      };
    },
    extraReducers: (builder) => {
      builder.addCase();
    },
  },
});

// Action creators are generated for each case reducer function
export const {} = authSlice.actions;

export default authSlice.reducer;
