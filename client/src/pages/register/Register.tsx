import React from "react";
import Layout from "../../components/Layout";
import "./register.css";
import { Link } from "react-router-dom";
import RegisterForm from "../../components/RegisterForm";

const Register = () => {
  return (
    <Layout>
      <div className="auth_page">
        <div className="auth_box">
          <h3 className="text-uppercase text-center mb-4">Register</h3>

          <RegisterForm />

          <p>
            Already have an account?
            <Link to={`/login`} style={{ color: "crimson" }}>
              {` Login Now`}
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
