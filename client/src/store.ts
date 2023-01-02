import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import categorySlice from "./slices/categorySlice";
import globalSlice from "./slices/globalSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    global: globalSlice,
    category: categorySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
