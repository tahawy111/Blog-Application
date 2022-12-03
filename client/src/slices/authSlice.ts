import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axiosIntance from "./../utils/axios";
import { IUserLogin } from "../components/LoginPass";

export interface AuthState {
  loading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
  user: any;
}

export const login = createAsyncThunk(
  "auth/login",
  async (user: IUserLogin, thunkAPI) => {
    try {
      return thunkAPI.fulfillWithValue(
        await (
          await axiosIntance.post("/login", user)
        ).data
      );
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState: AuthState = {
  loading: false,
  isSuccess: localStorage.user ? true : false,
  isError: false,
  message: "",
  user: localStorage.user ? JSON.parse(localStorage.user) : null,
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
        message: "",
        user: null,
      };
    },
  },
  // extraReducers: {
  //   [login.pending.toString()]: (state: AuthState) => {
  //     return { ...state, loading: true };
  //   },
  //   [login.fulfilled.toString()]: (state: AuthState, action: PayloadAction) => {
  //     localStorage.user = JSON.stringify(action.payload);
  //     return {
  //       ...state,
  //       loading: false,
  //       isSuccess: true,
  //       user: action.payload,
  //     };
  //   },
  //   [login.rejected.toString()]: (state: AuthState, action: PayloadAction) => {
  //     return {
  //       ...state,
  //       loading: false,
  //       isSuccess: true,
  //       message: action.payload,
  //       user: null,
  //     };
  //   },
  // },

  extraReducers: (builder: any) => {
    builder.addCase(login.pending, (state: AuthState) => {
      return { ...state, loading: true };
    });
    builder.addCase(
      login.fulfilled,
      (state: AuthState, action: PayloadAction) => {
        localStorage.user = JSON.stringify(action.payload);
        return {
          ...state,
          loading: false,
          isSuccess: true,
          user: action.payload,
        };
      }
    );

    builder.addCase(
      login.rejected,
      (state: AuthState, action: PayloadAction) => {
        return {
          ...state,
          loading: false,
          isSuccess: true,
          message: action.payload,
          user: null,
        };
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const { reset } = authSlice.actions;

export default authSlice.reducer;
