import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axiosIntance from "../utils/axios";
import { toast } from "react-toastify";

export const createCategory = createAsyncThunk(
  "category/create",
  async (name: string, thunkAPI) => {
    try {
      return thunkAPI.fulfillWithValue(
        await (
          await axiosIntance.post("/category", { name })
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
export const getCategory = createAsyncThunk(
  "category/get",
  async (_, thunkAPI) => {
    try {
      return thunkAPI.fulfillWithValue(
        await (
          await axiosIntance.get("/category")
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

export interface CategoryState {
  loading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
  categories: any;
}

const initialState: CategoryState = {
  loading: false,
  isSuccess: localStorage.user ? true : false,
  isError: false,
  message: "",
  categories: null,
};

export const categorySlice = createSlice({
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
        categories: null,
      };
    },
  },

  extraReducers: (builder: any) => {
    builder.addCase(createCategory.pending, (state: CategoryState) => {
      return { ...state, loading: true };
    });
    builder.addCase(
      createCategory.fulfilled,
      (state: CategoryState, action: any) => {
        toast.success(`${action.payload.msg}`);
        return {
          ...state,
          loading: false,
          isSuccess: true,
          categories: action.payload.categories,
        };
      }
    );
    builder.addCase(
      createCategory.rejected,
      (state: CategoryState, action: PayloadAction) => {
        toast.error(`${action.payload}`);
        return {
          ...state,
          loading: false,
          isSuccess: false,
          message: action.payload,
        };
      }
    );
    builder.addCase(getCategory.pending, (state: CategoryState) => {
      return { ...state, loading: true };
    });
    builder.addCase(
      getCategory.fulfilled,
      (state: CategoryState, action: any) => {
        return {
          ...state,
          loading: false,
          isSuccess: true,
          categories: action.payload.categories,
        };
      }
    );
    builder.addCase(
      getCategory.rejected,
      (state: CategoryState, action: PayloadAction) => {
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

export const { reset } = categorySlice.actions;

export default categorySlice.reducer;
