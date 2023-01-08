import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axiosIntance from "../utils/axios";
import { toast } from "react-toastify";
import { ICreateBlogProps } from "../utils/TypeScript";

export const createBlog = createAsyncThunk(
  "blog/create",
  async (payload: ICreateBlogProps, thunkAPI) => {
    try {
      return thunkAPI.fulfillWithValue(
        await (
          await axiosIntance.post("/blog", payload)
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

export const getBlogs = createAsyncThunk(
  "blog/getBlogs",
  async (_, thunkAPI) => {
    try {
      return thunkAPI.fulfillWithValue(
        await (
          await axiosIntance.get("/blog")
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

export interface BlogState {
  loading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
  blogs: null | object[];
}

const initialState: BlogState = {
  loading: false,
  isSuccess: false,
  isError: false,
  message: "",
  blogs: null,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    reset: (state) => {
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isError: false,
        message: "",
        blogs: null,
      };
    },
  },

  extraReducers: (builder: any) => {
    builder.addCase(createBlog.pending, (state: BlogState) => {
      return { ...state, loading: true };
    });
    builder.addCase(createBlog.fulfilled, (state: BlogState, action: any) => {
      toast.success(`${action.payload.msg}`);
      return {
        ...state,
        loading: false,
        isSuccess: true,
        blogs: action.payload.blogs,
      };
    });
    builder.addCase(
      createBlog.rejected,
      (state: BlogState, action: PayloadAction) => {
        toast.error(`${action.payload}`);
        return {
          ...state,
          loading: false,
          isSuccess: false,
          message: action.payload,
        };
      }
    );
    builder.addCase(getBlogs.pending, (state: BlogState) => {
      return { ...state, loading: true };
    });
    builder.addCase(getBlogs.fulfilled, (state: BlogState, action: any) => {
      toast.success(`${action.payload.msg}`);
      return {
        ...state,
        loading: false,
        isSuccess: true,
        blogs: action.payload.blogs,
      };
    });
    builder.addCase(
      getBlogs.rejected,
      (state: BlogState, action: PayloadAction) => {
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

export const { reset } = blogSlice.actions;

export default blogSlice.reducer;
