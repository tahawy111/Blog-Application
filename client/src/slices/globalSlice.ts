import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUserData } from "./../utils/TypeScript";
import axiosIntance from "./../utils/axios";
import { toast } from "react-toastify";

export const getSomeUser = createAsyncThunk(
  "user/get",
  async (id: string, thunkAPI) => {
    try {
      return thunkAPI.fulfillWithValue(
        await (
          await axiosIntance.get(`/user/${id}`)
        ).data
      );
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export interface globalState {
  someUser: IUserData | null;
  loading: boolean;
}

const initialState: globalState = {
  someUser: null,
  loading: false,
};

export const globalSlice = createSlice({
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
  extraReducers: (builder: any) => {
    builder.addCase(getSomeUser.pending, (state: globalState) => {
      return { ...state, loading: true };
    });
    builder.addCase(
      getSomeUser.fulfilled,
      (state: globalState, action: any) => {
        return {
          ...state,
          loading: false,
          isSuccess: true,
          someUser: action.payload.user,
        };
      }
    );
    builder.addCase(
      getSomeUser.rejected,
      (state: globalState, action: PayloadAction) => {
        toast.error(`${action.payload}`);
        return {
          ...state,
          loading: false,
          isSuccess: false,
          message: action.payload,
        };
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const { startLoading, stopLoading } = globalSlice.actions;

export default globalSlice.reducer;
