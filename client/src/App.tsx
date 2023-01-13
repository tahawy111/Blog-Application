import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import NotFound from "./pages/NotFound";
import Home from "./pages/home/Home";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
// import { gapi } from "gapi-script";
import Profile from "./pages/profile/Profile";
import Active from "./pages/active/Active";
import ChangeEmail from "./pages/active/ChangeEmail";
import { useJwt } from "react-jwt";
import { logout } from "./slices/authSlice";
import { useEffect } from "react";
import Category from "./pages/category/Category";
import CreateBlog from "./pages/createBlog/CreateBlog";
import { getCategory } from "./slices/categorySlice";
import { getBlogs } from "./slices/blogSlice";
import BlogsByCategory from "./pages/blogs/BlogsByCategory";

function App() {
  const dispatch: AppDispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  // const state = useSelector((state: RootState) => state);
  // gapi.load("client:auth2", () => {
  //   gapi.client.init({
  //     clientId: `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`,
  //     plugin_name: "blogDev",
  //   });
  // });

  const { isExpired } = useJwt(auth.user?.access_token);
  useEffect(() => {
    if (auth.user !== null && isExpired) {
      dispatch(logout());
    }
  }, [isExpired, dispatch]);
  useEffect(() => {
    dispatch(getBlogs());
    dispatch(getCategory());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        {/* Start Auth Routes */}
        <Route
          path="login"
          element={auth.user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="register"
          element={auth.user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="active/:token"
          element={auth.user ? <Navigate to="/" /> : <Active />}
        />
        {/* End Auth Routes */}
        <Route path="profile/:id" element={<Profile />} />
        <Route
          path="changeEmail/:token"
          element={auth.user ? <ChangeEmail /> : <Navigate to="/login" />}
        />
        {/* Category */}
        <Route
          path="category"
          element={auth.user ? <Category /> : <Navigate to="/login" />}
        />
        {/* Blogs */}
        <Route
          path="create_blog"
          element={auth.user ? <CreateBlog /> : <Navigate to="/login" />}
        />
        <Route path="blogs/:category" element={<BlogsByCategory />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
