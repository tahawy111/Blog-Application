import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import LoginPass from "../../components/LoginPass";
import "./login.css";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../store";
import SocialLogin from "../../components/SocialLogin";

const Login = () => {
  // const dispatch = useDispatch();
  // const user = useSelector((state: RootState) => state.auth);
  // user.loading ? dispatch(startLoading()) : dispatch(stopLoading());
  return (
    <Layout>
      <div className="auth_page">
        <div className="auth_box">
          <h3 className="text-uppercase text-center mb-4">Login</h3>
          <SocialLogin />
          <LoginPass />

          <small
            className="row my-2 text-primary"
            style={{ cursor: "pointer" }}
          >
            <span className="col-6">
              <Link to="/forgot_password">Forgot password?</Link>
            </span>
          </small>

          <p>
            You don't have an account?
            <Link to={`/register`} style={{ color: "crimson" }}>
              {` Register Now`}
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
