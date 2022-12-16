import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axiosIntance from "./../utils/axios";
import { IUserLogin } from "../components/LoginPass";
import { toast } from "react-toastify";
import { IUserRegister } from "./../components/RegisterForm";
import { IFacebookLoginPayload } from "../utils/TypeScript";

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
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (user: IUserRegister, thunkAPI) => {
    try {
      return thunkAPI.fulfillWithValue(
        await (
          await axiosIntance.post("/register", user)
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

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (id_token: string, thunkAPI) => {
    try {
      return thunkAPI.fulfillWithValue(
        await (
          await axiosIntance.post("/google_login", { id_token })
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
export const facebookLogin = createAsyncThunk(
  "auth/facebookLogin",
  async (payload: IFacebookLoginPayload, thunkAPI) => {
    try {
      return thunkAPI.fulfillWithValue(
        await (
          await axiosIntance.post("/facebook_login", payload)
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
export const activeAccount = createAsyncThunk(
  "auth/activeAccount",
  async (token: string, thunkAPI) => {
    try {
      return thunkAPI.fulfillWithValue(
        await (
          await axiosIntance.post("/active", { active_token: token })
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
export const update = createAsyncThunk(
  "auth/update",
  async (user: IUserLogin, thunkAPI) => {
    try {
      return thunkAPI.fulfillWithValue(
        await (
          await axiosIntance.patch("/user", user)
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
    loading: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    logout: (state) => {
      localStorage.removeItem("user");
      toast.success("You Logged Out Succcessfully");
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

  extraReducers: (builder: any) => {
    builder.addCase(login.pending, (state: AuthState) => {
      return { ...state, loading: true };
    });
    builder.addCase(login.fulfilled, (state: AuthState, action: any) => {
      localStorage.user = JSON.stringify(action.payload);
      toast.success(`${action.payload.msg}`);
      return {
        ...state,
        loading: false,
        isSuccess: true,
        user: action.payload,
      };
    });
    builder.addCase(
      login.rejected,
      (state: AuthState, action: PayloadAction) => {
        toast.error(`${action.payload}`);
        return {
          ...state,
          loading: false,
          isSuccess: true,
          message: action.payload,
          user: null,
        };
      }
    );

    builder.addCase(register.pending, (state: AuthState) => {
      return { ...state, loading: true };
    });
    builder.addCase(register.fulfilled, (state: AuthState, action: any) => {
      toast.success(`${action.payload.msg}`);
      return {
        ...state,
        loading: false,
        isSuccess: true,
      };
    });

    builder.addCase(
      register.rejected,
      (state: AuthState, action: PayloadAction) => {
        toast.error(`${action.payload}`);
        return {
          ...state,
          loading: false,
          isSuccess: true,
          message: action.payload,
          user: null,
        };
      }
    );
    builder.addCase(googleLogin.pending, (state: AuthState) => {
      return { ...state, loading: true };
    });
    builder.addCase(googleLogin.fulfilled, (state: AuthState, action: any) => {
      localStorage.user = JSON.stringify(action.payload);
      toast.success(`${action.payload.msg}`);
      return {
        ...state,
        loading: false,
        isSuccess: true,
        user: action.payload,
      };
    });
    builder.addCase(
      googleLogin.rejected,
      (state: AuthState, action: PayloadAction) => {
        toast.error(`${action.payload}`);
        return {
          ...state,
          loading: false,
          isSuccess: true,
          message: action.payload,
          user: null,
        };
      }
    );
    builder.addCase(facebookLogin.pending, (state: AuthState) => {
      return { ...state, loading: true };
    });
    builder.addCase(
      facebookLogin.fulfilled,
      (state: AuthState, action: any) => {
        localStorage.user = JSON.stringify(action.payload);
        toast.success(`${action.payload.msg}`);
        return {
          ...state,
          loading: false,
          isSuccess: true,
          user: action.payload,
        };
      }
    );
    builder.addCase(
      facebookLogin.rejected,
      (state: AuthState, action: PayloadAction) => {
        toast.error(`${action.payload}`);
        return {
          ...state,
          loading: false,
          isSuccess: true,
          message: action.payload,
          user: null,
        };
      }
    );
    builder.addCase(activeAccount.pending, (state: AuthState) => {
      return { ...state, loading: true };
    });
    builder.addCase(
      activeAccount.fulfilled,
      (state: AuthState, action: any) => {
        toast.success(`${action.payload.msg}`);
        return {
          ...state,
          loading: false,
          isSuccess: true,
          message: action.payload.msg,
        };
      }
    );
    builder.addCase(
      activeAccount.rejected,
      (state: AuthState, action: PayloadAction) => {
        toast.error(`${action.payload}`);
        return {
          ...state,
          loading: false,
          isSuccess: true,
          message: action.payload,
          user: null,
        };
      }
    );
    builder.addCase(update.pending, (state: AuthState) => {
      return { ...state, loading: true };
    });
    builder.addCase(update.fulfilled, (state: AuthState, action: any) => {
      const userVar = {
        user: action.payload.user,
        access_token: state.user?.access_token,
      };
      toast.success(`${action.payload.msg}`);
      localStorage.setItem("user", JSON.stringify(userVar));
      return {
        ...state,
        loading: false,
        isSuccess: true,
        user: userVar,
        message: action.payload.msg,
      };
    });
    builder.addCase(
      update.rejected,
      (state: AuthState, action: PayloadAction) => {
        toast.error(`${action.payload}`);
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
export const { reset, logout, loading } = authSlice.actions;

export default authSlice.reducer;
