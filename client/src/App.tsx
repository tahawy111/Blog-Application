import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import NotFound from "./pages/NotFound";
import Home from "./pages/home/Home";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { gapi } from "gapi-script";
import Profile from "./pages/profile/Profile";

function App() {
  // const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId: `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`,
      plugin_name: "blogDev",
    });
  });

  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={auth.user ? <Home /> : <Navigate to="/login" />}
        />
        {/* Start Auth Routes */}
        <Route
          path="login"
          element={auth.user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="register"
          element={auth.user ? <Navigate to="/" /> : <Register />}
        />
        {/* End Auth Routes */}
        <Route
          path="profile"
          element={auth.user ? <Profile /> : <Navigate to="/login" />}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
