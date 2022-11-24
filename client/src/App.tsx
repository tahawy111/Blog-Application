import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import NotFound from "./pages/NotFound";
import Home from "./pages/home/Home";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "./store";

function App() {
  // const dispatch = useDispatch();
  // const number = useSelector((state: RootState) => state.counter.value);
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
