import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import NotFound from "./pages/NotFound";
import Home from "./pages/home/Home";
import { useSelector } from "react-redux";
import { RootState } from "./store";

function App() {
  // const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={auth.user ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="login"
          element={auth.user ? <Navigate to="/login" /> : <Login />}
        />
        <Route
          path="register"
          element={auth.user ? <Navigate to="/login" /> : <Register />}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
